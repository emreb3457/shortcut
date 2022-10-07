const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User")
const sendToken = require("../utils/sendToken")
const status = require('http-status');
const ErrorHandler = require("../utils/errorHandler");
const authService = require("../services/auth.service")
const locationService = require("../services/location.service");
const paginate = require("../utils/pagination");


exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const { page, limit, keyword } = req.query;
    const searchField = ["name", "email"];
    const query = {
        keyword
    };
    const options = {
        page,
        limit,
    };
    const users = await paginate(User, query, options, searchField)
    res.json({
        status: "true",
        result: users
    })
});

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const newuser = await authService.createUser(email, password, name);
    sendToken(newuser, 200, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    sendToken(user, status.OK, res);
});

exports.setLocations = catchAsyncErrors(async (req, res, next) => {
    const { id, lng, lat, name } = req.body;
    await locationService.setLocations(id, lng, lat, name)
    res.status(status.OK).json({
        success: true,
    })
});

exports.getLocations = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.user;
    const locations = await locationService.getLocations(id)
    res.status(status.OK).json({
        success: true,
        result: { locations }
    })
});