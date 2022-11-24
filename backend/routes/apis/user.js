const express = require("express");
const router = express.Router();

const { registerUser, authenticateUser, signOutUser, getUser } = require("../../controllers/userController");
const {protectRoute} = require("../../middleware/auth");

router.post("/create", registerUser);
router.post("/authenticate", authenticateUser);
router.delete("/signout", protectRoute, signOutUser);
router.get("/me", protectRoute, getUser)

module.exports = router;