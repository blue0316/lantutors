const mysql = require('mysql');

// Database Connection for Production

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: `/cloudsql/${process.env.DB_INSTANCE}`,
  user: DB_USER,
  password: DB_PASS,
  database: 'lantutors',
  socketPath: `/cloudsql/${process.env.DB_INSTANCE}`,
});

module.exports = connection;
