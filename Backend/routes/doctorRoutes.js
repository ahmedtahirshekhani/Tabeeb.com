const express = require("express");
const doctorRoutes = express.Router();
const authController = require("../controllers/auth");
const doctorController = require("../controllers/doctorController.js");

doctorRoutes.post("/login", doctorController.postLogin);
doctorRoutes.post("/signup", doctorController.postSignup);
doctorRoutes.post("/changePassword", doctorController.postChangePassword);

module.exports = doctorRoutes;
