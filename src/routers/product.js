'use strict'

const controller = require('../controllers/product')
const router = require('express').Router()
const auth = require('../middleware/auth')
const validator = require('../middleware/validators/product')
const multer = require('multer')
const upload = multer()

router.post(
    '/',
     auth.verifyAdmin, 
     validator.createProduct,
     controller.createProduct
     )

router.post(
    '/:productId/variations',
    upload.array('images'),
    validator.createVariation,
    controller.createVariation
)

module.exports = router