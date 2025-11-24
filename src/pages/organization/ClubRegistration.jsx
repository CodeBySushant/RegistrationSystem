// 11
import React from "react";
import "./ClubRegistration.css";

function ClubRegistration() {
  return (
    <div className="crp-page">
      {/* Top dark bar */}
      <header className="crp-topbar">
        <div className="crp-top-left">क्लब दर्ता सिफारिस ।</div>
        <div className="crp-top-right">
          अवलोकन पृष्ठ / क्लब दर्ता सिफारिस
        </div>
      </header>

      {/* Main paper */}
      <div className="crp-paper">
        {/* Letterhead */}
        <div className="crp-letterhead">
          <div className="crp-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="crp-head-text">
            <div className="crp-head-main">नागार्जुन नगरपालिका</div>
            <div className="crp-head-ward">१ नं. वडा कार्यालय</div>
            <div className="crp-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="crp-head-meta">
            <div className="crp-meta-line">
              मिति : <input type="text" className="crp-small-input" />
            </div>
            <div className="crp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="crp-ref-row">
          <div className="crp-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="crp-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री ... ज्यु */}
        <div className="crp-to-block">
          <span>श्री</span>
          <input type="text" className="crp-long-input" />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="crp-long-input crp-to-second"
            placeholder="काठमाडौं"
          />
        </div>

        {/* Subject (centered like in screenshot) */}
        <div className="crp-subject-row">
          <span className="crp-sub-label">विषयः</span>
          <span className="crp-subject-text">सिफारिस गरिएको बारे ।</span>
        </div>

        {/* Main paragraph with inline fields */}
        <p className="crp-body">
          उपरोक्त सम्बन्धमा जिल्ला{" "}
          <input type="text" className="crp-small-inline" defaultValue="काठमाडौं" />{" "}
          <span>-</span>{" "}
          <span className="crp-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="crp-tiny-input" /> मा स्थायी बसोबास
          रहने{" "}
          <input
            type="text"
            className="crp-medium-input"
            placeholder="व्यक्तिको नाम"
          />{" "}
          ले{" "}
          <input
            type="text"
            className="crp-medium-input"
            placeholder="क्लबको नाम"
          />{" "}
          नामक क्लब दर्ता सिफारिस गरी पाउँ भनी यस वडा कार्यालयमा निवेदन दिएको
          हुँदा उक्त क्लब{" "}
          <input
            type="text"
            className="crp-medium-input"
            placeholder="ठेगाना / स्थान"
          />{" "}
          मा दर्ता गर्न सिफारिस साथ अनुरोध गरिएको छ ।
        </p>

        {/* Big light area (like your screenshot middle section) */}
        <div className="crp-blank-area" />

        {/* Signature (right) */}
        <div className="crp-sign-top">
          <input
            type="text"
            className="crp-sign-name"
            placeholder="नाम, थर"
          />
          <select className="crp-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="crp-section-title">निवेदकको विवरण</h3>
        <div className="crp-applicant-box">
          <div className="crp-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="crp-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="crp-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="crp-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="crp-submit-row">
          <button className="crp-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="crp-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default ClubRegistration;
