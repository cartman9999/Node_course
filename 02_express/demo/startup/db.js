// Require .env file
require('dotenv').config()

const winston = require('winston')
// Add Windston's transport to log errors
winston.add(new winston.transports.File({ filename: 'logfile.log' }, {'timestamp': true}))

// Define connection to MongoDB
// Add options, required due to superuser added to MongoDB
const options = { 
    dbName: process.env.DB_NAME,
    user: process.env.DB_AUTH_USER, 
    pass: process.env.DB_AUTH_PASS,
    auth: { authSource: process.env.DB_AUTH_DB },
}


// Require Mongoose
const mongoose = require('mongoose')

module.exports = function () {
    // Old connection method
    // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
 
    // New connection method
    mongoose.connect(`mongodb://127.0.0.1:27017/`, options)
        .then(() => winston.info("Connected to MongoDB"))
}