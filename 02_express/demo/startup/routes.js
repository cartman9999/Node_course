const express = require('express')
const error = require('../middleware/error')

// Requires Routes
const home = require('../routes/home')
const courses = require('../routes/courses')
const genres = require('../routes/genres')
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')

module.exports = function (app) {
    // Enable parsing body as JSON
    app.use(express.json())
    
    // Define use of routes
    app.use('/api/courses', courses)
    app.use('/api/genres', genres)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use('/', home)

    // Define Error Middleware
    app.use(error)
}