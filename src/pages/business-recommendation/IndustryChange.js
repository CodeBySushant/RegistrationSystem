// 6
import React from "react";
import "./IndustryChange.css";

function UdhyogStrengthChange() {
  return (
    <div className="usc-page">
      {/* Top breadcrumb */}
      <header className="usc-topbar">
        <div className="usc-top-left">उद्योगको दर्ता हेरफेर।</div>
        <div className="usc-top-right">डाउनलोड / उद्योगको स्थिर पुँजी परिवर्तन</div>
      </header>

      {/* Main Paper */}
      <div className="usc-paper">
        {/* Title Section */}
        <div className="usc-title-block">
          <div>अनुसूची–३२</div>
          <div>(नियम १२ को उपनियम (३) संग सम्बन्धित)</div>
          <div className="usc-title-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेरको लागि दिइने निवेदन
          </div>
        </div>

        {/* Date */}
        <div className="usc-date-row">
          मिति : <input type="text" className="usc-date-input" />
        </div>

        {/* To Office */}
        <div className="usc-to-row">
          <span>श्री</span>
          <input type="text" className="usc-long" />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="usc-long margin-top" />
        </div>

        {/* Subject */}
        <div className="usc-subject-row">
          <span className="usc-sub-label">विषयः</span>
          <span className="usc-subject-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेर सम्बन्धमा ।
          </span>
        </div>

        {/* Body Intro */}
        <p className="usc-body">
          महोदय,
          <br />
          <br />
          <span>बागमती प्रदेश</span> <input className="usc-small" />{" "}
          <span>जिल्ला</span>{" "}
          <input className="usc-medium" />{" "}
          <span>नागार्जुन नगरपालिका</span>{" "}
          वडा नं. <input className="usc-tiny" /> मा दर्ता भई{" "}
          <input className="usc-medium" /> नामक उद्योग{" "}
          <input className="usc-small" /> मिति <input className="usc-small" /> देखी
          संचालन भई आएको छ।
          <br />
          <br />
          स्थिर पुँजी तथा क्षमता विवरण अनुसार परिवर्तन वा हेरफेर गर्न आवश्यक भएकाले विवरण
          साथमा निवेदन गरेको छु । निवेदनमा उल्लेख भएको विवरण सही छ भनी सत्य ठहर हुनेछ भन्ने
          प्रतिज्ञा गर्दछु।
        </p>

        {/* Table */}
        <table className="usc-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>हालको कामय रहको</th>
              <th>परिवर्तन वा हेरफेर गर्नुपर्ने</th>
              <th>कारण</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>१</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><button className="usc-add-btn"> + </button></td>
            </tr>
          </tbody>
        </table>

        {/* Signature Box */}
        <div className="usc-sign-section">
          <div className="usc-sign-box">
            <div className="usc-sign-label">निवेदकको</div>

            <div className="usc-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" />
            </div>

            <div className="usc-sign-field">
              <span>नाम, थर :</span>
              <input type="text" />
            </div>

            <div className="usc-sign-field">
              <span>फोन नम्बर :</span>
              <input type="text" />
            </div>

            <div className="usc-sign-field">
              <span>ईमेल :</span>
              <input type="text" />
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <h3 className="usc-subheader">संलग्न कागजात</h3>
        <ul className="usc-doc-list">
          <li>अघिल्लो आ. व. को विवरणपत्र प्रतिवेदन</li>
          <li>कर बुझाएको प्रमाण</li>
          <li>अनुज्ञप्ति–२६ क्षमताको अद्यावधिक विवरण</li>
          <li>नागरिक प्रमाणपत्रको प्रमाणित प्रति</li>
          <li>पंजीकरण, नवीकरण र कम्पनी दर्ता प्रमाणपत्र (कम्पनी भए)</li>
          <li>संचालक समिति/साझेदारको विवरण (बोधार्थ फर्मभित्र)</li>
          <li>क्षमताको निवेदनको फायल</li>
          <li>अन्य कागजात</li>
        </ul>

        {/* Applicant Info */}
        <h3 className="usc-subheader">निवेदकको विवरण</h3>
        <div className="usc-applicant-box">
          <div className="usc-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="usc-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="usc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="usc-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="usc-submit-row">
          <button className="usc-submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="usc-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default UdhyogStrengthChange;
