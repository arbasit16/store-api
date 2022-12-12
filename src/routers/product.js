'use strict'

const controller = require('../controllers/product')
const router = require('express').Router()
const auth = require('../middleware/auth')
const validator = require('../middleware/validators/product')

router.post(
    '/',
     auth.verifyAdmin, 
     validator.createProduct,
     controller.createProduct
     )

module.exports = router