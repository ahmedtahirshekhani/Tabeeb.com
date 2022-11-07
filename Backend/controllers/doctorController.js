const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");

const postSignup = async (req, res) => {
  console.log("HELLO", req.body);
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
    const queryText = `INSERT INTO doctors (cnic, email, password, phone_number, full_name, about_doctor, street_address,city, pmc_reg, isverified, isbanned)
                        VALUES ('${cnic}', '${email}', '${password}','${phone_number}','${name}','${about_doctor}','${street_address}','${city}','${pmc_reg}',false,false);`;
    const result = await query(queryText);
    res.send("Doctor Signed Up");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

module.exports = { postSignup };
