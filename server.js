const express = require("express");
const multer = require("multer");
const unzipper = require("unzipper");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Static hosting
app.use("/sites", express.static(path.join(__dirname, "public/sites")));
app.use(express.static("views")); // to serve index.html

// File upload setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("sitezip"), async (req, res) => {
  const username = req.body.username;
  const project = req.body.project;
  const zipPath = req.file.path;
  const outputDir = path.join(__dirname, "public", "sites", username, project);

  try {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: outputDir }))
      .on("close", () => {
        const deployedUrl = `/sites/${username}/${project}/index.html`;
        res.send(`✅ Your site is live at <a href="${deployedUrl}">${deployedUrl}</a>`);
      });
  } catch (err) {
    res.status(500).send("❌ Failed to deploy.");
  }
});

app.listen(PORT, () => {
  console.log(`QuickDev is Online at http://localhost:${PORT}`);
});
