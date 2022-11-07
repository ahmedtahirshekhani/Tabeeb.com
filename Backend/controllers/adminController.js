const { db, query } = require("../database/db.js");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: "Invalid login: Input missing!" });
    const queryText = `SELECT *
          FROM admins
          WHERE email = '${email}'
          `;
    const result = await query(queryText);
    pw = result[0].password;
    if (pw === password) {
      res.send("Admin logged in");
    } else {
      throw err;
    }
  } catch (err) {
    res.status(422).send("incorrect credentials");
  }
};

module.exports = { postLogin };
