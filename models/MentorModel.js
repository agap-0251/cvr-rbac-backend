const mongoose = require("mongoose")

const mentorSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    desg : {
        type : String,
        required: true,
    },
    phone :{
        type : Number,
        required: true,
    },
    mailid : {
        type : String,
        required: true,
        required: true,
        unique: true,
    },
    sec : {
        type : String,
        required: true,
    },
    stdarr :{
        type : [String],
        default : []
    },
    stdcnt : {
        type : Number,
        default: function () {
            return this.stdarr.length; 
        },
    },
    
})

// signup statics function

mentorSchema.statics.signup = async function(data) {
    let {mailid,name,desg,phone,sec} = data

        if(!mailid || !name || !desg || !phone || !sec)
            throw Error("All fields are required.")
        
        const exists = await this.findOne({mailid})
        if(exists) {
            throw Error('Email is already in use')
        }
        // const salt = await bcrypt.genSalt(10)
        // const hash = await bcrypt.hash(password,salt)
        // const uImage = null;
        const user = await this.create(data)
        await user.save()
        return user
}

const Mentor = mongoose.models.mentors || mongoose.model("mentor",mentorSchema)
module.exports = Mentor;