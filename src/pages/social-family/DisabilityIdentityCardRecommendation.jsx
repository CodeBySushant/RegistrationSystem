// src/pages/social-family/DisabilityIdentityCardRecommendation.jsx
import React, { useState } from "react";
import "./DisabilityIdentityCardRecommendation.css";

const FORM_KEY = "disability-identity-card-recommendation";

/**
 * getApiBase - safe runtime resolver for API base URL
 * - tries import.meta.env (Vite)
 * - falls back to process.env.REACT_APP_API_BASE (CRA) only if process exists
 * - falls back to globalThis.__API_BASE__ (optionally set in index.html)
 * - final fallback is empty string (relative URLs)
 *
 * wrapped in try/catch so it never raises a ReferenceError in browsers.
 */
function getApiBase() {
  // --- Vite (always safe) ---
  try {
    if (typeof import.meta !== "undefined" &&
        import.meta &&
        import.meta.env &&
        import.meta.env.VITE_API_BASE) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {}

  // --- CRA / Node environments ---
  try {
    if (typeof process !== "undefined" &&
        process.env &&
        (process.env.REACT_APP_API_BASE || process.env.API_BASE)) {
      return process.env.REACT_APP_API_BASE || process.env.API_BASE;
    }
  } catch (e) {}

  // --- Optional global fallback ---
  try {
    if (typeof globalThis !== "undefined" && globalThis.__API_BASE__) {
      return globalThis.__API_BASE__;
    }
  } catch (e) {}

  return "";
}

const API_BASE = getApiBase();
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DisabilityIdentityCardRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const fd = new FormData(e.target);
      const flat = {};
      for (const [k, v] of fd.entries()) flat[k] = v;

      const addressee = {
        office: flat.addressee_office || "महिला तथा बाल विकास कार्यालाय",
        local: flat.addressee_local || flat.addressee_local || "नागार्जुन",
        district: flat.addressee_district || "काठमाडौँ"
      };

      const location = {
        old_unit_name: flat.old_unit_name || null,
        old_unit_type: flat.old_unit_type || null,
        old_unit_ward: flat.old_unit_ward || null,
        current_ward: flat.current_ward || "1"
      };

      const disability = {
        title: flat.person_title || null,
        name: flat.person_name || null,
        disability_type: flat.disability_type || null,
        registered_unit: flat.registered_unit || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      const payload = {
        chalani_no: flat.chalani_no || null,
        addressee,
        location,
        disability,
        applicant,
        signatory_name: flat.signatory_name || null,
        signatory_designation: flat.signatory_designation || null,
        meta_date: flat.meta_date || null
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved (id: ${data.id})` });
      // optionally e.target.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="disability-recommendation-form" onSubmit={handleSubmit}>
      <div className="disability-recommendation-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          अपाङ्ग परिचयपत्र सिफारिस ।
          <span className="top-right-bread">सामाजिक / पारिवारिक &gt; अपाङ्ग परिचयपत्र सिफारिस</span>
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
            <p>चलानी नं. : <input name="chalani_no" type="text" className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री महिला तथा बाल विकास कार्यालाय,</span>
          </div>
          <div className="addressee-row">
             <input name="addressee_local" type="text" className="line-input medium-input" defaultValue="नागार्जुन" />
             <span>,</span>
             <input name="addressee_district" type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
             <span style={{float: 'right'}}>|</span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा <span className="underline-text">नागार्जुन नगरपालिका</span> , वडा नं. <span className="underline-text">१</span> (साविक
            <input name="old_unit_name" type="text" className="inline-box-input medium-box" />
            <select name="old_unit_type" className="inline-select">
                <option value=""></option>
                <option>गा.वि.स.</option>
                <option>न.पा.</option>
            </select>
            वडा नं. <input name="old_unit_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) बस्ने 
            <select name="person_title" className="inline-select">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
                <option value="श्रीमती">श्रीमती</option>
            </select>
            <input name="person_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले (अपाङ्गताको किसिम उल्लेख गर्ने) 
            <input name="disability_type" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> अपाङ्ग भएकोले अपाङ्ग परिचयपत्र बनाउनको लागि "सिफारिस गरी पाउँ" भनी यस वडा कार्यालय पर्ने आएको निवेदन सम्बन्धमा तहाको नियमानुसार अपाङ्ग परिचयपत्रको लागि सिफारिस गरिन्छ ।
            <input name="registered_unit" type="hidden" value="नागार्जुन नगरपालिका" />
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

export default DisabilityIdentityCardRecommendation;
