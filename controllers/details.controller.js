const fs = require("fs/promises");
const path = require("path");

const { success, fail } = require("../utils/JsendCodes");
const readStreamFunction = require("../utils/streamJsonFile");

const getAllahNames = (req, res, next) => {
  readStreamFunction(req, res, "../assets/asma_ul_husna_detailed.json", next);
};

const getProphetNames = (req, res, next) => {
  readStreamFunction(req, res, "../assets/mohamed_names.json", next);
};

// Normalize text to make searching easier
const normalizeText = (text) => {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .trim();
};

const getAzkar = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (
      !Number.isInteger(pageNumber) ||
      !Number.isInteger(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1 ||
      limitNumber > 100
    ) {
      return res.status(400).json(
        fail({
          message:
            "Page and limit must be positive integers. Maximum limit is 100",
        }),
      );
    }
    const filePath = path.join(__dirname, "../assets/azkar.json");

    const fileContent = await fs.readFile(filePath, "utf-8");
    const azkar = JSON.parse(fileContent);

    let filteredAzkar = azkar;

    // Filter by category
    if (category) {
      const selectedCategory = normalizeText(category);

      filteredAzkar = filteredAzkar.filter((zekr) =>
        normalizeText(zekr.category).includes(selectedCategory),
      );
    }

    // Search in zekr, description, reference and category
    if (search) {
      const searchTerm = normalizeText(search);

      filteredAzkar = filteredAzkar.filter((zekr) => {
        const searchableFields = [
          zekr.zekr,
          zekr.description,
          zekr.reference,
          zekr.category,
        ];

        return searchableFields.some((field) =>
          normalizeText(field || "").includes(searchTerm),
        );
      });
    }
    const total = filteredAzkar.length;
    const totalPages = Math.ceil(total / limitNumber);
    const offset = (pageNumber - 1) * limitNumber;
    const paginatedAzkar = filteredAzkar.slice(offset, offset + limitNumber);

    return res.status(200).json(
      success({
        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1 && total > 0,
        },
        results: paginatedAzkar,
      }),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllahNames,
  getProphetNames,
  getAzkar,
};
