const router = require('express').Router()
const Car = require('./../models/Car.model')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const Review = require('./../models/Review.model')

//all cars
router.get('/all', (req, res) => {

    Car
        .find()
        // .select()
        .then(cars => res.status(200).json(cars))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//create new car
router.post('/create', isAuthenticated, (req, res) => {

    const {
        brand, model, plate, description, imageUrl, dayPrice, size,
        transmission, fuelType, seats, carRating, longitude, latitude
    } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const newCar = {
        brand, model, plate, description, imageUrl, dayPrice, size,
        transmission, fuelType, seats, carRating, location
    }

    Car
        .create(newCar)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => res.status(500).json({ errorMessage: err.message }))

})

//get car by id
router.get('/:car_id', (req, res) => {

    const { car_id } = req.params

    Car
        .findById(car_id)
        .populate('reservations reviews')
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//edit car
router.put('/:car_id/edit', (req, res) => {

    const { car_id } = req.params

    const {
        brand, model, plate, description, imageUrl, dayPrice, size, seats,
        transmission, fuelType, carRating, latitude, longitude
    } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Car
        .findByIdAndUpdate(car_id, {
            brand, model, plate, description, imageUrl, dayPrice, size, seats,
            transmission, fuelType, carRating, location
        })
        .then(car => res.status(200).json(car))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//delete car
router.delete('/:car_id/delete', (req, res) => {

    const { car_id } = req.params
    console.log('desde el servidor------', car_id)
    Car
        .findByIdAndDelete(car_id)
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//add review to car
router.put('/:car_id/add-review/:user_id', (req, res) => {

    const { car_id, user_id } = req.params
    const { content } = req.body

    const newReview = { content, user: user_id }

    Review
        .create(newReview)
        .then(review => {
            Car
                .findByIdAndUpdate(car_id, { $push: { reviews: review._id } })
                /* .populate('reviews') */
                .then(review => res.status(200).json(review))
        })
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//add rate to car
router.put('/:car_id/add-car-rating', (req, res) => {

    const { car_id } = req.params
    const { carRating } = req.body

    Car
        .findById(car_id)
        .then(car => {
            let newCarRating = (car.carRating + rate / 2).toFixed(2)
        })
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//get booked dates
router.get('/:car_id/booked-dates', (req, res) => {

    const { car_id } = req.params

    let bookedDates = []

    Car
        .find({ _id: car_id })
        .populate('reservations')
        .then(cars => {
            cars[0].reservations.forEach(booking => {
                const date = new Date(booking.startDate)
                while (date <= booking.endDate) {
                    bookedDates.push(new Date(date))
                    date.setDate(date.getDate() + 1)
                }
            })
            res.status(200).json(bookedDates)
        })
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

module.exports = router