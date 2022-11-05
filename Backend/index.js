const dotenv = require("dotenv");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
dotenv.config({ path: ".env" });
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const schemas = require("./database/schema.js");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
const schema = require("./database/schema.js");

// Create connection
var connectionString = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connectionString.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
  sql = "CREATE DATABASE IF NOT EXISTS " + process.env.database;
  connectionString.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    for (let k = 0; k < schemas.length; k++) {
      connectionString.query(schemas[k], (err, result) => {
        if (err) {
          console.log("Table creation failed", err);
        } else {
          console.log("Table created");
        }
      });
    }
  });
});

app.use("/api/v1/auth", authRoutes);

app.listen(port, function () {
  console.log("App is running! at port", port);
});

module.exports = app;
