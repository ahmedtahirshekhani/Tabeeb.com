const failureMessage = {
  success: false,
  message: "Invalid Credentials",
};
const { db, query } = require("../database/db.js");
const getDoctorID = async (email) => {
  const cnic = (
    await query(`SELECT cnic FROM tabeeb.doctors WHERE email='${email}'`)
  )[0].cnic;
  return cnic;
};

const getPatientID = async (email) => {
  const phone = (
    await query(
      `SELECT phone_number FROM tabeeb.patients WHERE email='${email}'`
    )
  )[0].phone_number;
  return phone;
};
module.exports = { failureMessage, getDoctorID, getPatientID };
