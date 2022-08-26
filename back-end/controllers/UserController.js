const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User")
const sendToken = require("../utils/sendToken")

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.find();
    const validuser = await User.findOne({ email });
    console.log(user)
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