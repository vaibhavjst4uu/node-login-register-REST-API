const handleSequelizeValidationError = (err, req, res, next) => {
  if (err.type === 'Validation error') {
    const errorMessages = err.errors.map(error => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  next(err); // Pass on the error if it's not SequelizeValidationError
};

module.exports = {
  handleSequelizeValidationError,
};