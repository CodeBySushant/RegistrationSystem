import React, { useState } from "react";
import "./SocialSecurityAllowanceRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/**
 * Safe API base detection (CRA / Vite / window.__API_BASE)
 * Avoids using bare import.meta that can throw in some bundlers/runtime checks.
 */
const getApiBase = () => {
  try {
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_API_BASE
    ) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) {
    /* ignore */
  }

  try {
    // attempt to access import.meta safely without referencing it directly in environments where it's undefined
    const meta = Function(
      'return typeof import !== "undefined" && import.meta ? import.meta : undefined',
    )();
    if (meta && meta.env && meta.env.VITE_API_BASE)
      return meta.env.VITE_API_BASE;
  } catch (e) {
    /* ignore */
  }

  if (typeof window !== "undefined" && window.__API_BASE)
    return window.__API_BASE;
  return "";
};

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/social-security-allowance-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const SocialSecurityAllowanceRecommendation = () => {
    const { form, setForm, handleChange } = useWardForm(initialState);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // backend URL - adjust if different
        const res = await axios.post("/api/forms/social-security-allowance-recommendation", form);
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
        const res = await axios.post("/api/forms/social-security-allowance-recommendation", form);
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
    <form
      className="allowance-recommendation-container"
      onSubmit={handleSubmit}
    >
      {/* Top Bar */}
      <div className="top-bar-title">
        सामाजिक सुरक्षा भत्ता उपलब्ध ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षा भत्ता उपलब्ध
        </span>
      </div>

      {/* Header */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* Meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या :{" "}
            <span className="bold-text">
              <input
                name="reference_no"
                value={form.reference_no}
                onChange={(e) => setField("reference_no", e.target.value)}
                className="line-input tiny-input"
              />
            </span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input
              name="chalani_no"
              value={form.chalani_no}
              onChange={(e) => setField("chalani_no", e.target.value)}
              type="text"
              className="dotted-input small-input"
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति :{" "}
            <input
              name="date_bs"
              value={form.date_bs}
              onChange={(e) => setField("date_bs", e.target.value)}
              className="line-input tiny-input"
            />
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* Addressee */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_line1"
            value={form.addressee_line1}
            onChange={(e) => setField("addressee_line1", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
          <span>बैंक</span>
        </div>
        <div className="addressee-row">
          <input
            name="addressee_line2"
            value={form.addressee_line2}
            onChange={(e) => setField("addressee_line2", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
          <span>,</span>
          <input
            name="bank_branch"
            value={form.bank_branch}
            onChange={(e) => setField("bank_branch", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>
          विषय:
          <span className="underline-text bold-text">
            सामाजिक सुरक्षा भत्ता उपलब्ध गराई दिने बारे।
          </span>
        </p>
      </div>

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस{" "}
          <span className="bold-text underline-text">नागार्जुन</span> र त्यस
          बैंक बिच सामाजिक सुरक्षा भत्ता वितरण सम्बन्धी भएको सम्झौता अनुसार{" "}
          <span className="bg-gray-text">{form.municipality_name}</span> वडा नं.{" "}
          {form.ward_title} बस्ने
          <input
            name="beneficiary_name"
            value={form.beneficiary_name}
            onChange={(e) => setField("beneficiary_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> ले नेपाल सरकारबाट उपलब्ध गराईएको
          <input
            name="allowance_type"
            value={form.allowance_type}
            onChange={(e) => setField("allowance_type", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> भत्ता खान योग्य भई यस कार्यालयमा दिनु
          भएको निवेदन अनुसार निज
          <input
            name="beneficiary_address"
            value={form.beneficiary_address}
            onChange={(e) => setField("beneficiary_address", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को यस कार्यालयबाट त्यहाँ उपलब्ध गराईएको
          आ.व.
          <input
            name="fiscal_year"
            value={form.fiscal_year}
            onChange={(e) => setField("fiscal_year", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को{" "}
          <input
            name="quarter"
            value={form.quarter}
            onChange={(e) => setField("quarter", e.target.value)}
            className="inline-box-input small-box"
            required
          />{" "}
          <span className="red">*</span> त्रैमासिकको सामाजिक सुरक्षा भत्ता
          भर्पाइमा सि.नं.
          <input
            name="serial_no"
            value={form.serial_no}
            onChange={(e) => setField("serial_no", e.target.value)}
            className="inline-box-input small-box"
            required
          />{" "}
          <span className="red">*</span> मा निजको नाम समावेश भएकोले त्यस बैंकको
          नियमानुसार खाता खोलि भत्ता रकम उपलब्ध गराई दिनु हुन अनुरोध छ ।
        </p>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input
            name="signatory_name"
            value={form.signatory_name}
            onChange={(e) => setField("signatory_name", e.target.value)}
            className="line-input full-width-input"
            required
          />
          <select
            name="signatory_designation"
            value={form.signatory_designation}
            onChange={(e) => setField("signatory_designation", e.target.value)}
            className="designation-select"
          >
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
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
};

export default SocialSecurityAllowanceRecommendation;
