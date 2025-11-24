// 4
import React from 'react';
import './LeaveRequestApplication.css';

const LeaveRequestApplication = () => {
  return (
    <div className="leave-request-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        बिदाको निवेदन ।
        <span className="top-right-bread">अन्य &gt; बिदाको निवेदन</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name red-text">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title red-text">नगर कार्यपालिकाको कार्यालय</h2>
          <p className="address-text red-text">नागार्जुन, काठमाडौँ</p>
          <h3 className="form-main-title red-text">बिदाको निवेदन</h3>
        </div>
      </div>

      {/* --- Date Section --- */}
      <div className="date-section">
        <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
      </div>

      {/* --- Form Fields --- */}
      <div className="form-grid">
        {/* Row 1 */}
        <div className="form-group">
          <label>नाम :</label>
          <select className="line-select">
            <option>नाम चयन गर्नुहोस्</option>
            {/* Add employee names here */}
          </select>
        </div>
        <div className="form-group">
          <label>पद : <span className="red">*</span></label>
          <input type="text" className="dotted-line-input full-width" />
        </div>

        {/* Row 2 */}
        <div className="form-group">
          <label>फोन न. : <span className="red">*</span></label>
          <input type="text" className="dotted-line-input medium-width" />
        </div>
        <div className="form-group date-range-group">
          <label>बिदाको मिति : <span className="red">*</span></label>
          <input type="text" className="dotted-line-input small-width" />
          <label>देखि <span className="red">*</span></label>
          <input type="text" className="dotted-line-input small-width" />
          <label>सम्म</label>
        </div>

        {/* Row 3 */}
        <div className="form-group">
          <label>हाल माँगेको बिदाको अवधि: <span className="red">*</span></label>
          <input type="text" className="dotted-line-input small-width" />
          <label>दिन</label>
        </div>
        <div className="form-group">
            <label>कारण:</label>
        </div>
      </div>

      {/* --- Reason Text Area --- */}
      <div className="reason-section">
        <textarea className="reason-textarea" rows="2"></textarea>
      </div>

      {/* --- Leave Type Table --- */}
      <div className="leave-table-section">
          <table className="leave-table">
              <thead>
                  <tr>
                      <th style={{width: '20%'}}>चिन्ह लगाउने</th>
                      <th style={{width: '50%'}}>माँगेको बिदाको किसिम</th>
                      <th style={{width: '30%'}}>बिदाको अवधि</th>
                  </tr>
              </thead>
              <tbody>
                  {/* The image shows empty rows/placeholder, adding one for structure */}
                  {/* You can map over leave types here */}
              </tbody>
          </table>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
      </div>
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default LeaveRequestApplication;