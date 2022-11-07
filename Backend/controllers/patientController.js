const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");

const postSignup = async (req, res) => {
  console.log("HELLO", req.body);
  try {
    const { phone_number, email, name, password, city } = req.body;
    if (!(email && password && phone_number && name && city))
      return res.status(422).send({ error: "Invalid signup: Input missing!" });

    const queryText = `INSERT INTO patients (email, password, phone_number, full_name ,city, wallet_amount)
                        VALUES ('${email}', '${password}','${phone_number}','${name}','${city}',${"0"});`;
    const result = await query(queryText);
    res.send("Patient Signed Up");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

module.exports = { postSignup };
