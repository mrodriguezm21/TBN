const jwt = require('jsonwebtoken');
const config = require("./config")

const secret = config.jwt_secret;


const payload = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
};

const token = jwt.sign(payload, secret);

console.log(token);