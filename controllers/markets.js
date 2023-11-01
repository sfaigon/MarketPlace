const Market = require("../models/market");
module.exports = {
  index,
  new: newMarket,
  create,
  show,
  delete: deleteMarket,
};
async function index(req, res) {
  const markets = await Market.find({});
  res.render("markets/index", { title: "All Markets", markets });
}

async function show(req, res){
    const market = await Market.findById(req.params.id);
    res.render("markets/show", {title: `${market.name}`, market});
}

function newMarket(req, res) {
  res.render("markets/new", { title: "New Market", errorMsg: "" });
}

async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  try {
    await Market.create(req.body);
    res.redirect("/markets");
  } catch (err) {
    console.log(err);
    res.render("markets/new", { title: "New Market", errorMsg: err.message });
  }
}

function deleteMarket(req, res, next){
  Market.findOne({"market._id": req.params.id}).then(function(market){
    if(!market) return res.redirect("/markets");
    market.storeReviews.remove(req.params.id);
    market.save().then(function(){
      res.redirect(`/markets/${market._id}`);
    }).catch(function(err){
      return next(err);
    })
  })
}
