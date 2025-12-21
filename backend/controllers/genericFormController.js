// backend/controllers/genericFormController.js
const createModel = require("../models/modelFactory");
const forms = require("../forms.json");

// Optional hooks for special forms (PDF generation, uploads, etc.)
const hooks = {
  // "domestic-animal": { afterInsert: (id, data) => { /* run extra work */ } }
};

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

    // Prepare payload only for this form (do not modify other modules)
    const payload = { ...req.body };
    const { role, ward_number } = req.admin;
    // 🔐 FORCE ward from token
    if (role === "ADMIN") {
      payload.ward_number = ward_number;
    }

    // === Generic: stringify any arrays/objects so the DB receives a single column value ===
    // Skip Date objects (we want them to be passed as real dates if provided)
    Object.keys(payload).forEach((k) => {
      const v = payload[k];
      if (v && typeof v === "object" && !(v instanceof Date)) {
        try {
          payload[k] = JSON.stringify(v);
        } catch (e) {
          // if stringification fails, set to null to avoid DB driver errors
          payload[k] = null;
        }
      }
    });

    // Ensure all columns declared in forms.json exist in the payload.
    // This guarantees modelFactory will receive a values array matching the columns array.
    if (Array.isArray(meta.columns)) {
      meta.columns.forEach((col) => {
        if (!(col in payload)) payload[col] = null;
      });
    }

    const model = createModel(meta.table, meta.columns || []);
    model.insert(payload, (err, result) => {
      if (err) {
        // Prefer returning sqlMessage where available for easier debugging
        return res
          .status(500)
          .json({
            error: err.code || "INSERT_ERROR",
            message: err.sqlMessage || err.message,
          });
      }
      const id = result && result.insertId ? result.insertId : null;

      // run optional hook asynchronously (don't block response)
      const h = hooks[formKey];
      if (h && typeof h.afterInsert === "function") {
        try {
          // call but do not await; keep it resilient
          Promise.resolve(h.afterInsert(id, payload)).catch((hookErr) => {
            console.error("hook error", hookErr);
          });
        } catch (e) {
          console.error("hook error", e);
        }
      }

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

    let sql = `SELECT * FROM ${meta.table}`;
    let params = [];

    // 🔐 Ward isolation
    if (role === "ADMIN") {
      sql += " WHERE ward_number = ?";
      params.push(ward_number);
    }

    sql += " ORDER BY created_at DESC";

    model.customQuery(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.code });
      }
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

    let sql = `SELECT * FROM ${meta.table} WHERE id = ?`;
    const params = [req.params.id];

    if (role === "ADMIN") {
      sql += " AND ward_number = ?";
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

    let sql = `UPDATE ${meta.table} SET ? WHERE id = ?`;
    const params = [req.body, req.params.id];

    if (role === "ADMIN") {
      sql += " AND ward_number = ?";
      params.push(ward_number);
    }

    const model = getModelForKey(formKey);
    model.customQuery(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.code });

      if (result.affectedRows === 0) {
        return res.status(403).json({ error: "Forbidden" });
      }

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

    let sql = `DELETE FROM ${meta.table} WHERE id = ?`;
    const params = [req.params.id];

    if (role === "ADMIN") {
      sql += " AND ward_number = ?";
      params.push(ward_number);
    }

    const model = getModelForKey(formKey);
    model.customQuery(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.code });

      if (result.affectedRows === 0) {
        return res.status(403).json({ error: "Forbidden" });
      }

      res.json({ affectedRows: result.affectedRows });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
