const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");

// @desc    Get goals from db
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res, next) => {
    const goals = await Goal.find();

    res.status(200).json({goals});
});

// @desc    Create goal and store in db
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req, res, next) => {

    if(!req.body.name) {
        res.status(400);
        throw new Error("Goal name is required");
    }

    const goal = {
        name: req.body.name,
    }

    const newGoal = await Goal.create(goal);

    res.status(201).json({goal: newGoal});
});

// @desc    Update goal in db
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res, next) => {
    if(!req.body.name) {
        res.status(400);
        throw new Error("Goal name is required");
    }

    const updatedGoal = {
        name: req.body.name,
    }

    const goal = await Goal.findByIdAndUpdate(req.params.id, updatedGoal, {new: true});

    res.status(200).json({goal:goal});
});

// @desc    Delete goal from db
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res, next) => {
    const deleted = await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json({id: deleted._id});
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}