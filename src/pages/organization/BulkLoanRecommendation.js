// 9
import React from "react";
import "./BulkLoanRecommendation.css";

function BulkLoanRecommendation() {
  return (
    <div className="blr-page">
      {/* Top bar */}
      <header className="blr-topbar">
        <div className="blr-top-left">थोक कर्जा सिफारिस</div>
        <div className="blr-top-right">
          अवलोकन पृष्ठ / थोक कर्जा सिफारिस
        </div>
      </header>

      {/* Paper */}
      <div className="blr-paper">
        {/* Letterhead */}
        <div className="blr-letterhead">
          <div className="blr-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="blr-head-text">
            <div className="blr-head-main">नागार्जुन नगरपालिका</div>
            <div className="blr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="blr-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="blr-head-meta">
            <div className="blr-meta-line">
              मिति : <input type="text" className="blr-small-input" />
            </div>
            <div className="blr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="blr-ref-row">
          <div className="blr-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="blr-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री ... ज्यु */}
        <div className="blr-to-block">
          <span>श्री</span>
          <input type="text" className="blr-long-input" />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="blr-long-input blr-to-second"
            placeholder=""
          />
        </div>

        {/* Subject */}
        <div className="blr-subject-row">
          <span className="blr-sub-label">विषयः</span>
          <span className="blr-subject-text">सिफारिस गरी पठाइदिने बारे ।</span>
        </div>

        {/* Body text */}
        <p className="blr-body">
          प्रस्तुत विषयमा{" "}
          <span className="blr-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="blr-tiny-input" /> (साबिक{" "}
          <input type="text" className="blr-small-inline" /> वडा नं.{" "}
          <input type="text" className="blr-tiny-input" />) मा कार्यलय स्थापना
          गरी आफ्नो क्षेत्रवासीहरुले सहकारी मार्फत ऋण प्रवाह गर्न कार्यलय स्थापना
          गर्न इच्छुक{" "}
          <input type="text" className="blr-medium-input" />{" "}
          सहकारी संस्थाले यस वडा कार्यालयमा निवेदन पेश गरेको हुँदा यस कार्यालयमा
          दर्ता भई आवश्यक कागजातका आधारमा कार्यलय स्थापना गरी थोक कर्जा प्रवाह गर्न
          नेपाल सरकार{" "}
          <input type="text" className="blr-medium-input" /> बाट थोक कर्जा
          प्राप्त गर्नसकिने व्यवस्था मिलाइदिनुहुन सिफारिससाथ अनुरोध गरिएको छ ।
        </p>

        {/* Large blank area */}
        <div className="blr-blank-area" />

        {/* Signature (right side) */}
        <div className="blr-sign-top">
          <input
            type="text"
            className="blr-sign-name"
            placeholder="नाम, थर"
          />
          <select className="blr-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="blr-section-title">निवेदकको विवरण</h3>
        <div className="blr-applicant-box">
          <div className="blr-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="blr-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="blr-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="blr-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="blr-submit-row">
          <button className="blr-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="blr-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default BulkLoanRecommendation;
