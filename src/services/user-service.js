'use strict'

const bcrypt = require('bcrypt')
const ResourceNotFoundError = require('../errors/resource-not-found-error')
const AuthorizarionError = require('../errors/authorizarion-error')
const User = require('../models/user')
const { SALT_ROUNDS } = require('../config/config')

class UserService {

    async getUser(id) {

        const user = await User.findById(id).select('-password -__v')

        if (!user) {
            throw new ResourceNotFoundError('User not found')
        }

        return user 

    }

    async updateUser(id, parameters) {

        const updatedUser = await User.findByIdAndUpdate(id, 
            { $set: { firstName: parameters.firstName, lastName: parameters.lastName }}, 
            { new: true })
            .select('-password -__v')

        return updatedUser
    }

    async resetPassword(id, oldPassword, newPassword) {

        const user = await User.findById(id)

        if (!user) {
            throw new ResourceNotFoundError('User not found')
        }

        const match = await bcrypt.compare(oldPassword, user.password)

        if (!match) {
            throw new AuthorizarionError('Incorrect Password')
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

        await User.updateOne({ _id: id }, {$set: { password: hashedPassword }})

    }
}

module.exports = UserService