// src/components/CertificateRenewalList.jsx
import React, { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CertificateRenewalList.css)
   All classes prefixed with "crl-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .crl-container {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ── */
  .crl-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .crl-header h2 { margin: 0; font-size: 1.4rem; color: #000; font-weight: bold; }
  .crl-back-btn {
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
  }

  /* ── Action buttons ── */
  .crl-actions {
    padding: 15px 30px;
    display: flex;
    gap: 10px;
    background-color: rgba(255,255,255,0.8);
  }
  .crl-action-btn {
    background-color: #2e5d8b;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    font-family: inherit;
  }
  .crl-action-btn:hover:not(:disabled) { background-color: #244a70; }
  .crl-action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Filter bar ── */
  .crl-filter-bar {
    background-color: #1f2a38;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin: 0 30px;
    border-radius: 2px;
  }
  .crl-filter-input,
  .crl-filter-select {
    padding: 8px 12px;
    border: none;
    border-radius: 2px;
    font-size: 0.9rem;
    height: 38px;
    box-sizing: border-box;
    flex-grow: 1;
    font-family: inherit;
  }
  .crl-filter-input  { background-color: #fff; min-width: 150px; }
  .crl-filter-select { min-width: 200px; background-color: #fff; }

  .crl-search-btn {
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0 14px;
    height: 38px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    white-space: nowrap;
  }
  .crl-search-btn:hover:not(:disabled) { background-color: #1c6ea4; }
  .crl-search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Table ── */
  .crl-table-container {
    margin: 0 30px 30px 30px;
    overflow-x: auto;
    background-color: rgba(255,255,255,0.5);
  }
  .crl-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  .crl-table th {
    background-color: #1f2a38;
    color: white;
    padding: 12px 8px;
    text-align: left;
    font-weight: normal;
    border-right: 1px solid #34495e;
    white-space: nowrap;
  }
  .crl-table th:last-child { border-right: none; }
  .crl-table td {
    padding: 12px 8px;
    color: #333;
    vertical-align: middle;
    border-bottom: 1px solid #ddd;
  }
  .crl-table tbody tr:nth-child(odd)  { background-color: rgba(238, 241, 246, 0.7); }
  .crl-table tbody tr:nth-child(even) { background-color: rgba(209, 213, 219, 0.7); }
  .crl-table tbody tr:hover           { background-color: rgba(255, 255, 255, 0.9); }
  .crl-center { text-align: center; }

  /* ── Icon button ── */
  .crl-icon-btn {
    background: none;
    border: none;
    color: #2980b9;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 2px 6px;
  }
  .crl-icon-btn:hover { opacity: 0.7; }

  /* ── Pagination ── */
  .crl-pagination {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    font-size: 0.9rem;
    flex-wrap: wrap;
  }
  .crl-pagination-right { margin-left: auto; display: flex; gap: 4px; align-items: center; }
  .crl-page-btn {
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 8px;
    cursor: pointer;
    font-family: inherit;
  }
  .crl-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .crl-page-select { margin-left: 6px; font-family: inherit; }

  /* ── Error / info messages ── */
  .crl-error { color: red; padding: 8px; }
  .crl-info  { padding: 12px; color: #666; }

  /* ── Modal ── */
  .crl-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .crl-modal {
    background: #fff;
    padding: 20px;
    border-radius: 6px;
    width: 720px;
    max-width: 95vw;
    max-height: 80vh;
    overflow: auto;
  }
  .crl-modal h3 { margin-top: 0; }
  .crl-modal-table { width: 100%; border-collapse: collapse; }
  .crl-modal-table td {
    padding: 6px;
    border-bottom: 1px solid #eee;
    vertical-align: top;
  }
  .crl-modal-table td:first-child { font-weight: 700; width: 200px; }
  .crl-modal-close {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .crl-modal-close button {
    padding: 6px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
  }

  /* ── Footer ── */
  .crl-copyright {
    margin-top: auto;
    text-align: right;
    padding: 15px 30px;
    font-size: 0.85rem;
    color: #666;
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

const API_URL = `${getApiBase()}/api/certificates/renewals`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const initialFilters  = { from: "", to: "", name: "", type: "", cardNo: "" };
const pageSizeOptions = [10, 25, 50];

const CSV_HEADERS = [
  "क्र.स.", "नवीकरण मिति", "आवेदकको नाम", "नवीकरण प्रकार",
  "जिल्ला", "ठेगाना", "फोन", "परिचय पत्र नं.", "प्राप्त मिति", "अधिकृत व्यक्ति",
];

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CertificateRenewalList() {
  const [rows,        setRows]        = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [filters,     setFilters]     = useState(initialFilters);
  const [page,        setPage]        = useState(1);
  const [pageSize,    setPageSize]    = useState(10);
  const [totalRows,   setTotalRows]   = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const resultsRef = useRef(null);

  /* ── Fetch ── */
  const fetchData = async (opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { from, to, name, type, cardNo } = opts.filters ?? filters;
      const p  = opts.page     ?? page;
      const ps = opts.pageSize ?? pageSize;

      const params = new URLSearchParams();
      if (from)   params.append("from", from);
      if (to)     params.append("to", to);
      if (name)   params.append("name", name);
      if (type)   params.append("type", type);
      if (cardNo) params.append("cardNo", cardNo);
      params.append("page", p);
      params.append("pageSize", ps);

      const resp = await fetch(`${API_URL}?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || data.error || "Server error");

      const fetched = data.rows || [];
      setRows(fetched);
      setTotalRows(typeof data.total === "number" ? data.total : fetched.length);
      setPage(p);
      setPageSize(ps);
    } catch (err) {
      console.error("fetchData error:", err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData({ page: 1, pageSize }); }, []); // eslint-disable-line

  /* ── Filter handlers ── */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilters((s) => ({ ...s, [name]: value }));
  };
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchData({ filters, page: 1, pageSize });
  };
  const handleReset = () => {
    setFilters(initialFilters);
    fetchData({ filters: initialFilters, page: 1, pageSize });
  };

  /* ── Pagination ── */
  const handlePageChange    = (p)  => fetchData({ filters, page: p, pageSize });
  const handlePageSizeChange = (e) => {
    const ps = Number(e.target.value);
    setPageSize(ps);
    fetchData({ filters, page: 1, pageSize: ps });
  };
  const totalPages = Math.max(1, Math.ceil((totalRows || rows.length) / pageSize));

  /* ── CSV Export ── */
  const exportCSV = () => {
    if (!rows.length) return;
    const q = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
    const lines = [
      CSV_HEADERS.join(","),
      ...rows.map((r) => [
        q(r.sn), q(r.renewDate), q(r.name), q(r.type),
        q(r.district), q(r.address), q(r.phone),
        q(r.cardNo), q(r.issueDate), q(r.officer),
      ].join(",")),
    ];
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), {
      href: url,
      download: `certificate_renewals_${new Date().toISOString().slice(0, 10)}.csv`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ── Print ── */
  const handlePrint = () => {
    if (!resultsRef.current) { window.print(); return; }
    const popup = window.open("", "_blank", "width=900,height=700");
    popup.document.open();
    popup.document.write(`
      <html><head><title>Print - Certificate Renewals</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 12px; color: #000; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #999; padding: 6px; text-align: left; }
      </style></head>
      <body>
        <h3>परिचय पत्र नवीकरणको सूची</h3>
        ${resultsRef.current.innerHTML}
      </body></html>
    `);
    popup.document.close();
    setTimeout(() => { popup.print(); popup.close(); }, 500);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="crl-container">
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <div className="crl-header">
        <h2>परिचय पत्र नवीकरणको सूची</h2>
        <button className="crl-back-btn" onClick={() => window.history.back()}>← Back</button>
      </div>

      {/* ── Action Buttons ── */}
      <div className="crl-actions">
        <button className="crl-action-btn" onClick={exportCSV} disabled={rows.length === 0}>
          एक्सेल निर्यात गर्नुहोस्
        </button>
        <button className="crl-action-btn" onClick={handlePrint}>
          प्रिन्ट गर्नुहोस्
        </button>
      </div>

      {/* ── Filter Bar ── */}
      <form className="crl-filter-bar" onSubmit={handleSearch}>
        <input name="from"   value={filters.from}   onChange={handleInput} placeholder="मिति देखि"         className="crl-filter-input" />
        <input name="to"     value={filters.to}     onChange={handleInput} placeholder="मिति सम्म"         className="crl-filter-input" />
        <input name="name"   value={filters.name}   onChange={handleInput} placeholder="आवेदकको नाम"       className="crl-filter-input" />
        <select name="type"  value={filters.type}   onChange={handleInput} className="crl-filter-select">
          <option value="">प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
          <option value="एकल महिला भत्ता">एकल महिला भत्ता</option>
          <option value="जेष्ठ नागरिक अन्य भत्ता">जेष्ठ नागरिक अन्य भत्ता</option>
          <option value="लोपोन्मुख आदिवासी भत्ता">लोपोन्मुख आदिवासी भत्ता</option>
          <option value="पूर्ण अपाङ्ग भत्ता">पूर्ण अपाङ्ग भत्ता</option>
        </select>
        <input name="cardNo" value={filters.cardNo} onChange={handleInput} placeholder="परिचय पत्र नं."    className="crl-filter-input" />
        <button type="submit"  className="crl-search-btn" disabled={loading}>{loading ? "…" : "🔍"}</button>
        <button type="button"  className="crl-search-btn" onClick={handleReset} title="Reset">रिसेट</button>
      </form>

      {/* ── Table ── */}
      <div className="crl-table-container" ref={resultsRef}>
        {error && <div className="crl-error">{error}</div>}

        <table className="crl-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>नवीकरण मिति</th>
              <th>आवेदकको नाम</th>
              <th>नवीकरण प्रकार</th>
              <th>आवेदकको जिल्ला</th>
              <th>स्थानीय स्तर ठेगाना, वडा नं.</th>
              <th>फोन नं.</th>
              <th>परिचय पत्र नं.</th>
              <th>परिचय पत्र प्राप्त मिति</th>
              <th>अधिकृत व्यक्ति</th>
              <th>सिफारिस</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={11} className="crl-info">लोड हुँदैछ...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={11} className="crl-info">कुनै डाटा उपलब्ध छैन। खोज गर्नुहोस्।</td></tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.sn}</td>
                  <td>{row.renewDate}</td>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td>{row.district}</td>
                  <td>{row.address}</td>
                  <td>{row.phone}</td>
                  <td>{row.cardNo}</td>
                  <td>{row.issueDate}</td>
                  <td>{row.officer}</td>
                  <td className="crl-center">
                    <button className="crl-icon-btn" onClick={() => setSelectedRow(row)} title="View details">👁</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ── Pagination ── */}
        <div className="crl-pagination">
          <div>
            Rows:
            <select value={pageSize} onChange={handlePageSizeChange} className="crl-page-select">
              {pageSizeOptions.map((ps) => <option key={ps} value={ps}>{ps}</option>)}
            </select>
          </div>
          <div className="crl-pagination-right">
            <button className="crl-page-btn" onClick={() => handlePageChange(1)}                          disabled={page === 1}>«</button>
            <button className="crl-page-btn" onClick={() => handlePageChange(Math.max(1, page - 1))}      disabled={page === 1}>‹</button>
            <span style={{ margin: "0 6px" }}>{page} / {totalPages}</span>
            <button className="crl-page-btn" onClick={() => handlePageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>›</button>
            <button className="crl-page-btn" onClick={() => handlePageChange(totalPages)}                 disabled={page === totalPages}>»</button>
          </div>
        </div>
      </div>

      {/* ── Details Modal ── */}
      {selectedRow && (
        <div className="crl-modal-overlay" onClick={() => setSelectedRow(null)}>
          <div className="crl-modal" onClick={(e) => e.stopPropagation()}>
            <h3>विवरण (ID: {selectedRow.id})</h3>
            <table className="crl-modal-table">
              <tbody>
                {Object.keys(selectedRow).map((k) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{String(selectedRow[k])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="crl-modal-close">
              <button onClick={() => setSelectedRow(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="crl-copyright">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </div>
  );
}