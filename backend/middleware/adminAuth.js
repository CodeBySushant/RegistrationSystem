const jwt = require("jsonwebtoken");

const JWT_SECRET = "SUPER_ADMIN_SECRET";  // <== use ONE shared secret

module.exports = function (roles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;

      // role check (optional)
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient rights" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
