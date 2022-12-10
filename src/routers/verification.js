'use strict'

const router = require('express').Router()
const controller = require('../controllers/verification')
const validator = require('../middleware/validators/verification')

router.post('/', validator.verifyCode, controller.verifyCode)
router.post('/generate', controller.generateCode)


module.exports = router