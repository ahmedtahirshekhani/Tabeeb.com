const express = require("express");
const doctorRoutes = express.Router();
const authController = require("../controllers/auth");
const doctorController = require("../controllers/doctorController.js");

doctorRoutes.post("/login", doctorController.postLogin);
doctorRoutes.post("/signup", doctorController.postSignup);
doctorRoutes.post("/changePassword", doctorController.postChangePassword);
doctorRoutes.post("/profile", doctorController.postViewProfile);
doctorRoutes.post("/editProfile", doctorController.postEditProfile);

module.exports = doctorRoutes;
