// BusinessRegistrationRenewLeft.jsx
import React, { useEffect, useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BusinessRegistrationRenewLeft.css)
   All classes prefixed with "brrl-" to avoid global collisions.

   NOTE: The original CSS had bare `*` and `body` rules.
   These are intentionally dropped — they would reset the entire app when
   injected as a <style> tag. Box-sizing is applied to `.brrl-page *`
   instead, which is safe to scope.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Scoped box-sizing (safe alternative to bare * rule) ── */
  .brrl-page *, .brrl-page *::before, .brrl-page *::after {
    box-sizing: border-box;
  }

  /* ── Page ── */
  .brrl-page {
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
  .brrl-card {
    width: 95%;
    max-width: 1100px;
    background: #f7f7f7;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
  }

  /* ── Filter Bar ── */
  .brrl-filter-bar {
    background-color: #152238;
    display: flex;
    align-items: center;
    padding: 12px 18px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .brrl-excel-btn {
    background-color: #0069d9;
    color: #fff;
    border: none;
    padding: 8px 18px;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
  }
  .brrl-excel-btn:hover { background-color: #0053ae; }

  .brrl-filter-inputs {
    display: flex;
    flex: 1;
    gap: 18px;
    align-items: center;
    flex-wrap: wrap;
  }
  .brrl-filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .brrl-filter-group label { font-size: 12px; color: #e2e6ef; }
  .brrl-filter-group input {
    width: 180px;
    padding: 6px 8px;
    border-radius: 2px;
    border: 1px solid #ced4da;
    font-size: 13px;
    font-family: inherit;
  }

  .brrl-search-btn {
    border: none;
    background-color: #007bff;
    color: #fff;
    font-size: 18px;
    padding: 6px 14px;
    border-radius: 2px;
    cursor: pointer;
    font-family: inherit;
  }
  .brrl-search-btn:hover { background-color: #0061c4; }

  /* ── Table ── */
  .brrl-table-wrapper {
    overflow-x: auto;
    background-color: #fff;
  }
  .brrl-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    font-family: inherit;
  }
  .brrl-table thead {
    background-color: #2d3136;
    color: #fff;
  }
  .brrl-table th,
  .brrl-table td {
    padding: 10px 8px;
    border-bottom: 1px solid #dee2e6;
    text-align: left;
    white-space: nowrap;
  }
  .brrl-table th:first-child,
  .brrl-table td:first-child { text-align: center; width: 50px; }
  .brrl-table tbody tr:nth-child(even) { background-color: #f3f3f3; }
  .brrl-table tbody tr:hover           { background-color: #eef2f7; }
  .brrl-closed-row { opacity: 0.55; text-decoration: line-through; }

  /* ── Status / info cells ── */
  .brrl-cell-info  { padding: 12px; color: #666; }
  .brrl-cell-error { padding: 12px; color: red; }

  /* ── Icon buttons ── */
  .brrl-icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
  }
  .brrl-plus-btn   { background-color: #000; color: #fff; }
  .brrl-card-btn   { background-color: #343a40; color: #fff; }
  .brrl-delete-btn { background-color: #dc3545; color: #fff; }
  .brrl-delete-btn:hover { background-color: #b02a37; }

  /* ── Pagination ── */
  .brrl-pagination {
    background-color: #e5e5e5;
    padding: 12px 0 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  .brrl-page-btn {
    min-width: 40px;
    padding: 6px 12px;
    border: 1px solid #b0b0b0;
    background-color: #fff;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
  }
  .brrl-page-btn.brrl-active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  /* ── Footer ── */
  .brrl-footer {
    margin-top: 18px;
    font-size: 12px;
    color: #555;
    font-family: inherit;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function BusinessRegistrationRenewLeft() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  /* Filter state */
  const [filterFrom,    setFilterFrom]    = useState("");
  const [filterTo,      setFilterTo]      = useState("");
  const [filterBizName, setFilterBizName] = useState("");

  /* ── Fetch ── */
  const fetchRows = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/forms/business-registration-renew-left");
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      setRows(data.map((r) => ({
        id:              r.id,
        sn:              r.sn              ?? null,
        regDate:         r.regDate         ?? "",
        regNo:           r.regNo           ?? "",
        businessOwner:   r.businessOwner   ?? "",
        businessName:    r.businessName    ?? "",
        address:         r.address         ?? "",
        renewalLastDate: r.renewalLastDate ?? "",
        status:          r.status          ?? "active",
        notes:           r.notes           ?? "",
      })));
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm("के यो रेकर्ड पक्का मेटाउने हो?")) return;
    try {
      const res = await fetch(`/api/forms/business-registration-renew-left/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server ${res.status}`);
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert("मेटाउन असफल भयो: " + (e.message || e));
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="brrl-page">
      <style>{STYLES}</style>

      <div className="brrl-card">

        {/* ── Filter Bar ── */}
        <div className="brrl-filter-bar">
          <button className="brrl-excel-btn">एक्सेल निर्यात गर्नुहोस्</button>

          <div className="brrl-filter-inputs">
            <div className="brrl-filter-group">
              <label>मिति देखि</label>
              <input type="text" value={filterFrom} onChange={(e) => setFilterFrom(e.target.value)} />
            </div>
            <div className="brrl-filter-group">
              <label>मिति सम्म</label>
              <input type="text" value={filterTo} onChange={(e) => setFilterTo(e.target.value)} />
            </div>
            <div className="brrl-filter-group">
              <label>व्यवसायको नाम</label>
              <input type="text" value={filterBizName} onChange={(e) => setFilterBizName(e.target.value)} />
            </div>
          </div>

          <button className="brrl-search-btn" onClick={fetchRows} aria-label="Search">🔍</button>
        </div>

        {/* ── Table ── */}
        <div className="brrl-table-wrapper">
          <table className="brrl-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>दर्ता मिति</th>
                <th>दर्ता नं</th>
                <th>व्यवसायीको नाम</th>
                <th>व्यवसायको नाम</th>
                <th>व्यवसायको ठेगाना</th>
                <th>नविकरण गरिएको अन्तिम मिति</th>
                <th>नविकरण अवस्था</th>
                <th>प्रमाणपत्र प्रिन्ट</th>
                <th>कारवाही</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10} className="brrl-cell-info">लोड हुँदैछ...</td></tr>
              ) : error ? (
                <tr><td colSpan={10} className="brrl-cell-error">त्रुटि: {error}</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={10} className="brrl-cell-info">डेटा उपलब्ध छैन</td></tr>
              ) : (
                rows.map((row, idx) => (
                  <tr key={row.id ?? idx} className={row.status === "closed" ? "brrl-closed-row" : ""}>
                    <td>{row.sn ?? (idx + 1)}</td>
                    <td>{row.regDate}</td>
                    <td>{row.regNo}</td>
                    <td>{row.businessOwner}</td>
                    <td>{row.businessName}</td>
                    <td>{row.address}</td>
                    <td>{row.renewalLastDate}</td>
                    <td>
                      <button className="brrl-icon-btn brrl-plus-btn">+</button>
                    </td>
                    <td>
                      <button className="brrl-icon-btn brrl-card-btn">🪪</button>
                    </td>
                    <td>
                      <button className="brrl-icon-btn brrl-delete-btn" onClick={() => handleDelete(row.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="brrl-pagination">
          <button className="brrl-page-btn brrl-active">1</button>
          <button className="brrl-page-btn">2</button>
          <button className="brrl-page-btn">next</button>
        </div>
      </div>

      <footer className="brrl-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </footer>
    </div>
  );
}

export default BusinessRegistrationRenewLeft;