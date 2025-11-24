// 5
import React from "react";
import "./IndustryFormCancellation.css";

function IndustryFormCancellation() {
  return (
    <div className="ufc-page">
      {/* Top bar with title + breadcrumb */}
      <header className="ufc-topbar">
        <div className="ufc-top-left">उद्योगको दर्ता खारेजी ।</div>
        <div className="ufc-top-right">डाउनलोड / उद्योगको दर्ता खारेजी</div>
      </header>

      {/* Main paper */}
      <div className="ufc-paper">
        {/* Annex heading */}
        <div className="ufc-annex">
          <div>अनुसूची–३२</div>
          <div>(नियम १० को उपनियम (३) संग सम्बन्धित)</div>
          <div className="ufc-annex-title">
            उद्योगको दर्ता खारेजको लागि दिइने निवेदन
          </div>
        </div>

        {/* Date top-right */}
        <div className="ufc-date-row">
          मिति : <input type="text" className="ufc-date-input" />
        </div>

        {/* To section */}
        <div className="ufc-to-block">
          <span>श्री</span>
          <input type="text" className="ufc-long-input" />{" "}
          <span>ज्यु,</span>
          <br />
          <input type="text" className="ufc-long-input second" />
        </div>

        {/* Subject */}
        <div className="ufc-subject-row">
          <span className="ufc-subject-label">विषयः</span>
          <span className="ufc-subject-text">
            उद्योग दर्ता खारेज गरिदिने सम्बन्धमा ।
          </span>
        </div>

        {/* Body paragraph with inline inputs */}
        <p className="ufc-body">
          उद्योग दर्ता प्रमाण मिति{" "}
          <input type="text" className="ufc-small-input" /> मा दर्ता भई बागमती
          प्रदेश <input type="text" className="ufc-small-input" /> काठमाडौं
          जिल्ला नागार्जुन नगरपालिका वडा नं.{" "}
          <input type="text" className="ufc-tiny-input" /> मा स्थित यस उद्योग
          मिति <input type="text" className="ufc-small-input" /> देखि संचालन
          भएको र मिति <input type="text" className="ufc-small-input" /> देखि
          उद्योग बन्द भएकोले उद्योग व्यवसाय सम्बन्धी नियमावली, २०७६ को नियम
          ९ बमोजिम उद्योगको दर्ता खारेज गरिदिनुहुन निवेदन साथ अनुरोध गर्दछु /
          गर्दछौं।
        </p>

        {/* Reason list + signature box on right */}
        <div className="ufc-middle-section">
          <div className="ufc-reason">
            <div className="ufc-reason-title">खास कारण:</div>
            <ol>
              <li>उद्योग संचालन गर्न नसकिएको कारणले स्थायी रुपमा बन्द गरिएको।</li>
              <li>उद्योग संचालन उद्देश्य परिवर्तन गरिएको।</li>
              <li>सरकारी वा स्थानीय तहको नीतिगत निर्णय।</li>
              <li>उद्योग सञ्चालनको आर्थिक अवस्था प्रतिकुल।</li>
              <li>उद्योग स्थानान्तरण गरिएको।</li>
              <li>उद्योग दिनु हुने अदालत वा यायिक निकायमा मुद्दा विचाराधीन नरहेको घोषणा।</li>
            </ol>
          </div>

          <div className="ufc-sign-box">
            <div className="ufc-sign-title">निवेदकको</div>
            <div className="ufc-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" />
            </div>
            <div className="ufc-sign-field">
              <span>नाम, थर :</span>
              <input type="text" />
            </div>
            <div className="ufc-sign-field">
              <span>पद :</span>
              <input type="text" />
            </div>
          </div>
        </div>

        {/* Applicant details */}
        <h3 className="ufc-section-title">निवेदकको विवरण</h3>
        <div className="ufc-applicant-box">
          <div className="ufc-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="ufc-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="ufc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="ufc-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="ufc-submit-row">
          <button className="ufc-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ufc-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryFormCancellation;
