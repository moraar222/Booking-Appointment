import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res, next) => {
    try {
        const newReservation = new Reservation(req.body);
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
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
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Reservation has been deleted." });
    } catch (err) {
        next(err);
    }
};

export const getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.status(200).json(reservation);
    } catch (err) {
        next(err);
    }
};

export const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
};

// export const countByDuration = async (req, res, next) => {
//     try {
//         const count = await Reservation.countDocuments({ duration: req.query.duration });
//         res.status(200).json({ count });
//     } catch (err) {
//         next(err);
//     }
// };