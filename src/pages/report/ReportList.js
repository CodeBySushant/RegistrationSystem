import React, { useState } from 'react';
import './ReportList.css';
// 2
const ReportList = () => {
  const [fromDate, setFromDate] = useState('२०८२-०८-०६');
  const [toDate, setToDate] = useState('२०८२-०८-०६');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const handleSearch = () => {
    console.log('Searching:', { fromDate, toDate, category, subCategory });
  };

  const handleBack = () => {
    console.log('Back clicked');
    // navigate(-1);
  };

  return (
    <div className="report-list-container">
      {/* --- Header --- */}
      <div className="page-header">
        <h2>कोटि रिपोर्ट खोजी</h2>
        <button className="back-link" onClick={handleBack}>
           <span>⬅</span> Back
        </button>
      </div>

      {/* --- Search Filter Bar --- */}
      <div className="search-bar-wrapper">
        <div className="search-inputs">
          <input 
            type="text" 
            className="search-field" 
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input 
            type="text" 
            className="search-field" 
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <select 
            className="search-field dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">कोटि छनौट गर्नुहोस्</option>
            <option value="social">सामाजिक</option>
            <option value="economic">आर्थिक</option>
          </select>
          <select 
            className="search-field dropdown"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">उप कोटि छनौट गर्नुहोस्</option>
            <option value="1">सिफारिस</option>
            <option value="2">दर्ता</option>
          </select>
        </div>
        
        <button className="search-submit-btn" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {/* --- Gray Content Placeholder --- */}
      <div className="content-placeholder">
        {/* This area is empty gray in the design, likely for results list */}
      </div>

      {/* --- Footer --- */}
      <div className="page-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default ReportList;