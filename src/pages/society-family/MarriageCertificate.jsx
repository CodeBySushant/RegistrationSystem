// 5
import React from 'react';
import './MarriageCertificate.css';

const MarriageCertificate = () => {
  return (
    <div className="marriage-certificate-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        विवाह प्रमाण पत्र ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; विवाह प्रमाण पत्र</span>
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
        <p>विषय:<span className="underline-text bold-text">विवाह प्रमाणित सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा जिल्ला काठमाडौँ साविक <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> हाल नागार्जुन नगरपालिका वडा नं. १ निवासी श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> तथा श्रीमती <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा ना.प्र.नं. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
          <input type="text" className="inline-box-input medium-box" /> को <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> रङ्ग जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> साविक <input type="text" className="inline-box-input medium-box" /> 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> भई हाल <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> मा बस्ने श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नातिनी श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> तथा श्रीमती <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरी <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> बीच मिति 
          <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> गतेमा सामाजिक परम्परा अनुसार विवाह भएकोले विवाह प्रमाणित सिफारिस माग गरे अनुसार <input type="text" className="inline-box-input long-box" /> विवाह प्रमाणित सिफारिस गरिएको व्यहोरा अनुरोध गरिन्छ। साथै निजहरुको फोटो यस पत्र साथ प्रमाणित गरिएको व्यहोरा अनुरोध गरिन्छ।
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

export default MarriageCertificate;