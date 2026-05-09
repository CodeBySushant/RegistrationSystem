import React, { useState } from "react";
import "./UnmarriedVerification.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
/**
 * Safe API base detection:
 * - uses process.env.REACT_APP_API_BASE (CRA)
 * - tries import.meta.env.VITE_API_BASE safely using Function wrapper
 * - falls back to window.__API_BASE
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
    // safely access import.meta without causing ReferenceError in non-vite envs
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

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/unmarried-verification_form`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const UnmarriedVerification = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/unmarried-verification_form", form);
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
      const res = await axios.post("/api/forms/unmarried-verification_form", form);
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
    <form className="unmarried-verification-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अविवाह प्रमाणित ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; अविवाह प्रमाणित
        </span>
      </div>

      {/* --- Header --- */}
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

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा जिल्ला काठमाडौँ
          <input
            name="district"
            value={form.district}
            onChange={(e) => setField("district", e.target.value)}
            className="inline-box-input medium-box"
          />
          वडा नं.
          <input
            name="previous_ward_no"
            value={form.previous_ward_no}
            onChange={(e) => setField("previous_ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />{" "}
          (साविक
          <input
            name="previous_admin"
            value={form.previous_admin}
            onChange={(e) => setField("previous_admin", e.target.value)}
            className="inline-box-input medium-box"
          />
          ) निवासी श्री
          <input
            name="resident_name"
            value={form.resident_name}
            onChange={(e) => setField("resident_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          तथा श्रीमती
          <input
            name="spouse_name"
            value={form.spouse_name}
            onChange={(e) => setField("spouse_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          को
          <select
            name="child_relation"
            value={form.child_relation}
            onChange={(e) => setField("child_relation", e.target.value)}
            className="inline-select"
          >
            <option value="">छोरा/छोरी</option>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>
          <input
            name="child_name"
            value={form.child_name}
            onChange={(e) => setField("child_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          आजको मितिसम्म अविवाहित रहेको व्यहोरा प्रमाणित गरिन्छ।
        </p>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
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

export default UnmarriedVerification;
