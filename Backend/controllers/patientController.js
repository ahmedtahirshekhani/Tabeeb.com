const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { failureMessage } = require("./util");

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
    // required: patient login form data object {email, password}
    console.log("In post login", req.body);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });

    const queryText = `SELECT *
          FROM tabeeb.patients
          WHERE email = '${email}'
          `;

    const result = await query(queryText);
    const hash = result[0].password;
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
const postChangePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!newPassword) throw "Enter old password";
    const queryText = `SELECT * FROM tabeeb.patients WHERE email='${email}'`;
    const result = await query(queryText);
    const hash = result[0].password;
    const match = await bcrypt.compare(oldPassword, hash);
    if (!match) throw "Old password doesnt match";
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE tabeeb.patients
      SET password='${newPasswordHash}'
      WHERE email='${email}'`;
    await query(updateQuery);
    const successMessage = {
      success: true,
      message: "Password successfully changed!",
    };
    res.send(successMessage);
  } catch (err) {
    console.log(err);
    return res.status(422).send(failureMessage);
  }
};

const postSearch = async (req, res) => {
  //need patient email and patient search data
  try {
    const { email, search } = req.body;
    const queryText = `SELECT city FROM tabeeb.patients WHERE email='${email}'`;
    const patientCity = (await query(queryText))[0].city;
    const queryText2 = `SELECT * 
    FROM tabeeb.doctors
    WHERE city='${patientCity}'
    AND
    full_name LIKE '%${search}%'`;
    const doctors = await query(queryText2);
    res.send(doctors);
  } catch (err) {
    res.status(422).send(err);
  }
};

const postDashboard = async (req, res) => {
  //need patient email
  try {
    const { email } = req.body;
    const queryText = `SELECT city FROM tabeeb.patients WHERE email='${email}'`;
    const patientCity = (await query(queryText))[0].city;
    console.log(patientCity);
    const queryText2 = `SELECT * 
    FROM tabeeb.doctors
    WHERE city='${patientCity}'`;
    const doctors = await query(queryText2);
    res.send(doctors);
  } catch (err) {
    res.status(422).send(err);
  }
};
module.exports = {
  postSignup,
  postLogin,
  postChangePassword,
  postSearch,
  postDashboard,
};
