// 28
import React from 'react';
import './DisableIdentityCardRenew.css';

const DisableIdentityCardRenew = () => {
  return (
    <div className="renew-card-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        परिचय पत्र नवीकरण ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; परिचय पत्र नवीकरण</span>
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
            <select className="inline-select bold-text" style={{border: '1px solid #ccc'}}>
                <option>प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
                <option>अपाङ्गता परिचयपत्र</option>
                <option>ज्येष्ठ नागरिक परिचयपत्र</option>
            </select>
            <span className="underline-text bold-text"> नवीकरण बारे ।</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री नागार्जुन नगरपालिका ,</span>
        </div>
        <div className="addressee-row">
          <span>नगर कार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन" />
           <span>, काठमाडौँ ।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <span className="bg-gray-text">काठमाडौँ</span> <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं <span className="bg-gray-text">१</span> (साविक जिल्ला काठमाडौँ <input type="text" className="inline-box-input medium-box" /> वडा नं <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) मा बस्ने <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
          <select className="inline-select">
              <option>छोरा</option>
              <option>छोरी</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस कार्यालयमा दिनु भएको निवेदन अनुसार निजले मिति २०८२-०८-०६ गतेमा <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नम्बर नं <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> प्राप्त गरेकोले तहाँ कार्यालयको नियमानुसार <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नवीकरण गरिदिनुहुन सिफारिस साथ सादर अनुरोध गरिन्छ।
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

export default DisableIdentityCardRenew;