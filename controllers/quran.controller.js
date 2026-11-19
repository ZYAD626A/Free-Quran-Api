const readStreamFunction = require("../utils/streamJsonFile");
const { fail } = require("../utils/JsendCodes");

const getCompleteQuran = (req, res, next) => {
  readStreamFunction(req, res, "../assets/quran-complete.json", next);
};

const getSurahMetadata = (req, res, next) => {
  readStreamFunction(req, res, "../assets/surahs_metadata.json", next);
};

const getSurah = (req, res, next) => {
  const { surahId } = req.params;
  const id = Number(surahId);

  if (!Number.isInteger(id) || id < 1 || id > 114) {
    return res.status(400).json(
      fail({
        message: "Surah ID must be an integer between 1 and 114",
      }),
    );
  }

  readStreamFunction(req, res, `../assets/surahs/${id}.json`, next);
};

module.exports = {
  getCompleteQuran,
  getSurahMetadata,
  getSurah,
};
