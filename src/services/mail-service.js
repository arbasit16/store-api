'use strict'

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD  } = require('../config/config')
const mailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = mailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD
            }
        })
    }

    async sendVerificationMail(email, code) {
        const info = await this.transporter.sendMail({
            from: 'Property Guru <noreply@propertyguru.com>',
            to: email,
            subject: 'Verfication Code',
            text: `Your Property Guru verification code is ${code}`
        })
    }
}

module.exports = MailService