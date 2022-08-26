const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(process.env.db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((con) => {
        console.log(
            `MongoDB Database connected with HOST: ${con.connection.host}`
        );
    });
}