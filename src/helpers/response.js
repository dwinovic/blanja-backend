const response = (res, statusCode, data, error) => {
  const dataResponse = {
    status: 'Success',
    statusCode,
    data,
    error: error || null,
  };

  res.status(statusCode).json(dataResponse);
};

module.exports = response;