// Require Joi globally and define objectId rule
const Joi = require('joi')

module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi)
}