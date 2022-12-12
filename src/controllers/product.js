'use strict'

const ProductService = require('../services/product-service')
const productService = new ProductService()

function createProduct(req, res, next) {

    let user = req.user
    productService.createProduct(req.body, user)
    .then((product) => res.json(product))
    .catch((error) => next(error))

}

module.exports = {
    createProduct
}