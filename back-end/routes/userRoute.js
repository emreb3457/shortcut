const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/UserController")

router.route("/createuser").post(createUser)


module.exports = router