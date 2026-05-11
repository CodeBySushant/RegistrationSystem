import React, { useEffect, useState } from "react";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from GovOrganizationRegRecommendation.css)
   All classes prefixed with "gorr-" to avoid global collisions.
   Global * and body rules scoped into .gorr-page to avoid leaking.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .gorr-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
    background: #d6d7da;
  }
  .gorr-page *, .gorr-page *::before, .gorr-page *::after {
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Filter bar ── */
  .gorr-filter-bar {
    background-color: #171f33;
    display: flex;
    align-items: flex-end;
    padding: 12px 24px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .gorr-filters {
    display: flex;
    flex: 1;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
  }
  .gorr-filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .gorr-filter-group label {
    color: #ffffff;
    font-size: 12px;
  }
  .gorr-filter-group input {
    width: 180px;
    padding: 7px 8px;
    border-radius: 3px;
    border: 1px solid #d0d4da;
    font-size: 13px;
    font-family: inherit;
  }
  .gorr-filter-group.wide input { width: 220px; }
  .gorr-search-btn {
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
  .gorr-search-btn:hover { background-color: #0062cc; }

  /* ── Table wrapper ── */
  .gorr-table-wrapper {
    margin: 10px 24px 0;
    flex: 1;
  }
  .gorr-scroll {
    width: 100%;
    overflow-x: auto;
  }
  .gorr-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    min-width: 960px;
  }
  .gorr-table thead {
    background-color: #192236;
    color: #ffffff;
  }
  .gorr-table th,
  .gorr-table td {
    padding: 10px 8px;
    border-bottom: 1px solid #d5d5d5;
    text-align: left;
    vertical-align: middle;
  }
  .gorr-table th:first-child,
  .gorr-table td:first-child {
    text-align: center;
    width: 48px;
  }
  .gorr-even { background-color: #f3f3f3; }
  .gorr-odd  { background-color: #dcdcdc; }
  .gorr-center { text-align: center !important; }
  .gorr-ellipsis {
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Pending badge ── */
  .gorr-pending-badge {
    display: inline-block;
    background-color: #856404;
    color: #fff;
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 4px;
    white-space: nowrap;
  }

  /* ── Eye button ── */
  .gorr-eye-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .gorr-eye-btn:hover { opacity: 0.65; }

  /* ── Action buttons ── */
  .gorr-action-cell {
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
  }
  .gorr-status-btn {
    width: 26px;
    height: 26px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gorr-status-btn.ok     { background-color: #1fa34a; color: #ffffff; }
  .gorr-status-btn.cancel { background-color: #c82333; color: #ffffff; }
  .gorr-status-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .gorr-edit-btn {
    width: 26px;
    height: 26px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    background-color: #005f9e;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gorr-edit-btn:hover { background-color: #004a7c; }

  /* ── State messages ── */
  .gorr-state-msg {
    padding: 24px;
    color: #555;
    font-size: 14px;
  }
  .gorr-error { color: crimson; }

  /* ── Bottom bar ── */
  .gorr-bottom-bar {
    display: flex;
    gap: 10px;
    padding: 12px 24px;
    flex-wrap: wrap;
  }
  .gorr-export-btn,
  .gorr-print-btn {
    padding: 7px 16px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: background 0.15s;
  }
  .gorr-export-btn { background-color: #28a745; color: #fff; }
  .gorr-export-btn:hover { background-color: #218838; }
  .gorr-print-btn  { background-color: #6c757d; color: #fff; }
  .gorr-print-btn:hover  { background-color: #5a6268; }

  /* ── Footer ── */
  .gorr-footer {
    margin-top: 8px;
    margin-bottom: 16px;
    font-size: 12px;
    text-align: right;
    padding-right: 24px;
    color: #666;
  }

  /* ── Modal ── */
  .gorr-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .gorr-modal {
    background: #fff;
    border-radius: 6px;
    padding: 28px 32px;
    width: 560px;
    max-width: 95vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  }
  .gorr-modal h3 {
    margin: 0 0 18px 0;
    font-size: 1.1rem;
    color: #192236;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .gorr-modal-grid {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 10px 12px;
    align-items: center;
  }
  .gorr-modal-grid label {
    font-size: 0.88rem;
    font-weight: 600;
    color: #333;
  }
  .gorr-modal-grid input,
  .gorr-modal-grid select,
  .gorr-modal-grid textarea {
    width: 100%;
    padding: 7px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    font-family: inherit;
  }
  .gorr-modal-grid textarea {
    resize: vertical;
    min-height: 56px;
  }
  .gorr-modal-actions { margin-top: 12px; display: flex; gap: 8px; }
  .gorr-modal-save {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    background-color: #192236;
    color: #fff;
  }
  .gorr-modal-save:hover:not(:disabled) { background-color: #0f1520; }
  .gorr-modal-save:disabled { opacity: 0.5; cursor: not-allowed; }
  .gorr-modal-cancel {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    background-color: #e0e0e0;
    color: #333;
  }
  .gorr-modal-cancel:hover { background-color: #c8c8c8; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .gorr-filter-bar {
      flex-direction: column;
      align-items: stretch;
      padding: 12px;
    }
    .gorr-filters { flex-direction: column; gap: 10px; }
    .gorr-filter-group input,
    .gorr-filter-group.wide input { width: 100%; }
    .gorr-search-btn { width: 100%; padding: 10px; }
    .gorr-table-wrapper { margin: 10px 8px 0; }

    /* Stack rows on mobile */
    .gorr-table,
    .gorr-table thead,
    .gorr-table tbody,
    .gorr-table th,
    .gorr-table td,
    .gorr-table tr { display: block; }
    .gorr-table thead tr { display: none; }
    .gorr-table tbody tr {
      border: 1px solid #ccc;
      margin-bottom: 12px;
      border-radius: 4px;
      padding: 8px;
      background: #fff;
    }
    .gorr-table td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      border-bottom: 1px solid #eee;
      font-size: 13px;
      text-align: right;
    }
    .gorr-table td::before {
      content: attr(data-label);
      font-weight: 600;
      text-align: left;
      flex: 1;
      color: #333;
      margin-right: 8px;
    }
    .gorr-ellipsis { max-width: none; white-space: normal; }
    .gorr-action-cell { justify-content: flex-end; }
    .gorr-modal-grid { grid-template-columns: 1fr; }
    .gorr-modal { padding: 20px 16px; }
    .gorr-bottom-bar { padding: 12px 8px; }
  }

  /* ── Print ── */
  @media print {
    .gorr-filter-bar,
    .gorr-bottom-bar,
    .gorr-action-cell,
    .gorr-eye-btn,
    .gorr-footer { display: none !important; }
    .gorr-table { font-size: 11px; min-width: unset; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const STATUS = {
  PENDING:  "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const EDITABLE_FIELDS = [
  "date",
  "proposalName",
  "headOffice",
  "wardNo",
  "purpose",
  "activities",
  "totalShareCapital",
  "entranceFee",
  "applicantName",
  "applicantAddress",
  "applicantCitizenship",
  "applicantPhone",
  "status",
  "recommendation_note",
];

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const GovOrganizationRegRecommendation = () => {
  const [rows, setRows]               = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [fromDate, setFromDate]       = useState("");
  const [toDate, setToDate]           = useState("");
  const [searchName, setSearchName]   = useState("");
  const [error, setError]             = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Edit modal
  const [editing, setEditing]   = useState(false);
  const [editRow, setEditRow]   = useState(null);
  const [saving, setSaving]     = useState(false);

  // Print preview
  const [previewRow, setPreviewRow] = useState(null);

  /* ── Fetch pending rows only ── */
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/forms/gov-organization-registration");
      const all = Array.isArray(res.data) ? res.data : [];
      const pending = all.filter((r) => r.status === STATUS.PENDING || !r.status);
      setRows(pending);
      setFiltered(pending);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);

  /* ── Client-side filters ── */
  useEffect(() => {
    let out = [...rows];
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          (r.proposalName && r.proposalName.toLowerCase().includes(q)) ||
          (r.applicantName && r.applicantName.toLowerCase().includes(q)) ||
          (r.headOffice    && r.headOffice.toLowerCase().includes(q))
      );
    }
    if (fromDate) out = out.filter((r) => (r.date ? r.date.slice(0, 10) >= fromDate : false));
    if (toDate)   out = out.filter((r) => (r.date ? r.date.slice(0, 10) <= toDate   : false));
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  /* ── Edit modal handlers ── */
  const openEdit = (row) => {
    const copy = { id: row.id };
    EDITABLE_FIELDS.forEach((k) => { copy[k] = row[k] ?? ""; });
    setEditRow(copy);
    setEditing(true);
  };

  const closeEdit = () => { setEditing(false); setEditRow(null); };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editRow?.id) return;
    if (!editRow.proposalName || editRow.proposalName.trim() === "") {
      alert("Organization name is required.");
      return;
    }
    setSaving(true);
    try {
      // Convert empty strings → null before sending to backend
      const payload = {};
      EDITABLE_FIELDS.forEach((k) => { payload[k] = editRow[k] === "" ? null : editRow[k]; });

      await axios.put(
        `/api/forms/gov-organization-registration/${editRow.id}`,
        payload
      );

      // Update both lists in state without a full refetch
      const updater = (prev) =>
        prev.map((r) => (r.id === editRow.id ? { ...r, ...payload } : r));
      setRows(updater);
      setFiltered(updater);

      alert("Saved successfully.");
      closeEdit();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save: " + (err.response?.data?.message || err.message || ""));
    } finally {
      setSaving(false);
    }
  };

  /* ── Approve / Reject — remove from pending list immediately ── */
  const updateStatus = async (id, newStatus) => {
    if (!id) return;
    setProcessingId(id);
    try {
      await axios.put(`/api/forms/gov-organization-registration/${id}`, {
        status: newStatus,
      });
      const remover = (prev) => prev.filter((r) => r.id !== id);
      setRows(remover);
      setFiltered(remover);
    } catch (err) {
      console.error(err);
      alert("Failed to update status: " + (err.response?.data?.message || err.message || ""));
    } finally {
      setProcessingId(null);
    }
  };

  /* ── CSV export with UTF-8 BOM for Excel ── */
  const toCSV = (rs) => {
    if (!rs?.length) return "";
    const header = [
      "sn", "regDate", "name", "address", "purpose",
      "mainWork", "receivedShare", "receivedEntryFee", "status",
    ];
    const rows = [header.join(",")].concat(
      rs.map((r, idx) =>
        header.map((h) => {
          let v = "";
          switch (h) {
            case "sn":               v = idx + 1; break;
            case "regDate":          v = r.date || ""; break;
            case "name":             v = r.proposalName || ""; break;
            case "address":          v = r.headOffice || ""; break;
            case "purpose":          v = r.purpose || ""; break;
            case "mainWork":         v = r.activities || ""; break;
            case "receivedShare":    v = r.totalShareCapital || ""; break;
            case "receivedEntryFee": v = r.entranceFee || ""; break;
            case "status":           v = r.status || ""; break;
            default:                 v = "";
          }
          return `"${String(v).replace(/"/g, '""')}"`;
        }).join(",")
      )
    );
    return rows.join("\r\n");
  };

  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) { alert("No rows to export"); return; }
    const BOM  = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `coop_recommendations_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="gorr-page">
      <style>{STYLES}</style>

      {/* ── Filter Bar ── */}
      <div className="gorr-filter-bar">
        <div className="gorr-filters">
          <div className="gorr-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="gorr-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="gorr-filter-group wide">
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
          className="gorr-search-btn"
          onClick={fetchRows}
          aria-label="Search"
        >
          🔍
        </button>
      </div>

      {/* ── Table ── */}
      <div className="gorr-table-wrapper">
        {loading ? (
          <div className="gorr-state-msg">Loading...</div>
        ) : error ? (
          <div className="gorr-state-msg gorr-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="gorr-state-msg">कुनै पेन्डिङ रेकर्ड भेटिएन।</div>
        ) : (
          <div className="gorr-scroll">
            <table className="gorr-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>दर्ता मिति</th>
                  <th>प्रस्तावित संस्था नाम</th>
                  <th>ठेगाना</th>
                  <th>उद्देश्य</th>
                  <th>मुख्य कार्य</th>
                  <th>प्राप्त सेयर</th>
                  <th>प्राप्त प्रवेश शुल्क</th>
                  <th>स्थिति</th>
                  <th>स्क्यान</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={index % 2 === 0 ? "gorr-even" : "gorr-odd"}
                  >
                    <td data-label="क्र.स.">{index + 1}</td>
                    <td data-label="दर्ता मिति">{row.date || "-"}</td>
                    <td data-label="प्रस्तावित संस्था नाम">{row.proposalName || "-"}</td>
                    <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                    <td data-label="उद्देश्य" className="gorr-ellipsis">
                      {(row.purpose || "-").slice(0, 40)}
                    </td>
                    <td data-label="मुख्य कार्य" className="gorr-ellipsis">
                      {(row.activities || "-").slice(0, 40)}
                    </td>
                    <td data-label="प्राप्त सेयर">{row.totalShareCapital || "-"}</td>
                    <td data-label="प्राप्त प्रवेश शुल्क">{row.entranceFee || "-"}</td>

                    <td data-label="स्थिति" className="gorr-center">
                      <span className="gorr-pending-badge">— पेन्डिङ</span>
                    </td>

                    <td data-label="स्क्यान" className="gorr-center">
                      <button
                        className="gorr-eye-btn"
                        onClick={() => setPreviewRow(row)}
                        title="प्रिन्ट पूर्वावलोकन"
                      >
                        👁
                      </button>
                    </td>

                    <td data-label="कार्य" className="gorr-center gorr-action-cell">
                      <button
                        className="gorr-status-btn ok"
                        disabled={processingId === row.id}
                        onClick={() => updateStatus(row.id, STATUS.APPROVED)}
                        title="Approve"
                      >
                        ✔
                      </button>
                      <button
                        className="gorr-status-btn cancel"
                        disabled={processingId === row.id}
                        onClick={() => updateStatus(row.id, STATUS.REJECTED)}
                        title="Reject"
                      >
                        ✖
                      </button>
                      <button
                        className="gorr-edit-btn"
                        onClick={() => openEdit(row)}
                        title="Edit"
                      >
                        ✎
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="gorr-bottom-bar">
        <button onClick={handleExport} className="gorr-export-btn">
          📥 Export CSV
        </button>
        <button onClick={() => window.print()} className="gorr-print-btn">
          🖨 Print
        </button>
      </div>

      <footer className="gorr-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>

      {/* ── Print Preview Modal ── */}
      {previewRow && (
        <PrintPreviewModal
          row={previewRow}
          onClose={() => setPreviewRow(null)}
        />
      )}

      {/* ── Edit Modal ── */}
      {editing && editRow && (
        <div className="gorr-modal-overlay" onClick={closeEdit}>
          <div className="gorr-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Registration</h3>
            <div className="gorr-modal-grid">
              <label>Organization Name</label>
              <input name="proposalName" value={editRow.proposalName} onChange={handleEditChange} />

              <label>Date</label>
              <input name="date" type="date" value={editRow.date?.slice(0, 10) ?? ""} onChange={handleEditChange} />

              <label>Ward No</label>
              <input name="wardNo" value={editRow.wardNo} onChange={handleEditChange} />

              <label>Head Office / Address</label>
              <input name="headOffice" value={editRow.headOffice} onChange={handleEditChange} />

              <label>Purpose</label>
              <textarea name="purpose" value={editRow.purpose} onChange={handleEditChange} />

              <label>Activities</label>
              <textarea name="activities" value={editRow.activities} onChange={handleEditChange} />

              <label>Total Share Capital</label>
              <input name="totalShareCapital" value={editRow.totalShareCapital} onChange={handleEditChange} />

              <label>Entrance Fee</label>
              <input name="entranceFee" value={editRow.entranceFee} onChange={handleEditChange} />

              <label>Applicant Name</label>
              <input name="applicantName" value={editRow.applicantName} onChange={handleEditChange} />

              <label>Applicant Phone</label>
              <input name="applicantPhone" value={editRow.applicantPhone} onChange={handleEditChange} />

              <label>Recommendation Note</label>
              <textarea name="recommendation_note" value={editRow.recommendation_note} onChange={handleEditChange} />
            </div>
            <div className="gorr-modal-actions">
              <button className="gorr-modal-save" onClick={saveEdit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="gorr-modal-cancel" onClick={closeEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovOrganizationRegRecommendation;