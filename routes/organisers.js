const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validate, Organiser } = require("../models/organiser");
const express = require("express");
const router = express.Router();
const VerifyToken = require("../middleware/VerifyToken");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const transporter = require('../utils/email');
const admin = require('../middleware/admin');

router.get("/me", VerifyToken, async (req, res) => {
  const organiser = await Organiser.findById(req.organiser._id).select(
    "-password"
  );
  res.send(organiser);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let organiser = await Organiser.findOne({ email: req.body.email });
  if (organiser) res.status(400).send("User already registered");
  organiser = new Organiser(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  organiser.password = await bcrypt.hash(organiser.password, salt);
  organiser = await organiser.save();
  const token = organiser.generateAuthToken();
  const options = {
    from: "9f3c9fea2c5d84",
    to: req.body.email,
    subject: "Welcome to the Event Management System",
    text: `You have Successfully Registered as ${organiser.name} ! I hope you have a smooth experience. Here is your token: ${token}`,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) return console.error(err);
    console.log(info.response);
  });
  res
    .header("x-auth-token", token)
    .send(_.pick(organiser, ["_id", "name", "email"]));
});

//FOR DELETING AN ORGANISER
router.delete('/:me', VerifyToken, async (req,res)=>{
  const organiser= await Organiser.findByIdAndRemove(req.organiser._id)//.select( "-password" );
  if (!organiser) return res.status(404).send("The organiser with the given ID was not found.");
  res.send(organiser)
  })
module.exports = router;
