const errorHandler = (err, req, res, next) =>{
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = errorHandler;