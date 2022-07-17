const router = require("express").Router();

router.use("/cars", require('./cars.routes'))

module.exports = router;
