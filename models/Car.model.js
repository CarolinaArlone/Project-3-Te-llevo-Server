const { Schema, model } = require("mongoose");

const carSchema = new Schema(
    {
      
        carbrand: {
            type: String,
            required: [true, "Por favor indique la marca del vehículo"],
        },
        carModel: {
            type: String,
            required: [true, "Por favor indique el modelo del vehículo"],
        },
        carPlate: {
            type: String,
            required: [true, "Por favor indique la matricula del vehículo"],
        },
        description: {
            type: String,
            required: [true, "Por favor indique la descripción del vehículo"],
            minlength: [4, "La descropción debe tener al menos 4 caracteres"],
        },
        imageUrl: {
            type: String,
        },
        dayPrice: {
            type: Number,
            required: true,
        },
        sizeCar: {
            type: String,
            enum: ['SMALL', 'LARGE', 'MEDIUM', 'FAMILY', 'VAN', 'ELECTRIC'],
            required: [true, "Por favor indique el tamaño del vehículo"]
        },
        transmission: {
            type: String,
            enum: ['MANUAL', 'AUTOMATIC'],
            required: [true, "Por favor indique la transmisión del vehículo"],
        },
        fuelType: {
            type: String,
            enum: ['PETROL', 'DIESEL', 'ELECTRIC'],
            required: [true, "Por favor indique el tipo de fuel del vehículo"],
        },
        seats: {
            type: String,
            min: 3,
            max: 9,
            required: [true, "Por favor indique el número de asientos del vehículo"],
        },
      
    },
    {
        timestamps: true,
    }
);
vanSchema.index({ location: "2dsphere" });

const Car = model("Car", carSchema);

module.exports = Car;