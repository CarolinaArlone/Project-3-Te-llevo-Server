const { Schema, model } = require("mongoose")

const carSchema = new Schema(
    {
        brand: {
            type: String,
            required: [true, "Por favor indique la marca del vehículo"],
        },
        model: {
            type: String,
            required: [true, "Por favor indique el modelo del vehículo"]
        },
        plate: {
            type: String,
            required: [true, "Por favor indique la matricula del vehículo"]
        },
        description: {
            type: String,
            required: [true, "Por favor indique la descripción del vehículo"],
            minlength: [4, "La descripción debe tener al menos 4 caracteres"]
        },
        imageUrl: {
            type: String,
        },
        dayPrice: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            enum: ['SMALL', 'LARGE', 'MEDIUM', 'FAMILY', 'VAN'],
            required: [true, "Por favor indique el tamaño del vehículo"]
        },
        transmission: {
            type: String,
            enum: ['MANUAL', 'AUTOMATIC'],
            required: [true, "Por favor indique la transmisión del vehículo"]
        },
        fuelType: {
            type: String,
            enum: ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID'],
            required: [true, "Por favor indique el tipo de fuel del vehículo"]
        },
        seats: {
            type: String,
            min: 2,
            max: 9,
            required: [true, "Por favor indique el número de asientos del vehículo"]
        },
        carRating: {
            type: Number,
            default: 5,
            min: 0,
            max: 5
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        reservations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Booking'
            }
        ],
        location: {
            type: [Number]
        }
    },
    {
        timestamps: true
    }
)

carSchema.index({ location: "2dsphere" })
const Car = model("Car", carSchema)
module.exports = Car