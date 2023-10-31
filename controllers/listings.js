const Market = require("../models/market");

module.exports = {
    create,
    delete: deleteListing
}

async function create(req, res) {
    const market = await Market.findById(req.params.id);
    market.listings.push(req.body);
    try {
        await market.save();
    } catch(err){
        console.log(err);
    }
    res.redirect(`/markets/${market._id}`);
}
function deleteListing(req, res, next){
    Market.findOne({"listings._id": req.params.id}).then(function(market){
      if(!market) return res.redirect("/markets");
      market.listings.remove(req.params.id);
      market.save().then(function(){
        res.redirect(`/markets/${market._id}`);
      }).catch(function(err){
        return next(err);
      })
    })
  }