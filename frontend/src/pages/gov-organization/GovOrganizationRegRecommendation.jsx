import React, { useEffect, useState } from "react";
import "./GovOrganizationRegRecommendation.css";

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
  "recommendation_note"
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

  // modal/edit state
  const [editing, setEditing] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [saving, setSaving] = useState(false);

  // fetch
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/forms/gov-organization-registration");
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setRows(data || []);
      setFiltered(data || []);
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

  // client-side filters
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
    if (fromDate) out = out.filter((r) => (r.date ? r.date.slice(0, 10) >= fromDate : false));
    if (toDate) out = out.filter((r) => (r.date ? r.date.slice(0, 10) <= toDate : false));
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  // open edit modal (prefill)
  const openEdit = (row) => {
    // clone only editable properties to avoid accidental changes
    const copy = {};
    editableFields.forEach((k) => { copy[k] = row[k] ?? ""; });
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

  // Save edited row to server using your generic PUT route
  const saveEdit = async () => {
    if (!editRow || !editRow.id) return;
    // basic validation
    if (!editRow.proposalName || editRow.proposalName.trim() === "") {
      alert("Proposal / Organization name is required.");
      return;
    }
    setSaving(true);
    try {
      // build payload only with editable keys (so generic controller can map)
      const payload = {};
      editableFields.forEach((k) => {
        // include keys that exist in editRow (even empty strings) so DB updates them to NULL/'' if needed
        payload[k] = editRow[k] === "" ? null : editRow[k];
      });

      const res = await fetch(`/api/forms/gov-organization-registration/${editRow.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const js = await res.json().catch(() => null);
        throw new Error(js?.message || `Server returned ${res.status}`);
      }

      // optimistic local update — merge returned affected rows, but generic controller returns {affectedRows}
      setRows((prev) => prev.map((r) => (r.id === editRow.id ? { ...r, ...payload } : r)));
      setFiltered((prev) => prev.map((r) => (r.id === editRow.id ? { ...r, ...payload } : r)));

      alert("Saved successfully.");
      closeEdit();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save: " + (err.message || ""));
    } finally {
      setSaving(false);
    }
  };

  // quick set approval/reject (same as previous updateStatus but uses edit modal-free API)
  const updateStatus = async (id, newStatus) => {
    if (!id) return;
    setProcessingId(id);
    try {
      const res = await fetch(`/api/forms/gov-organization-registration/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `Server returned ${res.status}`);
      }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
      setFiltered((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    } catch (err) {
      console.error(err);
      alert("Failed to update status: " + (err.message || ""));
    } finally {
      setProcessingId(null);
    }
  };

  // CSV export (same as before)
  const toCSV = (rs) => {
    if (!rs || !rs.length) return "";
    const header = ["sn", "regDate", "name", "address", "purpose", "mainWork", "receivedShare", "receivedEntryFee", "status"];
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
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coop_recommendations_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  return (
    <div className="coop-page">
      <div className="coop-filter-bar">
        <div className="coop-filters">
          <div className="coop-filter-group">
            <label>मिति देखि</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="coop-filter-group">
            <label>मिति सम्म</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="coop-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="नाम/आवेदक खोज्नुहोस्" />
          </div>
        </div>
        <button className="coop-search-btn" onClick={() => fetchRows()} aria-label="Search">🔍</button>
      </div>

      <div className="coop-table-wrapper">
        {loading ? (
          <div style={{ padding: 24 }}>Loading...</div>
        ) : error ? (
          <div style={{ padding: 24, color: "crimson" }}>{error}</div>
        ) : (
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
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, index) => (
                <tr key={row.id || index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{index + 1}</td>
                  <td>{row.date || "-"}</td>
                  <td>{row.proposalName || "-"}</td>
                  <td>{row.headOffice || "-"}</td>
                  <td className="ellipsis">{(row.purpose || "-").slice(0, 40)}</td>
                  <td className="ellipsis">{(row.activities || "-").slice(0, 40)}</td>
                  <td>{row.totalShareCapital || "-"}</td>
                  <td>{row.entranceFee || "-"}</td>
                  <td className="center-cell">
                    {(row.status || STATUS.PENDING) === STATUS.APPROVED ? "✔" : (row.status === STATUS.REJECTED ? "✖" : "—")}
                  </td>
                  <td className="center-cell action-cell">
                    <button className="status-btn ok" disabled={processingId === row.id} onClick={() => updateStatus(row.id, STATUS.APPROVED)}>✔</button>
                    <button className="status-btn cancel" disabled={processingId === row.id} onClick={() => updateStatus(row.id, STATUS.REJECTED)}>✖</button>
                    <button onClick={() => openEdit(row)}>✎ Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ padding: 12 }}>
        <button onClick={handleExport} className="coop-export-btn">Export CSV</button>
        <button onClick={handlePrint} className="coop-print-btn">Print</button>
      </div>

      <footer className="coop-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>

      {/* Edit Modal */}
      {editing && editRow && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Registration</h3>

            <div className="modal-grid">
              <label>Organization Name</label>
              <input name="proposalName" value={editRow.proposalName} onChange={handleEditChange} />

              <label>Date</label>
              <input name="date" type="date" value={editRow.date?.slice(0,10) ?? ""} onChange={handleEditChange} />

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

              <label>Status</label>
              <select name="status" value={editRow.status || STATUS.PENDING} onChange={handleEditChange}>
                <option value={STATUS.PENDING}>Pending</option>
                <option value={STATUS.APPROVED}>Approved</option>
                <option value={STATUS.REJECTED}>Rejected</option>
              </select>

              <label>Recommendation Note</label>
              <textarea name="recommendation_note" value={editRow.recommendation_note} onChange={handleEditChange} />
            </div>

            <div style={{ marginTop: 12 }}>
              <button onClick={saveEdit} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              <button onClick={closeEdit} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovOrganizationRegRecommendation;
