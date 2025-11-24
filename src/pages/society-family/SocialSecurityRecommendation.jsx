// 13
import React from 'react';
import './SocialSecurityRecommendation.css';

const SocialSecurityRecommendation = () => {
  return (
    <div className="social-security-rec-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सामाजिक सुरक्षा सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षा सिफारिस ।</span>
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
          <p>पत्र संख्या : <span className="bold-text">२३</span></p>
          <p>चलानी नं. : <input type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p className="bold-text">श्री शाखा प्रमुख ज्यु,</p>
        <div className="bank-row">
            <span className="red">*</span>
            <input type="text" className="line-input long-input" />
            <span>.लि.</span>
        </div>
        <div className="bank-row">
            <span>शाखा कार्यालय,</span>
            <span className="red">*</span>
            <input type="text" className="line-input long-input" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text">सिफारिस गरिएको सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          <select className="inline-select">
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" defaultValue="१" /> बाट सामाजिक सुरक्षा भत्ता प्राप्त गर्ने ( 
          <input type="text" className="inline-box-input medium-box red-text" defaultValue="ज्येष्ठ नागरिक" /> ) लाभग्राही 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ना.प्र.नं 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> परिचय पत्र नं 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> गते 
          <span className="red-text bold-text"> मृत्यु </span> भएको र निजको खाता नं 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> मा रहेको सामाजिक सुरक्षा भत्ता बापत मृत्यु भएको मिति सम्मको रकम निकाल निजको 
          <select className="inline-select">
              <option>छोरा</option>
              <option>छोरी</option>
              <option>पति</option>
              <option>पत्नी</option>
          </select>
          ले पेश गरेको निवेदनको आधारमा निजको <span className="red">*</span> 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select> 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ना.प्र.नं 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> लाई रकम निकाल्ने आवश्यक व्यवस्था मिलाई सहयोग गरिदिनुहुन अनुरोध छ । साथै निजको नाममा रहेको सामाजिक सुरक्षा खाता समेत बन्द गरिदिनुहुन अनुरोध छ ।
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
            <label>निवेदकको फोन नं.</label>
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

export default SocialSecurityRecommendation;