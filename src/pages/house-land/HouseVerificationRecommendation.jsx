// 6
import React from 'react';
import './HouseVerificationRecommendation.css';

const HouseVerificationRecommendation = () => {
  return (
    <div className="house-verification-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घर जनाउने सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; घर जनाउने सिफारिस</span>
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
          <select className="bold-select">
              <option>भुमि सुधार कार्यालय</option>
              <option>मालपोत कार्यालय</option>
          </select>
          <span>,</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span className="bold-text">, काठमाडौँ</span>
           <span style={{float: 'right'}}>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">नागार्जुन नगरपालिका</span> वडा नं. <span className="bold-text">१</span> बस्ने 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> ले मेरो नाउँमा मालपोत कार्यालय, <span className="bold-text">काठमाडौँ</span> मा दर्ता भएको साविक 
          <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> हाल 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> को कि.नं. 
          <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> क्षे.फ. 
          <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> जग्गामा मैले घर निर्माण गरी सकेको र मेरो माथि उल्लेखित कित्ता जग्गाको ज.ध.प्र.पुर्जामा हालसम्म घर नजनिएकोले घर जनाउनको लागि तहाँ कार्यालयको नाउँमा सिफारिस पाउँ भनी यस कार्यालयमा निवेदन पेश गरेकोले सो सम्बन्धमा बुझ्दा जानेबुझेसम्म व्यहोरा मनासिब भएको बुझिएकोले तहाँ कार्यालयको नियमानुसार निवेदकको माथि उल्लेखित कित्ता जग्गाको ज.ध.प्र.पु.मा घर जनाई दिनुहुन यो सिफारिस गरिन्छ।
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

export default HouseVerificationRecommendation;