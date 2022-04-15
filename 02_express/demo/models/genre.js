const mongoose = require('mongoose')
const Joi = require('joi')

// Defining Schema
const genreSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255 
    }
})

// Creating a Model class
const Genre = mongoose.model('Genre', genreSchema)


/**
 * Validations
 */
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre)
}

exports.Genre = Genre
exports.genreSchema = genreSchema
exports.validate = validateGenre