// 5
import React from 'react';
import './CitizenshipRecommendation.css';

const CitizenshipRecommendation = () => {
  return (
    <div className="citizenship-rec-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नेपाली नागरिकताको सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; नेपाली नागरिकताको सिफारिस</span>
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

      {/* --- Addressee --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री प्रमुख जिल्ला अधिकारी</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span className="bold-text">काठमाडौँ</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className subject-section>
        <p>विषय: <span className="underline-text">सिफारिस गरिएको।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          महोदय,
          <br/>
          यस नागरिकता प्रचलित विवरण रहेकोले नेपाली नागरिकताको प्रमाण पत्र पाउनको लागि सिफारिस पाउँ भनि निवेदन दिनु भएको हुँदा निज निवेदकलाई स्थायी नेपाली नागरिकताको प्रमाण पत्र उपलब्ध गराईदिन सिफारिस साथ अनुरोध गर्दछु ।
        </p>

        {/* --- Form Details --- */}
        <div className="form-details-grid">
            <div className="detail-row">
                <label>पतिको नाम, थर, वतन : <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
                <label>पतिको ना.प्र.नं.: <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
            </div>
            <div className="detail-row">
                <label>बाबुको नाम, थर, वतन : <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
                <label>आमाको नाम, थर, वतन : <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
            </div>
             <div className="detail-row">
                <label>स्थायी ठेगाना : गाउँपालिका/नगरपालिका <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
                <label>वडा नं. <span className="red">*</span></label>
                <input type="text" className="dotted-input tiny-input" />
            </div>
            <div className="detail-row">
                <label>जन्म मिति : २०८२-०८-०६</label>
                <label>स्थानीय ठेगाना : साविकको नागरिकताको किसिम <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
            </div>
             <div className="detail-row">
                <label>विवाह गर्न चाहेको/गरेको मिति <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
                <label>मिति २०८२-०८-०६</label>
                <label>रोहबर बस्नेको नागरिकताको किसिम <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
            </div>
             <div className="detail-row">
                <label>सिफारिस गर्न खोजेकोको नाता <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
                <label>स्थानीय तहको नागरिकको दोश्रो नाम <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
            </div>
        </div>

        {/* --- Photo Section --- */}
        <div className="photo-signatures-grid">
            <div className="photo-box">
                फोटो
            </div>
            <div className="signatures-container">
                <div className="sig-item">
                    <label>निवेदक</label>
                    <div className="sig-line"></div>
                </div>
                <div className="sig-item">
                    <label>सिफारिस गर्नेको सहीछाप</label>
                    <div className="sig-line"></div>
                </div>
                 <div className="sig-item">
                    <label>दस्तखत</label>
                    <div className="sig-line"></div>
                </div>
            </div>
        </div>
        
        {/* --- Signature Block (Bottom Right) --- */}
        <div className="signature-section">
            <div className="signature-block">
                <div className="sig-item">
                    <label>दस्तखत</label>
                    <div className="sig-line"></div>
                </div>
                <div className="sig-item">
                    <label>नाम: <span className="red">*</span></label>
                    <input type="text" className="line-input full-width-input" />
                </div>
                <div className="sig-item">
                    <label>मिति: <span className="red">*</span></label>
                    <input type="text" className="line-input full-width-input" defaultValue="२०८२-०८-०६" />
                </div>
                 <div className="sig-item">
                    <label>पद: <span className="red">*</span></label>
                     <select className="designation-select">
                        <option>पद छनौट गर्नुहोस्</option>
                        <option>वडा अध्यक्ष</option>
                     </select>
                </div>
            </div>
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

export default CitizenshipRecommendation;