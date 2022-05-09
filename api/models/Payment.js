const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    // userId: { type: String, required: true },
    data: {
      type: Array,
      default: [],
    },
    user: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
