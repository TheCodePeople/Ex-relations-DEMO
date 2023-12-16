const { Schema, model } = require("mongoose");

// Civil ID Schema
const membershipSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
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

const MembershipCard = model("MembershipCard", membershipSchema);
module.exports = MembershipCard;
