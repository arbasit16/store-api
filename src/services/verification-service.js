'use strict'

const VerificationCode = require('../models/verification-code')
const { VERIFICATION_WAIT } = require('../config/config')
const events = require('../config/events')
const RateExceededError = require('../errors/rate-exceeded-error')
const publisher = require('../publisher')
const ValidationError = require('../errors/validation-error')

class VerificationService {

    async generateVerificationCode(user) {

        const code = Math.floor(1000 + Math.random() * 9000).toString()
        const userId = user._id.toString()

        const existingVerificatinCode = await VerificationCode.findOne({userId: userId })

        if (existingVerificatinCode != null) { 

            const updateTimeDifference = (Math.abs(new Date() - existingVerificatinCode.updatedAt))/1000

            if (updateTimeDifference <= VERIFICATION_WAIT) {
                throw new RateExceededError('Please wait sometime to regenerate code')
            }

            existingVerificatinCode.code = code
            await VerificationCode.updateOne(existingVerificatinCode)
            publisher.publishVerificationCodeEvent(user, code)
            return
        }

        const verificationCode = {
            code: code,
            userId: userId,
            isVerified: false,
        }

        await VerificationCode.create(verificationCode)
        publisher.publishVerificationCodeEvent(user, code)
    }

    async verifyCode(user, code) {

        const userId = user._id.toString()
        const verificationCode = await VerificationCode.findOne({ userId: userId })

        console.log(verificationCode)
        if (verificationCode == null) {
            throw new ValidationError('Invlaid verification code')
        }

        if (verificationCode.isVerified) {
            throw new ValidationError('User is already verified')
        }

        if (verificationCode.code !== code) {
            throw new ValidationError('Invlaid verification code')
        }

        verificationCode.isVerified = true
        await VerificationCode.updateOne(verificationCode)
    }

    async getVerificationStatus(user) {

        const userId = user._id.toString()
        const verificationCode = await VerificationCode.findOne({ userId: userId })

        if (verificationCode == null) {
            return false
        }

        return verificationCode.isVerified
    }
}

module.exports = VerificationService