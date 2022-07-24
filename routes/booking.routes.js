const router = require('express').Router()
const Booking = require('../models/Booking.model')
const Car = require('../models/Car.model')
const User = require('../models/User.model')

const { isAuthenticated } = require('./../middlewares/jwt.middleware')

//create booking
router.post('/create', isAuthenticated, (req, res) => {

    const { startDate, endDate, bookedCar } = req.body
    const { _id: user } = req.payload

    let bookingId = ''
    let newBooking = []

    Booking
        .create({ startDate, endDate, bookedCar, user })
        .then((booking) => {
            newBooking = booking
            bookingId = booking._id
            return Car.findByIdAndUpdate(car_id, { $push: { reservations: booking } })
        })
        .then(() => res.json(newBooking))
        .catch(err => res.status(500).json({ errorMessage: err.message }))

})

//all booking
router.get('/all', (req, res) => {

    Booking
        .find()
        // .select()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//find booking
router.get('/:booking_id', (req, res) => {

    const { booking_id } = req.params

    Booking
        .findById(booking_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//edit booking
router.put(':booking_id/edit', (req, res) => {

    const { booking_id } = req.params
    const { startDate, endDate, bookedCar } = req.body

    Booking
        .findByIdAndUpdate(booking_id, (startDate, endDate, bookedCar))
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//delete
router.delete(':booking_id/delete', (req, res) => {

    const { booking_id } = req.params

    Booking
        .findByIdAndDelete(booking_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))

})

//user booking
router.get('/user/:user_id', (req, res) => {

    const { user_id } = req.params

    Booking
        .find(user_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})



module.exports = router