import React from 'react';
import './LandKittakatForRoadRecommendation.css';
// 7
const LandKittakatForRoadRecommendation = () => {
  return (
    <div className="land-kittakat-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सडक सिफारिसको लागि भूमि कित्ताकाट ।
        <span className="top-right-bread">भौतिक निर्माण &gt; सडक सिफारिसको लागि भूमि कित्ताकाट ।</span>
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
        <p>
            विषय: 
            <input type="text" className="dotted-input small-input center-text bold-text" defaultValue="२०" /> 
            <span className="underline-text bold-text">फिट बाटो कायम सिफारिस।</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री मालपोत कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>, काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <input type="text" className="inline-box-input medium-box" defaultValue="काठमाडौँ" /> <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन नगरपालिका" /> वडा नं. <span className="bg-gray-text">१</span> ( साविकको ठेगाना 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> )मा बस्ने <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा 
          <select className="inline-select">
              <option></option>
              <option>श्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाममा त्यस कार्यालयमा श्रेस्ता कायम रहेको जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> <input type="text" className="inline-box-input medium-box" /> <span className="red">*</span> वडा नं. 
          <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> (साविक <select className="inline-select medium-select"><option></option></select> वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) कि.नं. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> क्षेत्रफल <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> जग्गालाई २० फिट बाटो कायम गरी सार्वजनिक गरि दिनु भनि यस कार्यालयमा जग्गा धनी <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले दिनु भएको निवेदन अनुसार तहाँ कार्यालयबाट नेपाल सरकारको नियमानुसार सो २० फिट बाटो कायमका लागि सिफारिस साथ अनुरोध गरिन्छ।
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

export default LandKittakatForRoadRecommendation;