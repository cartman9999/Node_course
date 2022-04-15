const url = 'http://mylogger.io/log'

function log(message) {
    // Send an HTTP request
    console.log(message)
}

// Left side of the '=' defines outside name to be used of the other files
// This way is useful when there are many functions that we want to export
// module.exports.log = log
// module.exports.endPoint = url

// Since we are only exporting one function, the best way to export is this one:
module.exports = log