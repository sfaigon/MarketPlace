const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    // categories - debating setup
    //rating - add later
}, {
    timestamps: true
});

module.exports = mongoose.model("Market", marketSchema);