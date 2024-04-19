require("dotenv").config()
const express = require("express")
const studentRoute = require("./routes/studentRoutes")
const mentorRoute = require("./routes/mentorRoutes")
const attendanceRoute = require("./routes/attendanceRoutes")
const loginRoute = require("./routes/loginRoute")
const { default: mongoose } = require("mongoose")
const app = express()

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req,res,next) => {
    console.log(req.url)
    next();
})


app.use("/students",studentRoute)
app.use("/mentor",mentorRoute)
app.use("/attendance",attendanceRoute)
app.use("/auth",loginRoute)

mongoose.connect(uri,{
    dbName: process.env.DATABASE_NAME,
})
    .then(() => {
        app.listen(port,() => {
            console.log(`Connected to db and Server started running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

