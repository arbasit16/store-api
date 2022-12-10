'use strict'

const validator = require('express-validator')
const helpers = require('./helpers')

const verifyCode = [
    validator.check('code').exists().withMessage('code is required').bail()
    .matches(helpers.verificationCodePattern).withMessage('code must be 4 digits'),
    helpers.checkValidationResult
]

module.exports = {
    verifyCode
}