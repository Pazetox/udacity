const fs = require("fs");
const sharp = require("sharp");
const os = require("os");
const path = require("path");

async function filterImageFromURL(inputURL) {
  try {
    const response = await fetch(inputURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const tmpDir = os.tmpdir();
    const outpath = path.join(
      tmpDir,
      `filtered.${Math.floor(Math.random() * 2000)}.jpg`
    );

    await sharp(buffer)
      .resize(256, 256)
      .grayscale()
      .jpeg({ quality: 60 })
      .toFile(outpath);

    return outpath;
  } catch (error) {
    console.log("Util error:", error);
    throw error;
  }
}

function deleteLocalFiles(files) {
  for (let file of files) {
    try {
      fs.unlinkSync(file);
    } catch (e) {
      console.log("Delete error:", e);
    }
  }
}

module.exports = {
  filterImageFromURL,
  deleteLocalFiles,
};
