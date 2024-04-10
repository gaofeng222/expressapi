const responseMd = (req, res, next) => {
  res.fnCb = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
};

module.exports = responseMd;
