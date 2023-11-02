const express = require("express");
const router = express.Router();
const listingsCtrl = require("../controllers/listings");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/markets/:id/listings", ensureLoggedIn, listingsCtrl.create);

router.get("/listings/:id/edit", ensureLoggedIn, listingsCtrl.edit);

router.delete("/listings/:id", ensureLoggedIn, listingsCtrl.delete);

router.put("/listings/:id", ensureLoggedIn, listingsCtrl.update);

router.post("/listings/:id/buyOne", ensureLoggedIn, listingsCtrl.buyOne);

module.exports = router;
