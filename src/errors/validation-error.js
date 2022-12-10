'use strict'

class ValidationError extends Error {

    constructor(response) {
        super()
        this.response = response
    }
}

module.exports = ValidationError