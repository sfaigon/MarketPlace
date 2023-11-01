const express =require("express");
const router = express.Router();
const listingsCtrl = require("../controllers/listings");
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post("/markets/:id/listings",ensureLoggedIn, listingsCtrl.create);

router.get("/listings/:id/edit", ensureLoggedIn, listingsCtrl.edit);

router.delete("/listings/:id",ensureLoggedIn, listingsCtrl.delete);

module.exports = router;