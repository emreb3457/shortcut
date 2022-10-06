const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const paginate = require("mongoose-paginate-v2");
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
    password: {
        type: String,
        required: true,
    },
    locations: [
        {
            name: String,
            lng: Number,
            lat: Number
        }
    ],
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

paginate.paginate.options = {
    lean: true,
    limit: 20,
};
userSchema.plugin(paginate);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enterPass) {
    try {
        const result = bcrypt.compareSync(String(enterPass), this.password);
        return result;
    } catch (error) {
        return false;
    }
}

userSchema.methods.getJwtToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expires_time
    })
    return token

}
module.exports = mongoose.model("User", userSchema)