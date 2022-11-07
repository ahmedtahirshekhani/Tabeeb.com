const express = require("express");
const doctorRoutes = express.Router();
const authController = require("../controllers/auth");
const doctorController = require("../controllers/doctorController.js");

doctorRoutes.get("/home", doctorController.getDoctorRequests);
doctorRoutes.post("/signup", doctorController.postSignup);

module.exports = doctorRoutes;
