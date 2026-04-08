import React, { useEffect, useState, useRef } from "react";
import "./GovOrganizationRegUnsuccessful.css";
import PrintPreviewModal from "./PrintPreviewModal";
import axios from "../../utils/axiosInstance";

function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const headers = [
    "sn", "date", "proposalName", "headOffice", "purpose",
    "activities", "totalShareCapital", "entranceFee", "recommendation_note"
  ];
  const lines = [headers.join(",")].concat(
    rows.map((r, idx) =>
      headers.map(h => {
        const val = h === "sn" ? idx + 1 : (r[h] == null ? "" : String(r[h]));
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",")
    )
  );
  return lines.join("\r\n");
}

const GovOrganizationRegUnsuccessful = () => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [previewRow, setPreviewRow] = useState(null);
  const abortRef = useRef(null);

  // ── fetch only rejected rows ────────────────────
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

  // ── client-side filters ─────────────────────────
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
    if (fromDate) {
      out = out.filter(r => r.date ? r.date.slice(0, 10) >= fromDate : false);
    }
    if (toDate) {
      out = out.filter(r => r.date ? r.date.slice(0, 10) <= toDate : false);
    }
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) { alert("निर्यात गर्न कुनै रेकर्ड छैन।"); return; }
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gov_reg_rejected_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  // ── render ──────────────────────────────────────
  return (
    <div className="rej-page">

      {/* Header */}
      <header className="rej-header">
        <div className="rej-title">सहकारी संस्था दर्ता अस्वीकृत सूची ।</div>
        <div className="rej-btn-row">
          <button
            className="rej-primary-btn"
            onClick={handleExport}
            disabled={loading || filtered.length === 0}
          >
            📥 एक्सेल निर्यात
          </button>
          <button
            className="rej-primary-btn"
            onClick={handlePrint}
            disabled={loading}
          >
            🖨 प्रिन्ट
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="rej-filter-bar">
        <div className="rej-filters">
          <div className="rej-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); }}
            />
          </div>
          <div className="rej-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); }}
            />
          </div>
          <div className="rej-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="नाम/आवेदक खोज्नुहोस्"
            />
          </div>
        </div>
        <button
          className="rej-search-btn"
          aria-label="Search"
          onClick={fetchRows}
        >
          🔍
        </button>
      </div>

      {/* Table */}
      <div className="rej-table-wrapper">
        {loading ? (
          <div className="rej-state-msg">Loading...</div>
        ) : error ? (
          <div className="rej-state-msg rej-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rej-state-msg">कुनै अस्वीकृत रेकर्ड भेटिएन।</div>
        ) : (
          <div className="rej-scroll">
            <table className="rej-table" role="table" aria-label="Rejected registrations">
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
                  <tr key={row.id || idx} className={idx % 2 === 0 ? "even-row" : "odd-row"}>
                    <td data-label="क्र. स.">{idx + 1}</td>
                    <td data-label="दर्ता मिति">{row.date ? row.date.slice(0, 10) : "-"}</td>
                    <td data-label="प्रस्तावित संस्था नाम">{row.proposalName || "-"}</td>
                    <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                    <td data-label="उद्देश्य" className="rej-ellipsis">{(row.purpose || "-").slice(0, 40)}</td>
                    <td data-label="मुख्य कार्य" className="rej-ellipsis">{(row.activities || "-").slice(0, 40)}</td>
                    <td data-label="प्राप्त सेयर">{row.totalShareCapital || "-"}</td>
                    <td data-label="प्राप्त प्रवेश शुल्क">{row.entranceFee || "-"}</td>
                    <td data-label="अस्वीकृत कारण" className="rej-ellipsis">
                      {row.recommendation_note || "-"}
                    </td>
                    <td data-label="स्क्यान" className="rej-center">
                      <button
                        className="rej-eye"
                        onClick={() => setPreviewRow(row)}
                        aria-label="Print Preview"
                        title="प्रिन्ट पूर्वावलोकन"
                      >
                        👁
                      </button>
                    </td>
                    <td data-label="कार्य" className="rej-center">
                      <span className="rej-rejected-badge">✖ अस्वीकृत</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="rej-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>

      {/* Print Preview Modal */}
      {previewRow && (
        <PrintPreviewModal
          row={previewRow}
          onClose={() => setPreviewRow(null)}
        />
      )}
    </div>
  );
};

export default GovOrganizationRegUnsuccessful;