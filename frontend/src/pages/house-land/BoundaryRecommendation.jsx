// BoundaryRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BoundaryRecommendation.css)
   All classes prefixed with "br-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .br-container {
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
  .br-bold       { font-weight: bold; }
  .br-underline  { text-decoration: underline; }
  .br-red        { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
  .br-red-mark   { color: red; position: absolute; top: 0; left: 0; }
  .br-bg-gray    { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

  /* ── Top Bar ── */
  .br-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .br-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .br-header { text-align: center; margin-bottom: 20px; position: relative; }
  .br-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .br-header-text { display: flex; flex-direction: column; align-items: center; }
  .br-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .br-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .br-address-text,
  .br-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .br-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .br-meta-left p, .br-meta-right p { margin: 5px 0; }
  .br-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .br-small { width: 120px; }

  /* ── Subject / Salutation ── */
  .br-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
  .br-salutation { margin-bottom: 20px; font-size: 1.05rem; }

  /* ── Body ── */
  .br-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .br-inline-box {
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
  .br-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .br-tiny   { width: 40px;  text-align: center; }
  .br-small2 { width: 100px; }
  .br-medium { width: 160px; }
  .br-long   { width: 250px; }

  /* ── Chauhaddi (Four Boundaries) ── */
  .br-chauhaddi {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .br-chauhaddi-item { display: flex; align-items: center; }
  .br-chauhaddi-item label { min-width: 60px; font-weight: bold; }
  .br-line {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin-left: 10px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .br-long-input { width: 300px; }

  /* ── Signature ── */
  .br-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .br-signature-block  { width: 220px; text-align: center; position: relative; }
  .br-signature-line   { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .br-sig-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .br-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .br-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .br-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .br-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .br-container .detail-group { display: flex; flex-direction: column; }
  .br-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .br-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .br-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Notes ── */
  .br-notes-section { margin-top: 12px; }
  .br-notes-section label { display: block; margin-bottom: 4px; font-size: 0.95rem; }
  .br-notes-textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
  }

  /* ── Footer ── */
  .br-footer { text-align: center; margin-top: 40px; }
  .br-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .br-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .br-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .br-copyright {
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
    .br-container, .br-container * { visibility: visible; }
    .br-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .br-top-bar, .br-footer, .br-notes-section { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:              "२०८२/८३",
  chalani_no:             "",
  date_nep:               new Date().toISOString().slice(0, 10),
  municipality:           "नागार्जुन",
  ward_no:                "1",
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_phone:        "",
  old_district:           "काठमाडौँ",
  old_municipality:       "नागार्जुन",
  old_ward_no:            "1",
  plot_number:            "",
  area:                   "",
  east_boundary:          "",
  west_boundary:          "",
  north_boundary:         "",
  south_boundary:         "",
  signer_name:            "",
  signer_designation:     "",
  notes:                  "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BoundaryRecommendation = () => {
  // FIX: useWardForm was called without being imported
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/boundary-recommendation", form);
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
      const res = await axios.post("/api/forms/boundary-recommendation", form);
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
    <div className="br-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="br-top-bar">
          चौहद्दी सिफारिस ।
          <span className="br-breadcrumb">घर / जग्गा जमिन &gt; चौहद्दी सिफारिस</span>
        </div>

        {/* ── Header ── */}
        <div className="br-header">
          <div className="br-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="br-header-text">
            <h1 className="br-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="br-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="br-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="br-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="br-meta-row">
          <div className="br-meta-left">
            <p>पत्र संख्या : <span className="br-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="br-dotted br-small" placeholder="चलानी नं." />
            </p>
          </div>
          <div className="br-meta-right">
            <p>मिति : <span className="br-bold">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="br-subject">
          <p>विषय: <span className="br-underline">चौहद्दी सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* ── Salutation ── */}
        <div className="br-salutation">
          <p className="br-bold">श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Body ── */}
        <div className="br-body">
          <p>
            प्रस्तुत बिषयमा जिल्ला काठमाडौँ{" "}
            <input name="old_district"    value={form.old_district}    onChange={handleChange} className="br-inline-box br-medium" />
            <input name="old_municipality" value={form.old_municipality} onChange={handleChange} className="br-inline-box br-medium" />
            {" "}वडा नं. <span className="br-bg-gray">{user?.ward || form.ward_no}</span> बस्ने{" "}
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="br-inline-box br-long" required />
            {" "}<span className="br-red">*</span> नाममा नम्बरी दर्ता कायम रहेको साविक जिल्ला काठमाडौँ{" "}
            <select name="municipality" value={form.municipality} onChange={handleChange} className="br-inline-select">
              <option value="">-- छान्नुहोस् --</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            {" "}वडा नं.{" "}
            <input name="old_ward_no" value={form.old_ward_no} onChange={handleChange} className="br-inline-box br-tiny" />
            {" "}<span className="br-red">*</span> हाल जिल्ला{" "}
            <input name="municipality"    value={form.municipality}    onChange={handleChange} className="br-inline-box br-medium" />
            {" "}<span className="br-red">*</span>{" "}
            <input name="old_municipality" value={form.old_municipality} onChange={handleChange} className="br-inline-box br-medium" />
            {" "}<span className="br-red">*</span>, वडा नं.{" "}
            <input name="ward_no" value={form.ward_no} onChange={handleChange} className="br-inline-box br-tiny" />
            {" "}<span className="br-red">*</span> को कित्ता नम्बर{" "}
            <input name="plot_number" value={form.plot_number} onChange={handleChange} className="br-inline-box br-small2" required />
            {" "}<span className="br-red">*</span> को क्षेत्रफल{" "}
            <input name="area" value={form.area} onChange={handleChange} className="br-inline-box br-small2" />
            {" "}<span className="br-red">*</span>{" "}
            जमिनको निजको निवेदन अनुसार हालसम्मको चौहद्दी तपशिल अनुसार रहेको व्यहोरा अनुरोध छ।
          </p>
        </div>

        {/* ── Four Boundaries ── */}
        <div className="br-chauhaddi">
          {[
            { label: "पूर्व:",    name: "east_boundary"  },
            { label: "पश्चिम:",  name: "west_boundary"  },
            { label: "उत्तर:",   name: "north_boundary" },
            { label: "दक्षिण:", name: "south_boundary" },
          ].map(({ label, name }) => (
            <div key={name} className="br-chauhaddi-item">
              <label>{label}</label>
              <span className="br-red">*</span>
              <input name={name} value={form[name]} onChange={handleChange} className="br-line br-long-input" />
            </div>
          ))}
        </div>

        {/* ── Signature ── */}
        <div className="br-signature-section">
          <div className="br-signature-block">
            <div className="br-signature-line"></div>
            <span className="br-red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="br-sig-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="br-designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Notes ── */}
        <div className="br-notes-section">
          <label>Notes / टिप्पणी</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="br-notes-textarea" placeholder="थप टिप्पणी..." />
        </div>

        {/* ── Footer ── */}
        <div className="br-footer">
          <button className="br-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="br-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
};

export default BoundaryRecommendation;