const router = require("express").Router()

router.use("/cars", require('./cars.routes'))
router.use("/booking", require('./booking.routes'))

router.use('/', require('./test.routes'))

module.exports = router