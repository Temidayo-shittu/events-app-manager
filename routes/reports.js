const _= require('lodash')
const {Report,validate}= require('../models/report')
const {Event}= require('../models/event')
const {Attendee}= require('../models/attendee')
const mongoose= require('mongoose')
const express= require('express');
const router= express.Router();

/*

//FOR GETTING A GENERAL ATTENDEE OVERVIEW
router.get('/', async (req,res)=>{
    const reports= await Report.find().sort('title').populate('event','name')
    res.send(reports)
})

//FOR CREATING A NEW ATTENDEE
router.post('/', async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const event = await Event.findById(req.body.eventId);
    if(!event) return res.status(400).send('The event with the given ID not found')
   // _.pick(req.body,['fullName','email','cityLocation','event'])
   const attendee = await Attendee.findById(req.body.attendeeId);
    if(!attendee) return res.status(400).send('The attendee with the given ID not found')
    let report= new Report({
        title:req.body.title,
        event: {
            _id: event._id,
            name: event.name
        },
        attendee:{
            _id: attendee._id
        }
    })
    report= await report.save()
    res.send(report)

})

//FOR UPDATING A NEW ATTENDEE
/*
router.put('/:id', async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const attendee= await Attendee.findByIdAndUpdate(req.params.id,{
        fullName:req.body.fullName,
        email: req.body.email,
        cityLocation: req.body.cityLocation,
        event: {
            _id: event._id,
            name: event.name
        }
    }, {new: true})

    if(!attendee) return res.status(404).send('The attendee with the given ID was not found')
    res.send(attendee)   
})

//FOR DELETING A NEW ATTENDEE
router.delete('/:id', async (req,res)=>{
    const attendee= await Attendee.findByIdAndRemove(req.params.id)
    if (!attendee) return res.status(404).send("The attendee with the given ID was not found.");
    res.send(attendee)
    })

//FOR GETTING A SPECIFIC ATTENDEE
router.get('/:id', async (req,res)=>{
    const attendee= await Attendee.findById(req.params.id)
    if(!attendee) return res.status(404).send('The attendee with the given ID was not found')
    res.send(attendee)
    })
*/
//NOTE: each module should be responsible for doing one thing.Hence the need for the 
//Single Responsiblity Module Principle

module.exports= router;
