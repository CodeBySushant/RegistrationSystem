// BusinessRegistrationRenewLeft.jsx
import React, { useEffect, useState } from "react";
import "./BusinessRegistrationRenewLeft.css";

function BusinessRegistrationRenewLeft() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/forms/business-registration-renew-left");
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      // data likely contains DB columns; map so UI fields are present
      setRows(data.map(r => ({
        id: r.id,
        sn: r.sn ?? null,
        regDate: r.regDate ?? "",
        regNo: r.regNo ?? "",
        businessOwner: r.businessOwner ?? "",
        businessName: r.businessName ?? "",
        address: r.address ?? "",
        renewalLastDate: r.renewalLastDate ?? "",
        status: r.status ?? "active",
        notes: r.notes ?? ""
      })));
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("के यो रेकर्ड पक्का मेटाउने हो?")) return;
    try {
      const res = await fetch(`/api/forms/business-registration-renew-left/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server ${res.status}`);
      }
      // remove locally
      setRows(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      alert("मेटाउन असफल भयो: " + (e.message || e));
    }
  };

  return (
    <div className="page">
      <div className="card">
        {/* Top filter bar */}
        <div className="filter-bar">
          <button className="excel-btn">एक्सेल निर्यात गर्नुहोस्</button>
          <div className="filter-inputs">
            <div className="filter-group">
              <label>मिति देखि</label>
              <input type="text" />
            </div>
            <div className="filter-group">
              <label>मिति सम्म</label>
              <input type="text" />
            </div>
            <div className="filter-group">
              <label>व्यवसायको नाम</label>
              <input type="text" />
            </div>
          </div>
          <button className="search-btn" aria-label="Search">🔍</button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          {loading ? <div>लोड हुँदैछ...</div> : null}
          {error ? <div style={{color:'red'}}>त्रुटि: {error}</div> : null}
          <table className="data-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>दर्ता मिति</th>
                <th>दर्ता नं</th>
                <th>व्यवसायीको नाम</th>
                <th>व्यवसायको नाम</th>
                <th>व्यवसायको ठेगाना</th>
                <th>नविकरण गरिएको अन्तिम मिति</th>
                <th>नविकरण अवस्था</th>
                <th>प्रमाणपत्र प्रिन्ट</th>
                <th>कारवाही</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !loading ? (
                <tr><td colSpan="10">डेटा उपलब्ध छैन</td></tr>
              ) : null}

              {rows.map((row, idx) => (
                <tr key={row.id ?? idx} className={row.status === "closed" ? "closed-row" : ""}>
                  <td>{row.sn ?? (idx + 1)}</td>
                  <td>{row.regDate}</td>
                  <td>{row.regNo}</td>
                  <td>{row.businessOwner}</td>
                  <td>{row.businessName}</td>
                  <td>{row.address}</td>
                  <td>{row.renewalLastDate}</td>
                  <td>
                    <button className="icon-btn plus-btn">+</button>
                  </td>
                  <td>
                    <button className="icon-btn card-btn">🪪</button>
                  </td>
                  <td>
                    <button className="icon-btn delete-btn" onClick={() => handleDelete(row.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">next</button>
        </div>
      </div>

      <footer className="footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}

export default BusinessRegistrationRenewLeft;
