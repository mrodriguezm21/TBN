const jwt = require("jsonwebtoken");
const config = require("./config");

const secret = '123456789';

let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY5MjQyNjgwMiwiZXhwIjoxNjkyNDI2ODYyfQ.wsEmGtDmvlT4dAKIq9lypTCiIzPm4_EHPnPvNRxRxiI'

const verifyToken = (token, secret) => {
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      console.log(err);
    } else {
      console.log(decoded);
    }
  });
};

verifyToken(token, secret);

