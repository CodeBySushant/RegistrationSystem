// src/components/CategoryReportSearch.jsx
import React, { useState } from "react";
import "./CategoryReportSearch.css";

const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite-safe; if CRA use process.env.REACT_APP_API_BASE

const CategoryReportSearch = () => {
  const [fromDate, setFromDate] = useState("२०८२-०८-०६");
  const [toDate, setToDate] = useState("२०८२-०८-०६");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); // array of result objects
  const [error, setError] = useState(null);

  // Builds query string and calls backend
  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    setResults([]);

    try {
      // Use simple query params (dates passed raw). Adapt param names on server as needed.
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      if (category) params.append("category", category);
      if (!selectAll && subCategory) params.append("subCategory", subCategory);
      if (selectAll) params.append("selectAll", "1");

      const url = `${API_BASE}/api/reports/category?${params.toString()}`;

      const resp = await fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || data.error || "Server returned an error");
      }

      // Expecting an array of rows, but adapt if your backend returns { rows: [...] }
      const rows = Array.isArray(data) ? data : data.rows || [];
      setResults(rows);
    } catch (err) {
      console.error(err);
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    console.log("Back clicked");
    // keep same behavior as your original stub; you can call navigate(-1) if using react-router
  };

  return (
    <div className="report-page-container">
      {/* --- Header --- */}
      <div className="report-header">
        <h2>कोटि रिपोर्ट खोजी</h2>
        <button className="back-btn" onClick={handleBack}>
          <span>⬅</span> Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar-container">
        <div className="filter-group">
          <input
            type="text"
            className="filter-input date-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label className="input-label">मिति देखि</label>
        </div>

        <div className="filter-group">
          <input
            type="text"
            className="filter-input date-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <label className="input-label">मिति सम्म</label>
        </div>

        <div className="filter-group select-group">
          <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">कोटि छनौट गर्नुहोस्</option>
            <option value="social">सामाजिक</option>
            <option value="economic">आर्थिक</option>
            <option value="education">शैक्षिक</option>
          </select>
        </div>

        <div className="filter-group select-group">
          <select
            className="filter-select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            disabled={selectAll}
          >
            <option value="">उप कोटि छनौट गर्नुहोस्</option>
            <option value="1">सिफारिस</option>
            <option value="2">दर्ता</option>
          </select>
        </div>

        <div className="filter-group checkbox-group">
          <input
            type="checkbox"
            id="selectAll"
            checked={selectAll}
            onChange={(e) => setSelectAll(e.target.checked)}
          />
          <label htmlFor="selectAll">सबै उप कोटि चयन गर्नुहोस्</label>
        </div>

        <button className="search-icon-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "..." : "🔍"}
        </button>
      </div>

      {/* --- Results Area (Textured Background) --- */}
      <div className="report-results-area">
        {error && <div style={{ color: "red", padding: 8 }}>{error}</div>}

        {!error && !loading && results.length === 0 && (
          <div style={{ padding: 12, color: "#666" }}>कुनै नतिजा छैन — खोज गर्नुहोस्।</div>
        )}

        {results.length > 0 && (
          <div className="results-table-wrapper" style={{ overflowX: "auto" }}>
            <table className="results-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {/* adapt columns below to match your data shape */}
                  <th style={{ textAlign: "left", padding: 6 }}>ID</th>
                  <th style={{ textAlign: "left", padding: 6 }}>कोटि</th>
                  <th style={{ textAlign: "left", padding: 6 }}>उप कोटि</th>
                  <th style={{ textAlign: "left", padding: 6 }}>मिति</th>
                  <th style={{ textAlign: "left", padding: 6 }}>विवरण</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={r.id ?? idx} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: 6 }}>{r.id ?? "-"}</td>
                    <td style={{ padding: 6 }}>{r.category ?? "-"}</td>
                    <td style={{ padding: 6 }}>{r.sub_category ?? "-"}</td>
                    <td style={{ padding: 6 }}>{r.date ?? "-"}</td>
                    <td style={{ padding: 6 }}>{r.summary ?? r.description ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loading && <div style={{ padding: 12 }}>खोजिँदैछ...</div>}
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </div>
  );
};

export default CategoryReportSearch;
