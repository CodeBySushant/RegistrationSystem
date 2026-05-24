// backend/routes/dashboard.js
const express = require("express");
const db = require("../config/db.js");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// ── Correct column names matching actual DB schema ──
const WARD_COLUMN_MAP = {
  BusinessIndustryRegistrationForm:    "ward_no",  // schema: ward_no ✓
  BusinessIndustryRegistrationNewList: null,        // no ward column
  BusinessRegistrationCertificate:     "wardNo",   // schema: wardNo ✓ (was wrong before)
  BusinessRegistrationRenewLeft:       null,
  BusinessRegRenewCompleted:           null,
  DailyWorkPerformanceList:            null,
};

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

// ── Yearly stats tables — these exist and have created_at ──
const YEARLY_TABLES = [
  { label: "व्यवसाय दर्ता",        table: "BusinessIndustryRegistrationForm" },
  { label: "नागरिकता",             table: "citizenship_certificate_recommendations" },
  { label: "घर / जग्गा",           table: "boundary_recommendations" },
  { label: "सामाजिक सुरक्षा",      table: "social_security_allowance_recommendation" },
  { label: "वृद्ध भत्ता",           table: "AllowanceForm" },
  { label: "सहकारी संस्था",        table: "gov_organization_registration" },
  { label: "भौतिक निर्माण",        table: "tap_installation_recommendation" },
  { label: "English Format",       table: "address_verification" },
];

// ── Count rows with optional ward isolation ──
function getCountForTable(table, role, ward_number) {
  return new Promise((resolve) => {
    let sql = `SELECT COUNT(*) AS count FROM \`${table}\``;
    const params = [];

    const wardColumn = WARD_COLUMN_MAP[table];
    if (role === "ADMIN" && wardColumn) {
      sql += ` WHERE \`${wardColumn}\` = ?`;
      params.push(ward_number);
    }

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error(`⚠️ Error counting table ${table}:`, err.code || err.message);
        return resolve(0);
      }
      resolve(rows[0]?.count || 0);
    });
  });
}

// ── Sum counts for a group of tables ──
async function getTotalForTables(tables, role, ward_number) {
  let total = 0;
  for (const table of tables) {
    const count = await getCountForTable(table, role, ward_number);
    total += count;
  }
  return total;
}

// ── Count yearly rows for a single table ──
function getYearlyCount(table) {
  return new Promise((resolve) => {
    const sql = `
      SELECT COUNT(*) AS count 
      FROM \`${table}\` 
      WHERE YEAR(created_at) = YEAR(CURDATE())
    `;
    db.query(sql, [], (err, rows) => {
      if (err) {
        console.error(`⚠️ Yearly count error for ${table}:`, err.code || err.message);
        return resolve(0);
      }
      resolve(rows[0]?.count || 0);
    });
  });
}

// ────────────────────────────────────────────────────────────────
// GET /api/dashboard-stats
// ────────────────────────────────────────────────────────────────
router.get(
  "/dashboard-stats",
  adminAuth(["ADMIN", "SUPERADMIN"]),
  async (req, res) => {
    try {
      const { role, ward_number } = req.admin;

      // Cards
      const cards = await Promise.all(
        CARD_GROUPS.map(async (group) => {
          const value = await getTotalForTables(group.tables, role, ward_number);
          return { label: group.label, value };
        })
      );

      // Yearly stats
      const yearlyStats = await Promise.all(
        YEARLY_TABLES.map(async ({ label, table }) => {
          const value = await getYearlyCount(table);
          return { label, value };
        })
      );

      res.json({ cards, yearlyStats });

    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ message: "Dashboard error" });
    }
  }
);

// ────────────────────────────────────────────────────────────────
// GET /api/daily-submissions
// ────────────────────────────────────────────────────────────────
router.get(
  "/daily-submissions",
  adminAuth(["ADMIN", "SUPERADMIN"]),
  (req, res) => {
    const { role, ward_number } = req.admin;
    const dateFilter = req.query.date || null;
    const wardFilter = req.query.ward || null;

    let sql = `
      SELECT 
        id,
        form_key,
        category,
        sub_category,
        summary,
        description,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
      FROM submissions
      WHERE 1=1
    `;
    const params = [];

    if (role === "ADMIN") {
      sql += ` AND JSON_UNQUOTE(JSON_EXTRACT(description, '$.ward')) = ?`;
      params.push(String(ward_number));
    }

    if (dateFilter) {
      sql += ` AND DATE(created_at) = ?`;
      params.push(dateFilter);
    } else {
      sql += ` AND DATE(created_at) = CURDATE()`;
    }

    if (role === "SUPERADMIN" && wardFilter) {
      sql += ` AND JSON_UNQUOTE(JSON_EXTRACT(description, '$.ward')) = ?`;
      params.push(String(wardFilter));
    }

    sql += ` ORDER BY created_at DESC LIMIT 500`;

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error("daily-submissions error:", err);
        return res.status(500).json({ error: err.code, message: err.sqlMessage });
      }
      res.json(rows);
    });
  }
);

// ────────────────────────────────────────────────────────────────
// GET /api/admin-dashboard/category-counts
// ────────────────────────────────────────────────────────────────
router.get(
  "/admin-dashboard/category-counts",
  adminAuth(["SUPERADMIN", "ADMIN"]),
  async (req, res) => {

    const CATEGORY_TABLES = {
      "Social & Family": [
        "behavior_recommendations",
        "beneficiary_allowance_transfers",
        "birth_settlement_recommendations",
        "birth_verifications_nepali",
        "demised_heir_recommendations",
        "demised_security_allowance_to_heir",
        "destitute_recommendations",
        "disability_identity_card_recommendations",
        "disable_identity_card_renew",
        "electricity_connection_recommendation",
        "ethnic_identity_recommendation",
        "free_health_insurance_requests",
        "income_source_certifications",
        "internal_migration_recommendation",
        "jestha_nagarik_sifaris_wada",
        "marriage_certificate",
        "minor_identity_card",
        "minor_identity_card_recommendation",
        "birth_verification",
        "no_second_marriage_recommendation",
        "old_age_allowance_applications",
        "permanent_residence_recommendation",
        "relationship_verification_form",
        "relation_temporary_residence",
        "social_security_allowance_recommendation",
        "temporary_residence_recommendation",
        "three_generation_certificate",
        "tribal_recommendation",
        "unmarried_verification_form",
      ],
      "Citizenship": [
        "citizenship_angkrits",
        "citizenship_certificate_recommendations",
        "citizenship_certificate_copies",
        "citizenship_mujulkas",
        "citizenship_proof_copy_requests",
        "citizenship_recommendations",
        "citizenship_recommendation_husband_details",
        "sthalagat_sarjimin_mujulkas",
        "CitizenshipWithHusbandSurname",
        "CitizenshipWithoutHusbandSurname",
      ],
      "Business & Industry": [
        "BusinessRegistration",
        "BusinessDeregistration",
        "BusinessIndustryRegistrationForm",
        "BusinessIndustryRegistrationNewList",
        "BusinessRegistrationCertificate",
        "BusinessRegistrationRenewLeft",
        "BusinessRegRenewCompleted",
        "BusinessClosed",
        "BusinessExtensionPannumber",
        "BusinessRegSummary",
        "industry_change",
        "IndustryClosedNotify",
        "IndustryFormCancellation",
        "IndustryPeriodSummary",
        "IndustryRegistrationRecommendation",
        "IndustryTransferAcceptanceLetter",
        "IndustryTransferAcceptanceReq",
        "NewBusinessPannumber",
        "PartnershipRegistrationApplicationForm",
        "ShopAgriculturalForm",
        "ShopRegistrationForm",
        "TaxClearanceCertificate",
      ],
      "House & Land": [
        "boundary_recommendations",
        "char_killa_reloaded",
        "ghar_kayam_new_format",
        "governmental_land_utilization_recommendation",
        "house_construction_completed_certificate",
        "house_destroyed_recommendation",
        "house_maintain_recommendation",
        "house_road_verification",
        "house_verification_recommendation",
        "kitta_kat_recommendation",
        "land_classification_recommendation",
        "land_consolidation_recommendation",
        "onsite_inspection_recommendation",
        "partial_house_construction_completed_certificate",
        "peski_anurodh_sifaris",
        "property_owner_certificate_copy_recommendation",
        "property_owner_certificate_house_maintain_recommendation",
        "property_ownership_transfer_kitani",
        "property_ownership_transfer_recommendation",
        "property_verification_recommendation",
        "bhawan_nirman_sampanna",
        "LandBoundaryVerification",
      ],
      "Association & Organization": [
        "BulkLoanRecommendation",
        "ClubRegistration",
        "CommitteeRegistration",
        "NewBankAccountRecommendation",
        "NewOrganizationRegistration",
        "NonProfitOrgRegCertificate",
        "OldNonProfitOrgCertificate",
        "OrganizationRegistered",
        "OrganizationRegistrationPunishment",
        "OrganizationRegistrationRecommendation",
        "OrganizationRenewRecommendation",
        "SocialOrganizationRenew",
        "gov_organization_registration",
        "gov_organization_registration_rejected",
      ],
      "English Format": [
        "address_verification",
        "annual_income_certificate",
        "birthdate_verification",
        "certificate_of_occupation",
        "digital_verification",
        "economic_status",
        "marriage_certificate_english",
        "occupation_verification",
        "power_of_attorney",
        "property_valuation_report",
        "relationship_verification",
        "same_person_certificate",
        "scholarship_verification",
        "tax_clear_basic",
        "tax_clearance_certificate",
        "unmarried_verification",
        "address_verification_new",
        "annual_income_verification_new",
        "birth_certificate_new",
        "occupation_verification_new",
        "surname_verification_after_marriage",
        "surname_verification_certificate_new",
        "tax_clearance_new_format",
        "verify_revised_emblem",
        "passport_recommendations",
      ],
      "Physical Development": [
        "electricity_capacity_increase",
        "electricity_installation",
        "electricity_installation_recommendation",
        "free_electricity_connection_recommendation",
        "irrigation_electric_meter_installation_recommendation",
        "land_kittakat_for_road",
        "road_excavation_approval",
        "road_maintain_recommendation",
        "tap_installation_recommendation",
      ],
      "Animal Husbandry": [
        "DomesticAnimalInsuranceClaimRecommendation",
        "DomesticAnimalMaternityNutritionAllowance",
      ],
      "Economic": [
        "AdvancePaymentRequest",
        "BankAccountForSocialSecurity",
        "FixedAssetValuation",
        "lekha_parikshyan",
        "new_beneficiary_account",
        "req_for_help_in_health",
        "social_security_payment_closure",
        "social_security_via_guardian",
        "WorkPlanningCompleted",
      ],
      "Official & Planning": [
        "acting_ward_officer_assigned_records",
        "inter_local_transfer_recommendations",
        "ramana_patras",
        "notice_details",
        "agreement_of_plan",
        "withdrawal_fund_recommendation",
        "open_format_documents",
        "open_applications",
        "open_format_tippani",
        "partial_information",
        "nepali_language_recommendations",
        "DailyWorkPerformanceList",
        "AllowanceForm",
        "IndigenousNationalityCertification",
        "KhasAryaCasteCertification",
        "DalitCasteCertification",
        "ImpoverishedCitizenApplicationRecommendation",
        "TribalVerificationRecommendation",
        "RequestForCertification",
        "RequestForCertificationMotherFather",
        "BackwardCommunityRecommendation",
        "NewClassRecommendation",
        "ScholarshipRecommendation",
        "consumer_committee_registrations",
        "dclass_construction_business_licenses",
        "drinking_water_committees",
        "farmer_group_committees",
        "passbook_construction_works",
        "different_dob_certification",
        "different_english_spelling_certification",
        "different_name_certification",
        "leave_request_application",
      ],
    };

    async function countTable(table) {
      return new Promise((resolve) => {
        db.query(
          `SELECT COUNT(*) AS count FROM \`${table}\``,
          [],
          (err, rows) => {
            if (err) return resolve(0);
            resolve(rows[0]?.count || 0);
          }
        );
      });
    }

    try {
      const results = {};
      let grandTotal = 0;

      for (const [category, tables] of Object.entries(CATEGORY_TABLES)) {
        let catTotal = 0;
        for (const table of tables) {
          catTotal += await countTable(table);
        }
        results[category] = catTotal;
        grandTotal += catTotal;
      }

      res.json({ categories: results, grandTotal });
    } catch (err) {
      console.error("Admin dashboard error:", err);
      res.status(500).json({ error: "Dashboard error" });
    }
  }
);

// ────────────────────────────────────────────────────────────────
// GET /api/admin-dashboard/ward-counts
// ────────────────────────────────────────────────────────────────
router.get(
  "/admin-dashboard/ward-counts",
  adminAuth(["SUPERADMIN"]),
  (req, res) => {
    const sql = `
      SELECT ward_number, COUNT(*) as count FROM (
        SELECT ward     AS ward_number FROM AllowanceForm                   WHERE ward     IS NOT NULL
        UNION ALL
        SELECT ward_no  AS ward_number FROM BusinessIndustryRegistrationForm WHERE ward_no  IS NOT NULL
        UNION ALL
        SELECT wardNo   AS ward_number FROM BusinessRegistrationCertificate  WHERE wardNo   IS NOT NULL
      ) t
      GROUP BY ward_number
      ORDER BY count DESC
      LIMIT 10
    `;
    db.query(sql, [], (err, results) => {
      if (err) {
        console.error("ward-counts error:", err);
        return res.json([]);
      }
      res.json(results);
    });
  }
);

module.exports = router;