const mongoose = require("mongoose");

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI is not set. API routes that use data persistence will fail.");
    return;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    autoIndex: process.env.NODE_ENV !== "production"
  });

  console.log("MongoDB connected");
}

module.exports = { connectDatabase };
