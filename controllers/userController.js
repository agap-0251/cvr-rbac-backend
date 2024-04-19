const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/UserModel");

const addNewUser = async (req,res) => {
    let {email, password,role} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        let user = await User.create({email,password : hash,role})

        // return res.status(200).json({message : "user created"})
        return res.status(200).json(user)
        
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

module.exports = {
    addNewUser
};
