// src/components/BehaviorRecommendation.jsx
import React, { useState } from "react";
import "./BehaviorRecommendation.css";

const FORM_KEY = "behavior-recommendation";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite; if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const BehaviorRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const formEl = e.target;
      const fd = new FormData(formEl);

      // basic flat payload from named inputs
      const payload = {};
      for (const [k, v] of fd.entries()) {
        payload[k] = v;
      }

      // If there are grouped fields you'd like to keep as object, create them here.
      // (None required — keeping simple: flat fields)
      // Example: if you later add multiple relatives you can attach payload.relatives = [...]

      // POST to generic form endpoint
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved (id: ${data.id})` });
      // optionally reset form: formEl.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="behavior-recommendation-form">
      <div className="behavior-recommendation-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          चालचलन सिफारिस ।
          <span className="top-right-bread">सामाजिक / पारिवारिक &gt; चालचलन सिफारिस</span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* --- Meta Data (Date/Ref) --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
            <p>
              चलानी नं. : 
              <input name="chalani_no" type="text" className="dotted-input small-input" />
            </p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा ।</span></p>
        </div>

        {/* --- Salutation --- */}
        <div className="salutation-section">
           <p className="bold-text">जो जस संग सम्बन्ध छ ।</p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ 
            <input name="municipality" type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन नगरपालिका" /> 
            वडा नं. <span className="bg-gray-text">१</span> बस्ने 
            <input name="applicant_relation_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
            <select name="applicant_relation_type" className="inline-select">
                <option value="नाति">नाति</option>
                <option value="नातिनी">नातिनी</option>
                <option value="बुहारी">बुहारी</option>
            </select>
            <input name="relative_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
            <select name="relative_gender" className="inline-select">
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
                <option value="श्रीमती">श्रीमती</option>
            </select>
            <input name="relative_of" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस कार्यालयमा दिएको निवेदन उपर सर्जमिन मुचुल्का तयार गरी बुझ्दा हाल सम्म निजको चालचलन राम्रो रहेको पाइएको हुँदा सोही अनुसारको ब्यहोरा निजको फोटो टाँस गरी प्रमाणित गरिन्छ ।
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signatory_name" type="text" className="line-input full-width-input" required />
            <select name="signatory_designation" className="designation-select">
               <option value="">पद छनौट गर्नुहोस्</option>
               <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
               <option value="वडा सचिव">वडा सचिव</option>
               <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* --- Applicant Details Box --- */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {msg && (
          <div style={{ marginTop: 8, color: msg.type === "error" ? "red" : "green" }}>
            {msg.text}
          </div>
        )}

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
        </div>
      </div>
    </form>
  );
};

export default BehaviorRecommendation;
