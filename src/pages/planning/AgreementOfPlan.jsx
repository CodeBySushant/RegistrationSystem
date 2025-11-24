// 1
import React from 'react';
import './AgreementOfPlan.css';

const AgreementOfPlan = () => {
  return (
    <div className="plan-agreement-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        योजना सम्झौता सिफारिस
        <span className="top-right-bread">योजना &gt; योजना सम्झौता सिफारिस</span>
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
        <p>विषय: <span className="underline-text">योजना सम्झौता गरिदिने सम्बन्धमा।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>प्रमुख प्रशासकीय अधिकृत</span>
        </div>
        <div className="addressee-row">
          <span>नगरकार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन" />
           <input type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा काठमाडौँ <span className="ml-20">नागार्जुन नगरपालिका</span> को चालु आ.व. 
          <input type="text" className="inline-box-input medium-box" defaultValue="२०८२/८३" /> को स्वीकृत बजेट तथा निति कार्यक्रम अनुसार 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> लाई 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> कार्य गर्न रु 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ( <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> ) विनियोजन भएको हुदा त्यहाँ कार्यालयको नियम अनुसार 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> , र <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> , विच योजना / कार्यक्रम सम्झौता गरि दिनुहुन यो सिफारिस गरिएको व्यहोरा अनुरोध छ।
        </p>
      </div>

      {/* --- Tapsil (Details List) --- */}
      <div className="tapsil-section">
          <h4 className="underline-text bold-text">तपशिल</h4>
          <div className="tapsil-list">
              <div className="tapsil-item">
                  <label>१. योजना तथा कार्यक्रमको नाम</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>२. विनियोजित रकम जम्मा</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>३. हाल सम्झौता हुने रकम</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>४. बजेट उपशिर्षक नं.</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>५. खर्चको प्रकार</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>६. सिलिङ</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>७. कामको विवरण</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>८. उपभोक्ता समितिको नाम</label>
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

export default AgreementOfPlan;