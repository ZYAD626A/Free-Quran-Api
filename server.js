require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const PORT = process.env.PORT || 5000;
// app.use(express.json())
app.use(cors());
app.use(logger);
app.use("/islam/api/quran", require("./routes/quran.route"));
app.use("/islam/api/details", require("./routes/details.route"));
app.use((req, res, next) => {
  const err = new Error(`Route Not Found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);
app.listen(PORT, () => {
  // console.log(`بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم\nListen on port: ${PORT}`);
  console.log(`Server is runnig at port ${PORT}`);
});
