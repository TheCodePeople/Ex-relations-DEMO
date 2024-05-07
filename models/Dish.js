const { Schema, model } = require("mongoose");

const dishSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Dish = model("Dish", dishSchema);
module.exports = Dish;
