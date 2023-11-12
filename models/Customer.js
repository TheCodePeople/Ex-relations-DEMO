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
  membership: { type: boolean, default: false },
  civilId: {
    type: Schema.Types.ObjectId,
    ref: "CivilId",
    unique: true,
  },
});

const Customer = model("Customer", customerSchema);
module.exports = Customer;
