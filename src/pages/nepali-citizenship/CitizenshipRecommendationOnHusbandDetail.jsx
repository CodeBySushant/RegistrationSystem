// 8
import React from 'react';
import './CitizenshipRecommendationOnHusbandDetail.css';

const CitizenshipRecommendationOnHusbandDetail = () => {
  return (
    <div className="husband-detail-rec-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नेपाली नागरिकताको प्रमाण पत्र ।
        <span className="top-right-bread">नागरिकता &gt; नेपाली नागरिकताको प्रमाण पत्र</span>
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
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री जिल्ला प्रशासन कार्यालय,</span>
          <input type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
          <span>,</span>
          <input type="text" className="line-input medium-input" defaultValue="नागार्जुन नगरपालिका" />
          <span>।</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bg-gray-text">१</span> निवासी <select className="inline-select"><option>श्री</option><option>सुश्री</option></select> <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> को श्रीमति <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> ले नेपाली नागरिकताको प्रमाण पत्र पाउनका लागि सिफारिस पाउँ भनि निवेदन दिएको हुँदा निजको विवाह पूर्व जिल्ला <input type="text" className="inline-box-input medium-box" /> प्रशासन कार्यालय <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" /> बाट ना.प्र.नं. <input type="text" className="inline-box-input medium-box" /> को नेपाली नागरिकताको प्रमाण पत्र मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-११" /> मा लिनुभई निजको विवाह काठमाडौँ जिल्ला <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन नगरपालिका" /> वडा नं. <input type="text" className="inline-box-input tiny-box" defaultValue="१" /> निवासी <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> सँग मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-११" /> मा भएको हुँदा निजलाई पतिको घर ठेगाना राखी नेपाली नागरिकताको प्रमाण पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ अनुरोध छ।
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

export default CitizenshipRecommendationOnHusbandDetail;