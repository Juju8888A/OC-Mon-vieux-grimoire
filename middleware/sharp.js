const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const optimizedImage = (req, res, next) => {
  if (req.file) {
    // je remplace l'ancienne extension par l'extension .webp
    const optimizedImageName = req.file.filename.replace(/\.[^.]+$/, ".webp");
    const optimizedImagePath = path.join("images", optimizedImageName);

    sharp.cache(false);
    sharp(req.file.path)
      .resize(500, 600)
      .webp({ quality: 80 })
      .toFile(optimizedImagePath, (err) => {
        if (err) {
          return res.status(500).json({ error });
        }

        // suppression de l'image non optimisée de la base de données
        fs.unlink(req.file.path, (err) => {
          if (err) {
            return res.status(500).json({ error });
          }
        });

        req.file.filename = optimizedImageName;
        next();
      });
  } else if (!req.file) {
    next();
  }
};

module.exports = optimizedImage;
