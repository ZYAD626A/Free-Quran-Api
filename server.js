require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const corsOptions = require("./utils/corsOptions");
const helmetOptions = require("./utils/helmetOptions");
const PORT = process.env.PORT || 5000;

app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(logger);
app.get("/healthz", require("./routes/healthz.route"));
app.use("/islam/api", limiter);
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
