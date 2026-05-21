// // backend/config/db.js
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Sush@nt.2004",
//   database: "MunicipalityForms",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Just to log once at startup
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL Database (MunicipalityForms)");
//     connection.release();
//   }
// });

// // ⬅ export the *callback* pool (NOT promise)
// module.exports = pool;


// backend/config/db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database (MunicipalityForms)");
    connection.release();
  }
});

module.exports = pool;