const mysql = require("mysql");
const util = require("util");
const bcrypt = require("bcryptjs");

const patientSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.patients
    (phone_number   varchar(13),
    email           varchar(255),
    full_name       varchar(50),
    password        varchar(100),
    city            varchar(20),
    wallet_amount   double,
    PRIMARY KEY (phone_number),
    UNIQUE (email)
     )`;

const doctorSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.doctors
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

const serviceSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.services
    (d_cnic           varchar(13),
    start_time        time,
    end_time          time,
    days              varchar(30),
    rate              double,
    PRIMARY KEY (d_cnic),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const appointmentSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.appointments
    (appointment_id     int NOT NULL AUTO_INCREMENT,
    patient_phone       varchar(11),
    d_cnic              varchar(13),
    date_time           DATETIME,
    status              enum ('pending','accepted','rejected','completed'),
    prescription        MEDIUMTEXT,
    charges             double,
    PRIMARY KEY (appointment_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const adminSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.admins
    (email          varchar(255),
    password        varchar(100),
    PRIMARY KEY (email)
)`;

const reviewsSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.reviews
    (review_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    rating          SMALLINT,
    review_text     MEDIUMTEXT,
    PRIMARY KEY (review_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const reportDoctorSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.reported_doctors
    (report_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    report_reason   MEDIUMTEXT,
    PRIMARY KEY (report_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const reportPatientSchema = `CREATE TABLE IF NOT EXISTS ${process.env.database}.reported_patients
    (report_id      int NOT NULL AUTO_INCREMENT,
    patient_phone   varchar(11),
    d_cnic          varchar(13),
    report_reason   MEDIUMTEXT,
    PRIMARY KEY (report_id),
    FOREIGN KEY (d_cnic) REFERENCES doctors(cnic) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (patient_phone) REFERENCES patients(phone_number) ON DELETE CASCADE ON UPDATE CASCADE
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

// FILL DB CODE---------------------------------
const fs = require("fs").promises;
const fileName1 = "./database/names.csv";
const fileName2 = "./database/addresses.csv";
const getNames = async () => {
  const data = (await fs.readFile(fileName1)).toString().split(/\r?\n/);
  return data;
};
const getAddresses = async () => {
  const data = (await fs.readFile(fileName2))
    .toString()
    .split(/\r?\n/)
    .map((el) => el.trim());
  return data;
};
const generateStrings = async (names) => {
  const pmc_reg = 9000000;
  let fullNames = Array(names.length);
  let emails = Array(names.length);
  let passwords = Array(names.length);
  let cnics = Array(names.length);
  let phone_numbers = Array(names.length);
  const cnic = 4230100000000;
  const phone_number = 3200000000;
  let cities = Array(names.length);
  const cityNames = ["Karachi", "Lahore", "Islamabad"];
  const half = Math.floor(names.length / 2);
  const wallet_amounts = Array(half);
  let pmc_regs = [];

  for (let i = 0; i < names.length - 1; i++) {
    fullNames[i] = names[i] + " " + names[i + 1];
    emails[i] = names[i] + "@gmail.com";
    passwords[i] = names[i + 1];
    phone_numbers[i] = "0" + (phone_number + i).toString();
    cnics[i] = (cnic + i).toString();
    cities[i] = cityNames[i % 3];

    if (i < half) {
      wallet_amounts[i] = (Math.random() * 15000 + 1).toFixed(2);
    } else {
      pmc_regs.push((pmc_reg + i).toString());
    }
  }
  return {
    full_names: fullNames,
    emails: emails,
    passwords: passwords,
    phone_numbers: phone_numbers,
    cnics: cnics,
    cities: cities,
    wallet_amounts: wallet_amounts,
    pmc_regs: pmc_regs,
  };
};

const generateNumbers = async (names) => {
  // for(let)
};

const fillPatients = async (
  patientFullNames,
  patientEmails,
  patientPasswords,
  patientCities,
  patientPhones,
  patientWallets,
  patientsNo
) => {
  for (let i = 0; i < patientsNo; i++) {
    let hash = await bcrypt.hash(patientPasswords[i], 10);
    let queryText = `
    INSERT INTO ${process.env.database}.patients VALUES ('${patientPhones[i]}','${patientEmails[i]}','${patientFullNames[i]}','${hash}','${patientCities[i]}',${patientWallets[i]})
 `;
    db.query(queryText, (err, result) => {
      if (err) return null;
    });
  }
};

const fillDoctors = async (
  doctorFullNames,
  doctorEmails,
  doctorPasswords,
  doctorCities,
  doctorPhones,
  addresses,
  doctorsNo,
  doctorCnics,
  pmc_regs
) => {
  for (let i = 0; i < doctorsNo; i++) {
    let hash = await bcrypt.hash(doctorPasswords[i], 10);
    let queryText = `INSERT INTO ${process.env.database}.doctors VALUES ('${
      doctorCnics[i]
    }','${doctorEmails[i]}','${hash}','${doctorPhones[i]}','${
      doctorFullNames[i]
    }', '' ,'${addresses[i]}','${doctorCities[i]}','${pmc_regs[i]}',${
      i % 2
    },0)`;
    db.query(queryText, (err, result) => {
      if (err) {
      }
    });
  }
};
const fillDB = async () => {
  const names = (await getNames()).slice(0, 500);
  const {
    full_names,
    emails,
    passwords,
    phone_numbers,
    cnics,
    cities,
    wallet_amounts,
    pmc_regs,
  } = await generateStrings(names);

  const patientsNo = wallet_amounts.length;
  const patientFullNames = full_names.slice(0, patientsNo);
  const patientEmails = emails.slice(0, patientsNo);
  const patientPasswords = passwords.slice(0, patientsNo);
  const patientCities = cities.slice(0, patientsNo);
  const patientPhones = phone_numbers.slice(0, patientsNo);
  const patientWallets = wallet_amounts.slice(0, patientsNo);

  const doctorsNo = pmc_regs.length;
  const addresses = (await getAddresses()).slice(0, doctorsNo);
  const doctorFullNames = full_names.slice(patientsNo);
  const doctorEmails = emails.slice(patientsNo);
  const doctorPasswords = passwords.slice(patientsNo);
  const doctorCities = cities.slice(patientsNo);
  const doctorPhones = phone_numbers.slice(patientsNo);
  const doctorCnics = cnics.slice(patientsNo);

  await fillPatients(
    patientFullNames,
    patientEmails,
    patientPasswords,
    patientCities,
    patientPhones,
    patientWallets,
    patientsNo
  );
  await fillDoctors(
    doctorFullNames,
    doctorEmails,
    doctorPasswords,
    doctorCities,
    doctorPhones,
    addresses,
    doctorsNo,
    doctorCnics,
    pmc_regs
  );

  //   }
};

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
  sql = "CREATE DATABASE IF NOT EXISTS " + process.env.database;
  db.query(sql, async function (err, result) {
    if (err) throw err;
    // console.log("Database created!");
    for (let k = 0; k < schemas.length; k++) {
      db.query(schemas[k], (err, result) => {
        if (err) {
          console.log("Table creation failed", err);
        } else {
          //   console.log("Table created");
        }
      });
    }
    const hash = await bcrypt.hash("admin", 10);
    const addAdminQuery = `INSERT INTO ${process.env.database}.admins (email, password) VALUES ('admin', '${hash}')`;
    db.query(addAdminQuery, async (err, result) => {
      if (err) {
        // console.log("Admin already exists");
      } else {
        console.log("Admin created");
      }
      await fillDB();
      console.log("All records inserted");
    });
  });
});

module.exports = { db, query };
