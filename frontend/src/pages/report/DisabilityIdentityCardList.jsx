// src/components/DisabilityIdentityCardList.jsx
import React, { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DisabilityIdentityCardList.css)
   All classes prefixed with "dicl-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .dicl-container {
    width: 100%;
    min-height: 100vh;
    background-color: #f4f7f6;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    display: flex;
    flex-direction: column;
  }

  /* ── Header Bar ── */
  .dicl-header {
    background-color: #fff;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }
  .dicl-header h2 { margin: 0; font-size: 1.4rem; color: #000; font-weight: bold; }
  .dicl-breadcrumb { font-size: 0.9rem; color: #666; }
  .dicl-active-crumb { color: #888; }

  /* ── Content Area ── */
  .dicl-content {
    background-color: #cfd8dc;
    padding: 20px 30px;
    flex-grow: 1;
  }

  /* ── Actions Row ── */
  .dicl-actions-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .dicl-search-group { display: flex; }
  .dicl-search-input {
    padding: 8px 12px;
    font-size: 1rem;
    font-family: inherit;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 4px 0 0 4px;
    width: 250px;
    outline: none;
  }
  .dicl-search-btn {
    background-color: #2980b9;
    color: white;
    border: 1px solid #2980b9;
    border-radius: 0 4px 4px 0;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .dicl-search-btn:hover { background-color: #2471a3; }

  .dicl-add-btn {
    background-color: #2980b9;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
  }
  .dicl-add-btn:hover { background-color: #2471a3; }
  .dicl-plus-icon { font-weight: bold; font-size: 1.2rem; line-height: 1; }

  /* ── Table ── */
  .dicl-table-scroll { overflow-x: auto; }
  .dicl-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ecf0f1;
    font-size: 0.95rem;
  }
  .dicl-table th {
    background-color: #1c2331;
    color: white;
    padding: 12px 10px;
    text-align: left;
    font-weight: normal;
    border-right: 1px solid #34495e;
    white-space: nowrap;
  }
  .dicl-table th:last-child { border-right: none; }
  .dicl-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    color: #333;
    vertical-align: middle;
  }
  .dicl-table tbody tr:nth-child(even) { background-color: #eef2f3; }
  .dicl-table tbody tr:hover { background-color: #e0e0e0; }
  .dicl-center { text-align: center; }

  /* ── Icon button ── */
  .dicl-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    color: #333;
    padding: 2px 6px;
  }
  .dicl-icon-btn:hover { opacity: 0.7; }

  /* ── Status badge ── */
  .dicl-status { color: #333; }

  /* ── Info / error cells ── */
  .dicl-cell-msg { padding: 12px; }
  .dicl-cell-err { padding: 12px; color: red; }

  /* ── Pagination ── */
  .dicl-pagination {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }
  .dicl-pagination-right { margin-left: auto; display: flex; gap: 6px; }
  .dicl-page-btn {
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 4px 10px;
    cursor: pointer;
    font-family: inherit;
  }
  .dicl-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Footer ── */
  .dicl-footer {
    background-color: #fff;
    text-align: right;
    padding: 15px 30px;
    font-size: 0.85rem;
    color: #666;
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

const API_BASE = getApiBase();
const API_URL  = `${API_BASE}/api/disability/cards`;
const PAGE_SIZE = 50;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DisabilityIdentityCardList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data,       setData]       = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [page,       setPage]       = useState(1);
  const [total,      setTotal]      = useState(0);

  /* ── Fetch ── */
  const fetchData = async ({ q = searchTerm, p = page } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      params.append("page", p);
      params.append("pageSize", PAGE_SIZE);

      const resp = await fetch(`${API_URL}?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.message || json.error || "Server error");

      const rows = Array.isArray(json.rows) ? json.rows : [];
      setData(rows);
      setTotal(typeof json.total === "number" ? json.total : rows.length);
      setPage(Number(p));
    } catch (err) {
      console.error("fetchData error:", err);
      setError(err.message || "Failed to load data");
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData({}); }, []); // eslint-disable-line

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchData({ q: searchTerm, p: 1 });
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="dicl-container">
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <div className="dicl-header">
        <h2>अपांग परिचय पत्र</h2>
        <div className="dicl-breadcrumb">
          अपांग परिचय पत्र &gt;{" "}
          <span className="dicl-active-crumb">अपांग परिचय पत्र सूची</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="dicl-content">

        {/* ── Actions ── */}
        <div className="dicl-actions-row">
          <div className="dicl-search-group">
            <input
              type="text"
              placeholder="आवेदकको नाम"
              className="dicl-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="dicl-search-btn" onClick={handleSearch}>
              🔍 खोज्नुहोस्
            </button>
          </div>

          <button
            className="dicl-add-btn"
            onClick={() => {
              /* navigate("/disability/add") or open modal */
              console.log("Add button clicked");
            }}
          >
            <span className="dicl-plus-icon">+</span>
            अपांगता भएका व्यक्तिको परिचयपत्र थप्नुहोस्
          </button>
        </div>

        {/* ── Table ── */}
        <div className="dicl-table-scroll">
          <table className="dicl-table">
            <thead>
              <tr>
                <th>मिति</th>
                <th>आवेदकको नाम</th>
                <th>चलानी नम्बर</th>
                <th>अशक्तता प्रकार</th>
                <th>अधिकृत व्यक्ति</th>
                <th>आवेदक नागरिकता नम्बर</th>
                <th>आवेदक फोन नम्बर</th>
                <th>सिफारिस</th>
                <th>कैफियत</th>
                <th>Status</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={11} className="dicl-cell-msg">लोड हुँदैछ...</td></tr>
              ) : error ? (
                <tr><td colSpan={11} className="dicl-cell-err">{error}</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={11} className="dicl-cell-msg">डाटा उपलब्ध छैन। खोज्नुहोस्।</td></tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.name}</td>
                    <td>{row.invoice}</td>
                    <td>{row.type}</td>
                    <td>{row.officer}</td>
                    <td>{row.citizenship}</td>
                    <td>{row.phone}</td>
                    <td className="dicl-center">
                      <button
                        className="dicl-icon-btn"
                        title="View"
                        onClick={() => window.open(`${API_BASE}/cards/${row.id}`, "_blank")}
                      >
                        👁
                      </button>
                    </td>
                    <td>{row.remarks}</td>
                    <td><span className="dicl-status">{row.status}</span></td>
                    <td>{/* action buttons */}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {total > PAGE_SIZE && (
          <div className="dicl-pagination">
            <span>Showing page {page} — total {total}</span>
            <div className="dicl-pagination-right">
              <button
                className="dicl-page-btn"
                onClick={() => fetchData({ p: Math.max(1, page - 1) })}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                className="dicl-page-btn"
                onClick={() => fetchData({ p: page + 1 })}
                disabled={page * PAGE_SIZE >= total}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="dicl-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default DisabilityIdentityCardList;