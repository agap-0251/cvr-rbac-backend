const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    totalSessions: {
        type: Number,
        required: true
    },
    sessionsAttended: {
        type: Number,
        required: true
    },
    attendancePercentage: {
        type: Number,
        min: 0,
        max: 100
    }
})

const Attendance = mongoose.models.attendances || mongoose.model("attendance",attendanceSchema)
module.exports=Attendance;