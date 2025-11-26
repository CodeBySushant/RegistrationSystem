import React from "react";
import "./NewBankAccountRecommendation.css";
// 12
function NewBankAccountRecommendation() {
  return (
    <div className="nbcr-page">
      {/* Top dark bar */}
      <header className="nbcr-topbar">
        <div className="nbcr-top-left">खाता खोली दिने ।</div>
        <div className="nbcr-top-right">अवलोकन पृष्ठ / खाता खोली दिने</div>
      </header>

      {/* Main paper */}
      <div className="nbcr-paper">
        {/* Letterhead */}
        <div className="nbcr-letterhead">
          <div className="nbcr-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="nbcr-head-text">
            <div className="nbcr-head-main">नागार्जुन नगरपालिका</div>
            <div className="nbcr-head-ward">१ नं. वडा कार्यालय</div>
            <div className="nbcr-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="nbcr-head-meta">
            <div className="nbcr-meta-line">
              मिति : <input type="text" className="nbcr-small-input" />
            </div>
            <div className="nbcr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी नं. */}
        <div className="nbcr-ref-row">
          <div className="nbcr-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="nbcr-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* श्री ... ज्यु */}
        <div className="nbcr-to-block">
          <span>श्री</span>
          <input type="text" className="nbcr-long-input" />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="nbcr-long-input nbcr-to-second"
            placeholder="काठमाडौं"
          />
        </div>

        {/* Subject */}
        <div className="nbcr-subject-row">
          <span className="nbcr-sub-label">विषयः</span>
          <span className="nbcr-subject-text">खाता खोली दिने बारे ।</span>
        </div>

        {/* Main body text */}
        <p className="nbcr-body">
          उपरोक्त सम्बन्धमा जिल्ला{" "}
          <input type="text" className="nbcr-small-inline" defaultValue="काठमाण्डौ" />{" "}
          <span>-</span>{" "}
          <span className="nbcr-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="nbcr-tiny-input" /> अन्तर्गत रहने{" "}
          <input
            type="text"
            className="nbcr-medium-input"
            placeholder="समूह / समिति / संस्था नाम"
          />{" "}
          ले{" "}
          <span className="nbcr-bold">नागार्जुन नगरपालिका</span> वडा नं.{" "}
          <input type="text" className="nbcr-tiny-input" />{" "}
          <span>काठमाण्डौ</span> पत्र संख्या{" "}
          <input type="text" className="nbcr-small-inline" /> च.न.{" "}
          <input type="text" className="nbcr-small-inline" /> को प्राप्त पत्र अनुसार सो
          समूहको खाता खोल्न बैंकको नियमानुसार निम्न पदाधिकारीको संयुक्त दस्तखतबाट
          संचालन हुने गरी खाता खोलिदिन सिफारिस साथ आग्रह गरेको छ ।
        </p>

        {/* Table of officials */}
        <div className="nbcr-table-title">तपशिल :</div>

        <div className="nbcr-table-wrapper">
          <table className="nbcr-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>श्री / सुश्री</th>
                <th>नाम, थर</th>
                <th>पद</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१.</td>
                <td>
                  <select>
                    <option>श्री</option>
                    <option>सुश्री</option>
                  </select>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <select>
                    <option>अध्यक्ष</option>
                    <option>कोषाध्यक्ष</option>
                    <option>सचिव</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>२.</td>
                <td>
                  <select>
                    <option>श्री</option>
                    <option>सुश्री</option>
                  </select>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <select>
                    <option>कोषाध्यक्ष</option>
                    <option>अध्यक्ष</option>
                    <option>सचिव</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>३.</td>
                <td>
                  <select>
                    <option>श्री</option>
                    <option>सुश्री</option>
                  </select>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <select>
                    <option>सचिव</option>
                    <option>अध्यक्ष</option>
                    <option>कोषाध्यक्ष</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature (right) */}
        <div className="nbcr-sign-top">
          <input
            type="text"
            className="nbcr-sign-name"
            placeholder="नाम, थर"
          />
          <select className="nbcr-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="nbcr-section-title">निवेदकको विवरण</h3>
        <div className="nbcr-applicant-box">
          <div className="nbcr-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="nbcr-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="nbcr-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="nbcr-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit */}
        <div className="nbcr-submit-row">
          <button className="nbcr-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="nbcr-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default NewBankAccountRecommendation;
