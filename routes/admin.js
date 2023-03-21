const _= require('lodash')
const { Event,validate }= require('../models/event')
const {Report,validateReport}= require('../models/report')
const mongoose= require('mongoose')
const express= require('express');
const router= express.Router()
const VerifyToken = require('../middleware/VerifyToken.js');
// const VerifyToken = require('../middleware/VerifyToken.js');
const validateObjectId= require('../middleware/validateObjectId')
const { Attendee } = require('../models/attendee');
const admin = require('../middleware/admin');
const transporter = require('../utils/email');
const { Organiser } = require('../models/organiser');


//APPROING EVENTS
router.patch('/approve/:id', [VerifyToken, admin], async (req,res)=>{
    const status = 'Approved';
    const event = await Event.findByIdAndUpdate(req.params.id,{
        status: status
    }, {new: true})

    if(!event) res.status(404).send('The event with the given ID was not found')
    res.send(event)   
});

// REJECTED EVENTS
router.patch('/reject/:id', [VerifyToken, admin], async (req,res)=>{
    const status = 'Rejected';
    const event = await Event.findByIdAndUpdate(req.params.id,{
        status: status
    }, {new: true})

    if(!event) res.status(404).send('The event with the given ID was not found');
    /*
    const organiser = await Organiser.findByIdAndUpdate(req.organiser._id,{ email: req.body.email}, { new: true });
    const options = {
        from: "9f3c9fea2c5d84",
        to: req.body.email,
        subject: "Welcome to the Event Management System",
        text: `Your event has been rejected due to its clash of date with a very important event that cannot be missed`
      };
      transporter.sendMail(options, (err, info) => {
        if (err) return console.error(err);
        console.log(info.response);
      });
      */
    res.send(event)   
})


module.exports= router;