import React from 'react';
import './LekhaParikshyan.css';
// 9
const LekhaParikshyan = () => {
  return (
    <div className="audit-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        लेखा परिक्षण सम्बन्धमा ।
        <span className="top-right-bread">आर्थिक &gt; लेखा परिक्षण सम्बन्धमा ।</span>
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
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">लेखा परिक्षण सम्बन्धमा ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" required /> मा रहेको श्री <input type="text" className="inline-box-input long-box" required /> <input type="text" className="inline-box-input medium-box" /> को आ.व. <input type="text" className="inline-box-input small-box" required /> को लेखा परिक्षण गर्नको लागि संस्थाको साधारण सभाले संचालक समितिलाई दिएको अख्तियारी अनुसार मिति <span className="underline-text">२०८२-०८-०६</span> गते बसेको संचालक समितिको बैठकले दर्तावाला लेखा परिक्षक श्री <input type="text" className="inline-box-input long-box" required /> प्रमाण पत्र नं. <input type="text" className="inline-box-input medium-box" required /> संस्था दर्ता नम्बर <input type="text" className="inline-box-input medium-box" required /> भएको <input type="text" className="inline-box-input long-box" required /> <input type="text" className="inline-box-input medium-box" /> का <input type="text" className="inline-box-input medium-box" required /> लाई लेखा परिक्षणको अनुमति प्रदान गरिएको व्यहोरा जानकारीको लागि अनुरोध छ ।
        </p>
      </div>

      {/* --- Bodartha (CC) Section --- */}
      <div className="bodartha-section">
          <label className="bold-text underline-text">बोधार्थ:</label>
          <div className="bodartha-input-container">
             <input type="text" className="line-input full-width-input" />
             <span className="dropdown-arrow">▼</span>
          </div>
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

export default LekhaParikshyan;