'use strict'

const product = require('../models/product')
const ProductService = require('../services/product-service')
const StorageService = require('../services/storage-service')
const productService = new ProductService()

function createProduct(req, res, next) {

    productService.createProduct(req.body, req.user)
    .then((product) => res.status(201).json(product))
    .catch((error) => next(error))
    
}

function createVariation(req, res, next) {
    const productId = req.params.productId
    console.log(req.files)
    productService.createVariation(req.body, req.files, productId)
    .then((product) => res.status(201).json(product))
    .catch((error) => next(error))
}

function getProducts(req, res, next) {
    productService.getProducts(req.query)
    .then((product) => res.json(product))
    .catch((error) => next(error))
}

module.exports = {
    createProduct,
    createVariation,
    getProducts
}