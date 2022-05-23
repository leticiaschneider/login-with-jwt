const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database');
const userRoutes = require('./routes/userRoutes')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

app.use(bodyParser.json())
app.use('/user', userRoutes)

app.listen(3000)

module.exports = app;