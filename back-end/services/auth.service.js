const status = require('http-status');
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User")
const { usedEmail, requiredEmailPass } = require("../constants/errorMessages")
const createUser = async (email, password, name) => {
    const user = await User.find();
    const validuser = await User.findOne({ email });

    if (validuser) {
        throw new ErrorHandler(usedEmail, status.INTERNAL_SERVER_ERROR)
    }
    const newuser = await User.create({
        name,
        email,
        password,
        role: user.length !== 0 ? "user" : "admin"
    });

    return newuser;
};

const loginUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        throw new ErrorHandler(requiredEmailPass, status.NOT_FOUND)
    }
    const validuser = await User.findOne({ email }).select('+password');
    if (!validuser) {
        throw new ErrorHandler(requiredEmailPass, status.NOT_FOUND)
    }

    const passMatch = await validuser.comparePassword(password);

    if (!passMatch) {
        throw new ErrorHandler(requiredEmailPass, status.NOT_FOUND)
    }
    return validuser;
};

module.exports = {
    loginUserWithEmailAndPassword,
    createUser
}