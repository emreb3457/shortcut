const express = require("express");
const router = express.Router();
const {
    isAuthUser,
    authorizeRoles
} = require("../middlewares/auth")
const {
    createUser,
    getUsers,
    loginUser,
    setLocations,
    getLocations
} = require("../controllers/UserController")
const {
    validator
} = require("../middlewares/Validator")
const {
    login
} = require("../validations/auth.validator")
router.route("/getusers").get(getUsers);
router.route("/createuser").post(createUser);
router.route("/loginuser").post(validator(login), loginUser);
router.route("/setlocations").post(isAuthUser, authorizeRoles("admin"), setLocations);
router.route("/getlocations").get(isAuthUser, getLocations);

module.exports = router