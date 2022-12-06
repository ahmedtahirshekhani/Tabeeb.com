const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  failureMessage,
  getPatientID,
  getAppointmentsPatient,
  getDoctorID,
  getEmail,
} = require("./util");

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
                        VALUES (?, ?,?,?,?,?);`;

    const result = await query(queryText, [
      email,
      hash,
      phone_number,
      name,
      city,
      0,
    ]);
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
          WHERE email = ?'
          `;

    const result = await query(queryText, [email]);
    const hash = result[0].password;
    const successMessage = {
      success: true,
      message: "User Successfully Logged In!",
    };
    if (await bcrypt.compare(password, hash)) {
      token = jwt.sign(
        { email: result[0].email, role: "patient" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      successMessage["token"] = token;
      res.send(successMessage);
    } else {
      throw "Invalid Credentials";
    }
  } catch (err) {
    console.log(err);
    const failureMessage = {
      success: false,
      message: "Invalid Credentials",
    };
    return res.status(422).send(failureMessage);
  }
};
const postChangePassword = async (req, res) => {
  try {
    const { token, oldPassword, newPassword } = req.body;
    const email = await getEmail(token);
    if (!newPassword) throw "Enter old password";
    const queryText = `SELECT * FROM tabeeb.patients WHERE email=?`;
    const result = await query(queryText, [email]);
    const hash = result[0].password;
    const match = await bcrypt.compare(oldPassword, hash);
    if (!match) throw "Old password doesnt match";
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE tabeeb.patients
      SET password=?
      WHERE email=?`;
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

const postSearch = async (req, res) => {
  //need patient email and patient search data
  try {
    const { token, search } = req.body;
    const email = await getEmail(token);
    // get city of patient
    const queryText = `SELECT city FROM tabeeb.patients WHERE email=?`;
    const patientCity = (await query(queryText, [email]))[0].city;
    //search doctors in the city of patient
    const queryText2 = `SELECT *
    FROM tabeeb.doctors
    WHERE city=?
    AND
    full_name LIKE '%${search}%'`;
    const doctors = await query(queryText2, [patientCity]);
    res.send(doctors);
  } catch (err) {
    res.status(422).send(err);
  }
};

const postDashboard = async (req, res) => {
  //need patient email
  try {
    const { email } = req.body;
    const queryText = `SELECT city FROM tabeeb.patients WHERE email=?`;
    const patientCity = (await query(queryText, [email]))[0].city;
    console.log(patientCity);
    const queryText2 = `SELECT *
    FROM tabeeb.doctors
    WHERE city=?`;
    const doctors = await query(queryText2, [patientCity]);
    res.send(doctors);
  } catch (err) {
    res.status(422).send(err);
  }
};

const postViewProfile = async (req, res) => {
  try {
    // need patient email
    const { token } = req.body;
    const email = await getEmail(token);
    const queryText = `SELECT * FROM tabeeb.patients WHERE email=?`;
    const result = await query(queryText, [email]);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postEditProfile = async (req, res) => {
  try {
    //only full name and city can be edited in patient profile
    const { token, full_name, city } = req.body;
    const email = await getEmail(token);
    const queryText = `UPDATE tabeeb.patients
    SET full_name=?, city=?
    WHERE email=?`;
    await query(queryText, [full_name, city, email]);
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

const postPastAppointments = async (req, res) => {
  try {
    //need patient email
    const { token } = req.body;
    const email = await getEmail(token);
    // const { email } = req.body;
    const appointmentsList = await getAppointmentsPatient(email, "completed");
    res.send(appointmentsList);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postPendingAppointments = async (req, res) => {
  try {
    //need patient email
    const { token } = req.body;
    const email = await getEmail(token);
    // const { email } = req.body;
    const appointmentsList = await getAppointmentsPatient(email, "pending");
    res.send(appointmentsList);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};
const postAcceptedAppointments = async (req, res) => {
  try {
    //need patient email
    const { token } = req.body;
    const email = await getEmail(token);
    // const { email } = req.body;
    const appointmentsList = await getAppointmentsPatient(email, "accepted");
    res.send(appointmentsList);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postMakeAppointment = async (req, res) => {
  try {
    //need patient email, doctor email, datetime (format 'YYYY-MM-DD hh:mm:ss') of appointment
    //jstoken needed
    const { token, doctor_email, datetime } = req.body;
    const patient_email = await getEmail(token);
    const patient_phone = await getPatientID(patient_email);
    const d_cnic = await getDoctorID(doctor_email);
    const service = (
      await query(`SELECT rate FROM tabeeb.services WHERE d_cnic=?`, [d_cnic])
    )[0];
    if (!service) {
      throw "Doctor does not have a service!";
    }
    const charges = service.rate;
    const patient_balance = (
      await query(
        `SELECT wallet_amount FROM tabeeb.patients WHERE phone_number=?`,
        [patient_phone]
      )
    )[0];
    if (patient_balance < charges) {
      throw "Patient does not have enough balance!";
    }
    const queryText = `INSERT INTO tabeeb.appointments (patient_phone, d_cnic, date_time, status, prescription, charges)
      VALUES (?, ?, ?, "pending", NULL, ?)`;
    const id = (
      await query(queryText, [patient_phone, d_cnic, datetime, charges])
    ).insertId;
    const successMessage = {
      success: true,
      message: "Appointment Made!",
      id: id,
    };
    res.send(successMessage);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
};
module.exports = {
  postSignup,
  postLogin,
  postChangePassword,
  postSearch,
  postDashboard,
  postViewProfile,
  postEditProfile,
  postPastAppointments,
  postPendingAppointments,
  postAcceptedAppointments,
  postMakeAppointment,
};
