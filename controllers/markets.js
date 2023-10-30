const Market = require("../models/markets");
module.exports = {
  index,
  new: newMarket,
  create,
};
async function index(req, res) {
  const markets = await Market.find({});
  res.render("markets/index", { title: "All Markets", markets });
}

function newMarket(req, res) {
  res.render("markets/new", { title: "New Market", errorMsg: "" });
}

async function create(req, res) {
  try {
    await Market.create(req.body);
  } catch (err) {
    console.log(err);
    res.render("market/new", { errorMsg: err.message });
  }
}
