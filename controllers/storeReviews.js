const Market = require("../models/market");

module.exports = {
  create,
};

async function create(req, res) {
  const market = await Market.findById(req.params.id);
  market.storeReviews.push(req.body);
  try {
    await market.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/markets/${market._id}`);
}
