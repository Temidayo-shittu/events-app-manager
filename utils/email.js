const nodemailer= require('nodemailer')
require('dotenv').config()

const transporter= nodemailer.createTransport({
host: 'sandbox.smtp.mailtrap.io',
port: 2525,
    auth:{
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = transporter
