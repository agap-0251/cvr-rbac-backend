const Student = require("../models/StudentModel");
const User = require("../models/UserModel");

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
    
    const student = await Student.signup(req.body)
    const user = await User.signup(req.body)

    res.status(200).json({ message: "Student created" });
   
  } catch (err) {
    res.status(400).json({error : err.message})
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
