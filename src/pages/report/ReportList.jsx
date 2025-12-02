// src/components/ReportList.jsx
import React, { useState } from "react";
import "./ReportList.css";

const API_BASE = import.meta.env.VITE_API_BASE || ""; // change if CRA
const REPORTS_URL = `${API_BASE}/api/reports/category`;

const ReportList = () => {
  const [fromDate, setFromDate] = useState("२०८२-०८-०६");
  const [toDate, setToDate] = useState("२०८२-०८-०६");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    setResults([]);
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      if (category) params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);

      const url = `${REPORTS_URL}?${params.toString()}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      // accept either array or { rows: [...] }
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
  };

  return (
    <div className="report-list-container">
      {/* --- Header --- */}
      <div className="page-header">
        <h2>कोटि रिपोर्ट खोजी</h2>
        <button className="back-link" onClick={handleBack}>
          <span>⬅</span> Back
        </button>
      </div>

      {/* --- Search Filter Bar --- */}
      <div className="search-bar-wrapper">
        <div className="search-inputs">
          <input
            type="text"
            className="search-field"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="text"
            className="search-field"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <select
            className="search-field dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">कोटि छनौट गर्नुहोस्</option>
            <option value="social">सामाजिक</option>
            <option value="economic">आर्थिक</option>
          </select>
          <select
            className="search-field dropdown"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">उप कोटि छनौट गर्नुहोस्</option>
            <option value="1">सिफारिस</option>
            <option value="2">दर्ता</option>
          </select>
        </div>

        <button className="search-submit-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "..." : "🔍"}
        </button>
      </div>

      {/* --- Gray Content Placeholder --- */}
      <div className="content-placeholder">
        {error && <div style={{ color: "red", padding: 8 }}>{error}</div>}

        {!error && !loading && results.length === 0 && (
          <div style={{ color: "#666", padding: 12 }}>कुनै नतिजा छैन — खोज गर्नुहोस्।</div>
        )}

        {results.length > 0 && (
          <div style={{ padding: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 6 }}>ID</th>
                  <th style={{ textAlign: "left", padding: 6 }}>कोटि</th>
                  <th style={{ textAlign: "left", padding: 6 }}>उप कोटि</th>
                  <th style={{ textAlign: "left", padding: 6 }}>मिति</th>
                  <th style={{ textAlign: "left", padding: 6 }}>विवरण</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.id ?? i} style={{ borderTop: "1px solid #eee" }}>
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
      <div className="page-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </div>
  );
};

export default ReportList;
