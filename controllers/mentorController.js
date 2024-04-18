const {default : mongoose} = require('mongoose')
const Mentor = require("../Models/Mentor.model.js");

//get all mentor details
const getAllMentors = async (req, res, next) => {
  try {
    const results = await Mentor.find({});

    if (!results) {
      return res.status(201).json({ message: "No mentors found" });
    }
    return res.send(results);
  } catch (error) {
    return res.send(error);
  }
};

//create new mentor
const addNewMentor = async (req, res) => {
  try {
    const ment = new Mentor(req.body);
    const result = await ment.save();
    if (result) 
      return res.status(201).json({ message: "mentor created" });
  } catch (error) {
    return res.send(error);
  }
};

//get a specific mentor
const getMentor = async (req, res, next) => {
  const mail = req.params.mailid;
  try {
    const result = await Mentor.findOne({ mailid : mail }, { __v: 0 });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

//update mentor details
const updateMentor = async (req, res, next) => {
  try {
    const mailid = req.params.mailid;
    const updates = req.body;

    const options = { new: true };
    const result = await Mentor.findOneAndUpdate({ mailid: mailid }, updates, options)
    .select("-__v")
    .exec();

    return res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

//delete mentor
const deleteMentor = async (req, res, next) => {
  const mailid = req.params.mailid;
  try {
    const result = await Mentor.findOneAndDelete({ mailid: mailid });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: `Deleted user mailid: ${mailid}` });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
    getAllMentors,addNewMentor,getMentor,updateMentor,deleteMentor
};
