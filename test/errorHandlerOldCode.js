// const { error } = require("../utils/JsendCodes");

// const errorHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   console.log(err);

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