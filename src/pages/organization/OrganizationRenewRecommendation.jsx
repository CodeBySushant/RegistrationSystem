// 3
import React from "react";
import "./OrganizationRenewRecommendation.css";

function OrganizationRenewal() {
  return (
    <div className="org-page">
      {/* Top dark bar */}
      <header className="org-topbar">
        <div className="org-top-left">संस्था नवीकरण सिफारिस ।</div>
        <div className="org-top-right">
          अवलोकन पृष्ठ / संस्था नवीकरण सिफारिस
        </div>
      </header>

      {/* Main paper */}
      <div className="org-paper">
        {/* Letterhead */}
        <div className="org-letterhead">
          <div className="org-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="org-head-text">
            <div className="org-head-main">नागार्जुन नगरपालिका</div>
            <div className="org-head-ward">१ नं. वडा कार्यालय</div>
            <div className="org-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="org-head-meta">
            <div className="org-meta-line">
              मिति : <input type="text" className="org-small-input" />
            </div>
            <div className="org-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="org-ref-row">
          <div className="org-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="org-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To block */}
        <div className="org-to-block">
          <span>श्री</span>
          <input type="text" className="org-long-input" />
          <span>ज्यु</span>
          <br />
          <input
            type="text"
            className="org-long-input org-to-second"
            placeholder=""
          />
        </div>

        {/* Subject */}
        <div className="org-subject-row">
          <span className="org-sub-label">विषयः</span>
          <span className="org-subject-text">सिफारिस सम्बन्धमा ।</span>
        </div>

        {/* Main sentence */}
        <p className="org-body">
          उपर्युक्त विषयमा{" "}
          <span className="org-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="org-tiny-input" /> (साबिक{" "}
          <input type="text" className="org-small-inline" /> वडा नं.{" "}
          <input type="text" className="org-tiny-input" />) मा बस्ने श्री{" "}
          <input type="text" className="org-medium-input" /> को नाममा रहेको{" "}
          <input type="text" className="org-medium-input" /> नामक संस्था नवीकरण
          गर्नुपर्ने भएकोले सो को लागि सिफारिस गरी पाउँ भनी प्रस्तुत निवेदन अनुसार
          यस वडा कार्यालयबाट आवश्यक अनुसार सिफारिस गरिएको छ ।
        </p>

        {/* Big empty body area (grey in original form) */}
        <div className="org-body-blank" />

        {/* Signature name + post on right */}
        <div className="org-sign-top">
          <input
            type="text"
            className="org-sign-name"
            placeholder="नाम, थर"
          />
          <select className="org-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="org-section-title">निवेदकको विवरण</h3>
        <div className="org-applicant-box">
          <div className="org-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="org-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="org-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="org-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="org-submit-row">
          <button className="org-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="org-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default OrganizationRenewal;
