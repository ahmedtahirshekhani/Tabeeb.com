const mysql = require("mysql");
const util = require("util");

const patientSchema = `CREATE TABLE IF NOT EXISTS patients
    (phone_number   varchar(13),
    email           varchar(255),
    full_name       varchar(50),
    password        varchar(20),
    city            varchar(20),
    wallet_amount   double,
    PRIMARY KEY (phone_number)
    )`;

const doctorSchema = `CREATE TABLE IF NOT EXISTS doctors
    (cnic           varchar(13),
    email           varchar(255),
    password        varchar(20),
    phone_number    varchar(13),
    full_name       varchar(40),
    about_doctor    MEDIUMTEXT,
    street_address  varchar(255),
    city            varchar(20),
    pmc_reg         varchar(7),
    isverified      boolean,
    isbanned        boolean,
    PRIMARY KEY (cnic)
)`;

const serviceSchema = `CREATE TABLE IF NOT EXISTS services
    (d_cnic           varchar(13),
    start_time        time,
    end_time          time,
    days              enum ('Mon','Tue','Wed', 'Thur', 'Fri', 'Sat', 'Sun'),
    rate              double,
    PRIMARY KEY (d_cnic),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic)
)`;

const appointmentSchema = `CREATE TABLE IF NOT EXISTS appointments
    (appointment_id     int NOT NULL AUTO_INCREMENT,
    patient_phone       varchar(11),
    d_cnic              varchar(13),
    date                date,
    time                time,
    status              enum ('pending','accepted','rejected','completed'),
    prescription        MEDIUMTEXT,
    charges             double,
    PRIMARY KEY (appointment_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic),
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number)
)`;

const adminSchema = `CREATE TABLE IF NOT EXISTS admins
    (email          varchar(255),
    password        varchar(20),
    PRIMARY KEY (email)
)`;

const reviewsSchema = `CREATE TABLE IF NOT EXISTS reviews
    (review_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    rating          SMALLINT,
    review_text     MEDIUMTEXT,
    PRIMARY KEY (review_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic),
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number)
)`;

const reportDoctorSchema = `CREATE TABLE IF NOT EXISTS reported_doctors
    (report_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    report_reason   MEDIUMTEXT,
    PRIMARY KEY (report_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic),
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number)
)`;

const reportPatientSchema = `CREATE TABLE IF NOT EXISTS reported_patients
    (report_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    report_reason   MEDIUMTEXT,
    PRIMARY KEY (report_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic),
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number)
)`;

const schemas = [
  patientSchema,
  doctorSchema,
  serviceSchema,
  appointmentSchema,
  adminSchema,
  reviewsSchema,
  reportDoctorSchema,
  reportPatientSchema,
];
// Create connection
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const query = util.promisify(db.query).bind(db);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
  sql = "CREATE DATABASE IF NOT EXISTS " + process.env.database;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    for (let k = 0; k < schemas.length; k++) {
      db.query(schemas[k], (err, result) => {
        if (err) {
          console.log("Table creation failed", err);
        } else {
          console.log("Table created");
        }
      });
    }
  });
});

module.exports = { db, query };
