// src/components/CertificateRenewalList.jsx
import React, { useEffect, useState, useRef } from "react";
import "./CertificateRenewalList.css";

const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite-safe; if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/certificates/renewals`;

const initialFilters = {
  from: "",
  to: "",
  name: "",
  type: "",
  cardNo: ""
};

const pageSizeOptions = [10, 25, 50];

export default function CertificateRenewalList() {
  const [rows, setRows] = useState([]);            // visible data rows
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const [selectedRow, setSelectedRow] = useState(null); // details modal
  const resultsRef = useRef(null);

  // fetch data from server with filters + pagination
  const fetchData = async (opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { from, to, name, type, cardNo } = opts.filters ?? filters;
      const p = opts.page ?? page;
      const ps = opts.pageSize ?? pageSize;

      const params = new URLSearchParams();
      if (from) params.append("from", from);
      if (to) params.append("to", to);
      if (name) params.append("name", name);
      if (type) params.append("type", type);
      if (cardNo) params.append("cardNo", cardNo);
      params.append("page", p);
      params.append("pageSize", ps);

      const url = `${API_URL}?${params.toString()}`;
      const resp = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || data.error || "Server error");
      // expecting { rows: [...], total: N }
      setRows(data.rows || []);
      setTotalRows(typeof data.total === "number" ? data.total : (data.rows || []).length);
      setPage(p);
      setPageSize(ps);
    } catch (err) {
      console.error("fetchData error:", err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchData({ page: 1, pageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilters((s) => ({ ...s, [name]: value }));
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setPage(1);
    fetchData({ filters, page: 1, pageSize });
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setPage(1);
    fetchData({ filters: initialFilters, page: 1, pageSize });
  };

  // pagination controls
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData({ filters, page: newPage, pageSize });
  };
  const handlePageSizeChange = (e) => {
    const ps = Number(e.target.value);
    setPageSize(ps);
    setPage(1);
    fetchData({ filters, page: 1, pageSize: ps });
  };

  // CSV export (simple)
  const exportCSV = () => {
    if (!rows || rows.length === 0) return;
    const headers = ["क्र.स.", "नवीकरण मिति", "आवेदकको नाम", "नवीकरण प्रकार", "जिल्ला", "ठेगाना", "फोन", "परिचय पत्र नं.", "प्राप्त मिति", "अधिकृत व्यक्ति"];
    const csvRows = [headers.join(",")];
    rows.forEach((r) => {
      const line = [
        `"${r.sn ?? ""}"`,
        `"${r.renewDate ?? ""}"`,
        `"${(r.name ?? "").replace(/"/g, '""')}"`,
        `"${r.type ?? ""}"`,
        `"${(r.district ?? "").replace(/"/g, '""')}"`,
        `"${(r.address ?? "").replace(/"/g, '""')}"`,
        `"${r.phone ?? ""}"`,
        `"${r.cardNo ?? ""}"`,
        `"${r.issueDate ?? ""}"`,
        `"${(r.officer ?? "").replace(/"/g, '""')}"`
      ];
      csvRows.push(line.join(","));
    });
    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate_renewals_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // printing: open print window focused on results area
  const handlePrint = () => {
    if (!resultsRef.current) {
      window.print();
      return;
    }
    const printContent = resultsRef.current.innerHTML;
    const popup = window.open("", "_blank", "width=900,height=700");
    popup.document.open();
    popup.document.write(`
      <html>
        <head>
          <title>Print - Certificate Renewals</title>
          <style>
            /* minimal print styles */
            body{font-family: Arial, Helvetica, sans-serif; padding: 12px; color: #000}
            table{width:100%; border-collapse: collapse; font-size: 12px}
            th, td{border:1px solid #999; padding:6px; text-align:left}
          </style>
        </head>
        <body>
          <h3>परिचय पत्र नवीकरणको सूची</h3>
          ${printContent}
        </body>
      </html>
    `);
    popup.document.close();
    // wait a bit for resources to load then print
    setTimeout(() => { popup.print(); popup.close(); }, 500);
  };

  const openDetails = (row) => setSelectedRow(row);
  const closeDetails = () => setSelectedRow(null);

  const totalPages = Math.max(1, Math.ceil((totalRows || rows.length) / pageSize));

  return (
    <div className="renewal-list-container">
      {/* --- Header --- */}
      <div className="renewal-header">
        <h2>परिचय पत्र नवीकरणको सूची</h2>
        <button className="back-link-btn" onClick={() => { console.log("Back button clicked"); }}>
          ← Back
        </button>
      </div>

      {/* --- Action Buttons --- */}
      <div className="action-buttons-row">
        <button className="action-btn excel-btn" onClick={exportCSV} disabled={rows.length === 0}>एक्सेल निर्यात गर्नुहोस्</button>
        <button className="action-btn print-btn" onClick={handlePrint}>प्रिन्ट गर्नुहोस्</button>
      </div>

      {/* --- Filter Bar --- */}
      <form className="filter-bar" onSubmit={handleSearch}>
        <input name="from" value={filters.from} onChange={handleInput} type="text" placeholder="मिति देखि" className="filter-input" />
        <input name="to" value={filters.to} onChange={handleInput} type="text" placeholder="मिति सम्म" className="filter-input" />
        <input name="name" value={filters.name} onChange={handleInput} type="text" placeholder="आवेदकको नाम" className="filter-input" />
        <select name="type" value={filters.type} onChange={handleInput} className="filter-select">
          <option value="">प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
          <option value="एकल महिला भत्ता">एकल महिला भत्ता</option>
          <option value="जेष्ठ नागरिक अन्य भत्ता">जेष्ठ नागरिक अन्य भत्ता</option>
          <option value="लोपोन्मुख आदिवासी भत्ता">लोपोन्मुख आदिवासी भत्ता</option>
          <option value="पूर्ण अपाङ्ग भत्ता">पूर्ण अपाङ्ग भत्ता</option>
        </select>
        <input name="cardNo" value={filters.cardNo} onChange={handleInput} type="text" placeholder="परिचय पत्र नं." className="filter-input" />
        <button type="submit" className="search-icon-btn" disabled={loading}>{loading ? "..." : "🔍"}</button>
        <button type="button" onClick={handleReset} className="search-icon-btn" title="Reset">रिसेट</button>
      </form>

      {/* --- Table Section --- */}
      <div className="table-container" ref={resultsRef}>
        {error && <div style={{ color: "red", padding: 8 }}>{error}</div>}

        <table className="renewal-table">
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
              <tr><td colSpan="11" style={{ padding: 12 }}>लोड हुँदैछ...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan="11" style={{ padding: 12 }}>कुनै डाटा उपलब्ध छैन। खोज गर्नुहोस्।</td></tr>
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
                  <td className="text-center">
                    <button className="icon-btn" onClick={() => openDetails(row)} title="View details">👁</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-row" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <div>Rows: 
            <select value={pageSize} onChange={handlePageSizeChange} style={{ marginLeft: 8 }}>
              {pageSizeOptions.map((ps) => <option key={ps} value={ps}>{ps}</option>)}
            </select>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button onClick={() => handlePageChange(1)} disabled={page === 1}>«</button>
            <button onClick={() => handlePageChange(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
            <span style={{ margin: "0 8px" }}>{page} / {totalPages}</span>
            <button onClick={() => handlePageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>›</button>
            <button onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>»</button>
          </div>
        </div>
      </div>

      {/* Details Modal (simple) */}
      {selectedRow && (
        <div className="modal-overlay" onClick={closeDetails} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", padding: 16, borderRadius: 6, width: 720, maxHeight: "80vh", overflow: "auto" }}>
            <h3>विवरण (ID: {selectedRow.id})</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {Object.keys(selectedRow).map((k) => (
                  <tr key={k}>
                    <td style={{ padding: 6, fontWeight: 700, borderBottom: "1px solid #eee", width: 200 }}>{k}</td>
                    <td style={{ padding: 6, borderBottom: "1px solid #eee" }}>{String(selectedRow[k])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 12, textAlign: "right" }}>
              <button onClick={closeDetails}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Footer --- */}
      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </div>
  );
}
