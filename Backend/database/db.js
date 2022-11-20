const mysql = require("mysql");
const util = require("util");
const bcrypt = require("bcryptjs");

const patientSchema = `CREATE TABLE IF NOT EXISTS tabeeb.patients
    (phone_number   varchar(13),
    email           varchar(255),
    full_name       varchar(50),
    password        varchar(100),
    city            varchar(20),
    wallet_amount   double,
    PRIMARY KEY (phone_number),
    UNIQUE (email)
    )`;

const doctorSchema = `CREATE TABLE IF NOT EXISTS tabeeb.doctors
    (cnic           varchar(13),
    email           varchar(255),
    password        varchar(100),
    phone_number    varchar(13),
    full_name       varchar(40),
    about_doctor    MEDIUMTEXT,
    street_address  varchar(255),
    city            varchar(20),
    pmc_reg         varchar(7),
    isverified      boolean,
    isbanned        boolean,
    PRIMARY KEY (cnic),
    UNIQUE (email),
    UNIQUE (phone_number)
)`;

const serviceSchema = `CREATE TABLE IF NOT EXISTS tabeeb.services
    (d_cnic           varchar(13),
    start_time        time,
    end_time          time,
    days              enum ('Mon','Tue','Wed', 'Thur', 'Fri', 'Sat', 'Sun'),
    rate              double,
    PRIMARY KEY (d_cnic),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic)
)`;

const appointmentSchema = `CREATE TABLE IF NOT EXISTS tabeeb.appointments
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

const adminSchema = `CREATE TABLE IF NOT EXISTS tabeeb.admins
    (email          varchar(255),
    password        varchar(100),
    PRIMARY KEY (email)
)`;

const reviewsSchema = `CREATE TABLE IF NOT EXISTS tabeeb.reviews
    (review_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    rating          SMALLINT,
    review_text     MEDIUMTEXT,
    PRIMARY KEY (review_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic),
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number)
)`;

const reportDoctorSchema = `CREATE TABLE IF NOT EXISTS tabeeb.reported_doctors
    (report_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    report_reason   MEDIUMTEXT,
    PRIMARY KEY (report_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic),
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number)
)`;

const reportPatientSchema = `CREATE TABLE IF NOT EXISTS tabeeb.reported_patients
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
});

const query = util.promisify(db.query).bind(db);

// db.connect(function (err) {
// 	if (err) throw err;
// 	console.log("Connected to the database");
// 	sql = "CREATE DATABASE IF NOT EXISTS " + process.env.database;
// 	db.query(sql, async function (err, result) {
// 		if (err) throw err;
// 		console.log("Database created!");
// 		for (let k = 0; k < schemas.length; k++) {
// 			db.query(schemas[k], (err, result) => {
// 				if (err) {
// 					console.log("Table creation failed", err);
// 				} else {
// 					console.log("Table created");
// 				}
// 			});
// 		}
// 		const hash = await bcrypt.hash("test1234", 10);
// 		addAdminQuery = `INSERT INTO tabeeb.admins (email, password) VALUES ('admin@test.com', '${hash}')`;
// 		db.query(addAdminQuery, (err, result) => {
// 			if (err) {
// 				console.log("Admin already exists");
// 			} else {
// 				console.log("Admin created");
// 			}
// 		});
// 	});
// });

module.exports = { db, query };
