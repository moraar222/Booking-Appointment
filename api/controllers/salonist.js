import Salonist from "../models/Salonist.js";

// create salonist's name
export const createSalonist = async (req, res, next) => {
    const newSalonist = new Salonist(req.body);
  
    try {
      const savedSalonist = await newSalonist.save();
      res.status(200).json(savedSalonist);
    } catch (err) {
      next(err);
    }
  };
export const updateSalonistName = async (req, res, next) => {
  try {
    const { salonistId } = req.params;
    const { name } = req.body;

    const updatedSalonist = await Salonist.findByIdAndUpdate(
      salonistId,
      { $set: { name } }, // Update the name field
      { new: true }
    );

    res.status(200).json(updatedSalonist);
  } catch (err) {
    next(err);
  }
};
export const reserveSalonist = async (req, res, next) => {
    const { userId, salonistId } = req.body;
  
    try {
      // Check if the salonist has already been picked by the user
      const existingReservation = await Reservation.findOne({ userId, salonistId });
      if (existingReservation) {
        return res.status(400).json({ error: 'Salonist already picked' });
      }
  
      // If the salonist has not been picked, create a reservation
      const reservation = new Reservation({ userId, salonistId });
      await reservation.save();
      res.json({ message: 'Salonist successfully reserved' });
    } catch (error) {
      console.error('Error reserving salonist:', error);
      res.status(500).json({ error: 'An error occurred while reserving salonist' });
    }
  };

// Update salonist
export const updateSalonist = async (req, res, next) => {
  try {
    const updatedSalonist = await Salonist.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSalonist);
  } catch (err) {
    next(err);
  }
};

// Delete salonist
export const deleteSalonist = async (req, res, next) => {
  try {
    await Salonist.findByIdAndDelete(req.params.id);
    res.status(200).json("Salonist has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Get salonist by ID
export const getSalonist = async (req, res, next) => {
  try {
    const salonist = await Salonist.findById(req.params.id);
    res.status(200).json(salonist);
  } catch (err) {
    next(err);
  }
};

// Get all salonists
export const getSalonists = async (req, res, next) => {
  try {
    const salonists = await Salonist.find();
    res.status(200).json(salonists);
  } catch (err) {
    next(err);
  }
};