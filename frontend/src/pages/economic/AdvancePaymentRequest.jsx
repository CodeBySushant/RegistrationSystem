import React from 'react';
import './AdvancePaymentRequest.css';

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

// 4
const AdvancePaymentRequest = () => {
  return (
    <div className="advance-payment-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        पेश्की अनुरोध सिफारिस ।
        <span className="top-right-bread">आर्थिक &gt; पेश्की अनुरोध सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय</h2>
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

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span>ज्यु,</span>
        </div>
        <div className="addressee-row">
           <span>{MUNICIPALITY.name}</span>
           <input type="text" className="line-input medium-input" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">पेश्की उपलब्ध गराईदिने सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन नगरपालिका" /> चालु आ.व. <input type="text" className="inline-box-input small-box" defaultValue="२०८२/८३" /> को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत 
          <input type="text" className="inline-box-input long-box" required /> 
          को बजेट शिर्षक नम्बर <input type="text" className="inline-box-input small-box" required />
          मा रहेको <input type="text" className="inline-box-input medium-box" required /> 
          <select className="inline-select">
            <option>संचालन</option>
            <option>पूँजीगत</option>
          </select>
          अन्तर्गत जम्मा रकम रु. <input type="text" className="inline-box-input medium-box" required /> 
          मध्ये बाट रु. <input type="text" className="inline-box-input medium-box" required /> 
          ( अक्षरेरुपी <input type="text" className="inline-box-input long-box" required /> रुपैया मात्र ) पेश्की भुक्तानी दिनु हुन अनुरोध गर्दछु।
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
             <option>प्रमुख प्रशासकीय अधिकृत</option>
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

export default AdvancePaymentRequest;