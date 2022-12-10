'use strict'

const ValidationError = require('../../errors/validation-error')
const validator = require('express-validator')

function checkValidationResult(req, res, next) {
    
    const result = validator.validationResult(req)

    if (result.errors.length) {
        next(new ValidationError(result.errors))
        return
    }

    next()
}

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
const verificationCodePattern = /^\d{4}$/

module.exports = {
    checkValidationResult,
    passwordPattern,
    verificationCodePattern
}

