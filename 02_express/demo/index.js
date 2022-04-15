// Require .env file
require('dotenv').config()

const winston = require('winston')
// Add Windston's transport to log errors
winston.add(new winston.transports.File({ filename: 'logfile.log' }, {'timestamp': true}))

const debug = require('debug')('app:startup')
const helmet = require('helmet')
const morgan = require('morgan')


// Require Express
const express = require('express')
const app = express()
require('./startup/logging')()
require('./startup/config')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')()

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`ENV: ${app.get('env')}`)

// |-------- Built-in Node JS Middleware ---------|
// Recive url encoded data in the body of the request
app.use(express.urlencoded({ extended: true }))

// Serves static files from a folder, in this case "public"
app.use(express.static('public'))
// |---- End Built-in Node JS Middleware ---------|


// |-------- Third Party Node JS Middleware ---------|
app.use(helmet()) // Helps secure your apps by setting various HTTP headers.


// Set server
const port = process.env.PORT || 3100
app.listen(port, () => winston.info(`Listening on http://localhost:${port}`))