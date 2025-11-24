// 15
import React from "react";
import "./TaxClearCertificate.css";

function TaxClearanceCertificate() {
  return (
    <div className="tcc-page">
      {/* Top dark bar */}
      <header className="tcc-topbar">
        <div className="tcc-top-left">कर बुझ्ता प्रमाण पत्र सम्बन्धमा</div>
        <div className="tcc-top-right">
          अवलोकन पृष्ठ / कर बुझ्ता प्रमाण पत्र सम्बन्धमा
        </div>
      </header>

      {/* Main paper */}
      <div className="tcc-paper">
        {/* Letterhead */}
        <div className="tcc-letterhead">
          <div className="tcc-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="tcc-head-text">
            <div className="tcc-head-main">नागार्जुन नगरपालिका</div>
            <div className="tcc-head-ward">१ नं. वडा कार्यालय</div>
            <div className="tcc-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="tcc-head-meta">
            <div>
              मिति : <input type="text" className="tcc-small-input" />
            </div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी */}
        <div className="tcc-ref-row">
          <div className="tcc-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="tcc-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To block */}
        <div className="tcc-to-block">
          <span>श्री</span>
          <input type="text" className="tcc-long-input" />
          <br />
          <input type="text" className="tcc-long-input tcc-to-second" />
        </div>

        {/* Subject */}
        <div className="tcc-subject-row">
          <span className="tcc-sub-label">विषयः</span>
          <span className="tcc-subject-text">
            कर बुझ्ता प्रमाण पत्र सम्बन्धमा ।
          </span>
        </div>

        {/* Main sentence with inline inputs */}
        <p className="tcc-body">
          प्रस्तुत विषयमा <span className="tcc-bold">नागार्जुन नगरपालिका</span>{" "}
          वडा नं. १ मा बस्ने श्री{" "}
          <input type="text" className="tcc-medium-input" /> को नाममा रहेको
          व्यवसाय / घर जग्गा / अन्य कर सम्बन्धी विवरण अनुसार तल उल्लेख गरिएको
          आर्थिक वर्षहरू सम्मको कर भरपाई भएको / नभएको प्रमाणित गर्न अनुरोध
          गरिन्छ ।
        </p>

        {/* Detail table */}
        <section className="tcc-section">
          <h3 className="tcc-subtitle">किरसियत विवरण</h3>

          <table className="tcc-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>आ.व.</th>
                <th>बुझाउनु पर्ने रकम</th>
                <th>भर गरेको रसिद नं./मिति</th>
                <th>कर बक्यौता अनुमानित रकम</th>
                <th>कर बक्यौता रकम बुझाएको रकम</th>
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
              </tr>
            </tbody>
          </table>
        </section>

        {/* Officer/signature on right */}
        <div className="tcc-sign-top">
          <input
            type="text"
            className="tcc-sign-name"
            placeholder="नाम, थर"
          />
          <select className="tcc-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="tcc-section-title">निवेदकको विवरण</h3>
        <div className="tcc-applicant-box">
          <div className="tcc-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="tcc-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="tcc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="tcc-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="tcc-submit-row">
          <button className="tcc-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="tcc-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default TaxClearanceCertificate;
