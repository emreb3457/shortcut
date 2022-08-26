const express = require("express");
const router = express.Router();
const { isAuthUser, authorizeRoles } = require("../middlewares/auth")
const { createUser, getUsers, loginUser } = require("../controllers/UserController")

router.route("/getusers").get(getUsers)
router.route("/createuser").post(createUser)
router.route("/loginuser").post(loginUser)


module.exports = router