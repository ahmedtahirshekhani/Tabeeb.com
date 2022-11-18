const express = require("express");
const adminRoutes = express.Router();
const authController = require("../controllers/auth");
const adminController = require("../controllers/adminController.js");

adminRoutes.get(
  "/home",
  /*authController.authCheck*/ adminController.getDoctorRequests
);
adminRoutes.post("/login", adminController.postLogin);
adminRoutes.post("/acceptRequest", adminController.postAcceptRequest);
adminRoutes.post("/rejectRequest", adminController.postRejectRequest);
adminRoutes.get("/reports", adminController.getReports);

module.exports = adminRoutes;
