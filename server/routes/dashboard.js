const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware/checkAuth.js");
const dashboardController = require("../controllers/dashboardController");

/*******
 * Dashboard Routes *
 *******/

router.get("/dashboard", isLoggedIn, dashboardController.dashboard);
router.get("/dashboard/notes/:id", isLoggedIn, dashboardController.viewNote);
router.put("/dashboard/notes/:id", isLoggedIn, dashboardController.updateNote);
router.delete("/dashboard/delete/:id",isLoggedIn, dashboardController.deleteNote);
router.get("/dashboard/add", isLoggedIn, dashboardController.addNotePage);
router.post("/dashboard/add", isLoggedIn, dashboardController.addNote);
router.get("/dashboard/search", isLoggedIn, dashboardController.searchNotePage);
router.post("/dashboard/search", isLoggedIn, dashboardController.searchNote);

module.exports = router;
