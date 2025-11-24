import React, { useState } from 'react';
import './CategoryReportSearch.css';
// 1
const CategoryReportSearch = () => {
  // State for form fields
  const [fromDate, setFromDate] = useState('२०८२-०८-०६');
  const [toDate, setToDate] = useState('२०८२-०८-०६');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const handleSearch = () => {
    console.log('Searching with:', { fromDate, toDate, category, subCategory, selectAll });
    // Add your API search logic here
  };

  const handleBack = () => {
    console.log('Back clicked');
    // navigate(-1);
  };

  return (
    <div className="report-page-container">
      {/* --- Header --- */}
      <div className="report-header">
        <h2>कोटि रिपोर्ट खोजी</h2>
        <button className="back-btn" onClick={handleBack}>
           <span>⬅</span> Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar-container">
        <div className="filter-group">
          <input 
            type="text" 
            className="filter-input date-input" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)} 
          />
          <label className="input-label">मिति देखि</label>
        </div>

        <div className="filter-group">
          <input 
            type="text" 
            className="filter-input date-input" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)} 
          />
          <label className="input-label">मिति सम्म</label>
        </div>

        <div className="filter-group select-group">
          <select 
            className="filter-select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">कोटि छनौट गर्नुहोस्</option>
            <option value="social">सामाजिक</option>
            <option value="economic">आर्थिक</option>
            <option value="education">शैक्षिक</option>
          </select>
        </div>

        <div className="filter-group select-group">
          <select 
            className="filter-select" 
            value={subCategory} 
            onChange={(e) => setSubCategory(e.target.value)}
            disabled={selectAll} // Disable if "Select All" is checked
          >
            <option value="">उप कोटि छनौट गर्नुहोस्</option>
            <option value="1">सिफारिस</option>
            <option value="2">दर्ता</option>
          </select>
        </div>

        <div className="filter-group checkbox-group">
          <input 
            type="checkbox" 
            id="selectAll" 
            checked={selectAll} 
            onChange={(e) => setSelectAll(e.target.checked)} 
          />
          <label htmlFor="selectAll">सबै उप कोटि चयन गर्नुहोस्</label>
        </div>

        <button className="search-icon-btn" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {/* --- Results Area (Textured Background) --- */}
      <div className="report-results-area">
        {/* This area is empty in the screenshot, ready for data tables */}
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default CategoryReportSearch;