const Market = require("../models/market");

module.exports = {
  create,
  delete: deleteListing,
  edit,
  update,
};

async function edit(req, res) {
  Market.findOne({ "listings._id": req.params.id }).then(function (market) {
    if (!market) return res.redirect("/markets");
    const listing = market.listings.id(req.params.id);  
    market.save().then(function () {
      res.render("markets/listings/edit", {
        title: "Edit Listing",
        market,
        listing     
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
  market.listings.push(req.body);
  try {
    await market.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/markets/${market._id}`);
}
function deleteListing(req, res, next) {
  Market.findOne({ "listings._id": req.params.id }).then(function (market) {
    //market is the listing object
    if (!market) return res.redirect("/markets");
    market.listings.remove(req.params.id);
    market.save().then(function () {
        res.redirect(`/markets/${market._id}`);
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

async function update(req, res) {
  try {
    const market = await Market.findOne({ "listings._id": req.params.id });

    if (!market) {
      return res.redirect("/markets");
    }

    const listing = market.listings.id(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.item = req.body.item;   
    listing.price = req.body.price;
    listing.quantity = req.body.quantity;
    listing.description = req.body.description;
    listing.itemImg = req.body.itemImg;


    await market.save();

    res.redirect(`/markets/${market._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
