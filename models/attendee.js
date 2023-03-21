const Joi= require('joi')
const array = require('joi/lib/types/array')
const mongoose= require('mongoose')
const {eventSchema}= require('./event')
//FOR DEFINING THE MODEL OF ATTENDEE CLASS
const attendeeSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    cityLocation:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    eventId: {
        type: String,
        required: true
    },
    eventName:{
        type: String,
        required: true
    }

})


const Attendee= mongoose.model('Attendee',attendeeSchema )

function validateAttendee(attendee){
    const schema= {
        fullName: Joi.string().min(10).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        cityLocation: Joi.string().min(3).max(255).required(),
        _id: Joi.string().min(3).max(255).required(),
        eventName: Joi.string().min(3).max(255).required(),
    }
    return Joi.validate(attendee,schema)
}

exports.attendeeSchema= attendeeSchema
exports.Attendee= Attendee;
exports.validate= validateAttendee;