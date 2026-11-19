const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const folders = [
  "quran_images",
  "quran_images_new",
  "quran_images_new_2",
];

async function checkImages() {
  for (const folder of folders) {
    const folderPath = path.join(__dirname, folder);

    const files = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));

    const imagePath = path.join(folderPath, files[0]);
    const metadata = await sharp(imagePath).metadata();

    console.log({
      folder,
      count: files.length,
      sample: files[0],
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      hasAlpha: metadata.hasAlpha,
    });
  }
}

checkImages();