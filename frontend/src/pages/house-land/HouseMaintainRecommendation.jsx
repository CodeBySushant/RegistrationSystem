// HouseMaintainRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from HouseMaintainRecommendation.css)
   All classes prefixed with "hmr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .hmr-container {
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
  .hmr-bold          { font-weight: bold; }
  .hmr-underline     { text-decoration: underline; }
  .hmr-red           { color: red; font-weight: bold; margin: 0 2px; vertical-align: middle; }
  .hmr-red-mark      { color: red; position: absolute; top: 0; left: 0; }
  .hmr-red-asterisk  { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .hmr-in-cell       { font-size: 0.8rem; }
  .hmr-ml-20         { margin-left: 20px; }

  /* ── Top Bar ── */
  .hmr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .hmr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .hmr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .hmr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .hmr-header-text { display: flex; flex-direction: column; align-items: center; }
  .hmr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .hmr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .hmr-address-text,
  .hmr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .hmr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .hmr-meta-left p, .hmr-meta-right p { margin: 5px 0; }
  .hmr-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .hmr-small-input { width: 120px; }

  /* ── Addressee ── */
  .hmr-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .hmr-addressee-row { margin-bottom: 8px; display: flex; align-items: center; }
  .hmr-line {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .hmr-medium-input { width: 200px; }

  /* ── Body ── */
  .hmr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 20px;
  }
  .hmr-inline-box {
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
  .hmr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .hmr-tiny   { width: 40px;  text-align: center; }
  .hmr-medium { width: 160px; }
  .hmr-long   { width: 220px; }

  /* ── Property Table ── */
  .hmr-table-section  { margin-top: 20px; margin-bottom: 40px; }
  .hmr-table-title    { text-align: center; font-weight: bold; margin-bottom: 10px; color: #2c3e50; }
  .hmr-table-scroll   { overflow-x: auto; }
  .hmr-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .hmr-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
  }
  .hmr-table thead tr:nth-child(2) th { text-align: center; }
  .hmr-table td { border: 1px solid #555; padding: 5px; }
  .hmr-table-input {
    width: 70%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    font-family: inherit;
    color: #e74c3c;
  }
  .hmr-table-select {
    border: 1px solid #ccc;
    background: #fff;
    font-size: 0.9rem;
    padding: 2px;
    width: 80%;
    font-family: inherit;
  }
  .hmr-action-cell { text-align: center; }
  .hmr-add-btn {
    background-color: #1a56db;
    color: white;
    border: none;
    width: 22px;
    height: 22px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: 1;
    margin: 1px;
  }
  .hmr-add-btn:hover { background-color: #1e429f; }
  .hmr-add-row-btn {
    margin-top: 8px;
    background-color: #1a56db;
    color: white;
    border: none;
    padding: 4px 12px;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9rem;
  }

  /* ── Signature ── */
  .hmr-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .hmr-signature-block { width: 220px; text-align: center; position: relative; }
  .hmr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .hmr-sig-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .hmr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .hmr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .hmr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .hmr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .hmr-container .detail-group { display: flex; flex-direction: column; }
  .hmr-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .hmr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .hmr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .hmr-footer { text-align: center; margin-top: 40px; }
  .hmr-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .hmr-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .hmr-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .hmr-copyright {
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
    .hmr-container, .hmr-container * { visibility: visible; }
    .hmr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .hmr-top-bar, .hmr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factory
───────────────────────────────────────────────────────────────────────────── */
const emptyProperty = () => ({
  previous_gb_np:                  "",
  previous_ward_no:                "",
  current_gb_np:                   MUNICIPALITY.name,
  current_ward_no:                 "",
  seat_or_plot:                    "",
  area:                            "",
  construction_year_or_permission: "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:                "२०८२/८३",
  chalani_no:               "",
  date_nep:                 new Date().toISOString().slice(0, 10),
  addressee_office:         "मालपोत कार्यालय",
  addressee_location:       "",
  district:                 "काठमाडौँ",
  municipality:             MUNICIPALITY.name,
  ward_no:                  "1",
  owner_prefix:             "श्री",
  owner_name:               "",
  ownership_type:           "पूर्ण",
  signer_name:              "",
  signer_designation:       "",
  applicant_name:           "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
  notes:                    "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function HouseMaintainRecommendation() {
  // FIX: useWardForm was called without being imported
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading,    setLoading]    = useState(false);
  const { user } = useAuth();

  // FIX: properties/setProperty/addRow/removeRow were used but never defined
  const [properties, setProperties] = useState([emptyProperty()]);

  const setProperty = (idx, key, value) =>
    setProperties((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  const addRow    = () => setProperties((prev) => [...prev, emptyProperty()]);
  const removeRow = (idx) =>
    setProperties((prev) => prev.filter((_, i) => i !== idx));

  /* ── Build payload (flat form + properties array) ── */
  const buildPayload = () => ({ ...form, properties });

  /* ── Reset all ── */
  const resetAll = () => {
    setForm(initialState);
    setProperties([emptyProperty()]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/house-maintain-recommendation", buildPayload());
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
      const res = await axios.post("/api/forms/house-maintain-recommendation", buildPayload());
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
    <div className="hmr-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="hmr-top-bar">
          घर कायम सिफारिस ।
          <span className="hmr-breadcrumb">
            घर / जग्गा जमिन &gt; घर कायम सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="hmr-header">
          <div className="hmr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="hmr-header-text">
            <h1 className="hmr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="hmr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="hmr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="hmr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="hmr-meta-row">
          <div className="hmr-meta-left">
            <p>पत्र संख्या : <span className="hmr-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="hmr-dotted hmr-small-input" />
            </p>
          </div>
          <div className="hmr-meta-right">
            <p>मिति : <span className="hmr-bold">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="hmr-addressee">
          <div className="hmr-addressee-row">
            <span>श्री {form.addressee_office}</span>
            <input name="addressee_location" value={form.addressee_location} onChange={handleChange} className="hmr-line hmr-medium-input" />
            <span>,</span>
          </div>
          <div className="hmr-addressee-row">
            <input name="district" value={form.district} onChange={handleChange} className="hmr-line hmr-medium-input" required />
            <span className="hmr-red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="hmr-body">
          <p>
            उपरोक्त विषयमा जिल्ला {form.district}{" "}
            <span className="hmr-bold hmr-ml-20">{MUNICIPALITY.name}</span> वडा नं.{" "}
            <span className="hmr-bold">{user?.ward || form.ward_no}</span> (साविक{" "}
            <input name="previous_gb_np" value={form.previous_gb_np || ""} onChange={handleChange} className="hmr-inline-box hmr-medium" />
            , वडा नं.{" "}
            <input name="previous_ward_no" value={form.previous_ward_no || ""} onChange={handleChange} className="hmr-inline-box hmr-tiny" required />
            ) निवासी{" "}
            <select name="owner_prefix" value={form.owner_prefix} onChange={handleChange} className="hmr-inline-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input name="owner_name" value={form.owner_name} onChange={handleChange} className="hmr-inline-box hmr-long" required />
            {" "}<span className="hmr-red">*</span> को नाममा ...{" "}
            <select name="ownership_type" value={form.ownership_type} onChange={handleChange} className="hmr-inline-select hmr-bold">
              <option value="पूर्ण">पूर्ण</option>
              <option value="आंशिक">आंशिक</option>
            </select>
            {" "}घर निर्माण गरी यस वडा कार्यालयमा निजले चालु आर्थिक वर्षसम्मको कर
            चुक्ता गरिसकेको हुनाले घर कायम गरी दिनुहुन सिफारिस गरिन्छ।
          </p>
        </div>

        {/* ── Property Table ── */}
        <div className="hmr-table-section">
          <h4 className="hmr-table-title">घर कायम गर्नु पर्ने जग्गाको विवरण</h4>
          <div className="hmr-table-scroll">
            <table className="hmr-table">
              <thead>
                <tr>
                  <th rowSpan={2} style={{ width: "5%" }}>क्र.स.</th>
                  <th colSpan={2} style={{ width: "25%", textAlign: "center" }}>साविक</th>
                  <th colSpan={2} style={{ width: "25%", textAlign: "center" }}>हाल</th>
                  <th rowSpan={2} style={{ width: "15%" }}>सिट नं/कि.नं.</th>
                  <th rowSpan={2} style={{ width: "10%" }}>क्षेत्रफल</th>
                  <th rowSpan={2} style={{ width: "15%" }}>घर निर्माण भएको साल / अनुमति लिएको</th>
                  <th rowSpan={2} style={{ width: "5%" }}></th>
                </tr>
                <tr>
                  <th>गा.वि.स.</th>
                  <th>वडा नं</th>
                  <th>गाउँपालिका</th>
                  <th>वडा नं</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <select value={row.previous_gb_np} onChange={(e) => setProperty(i, "previous_gb_np", e.target.value)} className="hmr-table-select">
                        <option value="">--छान्नुहोस्--</option>
                        <option value="गा.वि.स.">गा.वि.स.</option>
                        <option value="न.पा.">न.पा.</option>
                      </select>
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={row.previous_ward_no || ""} onChange={(e) => setProperty(i, "previous_ward_no", e.target.value)} className="hmr-table-input" required />
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td>
                      <select value={row.current_gb_np} onChange={(e) => setProperty(i, "current_gb_np", e.target.value)} className="hmr-table-select">
                        <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
                      </select>
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={row.current_ward_no || ""} onChange={(e) => setProperty(i, "current_ward_no", e.target.value)} className="hmr-table-input" required />
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={row.seat_or_plot} onChange={(e) => setProperty(i, "seat_or_plot", e.target.value)} className="hmr-table-input" required />
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={row.area} onChange={(e) => setProperty(i, "area", e.target.value)} className="hmr-table-input" required />
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={row.construction_year_or_permission} onChange={(e) => setProperty(i, "construction_year_or_permission", e.target.value)} className="hmr-table-input" required />
                      <span className="hmr-red-asterisk hmr-in-cell">*</span>
                    </td>
                    <td className="hmr-action-cell">
                      <button type="button" className="hmr-add-btn" onClick={addRow}>+</button>
                      {properties.length > 1 && (
                        <button type="button" className="hmr-add-btn" onClick={() => removeRow(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addRow} className="hmr-add-row-btn">
              कतार थप्नुहोस्
            </button>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="hmr-signature-section">
          <div className="hmr-signature-block">
            <div className="hmr-signature-line"></div>
            <span className="hmr-red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="hmr-sig-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="hmr-designation-select">
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
        <div className="hmr-footer">
          <button className="hmr-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="hmr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}