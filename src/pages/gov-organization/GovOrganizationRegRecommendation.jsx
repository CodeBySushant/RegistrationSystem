// 2
import React from "react";
import "./GovOrganizationRegRecommendation.css";

const cooperatives = [
  {
    sn: 1,
    regDate: "२०७८-०३-२२",
    name: "vbb",
    address: "hgfh, वडा नं. fgtd",
    purpose: "fh",
    mainWork: "fh",
    receivedShare: "fh",
    receivedEntryFee: "fh",
    status: true
  },
  {
    sn: 2,
    regDate: "२०७८-०४-१५",
    name: "Colt Pugh",
    address: "Clarke and Flynn Traders, वडा नं. Kirk and Hewitt LLC",
    purpose: "Cupiditate laudantiu",
    mainWork: "Est inventore quae",
    receivedShare: "Nisi commodi consequ",
    receivedEntryFee: "Tempore perspiciati",
    status: true
  }
];

function App() {
  return (
    <div className="coop-page">
      {/* Top filter bar */}
      <div className="coop-filter-bar">
        <div className="coop-filters">
          <div className="coop-filter-group">
            <label>मिति देखि</label>
            <input type="text" />
          </div>
          <div className="coop-filter-group">
            <label>मिति सम्म</label>
            <input type="text" />
          </div>
          <div className="coop-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input type="text" />
          </div>
        </div>
        <button className="coop-search-btn" aria-label="Search">
          🔍
        </button>
      </div>

      {/* Table */}
      <div className="coop-table-wrapper">
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
              <th>सम्मान</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {cooperatives.map((row, index) => (
              <tr key={row.sn} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{row.sn}</td>
                <td>{row.regDate}</td>
                <td>{row.name}</td>
                <td>{row.address}</td>
                <td>{row.purpose}</td>
                <td>{row.mainWork}</td>
                <td>{row.receivedShare}</td>
                <td>{row.receivedEntryFee}</td>
                <td className="center-cell">
                  <span className="eye-icon">👁</span>
                </td>
                <td className="center-cell action-cell">
                  <button className="status-btn ok">✔</button>
                  <button className="status-btn cancel">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="coop-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default App;
