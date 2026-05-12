import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from UnmarriedVerification.css)
   All classes prefixed with "uv-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .uv-container {
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
  .uv-bold        { font-weight: bold; }
  .uv-underline   { text-decoration: underline; }
  .uv-red         { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }

  /* ── Top Bar ── */
  .uv-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .uv-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .uv-header { text-align: center; margin-bottom: 20px; position: relative; }
  .uv-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .uv-header-text { display: flex; flex-direction: column; align-items: center; }
  .uv-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .uv-ward-title { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .uv-address-text,
  .uv-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .uv-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .uv-meta-left p, .uv-meta-right p { margin: 5px 0; }
  .uv-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .uv-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .uv-small-input  { width: 120px; }
  .uv-tiny-input   { width: 80px; }
  .uv-full-width   { width: 100%; }

  /* ── Body paragraph ── */
  .uv-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .uv-inline-box {
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
  .uv-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .uv-tiny-box   { width: 40px;  text-align: center; }
  .uv-medium-box { width: 180px; }

  /* ── Signature ── */
  .uv-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .uv-signature-block { width: 220px; text-align: center; }
  .uv-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .uv-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .uv-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .uv-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .uv-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .uv-container .detail-group { display: flex; flex-direction: column; }
  .uv-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .uv-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .uv-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .uv-footer { text-align: center; margin-top: 40px; }
  .uv-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .uv-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .uv-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .uv-copyright {
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
    .uv-container, .uv-container * { visibility: visible; }
    .uv-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
    }
    .uv-top-bar, .uv-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  reference_no:           "२०८२/८३",
  chalani_no:             "",
  date_bs:                "",
  district:               "काठमाडौँ",
  previous_ward_no:       "",
  previous_admin:         "",
  resident_name:          "",
  spouse_name:            "",
  child_relation:         "",
  child_name:             "",
  signatory_name:         "",
  signatory_designation:  "",
  // ApplicantDetailsNp fields
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_cit_issued_date: "",
  applicant_nid_no:       "",
  applicant_phone:        "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const UnmarriedVerification = () => {
  // FIX: original used useWardForm but never imported it, and also called
  //      setField() which doesn't exist. Using useWardForm correctly here.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit (form onSubmit) ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/unmarried-verification_form", form);
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
      const res = await axios.post("/api/forms/unmarried-verification_form", form);
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

      <form className="uv-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="uv-top-bar">
          अविवाह प्रमाणित ।
          <span className="uv-breadcrumb">
            सामाजिक / पारिवारिक &gt; अविवाह प्रमाणित
          </span>
        </div>

        {/* ── Header ── */}
        <div className="uv-header">
          <div className="uv-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="uv-header-text">
            <h1 className="uv-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="uv-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="uv-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="uv-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="uv-meta-row">
          <div className="uv-meta-left">
            <p>
              पत्र संख्या :{" "}
              <input
                name="reference_no"
                value={form.reference_no}
                onChange={handleChange}
                className="uv-line-input uv-tiny-input"
              />
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="uv-dotted-input uv-small-input"
              />
            </p>
          </div>
          <div className="uv-meta-right">
            <p>
              मिति :{" "}
              <input
                name="date_bs"
                value={form.date_bs}
                onChange={handleChange}
                className="uv-line-input uv-tiny-input"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="uv-body">
          <p>
            प्रस्तुत बिषयमा जिल्ला
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              className="uv-inline-box uv-medium-box"
            />
            वडा नं.
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="uv-inline-box uv-tiny-box"
              required
            />
            (साविक
            <input
              name="previous_admin"
              value={form.previous_admin}
              onChange={handleChange}
              className="uv-inline-box uv-medium-box"
            />
            ) निवासी श्री
            <input
              name="resident_name"
              value={form.resident_name}
              onChange={handleChange}
              className="uv-inline-box uv-medium-box"
              required
            />
            तथा श्रीमती
            <input
              name="spouse_name"
              value={form.spouse_name}
              onChange={handleChange}
              className="uv-inline-box uv-medium-box"
              required
            />
            को
            <select
              name="child_relation"
              value={form.child_relation}
              onChange={handleChange}
              className="uv-inline-select"
            >
              <option value="">छोरा/छोरी</option>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <input
              name="child_name"
              value={form.child_name}
              onChange={handleChange}
              className="uv-inline-box uv-medium-box"
              required
            />
            आजको मितिसम्म अविवाहित रहेको व्यहोरा प्रमाणित गरिन्छ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="uv-signature-section">
          <div className="uv-signature-block">
            <div className="uv-signature-line"></div>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="uv-line-input uv-full-width"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="uv-designation-select"
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
        <div className="uv-footer">
          <button
            className="uv-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="uv-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default UnmarriedVerification;