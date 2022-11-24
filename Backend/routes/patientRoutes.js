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
patientRoutes.post("/pastAppointments", patientController.postPastAppointments);
patientRoutes.post(
  "/pendingAppointments",
  patientController.postPendingAppointments
);
patientRoutes.post(
  "/acceptedAppointments",
  patientController.postAcceptedAppointments
);

patientRoutes.post("/makeAppointment", patientController.postMakeAppointment);

module.exports = patientRoutes;
