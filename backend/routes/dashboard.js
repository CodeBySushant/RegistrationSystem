// backend/routes/dashboard.js
const express = require("express");
const db = require("../config/db.js");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

const CARD_GROUPS = [
  {
    label: "व्यवसाय दर्ता",
    tables: [
      "BusinessIndustryRegistrationForm",
      "BusinessIndustryRegistrationNewList",
      "BusinessRegistrationCertificate",
    ],
  },
  {
    label: "व्यवसाय दर्ता नविकरण वाकि सूची",
    tables: ["BusinessRegistrationRenewLeft"],
  },
  {
    label: "व्यवसाय दर्ता नविकरण भइसकेको सूची",
    tables: ["BusinessRegRenewCompleted"],
  },
  {
    label: "दैनिक कार्य सम्पादन",
    tables: ["DailyWorkPerformanceList"],
  },
];

// 🔢 Count rows with ward isolation
function getCountForTable(table, role, ward_number) {
  return new Promise((resolve) => {
    let sql = `SELECT COUNT(*) AS count FROM \`${table}\``;
    const params = [];

    if (role === "ADMIN") {
      sql += " WHERE ward_number = ?";
      params.push(ward_number);
    }

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error(
          `⚠️ Error counting table ${table}:`,
          err.code || err.message
        );
        return resolve(0);
      }
      resolve(rows[0]?.count || 0);
    });
  });
}

// 🔢 Sum counts for a group of tables
async function getTotalForTables(tables, role, ward_number) {
  let total = 0;

  for (const table of tables) {
    const count = await getCountForTable(table, role, ward_number);
    total += count;
  }

  return total;
}

/**
 * Route: GET /api/dashboard-stats
 */
router.get(
  "/dashboard-stats",
  adminAuth(["ADMIN", "SUPERADMIN"]),
  async (req, res) => {
    try {
      const { role, ward_number } = req.admin;

      const cards = await Promise.all(
        CARD_GROUPS.map(async (group) => {
          const value = await getTotalForTables(
            group.tables,
            role,
            ward_number
          );
          return { label: group.label, value };
        })
      );

      res.json({ cards });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ message: "Dashboard error" });
    }
  }
);

module.exports = router;