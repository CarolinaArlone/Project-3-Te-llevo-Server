const router = require('express').Router()

const Car = require('./../models/Car.model')

//all cars
router.get('/all', (req, res, next) => {

    Car
        .find()
        .then(cars => res.status(200).json(cars))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//create new car
router.post('/create', (req, res, next) => {

    const {
        brand, model, plate, description, imageUrl, dayPrice, size,
        transmission, fuelType, seats, CarRating, reviews, longitude, latitude
    } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const newCar = {
        brand, model, plate, description, imageUrl, dayPrice, size,
        transmission, fuelType, seats, CarRating, reviews, location
    }

    Car
        .create(newCar)
        .then(car => res.status(200).json(car))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//get car by id
router.get('/:car_id', (req, res, next) => {

    const { car_id } = req.params

    Car
        .findById(car_id)
        .populate('reviews')
        .then(car => res.status(200).json(car))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//edit car
router.post('/:car_id/edit', (req, res, next) => {

    const { car_id } = req.params

    const {
        description, imageUrl, dayPrice, CarRating, reviews, location
    } = req.body

    Car
        .findByIdAndUpdate(car_id, { description, imageUrl, dayPrice, CarRating, reviews, location })
        .then(car => res.status(200).json(car))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//delete car
router.post('/:car_id/delete', (res, req, next) => {

    const { car_id } = req.params

    Car
        .findByIdAndDelete(car_id)
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//add review to car
router.post('/add-review', (req, res, next) => {

    const { car_id, review_id } = req.body

    Car
        .findByIdAndUpdate(car_id, { $push: { reviews: review_id } })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

module.exports = router