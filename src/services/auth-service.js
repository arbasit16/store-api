'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS, TOKEN_SECRET } = require('../config/config')
const User = require('../models/user')
const AuthorizationError = require('../errors/authorizarion-error')
const { config } = require('dotenv')

class AuthService {

    async loginUser(email, password) {

        const user = await User.findOne({email})

        if (user == null) {
            throw new AuthorizationError('Incorrect email or password')
        }

        const passwordMatch = await bcrypt.compare(password, user.password )

        if (passwordMatch) {
            console.log(user._id)
            const token = jwt.sign(user._id.toString(), TOKEN_SECRET)
            return token
        } else {
            throw new AuthorizationError('Incorrect email or password')
        }
    }

    async signupUser(user) {   
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
        user.password = hashedPassword
        user.isVerified = false
        const createdUser = await User.create(user)
        createdUser.password = undefined
        createdUser.__v = undefined
        return createdUser
    }

    async authenticateUser(token) {

        try {
            const userId = jwt.verify(token, TOKEN_SECRET)
            console.log('token id', userId)
            const user = await User.findById(userId)

            if (!user) {
                throw new Error()
            }
           
            return user
        } catch {
            throw new AuthorizationError('Invalid Token')
        }
        
    }
}

module.exports = AuthService