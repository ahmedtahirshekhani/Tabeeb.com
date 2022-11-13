const express = require("express");
const patientRoutes = express.Router();
const authController = require("../controllers/auth");
const patientController = require("../controllers/patientController.js");

patientRoutes.post("/signup", patientController.postSignup);
patientRoutes.post("/login", patientController.postLogin);

module.exports = patientRoutes;
