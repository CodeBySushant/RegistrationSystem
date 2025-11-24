// 14
import React from "react";
import "./BusinessExtensionPannumber.css";

function BusinessExtensionPannumber() {
  return (
    <div className="bep-page">
      {/* Top dark bar */}
      <header className="bep-topbar">
        <div className="bep-top-left">कारोबार थप स्थायी लेखा नं.</div>
        <div className="bep-top-right">
          अवलोकन पृष्ठ / कारोबार थप स्थायी लेखा नं.
        </div>
      </header>

      {/* Main paper */}
      <div className="bep-paper">
        {/* Letterhead */}
        <div className="bep-letterhead">
          <div className="bep-logo">
            {/* you can replace this src with your local logo if needed */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Nepal Emblem"
            />
          </div>

          <div className="bep-head-text">
            <div className="bep-head-main">नागार्जुन नगरपालिका</div>
            <div className="bep-head-ward">१ नं. वडा कार्यालय</div>
            <div className="bep-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="bep-head-meta">
            <div>
              मिति : <input type="text" className="bep-small-input" />
            </div>
            <div className="bep-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="bep-ref-row">
          <div className="bep-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="bep-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To block */}
        <div className="bep-to-block">
          <span>श्री</span>
          <input type="text" className="bep-long-input" />
          <br />
          <input type="text" className="bep-long-input bep-to-second" />
        </div>

        {/* Subject */}
        <div className="bep-subject-row">
          <span className="bep-sub-label">विषयः</span>
          <span className="bep-subject-text">सिफारिस गरिएको बारे ।</span>
        </div>

        {/* Main paragraph (inline inputs) */}
        <p className="bep-body">
          उपरोक्त बिषयमा <span className="bep-bold">नागार्जुन नगरपालिका</span> वडा
          नं. <input type="text" className="bep-tiny-input" /> (साबिक{" "}
          <input type="text" className="bep-small-inline" /> वडा नं.{" "}
          <input type="text" className="bep-tiny-input" />) मा बस्ने श्री{" "}
          <input type="text" className="bep-medium-input" /> ले दिइएको निवेदन
          अनुसार <input type="text" className="bep-small-inline" /> पान नं.{" "}
          <input type="text" className="bep-small-inline" /> मा कारोबार थप गरी{" "}
          <input type="text" className="bep-medium-input" /> सहितको व्यवसाय
          संचालन गर्दै आइरहेको अवस्था र हाल उक्त पान नं. मा कारोबार थप गरी देहाय
          राखिएको विवरणको सत्यताको आधारमा कारोबार थप स्थायी लेखा नं. सिफारिस
          गरिएको छ ।
        </p>

        {/* Details box */}
        <section className="bep-section">
          <h3 className="bep-subtitle">बोधार्थ :</h3>

          <textarea
            rows={4}
            className="bep-textarea"
            placeholder="यहाँ कारोबार थप सम्बन्धी विवरण लेख्नुहोस्…"
          />
        </section>

        {/* Signature side (name + post on right) */}
        <div className="bep-sign-top">
          <input
            type="text"
            className="bep-sign-name"
            placeholder="नाम, थर"
          />
          <select className="bep-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="bep-section-title">निवेदकको विवरण</h3>
        <div className="bep-applicant-box">
          <div className="bep-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="bep-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="bep-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="bep-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="bep-submit-row">
          <button className="bep-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bep-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default BusinessExtensionPannumber;
