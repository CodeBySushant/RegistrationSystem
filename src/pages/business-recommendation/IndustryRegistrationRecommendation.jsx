// 12
import React from "react";
import "./IndustryRegistrationRecommendation.css";

function IndustryRegistrationRecommendation() {
  return (
    <div className="irr-page">
      {/* Top breadcrumb bar */}
      <header className="irr-topbar">
        <div className="irr-top-left">उद्योग दर्ता सिफारिस ।</div>
        <div className="irr-top-right">
          अवलोकन पृष्ठ / उद्योग दर्ता सिफारिस
        </div>
      </header>

      {/* Main paper */}
      <div className="irr-paper">
        {/* Letterhead */}
        <div className="irr-letterhead">
          <div className="irr-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Nepal Emblem"
            />
          </div>

          <div className="irr-head-text">
            <div className="irr-head-main">नागार्जुन नगरपालिका</div>
            <div className="irr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="irr-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="irr-head-meta">
            <div>
              मिति : <input type="text" className="irr-small-input" />
            </div>
          </div>
        </div>

        {/* पत्र / चलानी नम्बर */}
        <div className="irr-ref-row">
          <div className="irr-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="irr-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To block */}
        <div className="irr-to-block">
          <span>श्री</span>
          <input type="text" className="irr-long-input" />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="irr-long-input irr-to-second" />
        </div>

        {/* Subject */}
        <div className="irr-subject-row">
          <span className="irr-sub-label">विषयः</span>
          <span className="irr-subject-text">
            प्रमाणित सिफारिस गरिएको बारे ।
          </span>
        </div>

        {/* Main body text – approximated with inline inputs */}
        <p className="irr-body">
          उपरोक्त सम्बन्धमा जिल्ला काठमाडौं साबिक{" "}
          <input type="text" className="irr-small-field" /> वडा नं.{" "}
          <input type="text" className="irr-tiny-field" /> भई हाल नागार्जुन
          नगरपालिका वडा नं. १ मा बस्ने{" "}
          <input type="text" className="irr-medium-field" /> ले{" "}
          <input type="text" className="irr-small-field" /> उद्योग दर्ता गर्न
          सिफारिस पाऊँ भनी यस वडा कार्यालयमा दिनु भएको निवेदन अनुसार, मिति{" "}
          <input type="text" className="irr-small-field" /> देखि{" "}
          <input type="text" className="irr-small-field" /> सम्म स्थानमा रहेर
          व्यवसाय संचालन गर्दै आएको र सो स्थान{" "}
          <input type="text" className="irr-medium-field" /> को किता नं.{" "}
          <input type="text" className="irr-small-field" /> को क्षेत्रफल{" "}
          <input type="text" className="irr-small-field" /> मा रहेको देखिन्छ ।
        </p>

        <p className="irr-body">
          स्थानमा पूर्व{" "}
          <input type="text" className="irr-medium-field" /> पश्चिम{" "}
          <input type="text" className="irr-medium-field" /> उत्तर{" "}
          <input type="text" className="irr-medium-field" /> दक्षिण{" "}
          <input type="text" className="irr-medium-field" /> गरी चार किल्ला
          घेरिएको जग्गामा कस्ता प्रकारका संरचना रहेको र उक्त स्थान नजिकमा
          अन्तराष्ट्रिय विद्यालय, स्वास्थ्य संस्था, धार्मिक स्थल, वन, वनस्पति,
          सार्वजनिक संघ संस्था, बालबालिका खेल्ने स्थान, मन्दिर, मस्जिद, चर्च आदि
          सार्वजनिक महत्वपूर्ण स्थल नरहेकोले उक्त उद्योग संचालन गर्दा जनस्वास्थ्य,
          वातावरण तथा सार्वजनिक सरसफाइमा प्रतिकूल असर नपर्ने देखिएकोले उद्योग
          दर्ता गर्नका लागि सिफारिस साथ सो सम्बन्धित कार्यालयमा पेश गरिएको छ ।
        </p>

        {/* Name + post on right */}
        <div className="irr-sign-top">
          <input
            type="text"
            className="irr-sign-name"
            placeholder="नाम, थर"
          />
          <select className="irr-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="irr-section-title">निवेदकको विवरण</h3>
        <div className="irr-applicant-box">
          <div className="irr-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="irr-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="irr-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="irr-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="irr-submit-row">
          <button className="irr-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="irr-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryRegistrationRecommendation;
