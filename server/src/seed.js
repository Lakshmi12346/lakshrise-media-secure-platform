require("dotenv").config();

const { connectDatabase } = require("./config/database");
const Service = require("./models/Service");

const services = [
  {
    title: "Conversion Websites",
    description: "Next.js experiences built for speed, trust, SEO, and measurable enquiries.",
    icon: "Rocket",
    sortOrder: 1
  },
  {
    title: "Performance Media",
    description: "Paid acquisition, retargeting, campaign landing pages, and creative testing.",
    icon: "Megaphone",
    sortOrder: 2
  },
  {
    title: "Secure Growth Stack",
    description: "JWT auth, OAuth, analytics, forms, dashboards, and secure API workflows.",
    icon: "ShieldCheck",
    sortOrder: 3
  }
];

async function seed() {
  await connectDatabase();

  await Service.deleteMany({});
  await Service.insertMany(services);

  console.log("Seeded LakshRise Media services");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
