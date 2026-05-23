// backend/controllers/genericFormController.js
const db = require("../config/db");
const forms = require("../forms.json");
const createModel = require("../models/modelFactory");

const hooks = {};

// Per-table ward column mapping — null means no ward isolation for that table
const WARD_COLUMN_MAP = {
  AllowanceForm: "ward",
  BusinessIndustryRegistrationForm: "ward_no",
  BusinessRegistrationCertificate: "wardNo",
  BusinessIndustryRegistrationNewList: null,
  BusinessRegistrationRenewLeft: null,
  BusinessRegRenewCompleted: null,
  DailyWorkPerformanceList: null,
};

function getWardColumn(tableName) {
  if (tableName in WARD_COLUMN_MAP) return WARD_COLUMN_MAP[tableName];
  return null;
}

function getModelForKey(formKey) {
  const meta = forms[formKey];
  if (!meta) throw new Error(`Unknown formKey: ${formKey}`);
  return createModel(meta.table, meta.columns || []);
}

exports.createRecord = (req, res) => {
  try {
    const formKey = req.params.formKey;
    const meta = forms[formKey];
    if (!meta) throw new Error(`Unknown formKey: ${formKey}`);

    const payload = { ...req.body };

    ["created_at", "updated_at", "created_by"].forEach(
      (k) => delete payload[k],
    );

    Object.keys(payload).forEach((k) => {
      const v = payload[k];
      if (v instanceof Date) {
        payload[k] = v.toISOString().slice(0, 10);
      } else if (v && typeof v === "object") {
        try {
          payload[k] = JSON.stringify(v);
        } catch {
          payload[k] = null;
        }
      }
    });

    if (Array.isArray(meta.columns)) {
      meta.columns.forEach((col) => {
        if (!(col in payload)) payload[col] = null;
      });
    }

    const model = createModel(meta.table, meta.columns || []);
    model.insert(payload, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err.code || "INSERT_ERROR",
          message: err.sqlMessage || err.message,
        });
      }

      const id = result?.insertId ?? null;

      // ── Log to submissions table ──
      const category = meta.category || "Other";
      const subCategory = meta.subCategory || formKey;
      const summary =
        payload.applicant_name ||
        payload.applicantName ||
        payload.full_name ||
        payload.fullName ||
        payload.residentName ||
        payload.resident_name ||
        payload.sigName ||
        payload.applicant_name_footer ||
        "";

      const wardNo =
        payload.ward_no ||
        payload.wardNo ||
        payload.ward ||
        req.admin?.ward_number ||
        null;

      db.query(
        `INSERT INTO submissions 
         (form_key, category, sub_category, summary, description) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          formKey,
          category,
          subCategory,
          String(summary).slice(0, 500),
          JSON.stringify({
            id,
            ward: wardNo,
            submittedBy: req.admin?.id || null,
          }),
        ],
        (subErr) => {
          if (subErr) console.error("submissions log error:", subErr);
        },
      );

      res.status(201).json({ id });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAll = (req, res) => {
  try {
    const formKey = req.params.formKey;
    const meta = forms[formKey];
    if (!meta) throw new Error("Invalid form key");

    const model = getModelForKey(formKey);
    const { role, ward_number } = req.admin;
    const wardCol = getWardColumn(meta.table);

    let sql = `SELECT * FROM \`${meta.table}\``;
    let params = [];

    if (role === "ADMIN" && wardCol) {
      sql += ` WHERE \`${wardCol}\` = ?`;
      params.push(ward_number);
    }

    sql += " ORDER BY created_at DESC";

    model.customQuery(sql, params, (err, rows) => {
      if (err)
        return res
          .status(500)
          .json({ error: err.code, message: err.sqlMessage });
      res.json(rows);
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getById = (req, res) => {
  try {
    const formKey = req.params.formKey;
    const meta = forms[formKey];
    if (!meta) throw new Error("Invalid form key");

    const { role, ward_number } = req.admin;
    const wardCol = getWardColumn(meta.table);

    let sql = `SELECT * FROM \`${meta.table}\` WHERE id = ?`;
    const params = [req.params.id];

    if (role === "ADMIN" && wardCol) {
      sql += ` AND \`${wardCol}\` = ?`;
      params.push(ward_number);
    }

    const model = getModelForKey(formKey);
    model.customQuery(sql, params, (err, rows) => {
      if (err) return res.status(500).json({ error: err.code });
      if (!rows.length) return res.status(404).json({ error: "Not Found" });
      res.json(rows[0]);
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = (req, res) => {
  try {
    const formKey = req.params.formKey;
    const meta = forms[formKey];
    if (!meta) throw new Error("Invalid form key");

    const { role, ward_number } = req.admin;
    const wardCol = getWardColumn(meta.table);

    // Only allow updating columns declared in forms.json
    const allowedCols = meta.columns || [];
    const filteredBody = {};
    allowedCols.forEach((col) => {
      if (col in req.body) {
        filteredBody[col] = req.body[col] ?? null;
      }
    });

    if (!Object.keys(filteredBody).length) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    let sql = `UPDATE \`${meta.table}\` SET ? WHERE id = ?`;
    const params = [filteredBody, req.params.id];

    if (role === "ADMIN" && wardCol) {
      sql += ` AND \`${wardCol}\` = ?`;
      params.push(ward_number);
    }

    const model = getModelForKey(formKey);
    model.customQuery(sql, params, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: err.code, message: err.sqlMessage });
      if (result.affectedRows === 0)
        return res.status(403).json({ error: "Forbidden or not found" });
      res.json({ affectedRows: result.affectedRows });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = (req, res) => {
  try {
    const formKey = req.params.formKey;
    const meta = forms[formKey];
    if (!meta) throw new Error("Invalid form key");

    const { role, ward_number } = req.admin;
    const wardCol = getWardColumn(meta.table);

    let sql = `DELETE FROM \`${meta.table}\` WHERE id = ?`;
    const params = [req.params.id];

    if (role === "ADMIN" && wardCol) {
      sql += ` AND \`${wardCol}\` = ?`;
      params.push(ward_number);
    }

    const model = getModelForKey(formKey);
    model.customQuery(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.code });
      if (result.affectedRows === 0)
        return res.status(403).json({ error: "Forbidden or not found" });
      res.json({ affectedRows: result.affectedRows });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
