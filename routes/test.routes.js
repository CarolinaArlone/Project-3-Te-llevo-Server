const router = require('express').Router()

router.get('/test', (req, res, next) => res.send('ok'))

module.exports = router
