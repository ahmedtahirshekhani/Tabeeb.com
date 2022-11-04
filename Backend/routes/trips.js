const express = require("express");
const router = express.Router();

const TripCtrl = require("../controllers/trip");
const UserCtrl = require("../controllers/user");
// // get the trip id document on which I am added as a friend
router.get("/others",UserCtrl.authMiddleware, TripCtrl.getTripsAsFrnd);

router.get("/",UserCtrl.authMiddleware, TripCtrl.getTrips);
router.post("/", UserCtrl.authMiddleware, TripCtrl.addNewTrip);
router.get("/:tripid",UserCtrl.authMiddleware, TripCtrl.getSingleTripDetails);
router.put("/:tripid",UserCtrl.authMiddleware, TripCtrl.updateTripData);
router.delete("/:tripid",UserCtrl.authMiddleware, TripCtrl.deleteTrip);

//add friend
router.patch("/friends/:tripid",UserCtrl.authMiddleware, TripCtrl.addFriend);
router.post("/friends/:tripid",UserCtrl.authMiddleware, TripCtrl.rmvFriend);


module.exports = router;
