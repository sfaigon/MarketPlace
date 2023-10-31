const express = require("express");
const router = express.Router();
const storeReviewsCtrl = require("../controllers/storeReviews");

router.post("/markets/:id/storeReviews", storeReviewsCtrl.create);

router.delete("/storeReviews/:id", storeReviewsCtrl.delete);
module.exports = router;