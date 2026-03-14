// src/pages/social-family/DisableIdentityCardRenew.jsx
import React, { useState } from 'react';
import './DisableIdentityCardRenew.css';

// form key used by backend generic form controller
const FORM_KEY = "disable-identity-card-renew";

/** Safe API base resolver (Vite / CRA / runtime global) */
function getApiBase() {
  try {
    // Vite: import.meta.env
    // wrap in try so environments that don't support import.meta won't throw
    // eslint-disable-next-line no-undef
    if (typeof import.meta !== "undefined" && import.meta && import.meta.env && import.meta.env.VITE_API_BASE) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof process !== "undefined" && process.env) {
      const v = process.env.REACT_APP_API_BASE || process.env.API_BASE;
      if (v) return v;
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof globalThis !== "undefined" && globalThis.__API_BASE__) {
      return globalThis.__API_BASE__;
    }
  } catch (e) {}

  return "";
}

const API_BASE = getApiBase();
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DisableIdentityCardRenew = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const fd = new FormData(e.target);
      // flatten form data
      const flat = {};
      for (const [k, v] of fd.entries()) {
        flat[k] = v;
      }

      // Build payload. Keep shape simple — backend will stringify objects if needed.
      const payload = {
        chalani_no: flat.chalani_no || null,
        certificate_type: flat.certificate_type || null,
        previous_unit_name: flat.prev_unit_name || null,
        previous_unit_ward: flat.prev_unit_ward || null,
        relation_text: flat.relation_text || null,
        relation_child_type: flat.relation_child_type || null,
        relation_child_name: flat.relation_child_name || null,
        certificate_date: flat.certificate_date || null,
        certificate_number: flat.certificate_number || null,
        renewal_type: flat.renewal_type || null,
        applicant: {
          name: flat.applicant_name || null,
          address: flat.applicant_address || null,
          citizenship_no: flat.applicant_citizenship_no || null,
          phone: flat.applicant_phone || null
        },
        signatory_name: flat.signatory_name || null,
        signatory_designation: flat.signatory_designation || null
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved — id: ${data.id}` });
      // optionally e.target.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="renew-card-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        परिचय पत्र नवीकरण ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; परिचय पत्र नवीकरण</span>
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
        <p>
            विषय:
            <select name="certificate_type" className="inline-select bold-text" style={{border: '1px solid #ccc'}}>
                <option value="">प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
                <option value="disability">अपाङ्गता परिचयपत्र</option>
                <option value="senior">ज्येष्ठ नागरिक परिचयपत्र</option>
            </select>
            <span className="underline-text bold-text"> नवीकरण बारे ।</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री नागार्जुन नगरपालिका ,</span>
        </div>
        <div className="addressee-row">
          <span>नगर कार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" name="municipality_display" className="line-input medium-input" defaultValue="नागार्जुन" />
           <span>, काठमाडौँ ।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <span className="bg-gray-text">काठमाडौँ</span> <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं <span className="bg-gray-text">१</span> (साविक जिल्ला काठमाडौँ
          <input name="prev_unit_name" type="text" className="inline-box-input medium-box" />
          वडा नं <input name="prev_unit_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) मा बस्ने
          <input name="relation_text" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को
          <select name="relation_child_type" className="inline-select">
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
          </select>
          <input name="relation_child_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस कार्यालयमा दिनु भएको निवेदन अनुसार निजले मिति
          <input name="certificate_date" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नम्बर नं
          <input name="certificate_number" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> प्राप्त गरेकोले तहाँ कार्यालयको नियमानुसार
          <input name="renewal_type" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नवीकरण गरिदिनुहुन सिफारिस साथ सादर अनुरोध गरिन्छ।
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
    </form>
  );
};

export default DisableIdentityCardRenew;
