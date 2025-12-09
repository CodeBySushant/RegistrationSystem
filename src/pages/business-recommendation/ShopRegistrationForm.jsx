// 4
import React from "react";
import "./ShopRegistrationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

function ShopRegistrationForm() {
  return (
    <div className="srf-page">
      {/* Top dark bar with title + breadcrumb */}
      <header className="srf-topbar">
        <div className="srf-top-left">पसल तथा फार्म दर्ता सिफारिश ।</div>
        <div className="srf-top-right">
          अवलोकन पृष्ठ / पसल तथा फार्म दर्ता सिफारिश
        </div>
      </header>

      {/* Main paper */}
      <div className="srf-paper">
        {/* Letterhead */}
        <div className="srf-letterhead">
          <div className="srf-logo">
            <img src="./nepallogo.svg" alt="Nepal Emblem" />
          </div>

          <div className="srf-head-text">
            <div className="srf-head-main">{MUNICIPALITY.name}</div>
            <div className="srf-head-ward">
              वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
            </div>
            <div className="srf-head-sub">
              {MUNICIPALITY.officeLine} <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>

          <div className="srf-head-meta">
            <div>
              मिति : <input type="text" className="srf-small-input" />
            </div>
            <div className="srf-meta-line">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
          </div>
        </div>

        {/* Letter numbers */}
        <div className="srf-ref-row">
          <div className="srf-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="srf-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To office */}
        <div className="srf-to-block">
          <span>श्री</span>
          <input type="text" className="srf-long-input" />
          <br />
          <span>घरेलु तथा साना उद्योग कार्यालय,</span>
          <input type="text" className="srf-medium-input" />
        </div>

        {/* Subject */}
        <div className="srf-subject-row">
          <span className="srf-subject-label">विषय:</span>
          <span className="srf-subject-text">सिफारिस गरिएको ।</span>
        </div>

        {/* Salutation */}
        <p className="srf-salutation">महोदय,</p>

        {/* Body – inline lines similar to screenshot */}
        <div className="srf-inline-row">
          <span>प्रस्तुत विषयमा</span>
          <input type="text" className="srf-medium-input" />
          <span>जिल्ला</span>
          <input type="text" className="srf-medium-input" />
          <span>{MUNICIPALITY.name} वडा नं.</span>
          <input type="text" className="srf-tiny-input" />
          <span>साबिक</span>
          <input type="text" className="srf-tiny-input" />
          <span>वडा नं.</span>
          <input type="text" className="srf-tiny-input" />
        </div>

        <div className="srf-inline-row">
          <span>निवासी श्री</span>
          <input type="text" className="srf-medium-input" />
          <span>को तर्फबाट श्री</span>
          <input type="text" className="srf-medium-input" />
          <span>को छोरा / छोरी वर्ष</span>
          <input type="text" className="srf-tiny-input" />
          <span>को श्री</span>
          <input type="text" className="srf-medium-input" />
        </div>

        <div className="srf-inline-row">
          <span>उक्त</span>
          <input type="text" className="srf-medium-input" />
          <span>को जग्गा धनी प्रमाण पुर्जा नं.</span>
          <input type="text" className="srf-medium-input" />
          <span>ते नं. वडा साबिक</span>
          <input type="text" className="srf-tiny-input" />
          <span>वडा नं.</span>
          <input type="text" className="srf-tiny-input" />
          <span>अन्तर्गत रहेको</span>
          <input type="text" className="srf-medium-input" />
        </div>

        <p className="srf-body">
          संचालन गर्नका लागि सिफारिस गरी पाउँ भनी यस{" "}
          <input type="text" className="srf-short-input" /> नं. वडा कार्यालयमा
          निवेदन दिनु भएको उक्त उद्योग संचालन गर्दा कुनै पनि जनस्वास्थ्य
          महत्त्वपूर्ण स्थल, विद्यालय, मन्दिर र धार्मिकस्थलहरूलाई कुनै बाधा नपरी
          तथा वातावरणीय प्रदूषण समेत नहुने हुँदा यस वडा कार्यालयबाट सिफारिस साथ
          संलग्न सिफारिस पत्र पठाइएको छ । निजको नाममा उक्त{" "}
          <input type="text" className="srf-short-input" /> दर्ता गरिदिनु हुन
          सिफारिस साथ अनुरोध छ ।
        </p>

        {/* Signature / position section */}
        <div className="srf-sign-row">
          <div className="srf-post-select">
            <input type="text" className="srf-post-input" />
            <select>
              <option>पद छनौट गर्नुहोस्</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <h3 className="srf-section-title">निवेदकको विवरण</h3>
        <div className="srf-applicant-box">
          <div className="srf-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="srf-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="srf-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="srf-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="srf-submit-row">
          <button className="srf-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="srf-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </footer>
    </div>
  );
}

export default ShopRegistrationForm;
