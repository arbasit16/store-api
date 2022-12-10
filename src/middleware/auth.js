'use strict'

const AuthService = require('../services/auth-service')
const AuthorizationError = require('../errors/authorizarion-error')
const VerificationService = require('../services/verification-service')
const authService = new AuthService()
const verificationService = new VerificationService()


function authHandler(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        next(new AuthorizationError("An access token is required"))
    }

    const token = authHeader.split(' ')[1]

    authService.authenticateUser(token)
    .then((user) => { 
        req.user = user 
        next()
    })
    .catch((error) => { next(error) })
}

async function verificationHandler(req, res, next) {

    const user = req.user
    const isUserVerified = await verificationService.getVerificationStatus(user)

    if (!isUserVerified) {
        next(new AuthorizationError('Your email must be verified to access this resource'))
    }

    next()

}

module.exports = {
    authHandler,
    verificationHandler
}