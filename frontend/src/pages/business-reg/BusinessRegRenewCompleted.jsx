import React, { useEffect, useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BusinessRegRenewCompleted.css)
   All classes prefixed with "brrc-" to avoid global collisions.

   NOTE: Bare `*` and `body` rules dropped — they would reset the entire app.
   Box-sizing scoped to `.brrc-page *` instead; background-color moved to
   `.brrc-page`; font-family set on `.brrc-page` and inherited by children.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Scoped box-sizing ── */
  .brrc-page *, .brrc-page *::before, .brrc-page *::after {
    box-sizing: border-box;
  }

  /* ── Page ── */
  .brrc-page {
    min-height: 100vh;
    padding: 30px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #d9dde3;
    font-family: "Roboto", "Segoe UI", system-ui, -apple-system,
      BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  }

  /* ── Card ── */
  .brrc-card {
    width: 95%;
    max-width: 1250px;
    background-color: transparent;
  }

  /* ── Excel button row ── */
  .brrc-excel-wrapper {
    display: flex;
    margin-bottom: 4px;
    margin-left: 8px;
  }
  .brrc-excel-btn {
    background-color: #007b8c;
    color: #fff;
    border: none;
    padding: 8px 18px;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
  }
  .brrc-excel-btn:hover { background-color: #006474; }

  /* ── Filter Bar ── */
  .brrc-filter-bar {
    background-color: #1f2937;
    display: flex;
    align-items: center;
    padding: 12px 18px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .brrc-filter-inputs {
    display: flex;
    flex: 1;
    gap: 40px;
    align-items: center;
    flex-wrap: wrap;
  }
  .brrc-filter-group { display: flex; flex-direction: column; gap: 4px; }
  .brrc-filter-group label { font-size: 13px; color: #fff; }
  .brrc-filter-group input {
    width: 220px;
    padding: 8px 10px;
    border-radius: 2px;
    border: 1px solid #ced4da;
    font-size: 14px;
    font-family: inherit;
  }
  .brrc-search-btn {
    border: none;
    background-color: #007bff;
    color: #fff;
    font-size: 18px;
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
  }
  .brrc-search-btn:hover { background-color: #0061c4; }

  /* ── Table ── */
  .brrc-table-wrapper {
    overflow-x: auto;
    background-color: #fff;
  }
  .brrc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    font-family: inherit;
  }
  .brrc-table thead { background-color: #222a38; color: #fff; }
  .brrc-table th,
  .brrc-table td {
    padding: 10px 8px;
    border-bottom: 1px solid #dee2e6;
    text-align: left;
    white-space: nowrap;
  }
  .brrc-table th:first-child,
  .brrc-table td:first-child { text-align: center; width: 40px; }
  .brrc-table tbody tr:nth-child(odd)  { background-color: #f3f3f3; }
  .brrc-table tbody tr:hover           { background-color: #eef2f7; }

  /* ── Info / error cells ── */
  .brrc-cell-info  { padding: 12px; color: #666; }

  /* ── Icon buttons ── */
  .brrc-icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
  }
  .brrc-card-btn   { background-color: #000; color: #fbbf24; }
  .brrc-delete-btn { background-color: #dc3545; color: #fff; }
  .brrc-delete-btn:hover { background-color: #b02a37; }

  /* ── Footer ── */
  .brrc-footer {
    margin-top: 18px;
    font-size: 12px;
    color: #555;
    font-family: inherit;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function BusinessRegRenewCompleted() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);

  /* Filter state — was uncontrolled in original */
  const [filterFrom,    setFilterFrom]    = useState("");
  const [filterTo,      setFilterTo]      = useState("");
  const [filterBizName, setFilterBizName] = useState("");

  /* ── Fetch ── */
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/forms/business-reg-renew-completed");
      if (!res.ok) { console.error("API error:", res.status); setRows([]); return; }

      const data = await res.json();
      if      (Array.isArray(data))       setRows(data);
      else if (Array.isArray(data.data))  setRows(data.data);
      else { console.error("Unexpected response shape:", data); setRows([]); }
    } catch (err) {
      console.error("Fetch failed:", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm("के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?")) return;
    try {
      const res = await fetch(`/api/forms/business-reg-renew-completed/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRows((prev) => prev.filter((row) => row.id !== id));
      } else {
        alert("Deletion failed");
      }
    } catch (err) {
      alert("Deletion failed");
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="brrc-page">
      <style>{STYLES}</style>

      <div className="brrc-card">

        {/* ── Excel Button ── */}
        <div className="brrc-excel-wrapper">
          <button className="brrc-excel-btn">एक्सेल निर्यात गर्नुहोस्</button>
        </div>

        {/* ── Filter Bar ── */}
        <div className="brrc-filter-bar">
          <div className="brrc-filter-inputs">
            <div className="brrc-filter-group">
              <label>मिति देखि</label>
              <input type="text" value={filterFrom}    onChange={(e) => setFilterFrom(e.target.value)} />
            </div>
            <div className="brrc-filter-group">
              <label>मिति सम्म</label>
              <input type="text" value={filterTo}      onChange={(e) => setFilterTo(e.target.value)} />
            </div>
            <div className="brrc-filter-group">
              <label>व्यवसायको नाम</label>
              <input type="text" value={filterBizName} onChange={(e) => setFilterBizName(e.target.value)} />
            </div>
          </div>
          <button className="brrc-search-btn" onClick={fetchData} aria-label="Search">🔍</button>
        </div>

        {/* ── Table ── */}
        <div className="brrc-table-wrapper">
          {loading ? (
            <div className="brrc-cell-info">लोड हुँदैछ...</div>
          ) : (
            <table className="brrc-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>दर्ता मिति</th>
                  <th>दर्ता नं</th>
                  <th>व्यवसायको नाम</th>
                  <th>व्यवसायीको नाम</th>
                  <th>व्यवसायको ठेगाना</th>
                  <th>नविकरण गरिएको अन्तिम मिति</th>
                  <th>नविकरण अवधि</th>
                  <th>नविकरण दरखर</th>
                  <th>नविकरण भोचर</th>
                  <th>प्रिन्ट</th>
                  <th>डिलिट</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={12} className="brrc-cell-info">डेटा उपलब्ध छैन</td></tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={row.id}>
                      <td>{row.sn ?? idx + 1}</td>
                      <td>{row.regDate}</td>
                      <td>{row.regNo}</td>
                      <td>{row.businessName}</td>
                      <td>{row.ownerName}</td>
                      <td>{row.address}</td>
                      <td>{row.lastRenewalDate}</td>
                      <td>{row.renewalPeriod}</td>
                      <td>{row.renewalRate}</td>
                      <td>{row.renewalVoucher}</td>
                      <td>
                        <button className="brrc-icon-btn brrc-card-btn">🪪</button>
                      </td>
                      <td>
                        <button className="brrc-icon-btn brrc-delete-btn" onClick={() => handleDelete(row.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <footer className="brrc-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </footer>
    </div>
  );
}

export default BusinessRegRenewCompleted;