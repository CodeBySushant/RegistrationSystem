import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from WorkPlanningCompleted.css)
   All classes prefixed with "wpc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .wpc-container {
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
  .wpc-bold      { font-weight: bold; }
  .wpc-underline { text-decoration: underline; }
  .wpc-required  { color: red; margin-left: 4px; }
  .wpc-highlight {
    background-color: #f0f0f0;
    padding: 2px 5px;
    border-radius: 3px;
  }

  /* ── Top Bar ── */
  .wpc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .wpc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .wpc-header { text-align: center; margin-bottom: 20px; position: relative; }
  .wpc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .wpc-header-text { display: flex; flex-direction: column; align-items: center; }
  .wpc-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .wpc-ward-title   { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .wpc-address-text,
  .wpc-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .wpc-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .wpc-meta-left p, .wpc-meta-right p { margin: 5px 0; }
  .wpc-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .wpc-small-input { width: 120px; }

  /* ── Subject ── */
  .wpc-subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* ── Addressee ── */
  .wpc-addressee { margin-bottom: 20px; font-size: 1.05rem; }
  .wpc-addressee-row { margin-bottom: 8px; }
  .wpc-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .wpc-large-input  { width: 300px; }
  .wpc-medium-input { width: 150px; }

  /* ── Body ── */
  .wpc-body {
    font-size: 1.05rem;
    line-height: 2.4;
    text-align: justify;
    margin-bottom: 30px;
  }
  .wpc-inline-box {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .wpc-medium-box { width: 180px; }
  .wpc-long-box   { width: 250px; }

  /* ── Signature ── */
  .wpc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .wpc-signature-block { width: 220px; text-align: center; }
  .wpc-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }

  .wpc-star-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .wpc-star-wrapper input { padding-left: 18px; width: 100%; box-sizing: border-box; }
  .wpc-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .wpc-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .wpc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .wpc-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .wpc-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .wpc-container .detail-group { display: flex; flex-direction: column; }
  .wpc-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .wpc-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .wpc-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .wpc-footer { text-align: center; margin-top: 40px; }
  .wpc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .wpc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .wpc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .wpc-copyright {
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
    .wpc-container, .wpc-container * { visibility: visible; }
    .wpc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
      border: none;
    }
    .wpc-top-bar, .wpc-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalani_no:             "",
  addressee_office:       "",
  addressee_ward:         "",
  plan_name:              "",
  applicant_person_name:  "",
  inspection_result:      "",
  signer_name:            "",
  signer_designation:     "",
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
const WorkPlanningCompleted = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/work-planning-completed", form);
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
      const res = await axios.post("/api/forms/work-planning-completed", form);
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
    <div className="wpc-container">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <div className="wpc-top-bar">
        कार्य योजना पूरा भयो सिफारिस ।
        <span className="wpc-breadcrumb">
          आर्थिक &gt; कार्य योजना पूरा भयो सिफारिस
        </span>
      </div>

      {/* ── Header ── */}
      <div className="wpc-header">
        <div className="wpc-header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="wpc-header-text">
          <h1 className="wpc-municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="wpc-ward-title">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || " "} नं. वडा कार्यालय`}
          </h2>
          <p className="wpc-address-text">{MUNICIPALITY.officeLine}</p>
          <p className="wpc-province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* ── Meta ── */}
      <div className="wpc-meta-row">
        <div className="wpc-meta-left">
          <p>पत्र संख्या : <span className="wpc-bold">२०८२/८३</span></p>
          <p>
            चलानी नं. :{" "}
            <input
              name="chalani_no"
              value={form.chalani_no}
              onChange={handleChange}
              className="wpc-dotted-input wpc-small-input"
            />
          </p>
        </div>
        <div className="wpc-meta-right">
          <p>मिति : <span className="wpc-bold">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* ── Subject ── */}
      <div className="wpc-subject-section">
        <p>विषय: <span className="wpc-underline">सिफारिस गरिएको वारे ।</span></p>
      </div>

      {/* ── Addressee ── */}
      <div className="wpc-addressee">
        <div className="wpc-addressee-row">
          <span>श्री {MUNICIPALITY.name}</span>
        </div>
        <div className="wpc-addressee-row">
          <input
            name="addressee_office"
            value={form.addressee_office}
            onChange={handleChange}
            className="wpc-line-input wpc-large-input"
            required
          />
        </div>
        <div className="wpc-addressee-row">
          <span>{MUNICIPALITY.name}</span>
          <input
            name="addressee_ward"
            value={form.addressee_ward}
            onChange={handleChange}
            className="wpc-line-input wpc-medium-input"
          />
          <span>{MUNICIPALITY.city}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="wpc-body">
        <p>
          उपरोक्त सम्बन्धमा{" "}
          <span className="wpc-highlight">{MUNICIPALITY.name}</span>{" "}
          <span className="wpc-highlight">वडा नं {user?.ward || MUNICIPALITY.wardNumber}</span>
          {" "}मा आ.व. <span className="wpc-highlight">२०८२/८३</span> मा संचालित
          <input
            name="plan_name"
            value={form.plan_name}
            onChange={handleChange}
            className="wpc-inline-box wpc-long-box"
            required
          />
          योजना कार्य सम्पन्न भएको भनि श्री
          <input
            name="applicant_person_name"
            value={form.applicant_person_name}
            onChange={handleChange}
            className="wpc-inline-box wpc-medium-box"
            required
          />
          ले मिति <span className="wpc-highlight">२०८२-०८-०६</span> गतेमा दिनु
          भएको निवेदन अनुसार स्थलगत निरिक्षण गर्दा
          <input
            name="inspection_result"
            value={form.inspection_result}
            onChange={handleChange}
            className="wpc-inline-box wpc-long-box"
            required
          />
          योजना कार्य सम्पन्न देखिएकोले प्राविधिक वाट कार्य सम्पन्न मुल्यांकन
          गराई तहा कार्यालय नियमानुसार आवश्यक भुक्तानीका लागि सिफारिस साथ सादर
          अनुरोध छ।
        </p>
      </div>

      {/* ── Signature ── */}
      <div className="wpc-signature-section">
        <div className="wpc-signature-block">
          <div className="wpc-signature-line"></div>
          <div className="wpc-star-wrapper">
            <span className="wpc-required-star">*</span>
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="wpc-line-input"
              required
            />
          </div>
          <select
            name="signer_designation"
            value={form.signer_designation}
            onChange={handleChange}
            className="wpc-designation-select"
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
      <div className="wpc-footer">
        <button
          className="wpc-save-print-btn"
          type="button"
          onClick={handlePrint}
          disabled={loading}
        >
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="wpc-copyright">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default WorkPlanningCompleted;