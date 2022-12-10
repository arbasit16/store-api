'use strict'

const validator = require('express-validator')
const { checkValidationResult, passwordPattern  } = require('./helpers')

const updateUser = [
    validator.oneOf([
        validator.check('firstName').isString().withMessage('Atleast 1 field is required').bail(),
        validator.check('lastName').isString().withMessage('Atleast 1 field is required').bail(),
    ], 'Atleast 1 parameter is required'),
   
    checkValidationResult
]

const resetPassword = [
    validator.check('oldPassword').exists().withMessage('Old password is required').bail()
    .matches(passwordPattern).withMessage('Password should have atleast 8 characters, 1 uppercase, 1 numeric and 1 special character'),
    validator.check('newPassword').exists().withMessage('New password is required').bail()
    .matches(passwordPattern).withMessage('Password should have atleast 8 characters, 1 uppercase, 1 numeric and 1 special character')
    .custom((value, { req }) => {
        if (value == req.body.oldPassword) {
            throw new Error('New Password must be different from old password')
        }
        return true
    }),
    checkValidationResult
]

module.exports = {
    updateUser,
    resetPassword
}