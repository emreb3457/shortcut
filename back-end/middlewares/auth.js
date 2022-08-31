const User = require('../models/User')
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors")

exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;
        if (!bearerHeader) {
            return res.status(500).send({ message: "To access this resource, first login", status: false })
        }
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        const decoded = jwt.verify(token, process.env.jwt_secret)
        req.user = await User.findById(decoded.id);
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Token is not valid", status: false }
        )
    }
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).send({ message: `(${req.user.role}) role does not have permission to access this resource`, status: false }
            )
        }
        next()
    }
}