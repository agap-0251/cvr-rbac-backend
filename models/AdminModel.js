const mongoose = require('mongoose')
// const validator = require("validator")
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
    
});

// signup statics function

adminSchema.statics.signup = async function(data) {
    let {email,name} = data
        if(!email || !name)
            throw Error("All fields are required.")
        const exists = await this.findOne({email})
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



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;