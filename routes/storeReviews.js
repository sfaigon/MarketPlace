const express = require("express");
const router = express.Router();
const storeReviewsCtrl = require("../controllers/storeReviews");
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post("/markets/:id/storeReviews", ensureLoggedIn, storeReviewsCtrl.create);

router.get("/storeReviews/:id/edit", ensureLoggedIn, storeReviewsCtrl.edit);

router.delete("/storeReviews/:id", ensureLoggedIn, storeReviewsCtrl.delete);

router.put("/storeReviews/:id", ensureLoggedIn, storeReviewsCtrl.update);

module.exports = router;