const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { failureMessage } = require("./util");

/*required
complete doctor object from sign up form.
Follow the below naming conventions
*/
const postSignup = async (req, res) => {
  console.log("In Doctor postSignup");
  try {
    const {
      cnic,
      email,
      password,
      phone_number,
      name,
      about_doctor,
      street_address,
      city,
      pmc_reg,
    } = req.body;
    if (
      !(
        cnic &&
        email &&
        password &&
        phone_number &&
        name &&
        about_doctor &&
        street_address &&
        city &&
        pmc_reg
      )
    )
      return res.status(422).send({ error: "Invalid signup: Input missing!" });
    const hash = await bcrypt.hash(password, 10);

    const queryText = `INSERT INTO tabeeb.doctors (cnic, email, password, phone_number, full_name, about_doctor, street_address,city, pmc_reg, isverified, isbanned)
                        VALUES ('${cnic}', '${email}', '${hash}','${phone_number}','${name}','${about_doctor}','${street_address}','${city}','${pmc_reg}',false,false);`;

    const result = await query(queryText);
    res.send("Doctor Signed Up");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const postLogin = async (req, res) => {
  try {
    // required: doctor login form data object {email, password}
    console.log("In post login", req.body);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });
    const queryText = `SELECT *
          FROM tabeeb.doctors
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
    return res.status(422).send(failureMessage);
  }
};

// required: email, old password, new password
const postChangePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!newPassword) throw "Enter old password";
    const queryText = `SELECT * FROM tabeeb.doctors WHERE email='${email}'`;
    const result = await query(queryText);
    const hash = result[0].password;
    const match = await bcrypt.compare(oldPassword, hash);
    if (!match) throw "Old password doesnt match";
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE tabeeb.doctors 
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

module.exports = { postSignup, postLogin, postChangePassword };
