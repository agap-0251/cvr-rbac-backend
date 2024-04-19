const express = require("express");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require("../models/UserModel")
const {addNewStudent} = require("../controllers/studentController")
const {addNewMentor} = require("../controllers/mentorController");
const { addNewAdmin } = require("../controllers/adminController");

const createToken = (payload) => {
    return jwt.sign({payload},process.env.SECRET, {expiresIn : '3d'})
}

const login = async (req,res) => {
    let {email,password} = req.body;
    try {
        const user = await User.findOne({ email: email });
        if(!user)
            return res.json({msg : "Invalid Email"})
        
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.json({msg : "Invalid Password"});
        }

        //user present in db
        const token = createToken({email : user.email,role : user.role})
        // login jwt token send
        res.status(200).json({email,token})
    }catch(err){
        console.log(err)
    }
}

//all logins
router.post('/login', login)

router.post('/signup', async (req,res) => {
    let {role} = req.body
    try {
        if(role === "STUDENT"){
            await addNewStudent(req,res)
        }
        else if(role === "MENTOR"){
            await addNewMentor(req,res)
        } 
        else if(role === "ADMIN"){
            await addNewAdmin(req,res)
        }
        else {
            res.status(400).json({message : "Invalid role"})
        }
    }catch(err) {
        console.log(err)
    }
})

module.exports = router;
