const express = require("express");
const router = express.Router();

router.use("/users", require("./apis/user"));

router.use("/goals", require("./apis/goal"));

module.exports = router;