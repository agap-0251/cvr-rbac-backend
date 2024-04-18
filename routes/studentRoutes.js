const express = require("express");
const Student = require("../models/StudentModel");
const router = express.Router();
const {getAllStudents,getStudent,addNewStudent,deleteStudent,updateStudent} = require('../controllers/studentController')

//get all students
router.get("/", getAllStudents);

//get specific student data
router.get("/:rollno", getStudent);

//create new student
router.post("/", addNewStudent);

//delete student
router.delete("/:rollno", deleteStudent);

//edit student details
router.patch("/:rollno", updateStudent);

module.exports = router;
