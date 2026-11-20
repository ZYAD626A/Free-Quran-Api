const express = require("express");
const router = express.Router();

const detailsController = require("../controllers/details.controller");

router.get("/allah-names", detailsController.getAllahNames);
router.get("/prophet-names", detailsController.getProphetNames);
router.get("/azkar", detailsController.getAzkar);

module.exports = router;