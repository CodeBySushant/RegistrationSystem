import React, { useEffect, useState } from "react";
import "./BusinessRegRenewCompleted.css";

function BusinessRegRenewCompleted() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/forms/business-reg-renew-completed");
      const data = await res.json();
      setRows(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?")) return;
    try {
      const res = await fetch(`/api/forms/business-reg-renew-completed/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRows((prev) => prev.filter((row) => row.id !== id));
      }
    } catch (err) {
      alert("Deletion failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <div className="excel-wrapper">
          <button className="excel-btn">एक्सेल निर्यात गर्नुहोस्</button>
        </div>

        <div className="filter-bar">
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

          <button className="search-btn" aria-label="Search">
            🔍
          </button>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <div>लोड हुँदैछ...</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>दर्ता मिति</th>
                  <th>दर्ता नं</th>
                  <th>व्यवसायको नाम</th>
                  <th>व्यवसायीको नाम</th>
                  <th>व्यवसायको ठेगाना</th>
                  <th>नविकरण गरिएको अन्तिम मिति</th>
                  <th>नविकरण अवधि</th>
                  <th>नविकरण दरखर</th>
                  <th>नविकरण भोचर</th>
                  <th>प्रिन्ट</th>
                  <th>डिलिट</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="12">डेटा उपलब्ध छैन</td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={row.id}>
                      <td>{row.sn ?? idx + 1}</td>
                      <td>{row.regDate}</td>
                      <td>{row.regNo}</td>
                      <td>{row.businessName}</td>
                      <td>{row.ownerName}</td>
                      <td>{row.address}</td>
                      <td>{row.lastRenewalDate}</td>
                      <td>{row.renewalPeriod}</td>
                      <td>{row.renewalRate}</td>
                      <td>{row.renewalVoucher}</td>

                      <td>
                        <button className="icon-btn card-btn">🪪</button>
                      </td>

                      <td>
                        <button
                          className="icon-btn delete-btn"
                          onClick={() => handleDelete(row.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <footer className="footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default BusinessRegRenewCompleted;
