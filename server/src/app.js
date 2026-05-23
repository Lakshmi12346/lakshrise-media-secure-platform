const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrf = require("csurf");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");

const { authLimiter, contactLimiter } = require("./middleware/rateLimiters");
const { enforceHttps } = require("./middleware/enforceHttps");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const securityRoutes = require("./routes/securityRoutes");

const app = express();
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production"
  }
});

app.set("trust proxy", 1);
app.use(enforceHttps);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", process.env.CLIENT_URL || "http://localhost:3000"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  })
);
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "lakshrise-media-api",
    environment: process.env.NODE_ENV || "development"
  });
});

app.use("/api/security", csrfProtection, securityRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/leads", contactLimiter, csrfProtection, leadRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  if (error.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  console.error(error);
  return res.status(error.status || 500).json({
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message
  });
});

module.exports = app;
