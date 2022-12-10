'use strict'

const mongoose = require('mongoose')
const ValidationError = require('../errors/validation-error')

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})


schema.post('save', (error, doc, next) => {
    
    if (error.name == 'MongoServerError' && error.code == 11000) {
        const errorMessage = {
            msg: "An account already exists with this email",
            param: "email"
        }
        next(new ValidationError([errorMessage]))
    } else {
        next()
    }
})

module.exports = mongoose.model('User', schema)