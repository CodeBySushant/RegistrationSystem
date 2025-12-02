// backend/routes/reports.js
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // your mysql pool/connection

// GET /api/reports/category?from=...&to=...&category=...&subCategory=...&selectAll=1
router.get("/category", (req, res) => {
  const { from, to, category, subCategory, selectAll } = req.query;

  // Basic SQL: adapt table/column names to your schema
  let sql = `SELECT id, category, sub_category, DATE_FORMAT(created_at, '%Y-%m-%d') AS date, summary, description
             FROM submissions
             WHERE 1=1`;
  const params = [];

  if (from) {
    sql += ` AND created_at >= ?`;
    params.push(from);
  }
  if (to) {
    sql += ` AND created_at <= ?`;
    params.push(to);
  }
  if (category) {
    sql += ` AND category = ?`;
    params.push(category);
  }
  if (!selectAll && subCategory) {
    sql += ` AND sub_category = ?`;
    params.push(subCategory);
  }
  sql += ` ORDER BY created_at DESC LIMIT 1000`; // limit to avoid huge responses

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("report query error:", err);
      return res.status(500).json({ error: err.code, message: err.sqlMessage || err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
