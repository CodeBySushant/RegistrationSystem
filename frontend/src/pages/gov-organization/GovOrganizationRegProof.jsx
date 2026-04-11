import React, { useEffect, useState } from "react";
import "./GovOrganizationRegProof.css";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";

function formatDate(d) {
  if (!d) return "-";
  return String(d).slice(0, 10);
}

function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const headers = ["sn", "refNo", "date", "proposalName", "headOffice", "purpose", "activities"];
  const csv = [headers.join(",")].concat(
    rows.map((r, idx) =>
      headers.map(h => {
        const val = h === "sn" ? idx + 1 : (r[h] == null ? "" : String(r[h]));
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",")
    )
  );
  return csv.join("\r\n");
}

const GovOrganizationRegProof = () => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [previewRow, setPreviewRow] = useState(null);

  // ── fetch only approved rows ────────────────────
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/forms/gov-organization-registration");
      const all = Array.isArray(res.data) ? res.data : [];
      const approved = all.filter(r => r.status === "approved");
      setRows(approved);
      setFiltered(approved);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("डेटा लोड गर्न असफल भयो।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
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
    a.download = `gov_org_approved_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="gov-proof-page">

      {/* Header */}
      <header className="gov-proof-header">
        <div className="gov-proof-title">सहकारी संस्था दर्ता प्रमाण-पत्र सूची।</div>
        <div className="gov-proof-btn-row">
          <button
            className="gov-proof-btn"
            onClick={handleExport}
            disabled={loading || !filtered.length}
          >
            📥 एक्सेल निर्यात
          </button>
          <button
            className="gov-proof-btn"
            onClick={() => window.print()}
            disabled={loading}
          >
            🖨 प्रिन्ट
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="gov-proof-filter-bar">
        <div className="gov-proof-filters">
          <div className="gov-proof-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="gov-proof-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="gov-proof-filter-group wide">
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
          className="gov-proof-search-btn"
          aria-label="Search"
          onClick={fetchRows}
        >
          🔍
        </button>
      </div>

      {/* Table */}
      <div className="gov-proof-table-wrapper">
        {loading ? (
          <div className="gov-proof-state-msg">Loading...</div>
        ) : error ? (
          <div className="gov-proof-state-msg gov-proof-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="gov-proof-state-msg">कुनै स्वीकृत रेकर्ड भेटिएन।</div>
        ) : (
          <div className="gov-proof-scroll">
            <table className="gov-proof-table">
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
                    className={index % 2 === 0 ? "gov-proof-even" : "gov-proof-odd"}
                  >
                    <td data-label="क्र. स.">{index + 1}</td>
                    <td data-label="दर्ता न.">{row.refNo || "-"}</td>
                    <td data-label="दर्ता मिति">{formatDate(row.date)}</td>
                    <td data-label="सहकारी संस्था नाम">{row.proposalName || "-"}</td>
                    <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                    <td data-label="वर्गिकरण" className="gov-proof-ellipsis">
                      {(row.purpose || "-").slice(0, 40)}
                    </td>
                    <td data-label="कार्यक्षेत्र" className="gov-proof-ellipsis">
                      {(row.activities || "-").slice(0, 40)}
                    </td>
                    <td data-label="कार्य" className="gov-proof-center">
                      <button
                        className="gov-proof-view"
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

      <footer className="gov-proof-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>

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

export default GovOrganizationRegProof;