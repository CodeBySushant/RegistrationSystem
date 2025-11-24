// 9
import React from "react";
import "./IndustryTransferAcceptanceReq.css";

function IndustryTransferAcceptanceReq() {
  return (
    <div className="itar-page">
      {/* Top bar */}
      <header className="itar-topbar">
        <div className="itar-top-left">उद्योग स्थानान्तरण स्वीकृति अनुरोध ।</div>
        <div className="itar-top-right">
          अवलोकन पृष्ठ / उद्योग स्थानान्तरण स्वीकृति अनुरोध
        </div>
      </header>

      {/* Main paper */}
      <div className="itar-paper">
        {/* Annex heading */}
        <div className="itar-annex">
          <div>अनुसूची–६</div>
          <div>(नियम ७ को उपनियम (२) संग सम्बन्धित)</div>
          <div className="itar-annex-title">उद्योग स्थानान्तरिका लागि दिने निवेदन</div>
        </div>

        {/* Date */}
        <div className="itar-date-row">
          मिति : <input type="text" className="itar-date-input" />
        </div>

        {/* To block */}
        <div className="itar-to-block">
          <span>श्री</span>
          <input type="text" className="itar-long-input" />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="itar-long-input itar-to-second" />
        </div>

        {/* Subject */}
        <div className="itar-subject-row">
          <span className="itar-sub-label">विषयः</span>
          <span className="itar-subject-text">
            उद्योग स्थानान्तरको स्वीकृति बारे ।
          </span>
        </div>

        {/* Body lines */}
        <p className="itar-body">
          महोदय, यस <input type="text" className="itar-small-input" /> मा मिति{" "}
          <input type="text" className="itar-small-input" /> मा दर्ता भएको बागमती
          प्रदेश <input type="text" className="itar-small-input" /> काठमाडौं
          जिल्ला नागार्जुन नगरपालिका वडा नं.{" "}
          <input type="text" className="itar-tiny-input" /> मा स्थापना भई संचालन
          भई रहेको <input type="text" className="itar-medium-input" /> उद्योग
          देखाएको कारणले स्थानान्तरण गर्नुपर्ने भएकोले सम्बन्धित निवेदनसहित यसै
          स्थानान्तरको स्वीकृतिको लागि अनुरोध गर्दछु । सकेसम्म लाग्ने कागजातहरू
          समेत संलग्न राखेको छु ।
        </p>

        {/* Reason textarea */}
        <div className="itar-reason-block">
          <div className="itar-reason-label">उद्योग स्थानान्तर गर्नुपर्ने कारणहरू:</div>
          <textarea
            rows="8"
            className="itar-reason-textarea"
            placeholder="उद्योग स्थानान्तरण गर्नुपर्ने कारणहरू यहाँ उल्लेख गर्नुहोस्…"
          />
        </div>

        {/* Attached docs + signature */}
        <div className="itar-bottom-grid">
          <div className="itar-docs">
            <div className="itar-docs-title">संलग्न कागजातहरूः</div>
            <ol>
              <li>उद्योग स्थानान्तरण गर्ने सम्बन्धमा सञ्चालक समितिले गरेको निर्णय।</li>
              <li>स्थानान्तरण हुने स्थानको विवरण।</li>
              <li>
                प्रारम्भिक वातावरणीय परीक्षण वा वातावरणीय प्रभाव मूल्यांकन आवश्यक पर्ने
                हकमा सो को सम्बन्धित निकायबाट स्वीकृत भएको प्रतिवेदन।
              </li>
              <li>अनुसूची–७ बमोजिमको उद्योगको परिवर्तो प्रस्ताव (पुग्ने)।</li>
              <li>उद्योग स्थानान्तरण गरी संचालन गर्न चाहिने अनुमतिपत्रको अवधी।</li>
              <li>अन्य कागजात।</li>
            </ol>
          </div>

          <div className="itar-sign-box">
            <div className="itar-sign-title">निवेदकको :</div>
            <div className="itar-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" />
            </div>
            <div className="itar-sign-field">
              <span>नाम, थर :</span>
              <input type="text" />
            </div>
            <div className="itar-sign-field">
              <span>पद :</span>
              <input type="text" />
            </div>
            <div className="itar-sign-field">
              <span>ठेगाना :</span>
              <input type="text" />
            </div>
            <div className="itar-sign-field">
              <span>इमेल :</span>
              <input type="text" />
            </div>
          </div>
        </div>

        {/* Applicant details */}
        <h3 className="itar-section-title">निवेदकको विवरण</h3>
        <div className="itar-applicant-box">
          <div className="itar-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="itar-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="itar-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="itar-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="itar-submit-row">
          <button className="itar-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="itar-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryTransferAcceptanceReq;
