const express = require("express");
const router = express.Router();
const quranController = require("../controllers/details.controller");

router.get("/allahNames", quranController.getAllahNames);
router.get("/mohamed-names", quranController.getAllahMohamedNames);
router.get("/azkar", quranController.getAllahZkar);

module.exports = router;
