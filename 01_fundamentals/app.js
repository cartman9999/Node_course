// // global objects in JS that are available in Node
// console.log() 
// setTimeout()
// clearTimeout()
// setInterval()
// clearInterval()

// // Additional global objects available in Node
// global.console.log() 
// global.setTimeout()
// global.clearTimeout()
// global.setInterval()
// global.clearInterval()

// Node works with modules, in a real world 
// application we would usually split our project into multiple files 
// with a single responsability, to achive that in Node we need to use modules. 
// As an analogy in terms of OOP each variable and function declared on a module 
// are private, by exporting them we are making it public to be used by other files.
// To access those variables and functions in another file, we will need to require them
const log = require('./logger')

log("Mi mensaje")

// Built-in useful Node modules
// File System
// Operative System
// HTTP
// Path
// Process
// Query Strings
// String Decoder


// Using path
const path = require('path')

var pathObj = path.parse(__filename)
console.log(pathObj)
 