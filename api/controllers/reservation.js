import Reservation from "../models/Reservation.js";
// import Station from "../models/Station.js";
// import sendEmail from "../routes/utils/sendEmail.js";

export const createReservation = async (req, res, next) => {
  const newReservation = new Reservation(req.body);

  try {
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    await Salon.findByIdAndDelete(req.params.id);

    res.status(200).json("reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
    const Reservation = await Reservation.findById(req.params.id);
    res.status(200).json(Reservation);
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (req, res, next) => {
  const { Servicename, Duration, Salonistid, startTime, ...others } = req.query;
  try {
    let query = { ...others };
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search for similar names
    }
    if (title) {
      query.title = { $regex: new RegExp(title, "i") }; // Case-insensitive search for similar titles
    }

    const reservation = await Reservation.find({
      ...query,
      startTime: { $gt: satrt | 8, $lt: stop || 8 },
    }).limit(req.query.limit || 50);

    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const countByDuration = async (req, res, next) => {
  const Duration = req.query.days.split(",");
  try {
    const list = await Promise.all(
      Duration.map((Duration) => {
        return Reservation.countByDuration({ Duration: Duration });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// export const countByType = async (req, res, next) => {
//   try {
//     const spaTreatmentCount = await Salon.countDocuments({
//       type: "spaTreatment",
//     });
//     const fullMakeupCount = await Salon.countDocuments({ type: "fullMakeup" });
//     const braidingAndHairstylesCount = await Salon.countDocuments({
//       type: "braidingAndHairstyles",
//     });
//     const manicureAndPedicureCount = await Salon.countDocuments({
//       type: "manicureAndPedicure",
//     });
//     const haircutAndStylingCount = await Salon.countDocuments({
//       type: "haircutAndStyling",
//     });

//     res.status(200).json([
//       { type: "spaTreatment", count: spaTreatmentCount },
//       { type: "fullMakeup", count: fullMakeupCount },
//       { type: "braidingAndHairstyles", count: braidingAndHairstylesCount },
//       { type: "manicureAndPedicure", count: manicureAndPedicureCount },
//       { type: "haircutAndStyling", count: haircutAndStylingCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };
// export const getSalonStations = async (req, res, next) => {
//   try {
//     const salon = await Salon.findById(req.params.id);
//     const list = await Promise.all(
//       salon.stations.map((station) => {
//         return Station.findById(station);
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };
