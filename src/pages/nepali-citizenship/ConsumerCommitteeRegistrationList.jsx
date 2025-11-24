// 5
import React, { useState } from 'react';
import './ConsumerCommitteeRegistrationList.css';

const initialData = [
  { 
    id: 1, 
    sn: '१', 
    regNo: '१/२०८१/८२', 
    committeeName: 'bsgbs', 
    regDate: '२०८१-०९-२४', 
    ownerName: 'asdf', 
    address: 'dgnd', 
    phone: 'dfgb' 
  }
];

const ConsumerCommitteeRegistrationList = () => {
  const [data] = useState(initialData);

  const handleSearch = () => {
    console.log('Search button clicked');
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="committee-list-container">
      {/* --- Header --- */}
      <div className="committee-list-header">
        <h2>उपभोक्ता संग दर्ता प्रमाणपत्र सूची</h2>
        <button className="back-link-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input type="text" placeholder="मिति देखि" className="filter-input date-field" />
        <input type="text" placeholder="मिति सम्म" className="filter-input date-field" />
        <input type="text" placeholder="उपभोक्ता समितिको नाम" className="filter-input" />
        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="committee-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>दर्ता नं.</th>
              <th>उपभोक्ता समितिको नाम</th>
              <th>दर्ता मिति</th>
              <th>दर्ता गर्नेको नाम</th>
              <th>दर्ता गर्नेको ठेगाना</th>
              <th>दर्ता गर्नेको टेलिफोन नं.</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.sn}</td>
                <td>{row.regNo}</td>
                <td>{row.committeeName}</td>
                <td>{row.regDate}</td>
                <td>{row.ownerName}</td>
                <td>{row.address}</td>
                <td>{row.phone}</td>
                <td className="text-center">
                  <span className="eye-icon">👁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-info">
             Page 1 of 1
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default ConsumerCommitteeRegistrationList;