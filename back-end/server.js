const app = require("./app")
const database = require("./utils/database")

database();

process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down the server due to Unhandled Promise rejection");
})

const SERVER_PORT = process.env.port || process.env.PORT || 3001;
app.listen(SERVER_PORT, () => console.log("Server started"+" port "+SERVER_PORT))