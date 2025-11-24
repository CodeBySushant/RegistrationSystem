// 7
import React from "react";
import "./IndustryClosedNotify.css";

function IndustryClosedNotify() {
  return (
    <div className="ucn-page">
      {/* Top dark bar */}
      <header className="ucn-topbar">
        <div className="ucn-top-left">उद्योग बन्द भएको जानकारी पत्र ।</div>
        <div className="ucn-top-right">
          अवलोकन पृष्ठ / उद्योग बन्द भएको जानकारी पत्र
        </div>
      </header>

      {/* Main paper */}
      <div className="ucn-paper">
        {/* Annex heading */}
        <div className="ucn-annex">
          <div>अनुसूची–३३</div>
          <div>(नियम ९ संग सम्बन्धित)</div>
          <div className="ucn-annex-title">उद्योग बन्द भएको जानकारी पत्र</div>
        </div>

        {/* Date top-right */}
        <div className="ucn-date-row">
          मिति : <input type="text" className="ucn-date-input" />
        </div>

        {/* To section */}
        <div className="ucn-to-block">
          <span>श्री</span>
          <input type="text" className="ucn-long-input" />
          <span>ज्यु,</span>
          <br />
          <span>नागार्जुन , काठमाडौं</span>
          <input type="text" className="ucn-medium-input" />
        </div>

        {/* Subject */}
        <div className="ucn-subject-row">
          <span className="ucn-subject-label">विषयः</span>
          <span className="ucn-subject-text">
            उद्योग बन्द भएको जानकारी सम्बन्धमा ।
          </span>
        </div>

        {/* Body intro with inline inputs */}
        <p className="ucn-body">
          उपरोक्त विषयमा उद्योग मिति{" "}
          <input type="text" className="ucn-small-input" /> मा दर्ता भई{" "}
          <input type="text" className="ucn-small-input" /> नगरपालिका{" "}
          वडा नं. <input type="text" className="ucn-tiny-input" /> मा स्थापना
          भई संचालन गर्न गराइएको परेको यस{" "}
          <input type="text" className="ucn-medium-input" /> उद्योग देखाएको कारणले
          मिति <input type="text" className="ucn-small-input" /> देखि अपरिहार्य
          कारणवश{" "}
          <input type="text" className="ucn-small-input" /> देखि बन्द गरेको भनी
          बुझाई दिनुको लागि अनुरोध गर्दछु / गर्दछौं ।
        </p>

        {/* Reasons list */}
        <div className="ucn-reasons">
          <div className="ucn-reasons-title">उद्योग बन्द हुने सम्भावित कारणहरू:</div>
          <ol>
            <li>आवश्यक कच्चा पदार्थ पाउन नसकेको।</li>
            <li>पूँजीको अभाव भएको।</li>
            <li>बजारको अभाव भएको।</li>
            <li>आर्थिक व्यवस्थापनमा समस्या भएको।</li>
            <li>कामदारहरूको अभाव भएको।</li>
            <li>
              उद्योग पूर्ण रूपमा सञ्चालन नहुनुको कारणले गर्दा कामदार र व्यवस्थापन
              बीच समस्या उत्पन्न भएको।
            </li>
            <li>प्रायोजन आवश्यकता नपर्न गई उद्योग बन्द गरिएको।</li>
          </ol>
        </div>

        {/* Rich-text like editor */}
        <div className="ucn-editor-wrapper">
          <div className="ucn-editor-toolbar">
            <button type="button">B</button>
            <button type="button">I</button>
            <button type="button">U</button>
            <button type="button">•</button>
            <button type="button">1.</button>
            <span className="ucn-toolbar-label">Styles</span>
            <span className="ucn-toolbar-label">Format</span>
          </div>
          <textarea
            className="ucn-editor-area"
            rows="8"
            placeholder="यहाँ उद्योग बन्दसम्बन्धी विस्तृत विवरण लेख्नुहोस्..."
          />
        </div>

        {/* Attached docs + sign box */}
        <div className="ucn-bottom-grid">
          <div className="ucn-docs">
            <div className="ucn-docs-title">संलग्न कागजातः</div>
            <ol>
              <li>
                उद्योग बन्द हुने कारण / कारणहरू स्पष्ट हुनेगरी तयार गरिएको विस्तृत प्रतिवेदन।
              </li>
              <li>
                नियमावलीको नियम ९ को उपनियम (३) मा उल्लेखित कागजातको विवरण।
              </li>
            </ol>
          </div>

          <div className="ucn-sign-box">
            <div className="ucn-sign-caption">निवेदकको :</div>
            <div className="ucn-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" />
            </div>
            <div className="ucn-sign-field">
              <span>नाम, थर :</span>
              <input type="text" />
            </div>
            <div className="ucn-sign-field">
              <span>पद :</span>
              <input type="text" />
            </div>
          </div>
        </div>

        {/* Applicant details */}
        <h3 className="ucn-section-title">निवेदकको विवरण</h3>
        <div className="ucn-applicant-box">
          <div className="ucn-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="ucn-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="ucn-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="ucn-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="ucn-submit-row">
          <button className="ucn-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ucn-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryClosedNotify;
