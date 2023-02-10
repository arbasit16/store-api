'use strict'

const Product = require('../models/product')
const ResourceNotFoundError = require('../errors/resource-not-found-error')

class ProductService {

    async createProduct(product, user) {
        product.createdBy = user._id
        let createdProduct = await Product.create(product)
        return createdProduct
    }

    async createVariation(variation, productId) {

        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new ResourceNotFoundError('product not found')
        }

        console.log('variation')
        console.log(variation)

        let product = await Product.findOneAndUpdate(
            { _id: productId }, 
            { $push: { 'variations': variation }},
            { upsert: true, new: true }
        )

        return product
    }

    async getProducts(query) {
        //Product.findM
    }

}

module.exports = ProductService