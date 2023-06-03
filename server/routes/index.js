const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

/*******
 * App Routes *
 *******/

router.get("/", mainController.home);
router.get("/features", mainController.features);
router.get("/faqs", mainController.faqs);
router.get("/about", mainController.about);

module.exports = router;
