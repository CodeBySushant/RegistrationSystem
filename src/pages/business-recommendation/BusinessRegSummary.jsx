// 2
import React from "react";
import "./BusinessRegSummary.css";

function BusinessRegSummary() {
  return (
    <div className="brs-page">
      {/* Top dark bar with title + breadcrumb */}
      <header className="brs-topbar">
        <div className="brs-top-left">
          व्यवसाय दर्ताको विवरण पठाईदिनु बारे ।
        </div>
        <div className="brs-top-right">
          डाउनलोड / व्यवसाय दर्ताको विवरण पठाईदिनु बारे
        </div>
      </header>

      {/* Main paper */}
      <div className="brs-paper">
        {/* Letterhead */}
        <div className="brs-letterhead">
          <div className="brs-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Nepal Emblem"
            />
          </div>

          <div className="brs-head-text">
            <div className="brs-head-main">नागार्जुन नगरपालिका</div>
            <div className="brs-head-ward">१ नं. वडा कार्यालय</div>
            <div className="brs-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="brs-head-meta">
            <div>
              मिति : <input type="text" className="brs-small-input" />
            </div>
            <div className="brs-meta-line">
              ने.सं.: ११४६ भाद्र, २ शनिवार
            </div>
          </div>
        </div>

        {/* Letter numbers */}
        <div className="brs-ref-row">
          <div className="brs-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="brs-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* Addressed to */}
        <div className="brs-to-block">
          <label>श्री</label>
          <input type="text" className="brs-long-input" />
          <br />
          <span>नागार्जुन नगरपालिका</span>
          <input type="text" className="brs-medium-input" />
          <span>, काठमाडौं</span>
        </div>

        {/* Subject */}
        <div className="brs-subject-row">
          <span className="brs-subject-label">विषयः</span>
          <span className="brs-subject-text">
            व्यवसाय दर्ताको विवरण पठाईदिनु बारे ।
          </span>
        </div>

        {/* Body text (static placeholder lines) */}
        <p className="brs-body-para">
          प्रस्तुत विषयमा नागार्जुन <input type="text" className="brs-under-input" />
          को उद्योग, व्यवसाय, दर्ता, नविकरण, संचालन र नियमन सम्बन्धी २०७५
          समितिको तहमा तथा कार्यालयबाट हालसम्म के, कति, कुन प्रकारका व्यवसायहरू दर्ता भएका छन्
          सोको विस्तृत विवरण यसैको फारममा तयार पारी पछिल्लो एक वर्ष भित्रको फरक नभई गर्ने उच्च
          प्राथमिकता दिनुहोला भनी कार्यालयले मेल <input type="text" className="brs-under-input" />
          मा पठाईदिन गर अनुरोध छ ।
        </p>

        {/* Table heading line */}
        <div className="brs-table-caption">
          <span>शाखा कार्यालयको मेल</span>
          <input type="text" className="brs-under-input" />
          <span>विवरण</span>
        </div>

        {/* Business list table */}
        <div className="brs-table-wrapper">
          <table className="brs-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>दर्ता नं.</th>
                <th>दर्ता मिति</th>
                <th>व्यवसायको नाम</th>
                <th>ठेगाना</th>
                <th>प्रोप्राइटर</th>
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
        </div>

        {/* Description big textarea */}
        <div className="brs-desc-block">
          <label>बिस्तृतः</label>
          <textarea rows="8" />
        </div>

        {/* Applicant details */}
        <h3 className="brs-section-title">निवेदकको विवरण</h3>
        <div className="brs-applicant-box">
          <div className="brs-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="brs-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="brs-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="brs-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Position / post select + submit */}
        <div className="brs-bottom-row">
          <div className="brs-post-select">
            <input type="text" className="brs-post-input" />
            <select>
              <option>पद छनौट गर्नुहोस्</option>
            </select>
          </div>

          <div className="brs-submit-row">
            <button className="brs-submit-btn">
              रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="brs-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default BusinessRegSummary;
