'use strict'

const ValidationError = require("../errors/validation-error")
const validator = require('express-validator')
const AuthService = require('../services/auth-service')
const authService = new AuthService()


function login (req, res, next) {
    
    authService.loginUser(req.body.email, req.body.password)
    .then((token) => { res.json({ token }) })
    .catch((error) => { next(error) })
}

function signup(req, res, next) {

    authService.signupUser(req.body)
    .then((user) => { res.status(201).json(user) })
    .catch((error) => { next(error) })

}


module.exports = {
    signup,
    login
}
