const express = require("express");
const doctorRoutes = express.Router();
const authController = require("../controllers/auth");
const doctorController = require("../controllers/doctorController.js");

doctorRoutes.post("/login", doctorController.postLogin);
doctorRoutes.post("/signup", doctorController.postSignup);
doctorRoutes.post("/changePassword", doctorController.postChangePassword);
doctorRoutes.post("/profile", doctorController.postViewProfile);
doctorRoutes.post("/editProfile", doctorController.postEditProfile);
doctorRoutes.post("/pastAppointments", doctorController.postPastAppointments);
doctorRoutes.post(
  "/pendingAppointments",
  doctorController.postPendingAppointments
);
doctorRoutes.post(
  "/acceptedAppointments",
  doctorController.postAcceptedAppointments
);
doctorRoutes.post("/editService", doctorController.postEditService);
doctorRoutes.post("/acceptAppointment", doctorController.postAcceptAppointment);
doctorRoutes.post("/rejectAppointment", doctorController.postRejectAppointment);
doctorRoutes.post(
  "/completeAppointment",
  doctorController.postCompleteAppointment
);
doctorRoutes.post("/earningsReport", doctorController.postEarningsReport);
doctorRoutes.post(
  "/prescriptionHistory",
  doctorController.postPrescriptionHistory
);

doctorRoutes.post("/report", doctorController.postReport);

module.exports = doctorRoutes;
