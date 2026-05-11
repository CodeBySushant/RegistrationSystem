import React, { useEffect, useState } from "react";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from GovOrganizationRegProof.css)
   All classes prefixed with "gorp-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .gorp-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: 300px 300px;
    background-position: top left;
  }

  /* ── Header ── */
  .gorp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    flex-wrap: wrap;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .gorp-title {
    font-size: 18px;
    font-weight: 600;
  }

  /* ── Button row ── */
  .gorp-btn-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .gorp-btn {
    background-color: #007b8c;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s;
  }
  .gorp-btn:hover:not(:disabled) { background-color: #005f6e; }
  .gorp-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Filter bar ── */
  .gorp-filter-bar {
    background-color: #171f33;
    display: flex;
    align-items: flex-end;
    padding: 12px 24px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .gorp-filters {
    display: flex;
    flex: 1;
    gap: 24px;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  .gorp-filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .gorp-filter-group label {
    color: #ffffff;
    font-size: 12px;
  }
  .gorp-filter-group input {
    width: 180px;
    padding: 7px 8px;
    border-radius: 3px;
    border: 1px solid #cfd4da;
    font-size: 13px;
    font-family: inherit;
  }
  .gorp-filter-group.wide input { width: 220px; }
  .gorp-search-btn {
    border: none;
    background-color: #007bff;
    color: #ffffff;
    font-size: 16px;
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .gorp-search-btn:hover { background-color: #0062cc; }

  /* ── Table wrapper ── */
  .gorp-table-wrapper {
    margin: 10px 24px 0;
    flex: 1;
  }
  .gorp-scroll {
    width: 100%;
    overflow-x: auto;
  }
  .gorp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    min-width: 780px;
  }
  .gorp-table thead {
    background-color: #192236;
    color: #ffffff;
  }
  .gorp-table th,
  .gorp-table td {
    padding: 10px 8px;
    border-bottom: 1px solid #d5d5d5;
    text-align: left;
    vertical-align: middle;
  }
  .gorp-table th:first-child,
  .gorp-table td:first-child {
    text-align: center;
    width: 48px;
  }
  .gorp-even { background-color: #f3f3f3; }
  .gorp-odd  { background-color: #dcdcdc; }
  .gorp-center { text-align: center !important; }
  .gorp-ellipsis {
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Eye button ── */
  .gorp-view {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
  .gorp-view:hover { opacity: 0.65; }

  /* ── State messages ── */
  .gorp-state-msg {
    padding: 24px;
    color: #555;
    font-size: 14px;
  }
  .gorp-error { color: crimson; }

  /* ── Footer ── */
  .gorp-footer {
    margin-top: 18px;
    margin-bottom: 16px;
    padding-right: 24px;
    text-align: right;
    font-size: 12px;
    color: #666;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .gorp-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .gorp-filter-bar {
      flex-direction: column;
      align-items: stretch;
    }
    .gorp-filters {
      flex-direction: column;
      gap: 10px;
    }
    .gorp-filter-group input,
    .gorp-filter-group.wide input {
      width: 100%;
    }
    .gorp-search-btn {
      width: 100%;
      padding: 10px;
    }
    .gorp-table-wrapper {
      margin: 10px 8px 0;
    }

    /* Stack rows on mobile */
    .gorp-table,
    .gorp-table thead,
    .gorp-table tbody,
    .gorp-table th,
    .gorp-table td,
    .gorp-table tr {
      display: block;
    }
    .gorp-table thead tr { display: none; }
    .gorp-table tbody tr {
      border: 1px solid #ccc;
      margin-bottom: 12px;
      border-radius: 4px;
      padding: 8px;
      background: #fff;
    }
    .gorp-table td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      border-bottom: 1px solid #eee;
      font-size: 13px;
      text-align: right;
    }
    .gorp-table td::before {
      content: attr(data-label);
      font-weight: 600;
      text-align: left;
      flex: 1;
      color: #333;
    }
    .gorp-ellipsis {
      max-width: none;
      white-space: normal;
    }
  }

  /* ── Print ── */
  @media print {
    .gorp-header .gorp-btn-row,
    .gorp-filter-bar,
    .gorp-view,
    .gorp-footer {
      display: none !important;
    }
    .gorp-table { font-size: 11px; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
function formatDate(d) {
  if (!d) return "-";
  return String(d).slice(0, 10);
}

function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const headers = ["sn", "refNo", "date", "proposalName", "headOffice", "purpose", "activities"];
  const csv = [headers.join(",")].concat(
    rows.map((r, idx) =>
      headers.map((h) => {
        const val = h === "sn" ? idx + 1 : (r[h] == null ? "" : String(r[h]));
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",")
    )
  );
  return csv.join("\r\n");
}

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const GovOrganizationRegProof = () => {
  const [rows, setRows]           = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [fromDate, setFromDate]   = useState("");
  const [toDate, setToDate]       = useState("");
  const [searchName, setSearchName] = useState("");
  const [previewRow, setPreviewRow] = useState(null);

  /* ── Fetch only approved rows ── */
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/forms/gov-organization-registration");
      const all = Array.isArray(res.data) ? res.data : [];
      const approved = all.filter((r) => r.status === "approved");
      setRows(approved);
      setFiltered(approved);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("डेटा लोड गर्न असफल भयो।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);

  /* ── Client-side filters — re-run whenever rows or filters change ── */
  useEffect(() => {
    let out = [...rows];
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          (r.proposalName && r.proposalName.toLowerCase().includes(q)) ||
          (r.applicantName && r.applicantName.toLowerCase().includes(q)) ||
          (r.headOffice && r.headOffice.toLowerCase().includes(q))
      );
    }
    if (fromDate) {
      out = out.filter((r) => (r.date ? r.date.slice(0, 10) >= fromDate : false));
    }
    if (toDate) {
      out = out.filter((r) => (r.date ? r.date.slice(0, 10) <= toDate : false));
    }
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  /* ── CSV export with UTF-8 BOM so Nepali text renders in Excel ── */
  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) { alert("निर्यात गर्न कुनै रेकर्ड छैन।"); return; }
    const BOM  = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `gov_org_approved_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="gorp-page">
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <header className="gorp-header">
        <div className="gorp-title">सहकारी संस्था दर्ता प्रमाण-पत्र सूची।</div>
        <div className="gorp-btn-row">
          <button
            className="gorp-btn"
            onClick={handleExport}
            disabled={loading || !filtered.length}
          >
            📥 एक्सेल निर्यात
          </button>
          <button
            className="gorp-btn"
            onClick={() => window.print()}
            disabled={loading}
          >
            🖨 प्रिन्ट
          </button>
        </div>
      </header>

      {/* ── Filter Bar ── */}
      <div className="gorp-filter-bar">
        <div className="gorp-filters">
          <div className="gorp-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="gorp-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="gorp-filter-group wide">
            <label>सहकारी संस्थाको नाम / आवेदक</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="नाम खोज्नुहोस्"
            />
          </div>
        </div>
        <button
          className="gorp-search-btn"
          aria-label="Search"
          onClick={fetchRows}
        >
          🔍
        </button>
      </div>

      {/* ── Table ── */}
      <div className="gorp-table-wrapper">
        {loading ? (
          <div className="gorp-state-msg">Loading...</div>
        ) : error ? (
          <div className="gorp-state-msg gorp-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="gorp-state-msg">कुनै स्वीकृत रेकर्ड भेटिएन।</div>
        ) : (
          <div className="gorp-scroll">
            <table className="gorp-table">
              <thead>
                <tr>
                  <th>क्र. स.</th>
                  <th>दर्ता न.</th>
                  <th>दर्ता मिति</th>
                  <th>सहकारी संस्था नाम</th>
                  <th>ठेगाना</th>
                  <th>वर्गिकरण</th>
                  <th>कार्यक्षेत्र</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={index % 2 === 0 ? "gorp-even" : "gorp-odd"}
                  >
                    <td data-label="क्र. स.">{index + 1}</td>
                    <td data-label="दर्ता न.">{row.refNo || "-"}</td>
                    <td data-label="दर्ता मिति">{formatDate(row.date)}</td>
                    <td data-label="सहकारी संस्था नाम">{row.proposalName || "-"}</td>
                    <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                    <td data-label="वर्गिकरण" className="gorp-ellipsis">
                      {(row.purpose || "-").slice(0, 40)}
                    </td>
                    <td data-label="कार्यक्षेत्र" className="gorp-ellipsis">
                      {(row.activities || "-").slice(0, 40)}
                    </td>
                    <td data-label="कार्य" className="gorp-center">
                      <button
                        className="gorp-view"
                        onClick={() => setPreviewRow(row)}
                        title="प्रिन्ट पूर्वावलोकन"
                      >
                        👁
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="gorp-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>

      {/* ── Print Preview Modal ── */}
      {previewRow && (
        <PrintPreviewModal
          row={previewRow}
          onClose={() => setPreviewRow(null)}
        />
      )}
    </div>
  );
};

export default GovOrganizationRegProof;