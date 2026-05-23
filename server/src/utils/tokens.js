const jwt = require("jsonwebtoken");

function signJwt(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      issuer: "lakshrise-media"
    }
  );
}

module.exports = { signJwt };
