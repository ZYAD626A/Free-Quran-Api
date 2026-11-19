// const path = require("path");
// const { createReadStream, readFileSync } = require("fs");
// const { fail } = require("./JsendCodes");
// const readStreamFunction = (req, res, filePath) => {
//   res.status(200);
//   res.setHeader("Content-Type", "application/json");

//   const mainFilePath = path.join(__dirname, filePath);
//   const stream = createReadStream(mainFilePath, "utf-8");
//   // const { ayah, surah, type, search } = req.query;
//   // if (!ayah && !surah && !type && !search) {
//   stream.pipe(res);
//   stream.on("error", (err) => {
//     console.log("==========ERROR============= \n", err);
//     err.message = "Fail at read or find file";

//     res
//       .status(500)
//       .json(fail({ message: "Internal server error", error: err.message }));
//   });
//   // }
// };
// module.exports = readStreamFunction;
