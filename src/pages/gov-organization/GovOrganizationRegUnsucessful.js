// 3
import React from "react";
import "./GovOrganizationRegUnsuccessful.css";

const rejectedList = [
  {
    sn: 1,
    regDate: "२०७८-०३-१०",
    proposedName: "---------",
    address: "----------, वडा नं. १",
    purpose: "---------",
    mainWork: "---------",
    share: "---------",
    entryFee: "---------",
    rejectReason: "mistake",
  },
];

function App() {
  return (
    <div className="rej-page">
      {/* Top heading + back */}
      <header className="rej-header">
        <div className="rej-title">सहकारी संस्था दर्ता अस्वीकृत सूची ।</div>
        <a href="#back" className="rej-back">
          ← Back
        </a>
      </header>

      {/* Buttons row */}
      <div className="rej-btn-row">
        <button className="rej-primary-btn">एक्सेल निर्यात गर्नुहोस्</button>
        <button className="rej-primary-btn">प्रिन्ट गर्नुहोस्</button>
      </div>

      {/* Filter bar */}
      <div className="rej-filter-bar">
        <div className="rej-filters">
          <div className="rej-filter-group">
            <label>मिति देखि</label>
            <input type="text" />
          </div>
          <div className="rej-filter-group">
            <label>मिति सम्म</label>
            <input type="text" />
          </div>
          <div className="rej-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input type="text" />
          </div>
        </div>
        <button className="rej-search-btn" aria-label="Search">
          🔍
        </button>
      </div>

      {/* Table */}
      <div className="rej-table-wrapper">
        <table className="rej-table">
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
            {rejectedList.map((row) => (
              <tr key={row.sn}>
                <td>{row.sn}</td>
                <td>{row.regDate}</td>
                <td>{row.proposedName}</td>
                <td>{row.address}</td>
                <td>{row.purpose}</td>
                <td>{row.mainWork}</td>
                <td>{row.share}</td>
                <td>{row.entryFee}</td>
                <td>{row.rejectReason}</td>
                <td className="rej-center">
                  <span className="rej-eye">👁</span>
                </td>
                <td className="rej-center">
                  <button className="rej-edit-btn">✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="rej-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default App;
