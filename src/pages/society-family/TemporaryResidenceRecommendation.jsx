// 2
import React from 'react';
import './TemporaryResidenceRecommendation.css';

const TemporaryResidenceRecommendation = () => {
  return (
    <div className="temp-residence-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अस्थायी बसोबास सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; अस्थायी बसोबास सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
          <p>चलानी नं. : <input type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">अस्थायी बसोबास सिफारिस।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> , 
          <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          वडा नं १ (साविक 
          <select className="inline-select medium-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) अन्तर्गत रहेको घरधनि श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> कित्ता नं. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> को घरमा विगत मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> देखि अस्थायी बसोबास गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Foreigner Checkbox --- */}
      <div className="foreigner-check-section">
          <input type="checkbox" id="foreignerCheck" />
          <label htmlFor="foreignerCheck" className="red-text">विदेशीको हकमा</label>
      </div>

      {/* --- Resident Details --- */}
      <div className="resident-details-section">
          <h4 className="bold-text">बसोबास गर्नेको :-</h4>
          <div className="resident-row">
              <label>ना.प्रा.प.नं. : <span className="red">*</span></label>
              <input type="text" className="line-input medium-input" />
              
              <label> / जिल्ला : <span className="red">*</span></label>
              <input type="text" className="line-input medium-input" />

              <label> / जारी मिति :</label>
              <input type="text" className="line-input medium-input" defaultValue="२०८२-०८-०६" />
          </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
        </div>
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

export default TemporaryResidenceRecommendation;