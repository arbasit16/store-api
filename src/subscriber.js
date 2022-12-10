'use strict'

const PubSub = require('pubsub-js')
const events = require('./config/events')
const MailService = require('./services/mail-service')

function subscribeEvents() {
    PubSub.subscribe(events.VERIFICATION_CODE_CREATED, handleVerificationEvent)
    console.log('events subscribed')
}

function handleVerificationEvent(event, data) {

    const { user, code } = data
    const mailService = new MailService()
    mailService.sendVerificationMail(user.email, code)

}

module.exports = {
    subscribeEvents
}