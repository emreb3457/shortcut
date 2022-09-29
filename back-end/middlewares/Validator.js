const joi = require('joi')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors")
exports.validator = (validator) => {
    return catchAsyncErrors(async (req, res, next) => {
        try {
            const validated = await validator.validateAsync(req.body)
            req.body = validated;
            next()
        } catch (err) {
            throw new ErrorHandler(err, 401)
        }
    })
}