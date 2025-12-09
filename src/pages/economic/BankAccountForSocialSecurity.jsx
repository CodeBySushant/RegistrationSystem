import React from "react";
import "./BankAccountForSocialSecurity.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// 5
const BankAccountForSocialSecurity = () => {
  return (
    <div className="social-security-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सामाजिक सुरक्षाको बैंक खाता खोलिदिने
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षाको बैंक खाता खोलिदिने
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
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
          विषय:{" "}
          <span className="underline-text">
            सामाजिक सुरक्षाको बैंक खाता खोलिदिने सिफारिस।
          </span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
        </div>
        <div className="addressee-row">
          <input type="text" className="line-input medium-input" required />
          <span>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा साविक
          <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
            <option value=""></option>
            <option value="vdc">गा.वि.स.</option>
            <option value="mun">नगरपालिका</option>
          </select>
          वडा नं{" "}
          <input type="text" className="inline-box-input tiny-box" required />
          भई हाल{" "}
          <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
          वडा नं वडा नं{" "}
          <span className="bold-text underline-text">
            {MUNICIPALITY.wardNumber}
          </span>
          बस्ने
          <input type="text" className="inline-box-input medium-box" required />
          को
          <select className="inline-select">
            <option>श्रीमान</option>
            <option>श्रीमती</option>
            <option>बुबा</option>
            <option>आमा</option>
            <option>छोरा</option>
            <option>छोरी</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required />
          ले नेपाल सरकारबाट प्राप्त हुने सामाजिक सुरक्षा
          <select className="inline-select">
            <option>ज्येष्ठ नागरिक</option>
            <option>एकल महिला</option>
            <option>अपाङ्गता</option>
            <option>बाल पोषण</option>
          </select>
          भत्ता बैंक बाट पाउनका लागी ताहाँको बैंकमा बैंक खाता खोल्नु पर्ने
          भएकाले निजलाई बैंक खाता खोली दिनु हुन सिफारीशका साथ अनुरोध गरिन्छ ।
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

export default BankAccountForSocialSecurity;
