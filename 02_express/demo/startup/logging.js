const winston = require('winston')

// Add Middlewares to Express and require express
require('express-async-errors')

module.exports = function () {
    // Catch uncaught Exceptions
    process.on('uncaughtException', (ex) => {
        console.log('UNCAUGHT EXCEPTION OCURRRED')
        winston.error(ex.message, ex)
        process.exit(1)
    })

    // Catch unhandled rejection
    process.on('unhandledRejection', (ex) => {
        console.log('UNHANDLED REJECTION OCURRRED')
        winston.error(ex.message, ex)
        process.exit(1)
    })

    // Add Windston's transport to log errors
    winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true}))
    winston.add(new winston.transports.File({ filename: 'logfile.log' }, {'timestamp': true}))
}