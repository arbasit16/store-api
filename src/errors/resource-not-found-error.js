'use strict'

class ResourceNotFoundError extends Error {

    constructor(message) {
        super()
        this.message = message
    }

}

module.exports = ResourceNotFoundError