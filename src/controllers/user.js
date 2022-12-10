'use strict'

const user = require('../models/user')
const UserService = require('../services/user-service')
const userService = new UserService()

function getUser(req, res, next) {

    userService.getUser(req.user._id)
    .then((user) => { res.json(user) })
    .catch((error) => { next(error) })

}

function updateUser(req, res, next) {

    const userId = req.user._id

    userService.updateUser(userId, req.body)
    .then((user) => { res.json(user) })
    .catch((error) => { next(error) })

}

function resetPassword(req, res, next) {

    const { oldPassword, newPassword } = req.body
    
    userService.resetPassword(req.user._id, oldPassword, newPassword)
    .then(() => { res.json({ success: true }) })
    .catch((error) => { next(error) })

}

module.exports = {
    getUser,
    updateUser,
    resetPassword
}