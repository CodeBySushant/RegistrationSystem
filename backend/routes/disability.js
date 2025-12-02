// backend/routes/disability.js
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // your mysql connection/pool

// GET /api/disability/cards?q=...&page=1&pageSize=50
router.get("/cards", (req, res) => {
  const q = (req.query.q || "").trim();
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const pageSize = Math.max(1, parseInt(req.query.pageSize || "50", 10));
  const offset = (page - 1) * pageSize;

  let where = "WHERE 1=1";
  const params = [];

  if (q) {
    // search by name or invoice (you can add more fields)
    where += " AND (name LIKE ? OR invoice LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  // total count
  const countSql = `SELECT COUNT(*) as total FROM disability_cards ${where}`;
  db.query(countSql, params, (countErr, countRows) => {
    if (countErr) {
      console.error("countErr:", countErr);
      return res.status(500).json({ error: countErr.code, message: countErr.sqlMessage || countErr.message });
    }
    const total = countRows[0]?.total || 0;

    const dataSql = `
      SELECT id,
             date,
             name,
             invoice,
             type,
             officer,
             citizenship,
             phone,
             remarks,
             status
      FROM disability_cards
      ${where}
      ORDER BY date DESC, id DESC
      LIMIT ? OFFSET ?
    `;
    const dataParams = params.concat([pageSize, offset]);
    db.query(dataSql, dataParams, (err, rows) => {
      if (err) {
        console.error("dataErr:", err);
        return res.status(500).json({ error: err.code, message: err.sqlMessage || err.message });
      }
      // rows will be an array of objects matching frontend field names
      res.json({ rows, total });
    });
  });
});

module.exports = router;
