const router = require("express").Router();

router.use("/cars", require('./cars.routes'))
router.use("/booking", require('./booking.routes'))

module.exports = router;
