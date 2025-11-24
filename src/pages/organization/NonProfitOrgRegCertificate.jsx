// 1
import React from "react";
import "./NonProfitOrgRegCertificate.css";

function NonProfitOrgRegCertificate() {
  return (
    <div className="nprc-page">
      {/* Top dark bar */}
      <header className="nprc-topbar">
        <div className="nprc-top-left">गैर नाफामूलक संस्था दर्ता</div>
        <div className="nprc-top-right">
          अवलोकन पृष्ठ / गैर नाफामूलक संस्था दर्ता प्रमाण पत्र
        </div>
      </header>

      {/* Main paper */}
      <div className="nprc-paper">
        {/* Letterhead */}
        <div className="nprc-letterhead">
          <div className="nprc-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="nprc-head-text">
            <div className="nprc-head-main">नागार्जुन नगरपालिका</div>
            <div className="nprc-head-ward">१ नं. वडा कार्यालय</div>
            <div className="nprc-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="nprc-head-meta">
            <div>
              पत्र संख्या :{" "}
              <select className="nprc-fy-select">
                <option>2082/83</option>
                <option>2081/82</option>
                <option>2080/81</option>
              </select>
            </div>
            <div className="nprc-meta-line">
              मिति : <input type="text" className="nprc-small-input" />
            </div>
            <div className="nprc-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* Chalani no */}
        <div className="nprc-ref-row">
          <div className="nprc-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* Subject + photo box */}
        <div className="nprc-subject-block">
          <div className="nprc-subject-wrap">
            <span className="nprc-sub-label">विषयः</span>
            <span className="nprc-subject-text">
              गैर नाफामूलक संस्था दर्ता प्रमाण पत्र ।
            </span>
          </div>

          <div className="nprc-stamp-box">
            <div>संस्थाको छाप वा</div>
            <div>फोटो</div>
          </div>
        </div>

        {/* Registration information */}
        <section className="nprc-section">
          <div className="nprc-field-row">
            <label>दर्ता नं. :</label>
            <input type="text" className="nprc-medium-input" />
          </div>
          <div className="nprc-field-row">
            <label>दर्ता मिति :</label>
            <input type="text" className="nprc-medium-input" />
          </div>

          <div className="nprc-field-row">
            <label>१) संस्थाको नाम :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>ठेगाना :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>विषयगत क्षेत्र :</label>
            <input type="text" className="nprc-medium-input" />
          </div>
          <div className="nprc-field-row">
            <label>संस्थाको कारोबार शुरू भएको मिति :</label>
            <input type="text" className="nprc-medium-input" />
          </div>
          <div className="nprc-field-row">
            <label>ई–मेल :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="nprc-medium-input" />
          </div>
        </section>

        {/* Office bearers */}
        <section className="nprc-section">
          <div className="nprc-field-row">
            <label>२) सभापति / अध्यक्ष / मुख्य व्यक्तिको नाम, थर :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>ठेगाना :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>ई–मेल :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="nprc-medium-input" />
          </div>
        </section>

        <section className="nprc-section">
          <div className="nprc-field-row">
            <label>३) बैंकमा खाता भएका भए सम्बन्धित नाम, थर, ठेगाना :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>ई–मेल :</label>
            <input type="text" className="nprc-wide-input" />
          </div>
          <div className="nprc-field-row">
            <label>सम्पर्क फोन नं. :</label>
            <input type="text" className="nprc-medium-input" />
          </div>
        </section>

        {/* Certification text */}
        <section className="nprc-section nprc-cert-section">
          <p className="nprc-body">
            ऐसागर्ने अन्य निकायबाट स्वीकृत वा इजाजत लिनु पर्ने छ । साथै यो प्रमाण
            पत्र सावधानी नवीकरण गर्नु पर्नेछ ।
          </p>

          <div className="nprc-sign-line-wrapper">
            <span>प्रमाणित गर्ने</span>
            <div className="nprc-sign-line" />
          </div>
        </section>

        {/* Officer role/select on right */}
        <div className="nprc-sign-top">
          <input
            type="text"
            className="nprc-sign-name"
            placeholder="नाम, थर"
          />
          <select className="nprc-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="nprc-section-title">निवेदकको विवरण</h3>
        <div className="nprc-applicant-box">
          <div className="nprc-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="nprc-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="nprc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="nprc-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="nprc-submit-row">
          <button className="nprc-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="nprc-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default NonProfitOrgRegCertificate;
