const { Pool } = require('pg');

//DB CONNECTION
const poolConfig = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT
};

const pool = new Pool(poolConfig);

module.exports = pool;
