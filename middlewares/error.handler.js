function logger(type, message, stack) {
  let res = `[${new Date().toLocaleTimeString("es-CO", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  })}] [${type}] [${message}] ${stack}}`;

  return res;
}

function logErrors(err, req, res, next) {
  console.error(logger("ERROR", err.message, err.stack));
  next(err);
}
function errorHandler(err, req, res, next) {
  console.log("errorHandler");
  res.status(500).json({ message: err.message, stack: err.stack });
}
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
