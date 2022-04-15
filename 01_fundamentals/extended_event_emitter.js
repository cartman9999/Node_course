// Extending the event emitter means that there will be a JS file in charge of
// Handling the listeners and the emits should occur in someother file;
// In this case emit will occur in extended_logger.js, hence EventEmitter is now
// required in that file

// Require Logger class and create an instance of Logger
const Logger = require('./extended_logger')
const logger = new Logger()

// Replace emitter for the new instance (logger) and add a listeners to it
logger.on('messageLogged', (eventArg) => {
    console.log('Listener called ', eventArg)
})

logger.on('error', (eventArg) => {
    console.error('Logger Error: ', eventArg)
})

// logger.log('My message test')
logger.log('My message test', 'messageLogged')
logger.log('This is an error test', 'error')
logger.log('Default test', 'test')