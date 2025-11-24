// 1
import React from "react";
import "./GovOrganizationReg";

function App() {
  return (
    <div className="form-page">

      <div className="header-title">
        सहकारी संस्था दर्ता सिफारिस । 
      </div>

      <div className="sub-header">
        <span>अनुसूची २</span><br/>
        <span>दर्ता दरखास्तको नमुना</span>
      </div>

      <div className="form-container">

        {/* Top Office Info */}
        <div className="top-info">
          श्री दर्ता गर्ने अधिकारी _______ ज्यु, <br/>
          ______ नगर कार्यपालिकाको कार्यालय <br/><br/>
          मिति: <input type="text" className="date-input" placeholder="२०७८-०५-०५" />
        </div>

        <h3 className="subject">विषय : सहकारी संस्था दर्ता ।</h3>

        <p className="paragraph">
          महोदय,<br/><br/>
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन गर्दछौं। 
          उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र प्रस्तावित संस्थाका 
          विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
        </p>

        {/* ------------ संस्था विवरण Section ------------ */}
        <h3 className="section-title">संस्थासम्बन्धी विवरण</h3>

        <div className="section">
          <label>(क) प्रस्तावित संस्था नामः *</label>
          <input type="text" />

          <label>(ख) ठेगाना: वडा नं. *</label>
          <input type="text" />

          <label>(ग) उद्देश्य: *</label>
          <input type="text" />

          <label>(घ) गतिविधि: *</label>
          <input type="text" />

          <label>(ङ) मुख्य कार्यालय: *</label>
          <input type="text" />

          <label>(च) शाखा कार्यालय: *</label>
          <input type="text" />

          <label>(छ) दायित्व: *</label>
          <input type="text" />

          <label>(ज) सदस्य संख्या:</label>
          <div className="inline-row">
            महिला: <input type="text" /> जना
            पुरुष: <input type="text" /> जना
          </div>

          <label>(झ) कुल शेयर पूँजीको रकमः *</label>
          <input type="text" />

          <label>(ञ) प्राप्त प्रवेश शुल्कको रकमः *</label>
          <input type="text" />
        </div>

        {/* ---------- Applicant Section ---------- */}
        <h3 className="section-title">निवेदकको विवरण</h3>

        <div className="section">
          <label>निवेदकको नाम *</label>
          <input type="text" />

          <label>निवेदकको ठेगाना *</label>
          <input type="text" />

          <label>निवेदकको नागरिकता नं *</label>
          <input type="text" />

          <label>निवेदकको फोन नं. *</label>
          <input type="text" />
        </div>

      </div>

      {/* Submit Button */}
      <div className="submit-box">
        <button className="submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
      </div>

      <footer className="footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>

    </div>
  );
}

export default App;
