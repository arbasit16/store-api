'use strict'

const ProductService = require('../services/product-service')
const productService = new ProductService()

function createProduct(req, res, next) {

    productService.createProduct(req.body, req.user)
    .then((product) => res.status(201).json(product))
    .catch((error) => next(error))
    
}

function createVariation(req, res, next) {
    const productId = req.params.productId
    productService.createVariation(req.body, productId)
    .then((product) => res.json(product))
    .catch((error) => next(error))
}

module.exports = {
    createProduct,
    createVariation
}