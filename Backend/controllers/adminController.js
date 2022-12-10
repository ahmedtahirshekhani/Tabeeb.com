const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { failureMessage, getEmail } = require("./util");

const postLogin = async (req, res) => {
  try {
    // required: login form data object {email, password}
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });
    const queryText = `SELECT *
          FROM ${process.env.database}.admins
          WHERE email = ?
          `;
    const result = await query(queryText, [email]);
    const hash = result[0].password;
    const successMessage = {
      success: true,
      message: "User Successfully Logged In!",
    };
    if (await bcrypt.compare(password, hash)) {
      token = jwt.sign(
        { email: result[0].email, role: "admin" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      successMessage["token"] = token;
      console.log(successMessage);
      res.send(successMessage);
    } else {
      throw err;
    }
  } catch (err) {
    const failureMessage = {
      success: false,
      message: "Invalid Credentials",
    };
    res.status(422).send(failureMessage);
  }
};

const getDoctorRequests = async (req, res) => {
  try {
    const queryText = `SELECT *
          FROM ${process.env.database}.doctors
          WHERE isVerified = ?
          `;
    const result = await query(queryText, [false]);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(422).send(err.message);
    return;
    // check return format below
  }
};
/*
   returns list of these objects
  {
        "cnic": "4000166412863",
        "email": "faizan2@gmail.com",
        "password": "faizan",
        "phone_number": "09007860199",
        "full_name": "malik malik",
        "about_doctor": "ghanta",
        "street_address": "199 XX",
        "city": "Lahore",
        "pmc_reg": "ABCDEF5",
        "isverified": 0,
        "isbanned": 0
    }
    */

const postAcceptRequest = async (req, res) => {
  console.log("IN post accept request");
  try {
    //required: cnic of doctor object -> {"cnic": XXXXXXX}
    const { token, cnic } = req.body;

    const queryText = `UPDATE ${process.env.database}.doctors
      SET isVerified = ?
      WHERE cnic = ?`;
    await query(queryText, [1, cnic]);
    res.send("Request Accepted");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const postRejectRequest = async (req, res) => {
  console.log("IN post reject request");
  try {
    //required: cnic of doctor object
    const { token, cnic } = req.body;
    console.log(cnic);
    console.log("MADAR");
    const queryText = `DELETE FROM ${process.env.database}.doctors
    WHERE cnic= ?`;
    await query(queryText, [cnic]);
    res.send("Request rejected");
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const getReports = async (req, res) => {
  try {
    let result = {};
    let queryText = `SELECT *
          FROM ${process.env.database}.reported_doctors
          `;
    result["doctors"] = await query(queryText);
    queryText = `SELECT *
          FROM ${process.env.database}.reported_patients
          `;
    result["patients"] = await query(queryText);
    res.send(result);
  } catch (err) {
    res.status(422).send(err.message);
    // check return format below
  }
};
/*
    return format:
    "doctors": [
        {
            "report_id": 3,
            "patient_phone": "09447865199",
            "d_cnic": "4000166412863",
            "report_reason": "idk man"
        },
        {
            "report_id": 4,
            "patient_phone": "09447865555",
            "d_cnic": "4000166416663",
            "report_reason": "idk man 2"
        }
    ],
    "patients": [
        {
            "report_id": 1,
            "patient_phone": "09447865199",
            "d_cnic": "4000166412863",
            "report_reason": "idk man 2"
        },
        {
            "report_id": 2,
            "patient_phone": "09447865555",
            "d_cnic": "4000166416663",
            "report_reason": "idk man 2"
        }
    ]
    */

const postChangePassword = async (req, res) => {
  try {
    const { token, oldPassword, newPassword } = req.body;
    const email = await getEmail(token);
    if (!newPassword) throw "Enter old password";
    const queryText = `SELECT * FROM ${process.env.database}.admins WHERE email= ?`;
    const result = await query(queryText, [email]);
    const hash = result[0].password;
    const match = await bcrypt.compare(oldPassword, hash);
    if (!match) throw "Old password doesnt match";
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE ${process.env.database}.admins
      SET password = ?
      WHERE email = ?`;
    await query(updateQuery, [newPasswordHash, email]);
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
module.exports = {
  postLogin,
  getDoctorRequests,
  postAcceptRequest,
  postRejectRequest,
  getReports,
  postChangePassword,
};
