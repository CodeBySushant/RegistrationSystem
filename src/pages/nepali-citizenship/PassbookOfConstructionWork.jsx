// 3
import React from 'react';
import './PassbookOfConstructionWork.css';

const PassbookOfConstructionWork = () => {
  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="passbook-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-header">
        <h1>निर्माण कार्यको पासबुक ।</h1>
        <button className="back-button" onClick={handleBack}>
           ← Back
        </button>
      </div>

      {/* --- Form Card --- */}
      <div className="form-card">
        
        {/* --- Registration Date --- */}
        <div className="form-group-row">
          <label className="form-label">दर्ताको मिति</label>
          <div className="input-wrapper bg-gray">
             २०८२-०८-०६
          </div>
        </div>

        {/* --- Business Name --- */}
        <div className="form-group-row">
          <label className="form-label">व्यवसाय वा फार्मको नाम</label>
          <div className="input-wrapper">
             <input type="text" className="form-input" required />
             <span className="required-asterisk">*</span>
          </div>
        </div>

        {/* --- Business Owner --- */}
        <div className="form-group-row">
          <label className="form-label">व्यवसाय वा फार्मको मालिक</label>
          <div className="input-wrapper">
             <input type="text" className="form-input" required />
             <span className="required-asterisk">*</span>
          </div>
        </div>

        {/* --- Phone Number --- */}
        <div className="form-group-row">
          <label className="form-label">टेलिफोन नं.</label>
          <div className="input-wrapper">
             <input type="text" className="form-input" required />
             <span className="required-asterisk">*</span>
          </div>
        </div>

        {/* --- Work Description --- */}
        <div className="form-group-row">
          <label className="form-label">कार्यको विवरण</label>
          <div className="input-wrapper">
             <input type="text" className="form-input" required />
             <span className="required-asterisk">*</span>
          </div>
        </div>

        {/* --- Remarks --- */}
        <div className="form-group-row">
          <label className="form-label">कैफियत</label>
          <div className="input-wrapper">
             <input type="text" className="form-input" required />
             <span className="required-asterisk">*</span>
          </div>
        </div>

        {/* --- Scan File Upload --- */}
        <div className="form-group-row">
          <label className="form-label">स्क्यान</label>
          <div className="input-wrapper file-upload-wrapper">
             <input type="file" id="scanFile" className="file-input" />
             <label htmlFor="scanFile" className="file-label-text">
                 <span className="choose-file-btn">Choose File</span> No file chosen
             </label>
          </div>
        </div>

      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn">रेकर्ड सेभ गर्नुहोस</button>
      </div>

      {/* --- Copyright Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>

    </div>
  );
};

export default PassbookOfConstructionWork;