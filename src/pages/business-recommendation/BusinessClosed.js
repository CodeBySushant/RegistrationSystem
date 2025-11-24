// 1
import React from "react";
import "./BusinessClosed.css";

function BusinessClosed() {
  return (
    <div className="bc-page">
      {/* Top breadcrumb / title bar */}
      <header className="bc-topbar">
        <div className="bc-top-left">व्यवसाय बन्द ।</div>
        <div className="bc-top-right">घर / व्यवसाय बन्द</div>
      </header>

      {/* Main paper area */}
      <div className="bc-paper">
        {/* Letterhead with logo & headings */}
        <div className="bc-letterhead">
          <div className="bc-logo">
            {/* Replace src with your own logo path if needed */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Government Logo"
            />
          </div>
          <div className="bc-head-text">
            <div className="bc-head-main">नागार्जुन नगरपालिक</div>
            <div className="bc-head-ward">१ नं. वडा कार्यालय</div>
            <div className="bc-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>
          <div className="bc-head-meta">
            <div>
              मिति : <input type="text" className="bc-small-input" />
            </div>
            <div className="bc-head-day">
              ने.सं.: ११४६ भाद्र, २ शनिवार
            </div>
          </div>
        </div>

        {/* Reference numbers */}
        <div className="bc-ref-row">
          <div className="bc-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="bc-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* Subject */}
        <div className="bc-subject-row">
          <span className="bc-subject-label">विषयः</span>
          <span className="bc-subject-text">व्यवसाय बन्द बारे ।</span>
        </div>

        {/* Salutation */}
        <p className="bc-salutation">
          श्री {`[`}०५ जो जससँग सम्बन्घ राख्छ{`]`} ज्यु,
        </p>

        {/* Address line */}
        <div className="bc-address-line">
          <span>उपर्युक्त सम्बन्धमा *</span>
          <select>
            <option>नागार्जुन</option>
          </select>
          <span>नगरपालिका वडा नं</span>
          <input type="text" className="bc-ward-input" />
          <span>स्थित (तत्कालिक ठेगाना)</span>
        </div>

        {/* Explanation paragraph placeholder */}
        <p className="bc-body-text">
          अर्को पंक्तिमा सो व्यवसाय बन्द गरिएको सम्बन्धमा निवेदन पेश गरिएको छ। तलको
          विवरण अनुसार व्यवसायको दर्ता र बन्दको जानकारी दिइएको छ।
        </p>

        {/* Business details table */}
        <div className="bc-table-wrapper">
          <table className="bc-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>व्यवसायको प्रकार</th>
                <th>व्यवसायको नाम</th>
                <th>घर नं.</th>
                <th>टोलको नाम</th>
                <th>वडा नं.</th>
                <th>कैफियत</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Applicant details */}
        <h3 className="bc-section-title">निवेदकको विवरण</h3>
        <div className="bc-applicant-box">
          <div className="bc-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="bc-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="bc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="bc-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="bc-submit-row">
          <button className="bc-submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bc-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default BusinessClosed;
