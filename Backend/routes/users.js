const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/user");

router.get("/", UserCtrl.getUsers);


router.get("/:username",UserCtrl.authMiddleware, UserCtrl.getSingleUser);
router.post("/register", UserCtrl.registerUser);
router.post("/login", UserCtrl.loginUser);

module.exports = router;



