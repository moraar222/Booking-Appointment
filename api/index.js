import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import salonsRoute from "./routes/salons.js"
import stationsRoute from "./routes/stations.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import sendEmail from "./routes/utils/sendEmail.js"
import ReservationRoute from "./routes/Reservation.js"

const app = express()
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})
//middleware



app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/salons", salonsRoute);
app.use("/api/stations", stationsRoute);
app.use("/api/reservations",ReservationRoute)

app.post("/api/send-feedback", (req, res) => {
    const { feedback } = req.body;

    if (!feedback) return res.status(400).json({ message: "Feedback cannot be empty" })

    sendEmail({
        to: "moraar976@gmail.com",
        subject: "Feedback from the frontend",
        text: feedback,
    })

    return res.status(200).json({ message: "Email sent successfully!" })
})

app.post("/api/make-reservation", (req, res) => {
    const { salonId, selectedDate, time } = req.body;

    if (!salonId) return res.status(400).json({ message: "You have to provide a salonId" });
    try {

        // get a particular salon
        
        // check if date & time are available 
        
        // add reservation/booking at that date and time
        
        return res.status(200).json({ message: "Reservation added successfully!" });
    } catch (err) {
        return res.status(500).json("A server error occurred!")   
    }
})




app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
      });
})


app.listen(8800,()=>{
    connect()
    console.log("connected to backend.")
})