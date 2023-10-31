const Market = require("../models/market");

module.exports = {
  create,
  delete: deleteStoreReview,
};

async function create(req, res) {
  const market = await Market.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  market.storeReviews.push(req.body);
  try {
    await market.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/markets/${market._id}`);
}

function deleteStoreReview(req, res, next){
  Market.findOne({"storeReviews._id": req.params.id}).then(function(market){
    if(!market) return res.redirect("/markets");
    market.storeReviews.remove(req.params.id);
    market.save().then(function(){
      res.redirect(`/markets/${market._id}`);
    }).catch(function(err){
      return next(err);
    })
  })
}
