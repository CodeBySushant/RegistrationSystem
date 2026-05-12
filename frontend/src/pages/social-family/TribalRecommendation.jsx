import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from TribalRecommendation.css)
   All classes prefixed with "tr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .tr-container {
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
  .tr-bold      { font-weight: bold; }
  .tr-underline { text-decoration: underline; }
  .tr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .tr-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .tr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .tr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .tr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .tr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .tr-header-text { display: flex; flex-direction: column; align-items: center; }
  .tr-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .tr-ward-title  { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .tr-address-text,
  .tr-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .tr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .tr-meta-left p, .tr-meta-right p { margin: 5px 0; }

  .tr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .tr-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
    margin: 0 10px;
  }
  .tr-small-input  { width: 120px; }
  .tr-tiny-input   { width: 80px; }
  .tr-medium-input { width: 200px; }
  .tr-full-width   { width: 100%; }

  /* ── Addressee ── */
  .tr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
  .tr-addressee-row     { margin-bottom: 8px; }

  /* ── Subject ── */
  .tr-subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* ── Body ── */
  .tr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .tr-inline-box {
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
  .tr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .tr-tiny-box   { width: 40px;  text-align: center; }
  .tr-small-box  { width: 100px; }
  .tr-medium-box { width: 160px; }

  /* ── Signature ── */
  .tr-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .tr-signature-block   { width: 220px; text-align: center; position: relative; }
  .tr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .tr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .tr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .tr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .tr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .tr-container .detail-group { display: flex; flex-direction: column; }
  .tr-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .tr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .tr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .tr-footer { text-align: center; margin-top: 40px; }
  .tr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .tr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .tr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .tr-copyright {
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
    .tr-container, .tr-container * { visibility: visible; }
    .tr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .tr-top-bar, .tr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  reference_no:           "२०८२/८३",
  chalani_no:             "",
  date_bs:                "",
  requester_name:         "",
  registered_list_name:   "",
  person_name:            "",
  person_relation_type:   "",
  person_role:            "",
  person_role_select:     "",
  previous_admin_type:    "",
  previous_ward_no:       "",
  citizenship_no:         "",
  claimed_caste:          "",
  claimed_type:           "आदिवासी",
  registered_list_name_2: "",
  claimed_caste_confirm:  "",
  signatory_name:         "",
  signatory_designation:  "",
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
const TribalRecommendation = () => {
  // FIX: original used useWardForm + setField() without importing either.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit (form onSubmit) ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/tribal-recommendation", form);
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
      const res = await axios.post("/api/forms/tribal-recommendation", form);
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

      <form className="tr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="tr-top-bar">
          आदिवासी सिफारिस ।
          <span className="tr-breadcrumb">
            सामाजिक / पारिवारिक &gt; आदिवासी सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="tr-header">
          <div className="tr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="tr-header-text">
            <h1 className="tr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="tr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="tr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="tr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="tr-meta-row">
          <div className="tr-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="tr-bold">
                <input
                  name="reference_no"
                  value={form.reference_no}
                  onChange={handleChange}
                  className="tr-line-input tr-tiny-input"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="tr-dotted-input tr-small-input"
              />
            </p>
          </div>
          <div className="tr-meta-right">
            <p>
              मिति :{" "}
              <input
                name="date_bs"
                value={form.date_bs}
                onChange={handleChange}
                className="tr-line-input tr-tiny-input"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="tr-addressee-section">
          <div className="tr-addressee-row">
            <span>श्री</span>
            <input
              name="requester_name"
              value={form.requester_name}
              onChange={handleChange}
              className="tr-line-input tr-medium-input"
              required
            />
            <span className="tr-red">*</span>
          </div>
          <div className="tr-addressee-row">
            <input
              name="registered_list_name"
              value={form.registered_list_name}
              onChange={handleChange}
              className="tr-line-input tr-medium-input"
              required
            />
            <span className="tr-red">*</span>
            <span> |</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="tr-subject-section">
          <p>
            विषय: <span className="tr-underline">सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* ── Body ── */}
        <div className="tr-body">
          <p>
            उपरोक्त बिषयमा{" "}
            <input
              name="person_name"
              value={form.person_name}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
              required
            />{" "}
            <span className="tr-red">*</span>
            {" "}को{" "}
            <select
              name="person_relation_type"
              value={form.person_relation_type}
              onChange={handleChange}
              className="tr-inline-select"
            >
              <option value="">नाति/नातिनी</option>
              <option value="नाति">नाति</option>
              <option value="नातिनी">नातिनी</option>
            </select>
            <input
              name="person_role"
              value={form.person_role}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
              required
            />{" "}
            <span className="tr-red">*</span>
            {" "}को{" "}
            <select
              name="person_role_select"
              value={form.person_role_select}
              onChange={handleChange}
              className="tr-inline-select"
            >
              <option value="">छोरा/छोरी</option>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            {" "}जिल्ला काठमाडौँ साविक{" "}
            <select
              name="previous_admin_type"
              value={form.previous_admin_type}
              onChange={handleChange}
              className="tr-inline-select"
            >
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            {" "}वडा नं{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="tr-inline-box tr-tiny-box"
              required
            />{" "}
            <span className="tr-red">*</span>
            {" "}भै हाल जिल्ला काठमाडौँ{" "}
            {MUNICIPALITY.name} वडा नं {user?.ward || " "} बस्ने
            {" "}(ना.प्र.नं.{" "}
            <input
              name="citizenship_no"
              value={form.citizenship_no}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
              required
            />{" "}
            <span className="tr-red">*</span>
            {" "}मिति{" "}{form.date_bs}) को{" "}
            <input
              name="claimed_caste"
              value={form.claimed_caste}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
              required
            />{" "}
            <span className="tr-red">*</span>
            {" "}ले म{" "}
            <select
              name="claimed_type"
              value={form.claimed_type}
              onChange={handleChange}
              className="tr-inline-select"
            >
              <option value="आदिवासी">आदिवासी</option>
              <option value="जनजाति">जनजाति</option>
            </select>
            {" "}अन्तरगत{" "}
            <input
              name="registered_list_name"
              value={form.registered_list_name}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
            />
            {" "}जाति भएकोले सोही बमोजिम सिफारिस गरिपाउँ भनि माग भै आएकोले नेपाल
            सरकारले सुचिकृत गरेको{" "}
            <input
              name="registered_list_name_2"
              value={form.registered_list_name_2}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
              required
            />
            {" "}मध्ये निज{" "}
            <input
              name="claimed_caste_confirm"
              value={form.claimed_caste_confirm}
              onChange={handleChange}
              className="tr-inline-box tr-medium-box"
              required
            />
            {" "}जाति भएकोले सोही व्यहोरा प्रमाणित गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="tr-signature-section">
          <div className="tr-signature-block">
            <div className="tr-signature-line"></div>
            <span className="tr-red-mark">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="tr-line-input tr-full-width"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="tr-designation-select"
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
        <div className="tr-footer">
          <button
            className="tr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="tr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default TribalRecommendation;