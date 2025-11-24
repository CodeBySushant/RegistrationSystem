import React from 'react';
import './DomesticAnimalMaternityNutritionAllowance.css';
// 1
const DomesticAnimalMaternityNutritionAllowance = () => {
  return (
    <div className="animal-allowance-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        गाई / भैंसी सुत्केरी पोषण भत्ता ।
        <span className="top-right-bread">पशुपालन &gt; गाई / भैंसी सुत्केरी पोषण भत्ता</span>
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

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">गाई / भैंसी सुत्केरी पोषण भत्ता उपलब्ध गरिदिने बारे ।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री पशु सेवा शाखा,</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन नगरपालिका" />
           <span>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस नगर कार्यपालिकाबाट पारित "गाई/भैंसी सुत्केरी पोषण भत्ता, ब्याडको बोका व्यवस्थापन र भ्याक्सिनेसन कार्यक्रम कार्यान्वयन विधि, २०७४" अनुसार जिल्ला काठमाडौँ 
          <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          वडा नं. <span className="bold-text">१</span> बस्ने <input type="text" className="inline-box-input long-box" required /> को निजकै घरमा विगत <input type="text" className="inline-box-input tiny-box" required /> 
          <select className="inline-select">
              <option>महिना</option>
              <option>वर्ष</option>
          </select>
          देखि पालन पोषण हुँदै आएको गाई / भैंसी मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> मा सुत्केरी भएकोले कार्यविधि अनुसार निजले पाउने सुत्केरी पोषण भत्ता उपलब्ध गरि दिनु हुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
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

export default DomesticAnimalMaternityNutritionAllowance;