const Market = require("../models/market");

module.exports = {
  create,
  delete: deleteListing,
  edit,
};
// function show (req, res){
//   Market.findOne({ "listings._id": req.params.id }).then(function (market) {
//   const listing = market;
//   });
//   res.render("markets/listings/edit",{title: "Edit Listing", listing});
// }
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

  // try {
  //   const market = await Market.findById(req.params.id);
  //   const listing = market.listings.id(req.params.listing.id);

  //   // Check if the listing exists
  //   if (!listing) {
  //     return res.status(404).json({ message: 'Listing not found' });
  //   }

  //   res.render("markets/listings/edit", {
  //     title: "Edit Listing",
  //     market,
  //     listing
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
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
