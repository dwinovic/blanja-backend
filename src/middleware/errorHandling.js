const createError = require('http-errors');

module.exports = errorHandling = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || new createError.InternalServerError();

  res.status(status).json(createError(status, message));
  next();
};