// src/components/CategoryReportSearch.jsx
import React, { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CategoryReportSearch.css)
   All classes prefixed with "crs-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page container ── */
  .crs-page {
    max-width: 100%;
    margin: 0 auto;
    background-color: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ── */
  .crs-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }
  .crs-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #000;
    font-weight: bold;
  }
  .crs-back-btn {
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: inherit;
  }

  /* ── Filter bar ── */
  .crs-filter-bar {
    background-color: #1c2331;
    padding: 20px 30px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
  }
  .crs-filter-group {
    display: flex;
    flex-direction: column;
  }
  .crs-filter-input,
  .crs-filter-select {
    padding: 10px;
    border: none;
    border-radius: 2px;
    font-size: 0.95rem;
    height: 40px;
    box-sizing: border-box;
    font-family: inherit;
  }
  .crs-date-input {
    width: 180px;
    background-color: #e0e0e0;
  }
  .crs-filter-select {
    width: 200px;
    background-color: #fff;
    cursor: pointer;
  }
  .crs-input-label {
    color: #aab7c4;
    font-size: 0.8rem;
    margin-top: 5px;
  }

  /* Checkbox */
  .crs-checkbox-group {
    flex-direction: row;
    align-items: center;
    height: 40px;
    color: #fff;
    gap: 8px;
    font-size: 0.95rem;
    display: flex;
  }
  .crs-checkbox-group input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  /* Search button */
  .crs-search-btn {
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    font-family: inherit;
  }
  .crs-search-btn:hover:not(:disabled) { background-color: #1c6ea4; }
  .crs-search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Results area ── */
  .crs-results-area {
    flex-grow: 1;
    background-color: #f4f4f4;
    background-size: cover;
    background-position: center;
    min-height: 400px;
    margin: 0 30px;
    padding: 10px 0;
  }
  .crs-results-scroll { overflow-x: auto; }
  .crs-table {
    width: 100%;
    border-collapse: collapse;
  }
  .crs-table th {
    text-align: left;
    padding: 8px 6px;
    background-color: #e8e8e8;
    font-weight: bold;
    border-bottom: 2px solid #ccc;
  }
  .crs-table td {
    padding: 6px;
    border-top: 1px solid #eee;
  }
  .crs-table tr:hover td { background-color: #f0f0f0; }
  .crs-msg { padding: 12px; color: #666; }
  .crs-error { padding: 8px; color: red; }

  /* ── Footer ── */
  .crs-copyright {
    text-align: right;
    padding: 15px 30px;
    font-size: 0.85rem;
    color: #666;
    border-top: 1px solid #eee;
    background-color: #fff;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   API Base — safe for both Vite and CRA
───────────────────────────────────────────────────────────────────────────── */
const getApiBase = () => {
  try {
    const meta = Function("return import.meta")();
    if (meta?.env?.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }
  try {
    if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE)
      return process.env.REACT_APP_API_BASE;
  } catch (e) { /* ignore */ }
  return "";
};

const API_BASE = getApiBase();

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const CategoryReportSearch = () => {
  const [fromDate,    setFromDate]    = useState("२०८२-०८-०६");
  const [toDate,      setToDate]      = useState("२०८२-०८-०६");
  const [category,    setCategory]    = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectAll,   setSelectAll]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [results,     setResults]     = useState([]);
  const [error,       setError]       = useState(null);

  /* ── Search ── */
  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    setResults([]);
    try {
      const params = new URLSearchParams();
      if (fromDate)                       params.append("from", fromDate);
      if (toDate)                         params.append("to", toDate);
      if (category)                       params.append("category", category);
      if (!selectAll && subCategory)      params.append("subCategory", subCategory);
      if (selectAll)                      params.append("selectAll", "1");

      const url  = `${API_BASE}/api/reports/category?${params.toString()}`;
      const resp = await fetch(url, { method: "GET", headers: { Accept: "application/json" } });
      const data = await resp.json();

      if (!resp.ok) throw new Error(data.message || data.error || "Server returned an error");

      const rows = Array.isArray(data) ? data : (data.rows ?? []);
      setResults(rows);
    } catch (err) {
      console.error(err);
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="crs-page">
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <div className="crs-header">
        <h2>कोटि रिपोर्ट खोजी</h2>
        <button className="crs-back-btn" onClick={() => window.history.back()}>
          ⬅ Back
        </button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="crs-filter-bar">
        <div className="crs-filter-group">
          <input
            type="text"
            className="crs-filter-input crs-date-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label className="crs-input-label">मिति देखि</label>
        </div>

        <div className="crs-filter-group">
          <input
            type="text"
            className="crs-filter-input crs-date-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <label className="crs-input-label">मिति सम्म</label>
        </div>

        <div className="crs-filter-group">
          <select
            className="crs-filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">कोटि छनौट गर्नुहोस्</option>
            <option value="social">सामाजिक</option>
            <option value="economic">आर्थिक</option>
            <option value="education">शैक्षिक</option>
          </select>
        </div>

        <div className="crs-filter-group">
          <select
            className="crs-filter-select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            disabled={selectAll}
          >
            <option value="">उप कोटि छनौट गर्नुहोस्</option>
            <option value="1">सिफारिस</option>
            <option value="2">दर्ता</option>
          </select>
        </div>

        <div className="crs-checkbox-group">
          <input
            type="checkbox"
            id="crs-selectAll"
            checked={selectAll}
            onChange={(e) => setSelectAll(e.target.checked)}
          />
          <label htmlFor="crs-selectAll">सबै उप कोटि चयन गर्नुहोस्</label>
        </div>

        <button
          className="crs-search-btn"
          onClick={handleSearch}
          disabled={loading}
          title="खोज्नुहोस्"
        >
          {loading ? "…" : "🔍"}
        </button>
      </div>

      {/* ── Results Area ── */}
      <div className="crs-results-area">
        {error && <div className="crs-error">{error}</div>}

        {!error && !loading && results.length === 0 && (
          <div className="crs-msg">कुनै नतिजा छैन — खोज गर्नुहोस्।</div>
        )}

        {loading && <div className="crs-msg">खोजिँदैछ...</div>}

        {results.length > 0 && (
          <div className="crs-results-scroll">
            <table className="crs-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>कोटि</th>
                  <th>उप कोटि</th>
                  <th>मिति</th>
                  <th>विवरण</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={r.id ?? idx}>
                    <td>{r.id          ?? "-"}</td>
                    <td>{r.category    ?? "-"}</td>
                    <td>{r.sub_category ?? "-"}</td>
                    <td>{r.date        ?? "-"}</td>
                    <td>{r.summary     ?? r.description ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="crs-copyright">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default CategoryReportSearch;