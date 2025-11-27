import React, { useState } from 'react';
import './SuchanaDetailList.css';
// 4
// Dummy data for the list structure
const initialData = [
  // No data visible in the screenshot, so providing structure
  /*
  { 
    id: 1, 
    sn: '१', 
    noticeNo: '१२-०८-०६', 
    issueDate: '२०८२-०८-०६', 
    approveDate: '२०८२-०८-०८', 
    type: 'आर्थिक', 
    purpose: 'भुक्तानी', 
    subject: 'रकम निकासा', 
    location: 'वडा नं १', 
    action: true 
  },
  */
];

const NoticeDetailList = () => {
  const [data] = useState(initialData);

  const handleSearch = () => {
    // Implement search logic based on date range and notice number
    console.log('Searching notices...');
  };

  const handleExcelExport = () => {
    console.log('Exporting to Excel...');
  };
  
  const handlePrint = () => {
    console.log('Printing list...');
  };

  const handleAddRecord = () => {
    console.log('Adding new record...');
  };

  return (
    <div className="notice-list-container">
      {/* --- Top Header --- */}
      <div className="list-header">
        <h2>सूचनाको सूची ।</h2>
        <button className="back-link-btn">← Back</button>
      </div>

      {/* --- Action Buttons --- */}
      <div className="action-buttons-row">
        <button className="action-btn excel-btn" onClick={handleExcelExport}>एक्सेल निर्यात गर्नुहोस्</button>
        <button className="action-btn print-btn" onClick={handlePrint}>प्रिन्ट गर्नुहोस्</button>
        <button className="add-record-btn" onClick={handleAddRecord}>+ नयाँ रेकर्ड थप्नुहोस</button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="search-filter-bar">
        <div className="filter-group date-group">
          <input type="text" placeholder="मिति देखि" className="filter-input date-field" />
          <label className="input-label">मिति देखि</label>
        </div>

        <div className="filter-group date-group">
          <input type="text" placeholder="मिति सम्म" className="filter-input date-field" />
          <label className="input-label">मिति सम्म</label>
        </div>
        
        <div className="filter-group text-group">
          <input type="text" placeholder="सूचना नं." className="filter-input text-field" />
          <label className="input-label">सूचना नं.</label>
        </div>

        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="notice-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>सूचना नं.</th>
              <th>सूचना मिति</th>
              <th>सूचना मान्य मिति</th>
              <th>किसिम</th>
              <th>प्रयोजन</th>
              <th>विषय</th>
              <th>स्थान</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '100px' }}>
                  कुनै सूचना फेला परेन।
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.sn}</td>
                  <td>{row.noticeNo}</td>
                  <td>{row.issueDate}</td>
                  <td>{row.approveDate}</td>
                  <td>{row.type}</td>
                  <td>{row.purpose}</td>
                  <td>{row.subject}</td>
                  <td>{row.location}</td>
                  <td className="text-center">
                    <span className="eye-icon">👁</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default NoticeDetailList;