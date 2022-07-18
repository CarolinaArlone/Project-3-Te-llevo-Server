const router = require("express").Router()

router.use('/cars', require('./cars.routes'))

router.use('/', require('./test.routes'))

module.exports = router
