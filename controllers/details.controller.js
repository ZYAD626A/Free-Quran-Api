const readStreamFunction = require("../utils/streamJsonFile");

const getAllahNames = (req, res, next) => {
  readStreamFunction(req, res, "../assets/asma_ul_husna_detailed.json", next);
};

const getAllahMohamedNames = (req, res, next) => {
  readStreamFunction(req, res, "../assets/mohamed_names.json", next);
};

const getAllahZkar = (req, res, next) => {
  readStreamFunction(req, res, "../assets/azkar.json", next);
};

module.exports = {
  getAllahNames,
  getAllahZkar,
  getAllahMohamedNames,
};
