// backend/models/domesticAnimalModel.js
const db = require("../config/db");

const toNullIfEmpty = (v) => {
  if (v === undefined || v === null) return null;
  if (typeof v === "string" && v.trim() === "") return null;
  return v;
};

// Columns exactly as in your DomesticAnimalInsuranceClaimRecommendation table
const columns = [
  "chalan_no",
  "subject",

  "addressee_line1",
  "addressee_line2",
  "addressee_line3",

  "municipality_name",
  "ward_no",

  "resident_name_in_paragraph",
  "local_select_type",
  "animal_type",
  "animal_inspected_by",
  "report_brief",
  "damaged_area_description",
  "tag_number",
  "tag_subtype",
  "animal_color",
  "death_date",

  "applicant_name",
  "applicant_address",
  "applicant_citizenship_no",
  "applicant_phone",

  "signer_name",
  "signer_designation"
];

const TABLE_NAME = "DomesticAnimalInsuranceClaimRecommendation";

const DomesticAnimalModel = {
  insert: (data, callback) => {
    const placeholders = columns.map(() => "?").join(", ");

    const values = columns.map((col) => toNullIfEmpty(data[col]));

    const sql = `
      INSERT INTO ${TABLE_NAME}
      (${columns.join(", ")})
      VALUES (${placeholders})
    `;

    db.query(sql, values, callback);
  },

  getAll: (callback) => {
    const sql = `SELECT * FROM ${TABLE_NAME} ORDER BY created_at DESC`;
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  updateById: (id, data, callback) => {
    let sets = [];
    let vals = [];

    columns.forEach((col) => {
      if (data[col] !== undefined) {
        sets.push(`${col} = ?`);
        vals.push(toNullIfEmpty(data[col]));
      }
    });

    if (sets.length === 0) return callback(null, { affectedRows: 0 });

    const sql = `
      UPDATE ${TABLE_NAME}
      SET ${sets.join(", ")}
      WHERE id = ?
    `;

    vals.push(id);
    db.query(sql, vals, callback);
  },

  deleteById: (id, callback) => {
    const sql = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = DomesticAnimalModel;
