// 22
import React from 'react';
import './BirthOrSettlementRecommendation.css';

const BirthOrSettlementRecommendation = () => {
  return (
    <div className="birth-settlement-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जन्म/बसोबास प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; जन्म/बसोबास प्रमाणित</span>
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
        <p>विषय:<span className="underline-text bold-text">जन्म/बसोबास प्रमाणित बारे।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं १ (साविक 
          <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) बस्ने 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को जन्म साविक जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> गा मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> मा भएको र मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> देखि यस <span className="bold-text">नागार्जुन</span> गा बसोबास गर्दै आएकोले निजको जन्म/बसोबास प्रमाणित गरिपाउँ भनि <span className="bg-gray-text">नागार्जुन नगरपालिका</span> , १ नं वडा कार्यालयमा मिति २०८२-०८-०६ गा दिनु भएको निवेदन बमोजिम श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> तथा श्रीमती <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
          <select className="inline-select">
              <option>छोरा</option>
              <option>छोरी</option>
          </select>
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को जन्म जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> साविक <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> वडा नं <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> गा जन्म भई हाल <span className="bold-text">नागार्जुन नगरपालिका</span> वडा नं <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> गा बसोबास गर्दै आएको र निजको जन्म मिति २०८२-०८-०६ गा भएको हुँदा निजको जन्म/बसोबास प्रमाणित गरिएको व्यहोरा अनुरोध छ ।
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

export default BirthOrSettlementRecommendation;