import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    event: {
        type: String,
        default: "Synergia" 
    },
    type: {
        type: String,
        enum: ["Student", "Professional", "Other"], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Booking = mongoose.model("Booking", bookingSchema);