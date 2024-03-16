import mongoose from 'mongoose';


const ReservationSchema= new mongoose.Schema({   
    date:{
        type: String,
        required:true,
        unique:true
    },
    Startime:{
        type: String,
        required:true,
    },
    Endtime: {
        type: String,
        required:true
    },
    Service:{
        type: String,
        required: true,
    },
    Salonistid: {
        type: String,
        required:true
    },
    Servicename:{
        type: String,
        required: true,
    },
    Duration:{
        type: String,
        required: true,
    },
    Price:{
        type: String,
        required: true,
    },
    Tecnichians:{
        type: String,
        required: true,
    },

})
