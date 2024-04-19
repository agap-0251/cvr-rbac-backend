const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type:String, 
        required:true
    },
    role : {
        type : String,
        enum : ["STUDENT","MENTOR","ADMIN"]
    }
    
})

//signup
userSchema.statics.signup = async function(data) {
    let {email, role} = data
        if(!email || !role)
            throw Error("All fields are required")
        
        const exists = await this.findOne({email})
        if(exists) {
            throw Error('Email is already in use')
        }
        const salt = await bcrypt.genSalt(10)
        let password = ""
        if(role === "STUDENT") password = data.rollno
        else if(role === "MENTOR") password = data.mailid
        else password = data.email
        const hash = await bcrypt.hash(password,salt)
        // const uImage = null;
        const user = await this.create({email,password : hash, role : data.role})
        await user.save()
        return user

}


const User = mongoose.models.user || mongoose.model("user",userSchema)
module.exports = User;