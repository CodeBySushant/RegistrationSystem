// 6
import React from 'react';
import './CitizenshipProofCopy.css';

const CitizenshipCertificateCopy = () => {
  return (
    <div className="citizenship-copy-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नेपाली नागरिकताको प्रमाण पत्र प्रतिलिपि पाऊँ।
        <span className="top-right-bread">नेपाली नागरिकता &gt; नागरिकता प्रमाण पत्र प्रतिलिपि</span>
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

      {/* --- Addressee Section --- */}
      <div className addressee-section>
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
          <span>,</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <span>जिल्ला प्रशासन कार्यालय ,</span>
           <input type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
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
          उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">काठमाडौँ</span> <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" /> वडा नं. <span className="bold-text">१</span> मा स्थायी बसोबास गर्ने श्री 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले मेरो नागरिकताको प्रमाण पत्र 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> सोको प्रतिलिपि पाउनुहुन सिफारिस पाऊँ भनि यस कार्यालयमा निवेदन दिनुभएको हुँदा निजलाई नागरिकता नियमानुसार उपलब्ध गराई दिनुहुन स्थायी बसोबास प्रमाणित साथ सिफारिस गरिएको व्यहोरा अनुरोध छ ।
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

export default CitizenshipCertificateCopy;