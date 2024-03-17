import mongoose from 'mongoose';


const SalonistSchema= new mongoose.Schema({   
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
    skills: {
        type: String,
        required:true
    },
    
    phone:{
        type: String,
        required: false,
    },
}, {timestamps:true})



export default mongoose.model("Salonist", SalonistSchema)
