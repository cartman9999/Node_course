const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * Middleware that verifies is JWT is provided and is valid
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (req, res, next) {
    // Verify if header has token
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied. No token provided.')

    // Verify if token is valid
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).send('Access denied. Invalid token.')
    }
}