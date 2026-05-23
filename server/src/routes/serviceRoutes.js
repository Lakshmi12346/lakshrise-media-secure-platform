const express = require("express");

const Service = require("../models/Service");

const router = express.Router();

const defaults = [
  {
    title: "Conversion Websites",
    description: "Next.js experiences built for speed, trust, SEO, and measurable enquiries.",
    icon: "Rocket"
  },
  {
    title: "Performance Media",
    description: "Paid acquisition, retargeting, campaign landing pages, and creative testing.",
    icon: "Megaphone"
  },
  {
    title: "Secure Growth Stack",
    description: "JWT auth, OAuth, analytics, forms, dashboards, and secure API workflows.",
    icon: "ShieldCheck"
  }
];

router.get("/", async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 });
    return res.json({ services: services.length ? services : defaults });
  } catch (error) {
    if (error.name === "MongooseError" || error.name === "MongoServerSelectionError") {
      return res.json({ services: defaults });
    }

    return next(error);
  }
});

module.exports = router;
