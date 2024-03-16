import mongoose from 'mongoose';


const ReservationSchema= new mongoose.Schema({   
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    day: {
        type: String,
        required:true
    },
    time:{
        type: String,
        required: true,
    },})
