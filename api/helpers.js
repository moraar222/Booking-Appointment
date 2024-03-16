import Reservation from "./models/Reservation";

export const makeReservation = async (req, res) => {
    try {
        const { selectedDate, selectedTime } = req.body;

        // Check if a reservation already exists for the selected date and time
        const existingReservation = await Reservation.findOne({
            selectedDate,
            selectedTime,
        });

        if (existingReservation) {
            return res.status(400).json({ message: "Time slot already booked." });
        }

        // Assuming 'startTime' and 'endTime' are extracted from 'selectedTime' in frontend
        const [startTime, endTime] = selectedTime.split('-');

        // Check if it is lunch hour
        const lunchHours = { start: '12:00', end: '13:00' }; // Example lunch hours
        if (isLunchHour(selectedTime, lunchHours)) {
            return res.status(400).json({ message: "Lunch hour is not available." });
        }

        // Create a new reservation document in the database
        const reservation = new Reservation({
            selectedDate,
            startTime,
            endTime,
        });

        // Save the reservation to the database
        await reservation.save();

        res.status(201).json({ message: "Reservation created successfully." });
    } catch (error) {
        console.error("Error occurred during reservation:", error);
        res.status(500).json({ message: "Failed to create reservation." });
    }
}

function isLunchHour(selectedTime, lunchHours) {
    const [start, end] = lunchHours;
    const [selectedStart, selectedEnd] = selectedTime.split
}