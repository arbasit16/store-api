'use strict'

const validator = require('express-validator')
const { checkValidationResult } = require('./helpers')

const createProduct = [
    validator.check('name').exists().withMessage('name is required').isString('name must be alphanumeric').bail(),
    validator.check('variations').isArray({min: 1}).withMessage('Atleast 1 variation is required').bail(),
    validator.check('variations.*.type').isString().bail(),
    validator.check('variations.*.value').isString().bail(),
    validator.check('variations.*.price').isNumeric().bail(),
    validator.check('variations.*.inStock').isBoolean().bail(),
    checkValidationResult
]

module.exports = {
    createProduct
}