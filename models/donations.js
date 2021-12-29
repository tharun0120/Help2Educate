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
    images: [Buffer],
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

// donationsSchema.methods.toJSON = function () {
//   const donation = this;
//   const donationObject = donation.toObject();

//   delete donationObject.images;

//   return donationObject;
// };

const donations = mongoose.model("donations", donationsSchema);

module.exports = donations;
