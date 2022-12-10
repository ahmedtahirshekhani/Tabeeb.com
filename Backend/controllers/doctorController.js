const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  failureMessage,
  getDoctorID,
  getAppointmentsDoc,
  getEmail,
  getPatientID,
} = require("./util");

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

    const queryText = `INSERT INTO ${process.env.database}.doctors (cnic, email, password, phone_number, full_name, about_doctor, street_address,city, pmc_reg, isverified, isbanned)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const result = await query(queryText, [
      cnic,
      email,
      hash,
      phone_number,
      name,
      about_doctor,
      street_address,
      city,
      pmc_reg,
      false,
      false,
    ]);
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
          FROM ${process.env.database}.doctors
          WHERE email = ?
          `;

    const result = await query(queryText, [email]);
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
    console.log(err);
    return res.status(422).send(failureMessage);
  }
};

// required: email, old password, new password
const postChangePassword = async (req, res) => {
  try {
    const { token, oldPassword, newPassword } = req.body;
    const email = await getEmail(token);
    if (!newPassword) throw "Enter old password";
    const queryText = `SELECT * FROM ${process.env.database}.doctors WHERE email= ?`;
    const result = await query(queryText, [email]);
    const hash = result[0].password;
    const match = await bcrypt.compare(oldPassword, hash);
    if (!match) throw "Old password doesnt match";
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE ${process.env.database}.doctors
      SET password= ?
      WHERE email= ?`;
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

const postViewProfile = async (req, res) => {
  try {
    // need doctor email
    const { token } = req.body;
    const email = await getEmail(token);
    const queryText = `SELECT * FROM ${process.env.database}.doctors WHERE email= ?`;
    const result = await query(queryText, [email]);
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
    const email = await getEmail(token);
    const queryText = `UPDATE ${process.env.database}.doctors
    SET full_name=?, city=?, street_address=?, about_doctor=?
    WHERE email=?`;
    await query(queryText, [
      full_name,
      city,
      street_address,
      about_doctor,
      email,
    ]);
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
    // //need doc email
    const { token } = req.body;
    const email = await getEmail(token);
    // const { email } = req.body;
    const result = await getAppointmentsDoc(email, "completed");
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postPendingAppointments = async (req, res) => {
  try {
    //need doc email
    const { token } = req.body;
    const email = await getEmail(token);
    // const { email } = req.body;
    const result = await getAppointmentsDoc(email, "pending");
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postAcceptedAppointments = async (req, res) => {
  try {
    //need doc email
    const { token } = req.body;
    const email = await getEmail(token);
    // const { email } = req.body;
    const result = await getAppointmentsDoc(email, "accepted");
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postEditService = async (req, res) => {
  console.log("req recieved");
  /*sample object:
	{
    "email":"anwar@gmail.com",
    "start_time":"21:00",
     "end_time":"22:00",
    "days":"Mon,Wed,Fri",
    "rate":"2990"
}*/
  try {
    //time format = 'hh:mm:ss'
    //days = 'Mon,Tue,Wed,Thur,Fri,Sat,Sun'
    const { token, start_time, end_time, days, rate } = req.body;
    const email = await getEmail(token);
    const cnic = await getDoctorID(email);
    const queryText = `INSERT INTO ${process.env.database}.services (d_cnic, start_time, end_time, days, rate)
	VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE
	start_time=?, end_time=?, days=?, rate=?`;
    await query(queryText, [
      cnic,
      start_time,
      end_time,
      days,
      rate,
      start_time,
      end_time,
      days,
      rate,
    ]);
    const successMessage = {
      success: true,
      message: "Service Updated",
    };
    res.send(successMessage);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postAcceptAppointment = async (req, res) => {
  //required: appointment id
  try {
    const { appointment_id } = req.body;
    const queryText = `UPDATE ${process.env.database}.appointments SET status='accepted' WHERE appointment_id=?`;
    await query(queryText, [appointment_id]);
    res.send({
      success: true,
      message: "Appointment Accepted!",
    });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postRejectAppointment = async (req, res) => {
  //required: appointment id
  try {
    const { appointment_id } = req.body;
    const queryText = `UPDATE ${process.env.database}.appointments SET status='rejected' WHERE appointment_id=?}`;
    await query(queryText, [appointment_id]);
    res.send({
      success: true,
      message: "Appointment Rejected!",
    });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postEarningsReport = async (req, res) => {
  //required: doc email
  try {
    const { token } = req.body;
    const email = await getEmail(token);
    const cnic = await getDoctorID(email);
    const queryText = `SELECT * FROM ${process.env.database}.appointments WHERE d_cnic=? AND status='completed'`;
    const appointmentHistory = await query(queryText, [cnic]);
    const queryText2 = `SELECT SUM(charges) as earnings FROM ${process.env.database}.appointments WHERE d_cnic=? AND status='completed'`;
    const totalEarnings = (await query(queryText2, [cnic]))[0].earnings;
    res.send({
      success: true,
      message: "Report Generated!",
      history: appointmentHistory,
      earnings: totalEarnings,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postPrescriptionHistory = async (req, res) => {
  //required: patient email
  //todo: jwt
  try {
    const { email } = req.body;
    // const email = await getEmail(token);
    const phone = await getPatientID(email);
    const queryText = `SELECT * FROM ${process.env.database}.appointments WHERE patient_phone=? AND status='completed'`;
    const patientHistory = await query(queryText, [phone]);
    res.send({
      success: true,
      message: "History Generated!",
      history: patientHistory,
    });
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
  postPastAppointments,
  postPendingAppointments,
  postAcceptedAppointments,
  postEditService,
  postAcceptAppointment,
  postRejectAppointment,
  postEarningsReport,
  postPrescriptionHistory,
};
