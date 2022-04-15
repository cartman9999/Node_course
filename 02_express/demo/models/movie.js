const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require('./genre')

// Create model
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
}))

/**
 * Validation
 */
function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    })

    return schema.validate(movie)
}

exports.Movie = Movie
exports.validate = validateMovie