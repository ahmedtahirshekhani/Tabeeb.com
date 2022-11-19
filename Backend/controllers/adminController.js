const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const postLogin = async (req, res) => {
	try {
		// required: login form data object {email, password}
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(422).send({ error: "Invalid login: Input missing!" });
		const queryText = `SELECT *
          FROM tabeeb.admins
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
		res.status(422).send(failureMessage);
	}
};

const getDoctorRequests = async (req, res) => {
	try {
		const queryText = `SELECT *
          FROM tabeeb.doctors
          WHERE isVerified = false
          `;
		const result = await query(queryText);
		console.log(result);
		res.send(result);
	} catch (err) {
		res.status(422).send(err.message);
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
		const cnic = req.body.cnic;
		const queryText = `UPDATE tabeeb.doctors
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
		//required: cnic of doctor object
		const cnic = req.body.cnic;
		const queryText = `DELETE FROM tabeeb.doctors
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
          FROM tabeeb.reported_doctors
          `;
		result["doctors"] = await query(queryText);
		queryText = `SELECT *
          FROM tabeeb.reported_patients
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

module.exports = {
	postLogin,
	getDoctorRequests,
	postAcceptRequest,
	postRejectRequest,
	getReports,
};
