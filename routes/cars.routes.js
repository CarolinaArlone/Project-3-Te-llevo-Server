const router = require("express").Router();

router.use("/getAllCars", (req, res, next)=> {
res.json({message: 'All cars'})
})

module.exports = router;