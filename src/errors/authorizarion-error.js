'use strict'

class AuthorizationError extends Error {

    constructor(message) {
        super(message)

        this.message = message
    }

}

module.exports = AuthorizationError