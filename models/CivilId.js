const { Schema, model } = require("mongoose");

// Civil ID Schema
const civilIdSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    unique: true,
  },
});

const CivilId = model("CivilId", civilIdSchema);
module.exports = CivilId;
