const errorHandler = (err, req, res, next) => {
  console.log(JSON.stringify(err));
  res.json({ message: err.message });
};

module.exports = errorHandler;
