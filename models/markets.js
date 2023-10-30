const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    item: { type: String, required: true },
    price: { type: Number, min : 1, required: true},
    quantity: {type: Number, min: 1, required: true},
}, {
    timestamps: true
})

const marketSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    // categories - debating setup
    //rating - add later
    listings: [listingSchema],
}, {
    timestamps: true
});


module.exports = mongoose.model("Market", marketSchema);