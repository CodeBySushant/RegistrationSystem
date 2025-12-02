// GovOrganizationRegUnsuccessful.jsx
import React, { useEffect, useState, useRef } from "react";
import "./GovOrganizationRegUnsuccessful.css";

function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")].concat(
    rows.map(r =>
      headers
        .map(h => {
          const raw = r[h] == null ? "" : String(r[h]);
          return `"${raw.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
  );
  return lines.join("\r\n");
}

const GovOrganizationRegUnsuccessful = () => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const abortRef = useRef(null);

  const fetchRows = async () => {
    setLoading(true);
    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/forms/gov-organization-registration-rejected", { signal: ac.signal });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.name !== "AbortError") console.error("Fetch error", e);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    fetchRows();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  useEffect(() => {
    let out = [...rows];
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        r =>
          (r.proposedName && String(r.proposedName).toLowerCase().includes(q)) ||
          (r.address && String(r.address).toLowerCase().includes(q))
      );
    }
    if (fromDate) {
      out = out.filter(r => {
        const d = r.regDate ? String(r.regDate).slice(0, 10) : "";
        return d ? d >= fromDate : false;
      });
    }
    if (toDate) {
      out = out.filter(r => {
        const d = r.regDate ? String(r.regDate).slice(0, 10) : "";
        return d ? d <= toDate : false;
      });
    }
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  const handleExport = () => {
    const csvRows = filtered.map(r => ({
      sn: r.sn,
      regDate: r.regDate,
      proposedName: r.proposedName,
      address: r.address,
      purpose: r.purpose,
      mainWork: r.mainWork,
      share: r.share,
      entryFee: r.entryFee,
      rejectReason: r.rejectReason
    }));
    const csv = toCSV(csvRows);
    if (!csv) { alert("No rows to export"); return; }
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gov_reg_rejected_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const openRow = (row) => { setSelected(row); setShowModal(true); };
  const onEdit = (row) => {
    // placeholder: navigate to edit page or open edit modal
    // e.g. navigate(`/gov-organization/edit/${row.id}`)
    console.log("edit", row);
    alert("Edit pressed for sn: " + row.sn);
  };

  return (
    <div className="rej-page">
      <header className="rej-header">
        <div className="rej-title">सहकारी संस्था दर्ता अस्वीकृत सूची ।</div>
        <a href="#back" className="rej-back" onClick={(e) => e.preventDefault()}>← Back</a>
      </header>

      <div className="rej-btn-row">
        <button className="rej-primary-btn" onClick={handleExport} disabled={loading || filtered.length===0}>एक्सेल निर्यात गर्नुहोस्</button>
        <button className="rej-primary-btn" onClick={handlePrint} disabled={loading}>प्रिन्ट गर्नुहोस्</button>
      </div>

      <div className="rej-filter-bar">
        <div className="rej-filters">
          <div className="rej-filter-group">
            <label>मिति देखि</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="rej-filter-group">
            <label>मिति सम्म</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="rej-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="नाम खोज्नुहोस्" />
          </div>
        </div>
        <button className="rej-search-btn" aria-label="Search" onClick={() => { /* client filtering is live */ }}>
          🔍
        </button>
      </div>

      <div className="rej-table-wrapper">
        {loading ? (
          <div style={{ padding: 24 }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 24 }}>No records found.</div>
        ) : (
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
                <th>स्वमान</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr key={row.id || row.sn || idx}>
                  <td>{row.sn || idx + 1}</td>
                  <td>{String(row.regDate || "").slice(0,10)}</td>
                  <td>{row.proposedName || "-"}</td>
                  <td>{row.address || "-"}</td>
                  <td>{row.purpose || "-"}</td>
                  <td>{row.mainWork || "-"}</td>
                  <td>{row.share || "-"}</td>
                  <td>{row.entryFee || "-"}</td>
                  <td>{row.rejectReason || "-"}</td>
                  <td className="rej-center"><button className="rej-eye" onClick={() => openRow(row)} aria-label="View">👁</button></td>
                  <td className="rej-center"><button className="rej-edit-btn" onClick={() => onEdit(row)} aria-label="Edit">✎</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="rej-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>

      {showModal && selected && (
        <div className="rej-modal-overlay" onClick={() => setShowModal(false)} role="dialog" aria-modal="true">
          <div className="rej-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Details</h3>
            <div><strong>SN:</strong> {selected.sn}</div>
            <div><strong>Registration Date:</strong> {selected.regDate}</div>
            <div><strong>Proposed Name:</strong> {selected.proposedName}</div>
            <div><strong>Address:</strong> {selected.address}</div>
            <div><strong>Purpose:</strong> {selected.purpose}</div>
            <div><strong>Main Work:</strong> {selected.mainWork}</div>
            <div><strong>Share:</strong> {selected.share}</div>
            <div><strong>Entry Fee:</strong> {selected.entryFee}</div>
            <div><strong>Reject Reason:</strong> {selected.rejectReason}</div>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovOrganizationRegUnsuccessful;
