// 4
import React from "react";
import "./OrganizationRegistrationRecommendation.css";

function OrganizationRegistrationRecommendation() {
  return (
    <div className="orr-page">
      {/* Top bar */}
      <header className="orr-topbar">
        <div className="orr-top-left">घरेलु तथा साना उद्योग दर्ता सिफारिस</div>
        <div className="orr-top-right">
          अवलोकन पृष्ठ / संस्था दर्ता सिफारिस सम्बन्धमा
        </div>
      </header>

      {/* Paper */}
      <div className="orr-paper">
        {/* Letterhead */}
        <div className="orr-letterhead">
          <div className="orr-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="orr-head-text">
            <div className="orr-head-main">नागार्जुन नगरपालिका</div>
            <div className="orr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="orr-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="orr-head-meta">
            <div>
              मिति : <input type="text" className="orr-small-input" />
            </div>
            <div className="orr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र / चलानी */}
        <div className="orr-ref-row">
          <div className="orr-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="orr-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To block */}
        <div className="orr-to-block">
          <span>श्री</span>
          <input type="text" className="orr-long-input" />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="orr-long-input orr-to-second"
            placeholder="उद्योग शाखा,"
          />
          <br />
          <input
            type="text"
            className="orr-long-input orr-to-second"
            placeholder="नागार्जुन नगरपालिका, काठमाडौं"
          />
        </div>

        {/* Subject */}
        <div className="orr-subject-row">
          <span className="orr-sub-label">विषयः</span>
          <span className="orr-subject-text">सिफारिस सम्बन्धमा ।</span>
        </div>

        {/* Paragraph with inline fields */}
        <p className="orr-body">
          उपर्युक्त सम्बन्धमा जिल्ला काठमाडौं{" "}
          <span className="orr-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="orr-tiny-input" /> साबिक{" "}
          <input type="text" className="orr-small-inline" /> वडा नं.{" "}
          <input type="text" className="orr-tiny-input" /> मा बस्ने{" "}
          <input type="text" className="orr-medium-input" /> ले हाल{" "}
          <input type="text" className="orr-medium-input" /> वडा नं.{" "}
          <input type="text" className="orr-tiny-input" /> मा बसेर{" "}
          <input type="text" className="orr-medium-input" /> नामक उद्योग / व्यवसाय
          स्थापना गर्न चाहेकोले सो स्थापना गर्नुपर्ने देहायको स्थानमा उक्त उद्योग
          / व्यवसाय स्थापना गर्न अनुमति प्रदान गरी दिनु हुन सिफारिस साथ अनुरोध
          गरिएको छ ।
        </p>

        {/* Location details row (roughly matches the underlined fields) */}
        <div className="orr-location-row">
          <span>उद्योग स्थापना हुने स्थान :</span>
          <span>गाउँपालिका / नगरपालिका :</span>
          <input type="text" className="orr-small-inline" />
          <span>वडा नं. :</span>
          <input type="text" className="orr-tiny-input" />
          <span>टोल/स्थान :</span>
          <input type="text" className="orr-medium-input" />
        </div>

        <div className="orr-location-row">
          <span>कित्ता नं. :</span>
          <input type="text" className="orr-small-inline" />
          <span>क्षेत्रफल :</span>
          <input type="text" className="orr-small-inline" />
          <span>सीमा पूर्व :</span>
          <input type="text" className="orr-medium-input" />
          <span>पश्चिम :</span>
          <input type="text" className="orr-medium-input" />
        </div>

        <div className="orr-location-row">
          <span>दक्षिण :</span>
          <input type="text" className="orr-medium-input" />
          <span>उत्तर :</span>
          <input type="text" className="orr-medium-input" />
        </div>

        {/* Applicant section label line */}
        <div className="orr-divider" />

        {/* Signature (right side) */}
        <div className="orr-sign-top">
          <input
            type="text"
            className="orr-sign-name"
            placeholder="नाम, थर"
          />
          <select className="orr-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="orr-section-title">निवेदकको विवरण</h3>
        <div className="orr-applicant-box">
          <div className="orr-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="orr-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="orr-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="orr-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="orr-submit-row">
          <button className="orr-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="orr-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default OrganizationRegistrationRecommendation;
