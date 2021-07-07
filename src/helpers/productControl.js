const productControl = (req, res, action, statusCode, message) => {
  const response = {
    status: statusCode,
  };
  return action()
    .then((result) => {
      res.status(statusCode).json({
        message,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(statusCode).json({
        message,
        err,
      });
    });
};

module.exports = productControl;