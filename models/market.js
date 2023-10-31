const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeReviewsSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    //   required: true,
    // currently working if i dont require it, dont know why
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const listingSchema = new Schema(
  {
    item: { type: String, required: true },
    price: { type: Number, min: 1, required: true },
    quantity: { type: Number, min: 1, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const marketSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    // categories - debating setup
    storeReviews: [storeReviewsSchema],
    listings: [listingSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Market", marketSchema);
