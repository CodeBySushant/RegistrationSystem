// backend/middleware/adminAuth.js
const jwt = require("jsonwebtoken");

// IMPORTANT — use SAME secret used in adminRoutes.js
const JWT_SECRET = "SUPER_SECRET_KEY";

module.exports = function (roles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded; // attach admin info to request

      // Role restriction
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient rights" });
      }

      next();
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
