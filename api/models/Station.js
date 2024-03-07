import mongoose from 'mongoose';
const StationSchema= new mongoose.Schema({
   
    title:{
        type: String,
        required:true, 
    },
    price:{
        type: Number,
        required:true,
    },
    maxPeople: {
        type: Number,
        required:true
    },
    decs:{
        type: String,
        required: true,
    },
    stationNumbers:[{number:Number, unavailableDates:[{type: [Date]}]}]
    
    },


{timestamps:true}
)

export default mongoose.model("Station", StationSchema)