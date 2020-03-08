const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  return res.send('HOLAMUNDO');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
