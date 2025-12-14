const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminAuth = require("../middleware/adminAuth");

// SECRET KEY
const JWT_SECRET = process.env.JWT_SECRET;

// ---------------- LOGIN ----------------
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.json({ success: false, message: "DB error" });
      if (results.length === 0)
        return res.json({ success: false, message: "Invalid username" });

      const admin = results[0];

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.json({ success: false, message: "Wrong password" });

      const token = jwt.sign(
        { id: admin.id, role: admin.role.toUpperCase(), ward: admin.ward_number },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role.toUpperCase(),
          ward: admin.ward_number,
        },
      });
    }
  );
});

// ---------------- CREATE ADMIN ----------------
router.post("/create-admin", (req, res) => {
  const { name, email, phone, ward_number, position, username, password, role } =
    req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO admins (name, email, phone, ward_number, position, username, password, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [
      name,
      email,
      phone,
      ward_number,
      position,
      username,
      hashedPassword,
      role || "admin",
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Username or Email already exists",
        });
      }

      res.json({ success: true, message: "Admin created successfully" });
    }
  );
});

// -------------- GET ADMINS (superadmin only) --------------
router.get(
  "/all-admins",
  adminAuth(["SUPERADMIN"]),
  (req, res) => {
    pool.query(
      "SELECT id, name, email, phone, ward_number, position, username, role FROM admins",
      (err, results) => {
        if (err) return res.json({ success: false, message: "DB error" });
        res.json({ success: true, admins: results });
      }
    );
  }
);

// ---------------- DELETE ADMIN ----------------
router.delete(
  "/delete/:id",
  adminAuth(["SUPERADMIN"]),
  (req, res) => {
    pool.query(
      "DELETE FROM admins WHERE id = ?",
      [req.params.id],
      (err) => {
        if (err) return res.json({ success: false, message: "DB error" });
        res.json({ success: true });
      }
    );
  }
);


module.exports = router;
