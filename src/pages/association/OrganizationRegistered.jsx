// 10
import React from "react";
import "./OrganizationRegistered.css";

function OrganizationRegistered() {
  return (
    <div className="orgreg-page">
      {/* Top dark bar */}
      <header className="orgreg-topbar">
        <div className="orgreg-top-left">संस्था दर्ता गरिएको ।</div>
        <div className="orgreg-top-right">
          अवलोकन पृष्ठ / संस्था दर्ता गरिएको
        </div>
      </header>

      {/* Main paper */}
      <div className="orgreg-paper">
        {/* Letterhead */}
        <div className="orgreg-letterhead">
          <div className="orgreg-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="orgreg-head-text">
            <div className="orgreg-head-main">नागार्जुन नगरपालिका</div>
            <div className="orgreg-head-ward">१ नं. वडा कार्यालय</div>
            <div className="orgreg-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="orgreg-head-meta">
            <div className="orgreg-meta-line">
              मिति : <input type="text" className="orgreg-small-input" />
            </div>
            <div className="orgreg-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="orgreg-ref-row">
          <div className="orgreg-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="orgreg-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री अध्यक्ष ज्यु */}
        <div className="orgreg-to-block">
          <span>श्री अध्यक्ष ज्यु,</span>
          <br />
          <input
            type="text"
            className="orgreg-long-input orgreg-to-second"
            placeholder=""
          />
        </div>

        {/* Subject */}
        <div className="orgreg-subject-row">
          <span className="orgreg-sub-label">विषयः</span>
          <span className="orgreg-subject-text">संस्था दर्ता गरिएको बारे ।</span>
        </div>

        {/* Top line with select fields */}
        <p className="orgreg-body">
          प्रस्तुत विषयमा{" "}
          <select className="orgreg-select">
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>{" "}
          वडा नं. <input type="text" className="orgreg-tiny-input" />{" "}
          <span>जिल्ला</span>{" "}
          <input type="text" className="orgreg-small-inline" /> मा रहेको{" "}
          <input type="text" className="orgreg-medium-input" />{" "}
          नामक संस्था दर्ता सम्बन्धि मिति{" "}
          <input type="text" className="orgreg-small-inline" /> मा प्राप्त निवेदन
          तथा आवश्यक कागजातका आधारमा{" "}
          <input type="text" className="orgreg-medium-input" />{" "}
          नामक संस्था दर्ता गरी प्रमाण पत्र जारी गरिएको व्यहोरा जानकारी गराइएको
          छ ।
        </p>

        {/* Big blank body area as in screenshot */}
        <div className="orgreg-blank-area" />

        {/* Signature (right side) */}
        <div className="orgreg-sign-top">
          <input
            type="text"
            className="orgreg-sign-name"
            placeholder="नाम, थर"
          />
          <select className="orgreg-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="orgreg-section-title">निवेदकको विवरण</h3>
        <div className="orgreg-applicant-box">
          <div className="orgreg-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="orgreg-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="orgreg-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="orgreg-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="orgreg-submit-row">
          <button className="orgreg-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="orgreg-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default OrganizationRegistered;
