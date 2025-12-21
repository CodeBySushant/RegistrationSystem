// backend/routes/certificates.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const adminAuth = require("../middleware/adminAuth");

// GET /api/certificates/cards?from=...&to=...&name=...&type=...&cardNo=...&page=1&pageSize=10
router.get(
  "/cards",
  adminAuth(["ADMIN", "SUPERADMIN"]),
  (req, res) => {
    const { from, to, name, type, cardNo } = req.query;
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const pageSize = Math.max(1, parseInt(req.query.pageSize || "10", 10));
    const offset = (page - 1) * pageSize;

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
      where += " AND renew_date >= ?";
      params.push(from);
    }
    if (to) {
      where += " AND renew_date <= ?";
      params.push(to);
    }
    if (name) {
      where += " AND name LIKE ?";
      params.push(`%${name}%`);
    }
    if (type) {
      where += " AND type = ?";
      params.push(type);
    }
    if (cardNo) {
      where += " AND card_no = ?";
      params.push(cardNo);
    }

    // total count
    const countSql = `SELECT COUNT(*) as total FROM certificate_renewals ${where}`;
    db.query(countSql, params, (cErr, cRows) => {
      if (cErr) {
        console.error("count err", cErr);
        return res.status(500).json({
          error: cErr.code,
          message: cErr.sqlMessage || cErr.message,
        });
      }

      const total = cRows[0]?.total || 0;

      // data query
      const dataSql = `
        SELECT id,
               sn,
               renew_date AS renewDate,
               name,
               type,
               district,
               address,
               phone,
               card_no AS cardNo,
               issue_date AS issueDate,
               officer
        FROM certificate_renewals
        ${where}
        ORDER BY renew_date DESC, id DESC
        LIMIT ? OFFSET ?
      `;

      const dataParams = params.concat([pageSize, offset]);

      db.query(dataSql, dataParams, (err, rows) => {
        if (err) {
          console.error("data err", err);
          return res.status(500).json({
            error: err.code,
            message: err.sqlMessage || err.message,
          });
        }

        const mapped = rows.map((r) => ({
          id: r.id,
          sn: r.sn,
          renewDate: r.renewDate,
          name: r.name,
          type: r.type,
          district: r.district,
          address: r.address,
          phone: r.phone,
          cardNo: r.cardNo,
          issueDate: r.issueDate,
          officer: r.officer,
        }));

        res.json({ rows: mapped, total });
      });
    });
  }
);

module.exports = router;
