const express = require('express')
const { Genre } = require('../models/genre')
const router = express.Router()
const { Movie, validate } = require('../models/movie')
const auth = require('../middleware/auth')

router.get('/', auth, async(req, res) => {
    try {
        const movies = await Movie.find({})
        
        return res.status(200).send(movies)
    } catch (err) {
        console.err(err.message)
        return res.status(500).send("An error ocurred while retriving the movies.")
    }
})

router.post('/', auth, async(req, res) => {
    // Validate
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        // Verify if Genre exists
        const genre = await Genre.findById(req.body.genreId)
        if (!genre) return res.status(400).send('Invalid genre.')

        const { title, numberInStock, dailyRentalRate } = req.body
        const movieData = {
            title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock,
            dailyRentalRate
        }

        const movie = new Movie(movieData)
        await movie.save()

        return res.status(201).send(movie)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("An error ocurred while creating movie.")
    }
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    const { title, numberInStock, dailyRentalRate } = req.body
    const movieData = { 
        title,
        genre: {
        _id: genre._id,
        name: genre.name
        },
        numberInStock,
        dailyRentalRate
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, movieData, { new: true });
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
  });
  
  router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  
  router.get('/:id', auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });

module.exports = router