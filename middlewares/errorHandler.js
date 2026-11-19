// const { error } = require("../utils/JsendCodes");

// const errorHandler = (err, req, res, next) => {
//   // If response has already started, delegate to Express
//   if (res.headersSent) {
//     return next(err);
//   }

//   const statusCode =
//     Number.isInteger(err.statusCode) &&
//     err.statusCode >= 400 &&
//     err.statusCode <= 599
//       ? err.statusCode
//       : 500;

//   console.error(err);

//   return res
//     .status(statusCode)
//     .json(
//       error(
//         statusCode === 500 ? "Internal Server Error" : err.message,
//         statusCode,
//         err.data || null,
//       ),
//     );
// };

// module.exports = errorHandler;

const { fail, error } = require("../utils/JsendCodes");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode <= 599
      ? err.statusCode
      : 500;

  console.error(err);

  // Client errors: 4xx
  if (statusCode < 500) {
    return res.status(statusCode).json(
      fail({
        message: err.message,
      })
    );
  }

  // Server errors: 5xx
  return res.status(statusCode).json(
    error("Internal Server Error", statusCode)
  );
};

module.exports = errorHandler;
