const express = require("express");
const router = express.Router();
const storeReviewsCtrl = require("../controllers/storeReviews");
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post("/markets/:id/storeReviews", ensureLoggedIn, storeReviewsCtrl.create);

router.delete("/storeReviews/:id", ensureLoggedIn, storeReviewsCtrl.delete);
module.exports = router;