const Joi= require('joi')
const mongoose= require('mongoose')
const {eventSchema}= require('./event')
const {attendeeSchema}= require('./attendee')
 
//FOR DEFINING THE MODEL OF ATTENDEE CLASS
const Report= mongoose.model('Report', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      date: {
        type: Date,
        required: true
      },
      location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      },
      description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      },
      eventId: {
        type: String,
        required: true,
      },
      attendeeCount: {
        type: String,
        required: true,
      }
}))

function validateReport(report){
    const schema= {
        name: Joi.string().min(5).required(),
        date: Joi.date(),
        location: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(255).required(),
        attendeeCount: Joi.string().required()
    }
    return Joi.validate(report,schema)
}

exports.Report= Report;
exports.validate= validateReport;