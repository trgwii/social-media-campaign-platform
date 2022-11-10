const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobile_number: {
      type: String,
    },
    competition_entry: {
      type: Number,
      default: 1
    },
    referral_code: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("users", userSchema);
