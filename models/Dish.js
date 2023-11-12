const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dishSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Dish = model("Dish", dishSchema);
module.exports = Dish;
