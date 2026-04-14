// src/pages/social-family/DisabilityIdentityCardRecommendation.jsx
import React, { useState } from "react";
import "./DisabilityIdentityCardRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

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
    if (
      typeof import.meta !== "undefined" &&
      import.meta &&
      import.meta.env &&
      import.meta.env.VITE_API_BASE
    ) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {}

  // --- CRA / Node environments ---
  try {
    if (
      typeof process !== "undefined" &&
      process.env &&
      (process.env.REACT_APP_API_BASE || process.env.API_BASE)
    ) {
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
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/disability-identity-card-recommendation", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState); // reset form on success
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/disability-identity-card-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ print first
        setForm(initialState); // ✅ reset AFTER print
      }
    } catch (err) {
      console.error(err);
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
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; अपाङ्ग परिचयपत्र सिफारिस
          </span>
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
            <p>
              पत्र संख्या : <span className="bold-text">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
              />
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
            विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री महिला तथा बाल विकास कार्यालाय,</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_local"
              type="text"
              className="line-input medium-input"
              defaultValue="नागार्जुन"
            />
            <span>,</span>
            <input
              name="addressee_district"
              type="text"
              className="line-input medium-input"
              defaultValue="काठमाडौँ"
            />
            <span style={{ float: "right" }}>|</span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा{" "}
            <span className="underline-text">नागार्जुन नगरपालिका</span> , वडा
            नं. <span className="underline-text">१</span> (साविक
            <input
              name="old_unit_name"
              type="text"
              className="inline-box-input medium-box"
            />
            <select name="old_unit_type" className="inline-select">
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            <input
              name="old_unit_ward"
              type="text"
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span> ) बस्ने
            <select name="person_title" className="inline-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input
              name="person_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> ले (अपाङ्गताको किसिम उल्लेख गर्ने)
            <input
              name="disability_type"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> अपाङ्ग भएकोले अपाङ्ग परिचयपत्र
            बनाउनको लागि "सिफारिस गरी पाउँ" भनी यस वडा कार्यालय पर्ने आएको
            निवेदन सम्बन्धमा तहाको नियमानुसार अपाङ्ग परिचयपत्रको लागि सिफारिस
            गरिन्छ ।
            <input
              name="registered_unit"
              type="hidden"
              value="नागार्जुन नगरपालिका"
            />
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              required
            />
            <select name="signatory_designation" className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </form>
  );
};

export default DisabilityIdentityCardRecommendation;
