const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    mothername: {
        type: String,
        required: true
    },
    aadharno: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    sscmarks: {
        type: Number,
        required: true
    },
    intermarks: {
        type: Number,
        required: true
    },
    fatherno: {
        type: Number,
        required: true
    },
    motherno: {
        type: Number,
        required: true
    },
    stdno: {
        type: Number,
        required: true
    },
    caste: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required : true
    },
    stdAdim: {
        type: String,
        required: true
    },
    pressadd: {
        type: String,
        required: true
    },
    permadd: {
        type: String,
        required: true
    },
    clgEmail : {
        type : String,
        required: true
    },
    stdmail :{
        type : String,
        required: true
    },
    fathermail : {
        type : String,
    },
    mothermail : {
        type : String,
    }
})

// signup statics function

studentSchema.statics.signup = async function(data) {
    let {rollno,name,fathername,mothername,aadharno,dob,gender,medium,sscmarks,intermarks,fatherno,motherno,stdno,caste,religion,rank,stdAdim,pressadd,permadd,clgEmail,stdmail} = data
        
        if(!rollno || !name || !fathername || !mothername || !aadharno || !dob || !gender || !medium || !sscmarks || !intermarks || !fatherno || !motherno || !stdno || !caste || !religion || !rank || !stdAdim || !pressadd || !permadd || !clgEmail || !stdmail)
            throw Error("All fields are required")
        
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

const Student = mongoose.models.students || mongoose.model("student",studentSchema)
module.exports = Student;