const { Schema, model } = require("mongoose");

// Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

const Category = model("Category", categorySchema);
module.exports = Category;
