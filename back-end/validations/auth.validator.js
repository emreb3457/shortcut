const joi = require("joi");

const register = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().required()
});

const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

module.exports = {
    register,
    login
}