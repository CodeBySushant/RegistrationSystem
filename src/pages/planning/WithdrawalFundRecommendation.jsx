// 2
import React from 'react';
import './WithdrawalFundRecommendation.css';

const WithdrawalFundRecommendation = () => {
  return (
    <div className="withdrawal-fund-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        रकम निकासा सिफारिस ।
        <span className="top-right-bread">योजना &gt; रकम निकासा सिफारिस</span>
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
        <p>विषय: <span className="underline-text">रकम निकासा सम्बन्धमा।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>प्रमुख प्रशासकीय अधिकृत</span>
        </div>
        <div className="addressee-row">
          <span className="underline-text">नागार्जुन नगरपालिका</span>
          <span> नगर कार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
           <span className="underline-text">नागार्जुन</span>
           <span className="underline-text ml-20">काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस <span className="underline-text">नागार्जुन नगरपालिका नगर</span> सभाबाट स्वीकृत आ.व. २०८२/८३ को स्वीकृत वार्षिक बजेट तथा कार्यक्रम अन्तर्गत विनियोजन भएको बजेट बाट <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> कार्य गर्न प्राबिधिक ल.ई अनुसार योजना सम्झौता भई आयोजना सम्पन्न भएकोले नागार्जुन नगरपालिका रकम निकासा गर्न सिफारिस गरी पाउँ भनि यस वडा कार्यालयमा समितिका <span className="red-text bold-text">अध्यक्ष</span> <input type="text" className="inline-box-input medium-box" /> निवेदन दिनुभएको सो सम्बन्धमा <input type="text" className="inline-box-input medium-box" /> उपभोक्ता समितिले <input type="text" className="inline-box-input medium-box" /> निर्माण कार्य सम्पन्न गरेकोले तहाँ कार्यालयको नियमानुसार प्राविधिक लागत मूल्याङ्कन फाराम अनुसारको रकम निकासा गरिदिनु हुन सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Tapsil (Details List) --- */}
      <div className="tapsil-section">
          <h4 className="underline-text bold-text">तपशिल</h4>
          <div className="tapsil-list">
              <div className="tapsil-item">
                  <label>१. बजेट उपशिर्षक नं.</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>२. खर्चको प्रकार</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>३. योजना तथा कार्यक्रमको नाम</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>४. कार्यक्रमको लागि विनियोजित रकम रु</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>५. यस अघि भुक्तानी रकम रु</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>६. हाल भुक्तानी हुने रकम रु</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="tapsil-item">
                  <label>७. भुक्तानी पाउनेको नाम थर</label>
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

export default WithdrawalFundRecommendation;