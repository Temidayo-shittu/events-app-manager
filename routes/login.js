// const config = require("config");

const config = require('../config/custom-environment-variables.json')
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const sendEmail= require('../config/custom-environment-variables.json')
const nodemailer= require('nodemailer')
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Organiser } = require("../models/organiser");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const transporter = require("../utils/email");


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let organiser = await Organiser.findOne({ email: req.body.email });
  if (!organiser) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    organiser.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password");

 const token = organiser.generateAuthToken()
 const options = {
  from: "ee95a60ee7b4e6",
  to: organiser.email,
  subject: "Welcome to the Event Management System",
  text: `You have Successfully Logged in as ${organiser.name} ! I hope you have a smooth experience. Here is your token: ${token}`,
};
transporter.sendMail(options, (err, info) => {
  if (err) return console.error(err);
  console.log(info.response);
});
res
  .header("x-auth-token", token)
  .send(_.pick(organiser, ["_id", "name", "email"]));

    
    /* res.json({token})
    const message= `You have been successfully logged in as an organiser!!Here is your token: ${token}`
    await sendEmail({
      email: organiser.email,
      subject:'Welcome Message to the Organiser'
      message
    })

  res.json({ 
    status:"success",
    message:"Token sent to email"
  });
  */
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
