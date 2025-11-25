import React from 'react';
import './ElectricityCapacityIncrease.css';
// 4
const ElectricityCapacityIncrease = () => {
  return (
    <div className="capacity-increase-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        विद्युत क्षमता बढाउन
        <span className="top-right-bread">भौतिक निर्माण &gt; विद्युत क्षमता बढाउन</span>
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
        <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <span>नागार्जुन</span>
           <input type="text" className="line-input medium-input" />
           <span>, काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <span className="bg-gray-text">काठमाडौँ</span> <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bg-gray-text">१</span> <input type="text" className="inline-box-input long-box" /> मा रहेको 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> सञ्चालकले यस कार्यालयमा दिएको निवेदन अनुसार उक्त <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> लाई तहाँ कार्यालयबाट 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> विद्युतको लागि सिफारिस लिएको भएता पनि उक्त विद्युत शक्ति अपुग भई कार्य सञ्चालनमा असहजता भएकोले 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> को लागि सिफारिस माग भई आएको हुँदा त्यहा कार्यालयको नियमानुसार विद्युत क्षमता बढाउनको लागि सम्बन्धित स्थानमा सिफारिस गरिदिनुहुन सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-signature-mark">*</span>
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

export default ElectricityCapacityIncrease;