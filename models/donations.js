const mongoose = require("mongoose");

const donationsSchema = mongoose.Schema(
  {
    donor_name: {
      type: String,
      required: true,
      trim: true,
    },
    item_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    item_type: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    images: [{ type: Buffer }],
    isDonated: {
      type: Boolean,
      default: false,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const donations = mongoose.model("donations", donationsSchema);

module.exports = donations;
