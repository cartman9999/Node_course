const mongoose = require('mongoose')
const Joi = require('joi')

// Create model
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        maxlength: 50
    }
}))

/**
 * Validations
 */
function validateCustomer (data) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(50).required(),
        isGold: Joi.boolean(),
    })

    return schema.validate(data)
}

exports.Customer = Customer
exports.validate = validateCustomer