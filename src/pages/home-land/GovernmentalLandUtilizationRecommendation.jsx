// 14
import React from 'react';
import './GovernmentalLandUtilizationRecommendation.css';

const GovernmentalLandUtilizationRecommendation = () => {
  return (
    <div className="land-utilization-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जोत भोग चलनको सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; जोत भोग चलनको सिफारिस</span>
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
          <select className="bold-select">
              <option>जिल्ला प्रशासन कार्यालय</option>
              <option>मालपोत कार्यालय</option>
              <option>नापी कार्यालय</option>
          </select>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>,</span>
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">नागार्जुन नगरपालिका</span> वडा नं १ बस्ने <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस कार्यालयमा दिनु भएको निवेदन अनुसार मैले जिल्ला <span className="bold-text">काठमाडौँ</span> (साविक 
          <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          ,वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ), कि.नं. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> हाल <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं १ मा पर्ने तपशिल बमोजिमको चार किल्ला भित्रको भोग अनुसारको क्षेत्रफल <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> भएको ऐलानी (दर्ता छुट) जग्गा फिल्डबुकमा जे जस्तो उल्लेख भएतापनि परापूर्वकाल देखिनै मैले जोत भोग गर्दै आएको सो जमिनको जोत भोग चलनको सिफारिस गरि पाउँ भन्नुव्यहोराको निवेदन प्राप्त हुन आएको र सो सम्बन्धमा 
          <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" /> कार्यालयबाट सम्बन्धित क्षेत्रमा गई बुझ्दा निज निवेदकको व्यहोरा ठिक साँचो बुझिएकोले तपशिलमा उल्लेखित चार किल्ला भित्रको ऐलानी जग्गा निज निवेदक <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले हाल सम्म भोग चलन गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Tapashil (Boundaries) --- */}
      <div className="tapashil-section">
          <h4 className="bold-text center-text">तपशिल चौहद्दी:</h4>
          <div className="boundary-list">
              <div className="boundary-item">
                  <label>पूर्व :-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="boundary-item">
                  <label>पश्चिम :-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="boundary-item">
                  <label>उत्तर :-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
              <div className="boundary-item">
                  <label>दक्षिण :-</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input long-input" />
              </div>
          </div>
          <p className="center-text" style={{marginTop: '10px'}}>(यति चार किल्ला भित्रको उल्लेखित जमिन)</p>
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

export default GovernmentalLandUtilizationRecommendation;