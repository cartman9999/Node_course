const config = require('config')

module.exports = function () {
    // Configuration
    console.log("Application name: " + config.get('name') )
    console.log("Mail server: " + config.get('mail.host') )
    console.log("Mail password: " + config.get('mail.password') )
    
    // Get JWT Private Key from config files
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
        process.exit(1)
    }
}