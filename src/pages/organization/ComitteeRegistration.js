// 7
import React from "react";
import "./ComitteeRegistration.css";

function ComitteeRegistration() {
  return (
    <div className="cr-page">
      {/* Top dark bar */}
      <header className="cr-topbar">
        <div className="cr-top-left">समिति दर्ता सिफारिस</div>
        <div className="cr-top-right">
          अवलोकन पृष्ठ / समिति दर्ता सिफारिस
        </div>
      </header>

      {/* Main paper */}
      <div className="cr-paper">
        {/* Letterhead */}
        <div className="cr-letterhead">
          <div className="cr-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="cr-head-text">
            <div className="cr-head-main">नागार्जुन नगरपालिका</div>
            <div className="cr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="cr-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="cr-head-meta">
            <div className="cr-meta-line">
              मिति : <input type="text" className="cr-small-input" />
            </div>
            <div className="cr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="cr-ref-row">
          <div className="cr-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="cr-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री जिल्ला प्रशासन कार्यालय ... */}
        <div className="cr-to-block">
          <span>श्री</span>
          <input type="text" className="cr-long-input" />
          <span>जिल्ला प्रशासन कार्यालय,</span>
          <br />
          <input
            type="text"
            className="cr-long-input cr-to-second"
            placeholder="काठमाडौं"
          />
          <span>ज्यु</span>
        </div>

        {/* Subject */}
        <div className="cr-subject-row">
          <span className="cr-sub-label">विषयः</span>
          <span className="cr-subject-text">सिफारिस गरिएको बारेमा ।</span>
        </div>

        {/* Main paragraph */}
        <p className="cr-body">
          प्रस्तुत विषयमा{" "}
          <span className="cr-bold">यस नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="cr-tiny-input" /> (साबिक{" "}
          <input type="text" className="cr-small-inline" /> वडा नं.{" "}
          <input type="text" className="cr-tiny-input" />), जिल्ला{" "}
          <input type="text" className="cr-small-inline" /> स्थित{" "}
          <select className="cr-select">
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>{" "}
          वडा नं. <input type="text" className="cr-tiny-input" /> स्थित{" "}
          <input type="text" className="cr-medium-input" /> नामक समिति दर्ता
          गर्नुपर्ने भएकोले सो को लागि "सिफारिस गरी पाउँ" भनी यस कार्यालयमा दर्ता
          निवेदन बमोजिम दर्ता सिफारिस गरिएको छ ।
        </p>

        {/* Thin blank area for rest of content */}
        <div className="cr-blank-area" />

        {/* Signature (right) */}
        <div className="cr-sign-top">
          <input
            type="text"
            className="cr-sign-name"
            placeholder="नाम, थर"
          />
          <select className="cr-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="cr-section-title">निवेदकको विवरण</h3>
        <div className="cr-applicant-box">
          <div className="cr-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="cr-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="cr-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="cr-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="cr-submit-row">
          <button className="cr-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="cr-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default ComitteeRegistration;
