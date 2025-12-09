import React from "react";
import "./BackwardCommunityRecommendation.css";
// 2
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const BackwardCommunityRecommendation = () => {
  return (
    <div className="backward-community-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        विपन्नको सिफारिस ।
        <span className="top-right-bread">शैक्षिक &gt; विपन्नको सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">२०८२/८३</span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input type="text" className="dotted-input small-input" />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">विपन्नको सिफारिस सम्बन्धमा।</span>
        </p>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
        <p>श्री यो जो जस सँग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा{" "}
          <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
          वडा नं. {MUNICIPALITY.wardNumber}{" "}
          <input type="text" className="inline-box-input medium-box" />, वडा नं.{" "}
          <input type="text" className="inline-box-input tiny-box" required /> )
          निवासी श्री
          <select className="inline-select bold-text">
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input long-box" required />{" "}
          ले मेरो पारिवारिक आर्थिक स्थिति नाजुक भएको कारणले विपन्न भएको हुनाले
          मेरो परिवार मेरो उच्च शिक्षाको खर्च जुटाउन असमर्थ भएकोले सो खुलाई
          सिफारिस पाऊँ भनी यस कार्यालयमा निवेदन पेश गरेकोले सो सम्बन्धमा बुझ्दा
          जानेबुझे सम्म व्यहोरा मनासिब भएकोले निजलाई विपन्न व्यक्तिका लागि
          आरक्षित गरिएको स्थानमा सहभागी हुन पाउने व्यवस्था गरी दिनुहुन सिफारिस
          गरिएको छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn">
          रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default BackwardCommunityRecommendation;
