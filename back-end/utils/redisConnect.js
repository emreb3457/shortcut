const redis = require("redis");
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

module.exports = () => {
    client.connect().then(() => console.log("Redis Client Connect"));

    client.on('error', (err) => {
        console.log('Redis Client Error ' + err);
    });
}