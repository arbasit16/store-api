'use strict'

const mongoose = require('mongoose')

const schema = mongoose.Schema({
    code: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isVerified: Boolean
}, { timestamps: true })

module.exports = mongoose.model('VerificationCode', schema)