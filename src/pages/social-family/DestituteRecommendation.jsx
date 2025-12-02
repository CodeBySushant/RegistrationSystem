// src/components/DestituteRecommendation.jsx
import React, { useState } from "react";
import "./DestituteRecommendation.css";

const FORM_KEY = "destitute-recommendation";
// safe env detection: prefer import.meta.env (Vite), otherwise use process.env only if available (CRA / others)
const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) ||
  "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DestituteRecommendation = () => {
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

      // group logical parts
      const location = {
        district: flat.district || "काठमाडौँ",
        municipality: flat.municipality || "नागार्जुन",
        old_unit_type: flat.old_unit_type || null,
        old_unit_ward: flat.old_unit_ward || null,
        ward_no: flat.ward_no || null
      };

      const subject = {
        relation_title: flat.relation_title || null, // श्री/सुश्री
        relation_name: flat.relation_name || null,   // name of relative
        relation_child_type: flat.relation_child_type || null, // छोरा/छोरी
        relation_child_title: flat.relation_child_title || null, // श्री/सुश्री
        relation_child_name: flat.relation_child_name || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      const payload = {
        chalani_no: flat.chalani_no || null,
        municipality_display: flat.municipality_display || "नागार्जुन",
        location,
        subject,
        applicant,
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
    <form className="destitute-form" onSubmit={handleSubmit}>
      <div className="destitute-rec-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          विपन्न सिफारिस ।
          <span className="top-right-bread">आर्थिक &gt; विपन्न सिफारिस</span>
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

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">विपन्न सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* --- Salutation --- */}
        <div className="salutation-section">
           <p>श्री जो जस सँग सम्बन्ध राख्दछ।</p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला <span className="underline-text">काठमाडौँ</span> , <span className="underline-text">नागार्जुन</span> वडा नं 
            <input name="ward_no" type="text" className="inline-box-input tiny-box" defaultValue="1" required /> <span className="red">*</span> (साविक जिल्ला 
            <input name="district" type="text" className="inline-box-input medium-box" defaultValue="काठमाडौँ" /> , 
            <select name="old_unit_type" className="inline-select">
                <option value=""></option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं <input name="old_unit_ward" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) मा बस्ने 
            <input name="relation_title" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
            <select name="relation_name_select" className="inline-select" defaultValue="">
              <option value="">--</option>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input name="relation_child_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
            <select name="relation_child_type" className="inline-select">
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
            </select>
            <select name="relation_child_title" className="inline-select">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
            </select>
            <input name="relation_child_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को पारिवारी आर्थिक अवस्थाको बारेमा बुझ्दा निजको परिवार विपन्न वर्गमा पर्ने व्यहोरा सिफारिस साथ अनुरोध गरिन्छ।
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

export default DestituteRecommendation;
