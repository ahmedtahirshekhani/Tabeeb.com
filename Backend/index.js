const dotenv = require("dotenv");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
dotenv.config({ path: ".env" });
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { db, query } = require("./database/db.js");
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patientRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/patient", patientRoutes);

app.listen(port, function () {
  console.log("App is running! at port", port);
});

module.exports = app;
