const mongoose = require("mongoose");

const discountSchema = new Schema(
  {
    value: { type: Number, enum: ["10%", "25%", "50%"], required: true },
    isValid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
