const { Schema, model } = require("mongoose");

// Customer Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Customer = model("Customer", customerSchema);
module.exports = Customer;
