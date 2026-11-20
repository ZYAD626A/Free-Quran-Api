const logger = (req, res, next) => {
  const start = Date.now();
  const date = new Date().toISOString();

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      `${date} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${duration}ms`,
    );
  });

  next();
};

module.exports = logger;
