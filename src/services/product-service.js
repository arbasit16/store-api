'use strict'

const Product = require('../models/product')
const ResourceNotFoundError = require('../errors/resource-not-found-error')
const { v4: uuidv4 } = require('uuid')
const StorageService = require('./storage-service')

class ProductService {

    constructor() {
        this.storageService = new StorageService()
    }

    async createProduct(product, user) {
        product.createdBy = user._id
        let createdProduct = await Product.create(product)
        return createdProduct
    }

    async createVariation(variation, files, productId) {

        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new ResourceNotFoundError('product not found')
        }

        let keys = files.map(() => uuidv4())
        variation.images = keys

        let product = await Product.findOneAndUpdate(
            { _id: productId }, 
            { $push: { 'variations': variation }},
            { upsert: true, new: true }
        )

        this.uploadImages(files, keys)

        let signedProduct = await this.updateProductImageUrls(product)

        return signedProduct
    }

    async uploadImages(images, keys) {
        for (const [index, image] of images.entries()) {
            this.storageService.uploadFile(image.buffer, keys[index])
        }
    }

    async updateProductImageUrls(product) {
        for (const [variationIndex, variation] of product.variations.entries()) {
            for (const [imageIndex, image] of variation.images.entries()) {
                let signedUrl = await this.storageService.getKeyUrl(image)
                product.variations[variationIndex].images[imageIndex] = signedUrl
            }
        }
        return product
    }

    async getProducts(query) {
        let limit = query.limit ?? 10
        let page = query.page ?? 0
        let search = query.query ?? ""
        let skip = (page - 1) * limit
        let textQuery = {}

        if (search.length) {
            textQuery.$text = { $search: search }
        }
        let products = await Product.find(
            textQuery, 
            null, 
            { skip, limit }
            )
        let promises = products.map((product) => this.updateProductImageUrls(product))
        let signedProducts = await Promise.all(promises)

        return  signedProducts
    }

    async getProduct(id) {
        let product = await Product.findById(id)
        if (product == null) {
            throw new ResourceNotFoundError('product not found')
        }
        let updatedProduct = await this.updateProductImageUrls(product)
        return updatedProduct
    }
}

module.exports = ProductService