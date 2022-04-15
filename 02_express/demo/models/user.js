const mongoose = require('mongoose')
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")
const jwt = require('jsonwebtoken')
const config = require('config')

// User Schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5, 
        maxlength: 255 
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: Boolean
})

// Crete method inside User Schema to add JWT's
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
}

// Creating a Model class
const User = mongoose.model('User', userSchema)


/**
 * Validations
 */
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: passwordComplexity().required()
    })

    return schema.validate(user)
}

exports.User = User
exports.validate = validateUser