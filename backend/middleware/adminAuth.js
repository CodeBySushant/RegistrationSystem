const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET;

const activeCache = new Map();

module.exports = function (roles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
      return res.status(401).json({ message: "Authorization header missing" });

    const token = header.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Token not found" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Check cache first
      const cached = activeCache.get(decoded.id);
      if (cached && cached.expiresAt > Date.now()) {
        if (!cached.isActive)
          return res.status(403).json({ message: "Account is frozen" });

        req.admin = decoded;

        if (roles.length > 0 && !roles.includes(decoded.role))
          return res.status(403).json({ message: "Forbidden: insufficient rights" });

        return next();
      }

      // Cache miss — query DB and cache for 60 seconds
      pool.query(
        "SELECT is_active FROM admins WHERE id = ?",
        [decoded.id],
        (err, rows) => {
          if (err || !rows.length)
            return res.status(401).json({ message: "Account not found" });

          activeCache.set(decoded.id, {
            isActive: rows[0].is_active,
            expiresAt: Date.now() + 60_000,
          });

          if (!rows[0].is_active)
            return res.status(403).json({ message: "Account is frozen" });

          req.admin = decoded;

          if (roles.length > 0 && !roles.includes(decoded.role))
            return res.status(403).json({ message: "Forbidden: insufficient rights" });

          next();
        }
      );
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};