const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { failureMessage, getDoctorID } = require("./util");

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
    const successMessage = {
      success: true,
      message: "Doctor Successfully Signed Up!",
      user: result,
    };
    res.status(200).send(successMessage);
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
      token = jwt.sign(
        { email: result[0].email, role: "doctor" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      successMessage["token"] = token;
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
    const { token, oldPassword, newPassword } = req.body;
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;
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

const postViewProfile = async (req, res) => {
  try {
    // need doctor email
    const { token } = req.body;
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;
    const queryText = `SELECT * FROM tabeeb.doctors WHERE email='${email}'`;
    const result = await query(queryText);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postEditProfile = async (req, res) => {
  try {
    //only full name, city, street address, city can be edited in doctor profile
    const { token, full_name, city, street_address, about_doctor } = req.body;
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;
    const queryText = `UPDATE tabeeb.doctors
    SET full_name='${full_name}', city='${city}', street_address='${street_address}', about_doctor='${about_doctor}'
    WHERE email='${email}'`;
    await query(queryText);
    const successMessage = {
      success: true,
      message: "Profile Updated",
    };
    res.send(successMessage);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

module.exports = {
  postSignup,
  postLogin,
  postChangePassword,
  postViewProfile,
  postEditProfile,
};
