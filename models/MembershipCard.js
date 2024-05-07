const { Schema, model } = require("mongoose");

// Membership Schema
const membershipSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 1,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const MembershipCard = model("MembershipCard", membershipSchema);
module.exports = MembershipCard;
