const config = require('config')

module.exports = function () {
    // Configuration
    console.log("Application name: " + config.get('name') )
    
    // Get JWT Private Key from config files
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
        process.exit(1)
    }
}