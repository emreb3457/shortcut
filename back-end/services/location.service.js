const status = require('http-status');
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User")
const { userNotFound } = require("../constants/errorMessages")

const setLocations = async (id, lng, lat, name) => {
    const user = await User.findById(id);
    if (!user) {
        throw new ErrorHandler(userNotFound, status.NOT_FOUND)
    }
    user.locations.push({ name, lng, lat });
    user.save();
    return true
};

const getLocations = async (id) => {
    const user = await User.findById(id);
    const locations = user.locations
    return locations
};

module.exports = {
    setLocations,
    getLocations
}