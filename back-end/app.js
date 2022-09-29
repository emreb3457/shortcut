const express = require("express");
const app = express()
const morgan = require("morgan")
const cors = require("cors");
const bodyparser = require("body-parser");
const errorMiddleware = require('./middlewares/error')
require("dotenv").config({ path: "config/.env" })

if (process.env.node_env) {
    app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


//routes
const userRoute = require("./routes/userRoute")

app.use("/", userRoute)


app.use(errorMiddleware)
module.exports = app;