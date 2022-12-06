const jwt = require("jsonwebtoken");

const failureMessage = {
  success: false,
  message: "Invalid Credentials",
};
const { db, query } = require("../database/db.js");
const getDoctorID = async (email) => {
  const cnic = (
    await query(
      `SELECT cnic FROM ${process.env.database}.doctors WHERE email='${email}'`
    )
  )[0].cnic;
  return cnic;
};

const getPatientID = async (email) => {
  const phone = (
    await query(
      `SELECT phone_number FROM ${process.env.database}.patients WHERE email='${email}'`
    )
  )[0].phone_number;
  return phone;
};

const getAppointmentsDoc = async (email, status) => {
  try {
    // fetch doc cnic
    const cnic = await getDoctorID(email);
    //get appointments
    const queryText2 = `SELECT * FROM ${process.env.database}.appointments WHERE d_cnic='${cnic}' AND status='${status}'`;
    const appointmentsList = await query(queryText2);
    return appointmentsList;
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentsPatient = async (email, status) => {
  try {
    // fetch doc cnic
    const phone_number = await getPatientID(email);
    //get appointments
    const queryText2 = `SELECT * FROM ${process.env.database}.appointments WHERE patient_phone='${phone_number}' AND status='${status}'`;
    const appointmentsList = await query(queryText2);
    return appointmentsList;
  } catch (err) {
    console.log(err);
  }
};

const getEmail = async (token) => {
  return jwt.decode(token).email;
};
module.exports = {
  failureMessage,
  getDoctorID,
  getPatientID,
  getAppointmentsDoc,
  getAppointmentsPatient,
  getEmail,
};
