const ErrorHandler = require('../utils/errorHandler');
const status = require('http-status');
const { intervalServer, castError, expiredToken, invalidToken } = require("../constants/errorMessages")
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'dev') {

        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        })

    }

    if (process.env.NODE_ENV === 'prod') {
        let error = { ...err }

        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {
            const message = `${castError}: ${err.path}`
            error = new ErrorHandler(message, status.BAD_REQUEST)
        }

        // Handling Mongoose Validation Error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, status.BAD_REQUEST)
        }

        // Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, status.BAD_REQUEST)
        }

        // Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = invalidToken
            error = new ErrorHandler(message, status.BAD_REQUEST)
        }

        // Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = expiredToken
            error = new ErrorHandler(message, status.BAD_REQUEST)
        }

        res.status(error.statusCode || status.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: error.message || intervalServer
        })
    }
}