import React from 'react';
import './ScholarshipRecommendation.css';
// 1
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const ScholarshipRecommendation = () => {
  return (
    <div className="scholarship-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        छात्रवृत्ति सिफारिस ।
        <span className="top-right-bread">शैक्षिक &gt; छात्रवृत्ति सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">{MUNICIPALITY.wardNumber} नं. वडा कार्यालय</h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
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
        <p>विषय: <span className="underline-text">छात्रवृत्ति सिफारिस ।</span></p>
      </div>

      {/* --- Salutation (Jo Sanga...) --- */}
      <div className="salutation-section">
         <label className="red-text">जो सँग ...</label>
         <input type="text" className="line-input medium-input" />
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा <span className="bold-text underline-text">{MUNICIPALITY.name}</span> वडा नं. १ (साविक <input type="text" className="inline-box-input medium-box" /> 
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> ) अन्तर्गत 
          <select className="inline-select bold-text">
              <option>स्थायी</option>
              <option>अस्थायी</option>
          </select>
          बसोबास गर्ने श्री <input type="text" className="inline-box-input long-box" required /> ) तथा श्रीमती <input type="text" className="inline-box-input long-box" required /> ) को आर्थिक अवस्था 
          <select className="inline-select bold-text">
              <option>कमजोर</option>
              <option>मध्यम</option>
              <option>सम्पन्न</option>
          </select>
          भएको हुँदा निजहरूको 
          <select className="inline-select bold-text">
              <option>छोरा</option>
              <option>छोरी</option>
          </select>
          <select className="inline-select bold-text">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input long-box" required /> ) लाई नियमानुसार छात्रवृत्ति को लागि सिफारिस गरिन्छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
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
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default ScholarshipRecommendation;