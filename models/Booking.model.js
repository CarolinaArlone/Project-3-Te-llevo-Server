const mongoose = require("mongoose")
const { Schema, model } = mongoose

const bookingSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        bookedCar: {
            type: Schema.Types.ObjectId,
            ref: "Car",
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);
module.exports = model("Booking", bookingSchema)