'use strict'

const mongoose = require('mongoose')
const config = require('./config')

const dbUrl = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}`

function connect() {
    mongoose.connect(dbUrl)
            .then(() => { console.log('DB Connected') })
            .catch((error) => { console.log(error) })
}

module.exports.connect = connect
