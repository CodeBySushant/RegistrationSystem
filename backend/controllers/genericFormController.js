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
    const model = getModelForKey(req.params.formKey);
    model.insert(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.code, message: err.sqlMessage });
      const id = result.insertId;
      // run optional hook asynchronously (don't block response)
      const h = hooks[req.params.formKey];
      if (h && typeof h.afterInsert === "function") {
        try { h.afterInsert(id, req.body); } catch (e) { console.error("hook error", e); }
      }
      res.status(201).json({ id });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAll = (req, res) => {
  try {
    const model = getModelForKey(req.params.formKey);
    model.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.code, message: err.sqlMessage });
      res.json(rows);
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getById = (req, res) => {
  try {
    const model = getModelForKey(req.params.formKey);
    model.getById(req.params.id, (err, rows) => {
      if (err) return res.status(500).json({ error: err.code });
      if (!rows || rows.length === 0) return res.status(404).json({ error: "Not Found" });
      res.json(rows[0]);
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = (req, res) => {
  try {
    const model = getModelForKey(req.params.formKey);
    model.updateById(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.code });
      res.json({ affectedRows: result.affectedRows });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = (req, res) => {
  try {
    const model = getModelForKey(req.params.formKey);
    model.deleteById(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.code });
      res.json({ affectedRows: result.affectedRows });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
