'use strict'

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const config = require('../config/config')

class StorageService {

    constructor() {  
        this.client = new S3Client({
            region: config.AWS_REGION,
            credentials: {
                secretAccessKey: config.AWS_SECRET_KEY,
                accessKeyId: config.AWS_ACCESS_KEY
            }
        })
    }

    async getKeyUrl(key) {
        let params = {
            Key: key,
            Bucket: config.AWS_S3_BUCKET
        }
        let command = new GetObjectCommand(params)
        let url = await getSignedUrl(this.client, command, { expiresIn: config.S3_SIGNED_URL_EXPIRATION })
        return url
    }

    async uploadFile(file, key) {
        let params = {
            Key: key,
            Bucket: config.AWS_S3_BUCKET,
            Body: file
        }
        let command = new PutObjectCommand(params)
        await this.client.send(command)
    }
}

module.exports = StorageService