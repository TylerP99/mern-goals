const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Goal name is required"],
    },

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // }
}, {timestamps: true});

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;