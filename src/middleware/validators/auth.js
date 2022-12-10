'use strict'

const validator = require('express-validator')
const { checkValidationResult, passwordPattern } = require('./helpers')

const loginValidator = [
    validator.check('email').exists().withMessage('Email is required').bail()
                            .isEmail().withMessage('Email is invalid').bail(),
    validator.check('password').exists().withMessage('Password is required'),
    checkValidationResult
]

const signupValidator = [
    validator.check('firstName').exists().withMessage('First name is required'),
    validator.check('lastName').exists().withMessage('Last name is required'),
    validator.check('email').exists().withMessage('Email is required').bail()
    .isEmail().withMessage('Invalid email'),
    validator.check('password').exists().withMessage('Password is required').bail()
    .matches(passwordPattern, "i")
    .withMessage('Password should have atleast 8 characters, 1 uppercase, 1 numeric and 1 special character'),
    checkValidationResult
]

module.exports.loginValidator = loginValidator
module.exports.signupValidator = signupValidator