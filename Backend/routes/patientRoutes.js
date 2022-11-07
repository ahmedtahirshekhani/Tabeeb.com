const express = require("express");
const patientRoutes = express.Router();
const authController = require("../controllers/auth");
const patientController = require("../controllers/patientController.js");

patientRoutes.post("/signup", patientController.postSignup);

module.exports = patientRoutes;
