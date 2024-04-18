const express = require("express");
const Attendance = require("../models/AttendanceModel");
const Student = require("../models/StudentModel")
const router = express.Router();

//get specific student attendance
router.get("/:rollno", async (req, res) => {
    const rollno = req.params.rollno;

  try {
    // console.log(rollno)
    let {_id} = await Student.findOne({ rollno: rollno }, {__v: 0}).select("_id")
    console.log(_id)
    if (!_id) {
      return res.status(404).json({ error: `There is no student with rollno ${rollno}` });
    }
    let att = await Attendance.findOne({ studentId : _id})

    return res.status(200).json(att);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
