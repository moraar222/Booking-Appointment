import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: false,
    },
    salonId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;