// 8
import React from "react";
import "./OrganizationRegistrationPunishment.css";

function OrganizationRegistrationPunishment() {
  return (
    <div className="orp-page">
      {/* Top dark bar */}
      <header className="orp-topbar">
        <div className="orp-top-left">सजाय पाएका नपाएको ।</div>
        <div className="orp-top-right">
          अवलोकन पृष्ठ / सजाय पाएका नपाएको सिफारिस
        </div>
      </header>

      {/* Main paper */}
      <div className="orp-paper">
        {/* Letterhead */}
        <div className="orp-letterhead">
          <div className="orp-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="orp-head-text">
            <div className="orp-head-main">नागार्जुन नगरपालिका</div>
            <div className="orp-head-ward">१ नं. वडा कार्यालय</div>
            <div className="orp-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="orp-head-meta">
            <div className="orp-meta-line">
              मिति : <input type="text" className="orp-small-input" />
            </div>
            <div className="orp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="orp-ref-row">
          <div className="orp-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="orp-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री ... ज्यु */}
        <div className="orp-to-block">
          <span>श्री</span>
          <input type="text" className="orp-long-input" />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="orp-long-input orp-to-second"
            placeholder=""
          />
        </div>

        {/* Subject */}
        <div className="orp-subject-row">
          <span className="orp-sub-label">विषयः</span>
          <span className="orp-subject-text">सजाय पाएको नपाएकोबारे ।</span>
        </div>

        {/* Intro text */}
        <p className="orp-body">
          <span className="orp-bold">नामक संस्था दर्ता गरी पाउने भनि</span> निम्न
          व्यक्तिहरुले प्रस्तुत विषयमा सहित निवेदन दिनु भएको हुँदा निजहरुको
          चालचलन, चरित्र, गतिविधि, नेतिकपना, हिसाबकिताब तथा विश्वसनीयतामा फट्याङ
          रूपमा सनगरपालिका आसपासमा कुनै जुई पाए नपाएको सोधशोध गरी उक्त जुई पाएको
          नपाएको प्रमाणित गरिदिन अनुरोध गरिएको छ ।
        </p>

        {/* Table heading */}
        <div className="orp-table-title">तथ्य विवरण</div>

        {/* Table */}
        <div className="orp-table-wrapper">
          <table className="orp-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>व्यक्तिको नाम थर</th>
                <th>बाबुको नाम थर</th>
                <th colSpan={2}>ठेगाना</th>
                <th>क्षेत्रफल</th>
                <th>धर्म</th>
                <th className="orp-table-actions" />
              </tr>
              <tr className="orp-subheader-row">
                <th />
                <th />
                <th />
                <th>स्थायी</th>
                <th>अस्थायी</th>
                <th />
                <th />
                <th />
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
                <td className="orp-table-actions">
                  <button type="button" className="orp-add-row-btn">
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature (right side) */}
        <div className="orp-sign-top">
          <input
            type="text"
            className="orp-sign-name"
            placeholder="नाम, थर"
          />
          <select className="orp-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="orp-section-title">निवेदकको विवरण</h3>
        <div className="orp-applicant-box">
          <div className="orp-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="orp-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="orp-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="orp-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="orp-submit-row">
          <button className="orp-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="orp-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default OrganizationRegistrationPunishment;
