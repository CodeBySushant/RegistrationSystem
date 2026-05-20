// PropertyOwnerCertificateCopyRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from PropertyOwnerCertificateCopyRecommendation.css)
   All classes prefixed with "pocc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .pocc-container {
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
  .pocc-bold      { font-weight: bold; }
  .pocc-underline { text-decoration: underline; }
  .pocc-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .pocc-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .pocc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .pocc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .pocc-header { text-align: center; margin-bottom: 20px; position: relative; }
  .pocc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .pocc-header-text { display: flex; flex-direction: column; align-items: center; }
  .pocc-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .pocc-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .pocc-address-text,
  .pocc-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .pocc-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .pocc-meta-left p, .pocc-meta-right p { margin: 5px 0; }
  .pocc-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .pocc-small-input { width: 120px; }

  /* ── Addressee ── */
  .pocc-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .pocc-addressee-row { margin-bottom: 8px; display: flex; align-items: center; }
  .pocc-line {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .pocc-medium-input { width: 200px; }
  .pocc-bold-select {
    border: 1px solid #ccc;
    background: #fff;
    padding: 2px;
    font-weight: bold;
    margin-left: 5px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Body ── */
  .pocc-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .pocc-inline-box {
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
  .pocc-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .pocc-tiny   { width: 40px;  text-align: center; }
  .pocc-small  { width: 100px; }
  .pocc-medium { width: 200px; }

  /* ── Certificates 3-column grid ── */
  .pocc-certs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    margin-bottom: 40px;
  }
  .pocc-cert-col {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .pocc-form-group { display: flex; align-items: center; }
  .pocc-form-group label {
    font-weight: bold;
    margin-right: 10px;
    min-width: 60px;
    white-space: nowrap;
  }
  .pocc-full-width { width: 100%; }
  .pocc-cert-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 4px;
    padding: 2px 4px;
    font-family: inherit;
    font-size: 1rem;
    flex: 1;
  }

  /* ── Signature ── */
  .pocc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .pocc-signature-block  { width: 220px; text-align: center; position: relative; }
  .pocc-signature-line   { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .pocc-sig-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .pocc-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .pocc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .pocc-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .pocc-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .pocc-container .detail-group { display: flex; flex-direction: column; }
  .pocc-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .pocc-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .pocc-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .pocc-footer { text-align: center; margin-top: 40px; }
  .pocc-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .pocc-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .pocc-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .pocc-copyright {
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
    .pocc-container, .pocc-container * { visibility: visible; }
    .pocc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .pocc-top-bar, .pocc-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factories
───────────────────────────────────────────────────────────────────────────── */
const emptyCertificate = () => ({
  applicant_name:   "",
  na_pr_no:         "",
  issue_date:       new Date().toISOString().slice(0, 10),
  father_name:      "",
  grandfather_name: "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:                   "२०८२/८३",
  chalani_no:                  "",
  date_nep:                    "२०८२-०८-०६",
  addressee_office:            "मालपोत कार्यालय",
  addressee_place:             "",
  owner_prefix:                "श्री",
  owner_name:                  "",
  previous_muni_name:          "",
  previous_muni_type:          "",
  previous_ward_no:            "",
  plot_no:                     "",
  area:                        "",
  plot_no_duplicate:           "",
  previous_muni_name2:         "",
  previous_ward_no2:           "",
  owner_prefix2:               "श्री",
  owner_name2:                 "",
  request_district:            "",
  request_local_body:          "",
  request_local_body_type:     "गाउँपालिका",
  request_local_body_ward_no:  "",
  signer_name:                 "",
  signer_designation:          "",
  notes:                       "",
  // ApplicantDetailsNp fields
  applicant_name:              "",
  applicant_address:           "",
  applicant_citizenship_no:    "",
  applicant_phone:             "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function PropertyOwnerCertificateCopyRecommendation() {
  // FIX: useWardForm was called without being imported
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // FIX: certificates/setCertificate were used but never defined
  // Kept as separate state (not in useWardForm) since they're an array
  const [certificates, setCertificates] = useState([
    emptyCertificate(),
    emptyCertificate(),
    emptyCertificate(),
  ]);

  const setCertificate = (idx, key, value) =>
    setCertificates((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c))
    );

  const buildPayload = () => ({
    ...form,
    certificates: JSON.stringify(certificates),
  });

  const resetAll = () => {
    setForm(initialState);
    setCertificates([emptyCertificate(), emptyCertificate(), emptyCertificate()]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/property-owner-certificate-copy-recommendation", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        resetAll();
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
      const res = await axios.post("/api/forms/property-owner-certificate-copy-recommendation", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        resetAll();
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
    <div className="pocc-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="pocc-top-bar">
          जग्गाधनी प्रमाण पत्रको प्रतिलिपि सिफारिस ।
          <span className="pocc-breadcrumb">
            घर / जग्गा जमिन &gt; जग्गाधनी प्रमाण पत्रको प्रतिलिपि सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="pocc-header">
          <div className="pocc-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="pocc-header-text">
            <h1 className="pocc-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="pocc-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="pocc-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="pocc-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="pocc-meta-row">
          <div className="pocc-meta-left">
            <p>पत्र संख्या : <span className="pocc-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="pocc-dotted pocc-small-input" />
            </p>
          </div>
          <div className="pocc-meta-right">
            <p>मिति : <span className="pocc-bold">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="pocc-addressee">
          <div className="pocc-addressee-row">
            <span>श्री</span>
            <select name="addressee_office" value={form.addressee_office} onChange={handleChange} className="pocc-bold-select">
              <option value="मालपोत कार्यालय">मालपोत कार्यालय</option>
              <option value="भुमि सुधार कार्यालय">भुमि सुधार कार्यालय</option>
            </select>
          </div>
          <div className="pocc-addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={handleChange} className="pocc-line pocc-medium-input" />
            <span className="pocc-red">*</span>
            <span className="pocc-bold">, काठमाडौँ</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pocc-body">
          <p>
            उपरोक्त सम्बन्धमा{" "}
            <select name="owner_prefix" value={form.owner_prefix} onChange={handleChange} className="pocc-inline-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input name="owner_name" value={form.owner_name} onChange={handleChange} className="pocc-inline-box pocc-medium" required />
            {" "}<span className="pocc-red">*</span>
            <br />
            <input name="previous_muni_name" value={form.previous_muni_name} onChange={handleChange} className="pocc-inline-box pocc-medium" />
            <select name="previous_muni_type" value={form.previous_muni_type} onChange={handleChange} className="pocc-inline-select">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            वडा नं.{" "}
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="pocc-inline-box pocc-tiny" required />
            {" "}<span className="pocc-red">*</span>
            {" "}कि.नं.{" "}
            <input name="plot_no" value={form.plot_no} onChange={handleChange} className="pocc-inline-box pocc-small" required />
            {" "}<span className="pocc-red">*</span>
            {" "}क्षे.फ.{" "}
            <input name="area" value={form.area} onChange={handleChange} className="pocc-inline-box pocc-small" required />
            {" "}<span className="pocc-red">*</span>
            {" "}को जग्गाको जग्गाधनी प्रमाण पुर्जा{" "}
            <input name="plot_no_duplicate" value={form.plot_no_duplicate} onChange={handleChange} className="pocc-inline-box pocc-medium" />
            {" "}<span className="pocc-red">*</span>
            <br />
            सोको प्रतिलिपिको सिफारिस गरी पाउन जिल्ला{" "}
            <input name="request_district" value={form.request_district} onChange={handleChange} className="pocc-inline-box pocc-medium" />
            {" "}<span className="pocc-red">*</span>
            <input name="request_local_body" value={form.request_local_body} onChange={handleChange} className="pocc-inline-box pocc-medium" />
            {" "}<span className="pocc-red">*</span>
            <select name="request_local_body_type" value={form.request_local_body_type} onChange={handleChange} className="pocc-inline-select">
              <option value="गाउँपालिका">गाउँपालिका</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            वडा नं.{" "}
            <input name="request_local_body_ward_no" value={form.request_local_body_ward_no} onChange={handleChange} className="pocc-inline-box pocc-tiny" required />
            {" "}<span className="pocc-red">*</span>
            <br />
            (साविक{" "}
            <input name="previous_muni_name2" value={form.previous_muni_name2} onChange={handleChange} className="pocc-inline-box pocc-medium" />
            {" "}वडा नं.{" "}
            <input name="previous_ward_no2" value={form.previous_ward_no2} onChange={handleChange} className="pocc-inline-box pocc-tiny" />
            ) बस्ने{" "}
            <select name="owner_prefix2" value={form.owner_prefix2} onChange={handleChange} className="pocc-inline-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input name="owner_name2" value={form.owner_name2} onChange={handleChange} className="pocc-inline-box pocc-medium" />
            {" "}ले यस वडा कार्यालयमा निवेदन दिनु भएको हुँदा सो सम्बन्धमा यहाँको
            नियमानुसार जग्गाधनी प्रमाण पुर्जाको प्रतिलिपि उपलब्ध गराई दिनुहुन
            सिफारिस गरिन्छ।
          </p>
        </div>

        {/* ── Certificates 3-column grid ── */}
        <div className="pocc-certs-grid">
          {certificates.map((c, i) => (
            <div key={i} className="pocc-cert-col">
              <div className="pocc-form-group">
                <label>निवेदक <span className="pocc-red">*</span></label>
                <input value={c.applicant_name}   onChange={(e) => setCertificate(i, "applicant_name",   e.target.value)} className="pocc-cert-input" />
              </div>
              <div className="pocc-form-group">
                <label>ना.प्र.नं. <span className="pocc-red">*</span></label>
                <input value={c.na_pr_no}         onChange={(e) => setCertificate(i, "na_pr_no",         e.target.value)} className="pocc-cert-input" />
              </div>
              <div className="pocc-form-group">
                <label>जारी मिति</label>
                <input value={c.issue_date}       onChange={(e) => setCertificate(i, "issue_date",       e.target.value)} className="pocc-cert-input" />
              </div>
              <div className="pocc-form-group">
                <label>पिता <span className="pocc-red">*</span></label>
                <input value={c.father_name}      onChange={(e) => setCertificate(i, "father_name",      e.target.value)} className="pocc-cert-input" />
              </div>
              <div className="pocc-form-group">
                <label>बाजे <span className="pocc-red">*</span></label>
                <input value={c.grandfather_name} onChange={(e) => setCertificate(i, "grandfather_name", e.target.value)} className="pocc-cert-input" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Signature ── */}
        <div className="pocc-signature-section">
          <div className="pocc-signature-block">
            <div className="pocc-signature-line"></div>
            <span className="pocc-red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="pocc-sig-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="pocc-designation-select">
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
        <div className="pocc-footer">
          <button className="pocc-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="pocc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}