const User = require('../models/User')
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler");
const status = require('http-status');
const { tokenValid, access, authorizeRole } = require("../constants/errorMessages")
exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;
        if (!bearerHeader) {
            throw new ErrorHandler(access, status.UNAUTHORIZED)
        }
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        const decoded = jwt.verify(token, process.env.jwt_secret)
        req.user = await User.findById(decoded.id);
        next()
    } catch (error) {
        throw new ErrorHandler(tokenValid, status.UNAUTHORIZED)
    }
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ErrorHandler(`(${req.user.role}) ${authorizeRole}`, status.UNAUTHORIZED)
        }
        next()
    }
}