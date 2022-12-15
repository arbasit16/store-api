'use strict'

const Product = require('../models/product')

class ProductService {

    async createProduct(product, user) {
        product.createdBy = user._id
        let createdProduct = await Product.create(product)
        return createdProduct
    }

}

module.exports = ProductService