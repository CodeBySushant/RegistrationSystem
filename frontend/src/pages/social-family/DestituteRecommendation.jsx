// src/pages/social-family/DestituteRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DestituteRecommendation.css)
   All classes prefixed with "dr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .dr-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Utility ── */
  .dr-bold      { font-weight: bold; }
  .dr-underline { text-decoration: underline; }
  .dr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .dr-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .dr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .dr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .dr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .dr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .dr-header-text { display: flex; flex-direction: column; align-items: center; }
  .dr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .dr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .dr-address-text,
  .dr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .dr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .dr-meta-left p, .dr-meta-right p { margin: 5px 0; }
  .dr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .dr-w-small { width: 120px; }

  /* ── Subject / Salutation ── */
  .dr-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
  .dr-salutation { margin-bottom: 20px; font-size: 1.05rem; }

  /* ── Body ── */
  .dr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .dr-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .dr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .dr-w-tiny-box   { width: 40px;  text-align: center; }
  .dr-w-medium-box { width: 180px; }

  /* ── Signature ── */
  .dr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .dr-signature-block   { width: 220px; text-align: center; position: relative; }
  .dr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .dr-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .dr-w-full              { width: 100%; }
  .dr-sig-name-input      { margin-bottom: 5px; }
  .dr-designation-select  { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .dr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .dr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .dr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .dr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .dr-footer { text-align: center; margin-top: 40px; }
  .dr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .dr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .dr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .dr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print (was completely missing in original CSS) ── */
  @media print {
    body * { visibility: hidden; }
    .dr-container,
    .dr-container * { visibility: visible; }
    .dr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .dr-top-bar,
    .dr-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .dr-municipality-name,
    .dr-ward-title,
    .dr-address-text,
    .dr-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined — crashes on load.
   BUG FIX: relation_child_name used twice for different fields — renamed
             second one to applicant_name_body.
   All defaultValue/uncontrolled inputs converted to controlled.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalani_no: "",
  // body fields — all were defaultValue (uncontrolled)
  ward_no:              MUNICIPALITY?.wardNumber || "1",
  district:             MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  old_unit_type:        "",
  old_unit_ward:        "",
  relation_title:       "",
  relation_name_select: "श्री",
  relation_child_name:  "",    // grandparent/parent name
  relation_child_type:  "छोरा",
  relation_child_title: "श्री",
  applicant_name_body:  "",    // BUG FIX: was duplicate "relation_child_name"
  // signature — were uncontrolled
  signatory_name:        "",
  signatory_designation: "",
  // ApplicantDetailsNp fields
  applicantName:         "",
  applicantAddress:      "",
  applicantCitizenship:  "",
  applicantPhone:        "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DestituteRecommendation = () => {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleChange = (e) => setField(e.target.name, e.target.value);

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/destitute-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save + Print ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/destitute-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form className="dr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="dr-top-bar">
          विपन्न सिफारिस ।
          <span className="dr-breadcrumb">आर्थिक &gt; विपन्न सिफारिस</span>
        </div>

        {/* ── Header ──
            BUG FIX: hardcoded "नागार्जुन नगरपालिका" / "१ नं. वडा कार्यालय"
            replaced with dynamic MUNICIPALITY config + user ward */}
        <div className="dr-header">
          <div className="dr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="dr-header-text">
            <h1 className="dr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="dr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`}
            </h2>
            <p className="dr-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
            <p className="dr-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="dr-meta-row">
          <div className="dr-meta-left">
            <p>पत्र संख्या : <span className="dr-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="dr-dotted-input dr-w-small"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="dr-meta-right">
            <p>मिति : <span className="dr-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="dr-subject">
          <p>
            विषय:{" "}
            <span className="dr-underline">विपन्न सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* ── Salutation ── */}
        <div className="dr-salutation">
          <p>श्री जो जस सँग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Body ──
            BUG FIX 1: all inputs used defaultValue (uncontrolled) — now wired.
            BUG FIX 2: relation_child_name appeared TWICE with same name for
                       different fields. Second instance renamed applicant_name_body. */}
        <div className="dr-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <span className="dr-underline">{MUNICIPALITY.englishDistrict || "काठमाडौँ"}</span>{" "}
            , <span className="dr-underline">{MUNICIPALITY.name}</span> वडा नं
            <input
              name="ward_no"
              type="text"
              className="dr-inline-input dr-w-tiny-box"
              value={form.ward_no}
              onChange={handleChange}
              required
            />{" "}
            <span className="dr-red">*</span> (साविक जिल्ला
            <input
              name="district"
              type="text"
              className="dr-inline-input dr-w-medium-box"
              value={form.district}
              onChange={handleChange}
            />{" "}
            ,
            <select
              name="old_unit_type"
              className="dr-inline-select"
              value={form.old_unit_type}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं{" "}
            <input
              name="old_unit_ward"
              type="text"
              className="dr-inline-input dr-w-tiny-box"
              value={form.old_unit_ward}
              onChange={handleChange}
              required
            />{" "}
            <span className="dr-red">*</span> ) मा बस्ने
            <input
              name="relation_title"
              type="text"
              className="dr-inline-input dr-w-medium-box"
              value={form.relation_title}
              onChange={handleChange}
              required
            />{" "}
            <span className="dr-red">*</span> को नाति
            <select
              name="relation_name_select"
              className="dr-inline-select"
              value={form.relation_name_select}
              onChange={handleChange}
            >
              <option value="">--</option>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input
              name="relation_child_name"
              type="text"
              className="dr-inline-input dr-w-medium-box"
              value={form.relation_child_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="dr-red">*</span> को
            <select
              name="relation_child_type"
              className="dr-inline-select"
              value={form.relation_child_type}
              onChange={handleChange}
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <select
              name="relation_child_title"
              className="dr-inline-select"
              value={form.relation_child_title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            {/* BUG FIX: was duplicate name="relation_child_name" — renamed */}
            <input
              name="applicant_name_body"
              type="text"
              className="dr-inline-input dr-w-medium-box"
              value={form.applicant_name_body}
              onChange={handleChange}
              required
            />{" "}
            <span className="dr-red">*</span> को पारिवारी आर्थिक अवस्थाको बारेमा
            बुझ्दा निजको परिवार विपन्न वर्गमा पर्ने व्यहोरा सिफारिस साथ अनुरोध
            गरिन्छ।
          </p>
        </div>

        {/* ── Signature ──
            BUG FIX: both inputs were uncontrolled */}
        <div className="dr-signature-section">
          <div className="dr-signature-block">
            <div className="dr-signature-line"></div>
            <span className="dr-red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="dr-line-input dr-w-full dr-sig-name-input"
              value={form.signatory_name}
              onChange={handleChange}
              required
            />
            <select
              name="signatory_designation"
              className="dr-designation-select"
              value={form.signatory_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="dr-footer">
          <button
            className="dr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="dr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DestituteRecommendation;