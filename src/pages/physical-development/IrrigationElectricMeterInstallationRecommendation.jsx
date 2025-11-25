import React from 'react';
import './IrrigationElectricMeterInstallationRecommendation.css';
// 8
const IrrigationElectricMeterInstallationRecommendation = () => {
  return (
    <div className="irrigation-meter-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सिचाई विद्युत मिटर जडान सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; सिचाई विद्युत मिटर जडान सिफारिस</span>
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
        <p>विषय: <span className="underline-text">सिचाई विद्युत मिटर जडान सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री नेपाल विद्युत प्राधिकरण कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" />
           <span className="red">*</span>
           <span>, काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा साविक जिल्ला काठमाडौँ <input type="text" className="inline-box-input medium-box" /> 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> भै हाल <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. १ मा बस्ने <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> को नाउँमा नम्बरी दर्ता रहेको जग्गा जिल्ला <span className="bg-gray-text">काठमाडौँ</span>
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> हाल <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. १ कित्ता नं. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> क्षेत्रफल 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> भित्र चौहदी रहेको जग्गामा <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> लागि <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> जडान गर्न ताहाँ कार्यालयको नियमानुसार आवश्यक कारवाहीका लागि सिफारिस साथ सादर अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Tapashil (Boundaries) --- */}
      <div className="tapashil-section">
          <h4 className="bold-text underline-text">तपसिल</h4>
          <div className="boundary-list">
              <div className="boundary-item">
                  <label>पूर्व :-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="boundary-item">
                  <label>पश्चिम:-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="boundary-item">
                  <label>उत्तर :-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="boundary-item">
                  <label>दक्षिण:-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
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

export default IrrigationElectricMeterInstallationRecommendation;