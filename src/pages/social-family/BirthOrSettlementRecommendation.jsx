// src/components/BirthOrSettlementRecommendation.jsx
import React, { useState } from "react";
import "./BirthOrSettlementRecommendation.css";

const FORM_KEY = "birth-settlement-recommendation";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // If CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const BirthOrSettlementRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const f = new FormData(e.target);
      const flat = {};
      for (const [k, v] of f.entries()) flat[k] = v;

      // group birth location and parent details for clarity (will be stringified by backend)
      const birth = {
        birth_district: flat.birth_district || null,
        birth_old_unit_type: flat.birth_old_unit_type || null, // ga.v.s. or n.p.
        birth_old_unit_ward: flat.birth_old_unit_ward || null,
        birth_date: flat.birth_date || null
      };

      const current_residence = {
        current_local: flat.current_local || null,
        current_ward: flat.current_ward || null,
        since_date: flat.current_since_date || null
      };

      const parent = {
        father_or_husband: flat.parent_relation_label || null,
        parent_title: flat.parent_title || null,
        parent_name: flat.parent_name || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      // Top-level fields (chalani etc.)
      const payload = {
        chalani_no: flat.chalani_no || null,
        municipality: flat.municipality || "नागार्जुन नगरपालिका",
        ward_no: flat.ward_no || "1",
        subject: flat.subject || null,
        birth,
        current_residence,
        parent,
        applicant
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved (id: ${data.id})` });
      // e.target.reset(); // optional
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="birth-settlement-form" onSubmit={handleSubmit}>
      <div className="birth-settlement-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          जन्म/बसोबास प्रमाणित ।
          <span className="top-right-bread">सामाजिक / पारिवारिक &gt; जन्म/बसोबास प्रमाणित</span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/logo.png" alt="Nepal Emblem" />
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

        {/* --- Salutation --- */}
        <div className="salutation-section">
           <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय:<span className="underline-text bold-text">जन्म/बसोबास प्रमाणित बारे।</span></p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा <span className="bg-gray-text">नागार्जुन नगरपालिका</span> 
            वडा नं <input name="ward_no" type="text" className="inline-box-input tiny-box" defaultValue="1" /> (साविक 
            <input name="old_unit_name" type="text" className="inline-box-input medium-box" />
            <select name="old_unit_type" className="inline-select">
                <option value="">--</option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं <input name="old_unit_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) बस्ने 
            <input name="applicant_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को जन्म साविक जिल्ला 
            <input name="birth_district" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
            <select name="birth_old_unit_type" className="inline-select">
                <option value="">--</option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं <input name="birth_old_unit_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> गा मिति 
            <input name="birth_date" type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> मा भएको र मिति 
            <input name="current_since_date" type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> देखि यस <span className="bold-text">नागार्जुन</span> गा बसोबास गर्दै आएकोले निजको जन्म/बसोबास प्रमाणित गरिपाउँ भनि <span className="bg-gray-text">नागार्जुन नगरपालिका</span> , १ नं वडा कार्यालयमा मिति २०८२-०८-०६ गा दिनु भएको निवेदन बमोजिम श्री 
            <input name="parent_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
            <select name="parent_relation_label" className="inline-select">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
            </select>
            <input name="parent_title" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> तथा श्रीमती 
            <input name="spouse_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
            <select name="child_type" className="inline-select">
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
            </select>
            <select name="child_title" className="inline-select">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
            </select>
            <input name="child_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को जन्म जिल्ला 
            <input name="birth_place_district" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> साविक 
            <input name="birth_place_old_unit" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> वडा नं 
            <input name="birth_place_old_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> गा जन्म भई हाल <span className="bold-text">नागार्जुन नगरपालिका</span> वडा नं 
            <input name="current_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> गा बसोबास गर्दै आएको र निजको जन्म मिति 
            <input name="birth_date_confirm" type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> गा भएको हुँदा निजको जन्म/बसोबास प्रमाणित गरिएको व्यहोरा अनुरोध छ ।
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
              <input name="applicant_name_display" type="text" className="detail-input bg-gray" />
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

export default BirthOrSettlementRecommendation;
