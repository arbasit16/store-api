'use strict'

const config = require('../config/config')
const bcrypt = require('bcrypt')
const db = require('../config/db')
const User = require('../models/user')
const VerificationCode = require('../models/verification-code')
const { exists } = require('../models/user')

async function run() {

    await db.connect()
    let users = await createUserData()
    await User.deleteMany()
    let createdUsers = await User.create(users)
    let codes = createVerificationCodes(createdUsers)
    await VerificationCode.create(codes)
    process.exit()
}

async function createUserData() {
    console.log(config.DEFAULT_PASSWORD, config.SALT_ROUNDS)
    let passwordHash = await bcrypt.hash(config.DEFAULT_PASSWORD, config.SALT_ROUNDS)
    let users = [
        {
            firstName: "Arslan",
            lastName: "Basit",
            email: "arslanbasit15@gmail.com",
            password: passwordHash,
            type: "admin"
            
        }
    ]
    return users
}

function createVerificationCodes(users) {
    let codes = users.map(element => {
        return {
            code: '1234',
            userId: element._id,
            isVerified: true
        }
    })
    return codes
}

run()


