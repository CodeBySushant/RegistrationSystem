import React, { useEffect, useState } from "react";
import "./GovOrganizationRegRecommendation.css";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";

const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const editableFields = [
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

const GovOrganizationRegRecommendation = () => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // edit modal state
  const [editing, setEditing] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [saving, setSaving] = useState(false);

  // print preview state
  const [previewRow, setPreviewRow] = useState(null);

  // ── fetch pending only ──────────────────────────
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/forms/gov-organization-registration");
      const all = res.data || [];
      const pending = all.filter(
        (r) => r.status === STATUS.PENDING || !r.status
      );
      setRows(pending);
      setFiltered(pending);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
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
      out = out.filter(
        (r) =>
          (r.proposalName && r.proposalName.toLowerCase().includes(q)) ||
          (r.applicantName && r.applicantName.toLowerCase().includes(q)) ||
          (r.headOffice && r.headOffice.toLowerCase().includes(q))
      );
    }
    if (fromDate)
      out = out.filter((r) =>
        r.date ? r.date.slice(0, 10) >= fromDate : false
      );
    if (toDate)
      out = out.filter((r) =>
        r.date ? r.date.slice(0, 10) <= toDate : false
      );
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  // ── edit modal ──────────────────────────────────
  const openEdit = (row) => {
    const copy = {};
    editableFields.forEach((k) => {
      copy[k] = row[k] ?? "";
    });
    copy.id = row.id;
    setEditRow(copy);
    setEditing(true);
  };

  const closeEdit = () => {
    setEditing(false);
    setEditRow(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((p) => ({ ...p, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editRow || !editRow.id) return;
    if (!editRow.proposalName || editRow.proposalName.trim() === "") {
      alert("Organization name is required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {};
      editableFields.forEach((k) => {
        payload[k] = editRow[k] === "" ? null : editRow[k];
      });

      await axios.put(
        `/api/forms/gov-organization-registration/${editRow.id}`,
        payload
      );

      setRows((prev) =>
        prev.map((r) => (r.id === editRow.id ? { ...r, ...payload } : r))
      );
      setFiltered((prev) =>
        prev.map((r) => (r.id === editRow.id ? { ...r, ...payload } : r))
      );

      alert("Saved successfully.");
      closeEdit();
    } catch (err) {
      console.error("Save error:", err);
      alert(
        "Failed to save: " +
          (err.response?.data?.message || err.message || "")
      );
    } finally {
      setSaving(false);
    }
  };

  // ── approve / reject ────────────────────────────
  // Remove from pending list immediately after status change
  const updateStatus = async (id, newStatus) => {
    if (!id) return;
    setProcessingId(id);
    try {
      await axios.put(`/api/forms/gov-organization-registration/${id}`, {
        status: newStatus,
      });
      setRows((prev) => prev.filter((r) => r.id !== id));
      setFiltered((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert(
        "Failed to update status: " +
          (err.response?.data?.message || err.message || "")
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ── CSV export ──────────────────────────────────
  const toCSV = (rs) => {
    if (!rs || !rs.length) return "";
    const header = [
      "sn", "regDate", "name", "address", "purpose",
      "mainWork", "receivedShare", "receivedEntryFee", "status",
    ];
    const csv = [header.join(",")].concat(
      rs.map((r, idx) =>
        header
          .map((h) => {
            let v = "";
            switch (h) {
              case "sn": v = idx + 1; break;
              case "regDate": v = r.date || ""; break;
              case "name": v = r.proposalName || ""; break;
              case "address": v = r.headOffice || ""; break;
              case "purpose": v = r.purpose || ""; break;
              case "mainWork": v = r.activities || ""; break;
              case "receivedShare": v = r.totalShareCapital || ""; break;
              case "receivedEntryFee": v = r.entranceFee || ""; break;
              case "status": v = r.status || ""; break;
              default: v = "";
            }
            return `"${String(v).replace(/"/g, '""')}"`;
          })
          .join(",")
      )
    );
    return csv.join("\r\n");
  };

  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) return alert("No rows to export");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coop_recommendations_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // ── render ──────────────────────────────────────
  return (
    <div className="coop-page">

      {/* Filter Bar */}
      <div className="coop-filter-bar">
        <div className="coop-filters">
          <div className="coop-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="coop-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="coop-filter-group wide">
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
          className="coop-search-btn"
          onClick={() => fetchRows()}
          aria-label="Search"
        >
          🔍
        </button>
      </div>

      {/* Table */}
      <div className="coop-table-wrapper">
        {loading ? (
          <div className="coop-state-msg">Loading...</div>
        ) : error ? (
          <div className="coop-state-msg coop-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="coop-state-msg">कुनै पेन्डिङ रेकर्ड भेटिएन।</div>
        ) : (
          <div className="coop-scroll">
            <table className="coop-table">
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
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td data-label="क्र.स.">{index + 1}</td>
                    <td data-label="दर्ता मिति">{row.date || "-"}</td>
                    <td data-label="प्रस्तावित संस्था नाम">{row.proposalName || "-"}</td>
                    <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                    <td data-label="उद्देश्य" className="ellipsis">
                      {(row.purpose || "-").slice(0, 40)}
                    </td>
                    <td data-label="मुख्य कार्य" className="ellipsis">
                      {(row.activities || "-").slice(0, 40)}
                    </td>
                    <td data-label="प्राप्त सेयर">{row.totalShareCapital || "-"}</td>
                    <td data-label="प्राप्त प्रवेश शुल्क">{row.entranceFee || "-"}</td>

                    {/* Status — always pending on this page */}
                    <td data-label="स्थिति" className="center-cell">
                      <span className="coop-pending-badge">— पेन्डिङ</span>
                    </td>

                    {/* 👁 Print Preview */}
                    <td data-label="स्क्यान" className="center-cell">
                      <button
                        className="eye-btn"
                        onClick={() => setPreviewRow(row)}
                        title="प्रिन्ट पूर्वावलोकन"
                      >
                        👁
                      </button>
                    </td>

                    {/* Approve / Reject / Edit */}
                    <td data-label="कार्य" className="center-cell action-cell">
                      <button
                        className="status-btn ok"
                        disabled={processingId === row.id}
                        onClick={() => updateStatus(row.id, STATUS.APPROVED)}
                        title="Approve"
                      >
                        ✔
                      </button>
                      <button
                        className="status-btn cancel"
                        disabled={processingId === row.id}
                        onClick={() => updateStatus(row.id, STATUS.REJECTED)}
                        title="Reject"
                      >
                        ✖
                      </button>
                      <button
                        className="edit-btn"
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

      {/* Export / Print */}
      <div className="coop-bottom-bar">
        <button onClick={handleExport} className="coop-export-btn">
          📥 Export CSV
        </button>
        <button onClick={() => window.print()} className="coop-print-btn">
          🖨 Print
        </button>
      </div>

      <footer className="coop-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>

      {/* Print Preview Modal */}
      {previewRow && (
        <PrintPreviewModal
          row={previewRow}
          onClose={() => setPreviewRow(null)}
        />
      )}

      {/* Edit Modal */}
      {editing && editRow && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Registration</h3>
            <div className="modal-grid">
              <label>Organization Name</label>
              <input
                name="proposalName"
                value={editRow.proposalName}
                onChange={handleEditChange}
              />

              <label>Date</label>
              <input
                name="date"
                type="date"
                value={editRow.date?.slice(0, 10) ?? ""}
                onChange={handleEditChange}
              />

              <label>Ward No</label>
              <input
                name="wardNo"
                value={editRow.wardNo}
                onChange={handleEditChange}
              />

              <label>Head Office / Address</label>
              <input
                name="headOffice"
                value={editRow.headOffice}
                onChange={handleEditChange}
              />

              <label>Purpose</label>
              <textarea
                name="purpose"
                value={editRow.purpose}
                onChange={handleEditChange}
              />

              <label>Activities</label>
              <textarea
                name="activities"
                value={editRow.activities}
                onChange={handleEditChange}
              />

              <label>Total Share Capital</label>
              <input
                name="totalShareCapital"
                value={editRow.totalShareCapital}
                onChange={handleEditChange}
              />

              <label>Entrance Fee</label>
              <input
                name="entranceFee"
                value={editRow.entranceFee}
                onChange={handleEditChange}
              />

              <label>Applicant Name</label>
              <input
                name="applicantName"
                value={editRow.applicantName}
                onChange={handleEditChange}
              />

              <label>Applicant Phone</label>
              <input
                name="applicantPhone"
                value={editRow.applicantPhone}
                onChange={handleEditChange}
              />

              <label>Recommendation Note</label>
              <textarea
                name="recommendation_note"
                value={editRow.recommendation_note}
                onChange={handleEditChange}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <button onClick={saveEdit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={closeEdit} style={{ marginLeft: 8 }}>
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