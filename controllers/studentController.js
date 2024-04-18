const express = require("express");
const Student = require("../models/StudentModel");
const router = express.Router();

//get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({})
    // console.log(students)
    if (!students) {
      return res.status(201).json(`No students found`);
    }

    return res.status(200).json(students);
  } catch (err) {
    res.send(err);
  }
};

//get specific student data
const getStudent = async (req, res) => {
    const rollno = req.params.rollno;

  try {
    // console.log(rollno)
    let student = await Student.findOne({ rollno: rollno }, {__v: 0});
    // console.log(student)
    if (!student) {
      return res.status(404).json({ error: `There is no student with rollno ${rollno}` });
    }

    return res.status(200).json(student);
  } catch (err) {
    return res.send(err);
  }
};

//create new student
const addNewStudent = async (req, res) => {
  try {
    let result = await Student.create(req.body);
    let student = await result.save()
    if (!student) {
      return res.status(400).send("Creating student failed");
    }
    res.status(200).json({ message: "Student created" });
  } catch (err) {
    res.send(err);
  }
};

const deleteStudent =  async (req, res) => {
  try {
    let rollno = req.params.rollno;
    let result = await Student.deleteOne({ rollno: rollno });
    if (!result) {
      return res.status(400).send("Deleting student failed!");
    }
    res.status(200).json({ message: "Student created" });
  } catch (err) {
    res.send(err);
  }
};

//edit student details
const updateStudent = async (req, res) => {
  try {
    let rollno = req.params.rollno;
    let updateData = req.body;
    //check for existing student
    let student = await Student.findOne({ rollno: rollno });
    if (!student) {
      return res.status(400).send("The student does not exist");
    }
    //update the fields that are passed in the request body
    let updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
    getAllStudents,getStudent,addNewStudent,deleteStudent,updateStudent
};
