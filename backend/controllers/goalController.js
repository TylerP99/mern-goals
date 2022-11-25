const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");
const User = require("../models/User");

// @desc    Get goals from db
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res, next) => {
    const goals = await Goal.find({user: req.user._id});

    res.status(200).json(goals);
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
        user: req.user._id,
    }

    const newGoal = await Goal.create(goal);

    res.status(201).json(newGoal);
});

// @desc    Update goal in db
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res, next) => {
    if(!req.body.name) {
        res.status(400);
        throw new Error("Goal name is required");
    }

    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }


    if(!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if(goal.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(goal);
});

// @desc    Delete goal from db
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res, next) => {

    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    if(!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if(goal.user.toString() !== req.user._id.toString()) {
        console.log(goal.user.toString(), req.user._id);
        res.status(401);
        throw new Error("User not authorized");
    }

    const deleted = await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json({_id: deleted._id});
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}