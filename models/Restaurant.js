const { Schema, model } = require("mongoose");

// Restaurant Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Restaurant = model("Restaurant", restaurantSchema);
module.exports = Restaurant;
