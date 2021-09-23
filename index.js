/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const { errorHandling } = require('./src/middleware');
const morgan = require('morgan');
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
// CORS
const optionCors = {
  credentials: true,
  origin: process.env.HOST_CLIENT,
};

app.use(cors(optionCors));

// api routes
app.use('/v1', routes);
app.use('/files', express.static('./public/images'));

app.use((err, req, res, next) => {
  errorHandling(err, req, res, next);
  next();
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
