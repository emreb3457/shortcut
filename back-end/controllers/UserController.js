const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User")
const sendToken = require("../utils/sendToken")

exports.getUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();
    res.json({
        status: "true",
        result: users
    })
});

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.find();
    const validuser = await User.findOne({ email });

    if (validuser) {
        return res.status(500).send({ message: "This email address is being used", status: false });
    }
    const newuser = await User.create({
        name,
        email,
        password,
        role: user.length !== 0 ? "user" : "admin"
    });
    sendToken(newuser, 200, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send({ message: "Please enter email & password", status: false });
    }
    const validuser = await User.findOne({ email }).select('+password');
    if (!validuser) {
        return res.status(401).send({ message: "Invalid Email or Password", status: false });
    }

    const passMatch = await validuser.comparePassword(password);

    if (!passMatch) {
        return res.status(401).send({ message: "Invalid Email or Password", status: false });
    }

    sendToken(validuser, 200, res);
});