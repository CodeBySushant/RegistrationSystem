import React from "react";
import "./NewBusinessPannumber.css";

function NewBusinessPannumber() {
  return (
    <div className="nbp-page">
      {/* Top dark bar */}
      <header className="nbp-topbar">
        <div className="nbp-top-left">नयाँ स्थायी लेखा नं.</div>
        <div className="nbp-top-right">
          अवलोकन पृष्ठ / नयाँ स्थायी लेखा नं.
        </div>
      </header>

      {/* Main paper */}
      <div className="nbp-paper">
        {/* Letterhead */}
        <div className="nbp-letterhead">
          <div className="nbp-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Nepal Emblem"
            />
          </div>

          <div className="nbp-head-text">
            <div className="nbp-head-main">नागार्जुन नगरपालिका</div>
            <div className="nbp-head-ward">१ नं. वडा कार्यालय</div>
            <div className="nbp-head-sub">
              नागार्जुन, काठमाडौं <br />
              बागमती प्रदेश, नेपाल
            </div>
          </div>

          <div className="nbp-head-meta">
            <div>
              मिति : <input type="text" className="nbp-small-input" />
            </div>
            <div className="nbp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* पत्र / चलानी नं. */}
        <div className="nbp-ref-row">
          <div className="nbp-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" />
          </div>
          <div className="nbp-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" />
          </div>
        </div>

        {/* To block */}
        <div className="nbp-to-block">
          <span>श्री</span>
          <input type="text" className="nbp-long-input" />
          <br />
          <input type="text" className="nbp-long-input nbp-to-second" />
        </div>

        {/* Subject */}
        <div className="nbp-subject-row">
          <span className="nbp-sub-label">विषयः</span>
          <span className="nbp-subject-text">सिफारिस गरिएको बारे ।</span>
        </div>

        {/* Intro line */}
        <p className="nbp-body">
          उपर्युक्त सम्बन्धमा <span className="nbp-bold">नागार्जुन नगरपालिका</span>{" "}
          वडा नं. <input type="text" className="nbp-tiny-input" /> (साबिक{" "}
          <input type="text" className="nbp-small-input" /> वडा नं.{" "}
          <input type="text" className="nbp-tiny-input" />) मा बस्ने श्री{" "}
          <input type="text" className="nbp-medium-input" /> ले मिति{" "}
          <input type="text" className="nbp-small-input" /> देखि{" "}
          <input type="text" className="nbp-small-input" /> सम्म व्यवसाय
          संचालन गर्दै आएको र उक्त व्यवसायको नाममा नयाँ स्थायी लेखा नं. प्राप्त
          गर्न सिफारिस गर्नु पर्ने भएकोले सिफारिस साथ अनुरोध गरिएको छ ।
        </p>

        {/* Details Box */}
        <section className="nbp-section">
          <h3 className="nbp-subtitle">विवरण:</h3>

          <div className="nbp-field-row">
            <label>प्राजेक्ट फर्मको नाम :</label>
            <input type="text" className="nbp-wide-input" />
          </div>
          <div className="nbp-field-row">
            <label>प्राजेक्ट धनी (प्रोपाइटर) को नाम / थर :</label>
            <input type="text" className="nbp-wide-input" />
          </div>
          <div className="nbp-field-row">
            <label>फर्म धनीको नागरिकता नं. :</label>
            <input type="text" className="nbp-medium-input" />
          </div>
          <div className="nbp-field-row">
            <label>ठेगाना :</label>
            <input type="text" className="nbp-wide-input" />
          </div>
          <div className="nbp-field-row">
            <label>फर्मको ठेगाना :</label>
            <input type="text" className="nbp-wide-input" />
          </div>
          <div className="nbp-field-row">
            <label>प्राजेक्ट फर्म पूँजी :</label>
            <input type="text" className="nbp-medium-input" />
          </div>
          <div className="nbp-field-row">
            <label>प्राजेक्ट फर्म उद्देश्य :</label>
            <input type="text" className="nbp-wide-input" />
          </div>

          <div className="nbp-field-row nbp-textarea-row">
            <label>बोधार्थ :</label>
            <textarea
              rows="3"
              className="nbp-textarea"
              placeholder="यहाँ थप विवरण वा टिप्पणी लेख्नुहोस्…"
            />
          </div>
        </section>

        {/* Signature name/post on right */}
        <div className="nbp-sign-top">
          <input
            type="text"
            className="nbp-sign-name"
            placeholder="नाम, थर"
          />
          <select className="nbp-post-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        {/* Applicant details */}
        <h3 className="nbp-section-title">निवेदकको विवरण</h3>
        <div className="nbp-applicant-box">
          <div className="nbp-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="nbp-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="nbp-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="nbp-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="nbp-submit-row">
          <button className="nbp-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="nbp-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default NewBusinessPannumber;
