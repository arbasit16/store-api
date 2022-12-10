'use strict'

const router = require('express').Router()
const controller = require('../controllers/auth')
const validator = require('../middleware/validators/auth')

router.post('/login', 
        validator.loginValidator,
        controller.login)

router.post('/signup',
        validator.signupValidator,
        controller.signup)

module.exports = router