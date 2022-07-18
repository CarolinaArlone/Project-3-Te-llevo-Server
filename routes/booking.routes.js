const router = require('express').Router()
const { Router } = require('express')
const Booking = require('../models/Booking.model')
const User = require('../models/User.model')

//CREATE BOOKING

router.post('/create', (req, res) => {
    // res.json({ message: 'Funciona crear' })
    const { user_id } = req.query
    const { startDate, endDate, bookedCar } = req.body
    let bookingId = ''
    let newBooking = {}

    Booking
        .create({ startDate, endDate, bookedCar })
        .then((booking) => {
            newBooking = booking
            bookingId = booking._id
            return User.findByIdAndUpdate(user_id, { $push: { UserBookings: bookingId } })
        })
        .then(() => res.json(newBooking))
        .catch((err) => res.status(500).json(err))

})

//ALL BOOKINGS
router.get('/all', (req, res) => {

    // res.json({message: 'Funciona all'})
    Booking
        .find()
        .then(response => res.json(response))
        .catch((err) => res.status(500).json(err))
})

//FIND BOOKING

router.get('/:booking_id', (req, res) => {

    const { booking_id } = req.params

    Booking
        .findById(booking_id)
        .then(response => res.json(response))
        .catch((err) => res.status(500).json(err))
})

//EDIT BOOKING

router.post(':booking_id/edit', (req, res) => {

    const { booking_id } = req.params

    const { startDate, endDate, bookedCar } = req.body

    Booking
        .findByIdAndUpdate(booking_id, (startDate, endDate, bookedCar))
        .then(response => res.json(response))
        .catch((err) => res.status(500).json(err))
})

//DELETE

router.post(':booking_id/delete', (req, res) => {

    const { booking_id } = req.params

    Booking.findByIdAndDelete(booking_id)
        .then(response => res.json(response))
        .catch((err) => res.status(500).json(err))

})

module.exports = router