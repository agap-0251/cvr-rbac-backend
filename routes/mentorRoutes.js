const express = require("express");
const router = express.Router();
const Mentor = require("../Models/Mentor.model.js");
const {getAllMentors,addNewMentor,getMentor,updateMentor,deleteMentor} = require('../controllers/mentorController.js')

//get all mentor details
router.get("/", getAllMentors);

//create new mentor
router.post("/", addNewMentor);

//get a specific mentor
router.get("/:mailid", getMentor);

//update mentor details
router.patch("/:mailid", updateMentor);

//delete mentor
router.delete("/:mailid", deleteMentor);

module.exports = router;
