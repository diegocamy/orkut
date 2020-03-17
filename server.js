const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT
};

const pool = new Pool(poolConfig);

const app = express();

app.get('/', (req, res) => {
  return res.send('HOLAMUNDO');
});

app.get('/query', async (req, res) => {
  try {
    const query = await pool.query('SELECT * FROM scraps');
    const array = await query.rows;
    return res.json(array);
  } catch (error) {
    return res.json({ error: error });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
