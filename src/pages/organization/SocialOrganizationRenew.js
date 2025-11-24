// 6
import React from "react";
import "./SocialOrganizationRenew.css";

function SocialOrganizationRenew() {
  return (
    <div className="sor-page">
      {/* Top dark bar */}
      <header className="sor-topbar">
        <div className="sor-top-left">सामाजिक संस्था नवीकरण</div>
        <div className="sor-top-right">
          अवलोकन पृष्ठ / सामाजिक संस्था नवीकरण सिफारिस
        </div>
      </header>

      {/* Main paper */}
      <div className="sor-paper">
        {/* Letterhead */}
        <div className="sor-letterhead">
          <div className="sor-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="sor-head-text">
            <div className="sor-head-main">नागार्जुन नगरपालिका</div>
            <div className="sor-head-ward">१ नं. वडा कार्यालय</div>
            <div className="sor-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="sor-head-meta">
            <div className="sor-meta-line">
              मिति : <input type="text" className="sor-small-input" />
            </div>
            <div className="sor-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="sor-ref-row">
          <div className="sor-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="sor-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री जिल्ला प्रशासन कार्यालय ... */}
        <div className="sor-to-block">
          <span>श्री</span>
          <input type="text" className="sor-long-input" />
          <span>जिल्ला प्रशासन कार्यालय,</span>
          <br />
          <input
            type="text"
            className="sor-long-input sor-to-second"
            placeholder="काठमाडौं"
          />
          <span>ज्यु</span>
        </div>

        {/* Subject */}
        <div className="sor-subject-row">
          <span className="sor-sub-label">विषयः</span>
          <span className="sor-subject-text">सिफारिस गरिएको बारेमा ।</span>
        </div>

        {/* Main text */}
        <p className="sor-body">
          प्रस्तुत विषयमा{" "}
          <span className="sor-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="sor-tiny-input" /> (साबिक{" "}
          <input type="text" className="sor-small-inline" /> वडा नं.{" "}
          <input type="text" className="sor-tiny-input" />), जिल्ला{" "}
          <input type="text" className="sor-small-inline" /> स्थित{" "}
          <select className="sor-select">
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>{" "}
          वडा नं. <input type="text" className="sor-tiny-input" /> स्थित{" "}
          <input type="text" className="sor-medium-input" /> नामक सामाजिक संस्था
          नवीकरणको सिफारिसका लागि यस कार्यलयमा प्राप्त निवेदन तथा पेश गरिएका
          आवश्यक कागजातका आधारमा संस्था नवीकरणको सिफारिस गरी पाउँ भनी अनुरोध
          गरिएको हुँदा नवीकरण गरिदिनुहुन सिफारिस साथ अनुरोध गर्दछौं ।
        </p>

        {/* Big blank middle area */}
        <div className="sor-blank-area" />

        {/* Signature (right) */}
        <div className="sor-sign-top">
          <input
            type="text"
            className="sor-sign-name"
            placeholder="नाम, थर"
          />
          <select className="sor-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="sor-section-title">निवेदकको विवरण</h3>
        <div className="sor-applicant-box">
          <div className="sor-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="sor-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="sor-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="sor-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="sor-submit-row">
          <button className="sor-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="sor-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default SocialOrganizationRenew;
