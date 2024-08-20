const express = require('express');
const userController = require("../controllers/userController")
const router = express.Router();

router.post("/add", userController.addUser)
router.post("/verifyotp", userController.verifyOtp)
router.get("/allusers", userController.users)
router.post("/login", userController.login)
router.delete("/deleteall", userController.deleteAllUsers)


module.exports = router;