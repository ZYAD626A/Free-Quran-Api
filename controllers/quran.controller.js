const readStreamFunction = require("../utils/streamJsonFile");
const { fail } = require("../utils/JsendCodes");
const path = require("path");

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
const getQuranPageImage = (req, res, next) => {
  const { style, page } = req.params;
  const pageNumber = Number(page);
  // Available image styles
  const imageStyles = {
    transparent: {
      folder: "quran_images",
      min: 1,
      max: 604,
      filename: (id) => `${id}.png`,
    },

    green: {
      folder: "quran_images_new",
      min: 3,
      max: 604,
      filename: (id) => `image_Page${id}.png`,
    },

    brown: {
      folder: "quran_images_new_2",
      min: 1,
      max: 604,
      filename: (id) => `${id}.png`,
    },
  };
  // Validate image style
  const selectedStyle = imageStyles[style];
  if (!selectedStyle) {
    return res.status(400).json(
      fail({
        message: "Invalid image style",
        availableStyles: Object.keys(imageStyles),
      }),
    );
  }

  // Validate page number
  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < selectedStyle.min ||
    pageNumber > selectedStyle.max
  ) {
    return res.status(400).json(
      fail({
        message: `Page must be between ${selectedStyle.min} and ${selectedStyle.max}`,
      }),
    );
  }
  // Build image path
  const imagePath = path.join(
    __dirname,
    "../assets",
    selectedStyle.folder,
    selectedStyle.filename(pageNumber),
  );

  // Send image
  res.sendFile(imagePath, (err) => {
    if (err) {
      if (res.headersSent) {
        return next(err);
      }

      err.statusCode = err.statusCode === 404 ? 404 : 500;
      next(err);
    }
  });
};
 
module.exports = {
  getCompleteQuran,
  getSurahMetadata,
  getSurah,
  getQuranPageImage,
 
};
