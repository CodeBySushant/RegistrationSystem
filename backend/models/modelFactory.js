// backend/models/modelFactory.js
const db = require("../config/db");

const toNullIfEmpty = (v) => {
  if (v === undefined || v === null) return null;
  if (typeof v === "string") return v.trim() === "" ? null : v;
  return v;
};

function createModel(tableName, columns = []) {
  return {
    insert: (data, cb) => {
      // use provided columns if available, otherwise keys of data
      const cols = (columns && columns.length) ? columns : Object.keys(data);
      const placeholders = cols.map(() => "?").join(", ");
      const values = cols.map(c => toNullIfEmpty(data[c]));
      const sql = `INSERT INTO ${tableName} (${cols.join(", ")}) VALUES (${placeholders})`;
      db.query(sql, values, cb);
    },

    customQuery: (sql, params, cb) => db.query(sql, params, cb),

    getAll: (cb) => db.query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`, cb),

    getById: (id, cb) => db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], cb),

    updateById: (id, data, cb) => {
      const sets = [];
      const vals = [];
      const keys = (columns && columns.length) ? columns.filter(k => data[k] !== undefined) : Object.keys(data);
      keys.forEach(k => {
        sets.push(`${k} = ?`);
        vals.push(toNullIfEmpty(data[k]));
      });
      if (!sets.length) return cb(null, { affectedRows: 0 });
      vals.push(id);
      db.query(`UPDATE ${tableName} SET ${sets.join(", ")} WHERE id = ?`, vals, cb);
    },

    deleteById: (id, cb) => db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], cb)
  };
}

module.exports = createModel;
