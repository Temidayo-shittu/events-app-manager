const winston= require('winston')
const mongoose= require('mongoose')
const config= require('config')
require('dotenv').config()

module.exports= function(){
    const db= config.get('db')
    mongoose.connect(process.env.DB_URL)
.then(()=>winston.info(`Connected to ${db}...`))
}

    // "db": "mongodb://localhost:27017/events",
    // shittutemidayo16 Eternal-life144