'use strict'

const mongoose = require('mongoose')
const config = require('./config')

const dbUrl = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}`
console.log(dbUrl)

async function connect() {
    await mongoose.connect(dbUrl)
}

module.exports.connect = connect
