const DomesticModel = require("../models/domesticAnimalModel");

exports.createRecord = (req, res) => {
  DomesticModel.insert(req.body, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: err.code, message: err.sqlMessage });
    }
    res.status(201).json({ id: result.insertId });
  });
};

exports.getAll = (req, res) => {
  DomesticModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.code });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  DomesticModel.getById(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.code });
    if (!rows.length) return res.status(404).json({ error: "Not Found" });
    res.json(rows[0]);
  });
};

exports.update = (req, res) => {
  DomesticModel.updateById(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.code });
    res.json({ updated: result.affectedRows });
  });
};

exports.delete = (req, res) => {
  DomesticModel.deleteById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.code });
    res.json({ deleted: result.affectedRows });
  });
};
