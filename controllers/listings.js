const Market = require("../models/market");

module.exports = {
    create
}

async function create(req, res) {
    const market = await Market.findById(req.params.id);
    market.listings.push(req.body);
    try {
        await market.save();
    } catch(err){
        console.log(err);
    }
    res.redirect(`/market/${market._id}`);
}