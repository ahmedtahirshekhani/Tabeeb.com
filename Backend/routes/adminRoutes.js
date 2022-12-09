const express = require("express");
const adminRoutes = express.Router();
const authController = require("../controllers/auth");
const adminController = require("../controllers/adminController.js");
const auth = require("../middleware/auth.js");

adminRoutes.get(
  "/home",
  auth.checkToken,
  /*authController.authCheck*/ adminController.getDoctorRequests
);
adminRoutes.post("/login", adminController.postLogin);
adminRoutes.post(
  "/acceptRequest",
  auth.checkToken,
  adminController.postAcceptRequest
);
adminRoutes.post(
  "/rejectRequest",
  auth.checkToken,
  adminController.postRejectRequest
);
adminRoutes.get("/reports", auth.checkToken, adminController.getReports);

adminRoutes.post(
  "/changePassword",
  auth.checkToken,
  adminController.postChangePassword
);

adminRoutes.post("/ban_user", /*auth.checkToken, */adminController.postBanUser);

module.exports = adminRoutes;
