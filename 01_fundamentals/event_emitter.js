// Require EventEmitter class
const EventEmitter = require('events')

// Create instance of the class
const emitter = new EventEmitter()

// Declaring a listener, here when can use on() or addEventListener(); they are the same
// Listener should always be declared before emitter, otherwise nothing will happen
emitter.on('messageLogged', (eventArg) => {
    console.log('Listener called ', eventArg)
})

// emit() is used to raise an event, ir order to actually do
// something with the event we should declare a listener 
// pameters can be send to the listener separated by comma, but its a better practice to
// send parameters as an object
emitter.emit('messageLogged', {id: 1, url: "https://google.com"})

// Exercise create a logging event
emitter.on('userLogging', (eventArg) => console.log(`User Id: ${eventArg.user_id} Trying to log in.`))

emitter.emit('userLogging', {user_id: 10, name: "Eric"})