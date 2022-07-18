const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [3, "Your username must have at least three characters"],
      trim: true,
      required: [true, "Username is required"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
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
        minlength: [16, "Invalid card number"],
        maxlength: [16, "Invalid card number"]
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
