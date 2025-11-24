// 9
import React from 'react';
import './PeskiAnurodhSifaris.css';

const PeskiAnurodhSifaris = () => {
  return (
    <div className="peski-anurodh-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        पेस्की अनुरोध सिफारिस ।
        <span className="top-right-bread">आर्थिक &gt; पेस्की अनुरोध सिफारिस</span>
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
          <span>ज्यू,</span>
        </div>
        <div className="addressee-row">
           <span className="bold-text">नागार्जुन नगरपालिका</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">पेस्की उपलब्ध गराईदिने सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस <span className="bold-text">नागार्जुन नगरपालिका</span> चालु आ.व. 
          <input type="text" className="inline-box-input small-box" defaultValue="२०८१/८२" /> को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को बजेट शिर्षक नम्बर 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> मा रहेको 
          <select className="inline-select">
              <option>संचालन</option>
              <option>कार्यक्रम</option>
          </select>
          अन्तर्गत जम्मा रकम रु. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> मध्ये बाट रु. 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ( अक्षरेरुपी 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> रुपैया मात्र ) पेस्की मुक्तानी दिनु हुन अनुरोध गर्दछु।
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

export default PeskiAnurodhSifaris;