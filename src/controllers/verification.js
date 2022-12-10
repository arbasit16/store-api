'use strict'

const VerificationService = require('../services/verification-service')
const verificationService = new VerificationService()

function generateCode(req, res, next) {
    const user = req.user
    verificationService.generateVerificationCode(user)
    .then(() => res.status(202).json({ success: true }) )
    .catch((error) => { next(error) })
}

function verifyCode(req, res, next) {
    const user = req.user
    const code = req.body.code
    verificationService.verifyCode(user, code)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => next(error))
}

module.exports = {
    generateCode,
    verifyCode
}
