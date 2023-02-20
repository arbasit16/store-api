'use strict'

const controller = require('../controllers/product')
const router = require('express').Router()
const auth = require('../middleware/auth')
const validator = require('../middleware/validators/product')
const multer = require('multer')
const upload = multer()

router.get(
    '/',
    validator.getProducts,
    controller.getProducts
)

router.post(
    '/',
     auth.verifyAdmin, 
     validator.createProduct,
     controller.createProduct
     )

router.post(
    '/:productId/variations',
    auth.verifyAdmin, 
    upload.array('images'),
    validator.createVariation,
    controller.createVariation
)

router.get(
    '/:productId',
    controller.getProduct
)

module.exports = router