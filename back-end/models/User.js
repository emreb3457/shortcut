const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async (enterPass) => {
    try {
        const result = bcrypt.compareSync(String(enterPass), this.password);
        return result;
    } catch (error) {
        return false;
    }
}

userSchema.methods.getJwtToken = async () => {
    const token = jwt.sign({ id: this._id }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expires_time
    })
    return token

}
module.exports = mongoose.model("User", userSchema)