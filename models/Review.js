const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    unique: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    unique: true,
  },
});

const Review = model("Review", ReviewSchema);
module.exports = Review;
