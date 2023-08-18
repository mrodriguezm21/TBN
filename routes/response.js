exports.success = (req, res, data, status = 200) => {
  res.status(status).json({
    error: false,
    body: data,
  });
};

exports.error = (req, res, data, details, status = 500) => {
  console.error(`[response error] ${details}`);
  res.status(status).json({
    error: true,
    body: data,
  });
};
