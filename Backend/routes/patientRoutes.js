const express = require("express");
const patientRoutes = express.Router();
const authController = require("../controllers/auth");
const patientController = require("../controllers/patientController.js");

patientRoutes.post("/signup", patientController.postSignup);
patientRoutes.post("/login", patientController.postLogin);
patientRoutes.post("/changePassword", patientController.postChangePassword);
patientRoutes.post("/search", patientController.postSearch);
patientRoutes.post("/home", patientController.postDashboard);
patientRoutes.post("/profile", patientController.postViewProfile);
patientRoutes.post("/editProfile", patientController.postEditProfile);

module.exports = patientRoutes;
