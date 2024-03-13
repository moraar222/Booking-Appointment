import mongoose from "mongoose";

export const StationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        unavailableDates: [{ type: [Date] }],
    },

    { timestamps: true }
);

export default mongoose.model("Station", StationSchema);
