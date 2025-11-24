// 21
import React from 'react';
import './TribalRecommendation.css';

const TribalRecommendation = () => {
  return (
    <div className="tribal-recommendation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        आदिवासी सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; आदिवासी सिफारिस</span>
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
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त बिषयमा <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
          <select className="inline-select">
              <option>नाति</option>
              <option>नातिनी</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
          <select className="inline-select">
              <option>छोरा</option>
              <option>छोरी</option>
          </select>
          जिला काठमाडौँ साविक 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> भै हाल जिल्ला काठमाडौँ नागार्जुन नगरपालिका वडा नं १ गा बस्ने (ना.प्र.नं. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> मिति २०८२-०८-०६ ) को <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले म 
          <select className="inline-select">
              <option>आदिवासी</option>
              <option>जनजाति</option>
          </select>
          अन्तरगत <input type="text" className="inline-box-input medium-box" /> जाति भएकोले सोहि बमोजिम सिफारिस गरिपाउँ भनि माग भै आएकोले नेपाल सरकारले सुचिकृत गरेको 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> मध्ये निज <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> जाति भएकोले सोही व्यहोरा प्रमाणित गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
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

export default TribalRecommendation;