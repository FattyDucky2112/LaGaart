
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lagaart',
  connectionLimit: 200,
  port: 3306
});

module.exports = pool