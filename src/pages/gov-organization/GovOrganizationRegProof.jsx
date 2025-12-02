import React, { useEffect, useState } from "react";
import "./GovOrganizationRegProof.css";

function formatDate(d) {
  if (!d) return "";
  // try to show YYYY-MM-DD if backend returned an AD date; otherwise show raw
  return String(d).slice(0, 10);
}

function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const header = Object.keys(rows[0]);
  const csv = [header.join(",")].concat(
    rows.map((r) =>
      header
        .map((h) => {
          const v = r[h] == null ? "" : String(r[h]);
          // escape quotes and commas
          return `"${v.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
  );
  return csv.join("\r\n");
}

const GovOrganizationRegProof = () => {
  const [rows, setRows] = useState([]); // raw rows from server
  const [filtered, setFiltered] = useState([]); // view after filters
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all rows from generic endpoint (server-side pagination would be better for large data)
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/forms/gov-organization-registration");
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      // data is expected to be an array of DB rows
      setRows(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data. Check server or network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  // client-side filtering; you can implement server-side filters by adding query params
  useEffect(() => {
    let out = [...rows];

    // filter by name (case-insensitive substring)
    if (searchName.trim() !== "") {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          (r.proposalName && String(r.proposalName).toLowerCase().includes(q)) ||
          (r.applicantName && String(r.applicantName).toLowerCase().includes(q)) ||
          (r.headOffice && String(r.headOffice).toLowerCase().includes(q))
      );
    }

    // filter by date range — note: `date` column may be BS string or AD date string
    if (fromDate) {
      out = out.filter((r) => {
        const d = r.date ? String(r.date).slice(0, 10) : "";
        return d ? d >= fromDate : false;
      });
    }
    if (toDate) {
      out = out.filter((r) => {
        const d = r.date ? String(r.date).slice(0, 10) : "";
        return d ? d <= toDate : false;
      });
    }

    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  const handleExport = () => {
    const csv = toCSV(
      filtered.map((r) => ({
        sn: r.id,
        regNo: r.refNo || "",
        regDate: r.date || "",
        orgName: r.proposalName || "",
        address: r.headOffice || "",
        category: r.purpose || "",
        workArea: r.activities || "",
      }))
    );
    if (!csv) {
      alert("No rows to export");
      return;
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gov_org_registration_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const openRow = (row) => {
    setSelected(row);
    setShowModal(true);
  };

  return (
    <div className="gov-proof-page">
      <header className="gov-proof-header">
        <div className="gov-proof-title">सहकारी संस्था दर्ता प्रमाण-पत्र सूची।</div>
        <a href="#back" className="gov-proof-back" onClick={(e) => e.preventDefault()}>
          ← Back
        </a>
      </header>

      <div className="gov-proof-btn-row">
        <button className="gov-proof-btn" onClick={handleExport} disabled={loading || !filtered.length}>
          एक्सेल निर्यात गर्नुहोस्
        </button>
        <button className="gov-proof-btn" onClick={handlePrint} disabled={loading}>
          प्रिन्ट गर्नुहोस्
        </button>
      </div>

      <div className="gov-proof-filter-bar">
        <div className="gov-proof-filters">
          <div className="gov-proof-filter-group">
            <label>मिति देखि</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="gov-proof-filter-group">
            <label>मिति सम्म</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="gov-proof-filter-group wide">
            <label>सहकारी संस्थाको नाम / आवेदक</label>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="नाम खोज्नुहोस्" />
          </div>
        </div>
        <button
          className="gov-proof-search-btn"
          aria-label="Search"
          onClick={() => {
            // For now filters are applied automatically; this button can trigger server-side fetch if implemented
            // Example of server-side filter call is shown in the notes below
            if (!fromDate && !toDate && !searchName) {
              fetchRows();
            } else {
              // client filters already applied via useEffect
              // show a quick toast
              // no-op
            }
          }}
        >
          🔍
        </button>
      </div>

      <div className="gov-proof-table-wrapper">
        {loading ? (
          <div style={{ padding: 24 }}>Loading...</div>
        ) : error ? (
          <div style={{ padding: 24, color: "crimson" }}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 24 }}>No records found.</div>
        ) : (
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
                <tr key={row.id || index} className={index % 2 === 0 ? "gov-proof-even" : "gov-proof-odd"}>
                  <td>{index + 1}</td>
                  <td>{row.refNo || "-"}</td>
                  <td>{formatDate(row.date)}</td>
                  <td>{row.proposalName || "-"}</td>
                  <td>{row.headOffice || "-"}</td>
                  <td className="gov-proof-ellipsis">{(row.purpose || "-").slice(0, 40)}</td>
                  <td className="gov-proof-ellipsis">{(row.activities || "-").slice(0, 40)}</td>
                  <td className="gov-proof-center">
                    <button className="gov-proof-view" onClick={() => openRow(row)} title="View">
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="gov-proof-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>

      {/* Simple modal */}
      {showModal && selected && (
        <div className="gov-proof-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="gov-proof-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Record Details</h3>
            <div><strong>ID:</strong> {selected.id}</div>
            <div><strong>Registration No:</strong> {selected.refNo}</div>
            <div><strong>Date:</strong> {selected.date}</div>
            <div><strong>Organization:</strong> {selected.proposalName}</div>
            <div><strong>Address:</strong> {selected.headOffice}</div>
            <div><strong>Purpose:</strong> {selected.purpose}</div>
            <div><strong>Activities:</strong> {selected.activities}</div>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovOrganizationRegProof;
