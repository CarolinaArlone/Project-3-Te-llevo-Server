const router = require('express').Router()
const User = require('./../models/User.model')

// ALL USERS

router.get('/all', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// EDIT USER

router.post("/:user_id/edit", (req, res) => {
    const { user_id } = req.params
    const { username, email, password, role, profileImg } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, password, role, profileImg }, { new: true })
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

// EDIT USER IMAGE

router.post('/edit-image', (req, res) => {

    const { user_id } = req.payload
    const { profileImg } = req.body

    User
        .findByIdAndUpdate(user_id, { profileImg }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// DELETE USER
router.post("/:user_id/delete", (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})


module.exports = router