const router = require('express').Router()

const Car = require('./../models/Car.model')

const { isAuthenticated } = require('./../middlewares/jwt.middleware')

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
        .then(car => res.status(200).json(car))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//get car by id
router.get('/:car_id', (req, res) => {

    const { car_id } = req.params

    Car
        .findById(car_id)
        // .populate('reviews')
        .then(car => {
            console.log('???????', car)
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
router.put('/:car_id/add-review', (req, res) => {

    const { car_id, review_id } = req.body

    Car
        .findByIdAndUpdate(car_id, { $push: { reviews: review_id } })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

//car reviews
router.post('/:car_id/create/review', isAuthenticated, (req, res) => {

    const { rating, content } = req.body
    const user = req.payload._id
    const { car_id } = req.params

    Review
        .create({ user, content, rating })
        .then(review => {
            Car.findByIdAndUpdate(car_id, { $push: { reviews: review } })
            res.json(review)
        })
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

module.exports = router