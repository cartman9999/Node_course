const { Rental, validate } = require('../models/rental')
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')
const Fawn = require('fawn')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// Initialize Fawn
Fawn.init(`mongodb://localhost/${process.env.DB_NAME}`)

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')

    res.send(rentals)
})

router.post('/', auth, async (req, res) => {
    // Validate input
    const { error } = validate(req.body)
    console.log(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Find Customer
    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send('Invalid customer')

    // Find Movie
    const movie = await Movie.findById(req.body.movieId)
    
    // const movie2 = Movie.findOne({ _id: req.body.movieId})
    // console.log(movie2.title)

    if (!movie) return res.status(400).send('Invalid movie')

    // Verify that movie stock is available
    if (movie.numberInStock == 0) return res.status(400).send('Movie not available')

    // Create new Rental
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    // This lines are replaced with Fawn to create a "transaction"
    // rental = await rental.save()
    // // Update movie number in stock
    // movie.numberInStock--
    // movie.save()

    try {
        var task = Fawn.Task()

        console.log(`Movie: ${movie}`)

        task.save('rentals', rental)
        .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 }})
        .run()
        .then((results) => {
            // Return rental
            return res.send({
                rental
                // results
            })
        })
    } catch (er) {
        res.status(500).send(er.message)
    }
})

module.exports = router