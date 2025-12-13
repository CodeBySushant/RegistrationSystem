const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/adminAuth");

// ---------------------- ADMIN LOGIN ----------------------
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    async (err, rows) => {
      if (err) return res.status(500).json({ error: err });

      if (rows.length === 0)
        return res.status(400).json({ message: "Invalid username" });

      const admin = rows[0];

      const match = await bcrypt.compare(password, admin.password);
      if (!match)
        return res.status(400).json({ message: "Incorrect password" });

      // Generate JWT
      const token = jwt.sign(
        {
          id: admin.id,
          role: admin.role,
          ward_number: admin.ward_number,
        },
        "SECRET_KEY",
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
          ward_number: admin.ward_number,
          role: admin.role,
        },
      });
    }
  );
});

// ---------------------- CREATE ADMIN (SUPERADMIN ONLY) ----------------------
router.post("/create", adminAuth(["superadmin"]), async (req, res) => {
  const { name, email, phone, ward_number, position, username, password, role } =
    req.body;

  const hashed = await bcrypt.hash(password, 10);

  pool.query(
    `INSERT INTO admins (name, email, phone, ward_number, position, username, password, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, ward_number, position, username, hashed, role],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ success: true, message: "Admin created successfully!" });
    }
  );
});

// ---------------------- LIST ADMINS (SUPERADMIN ONLY) ----------------------
router.get("/list", adminAuth(["superadmin"]), (req, res) => {
  pool.query(
    "SELECT id, name, email, phone, ward_number, position, role FROM admins",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });

      res.json(rows);
    }
  );
});

// ---------------------- DELETE ADMIN ----------------------
router.delete("/delete/:id", adminAuth(["superadmin"]), (req, res) => {
  pool.query("DELETE FROM admins WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ success: true });
  });
});

// ---------------------- UPDATE ADMIN ----------------------
router.put("/update/:id", adminAuth(["superadmin"]), (req, res) => {
  const { name, email, phone, ward_number, position } = req.body;

  pool.query(
    `UPDATE admins SET 
      name=?, email=?, phone=?, ward_number=?, position=? 
      WHERE id=?`,
    [name, email, phone, ward_number, position, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ success: true });
    }
  );
});

module.exports = router;
