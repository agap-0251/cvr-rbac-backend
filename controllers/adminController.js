const Admin = require("../models/AdminModel");
const User = require("../models/UserModel");

//create admin
const addNewAdmin = async (req, res) => {
    try {
      
      const admin = await Admin.signup(req.body)    
      const user = await User.signup(req.body)
      res.status(200).json({admin,user});
     
    } catch (err) {
      res.status(400).json({error : err.message});
    }
  };

module.exports = {addNewAdmin}