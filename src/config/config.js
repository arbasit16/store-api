'use strict'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT ?? 8001
const TOKEN_SECRET = process.env.TOKEN_SECRET
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) ?? 10
const VERIFICATION_WAIT = parseInt(process.env.VERIFICATION_WAIT)
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_USERNAME = process.env.SMTP_USERNAME
const SMTP_PASSWORD = process.env.SMTP_PASSWORD
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const AWS_REGION = process.env.AWS_REGION
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET
const S3_SIGNED_URL_EXPIRATION = process.env.S3_SIGNED_URL_EXPIRATION

module.exports = {
    PORT,
    TOKEN_SECRET,
    DB_NAME,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    SALT_ROUNDS,
    VERIFICATION_WAIT,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    DEFAULT_PASSWORD,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
    AWS_REGION,
    AWS_S3_BUCKET,
    S3_SIGNED_URL_EXPIRATION
}