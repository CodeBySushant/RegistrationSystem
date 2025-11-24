import React from "react";
import "./BusinessRegRenewCompleted.css";

const tableData = [
  {
    sn: 1,
    regDate: "२०७८-०३-२६",
    regNo: "५८/०७८/७९",
    businessName: "Maisie Moran",
    ownerName: "Keiko Fuller",
    address: "Driscoll Hubbard, वडा नं 705",
    lastRenewalDate: "२०७८-०५-१०",
    renewalPeriod: "a",
    renewalRate: "a",
    renewalVoucher: "a",
  },
];

function App() {
  return (
    <div className="page">
      <div className="card">
        {/* Excel button */}
        <div className="excel-wrapper">
          <button className="excel-btn">एक्सेल निर्यात गर्नुहोस्</button>
        </div>

        {/* Top filter bar */}
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

        {/* Table */}
        <div className="table-wrapper">
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
                <th>प्रमाणपत्र प्रिन्ट</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.sn}>
                  <td>{row.sn}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default App;
