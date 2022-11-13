const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    const queryText = `INSERT INTO tabeeb.doctors (cnic, email, password, phone_number, full_name, about_doctor, street_address,city, pmc_reg, isverified, isbanned)
                        VALUES ('${cnic}', '${email}', '${hash}','${phone_number}','${name}','${about_doctor}','${street_address}','${city}','${pmc_reg}',false,false);`;

    const result = await query(queryText);
    res.send("Doctor Signed Up");
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const postLogin = async (req, res) => {
  try {
    // required: doctor login form data object {cnic, password}
    console.log("In post login", req.body);
    const { cnic, password } = req.body;
    if (!cnic || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });
    const queryText = `SELECT *
          FROM tabeeb.doctors
          WHERE cnic = '${cnic}'
          `;

    const result = await query(queryText);
    hash = result[0].password;
    if (await bcrypt.compare(password, hash)) {
      res.send("Doctor logged in");
    } else {
      throw "Invalid Credentials";
    }
  } catch (err) {
    return res.status(422).send(err);
  }
};

module.exports = { postSignup, postLogin };
