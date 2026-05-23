const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1200
    },
    source: {
      type: String,
      default: "website"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
