const express = require("express");
const router = express.Router();
const quranController = require("../controllers/quran.controller");

 
router.get("/images/:style/:page", quranController.getQuranPageImage);
router.get("/quran-completed", quranController.getCompleteQuran);
router.get("/surah-metadata", quranController.getSurahMetadata);
router.get("/surah/:surahId", quranController.getSurah);

module.exports = router;
