const express = require("express");
const router = express.Router();

router.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
  });
});

module.exports = router;
