// 4
import React from "react";
import "./BusinessRegistrationRenewLeft.css";

const tableData = [
  {
    sn: 1,
    regDate: "२०७९-०२-१६",
    regNo: "१८/०८/८२",
    businessOwner: "John Kirby",
    businessName: "Abel Mcbride",
    address: "Ifeoma Ayala, वडा नं ६९६",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 2,
    regDate: "२०७८-०२-२३",
    regNo: "८/०८/८२",
    businessOwner: "निर्देशक",
    businessName: "निर्देशक",
    address: "निर्देशक, वडा नं १२",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 3,
    regDate: "२०७८-०२-२३",
    regNo: "८/०८/८२",
    businessOwner: "निर्देशक",
    businessName: "निर्देशक",
    address: "निर्देशक, वडा नं निर्देश",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 4,
    regDate: "२०७८-०२-२३",
    regNo: "१३/०८/८२",
    businessOwner: "नववेअवेबकनमन",
    businessName: "राम बहादुर राना",
    address: "कफन, वडा नं कफन",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 5,
    regDate: "२०७८-०२-३०",
    regNo: "२४/०८/८२",
    businessOwner: "युनिक",
    businessName: "ऐन बहादुर रोकाया",
    address: "८, वडा नं ८",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 6,
    regDate: "२०७८-०२-२३",
    regNo: "१४/०८/८२",
    businessOwner: "--",
    businessName: "--",
    address: "-, वडा नं -",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 7,
    regDate: "२०७८-०२-२३",
    regNo: "५/०८/८२",
    businessOwner: "सुन्दर किशन पसल",
    businessName: "रमेश यादव",
    address: "पुष्प पथ, वडा नं २",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 8,
    regDate: "२०७८-१२-२८",
    regNo: "३/०८/८२",
    businessOwner: "a",
    businessName: "a",
    address: "a, वडा नं १",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 9,
    regDate: "२०७८-१२-१६",
    regNo: "४/०८/८२",
    businessOwner: "मनोज केश फर्म",
    businessName: "मनोज श्रेष्ठ",
    address: "गौतम, वडा नं ०२",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
  {
    sn: 10,
    regDate: "२०७८-१२-२३",
    regNo: "१०/०८/८२",
    businessOwner: "1",
    businessName: "11",
    address: "1, वडा नं 1",
    renewalLastDate: "नविकरण गर्न बाकी !",
  },
];

function App() {
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
                <th>व्यवसायीको नाम</th>
                <th>व्यवसायको नाम</th>
                <th>व्यवसायको ठेगाना</th>
                <th>नविकरण गरिएको अन्तिम मिति</th>
                <th>नविकरण अवस्था</th>
                <th>प्रमाणपत्र प्रिन्ट</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.sn}>
                  <td>{row.sn}</td>
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

      <footer className="footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default App;
