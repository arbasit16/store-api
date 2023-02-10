'use strict'

const mongoose = require('mongoose')

const variation = mongoose.Schema({
    type: String,
    value: String,
    images: [String],
    price: Number,
    inStock: Boolean
})

const schema = mongoose.Schema({
    name: String,
    description: String,
    keywords: [String],
    isActive: { type: Boolean, default: false },
    variations: [variation],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', schema)



