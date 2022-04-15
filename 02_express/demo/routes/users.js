const _ = require('lodash')
const express = require('express')
const router = express.Router()
const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

// Get user data
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    res.send(user)
})

// Register users
router.post('/', async(req, res) => {
    // Validate
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Verify if user already exists
    let user = await User.findOne({ email: req.body.email })
    if ( user ) return res.status(400).send("User already registered!")

    // Create new user
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    // Create JWT to be added in response header
    const token = user.generateAuthToken()

    // Select the visible elements for the user
    user = _.pick(user, ['_id', 'name', 'email'])

    res.status(201)
        .header('x-auth-token', token)    
        .send(user)
})

module.exports = router