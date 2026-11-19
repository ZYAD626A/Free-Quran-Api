const path = require("path");
const fs = require("fs");

const readStreamFunction = (req, res, filePath, next) => {
  const mainFilePath = path.resolve(__dirname, filePath);

  const stream = fs.createReadStream(mainFilePath, {
    encoding: "utf-8",
  });

  // Handle file reading errors
  stream.on("error", (err) => {
    if (err.code === "ENOENT") {
      err.statusCode = 404;
      err.message = "Requested data was not found";
    } else {
      err.statusCode = 500;
      err.message = "Failed to read data";
    }

    next(err);
  });

  // Handle client disconnection
  res.on("close", () => {
    if (!res.writableEnded && !stream.destroyed) {
      stream.destroy();
    }
  });

  res.status(200);
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  stream.pipe(res);
};

module.exports = readStreamFunction;
