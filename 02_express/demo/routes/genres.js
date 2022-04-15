// Se deja de usar el middleware cuando se instala express-async-errors
// const asyncMiddleware = require('../middleware/async')

const express = require('express')
const router = express.Router()
const { Genre, validate } = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
    const genres = await Genre.find({}).sort('name')
    return res.send(genres)
})

router.get('/:id', async (req, res) => {
    // req.params -> Used to read data required in route
    // req.query -> Used to read additional paramets sent as query parameters in the route
    // req.body -> Used to read data that travel through the request body
    const genre = await Genre.findById(req.params.id)
    return res.send(genre)
})

router.post('/', auth, async (req, res) => {
    // Validate
    const { error } = validate(req.body)

    // If error
    if (error) return res.status(400).send(error.details[0].message)
    
    // Create new genre
    const genre = new Genre({ name: req.body.name })

    try {
        await genre.save()
        res.status(201).send(genre)
    } catch (err) {
        for (field in err.errors) {
            console.error(`${field}: ${err.errors[field].message}`)
        }
    }
})

router.put('/:id', auth, async (req, res) => {
    // Validate
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // Verify that given id exists
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true})
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')

    return res.status(200).send(genre)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    // Verify that given id exists
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')

    res.status(200).send({
        message: "Genre succesfully deleted.",
        genre: genre
    })
})

module.exports = router