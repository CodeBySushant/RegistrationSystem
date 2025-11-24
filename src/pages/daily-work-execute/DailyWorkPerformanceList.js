import React, { useState } from 'react';
import './DailyWorkPerformanceList.css';

// Dummy data for now
const initialDummyData = [
  { id: 1, date: '२०८२-०८-०६', totalForms: 12, totalAmount: '१५,०००', department: 'वडा नं. १', task: 'सिफारिस' },
  { id: 2, date: '२०८२-०८-०५', totalForms: 8, totalAmount: '८,५००', department: 'राजस्व', task: 'कर संकलन' },
  { id: 3, date: '२०८२-०८-०४', totalForms: 15, totalAmount: '२२,०००', department: 'योजना', task: 'सम्झौता' },
];

const DailyWorkPerformanceList = () => {
  const [data] = useState(initialDummyData); // FIXED: Removed unused setData
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSearch = () => {
    console.log('Searching from:', fromDate, 'to:', toDate);
  };

  const handleAddRecord = () => {
    console.log('Add New Record button clicked');
    alert('नयाँ रेकर्ड थप्ने कार्यन्वयन हुन बाँकी छ।');
  };

  const handleExcelExport = () => {
    console.log('Excel Export button clicked');
    alert('एक्सेल निर्यात कार्यन्वयन हुन बाँकी छ।');
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="daily-work-container">

      {/* --- Top Bar --- */}
      <div className="top-bar-header">
        <h1>दैनिक कार्य सम्पादनका सूचीहरू ।</h1>
        <button className="back-button" onClick={handleBack}>← Back</button>
      </div>

      {/* --- Actions Bar --- */}
      <div className="actions-bar">
        <button className="excel-export-btn" onClick={handleExcelExport}>एक्सेल निर्यात</button>
        <button className="add-record-btn" onClick={handleAddRecord}>+ नयाँ रेकर्ड थप्नुहोस</button>
      </div>

      {/* --- Search Filter Bar --- */}
      <div className="search-filter-bar">
        <div className="date-input-group">
          <input 
            type="text"
            placeholder="मिति देखि"
            className="filter-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="date-input-group">
          <input 
            type="text"
            placeholder="मिति सम्म"
            className="filter-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* --- Data Table --- */}
      <div className="data-table-container">
        <table className="performance-table">
          <thead>
            <tr>
              <th>मिति</th>
              <th>कुल फारम</th>
              <th>कुल रकम रू</th>
              <th>वडा नं / विभाग</th>
              <th>कार्य</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.totalForms}</td>
                <td>{item.totalAmount}</td>
                <td>{item.department}</td>
                <td>{item.task}</td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  कुनै तथ्याङ्क फेला परेन।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>

    </div>
  );
};

export default DailyWorkPerformanceList;
