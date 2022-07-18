const router = require('express').Router()
const User = require('./../models/User.model')

// ALL USERS

router.get('/all', (req, res) => {
    //res.json({ message: 'Todos los usuarios' })
    User
        .find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))

})

// EDIT USER

router.put("/:user_id/edit", (req, res) => {
    const { user_id } = req.params
    const { username, email, password, role, profileImg } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, password, role, profileImg }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

// EDIT USER IMAGE

router.put('/edit-image', (req, res) => {

    const { user_id } = req.payload
    const { profileImg } = req.body

    User
        .findByIdAndUpdate(user_id, { profileImg }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})

// DELETE USER
router.delete("/:user_id/delete", (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: err.message }))
})


module.exports = router