const express = require("express");
const validator = require("validator");

const { authenticate } = require("../middleware/authenticate");
const Lead = require("../models/Lead");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "A valid email is required" });
    }

    const lead = await Lead.create({
      name: validator.escape(name),
      email: email.toLowerCase(),
      company: company ? validator.escape(company) : "",
      message: validator.escape(message)
    });

    return res.status(201).json({
      message: "Lead received",
      leadId: lead._id
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const leads = await Lead.find().sort({ createdAt: -1 }).limit(50);
    return res.json({ leads });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
