const Market = require("../models/market");

module.exports = {
  create,
  delete: deleteStoreReview,
  edit,
  update,
};
async function edit(req, res) {
  Market.findOne({ "storeReviews._id": req.params.id }).then(function (market) {
    if (!market) return res.redirect("/markets");
    const storeReview = market.storeReviews.id(req.params.id);  
    market.save().then(function () {
      res.render("markets/storeReviews/edit", {
        title: "Edit Store Review",
        market,
        storeReview     
      });
      })
      .catch(function (err) {
        return next(err);
      });
  });
 
}

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

async function update(req, res) {
  try {
    const market = await Market.findOne({ "storeReviews._id": req.params.id });

    if (!market) {
      return res.redirect("/markets");
    }

    const storeReview = market.storeReviews.id(req.params.id);

    if (!storeReview) {
      return res.status(404).json({ message: 'storeReview not found' });
    }

    storeReview.content = req.body.content;   
    storeReview.rating = req.body.rating;
    

    await market.save();

    res.redirect(`/markets/${market._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}