'use strict'

const ValidationError = require("../errors/validation-error")
const AuthorizarionError = require('../errors/authorizarion-error')
const ResourceNotFoundError = require('../errors/resource-not-found-error')
const RateExceededError = require('../errors/rate-exceeded-error')

function errorHandler(error, req, res, next) {

    if (error instanceof ValidationError) {
        if (error.response instanceof Array) {
            res.status(422).json({ errors: error.response })
        } else {
            res.status(422).json({ error: error.response })
        }
    } else if (error instanceof AuthorizarionError) {
        res.status(401).json({error: error.message})
    } else if (error instanceof ResourceNotFoundError) {
        res.status(404).json({error: error.message})
    } else if (error instanceof RateExceededError) {
        res.status(429).json({ error: error.message })
    } else {
        console.log('unidentified error', error)
        next(error)
    }
}

module.exports = errorHandler
