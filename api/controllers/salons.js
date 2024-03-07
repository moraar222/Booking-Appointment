import Salon from "../models/Salon.js"
import Station from "../models/Station.js";

export const createSalon = async (req,res,next)=>{
    const newSalon = new Salon(req.body)

    try{
        const savedSalon = await newSalon.save()
        res.status(200).json(savedSalon)
    }   catch(err) {
        next(err)
}
}

export const updateSalon = async (req,res,next)=>{

        try{
            const updatedSalon = await Salon.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body },
                {new:true}
                )
            res.status(200).json(updatedSalon);
    } catch (err) {
        next(err)
}

}

export const deleteSalon = async (req,res,next)=>{
    try {
    await Salon.findByIdAndDelete(req.params.id );
                
            res.status(200).json("salon has been deleted.");
    }catch(err){
     next(err)
 }
}

export const getSalon = async (req,res,next)=>{
    try{
        const Salon = await Salon.findById(req.params.id)
        res.status(200).json(Salon);
}       catch(err){
        next(err)
}
}

export const getSalons = async (req,res,next)=>{
    console.log (req.query);

    const { min, max, name, title, ...others } = req.query;
    try {
        let query = { ...others };
        if (name) {
          query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for similar names
        }
        if (title) {
          query.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive search for similar titles
        }

        const salons = await Salon.find({
            ...query,
            cheapestPrice: { $gt: min | 1, $lt: max || 9999},
        }).limit(req.query.limit || 50);
        
        res.status(200).json(salons);
    } catch(err){
        next(err)
    }
}

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
          return Salon.countDocuments({city:city})  
        }))
        res.status(200).json(list);
}       catch(err){
        next(err)
}
}
export const countByType = async (req,res,next)=>{
    try{
    const spaTreatmentCount = await Salon.countDocuments({type:"spaTreatment"});
    const fullMakeupCount = await Salon.countDocuments({type:"fullMakeup"});
    const braidingAndHairstylesCount = await Salon.countDocuments({type:"braidingAndHairstyles"});
    const manicureAndPedicureCount = await Salon.countDocuments({type:"manicureAndPedicure"});
    const haircutAndStylingCount = await Salon.countDocuments({type:"haircutAndStyling"});
    
       
        res.status(200).json([
            { type:"spaTreatment", count:spaTreatmentCount },
            { type:"fullMakeup", count:fullMakeupCount  },
            { type:"braidingAndHairstyles", count:braidingAndHairstylesCount },
            { type:"manicureAndPedicure", count:manicureAndPedicureCount },
            { type:"haircutAndStyling", count:haircutAndStylingCount },
        ]);
}       catch(err){
        next(err)
}
}
export const getSalonStations = async (req, res, next) => {
    try {
      const salon = await Salon.findById(req.params.id);
      const list = await Promise.all(
        salon.stations.map((station) => {
          return Station.findById(station);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  
