import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from GovernmentalLandUtilizationRecommendation.css)
   All classes prefixed with "glur-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .glur-container {
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
  .glur-bold      { font-weight: bold; }
  .glur-underline { text-decoration: underline; }
  .glur-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .glur-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .glur-bg-gray   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }
  .glur-ml-20     { margin-left: 20px; }
  .glur-center    { text-align: center; }

  /* ── Top Bar ── */
  .glur-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .glur-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .glur-header { text-align: center; margin-bottom: 20px; position: relative; }
  .glur-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .glur-header-text { display: flex; flex-direction: column; align-items: center; }
  .glur-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .glur-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .glur-address-text,
  .glur-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .glur-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .glur-meta-left p, .glur-meta-right p { margin: 5px 0; }
  .glur-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .glur-small-input { width: 120px; }

  /* ── Subject ── */
  .glur-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Addressee ── */
  .glur-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .glur-addressee-row { margin-bottom: 8px; display: flex; align-items: center; }
  .glur-line {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .glur-medium-input { width: 200px; }
  .glur-bold-select {
    border: 1px solid #ccc;
    background: #fff;
    padding: 2px;
    font-weight: bold;
    margin-left: 5px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Body ── */
  .glur-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .glur-inline-box {
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
  .glur-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .glur-tiny   { width: 40px;  text-align: center; }
  .glur-small  { width: 100px; }
  .glur-medium { width: 180px; }

  /* ── Tapashil / Boundaries ── */
  .glur-tapashil   { margin-bottom: 40px; }
  .glur-boundary-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  .glur-boundary-item { display: flex; align-items: center; }
  .glur-boundary-item label { min-width: 70px; font-weight: bold; }
  .glur-long-input { width: 250px; }

  /* ── Signature ── */
  .glur-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .glur-signature-block { width: 220px; text-align: center; position: relative; }
  .glur-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .glur-sig-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .glur-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .glur-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .glur-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .glur-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .glur-container .detail-group { display: flex; flex-direction: column; }
  .glur-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .glur-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .glur-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .glur-footer { text-align: center; margin-top: 40px; }
  .glur-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .glur-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .glur-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .glur-copyright {
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
    .glur-container, .glur-container * { visibility: visible; }
    .glur-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .glur-top-bar, .glur-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:                "२०८२/८३",
  chalani_no:               "",
  date_nep:                 new Date().toISOString().slice(0, 10),
  addressee_type:           "जिल्ला प्रशासन कार्यालय",
  addressee_line1:          "",
  addressee_line2:          "",
  municipality:             "",
  ward_no:                  "",
  applicant_name:           "",
  applicant_prefix:         "श्री",
  applicant_name_secondary: "",
  child_prefix:             "छोरा",
  child_name:               "",
  old_place_text:           "",
  old_place_type:           "",
  old_ward_no:              "",
  plot_number:              "",
  area:                     "",
  old_place_text_2:         "",
  current_municipality:     MUNICIPALITY.name,
  current_ward_no:          "",
  boundary_east:            "",
  boundary_west:            "",
  boundary_north:           "",
  boundary_south:           "",
  signer_name:              "",
  signer_designation:       "",
  applicant_name_footer:    "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
  notes:                    "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function GovernmentalLandUtilizationRecommendation() {
  // FIX: useWardForm was called without being imported
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/governmental-land-utilization-recommendation", form);
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
      const res = await axios.post("/api/forms/governmental-land-utilization-recommendation", form);
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
    <div className="glur-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="glur-top-bar">
          जोत भोग चलनको सिफारिस ।
          <span className="glur-breadcrumb">
            घर / जग्गा जमिन &gt; जोत भोग चलनको सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="glur-header">
          <div className="glur-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="glur-header-text">
            <h1 className="glur-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="glur-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="glur-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="glur-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="glur-meta-row">
          <div className="glur-meta-left">
            <p>पत्र संख्या : <span className="glur-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="glur-dotted glur-small-input" />
            </p>
          </div>
          <div className="glur-meta-right">
            <p>मिति : <span className="glur-bold">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="glur-addressee">
          <div className="glur-addressee-row">
            <span>श्री</span>
            <select name="addressee_type" className="glur-bold-select" value={form.addressee_type} onChange={handleChange}>
              <option value="जिल्ला प्रशासन कार्यालय">जिल्ला प्रशासन कार्यालय</option>
              <option value="मालपोत कार्यालय">मालपोत कार्यालय</option>
              <option value="नापी कार्यालय">नापी कार्यालय</option>
            </select>
          </div>
          <div className="glur-addressee-row">
            <input name="addressee_line1" value={form.addressee_line1} onChange={handleChange} className="glur-line glur-medium-input" required />
            <span className="glur-red">*</span>
            <span>,</span>
            <input name="addressee_line2" value={form.addressee_line2} onChange={handleChange} className="glur-line glur-medium-input" required />
            <span className="glur-red">*</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="glur-subject">
          <p>विषय: <span className="glur-underline">सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* ── Body ── */}
        <div className="glur-body">
          <p>
            प्रस्तुत बिषयमा यस जिल्ला{" "}
            <span className="glur-bold">काठमाडौँ</span>{" "}
            <span className="glur-bold glur-ml-20">{form.municipality}</span>{" "}
            वडा नं{" "}
            <input name="ward_no" value={form.ward_no} onChange={handleChange} className="glur-inline-box glur-tiny" />
            {" "}बस्ने{" "}
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="glur-inline-box glur-medium" required />
            {" "}<span className="glur-red">*</span> को नाति{" "}
            <select name="applicant_prefix" className="glur-inline-select" value={form.applicant_prefix} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input name="applicant_name_secondary" value={form.applicant_name_secondary} onChange={handleChange} className="glur-inline-box glur-medium" required />
            {" "}<span className="glur-red">*</span> को छोरा{" "}
            <select name="child_prefix" className="glur-inline-select" value={form.child_prefix} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input name="child_name" value={form.child_name} onChange={handleChange} className="glur-inline-box glur-medium" required />
            {" "}<span className="glur-red">*</span>{" "}
            ले यस कार्यालयमा दिनु भएको निवेदन अनुसार मैले जिल्ला{" "}
            <span className="glur-bold">काठमाडौँ</span>{" "}
            (साविक{" "}
            <input name="old_place_text" value={form.old_place_text} onChange={handleChange} className="glur-inline-box glur-medium" />
            <select name="old_place_type" className="glur-inline-select" value={form.old_place_type} onChange={handleChange}>
              <option value="">-- छान्नुहोस् --</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            , वडा नं.{" "}
            <input name="old_ward_no" value={form.old_ward_no} onChange={handleChange} className="glur-inline-box glur-tiny" required />
            {" "}<span className="glur-red">*</span>), कि.नं.{" "}
            <input name="plot_number" value={form.plot_number} onChange={handleChange} className="glur-inline-box glur-small" required />
            {" "}<span className="glur-red">*</span> हाल{" "}
            <span className="glur-bg-gray">{MUNICIPALITY.name}</span>{" "}
            वडा नं {user?.ward || form.current_ward_no} मा पर्ने तपशिल बमोजिमको चार किल्ला
            भित्रको भोग अनुसारको क्षेत्रफल{" "}
            <input name="area" value={form.area} onChange={handleChange} className="glur-inline-box glur-small" required />
            {" "}<span className="glur-red">*</span>{" "}
            भएको ऐलानी (दर्ता छुट) जग्गा...{" "}
            <input name="old_place_text_2" value={form.old_place_text_2 || ""} onChange={handleChange} className="glur-inline-box glur-medium" />
          </p>
        </div>

        {/* ── Tapashil Boundaries ── */}
        <div className="glur-tapashil">
          <h4 className="glur-bold glur-center">तपशिल चौहद्दी:</h4>
          <div className="glur-boundary-list">
            {[
              { label: "पूर्व :-",    name: "boundary_east"  },
              { label: "पश्चिम :-",  name: "boundary_west"  },
              { label: "उत्तर :-",   name: "boundary_north" },
              { label: "दक्षिण :-", name: "boundary_south" },
            ].map(({ label, name }) => (
              <div key={name} className="glur-boundary-item">
                <label>{label}</label>
                <span className="glur-red">*</span>
                <input name={name} value={form[name]} onChange={handleChange} className="glur-line glur-long-input" />
              </div>
            ))}
          </div>
          <p className="glur-center" style={{ marginTop: 10 }}>
            (यति चार किल्ला भित्रको उल्लेखित जमिन)
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="glur-signature-section">
          <div className="glur-signature-block">
            <div className="glur-signature-line"></div>
            <span className="glur-red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="glur-sig-input" required />
            <select name="signer_designation" className="glur-designation-select" value={form.signer_designation} onChange={handleChange}>
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
        <div className="glur-footer">
          <button className="glur-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="glur-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}