const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema(
  {
    name: { type: String, required: true }, // Added name field
    available_date: { type: Date, required: true },
    available_start_time: { type: String, required: true },
    available_end_time: { type: String, required: true },
    img_url: { type: String }, // Added img_url field
    numSubscribers: { type: Number },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Availability = mongoose.models.Availability || mongoose.model("Availability", availabilitySchema);

module.exports = Availability;