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

    const queryText = `INSERT INTO ${process.env.database}.patients (email, password, phone_number, full_name ,city, wallet_amount, isbanned)
                        VALUES (?,?,?,?,?,?, false);`;

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
          FROM ${process.env.database}.patients
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
    const queryText = `SELECT * FROM ${process.env.database}.patients WHERE email=?`;
    const result = await query(queryText, [email]);
    const hash = result[0].password;
    const match = await bcrypt.compare(oldPassword, hash);
    if (!match) throw "Old password doesnt match";
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE ${process.env.database}.patients
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
    const queryText = `SELECT city FROM ${process.env.database}.patients WHERE email=?`;
    const patientCity = (await query(queryText, [email]))[0].city;
    //search doctors in the city of patient
    const queryText2 = `SELECT *
    FROM ${process.env.database}.doctors
    WHERE city=?
    AND
    full_name LIKE '%${search}%'
    AND
    isverified=true`;
    const doctors = await query(queryText2, [patientCity]);
    res.send(doctors);
  } catch (err) {
    res.status(422).send(err);
  }
};

const postDashboard = async (req, res) => {
  //need patient email
  try {
    const { token } = req.body;
    const email = await getEmail(token);
    const queryText = `SELECT city FROM ${process.env.database}.patients WHERE email=?`;
    const patientCity = (await query(queryText, [email]))[0].city;
    console.log(patientCity);
    const queryText2 = `SELECT *
    FROM ${process.env.database}.doctors
    INNER JOIN ${process.env.database}.services ON cnic=d_cnic
    WHERE city=? AND isverified=true`;
    const doctors = await query(queryText2, [patientCity]);
    console.log(doctors);
    res.send(doctors);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
};

const postViewProfile = async (req, res) => {
  try {
    // need patient email
    const { token } = req.body;
    const email = await getEmail(token);
    const queryText = `SELECT * FROM ${process.env.database}.patients WHERE email=?`;
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
    const queryText = `UPDATE ${process.env.database}.patients
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
    //need patient token, doctor email, datetime (format 'YYYY-MM-DD hh:mm:ss') of appointment
    const { token, doctor_email, datetime } = req.body;
    console.log("adadasdas", req.body);
    const patient_email = await getEmail(token);
    const patient_phone = await getPatientID(patient_email);
    const d_cnic = await getDoctorID(doctor_email);

    //check if doc has service
    const service = (
      await query(
        `SELECT rate FROM ${process.env.database}.services WHERE d_cnic=?`,
        [d_cnic]
      )
    )[0];
    if (!service) {
      throw "Doctor does not have a service!";
    }
    const charges = service.rate;

    //check if patient has enough balance
    const patient_balance = (
      await query(
        `SELECT wallet_amount FROM ${process.env.database}.patients WHERE phone_number=?`,
        [patient_phone]
      )
    )[0].wallet_amount;
    if (patient_balance < charges) {
      throw "Patient does not have enough balance!";
    } else {
      //update patient balance
      const updatedBalance = patient_balance - charges;
      await query(
        `UPDATE ${process.env.database}.patients SET wallet_amount=? WHERE phone_number=?`,
        [updatedBalance, patient_phone]
      );
    }
    const queryText = `INSERT INTO ${process.env.database}.appointments (patient_phone, d_cnic, date_time, status, prescription, charges)
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
const postWalletAmount = async (req, res) => {
  try {
    //need patient email
    const { token } = req.body;
    const email = await getEmail(token);
    const queryText = `SELECT wallet_amount from ${process.env.database}.patients WHERE email=?`;
    const wallet_amount = (await query(queryText, [email]))[0].wallet_amount;
    res.send({ balance: wallet_amount });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postAddBalance = async (req, res) => {
  try {
    //need patient email and added amount
    const { token, balance } = req.body;
    const email = await getEmail(token);
    const queryText = `SELECT * from ${process.env.database}.patients WHERE email=?`;
    const updated_amount =
      (await query(queryText, [email]))[0].wallet_amount + balance;
    const queryText2 = `UPDATE ${process.env.database}.patients SET wallet_amount=? WHERE email=?`;
    query(queryText2, [updated_amount, email]);
    res.send({ success: true, message: "Balance Updated" });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const getServiceDetails = async (req, res) => {
  try {
    //need doc email
    const { docEmail } = req.body;
    // console.log(email);
    // const email = await getEmail(token);
    const cnic = await getDoctorID(docEmail);
    // console.log("CNIC", cnic);
    const queryText = `SELECT * FROM ${process.env.database}.services WHERE d_cnic=?`;
    const service = (await query(queryText, [cnic]))[0];
    const reviews = await getReviews(docEmail);
    res.send({
      service_details: service,
      doc_reviews: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const postReview = async (req, res) => {
  try {
    //need patient token, d_cnic, rating and review
    const { token, d_cnic, rating, review, appointment_id } = req.body;
    console.log(req.body);
    const patient_email = await getEmail(token);
    const patient_phone = await getPatientID(patient_email);
    const queryText = `INSERT INTO ${process.env.database}.reviews 
    (patient_phone, d_cnic, rating, review_text, appointment_id) VALUES (?,?,?,?,?)`;
    await query(queryText, [
      patient_phone,
      d_cnic,
      rating,
      review,
      appointment_id,
    ]);
    res.send("Review Posted!");
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
};

const getReviews = async (doctor_email) => {
  try {
    //need doc email
    // const { doctor_email } = req.body;
    const d_cnic = await getDoctorID(doctor_email);
    const queryText = `SELECT * FROM  ${process.env.database}.reviews WHERE d_cnic=?`;
    const reviews = await query(queryText, [d_cnic]);
    return reviews;
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
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
  postWalletAmount,
  postAddBalance,
  getServiceDetails,
  postReview,
  getReviews,
};
