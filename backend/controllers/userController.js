const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// @desc    Create new user, store in db, log user in
// @route   POST /api/users/create
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields required");
    }

    const existing = await User.findOne({email:email});

    if(existing) {
        res.status(400);
        throw new Error("A user with that email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({username: username, email: email, password: hashed});

    if(!user) {
        res.status(400);
        throw new Error("Invalid user data");
    }

    res.status(201).json({
        _id: user._id,
        username: username,
        email: email,
        token: genJWT(user._id),
    });
});

// @desc    Authenticate user against entered credentials, log in user
// @route   POST /api/users/authenticate
// @access  Public
const authenticateUser = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    const user = await User.findOne({email:email});

    if(!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("Invalid credentials");
    }


    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: genJWT(user._id),
    })
});

// @desc    Sign out user, destroy session
// @route   DELETE /api/users/create
// @access  Private
const signOutUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({message: "Sign out"})
});

// @desc    Get current user data
// @route   GET /api/users/create
// @access  Private
const getUser = asyncHandler(async (req, res, next) => {
    res.status(200).json(req.user);
});

// Generate JWT
const genJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

module.exports = {
    registerUser,
    authenticateUser,
    signOutUser,
    getUser,
}