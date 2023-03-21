const express= require('express')
const organisers= require('../routes/organisers')
const events= require('../routes/events')
const attendees= require('../routes/attendees')
const reports= require('../routes/reports')
const login= require('../routes/login')
const admin = require('../routes/admin');
const error= require('../middleware/error')

module.exports= function(app){
app.use(express.json())
app.use('/organisers',organisers)
app.use('/events',events)
app.use('/attendees',attendees)
//app.use('/events/reports',reports)
app.use('/login',login)
app.use('/admin', admin)
app.use(error)
}