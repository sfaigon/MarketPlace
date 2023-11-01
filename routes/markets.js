var express = require('express');
var router = express.Router();
const marketsCtrl = require("../controllers/markets");
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
router.get('/', marketsCtrl.index);
router.get('/new', marketsCtrl.new);
router.get("/:id", marketsCtrl.show);
router.post('/', ensureLoggedIn, marketsCtrl.create);

module.exports = router;
