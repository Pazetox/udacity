const express = require("express");
const bodyParser = require("body-parser");
const { filterImageFromURL, deleteLocalFiles } = require("./util/util");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get("/filteredimage", async (req, res) => {
  const imageUrl = req.query.image_url;

  if (!imageUrl) {
    return res.status(400).send({ message: "image_url is required" });
  }

  try {
    const filteredPath = await filterImageFromURL(imageUrl);
    return res.status(200).sendFile(filteredPath, () => {
      deleteLocalFiles([filteredPath]);
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(422).send({ message: "Unable to process image" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
