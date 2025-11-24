// 24
import React from 'react';
import './SocialSecurityAllowanceRecommendation.css';

const SocialSecurityAllowanceRecommendation = () => {
  return (
    <div className="allowance-recommendation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सामाजिक सुरक्षा भत्ता उपलब्ध ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षा भत्ता उपलब्ध</span>
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

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
          <span>बैंक</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>,</span>
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text bold-text">सामाजिक सुरक्षा भत्ता उपलब्ध गराई दिने बारे।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस <span className="bold-text underline-text">नागार्जुन</span> र त्यस बैंक बिच सामाजिक सुरक्षा भत्ता वितरण सम्बन्धी भएको सम्झौता अनुसार <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. १ बस्ने 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले नेपाल सरकारबाट उपलब्ध गराईएको 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> भत्ता खान योग्य भई यस कार्यालयमा दिनु भएको निवेदन अनुसार निज 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को यस कार्यालयबाट त्यहाँ उपलब्ध गराईएको आ.व. 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> त्रैमासिकको सामाजिक सुरक्षा भत्ता भर्पाइमा सि.नं. 
          <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> मा निजको नाम समावेश भएकोले त्यस बैंकको नियमानुसार खाता खोलि भत्ता रकम उपलब्ध गराई दिनु हुन अनुरोध छ ।
        </p>
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

export default SocialSecurityAllowanceRecommendation;