const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*required: complete patient object from signup form
follow the variable naming conventions below*/
const postSignup = async (req, res) => {
  console.log("HELLO", req.body);
  try {
    const { phone_number, email, name, password, city } = req.body;
    if (!(email && password && phone_number && name && city))
      return res.status(422).send({ error: "Invalid signup: Input missing!" });
    const hash = await bcrypt.hash(password, 10);

    const queryText = `INSERT INTO tabeeb.patients (email, password, phone_number, full_name ,city, wallet_amount)
                        VALUES ('${email}', '${hash}','${phone_number}','${name}','${city}',${"0"});`;

    const result = await query(queryText);
    res.send("Patient Signed Up");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const postLogin = async (req, res) => {
  try {
    // required: patient login form data object {phone, password}
    console.log("In post login", req.body);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });

    const queryText = `SELECT *
          FROM tabeeb.patients
          WHERE email = '${email}'
          `;

    const result = await query(queryText);
    hash = result[0].password;
    const successMessage = {
      success: true,
      message: "User Successfully Logged In!",
    };
    if (await bcrypt.compare(password, hash)) {
      res.send(successMessage);
    } else {
      throw err;
    }
  } catch (err) {
    const failureMessage = {
      success: false,
      message: "Invalid Credentials",
    };
    return res.status(422).send(failureMessage);
  }
};

module.exports = { postSignup, postLogin };
