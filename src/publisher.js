'use strict'

const PubSub = require('pubsub-js')
const events = require('./config/events')

function publishVerificationCodeEvent(user, code) {
    PubSub.publish(events.VERIFICATION_CODE_CREATED, { user, code })
}

module.exports = {
    publishVerificationCodeEvent
}