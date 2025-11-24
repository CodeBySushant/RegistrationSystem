// 10
import React from "react";
import "./IndustryTransferAcceptanceLetter.css";

function IndustryTransferAcceptanceLetter() {
  return (
    <div className="ital-page">
      {/* Top bar */}
      <header className="ital-topbar">
        <div className="ital-top-left">उद्योग स्थानान्तरण ।</div>
        <div className="ital-top-right">
          अवलोकन पृष्ठ / उद्योग स्थानान्तरण
        </div>
      </header>

      {/* Main paper */}
      <div className="ital-paper">
        {/* Annex / title */}
        <div className="ital-annex">
          <div>अनुसूची–७</div>
          <div>(नियम ७ को उपनियम (२) संग सम्बन्धित)</div>
          <div className="ital-annex-title">उद्योग स्थानान्तरणको स्वीकृति पत्र</div>
        </div>

        {/* Date */}
        <div className="ital-date-row">
          मिति : <input type="text" className="ital-date-input" />
        </div>

        {/* To block */}
        <div className="ital-to-block">
          <span>श्री</span>
          <input type="text" className="ital-long-input" />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="ital-long-input ital-to-second" />
        </div>

        {/* Subject */}
        <div className="ital-subject-row">
          <span className="ital-sub-label">विषयः</span>
          <span className="ital-subject-text">
            उद्योग स्थानान्तरणको स्वीकृति बारे ।
          </span>
        </div>

        {/* Body text lines */}
        <p className="ital-body">
          महोदय, यस <input type="text" className="ital-small" /> मा दिइएको मिति{" "}
          <input type="text" className="ital-small" /> मा दर्ता भएको बागमती प्रदेश{" "}
          <input type="text" className="ital-small" /> काठमाडौं जिल्ला{" "}
          <input type="text" className="ital-medium" /> नगरपालिका वडा नं.{" "}
          <input type="text" className="ital-tiny" /> मा रहेको उद्योग{" "}
          <input type="text" className="ital-medium" /> नामक उद्योगलाई{" "}
          <input type="text" className="ital-medium" /> नगरपालिका / गाउँपालिका वडा
          नं. <input type="text" className="ital-tiny" /> मा स्थानान्तरण गर्नका
          लागि यस <input type="text" className="ital-small" /> को निर्णय अनुसार
          स्थानान्तरणको स्वीकृति दिइएको छ ।
        </p>

        {/* Name + post on right */}
        <div className="ital-sign-top-row">
          <div className="ital-sign-name">
            <input
              type="text"
              className="ital-sign-name-input"
              placeholder="नाम, थर"
            />
          </div>
          <div className="ital-sign-post">
            <select className="ital-post-select">
              <option>पद छनौट गर्नुहोस्</option>
              <option>अधिकृत</option>
              <option>संचालक</option>
              <option>प्रमुख</option>
            </select>
          </div>
        </div>

        {/* Conditions */}
        <div className="ital-conditions">
          <div className="ital-cond-title">शर्तहरू:</div>
          <ol>
            <li>स्वीकृति प्राप्त भएको मितिले ६ महिनाभित्र उद्योग संचालन गर्नुपर्ने।</li>
            <li>स्थानान्तरण सम्बन्धी कानूनी तथा प्रशासनिक प्रक्रिया पूरा गर्नुपर्ने।</li>
          </ol>
        </div>

        {/* Editor-style comment box */}
        <div className="ital-editor-wrapper">
          <div className="ital-editor-toolbar">
            <button type="button">B</button>
            <button type="button">I</button>
            <button type="button">U</button>
            <button type="button">•</button>
            <button type="button">1.</button>
            <span className="ital-toolbar-label">Styles</span>
            <span className="ital-toolbar-label">Format</span>
          </div>
          <textarea
            className="ital-editor-area"
            rows="7"
            placeholder="थप विवरण वा टिप्पणी यहाँ लेख्नुहोस्…"
          />
        </div>

        {/* Applicant details */}
        <h3 className="ital-section-title">निवेदकको विवरण</h3>
        <div className="ital-applicant-box">
          <div className="ital-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="ital-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="ital-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="ital-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="ital-submit-row">
          <button className="ital-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ital-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryTransferAcceptanceLetter;
