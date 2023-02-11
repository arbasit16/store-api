'use strict'

const validator = require('express-validator')
const { checkValidationResult } = require('./helpers')

const createProduct = [
    validator.check('name').exists().withMessage('name is required').isString('name must be alphanumeric').bail(),
    validator.check('keywords').isArray({ min: 1 }).withMessage('keywords are required').bail(),
    checkValidationResult
]

const createVariation = [
    validator.check('type').exists().withMessage('type is required').bail().isString('type must be string').bail(),
    validator.check('value').exists().withMessage('value is required').bail().isString('value must be string').bail(),
    validator.check('price').exists().withMessage('price is required').bail().isNumeric().withMessage('value must be numeric').bail(),
    validator.check('inStock').exists().withMessage('inStock is required').bail().isBoolean().bail(),
    validator.check('images').custom((value, { req }) => {
        if (req.files == undefined || req.files.length == 0) {
            return false
        }
        return true
    }).withMessage('images is required')
    .bail()
    .custom((value, { req }) => {
        return req.files.every((file) => file.mimetype === 'image/jpeg')
    })
    .withMessage('uploaded files must be jpeg images')
    , 
    checkValidationResult
]

const getProducts = [
    validator.query('page').optional().isNumeric().withMessage('page must be a numbers').bail()
    .custom((value) => value >= 1 ).withMessage('page must be greater than 0'),
    validator.query('limit').optional().isNumeric().withMessage('limit must be a numbers').bail()
    .custom((value) => value >= 1 ).withMessage('limit must be greater than 0'),
    validator.query('query').optional().isString().withMessage('query must be a string'),
    checkValidationResult
]

module.exports = {
    createProduct,
    createVariation,
    getProducts
}