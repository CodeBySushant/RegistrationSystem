// backend/routes/reports.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const adminAuth = require("../middleware/adminAuth");

// GET /api/reports/cards?from=...&to=...&category=...&subCategory=...&selectAll=1
router.get(
  "/cards",
  adminAuth(["ADMIN", "SUPERADMIN"]),
  (req, res) => {
    const { from, to, category, subCategory, selectAll } = req.query;

    let where = "WHERE 1=1";
    const params = [];

    const { role, ward_number } = req.admin;

    // 🔐 Ward isolation
    if (role === "ADMIN") {
      where += " AND ward_number = ?";
      params.push(ward_number);
    }

    // 🔍 Filters
    if (from) {
      where += " AND created_at >= ?";
      params.push(from);
    }
    if (to) {
      where += " AND created_at <= ?";
      params.push(to);
    }
    if (category) {
      where += " AND category = ?";
      params.push(category);
    }
    if (!selectAll && subCategory) {
      where += " AND sub_category = ?";
      params.push(subCategory);
    }

    const sql = `
      SELECT id,
             category,
             sub_category,
             DATE_FORMAT(created_at, '%Y-%m-%d') AS date,
             summary,
             description
      FROM submissions
      ${where}
      ORDER BY created_at DESC
      LIMIT 1000
    `;

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error("report query error:", err);
        return res.status(500).json({
          error: err.code,
          message: err.sqlMessage || err.message,
        });
      }

      res.json(rows);
    });
  }
);

module.exports = router;
