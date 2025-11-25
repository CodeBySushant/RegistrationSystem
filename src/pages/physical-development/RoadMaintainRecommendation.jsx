import React from 'react';
import './RoadMaintainRecommendation.css';
// 6
const RoadMaintainRecommendation = () => {
  return (
    <div className="road-maintain-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नेपाल सरकारको नाममा बाटो कायम सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; नेपाल सरकारको नाममा बाटो कायम सिफारिस</span>
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
        <p>विषय: <span className="underline-text">नेपाल सरकारको नाममा बाटो कायम सिफारिस।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा मेरो नाममा दर्ता श्रेस्ता भएको <span className="bold-text">नागार्जुन</span> <span className="bold-text ml-20">नागार्जुन</span> वडा नं. <span className="bold-text">१</span> (साविक 
          <select className="inline-select medium-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) कि.न. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> को क्षे.फ. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> जग्गामध्ये 
          <select className="inline-select medium-select">
              <option>पूर्व</option>
              <option>पश्चिम</option>
              <option>उत्तर</option>
              <option>दक्षिण</option>
          </select>
          तर्फबाट <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> चौडाइ र <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> फिट लम्बाई नेपाल सरकारको नाममा कित्ताकाट गरी नेपाल सरकारको नाममा बाटो कायम गर्न सिफारिस गरी पाउँ भनी जग्गाधनी 
          <select className="inline-select small-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> ले यस वडा कार्यालयमा निवेदन दिनु भएको हुँदा सो सम्बन्धमा प्राबिधिक प्रतिवेदन अनुसार कित्ताकाट गर्न मिल्ने देखिएकोले प्राबिधिक फिल्ड निरीक्षण प्रतिवेदन सहित पठाइएको छ | तहाँको नियमानुसार नेपाल सरकारको नाममा बाटो कायम गरिदिनुहुन सिफारिस गरिन्छ |
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

export default RoadMaintainRecommendation;