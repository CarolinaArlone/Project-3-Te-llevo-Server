const router = require("express").Router()

router.use("/cars", require('./cars.routes'))
router.use("/booking", require('./booking.routes'))
router.use("/user", require('./user.routes'))
router.use("/auth", require('./auth.routes'))
router.use("/upload", require('./upload.routes'))
router.use('/', require('./test.routes'))

module.exports = router
