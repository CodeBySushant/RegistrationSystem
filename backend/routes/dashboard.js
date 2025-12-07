// backend/routes/dashboard.js
const express = require("express");
const db = require("../config/db.js");

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
    label: "व्यवसाय नविकरण गर्न बाँकी",
    tables: ["BusinessRegistrationRenewLeft"],
  },
  {
    label: "व्यवसाय नविकरण भइसकेको",
    tables: ["BusinessRegRenewCompleted"],
  },
  {
    label: "दैनिक कार्य सम्पादन",
    tables: ["DailyWorkPerformanceList"], 
  },
];

/**
 * Helper – safely sum COUNT(*) from multiple tables.
 * If a table is missing or errors, we log it and continue.
 */
async function getTotalForTables(tables) {
  let total = 0;

  for (const table of tables) {
    try {
      const [rows] = await db.execute(
        `SELECT COUNT(*) AS count FROM \`${table}\``
      );
      total += rows[0]?.count || 0;
    } catch (err) {
      console.error(`⚠️ Error counting table ${table}:`, err.code || err.message);
      // continue with other tables instead of crashing
    }
  }

  return total;
}

/**
 * Route: GET /api/dashboard-stats
 */
router.get("/dashboard-stats", async (req, res) => {
  try {
    const cards = await Promise.all(
      CARD_GROUPS.map(async (group) => {
        const value = await getTotalForTables(group.tables);
        return { label: group.label, value };
      })
    );

    const yearlyStats = cards.map((c) => ({
      label: c.label,
      value: c.value,
    }));

    res.json({ cards, yearlyStats });
  } catch (error) {
    console.error("Error loading dashboard stats:", error);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
