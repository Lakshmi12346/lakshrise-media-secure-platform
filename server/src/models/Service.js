const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 90
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 240
    },
    icon: {
      type: String,
      default: "Rocket"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Service || mongoose.model("Service", serviceSchema);
