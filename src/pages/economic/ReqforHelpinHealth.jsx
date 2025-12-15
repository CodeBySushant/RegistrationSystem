import React from "react";
import "./ReqforHelpinHealth.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// 1
const ReqforHelpinHealth = () => {
  return (
    <div className="health-aid-container">
      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">२०८२/८३</span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input type="text" className="dotted-input small-input" />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input large-input" />
        </div>
        <div className="addressee-row">
          <input type="text" className="line-input full-width-input" />
          <span>।</span>
        </div>

        <p className="body-paragraph">
          उपरोक्त विषयमा <span className="bold-text">{MUNICIPALITY.name}</span>
          <span className="bold-text">{MUNICIPALITY.name}</span>
          वडा नं. १ (साविक{" "}
          <input type="text" className="inline-box-input" placeholder="" /> ,
          वडा नं. <input type="text" className="inline-box-input small-box" /> )
          बस्ने श्री
          <select className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" />
          को वार्षिक आम्दानी रु.
          <input type="text" className="inline-box-input medium-box" />
          । भन्दा कम भएको र निज
          <input type="text" className="inline-box-input medium-box" />
          बाट पीडित भई
          <input type="text" className="inline-box-input medium-box" />
          अस्पतालमा उपचार गराउँदै आइरहेको र हाल थप उपचारको लागि लाग्ने लागत
          जुटाउन मेरो आर्थिक अवस्था कमजोर भएको कारणले निःशुल्क उपचार गर्न
          सिफारिस पाऊँ, भनी निवेदन दिनु भएको हुँदा निज निवेदक विपन्न परिवार
          अन्तर्गत पर्ने भएकोले त्यहाँको नियमानुसार आर्थिक सहायता उपलब्ध गराई
          दिनुहुन सिफारिस गरिन्छ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <input type="text" className="line-input medium-input" />
          <select className="designation-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input" />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn">
          रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default ReqforHelpinHealth;
