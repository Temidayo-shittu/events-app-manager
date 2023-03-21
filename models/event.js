const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema= new mongoose.Schema({
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
  status:{
    type: String
  }

})

const Event = mongoose.model("Event",eventSchema);

function validateEvent(event) {
  const schema = {
    name: Joi.string().min(5).required(),
    date: Joi.date(),
    location: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(event, schema);
}

exports.eventSchema= eventSchema;
exports.Event = Event;
exports.validate = validateEvent;
