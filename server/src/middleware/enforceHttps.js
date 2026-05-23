function enforceHttps(req, res, next) {
  if (process.env.NODE_ENV !== "production") return next();

  const forwardedProto = req.get("x-forwarded-proto");
  if (forwardedProto && forwardedProto !== "https") {
    return res.redirect(301, `https://${req.get("host")}${req.originalUrl}`);
  }

  return next();
}

module.exports = { enforceHttps };
