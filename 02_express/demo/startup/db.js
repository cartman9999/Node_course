const config = require('config')
const mongoose = require('mongoose')
const winston = require('winston')

// Add Windston's transport to log errors
winston.add(new winston.transports.File({ filename: 'logfile.log' }, {'timestamp': true}))

// Define connection to MongoDB
const db = config.get('db')

// Add options, required due to superuser added to MongoDB
const options = { 
    dbName: config.get('db_name'),
    user: config.get('db_auth_user'), 
    pass: config.get('db_auth_pass'),
    auth: { authSource: config.get('db_auth_db') },
}

module.exports = function () {
    mongoose.connect(db, options)
        .then(() => winston.info(`Connected to ${db}`))
}