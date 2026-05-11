import React, { useEffect, useState, useRef } from "react";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────
   HELPER
───────────────────────────────────────────── */
function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const headers = [
    "sn", "date", "proposalName", "headOffice", "purpose",
    "activities", "totalShareCapital", "entranceFee", "recommendation_note",
  ];
  const lines = [headers.join(",")].concat(
    rows.map((r, idx) =>
      headers.map(h => {
        const val = h === "sn"
          ? idx + 1
          : (r[h] == null ? "" : String(r[h]));
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",")
    )
  );
  return lines.join("\r\n");
}

/* ─────────────────────────────────────────────
   STYLES  (prefix: guru-)
───────────────────────────────────────────── */
const styles = `
.guru-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  box-sizing: border-box;
}
.guru-page *, .guru-page *::before, .guru-page *::after {
  box-sizing: border-box;
}

.guru-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.guru-title {
  font-size: 18px;
  font-weight: 600;
}

.guru-btn-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.guru-primary-btn {
  background-color: #007b8c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  transition: background 0.15s;
}
.guru-primary-btn:hover:not(:disabled) { background-color: #005f6e; }
.guru-primary-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.guru-filter-bar {
  background-color: #171f33;
  display: flex;
  align-items: flex-end;
  padding: 12px 24px;
  gap: 16px;
  flex-wrap: wrap;
}
.guru-filters {
  display: flex;
  flex: 1;
  gap: 24px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.guru-filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.guru-filter-group label {
  color: #fff;
  font-size: 12px;
}
.guru-filter-group input {
  width: 180px;
  padding: 7px 8px;
  border-radius: 3px;
  border: 1px solid #cfd4da;
  font-size: 13px;
  font-family: inherit;
}
.guru-filter-group.wide input { width: 220px; }

.guru-search-btn {
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
}
.guru-search-btn:hover { background-color: #0062cc; }

.guru-table-wrapper {
  margin: 10px 24px 0;
  flex: 1;
}
.guru-scroll { width: 100%; overflow-x: auto; }

.guru-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 900px;
}
.guru-table thead { background-color: #192236; color: #fff; }
.guru-table th,
.guru-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #d5d5d5;
  text-align: left;
  vertical-align: middle;
}
.guru-table th:first-child,
.guru-table td:first-child { text-align: center; width: 48px; }

.guru-even-row { background-color: #f3f3f3; }
.guru-odd-row  { background-color: #dcdcdc; }

.guru-center   { text-align: center !important; }
.guru-ellipsis {
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.guru-eye {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.guru-eye:hover { opacity: 0.65; }

.guru-rejected-badge {
  display: inline-block;
  background-color: #c82333;
  color: #fff;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.guru-state-msg { padding: 24px; color: #555; font-size: 14px; }
.guru-error     { color: crimson; }

.guru-footer {
  margin-top: 18px;
  margin-bottom: 16px;
  padding-right: 24px;
  text-align: right;
  font-size: 12px;
  color: #666;
}

/* ── Print ── */
@media print {
  .guru-header .guru-btn-row,
  .guru-filter-bar,
  .guru-eye,
  .guru-footer { display: none !important; }
  .guru-table  { font-size: 11px; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .guru-header    { flex-direction: column; align-items: flex-start; }
  .guru-filter-bar { flex-direction: column; align-items: stretch; }
  .guru-filters   { flex-direction: column; gap: 10px; }
  .guru-filter-group input,
  .guru-filter-group.wide input { width: 100%; }
  .guru-search-btn { width: 100%; padding: 10px; }
  .guru-table-wrapper { margin: 10px 8px 0; }

  .guru-table,
  .guru-table thead,
  .guru-table tbody,
  .guru-table th,
  .guru-table td,
  .guru-table tr { display: block; }
  .guru-table thead tr { display: none; }
  .guru-table tbody tr {
    border: 1px solid #ccc;
    margin-bottom: 12px;
    border-radius: 4px;
    padding: 8px;
    background: #fff;
  }
  .guru-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    text-align: right;
  }
  .guru-table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-align: left;
    flex: 1;
    color: #333;
  }
  .guru-ellipsis { max-width: none; white-space: normal; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const GovOrganizationRegUnsuccessful = () => {
  const [rows, setRows]           = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [fromDate, setFromDate]   = useState("");
  const [toDate, setToDate]       = useState("");
  const [searchName, setSearchName] = useState("");
  const [previewRow, setPreviewRow] = useState(null);
  const abortRef = useRef(null);

  const fetchRows = async () => {
    setLoading(true);
    setError("");
    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await axios.get("/api/forms/gov-organization-registration");
      const all = Array.isArray(res.data) ? res.data : [];
      const rejected = all.filter(r => r.status === "rejected");
      setRows(rejected);
      setFiltered(rejected);
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("Fetch error", e);
        setError("डेटा लोड गर्न असफल भयो।");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    fetchRows();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  // Client-side filters
  useEffect(() => {
    let out = [...rows];
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(r =>
        (r.proposalName && r.proposalName.toLowerCase().includes(q)) ||
        (r.applicantName && r.applicantName.toLowerCase().includes(q)) ||
        (r.headOffice && r.headOffice.toLowerCase().includes(q))
      );
    }
    if (fromDate) out = out.filter(r => r.date ? r.date.slice(0, 10) >= fromDate : false);
    if (toDate)   out = out.filter(r => r.date ? r.date.slice(0, 10) <= toDate   : false);
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) { alert("निर्यात गर्न कुनै रेकर्ड छैन।"); return; }
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gov_reg_rejected_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="guru-page">

        {/* ── Header ── */}
        <header className="guru-header">
          <div className="guru-title">सहकारी संस्था दर्ता अस्वीकृत सूची ।</div>
          <div className="guru-btn-row">
            <button
              className="guru-primary-btn"
              onClick={handleExport}
              disabled={loading || filtered.length === 0}
            >
              📥 एक्सेल निर्यात
            </button>
            <button
              className="guru-primary-btn"
              onClick={() => window.print()}
              disabled={loading}
            >
              🖨 प्रिन्ट
            </button>
          </div>
        </header>

        {/* ── Filter bar ── */}
        <div className="guru-filter-bar">
          <div className="guru-filters">
            <div className="guru-filter-group">
              <label>मिति देखि</label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
              />
            </div>
            <div className="guru-filter-group">
              <label>मिति सम्म</label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
            </div>
            <div className="guru-filter-group wide">
              <label>सहकारी संस्थाको नाम</label>
              <input
                type="text"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                placeholder="नाम/आवेदक खोज्नुहोस्"
              />
            </div>
          </div>
          <button
            className="guru-search-btn"
            aria-label="Search"
            onClick={fetchRows}
          >
            🔍
          </button>
        </div>

        {/* ── Table ── */}
        <div className="guru-table-wrapper">
          {loading ? (
            <div className="guru-state-msg">Loading...</div>
          ) : error ? (
            <div className="guru-state-msg guru-error">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="guru-state-msg">कुनै अस्वीकृत रेकर्ड भेटिएन।</div>
          ) : (
            <div className="guru-scroll">
              <table
                className="guru-table"
                role="table"
                aria-label="Rejected registrations"
              >
                <thead>
                  <tr>
                    <th>क्र. स.</th>
                    <th>दर्ता मिति</th>
                    <th>प्रस्तावित संस्था नाम</th>
                    <th>ठेगाना</th>
                    <th>उद्देश्य</th>
                    <th>मुख्य कार्य</th>
                    <th>प्राप्त सेयर</th>
                    <th>प्राप्त प्रवेश शुल्क</th>
                    <th>अस्वीकृत कारण</th>
                    <th>स्क्यान</th>
                    <th>कार्य</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      className={idx % 2 === 0 ? "guru-even-row" : "guru-odd-row"}
                    >
                      <td data-label="क्र. स.">{idx + 1}</td>
                      <td data-label="दर्ता मिति">
                        {row.date ? row.date.slice(0, 10) : "-"}
                      </td>
                      <td data-label="प्रस्तावित संस्था नाम">
                        {row.proposalName || "-"}
                      </td>
                      <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                      <td data-label="उद्देश्य" className="guru-ellipsis">
                        {(row.purpose || "-").slice(0, 40)}
                      </td>
                      <td data-label="मुख्य कार्य" className="guru-ellipsis">
                        {(row.activities || "-").slice(0, 40)}
                      </td>
                      <td data-label="प्राप्त सेयर">
                        {row.totalShareCapital || "-"}
                      </td>
                      <td data-label="प्राप्त प्रवेश शुल्क">
                        {row.entranceFee || "-"}
                      </td>
                      <td data-label="अस्वीकृत कारण" className="guru-ellipsis">
                        {row.recommendation_note || "-"}
                      </td>
                      <td data-label="स्क्यान" className="guru-center">
                        <button
                          className="guru-eye"
                          onClick={() => setPreviewRow(row)}
                          aria-label="Print Preview"
                          title="प्रिन्ट पूर्वावलोकन"
                        >
                          👁
                        </button>
                      </td>
                      <td data-label="कार्य" className="guru-center">
                        <span className="guru-rejected-badge">✖ अस्वीकृत</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="guru-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

        {/* ── Print Preview Modal ── */}
        {previewRow && (
          <PrintPreviewModal
            row={previewRow}
            onClose={() => setPreviewRow(null)}
          />
        )}

      </div>
    </>
  );
};

export default GovOrganizationRegUnsuccessful;