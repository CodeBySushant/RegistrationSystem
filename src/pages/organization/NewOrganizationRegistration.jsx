// 5
import React from "react";
import "./NewOrganizationRegistration.css";

function NewOrganizationRegistration() {
  return (
    <div className="nor-page">
      {/* Top dark bar */}
      <header className="nor-topbar">
        <div className="nor-top-left">संस्था दर्ता</div>
        <div className="nor-top-right">अवलोकन पृष्ठ / संस्था दर्ता</div>
      </header>

      {/* Main paper */}
      <div className="nor-paper">
        {/* Letterhead */}
        <div className="nor-letterhead">
          <div className="nor-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="nor-head-text">
            <div className="nor-head-main">नागार्जुन नगरपालिका</div>
            <div className="nor-head-ward">१ नं. वडा कार्यालय</div>
            <div className="nor-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="nor-head-meta">
            <div className="nor-meta-line">
              मिति : <input type="text" className="nor-small-input" />
            </div>
            <div className="nor-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="nor-ref-row">
          <div className="nor-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="nor-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री ... ज्यु */}
        <div className="nor-to-block">
          <span>श्री</span>
          <input type="text" className="nor-long-input" />
          <span>ज्यु</span>
        </div>

        {/* Subject */}
        <div className="nor-subject-row">
          <span className="nor-sub-label">विषयः</span>
          <span className="nor-subject-text">सिफारिस सम्बन्धमा ।</span>
        </div>

        {/* Main description line */}
        <p className="nor-body">
          प्रस्तुत विषयमा{" "}
          <span className="nor-bold">यस नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="nor-tiny-input" /> (साबिक{" "}
          <input type="text" className="nor-small-inline" /> वडा नं.{" "}
          <input type="text" className="nor-tiny-input" />), जिल्ला{" "}
          <input type="text" className="nor-small-inline" /> स्थित रहेको{" "}
          <input type="text" className="nor-medium-input" /> नामक संस्था दर्ता
          गर्नुपर्ने भएकोले सो को लागि “सिफारिस गरी पाउँ” भनी यस कार्यालयमा दर्ता
          निवेदन बमोजिम दर्ता सिफारिस गरिएको छ ।
        </p>

        {/* Big blank middle area */}
        <div className="nor-blank-area" />

        {/* Signature (right) */}
        <div className="nor-sign-top">
          <input
            type="text"
            className="nor-sign-name"
            placeholder="नाम, थर"
          />
          <select className="nor-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="nor-section-title">निवेदकको विवरण</h3>
        <div className="nor-applicant-box">
          <div className="nor-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="nor-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="nor-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="nor-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="nor-submit-row">
          <button className="nor-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="nor-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default NewOrganizationRegistration;
