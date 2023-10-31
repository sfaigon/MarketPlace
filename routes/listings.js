const express =require("express");
const router = express.Router();
const listingsCtrl = require("../controllers/listings");

router.post("/markets/:id/listings", listingsCtrl.create);

router.delete("/listings/:id", listingsCtrl.delete);
module.exports = router;