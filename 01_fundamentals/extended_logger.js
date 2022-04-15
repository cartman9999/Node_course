const EventEmitter = require('events')

const url = 'http://mylogger.io/log'

// To assure that we are using the same instance of the event emitter,
// First we new to turn log function into a class,
// Next, we will need to inherit from EventEmitter (that's why we use extends 
// in the definition of the class)
// Then we remove the function and keep log as a method of the class
// Inside the log method it'll be necessary to replace emitter for this
class Logger extends EventEmitter {
    log(message, type) {
        // Send an HTTP request
        console.log(message)
    
        switch (type) {
            case 'messageLogged':
                this.emit('messageLogged', {id: 1, url: "https://google.com"})       
                break;
            case 'error':
                this.emit('error', {user_id: 200, message: "User tried to logging multiple times unsuccesfully"})
                break;
            default:
                console.log('No listener found')
                break;
        }
    }
}

// Export should change to export the Logger Class
module.exports = Logger