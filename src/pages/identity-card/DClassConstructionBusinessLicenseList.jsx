// src/components/DClassConstructionBusinessLicenseList.jsx
import React, { useEffect, useState } from "react";
import "./DClassConstructionBusinessLicenseList.css";

const FORM_KEY = "d-class-construction-business-license"; // MUST match forms.json and the POST key used in the form component

// Safe environment detection that works in Vite and CRA, and won't crash the browser.
// - First try CRA: process.env.REACT_APP_API_BASE (if bundler injected it).
// - Then try Vite: import.meta.env.VITE_API_BASE (wrapped in try/catch to avoid syntax/runtime issues).
// - Fallback to same-origin (empty string).
let API_BASE = "";

if (typeof process !== "undefined" && process && process.env && process.env.REACT_APP_API_BASE) {
  API_BASE = process.env.REACT_APP_API_BASE;
} else {
  // access import.meta.env inside try/catch — this is safe in environments that don't support import.meta
  try {
    if (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) {
      API_BASE = import.meta.env.VITE_API_BASE;
    }
  } catch (e) {
    // import.meta not available — keep API_BASE as ""
  }
}

const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DClassConstructionBusinessLicenseList = () => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    let out = [...rows];
    const qLower = q.trim().toLowerCase();
    if (qLower) {
      out = out.filter(
        (r) =>
          (r.business_name || "").toString().toLowerCase().includes(qLower) ||
          (r.applicant_name || "").toString().toLowerCase().includes(qLower) ||
          (r.license_no || "").toString().toLowerCase().includes(qLower)
      );
    }
    if (dateFrom) out = out.filter((r) => r.issue_date && r.issue_date >= dateFrom);
    if (dateTo) out = out.filter((r) => r.issue_date && r.issue_date <= dateTo);
    setFiltered(out);
  };

  const handleReset = () => {
    setQ("");
    setDateFrom("");
    setDateTo("");
    setFiltered(rows);
  };

  const handleBack = () => window.history.back();

  return (
    <div className="license-list-container">
      <div className="license-list-header">
        <h2>घ वर्गको निर्माण व्यवसाय इजाजत पत्रको सूची</h2>
        <button className="back-link-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="date"
          className="filter-input date-field"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          placeholder="मिति देखि"
        />
        <input
          type="date"
          className="filter-input date-field"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          placeholder="मिति सम्म"
        />
        <input
          type="text"
          className="filter-input"
          placeholder="व्यवसाय / निवेदक / इजाजत पत्र नं"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
        <button className="search-icon-btn" onClick={handleReset}>⟲</button>
        <button className="search-icon-btn" onClick={fetchRows} title="Reload">⟳</button>
      </div>

      <div className="table-container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "crimson" }}>Error: {error}</div>
        ) : (
          <>
            <table className="license-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>इजाजत पत्र नं.</th>
                  <th>आ.व.</th>
                  <th>व्यवसायको नाम</th>
                  <th>दर्ता मिति</th>
                  <th>निवेदकको नाम</th>
                  <th>ठेगाना</th>
                  <th>फोन</th>
                  <th>क्रिया</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>No records found</td>
                  </tr>
                ) : (
                  filtered.map((r, idx) => (
                    <tr key={r.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{r.license_no || "-"}</td>
                      <td>{r.fiscal_year || "-"}</td>
                      <td>{r.business_name || "-"}</td>
                      <td>{r.issue_date ? r.issue_date.split("T")[0] : "-"}</td>
                      <td>{r.applicant_name || "-"}</td>
                      <td>{r.office_address || "-"}</td>
                      <td>{r.applicant_phone || "-"}</td>
                      <td className="text-center">
                        <button
                          onClick={() => { window.location.href = `/forms/${FORM_KEY}/${r.id}`; }}
                          title="View"
                        >
                          👁
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="pagination-info">Total: {filtered.length} record(s)</div>
          </>
        )}
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </div>
  );
};

export default DClassConstructionBusinessLicenseList;
