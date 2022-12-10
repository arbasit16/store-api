'use strict'

const router = require('express').Router()
const controller = require('../controllers/user')
const validator = require('../middleware/validators/user')

router.get('/', controller.getUser)
router.put('/', validator.updateUser, controller.updateUser)
router.post('/reset-password', validator.resetPassword, controller.resetPassword)

module.exports = router

