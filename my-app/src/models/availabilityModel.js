const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema(
  {
    available_date: { type: Date, required: true },
    available_start_time: { type: String, required: true },
    available_end_time: { type: String, required: true },
    price: { type: Number },
    numSubcribers: { type: Number },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const availability = mongoose.model("Availability", availabilitySchema);

module.exports = availability;
