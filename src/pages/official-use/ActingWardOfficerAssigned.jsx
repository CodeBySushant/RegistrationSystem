// 3
import React from 'react';
import './ActingWardOfficerAssigned.css';

const ActingWardOfficerAssigned = () => {
  return (
    <div className="acting-officer-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कार्यवाहक तोकिएको सिफारिस ।
        <span className="top-right-bread">आर्थिक प्रबेश &gt; कार्यवाहक तोकिएको सिफारिस</span>
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
          <p>मिति : <span className="bold-text">२०८२-०८-११</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 7 बिहीबार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className subject-section>
        <p>विषय: <span className="underline-text">कार्यवाहक तोकिएको सम्बन्धमा।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className addressee-section>
        <div className="addressee-row">
          <span>श्री वडा सदस्य</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन नगरपालिका" />
           <span>वडा नं. १</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा कार्यालयको कामकामजको शिलशिलामा मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-११" /> देखि मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-११" /> गते सम्म बाहिर जानु पर्ने भएकोले सो अवधि सम्म यस १ नं वडा कार्यालयको कामकाज सम्हाल्ने गरी तपाईंलाई कार्यवाहक वडा अध्यक्षको जिम्मेवारी तथा काम गर्न गराई काम गर्नुहोला ।
        </p>
      </div>

      {/* --- Bodartha (CC) Section --- */}
      <div className="bodartha-section">
          <h4 className="bold-text">बोधार्थ:</h4>
          <div className="editor-section">
              <div className="rich-editor-mock">
                  <div className="editor-toolbar">
                      <span className="tool-btn bold">B</span>
                      <span className="tool-btn italic">I</span>
                      <span className="tool-btn underline">U</span>
                      <span className="tool-btn strike">S</span>
                      <span className="tool-sep">|</span>
                      <span className="tool-btn">X<sub>2</sub></span>
                      <span className="tool-btn">X<sup>2</sup></span>
                      <span className="tool-sep">|</span>
                      <span className="tool-btn">¶</span>
                      <span className="tool-btn">﹖</span>
                  </div>
                  <textarea className="editor-textarea" rows="4"></textarea>
              </div>
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

export default ActingWardOfficerAssigned;