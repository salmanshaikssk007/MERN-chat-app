const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authUser, allUsers } = require("./../controllers/userControllers");
const { registerUser } = require("./../controllers/userControllers");

// defining custom routes
const router = express.Router();
router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post('/login' , authUser);


module.exports = router ;