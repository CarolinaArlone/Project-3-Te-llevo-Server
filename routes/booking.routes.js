const router = require('express').Router()
const Booking = require('../models/Booking.model')
const { create } = require('../models/Car.model')
const Car = require('../models/Car.model')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

//create booking
router.post('/create/:car_id', isAuthenticated, (req, res) => {

    const { startDate, endDate } = req.body
    const { _id: user } = req.payload
    const { car_id } = req.params

    Booking
        .create({ startDate, endDate, user })
        .then(booking => {
            return Car.findByIdAndUpdate(car_id, { $push: { reservations: booking._id } })
        })
        .then(newCar => res.status(200).json(newCar))
        .catch(err => res.status(500).json({ errorMessage: err.message }))

})

//get user booked cars
router.get('/user/:user_id', (req, res) => {

    const { user_id } = req.params

    let allBookings = []

    Booking
        .find({ user: user_id })
        .then(bookings => {
            allBookings = bookings
            const allCars = bookings.map(booking => Car.findOne({ reservations: booking._id }))
            return Promise.all(allCars)
        })
        .then(allCars => {
            const response = allBookings.map((elm, idx) => {
                return {
                    booking: elm._doc,
                    car: allCars[idx]
                }
            })
            res.json(response)
        })
        .catch(err => console.log(err))

})

module.exports = router