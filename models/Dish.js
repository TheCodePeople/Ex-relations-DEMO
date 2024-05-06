const { Schema, model } = require("mongoose");

const dishSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    unique: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      unique: true,
    },
  ],
});

const Dish = model("Dish", dishSchema);
module.exports = Dish;
