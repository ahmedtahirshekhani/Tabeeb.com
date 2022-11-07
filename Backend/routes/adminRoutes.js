const express = require("express");
const adminRoutes = express.Router();
const authController = require("../controllers/auth");
const adminController = require("../controllers/adminController.js");

adminRoutes.get(
  "/",
  /*authController.authCheck*/ adminController.getDoctorRequests
);
adminRoutes.post("/login", adminController.postLogin);

module.exports = adminRoutes;
