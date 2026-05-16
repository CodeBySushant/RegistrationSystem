// src/components/ReportList.jsx
import React, { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from ReportList.css)
   All classes prefixed with "rl-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rl-container {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ── */
  .rl-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .rl-header h2 { margin: 0; font-size: 1.4rem; color: #000; font-weight: bold; }
  .rl-back-btn {
    background: none;
    border: none;
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    font-family: inherit;
  }

  /* ── Search Bar ── */
  .rl-search-bar {
    background-color: #1f2a38;
    padding: 25px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .rl-search-inputs {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .rl-search-field {
    height: 42px;
    padding: 5px 15px;
    border: none;
    border-radius: 2px;
    font-size: 1rem;
    font-family: inherit;
    color: #555;
    background-color: #e6e6e6;
    width: 220px;
    box-sizing: border-box;
  }
  .rl-search-field.rl-dropdown {
    background-color: #fff;
    width: 250px;
    cursor: pointer;
  }
  .rl-search-btn {
    background-color: #2d7ab5;
    color: white;
    border: none;
    border-radius: 4px;
    width: 45px;
    height: 42px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    flex-shrink: 0;
  }
  .rl-search-btn:hover:not(:disabled) { background-color: #205d8d; }
  .rl-search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Content area ── */
  .rl-content {
    flex-grow: 1;
    background-color: #cfd3d8;
    width: 100%;
    min-height: 500px;
    border-top: 1px solid #ccc;
    padding: 8px 0;
  }
  .rl-msg   { color: #666; padding: 12px; }
  .rl-error { color: red;  padding: 8px;  }

  /* ── Results table ── */
  .rl-results { padding: 8px; }
  .rl-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    font-size: 0.95rem;
  }
  .rl-table th {
    text-align: left;
    padding: 8px 6px;
    background: #1f2a38;
    color: #fff;
    font-weight: normal;
    white-space: nowrap;
  }
  .rl-table td {
    padding: 6px;
    border-top: 1px solid #eee;
    vertical-align: middle;
  }
  .rl-table tbody tr:hover { background: #f5f5f5; }

  /* ── Footer ── */
  .rl-footer {
    text-align: right;
    padding: 15px 30px;
    font-size: 0.85rem;
    color: #555;
    background-color: #fff;
    border-top: 1px solid #eee;
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

const REPORTS_URL = `${getApiBase()}/api/reports/category`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const ReportList = () => {
  const [fromDate,    setFromDate]    = useState("२०८२-०८-०६");
  const [toDate,      setToDate]      = useState("२०८२-०८-०६");
  const [category,    setCategory]    = useState("");
  const [subCategory, setSubCategory] = useState("");
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
      if (fromDate)    params.append("from", fromDate);
      if (toDate)      params.append("to", toDate);
      if (category)    params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);

      const res  = await fetch(`${REPORTS_URL}?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

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
    <div className="rl-container">
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <div className="rl-header">
        <h2>कोटि रिपोर्ट खोजी</h2>
        <button className="rl-back-btn" onClick={() => window.history.back()}>
          ⬅ Back
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div className="rl-search-bar">
        <div className="rl-search-inputs">
          <input
            type="text"
            className="rl-search-field"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="मिति देखि"
          />
          <input
            type="text"
            className="rl-search-field"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="मिति सम्म"
          />
          <select
            className="rl-search-field rl-dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">कोटि छनौट गर्नुहोस्</option>
            <option value="social">सामाजिक</option>
            <option value="economic">आर्थिक</option>
          </select>
          <select
            className="rl-search-field rl-dropdown"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">उप कोटि छनौट गर्नुहोस्</option>
            <option value="1">सिफारिस</option>
            <option value="2">दर्ता</option>
          </select>
        </div>

        <button
          className="rl-search-btn"
          onClick={handleSearch}
          disabled={loading}
          title="खोज्नुहोस्"
        >
          {loading ? "…" : "🔍"}
        </button>
      </div>

      {/* ── Content ── */}
      <div className="rl-content">
        {error   && <div className="rl-error">{error}</div>}
        {loading && <div className="rl-msg">खोजिँदैछ...</div>}

        {!error && !loading && results.length === 0 && (
          <div className="rl-msg">कुनै नतिजा छैन — खोज गर्नुहोस्।</div>
        )}

        {results.length > 0 && (
          <div className="rl-results">
            <table className="rl-table">
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
                {results.map((r, i) => (
                  <tr key={r.id ?? i}>
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
      <div className="rl-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </div>
  );
};

export default ReportList;