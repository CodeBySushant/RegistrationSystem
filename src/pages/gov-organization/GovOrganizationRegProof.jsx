// 4
import React from "react";
import "./GovOrganizationRegProof.css";

const proofData = [
  {
    sn: 1,
    regNo: "८/०७९/८०",
    regDate: "२०७८-०२-२६",
    orgName: "-",
    address: ", वडा नं.",
    category: "--",
    workArea: "-",
  },
  {
    sn: 2,
    regNo: "८/०७९/८०",
    regDate: "२०७८-०२-२६",
    orgName: "Nita Rocha",
    address: ", वडा नं.",
    category: "Amet sunt autem eni",
    workArea: "Dignissimos sed magn",
  },
];

function GovOrganizationRegProof() {
  return (
    <div className="gov-proof-page">
      {/* Header with title + back */}
      <header className="gov-proof-header">
        <div className="gov-proof-title">
          सहकारी संस्था दर्ता प्रमाण-पत्र सूची।
        </div>
        <a href="#back" className="gov-proof-back">
          ← Back
        </a>
      </header>

      {/* Top buttons */}
      <div className="gov-proof-btn-row">
        <button className="gov-proof-btn">एक्सेल निर्यात गर्नुहोस्</button>
        <button className="gov-proof-btn">प्रिन्ट गर्नुहोस्</button>
      </div>

      {/* Filter bar */}
      <div className="gov-proof-filter-bar">
        <div className="gov-proof-filters">
          <div className="gov-proof-filter-group">
            <label>मिति देखि</label>
            <input type="text" />
          </div>
          <div className="gov-proof-filter-group">
            <label>मिति सम्म</label>
            <input type="text" />
          </div>
          <div className="gov-proof-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input type="text" />
          </div>
        </div>
        <button className="gov-proof-search-btn" aria-label="Search">
          🔍
        </button>
      </div>

      {/* Table */}
      <div className="gov-proof-table-wrapper">
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
            {proofData.map((row, index) => (
              <tr
                key={row.sn}
                className={index % 2 === 0 ? "gov-proof-even" : "gov-proof-odd"}
              >
                <td>{row.sn}</td>
                <td>{row.regNo}</td>
                <td>{row.regDate}</td>
                <td>{row.orgName}</td>
                <td>{row.address}</td>
                <td>{row.category}</td>
                <td>{row.workArea}</td>
                <td className="gov-proof-center">
                  <span className="gov-proof-eye">👁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="gov-proof-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default GovOrganizationRegProof;
