const express = require('express');
const morgan = require('morgan');
const pool = require('../db');
const routes = require('./routes')
const cors = require('cors')

const app = express();
const PORT = 3000;

// app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
app.use('/', routes)
app.use(express.static(__dirname + '/../client/dist'));

pool.connect((err) => {
  if (err) console.error('db error', err);
  else console.log('Database connected');
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})