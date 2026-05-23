const bcrypt = require("bcryptjs");
const express = require("express");
const validator = require("validator");

const { authenticate } = require("../middleware/authenticate");
const User = require("../models/User");
const { signJwt } = require("../utils/tokens");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "A valid email is required" });
    }

    if (!validator.isStrongPassword(password, { minLength: 10, minSymbols: 0 })) {
      return res.status(400).json({
        message: "Password must be at least 10 characters and include uppercase, lowercase, and numbers"
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account already exists for this email" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    const token = signJwt(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Valid email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const isMatch = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      token: signJwt(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", authenticate, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;
