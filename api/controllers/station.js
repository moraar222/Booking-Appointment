import Station from "../models/Station.js"
import Salon from "../models/Salon.js"
import {createError} from "../routes/utils/error.js"

export const createStation = async (req,res,next) =>{

    const salonId = req.params.salonId;
    const newStation = new Station(req.body)

    try{
        const savedStation = await newStation.save()
        try{
            await Salon.findByIdAndUpdate(salonId, {
                $push : {stations: savedStation._id}
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedStation)
    }catch(err){
        next(err)
    }
}

export const updateStation = async (req,res,next)=>{

    try{
        const updatedStation = await Salon.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            {new:true}
            )
        res.status(200).json(updatedStation);
} catch (err) {
    next(err)
}

}

export const deleteStation = async (req,res,next)=>{
    const salonId = req.params.salonid;
    try {
await Station.findByIdAndDelete(req.params.id );
try{
    await Salon.findByIdAndUpdate(salonId, {
        $pull : { stations: req.params.id}
    })
}catch(err){
    next(err)
}     
        res.status(200).json("station has been deleted.");
}catch(err){
 next(err)
}
}

export const getStation = async (req,res,next)=>{
try{
    const station = await Salon.findById(req.params.id)
    res.status(200).json(station);
}       catch(err){
    next(err)
}
}
export const getStations = async (req,res,next)=>{
try{
    const stations = await Station.find();
    res.status(200).json(stations);
}       catch(err){
    next(err)
}
}