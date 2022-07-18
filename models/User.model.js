const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [3, "Su nombre de usuario debe tener al menos tres caracteres"],
      trim: true,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
    profileImg: {
      type: String,
      default: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    },
    paymentDetails: {
      card: {
        type: Number,
        minlength: [16, "Número de tarjeta no válido"],
        maxlength: [16, "Número de tarjeta no válido"]
      }
    },
    UserBookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking'

      }
    ]
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema);

module.exports = User;
