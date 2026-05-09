import React, { useState } from "react";
import "./TribalRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
/**
 * Safe API base detection:
 * - process.env.REACT_APP_API_BASE (CRA)
 * - import.meta.env.VITE_API_BASE (Vite) accessed safely
 * - window.__API_BASE fallback
 */
const getApiBase = () => {
  try {
    if (
      typeof process !== "undefined" &&
      process &&
      process.env &&
      process.env.REACT_APP_API_BASE
    ) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) {
    /* ignore */
  }

  try {
    // safe import.meta access (avoids ReferenceError in some runtimes)
    const meta = Function(
      "try { return import.meta; } catch(e) { return undefined; }",
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

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/tribal-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const TribalRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/tribal-recommendation", form);
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
      const res = await axios.post("/api/forms/tribal-recommendation", form);
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
    <form className="tribal-recommendation-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        आदिवासी सिफारिस ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; आदिवासी सिफारिस
        </span>
      </div>

      {/* --- Header Section --- */}
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

      {/* --- Meta Data (Date/Ref) --- */}
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

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_line1"
            value={form.requester_name}
            onChange={(e) => setField("requester_name", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
          <input
            name="addressee_line2"
            value={form.registered_list_name}
            onChange={(e) => setField("registered_list_name", e.target.value)}
            type="text"
            className="line-input medium-input"
            required
          />
          <span className="red">*</span>
          <span>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त बिषयमा{" "}
          <input
            name="person_name"
            value={form.person_name}
            onChange={(e) => setField("person_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>
          को{" "}
          <select
            name="person_relation_type"
            value={form.person_relation_type}
            onChange={(e) => setField("person_relation_type", e.target.value)}
            className="inline-select"
          >
            <option value="">नाति/नातिनी</option>
            <option value="नाति">नाति</option>
            <option value="नातिनी">नातिनी</option>
          </select>
          <input
            name="person_role"
            value={form.person_role}
            onChange={(e) => setField("person_role", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को
          <select
            name="person_role_select"
            value={form.person_role_select}
            onChange={(e) => setField("person_role_select", e.target.value)}
            className="inline-select"
          >
            <option value="">छोरा/छोरी</option>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>
          जिल्ला काठमाडौँ साविक
          <select
            name="previous_admin_type"
            value={form.previous_admin_type}
            onChange={(e) => setField("previous_admin_type", e.target.value)}
            className="inline-select"
          >
            <option value=""></option>
            <option value="गा.वि.स.">गा.वि.स.</option>
            <option value="न.पा.">न.पा.</option>
          </select>
          वडा नं{" "}
          <input
            name="previous_ward_no"
            value={form.previous_ward_no}
            onChange={(e) => setField("previous_ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />{" "}
          <span className="red">*</span> भै हाल जिल्ला काठमाडौँ{" "}
          {form.current_municipality} वडा नं {form.current_ward_no} बस्ने
          (ना.प्र.नं.{" "}
          <input
            name="citizenship_no"
            value={form.citizenship_no}
            onChange={(e) => setField("citizenship_no", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> मिति {form.date_bs}) को{" "}
          <input
            name="claimed_caste"
            value={form.claimed_caste}
            onChange={(e) => setField("claimed_caste", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> ले म
          <select
            name="claimed_type"
            value={form.claimed_type}
            onChange={(e) => setField("claimed_type", e.target.value)}
            className="inline-select"
          >
            <option value="आदिवासी">आदिवासी</option>
            <option value="जनजाति">जनजाति</option>
          </select>
          अन्तरगत{" "}
          <input
            name="registered_list_name"
            value={form.registered_list_name}
            onChange={(e) => setField("registered_list_name", e.target.value)}
            className="inline-box-input medium-box"
          />{" "}
          जाति भएकोले सोही बमोजिम सिफारिस गरिपाउँ भनि माग भै आएकोले नेपाल
          सरकारले सुचिकृत गरेको{" "}
          <input
            name="registered_list_name_2"
            value={form.registered_list_name_2}
            onChange={(e) => setField("registered_list_name_2", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          मध्ये निज{" "}
          <input
            name="claimed_caste_confirm"
            value={form.claimed_caste_confirm}
            onChange={(e) => setField("claimed_caste_confirm", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          जाति भएकोले सोही व्यहोरा प्रमाणित गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
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

export default TribalRecommendation;
