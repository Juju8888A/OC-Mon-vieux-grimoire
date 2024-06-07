const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/controllers_books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp");

router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRatings);
router.get("/:id", bookCtrl.getOneBook);
router.post("/:id/rating", auth, bookCtrl.ratingABook);
router.post("/", auth, multer, sharp, bookCtrl.createBook);
router.put("/:id", auth, multer, sharp, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
