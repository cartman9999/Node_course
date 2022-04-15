const express = require('express')
const router = express.Router()
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")
const { User } = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async(req, res) => {
    // Validate
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Get user
    let user = await User.findOne({ email: req.body.email})
    if (!user) return res.status(400).send("Invalid email or password")

    // Compare passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid email or password")

    // Create JSON Web Token JWT
    const token = user.generateAuthToken()

    return res.status(200).send(token)
})

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: passwordComplexity().required()
    })  

    return schema.validate(user)
}

module.exports = router