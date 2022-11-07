const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });
    const queryText = `SELECT *
          FROM admins
          WHERE email = '${email}'
          `;
    const result = await query(queryText);
    pw = result[0].password;
    if (pw === password) {
      res.send("Admin logged in");
    } else {
      throw err;
    }
  } catch (err) {
    res.status(422).send("incorrect credentials");
  }
};

const getDoctorRequests = async (req, res) => {
  try {
    const queryText = `SELECT *
          FROM doctors
          WHERE isVerified = false
          `;
    const result = await query(queryText);
    console.log(result);
    res.send("Done");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const postAcceptRequest = async (req, res) => {
  console.log("IN post accept request");
  try {
    const cnic = req.body.cnic;
    const queryText = `UPDATE doctors
      SET isVerified = true
      WHERE cnic = '${cnic}'`;
    await query(queryText);
    res.send("Request Accepted");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const postRejectRequest = async (req, res) => {
  console.log("IN post reject request");
  try {
    const cnic = req.body.cnic;
    const queryText = `DELETE FROM doctors
    WHERE cnic='${cnic}'`;
    await query(queryText);
    res.send("Request rejected");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const getReports = async (req, res) => {
  try {
    let result = {};
    let queryText = `SELECT *
          FROM reported_doctors
          `;
    result["doctors"] = await query(queryText);
    queryText = `SELECT *
          FROM reported_patients
          `;
    result["patients"] = await query(queryText);
    res.send(result);
  } catch (err) {
    res.status(422).send(err.message);
  }
};

module.exports = {
  postLogin,
  getDoctorRequests,
  postAcceptRequest,
  postRejectRequest,
  getReports,
};
