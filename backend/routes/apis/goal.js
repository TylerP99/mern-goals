const express = require("express");
const router = express.Router();

const {getGoals, createGoal, updateGoal, deleteGoal} = require("../../controllers/goalController");
const {protectRoute} = require("../../middleware/auth");

router.get("/", protectRoute, getGoals);
router.post("/", protectRoute, createGoal);
router.put("/:id", protectRoute, updateGoal);
router.delete("/:id", protectRoute, deleteGoal);

module.exports = router;