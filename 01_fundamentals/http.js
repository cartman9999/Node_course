const http = require('http')

// Creating a web server, to keep in mind that this server is also an Event Emitter
// that means that it has all the capabilities of an Event Emitter
// const server = http.createServer()

// Everytime there is a new connection, the server raises an event, so we can use
// the on() method to listen to the event, the name of the event is "connection"
// Code is commented because in real world applications when wont be 
// firing an event each time
// server.on('connection', (socker) => console.log("New connection"))

// Real life example
// We use an arrow function to work with request and response objects
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World")
        res.end()
    }

    if (req.url === "/api/courses") {
        res.write(JSON.stringify([
            1,2,3
        ]))
        res.end()
    }
})


// To add a port to the server we use listen()
server.listen(3333)
console.log(`Listening on Port: 3333`)
console.log("http://localhost:3333")