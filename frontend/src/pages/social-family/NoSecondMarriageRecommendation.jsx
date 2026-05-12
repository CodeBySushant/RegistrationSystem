import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from NoSecondMarriageRecommendation.css)
   All classes prefixed with "nsmr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .nsmr-container {
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
  .nsmr-bold      { font-weight: bold; }
  .nsmr-underline { text-decoration: underline; }
  .nsmr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .nsmr-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .nsmr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .nsmr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .nsmr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .nsmr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .nsmr-header-text { display: flex; flex-direction: column; align-items: center; }
  .nsmr-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .nsmr-ward-title   { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .nsmr-address-text,
  .nsmr-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .nsmr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .nsmr-meta-left p, .nsmr-meta-right p { margin: 5px 0; }
  .nsmr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nsmr-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nsmr-small-input { width: 120px; }
  .nsmr-tiny-input  { width: 80px; }
  .nsmr-full-width  { width: 100%; margin-bottom: 5px; }

  /* ── Subject ── */
  .nsmr-subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* ── Salutation ── */
  .nsmr-salutation { margin-bottom: 20px; font-size: 1.05rem; }

  /* ── Body ── */
  .nsmr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .nsmr-inline-box {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .nsmr-medium-box { width: 160px; }

  /* ── Witness / Rich editor mock ── */
  .nsmr-sakshi-section { margin-bottom: 30px; }
  .nsmr-sakshi-section label { display: block; margin-bottom: 5px; font-weight: bold; }
  .nsmr-rich-editor-mock {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #fff;
  }
  .nsmr-editor-toolbar {
    background-color: #f5f5f5;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .nsmr-tool-btn {
    cursor: pointer;
    font-size: 0.9rem;
    padding: 2px 5px;
    border: 1px solid transparent;
  }
  .nsmr-tool-btn:hover { border: 1px solid #ccc; background-color: #e0e0e0; border-radius: 2px; }
  .nsmr-tool-sep  { color: #ccc; }
  .nsmr-tb-bold   { font-weight: bold; }
  .nsmr-tb-italic { font-style: italic; font-family: serif; }
  .nsmr-tb-under  { text-decoration: underline; }
  .nsmr-tb-strike { text-decoration: line-through; }
  .nsmr-editor-textarea {
    width: 100%;
    border: none;
    outline: none;
    padding: 10px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    box-sizing: border-box;
    min-height: 100px;
  }

  /* ── Signature ── */
  .nsmr-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .nsmr-signature-block { width: 220px; text-align: center; position: relative; }
  .nsmr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .nsmr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .nsmr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .nsmr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .nsmr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .nsmr-container .detail-group { display: flex; flex-direction: column; }
  .nsmr-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .nsmr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .nsmr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .nsmr-footer { text-align: center; margin-top: 40px; }
  .nsmr-save-print-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .nsmr-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
  .nsmr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .nsmr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .nsmr-container, .nsmr-container * { visibility: visible; }
    .nsmr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .nsmr-top-bar, .nsmr-footer, .nsmr-editor-toolbar { display: none !important; }
    .nsmr-rich-editor-mock { border: none !important; background: transparent !important; }
    .nsmr-editor-textarea  { border: none !important; background: transparent !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  reference_no:            "२०८२/८३",
  chalani_no:              "",
  date:                    "",
  subject:                 "दोश्रो विवाह नगरेको सिफारिस सम्बन्धमा",
  district:                "काठमाडौँ",
  municipality:            MUNICIPALITY.name,
  ward_no:                 "",
  resident_name:           "",
  relative_name:           "",
  daughter_name:           "",
  wife_name:               "",
  spouse_npr_no:           "",
  spouse_npr_issue_date:   "",
  spouse_death_date:       "",
  application_date:        "",
  recommended_until_date:  "",
  witness_text:            "",
  signatory_name:          "",
  signatory_designation:   "",
  // ApplicantDetailsNp fields
  applicant_name:            "",
  applicant_address:         "",
  applicant_citizenship_no:  "",
  applicant_cit_issued_date: "",
  applicant_nid_no:          "",
  applicant_phone:           "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const NoSecondMarriageRecommendation = () => {
  // FIX: useWardForm + setField were used without being imported.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/no-second-marriage-recommendation", form);
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

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/no-second-marriage-recommendation", form);
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

      <form className="nsmr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="nsmr-top-bar">
          दोश्रो विवाह नगरेको सिफारिस ।
          <span className="nsmr-breadcrumb">
            सामाजिक / पारिवारिक &gt; दोश्रो विवाह नगरेको सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="nsmr-header">
          <div className="nsmr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="nsmr-header-text">
            <h1 className="nsmr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="nsmr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="nsmr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="nsmr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="nsmr-meta-row">
          <div className="nsmr-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="nsmr-bold">
                <input
                  name="reference_no"
                  value={form.reference_no}
                  onChange={handleChange}
                  className="nsmr-line-input nsmr-tiny-input"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="nsmr-dotted-input nsmr-small-input"
              />
            </p>
          </div>
          <div className="nsmr-meta-right">
            <p>
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                className="nsmr-line-input nsmr-tiny-input"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="nsmr-subject-section">
          <p>
            विषय:{" "}
            <span className="nsmr-underline">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="nsmr-line-input"
                style={{ width: "320px" }}
              />
            </span>
          </p>
        </div>

        {/* ── Salutation ── */}
        <div className="nsmr-salutation">
          <p>श्री जो जस सँग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Body ── */}
        <div className="nsmr-body">
          <p>
            उपरोक्त बिषयमा जिल्ला{" "}
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            ,
            <input
              name="municipality"
              value={form.municipality}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            वडा नं{" "}
            <input
              name="ward_no"
              value={form.ward_no}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            {" "}बस्ने{" "}
            <input
              name="resident_name"
              value={form.resident_name}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
              required
            />
            {" "}<span className="nsmr-red">*</span> को नातिनी
            <input
              name="relative_name"
              value={form.relative_name}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
              required
            />
            {" "}<span className="nsmr-red">*</span> को छोरी{" "}
            <input
              name="daughter_name"
              value={form.daughter_name}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
              required
            />
            {" "}<span className="nsmr-red">*</span> को पत्नी
            <input
              name="wife_name"
              value={form.wife_name}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
              required
            />
            {" "}<span className="nsmr-red">*</span> ना.प्र.नं.{" "}
            <input
              name="spouse_npr_no"
              value={form.spouse_npr_no}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
              required
            />
            {" "}<span className="nsmr-red">*</span> जारी मिति{" "}
            <input
              name="spouse_npr_issue_date"
              value={form.spouse_npr_issue_date}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            {" "}जिल्ला{" "}
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            {" "}ले आफ्नो श्रीमानको मिति{" "}
            <input
              name="spouse_death_date"
              value={form.spouse_death_date}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            {" "}गतेमा मृत्यु भएको र निजको मृत्यु पश्चात ... निवेदन मिति{" "}
            <input
              name="application_date"
              value={form.application_date}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            {" "}मा दिनु भएको निवेदन ... निजले मिति{" "}
            <input
              name="recommended_until_date"
              value={form.recommended_until_date}
              onChange={handleChange}
              className="nsmr-inline-box nsmr-medium-box"
            />
            {" "}सम्म दोश्रो विवाह नगरेको व्यहोरा सिफारिस गरिन्छ।
          </p>
        </div>

        {/* ── Witness / Sakshi ── */}
        <div className="nsmr-sakshi-section">
          <label>साक्षी :</label>
          <div className="nsmr-rich-editor-mock">
            <div className="nsmr-editor-toolbar">
              <span className="nsmr-tool-btn nsmr-tb-bold">B</span>
              <span className="nsmr-tool-btn nsmr-tb-italic">I</span>
              <span className="nsmr-tool-btn nsmr-tb-under">U</span>
              <span className="nsmr-tool-btn nsmr-tb-strike">S</span>
              <span className="nsmr-tool-sep">|</span>
              <span className="nsmr-tool-btn">x<sub>2</sub></span>
              <span className="nsmr-tool-btn">x<sup>2</sup></span>
              <span className="nsmr-tool-sep">|</span>
              <span className="nsmr-tool-btn">Format</span>
            </div>
            <textarea
              name="witness_text"
              className="nsmr-editor-textarea"
              rows={4}
              value={form.witness_text}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="nsmr-signature-section">
          <div className="nsmr-signature-block">
            <div className="nsmr-signature-line"></div>
            <span className="nsmr-red-mark">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="nsmr-line-input nsmr-full-width"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="nsmr-designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="nsmr-footer">
          <button
            className="nsmr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="nsmr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default NoSecondMarriageRecommendation;