import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({   
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
        required: true
    },
    serviceName: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    // salonistId: {
    //     type: String,
    //     required: true
    // },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
