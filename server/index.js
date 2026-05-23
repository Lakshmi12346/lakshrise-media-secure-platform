require("dotenv").config();

const app = require("./src/app");
const { connectDatabase } = require("./src/config/database");

const port = process.env.PORT || 5000;

async function boot() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`LakshRise Media API running on port ${port}`);
  });
}

boot().catch((error) => {
  console.error("API failed to start", error);
  process.exit(1);
});
