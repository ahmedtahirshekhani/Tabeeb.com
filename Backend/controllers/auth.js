const jwt = require("jsonwebtoken");

exports.authCheck = (req, res) => {
  res.status(200).send({
    message: "Server is working",
  });
};
