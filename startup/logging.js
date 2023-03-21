const winston= require('winston')
// require('winston-mongodb')
require('express-async-errors')

module.exports= function(){
winston.handleExceptions(
    new winston.transports.Console({colorize:true, prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtExceptions.log'})
    )
process.on('unhandledRejection', (ex)=>{
    console.log('WE GOT AN UNHANDLED REJECTION')
    winston.error(ex.message,ex)
})
winston.add(winston.transports.File, {filename:'logfile.log'})
/*
const p= Promise.reject(new Error('Something failed miserably'))
p.then(()=>console.log('Done'))
*/
}