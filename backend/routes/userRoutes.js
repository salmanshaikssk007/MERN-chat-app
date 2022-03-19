const express = require("express");
const { authUser } = require("./../controllers/userControllers");
const { registerUser } = require("./../controllers/userControllers");

// defining custom routes
const router = express.Router();
router.route('/').post(registerUser)
router.post('/login' , authUser);


module.exports = router ;