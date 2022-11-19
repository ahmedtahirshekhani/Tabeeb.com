const mysql = require('mysql');

var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password
    }
);

connectionString.connect(function(err){
    if(err) throw err;
    console.log("Connected to the database");
    sql = "CREATE DATABASE IF NOT EXISTS "+process.env.database;
    connectionString.query(sql, function(err, result){
        if(err) throw err;
        console.log("Database created");
    });
});

module.exports = connectionString;