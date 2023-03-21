const _= require('lodash')
const { Event,validate }= require('../models/event')
const { Organiser } = require("../models/organiser");
const {Report,validateReport}= require('../models/report')
const mongoose= require('mongoose')
const express= require('express');
const router= express.Router()
const VerifyToken = require('../middleware/VerifyToken.js');
// const VerifyToken = require('../middleware/VerifyToken.js');
const validateObjectId= require('../middleware/validateObjectId')
const { Attendee } = require('../models/attendee');
const admin = require('../middleware/admin');



router.get('/', async(req,res,next)=>{
   // throw new Error('Could not generate events')
    const events= await Event.find().sort('name')
    res.send(events)
})

//FOR CREATING A NEW EVENT
router.post('/', VerifyToken, async(req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const status = 'Pending'
   let event = new Event({
       name: req.body.name,
       date: req.body.date,
       location: req.body.location,
       description: req.body.description,
       status: status,
       organiserId: req.body._id,
       organiserName: req.body.organiserName  
   })
    event= await event.save()
    res.send(event)
})

//FOR CREATING REPORTS
router.post('/reports', VerifyToken, async (req,res)=>{
    const event = await Event.findById(req.body.eventId);
    if(!event) return res.status(400).send('The event with the given ID not found')
   const attendeeCount = await Attendee.countDocuments({ eventId: req.body.eventId });

    let report = new Report({
        name: event.name,
        date: event.date,
        description: event.description,
        location: event.location,
        eventId: event.id,
        attendeeCount: attendeeCount
    });
    report= await report.save()
    res.send(report)
})


//FOR GETTING REPORTS

router.get('/reports', VerifyToken, async (req,res)=>{

    const event = await Event.findById(req.body.eventId);
    if(!event) return res.status(400).send('The event with the given ID not found')
   const attendeeCount = await Attendee.countDocuments({ eventId: req.body.eventId });
   
    let report= new Report({
        name: event.name,
        date: event.date,
        description: event.description,
        location: event.location,
        eventId: event.id,
        attendeeCount: attendeeCount
    });
    report= await report.save()
    res.send(report)
})

//FOR UPDATING A NEW EVENT
router.put('/:id', VerifyToken, async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const event= await Event.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        organiserId: req.body._id,
       organiserName: req.body.organiserName  
    }, {new: true})
    

    if(!event) res.status(404).send('The event with the given ID was not found')
    res.send(event)   
})

//FOR DELETING A NEW EVENT
router.delete('/:id', [VerifyToken,admin], async (req,res)=>{
    const event= await Event.findByIdAndRemove(req.params.id)
    if (!event) return res.status(404).send("The event with the given ID was not found.");
    res.send(event)
    })

//FOR GETTING A SPECIFIC EVENT
router.get('/:id', VerifyToken, async (req,res)=>{
    const event= await Event.findById(req.params.id)
    if(!event) res.status(404).send('The event with the given ID was not found')
    res.send(event)
    })


module.exports= router;