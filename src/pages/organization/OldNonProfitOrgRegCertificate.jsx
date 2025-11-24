// 2
import React from "react";
import "./OldNonProfitOrgRegCertificate.css";

function OldNonProfitOrgCertificate() {
  return (
    <div className="onp-page">
      {/* Top dark bar */}
      <header className="onp-topbar">
        <div className="onp-top-left">गैर नाफामूलक संस्था दर्ता</div>
        <div className="onp-top-right">
          दर्ता विवरण / गैर नाफामूलक संस्था दर्ता
        </div>
      </header>

      {/* Main paper */}
      <div className="onp-paper">
        {/* Letterhead */}
        <div className="onp-letterhead">
          <div className="onp-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="onp-head-text">
            <div className="onp-head-main">नागार्जुन नगरपालिका</div>
            <div className="onp-head-ward">१ नं. वडा कार्यालय</div>
            <div className="onp-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="onp-head-meta">
            <div className="onp-meta-line">
              आ. व :{" "}
              <select className="onp-fy-select">
                <option>2082/83</option>
                <option>2081/82</option>
                <option>2080/81</option>
              </select>
            </div>
            <div className="onp-meta-line">
              मिति : <input type="text" className="onp-small-input" />
            </div>
            <div className="onp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* Subject + stamp box */}
        <div className="onp-subject-block">
          <div className="onp-subject-wrap">
            <span className="onp-sub-label">विषयः</span>
            <span className="onp-subject-text">
              गैर नाफामूलक संस्था दर्ता प्रमाण पत्र ।
            </span>
          </div>

          <div className="onp-stamp-box">
            <div>संस्थाको छाप वा</div>
            <div>फोटो</div>
          </div>
        </div>

        {/* Registration info */}
        <section className="onp-section">
          <div className="onp-field-row">
            <label>दर्ता नं. :</label>
            <input type="text" className="onp-medium-input" />
          </div>
          <div className="onp-field-row">
            <label>दर्ता मिति :</label>
            <input type="text" className="onp-medium-input" />
          </div>

          <div className="onp-field-row">
            <label>१) संस्थाको नाम :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>ठेगाना :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>विषयगत क्षेत्र :</label>
            <input type="text" className="onp-medium-input" />
          </div>
          <div className="onp-field-row">
            <label>संस्थाको कारोबार शुरू भएको मिति :</label>
            <input type="text" className="onp-medium-input" />
          </div>
          <div className="onp-field-row">
            <label>ई–मेल :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="onp-medium-input" />
          </div>
        </section>

        {/* Office bearer */}
        <section className="onp-section">
          <div className="onp-field-row">
            <label>२) सभापति / अध्यक्ष / मुख्य व्यक्तिको नाम, थर :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>ठेगाना :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>ई–मेल :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="onp-medium-input" />
          </div>
          <div className="onp-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="onp-medium-input" />
          </div>
        </section>

        {/* Bank/contact section */}
        <section className="onp-section">
          <div className="onp-field-row">
            <label>३) बैंकमा खाता भएका भए सम्बन्धीत नाम, थर, ठेगाना :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>ई–मेल :</label>
            <input type="text" className="onp-wide-input" />
          </div>
          <div className="onp-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="onp-medium-input" />
          </div>
        </section>

        {/* Sign line + post select on right */}
        <div className="onp-sign-line-row">
          <div className="onp-sign-line" />
        </div>

        <div className="onp-sign-top">
          <input
            type="text"
            className="onp-sign-name"
            placeholder="नाम, थर"
          />
          <select className="onp-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="onp-section-title">निवेदकको विवरण</h3>
        <div className="onp-applicant-box">
          <div className="onp-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="onp-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="onp-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="onp-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="onp-submit-row">
          <button className="onp-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="onp-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default OldNonProfitOrgCertificate;
