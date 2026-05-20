// PropertyOwnershipTransferRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from PropertyOwnershipTransferRecommendation.css)
   All classes prefixed with "potr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .potr-container {
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
  .potr-bold         { font-weight: bold; }
  .potr-underline    { text-decoration: underline; }
  .potr-red          { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .potr-red-asterisk { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .potr-in-cell      { font-size: 0.8rem; }
  .potr-ml-20        { margin-left: 20px; }

  /* ── Top Bar ── */
  .potr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .potr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .potr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .potr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .potr-header-text { display: flex; flex-direction: column; align-items: center; }
  .potr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .potr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .potr-address-text,
  .potr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .potr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .potr-meta-left p, .potr-meta-right p { margin: 5px 0; }
  .potr-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .potr-small-input { width: 120px; }

  /* ── Subject / Addressee ── */
  .potr-subject     { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
  .potr-addressee   { margin-bottom: 20px; font-size: 1.05rem; }
  .potr-addressee-row { margin-bottom: 8px; }
  .potr-line {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .potr-medium-input { width: 200px; }

  /* ── Body ── */
  .potr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .potr-inline-box {
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
  .potr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .potr-medium-select { width: 120px; }
  .potr-tiny-box  { width: 40px;  text-align: center; }
  .potr-small-box { width: 100px; }
  .potr-medium-box { width: 150px; }

  /* ── Tables ── */
  .potr-table-section { margin-bottom: 30px; }
  .potr-table-title {
    text-align: center;
    color: #2c5d8f;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  .potr-table-scroll { overflow-x: auto; }
  .potr-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .potr-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
  }
  .potr-table td { border: 1px solid #555; padding: 5px; }
  .potr-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    font-family: inherit;
    color: #e74c3c;
  }
  .potr-half-input { width: 40%; }
  .potr-tiny-input { width: 20%; }
  .potr-cell-label { font-size: 0.9rem; margin: 0 5px; }
  .potr-action-cell { text-align: center; }
  .potr-add-btn {
    background-color: #1a56db;
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    margin: 1px;
  }
  .potr-add-btn:hover { background-color: #1e429f; }
  .potr-rem-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    margin: 1px;
  }
  .potr-rem-btn:hover { background-color: #b02a37; }

  /* ── Signature ── */
  .potr-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .potr-signature-block { width: 220px; text-align: center; position: relative; }
  .potr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .potr-sig-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .potr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .potr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .potr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .potr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .potr-container .detail-group { display: flex; flex-direction: column; }
  .potr-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .potr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .potr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .potr-footer { text-align: center; margin-top: 40px; }
  .potr-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .potr-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .potr-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .potr-copyright {
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
    .potr-container, .potr-container * { visibility: visible; }
    .potr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .potr-top-bar, .potr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factories
───────────────────────────────────────────────────────────────────────────── */
const emptyHeir = () => ({
  name: "", relation: "", father_or_husband: "", citizenship_no: "", remarks: "",
});
const emptyPropertyRow = () => ({
  local_body: "", ward_no: "", area: "", plot_no: "", remarks: "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State  (FIX: original used `initial` but called it `initialState`)
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:              "२०८२/८३",
  chalani_no:             "",
  date_nep:               new Date().toISOString().slice(0, 10),
  addressee_place:        "",
  previous_type:          "",
  previous_ward_no:       "",
  current_local:          MUNICIPALITY.name,
  current_municipality:   MUNICIPALITY.name,
  current_ward_no:        "1",
  deceased_indicator:     "",
  applicant_prefix:       "श्री",
  applicant_name:         "",
  requested_by:           "",
  signature_name:         "",
  signature_designation:  "",
  // ApplicantDetailsNp fields
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_phone:        "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function PropertyOwnershipTransferRecommendation() {
  // FIX: useWardForm was called without being imported; `initialState` was
  //      named `initial` in original — renamed for consistency
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // FIX: other_heirs / property_details were in form state but
  //      updateArray/addRow/removeRow were never defined.
  // Lifted to separate state with dedicated handlers (same pattern as
  // ThreeGenerationCertificate, HouseMaintainRecommendation, etc.)
  const [otherHeirs,       setOtherHeirs]       = useState([emptyHeir()]);
  const [propertyDetails,  setPropertyDetails]  = useState([emptyPropertyRow()]);

  /* ── Generic array helpers ── */
  const updateHeir    = (idx, key, val) =>
    setOtherHeirs((p)      => p.map((r, i) => (i === idx ? { ...r, [key]: val } : r)));
  const addHeir       = () => setOtherHeirs((p)      => [...p, emptyHeir()]);
  const removeHeir    = (idx) => setOtherHeirs((p)   => p.filter((_, i) => i !== idx));

  const updateProp    = (idx, key, val) =>
    setPropertyDetails((p) => p.map((r, i) => (i === idx ? { ...r, [key]: val } : r)));
  const addProp       = () => setPropertyDetails((p) => [...p, emptyPropertyRow()]);
  const removeProp    = (idx) => setPropertyDetails((p) => p.filter((_, i) => i !== idx));

  /* ── Build payload ── */
  const buildPayload = () => ({
    ...form,
    other_heirs:      JSON.stringify(otherHeirs),
    property_details: JSON.stringify(propertyDetails),
  });

  const resetAll = () => {
    setForm(initialState);
    setOtherHeirs([emptyHeir()]);
    setPropertyDetails([emptyPropertyRow()]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/property-ownership-transfer-recommendation", buildPayload());
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
      const res = await axios.post("/api/forms/property-ownership-transfer-recommendation", buildPayload());
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
    <div className="potr-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="potr-top-bar">
          घर जग्गा नामसारी सिफारिस ।
          <span className="potr-breadcrumb">
            घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="potr-header">
          <div className="potr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="potr-header-text">
            <h1 className="potr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="potr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="potr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="potr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="potr-meta-row">
          <div className="potr-meta-left">
            <p>पत्र संख्या : <span className="potr-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="potr-dotted potr-small-input" />
            </p>
          </div>
          <div className="potr-meta-right">
            <p>मिति : <span className="potr-bold">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="potr-subject">
          <p>विषय: <span className="potr-underline">घर जग्गा नामसारी सिफारिस।</span></p>
        </div>

        {/* ── Addressee ── */}
        <div className="potr-addressee">
          <div className="potr-addressee-row">
            <span>श्री मालपोत कार्यालय</span>
          </div>
          <div className="potr-addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={handleChange} className="potr-line potr-medium-input" />
            <span className="potr-red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="potr-body">
          <p>
            उपरोक्त विषयमा जिल्ला <span className="potr-bold">काठमाडौँ</span>{" "}
            <span className="potr-bold potr-ml-20">{MUNICIPALITY.name}</span>{" "}
            वडा नं. <span className="potr-bold">{user?.ward || form.current_ward_no}</span>{" "}
            (साविक
            <select name="previous_type" value={form.previous_type} onChange={handleChange} className="potr-inline-select potr-medium-select">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            , वडा नं.
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="potr-inline-box potr-tiny-box" />
            ) अन्तर्गत निवेदक
            <select name="applicant_prefix" value={form.applicant_prefix} onChange={handleChange} className="potr-inline-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="potr-inline-box potr-medium-box" required />
            {" "}निवेदन अनुसार निजको{" "}
            <input name="deceased_indicator" value={form.deceased_indicator} onChange={handleChange} className="potr-inline-box potr-medium-box" />
            {" "}मा मृत्यु भएको हुनाले... Requested by:
            <input name="requested_by" value={form.requested_by} onChange={handleChange} className="potr-inline-box potr-medium-box" />
          </p>
        </div>

        {/* ── Other Heirs Table ── */}
        <div className="potr-table-section">
          <h4 className="potr-table-title">अन्य हकदारको विवरण</h4>
          <div className="potr-table-scroll">
            <table className="potr-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>हकदारहरुको नाम</th>
                  <th>नाता</th>
                  <th>बाबु पतिको नाम</th>
                  <th>नागरिकता नं.</th>
                  <th>कैफियत</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {otherHeirs.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input value={r.name}              onChange={(e) => updateHeir(i, "name",              e.target.value)} className="potr-table-input" required /></td>
                    <td><input value={r.relation}          onChange={(e) => updateHeir(i, "relation",          e.target.value)} className="potr-table-input" required /></td>
                    <td><input value={r.father_or_husband} onChange={(e) => updateHeir(i, "father_or_husband", e.target.value)} className="potr-table-input" /></td>
                    <td><input value={r.citizenship_no}    onChange={(e) => updateHeir(i, "citizenship_no",    e.target.value)} className="potr-table-input" /></td>
                    <td><input value={r.remarks}           onChange={(e) => updateHeir(i, "remarks",           e.target.value)} className="potr-table-input" /></td>
                    <td className="potr-action-cell">
                      <button type="button" className="potr-add-btn" onClick={addHeir}>+</button>
                      {otherHeirs.length > 1 && (
                        <button type="button" className="potr-rem-btn" onClick={() => removeHeir(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Property Details Table ── */}
        <div className="potr-table-section">
          <h4 className="potr-table-title">नामसारी गर्ने घर/जग्गाको विवरण</h4>
          <div className="potr-table-scroll">
            <table className="potr-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>स्थानीय तह (वडा)</th>
                  <th>क्षेत्रफल</th>
                  <th>कित्ता नं.</th>
                  <th>कैफियत</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {propertyDetails.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input value={r.local_body} onChange={(e) => updateProp(i, "local_body", e.target.value)} className="potr-table-input potr-half-input" />
                      <span className="potr-cell-label">वडा नं.</span>
                      <input value={r.ward_no}    onChange={(e) => updateProp(i, "ward_no",    e.target.value)} className="potr-table-input potr-tiny-input" />
                    </td>
                    <td><input value={r.area}    onChange={(e) => updateProp(i, "area",    e.target.value)} className="potr-table-input" /></td>
                    <td><input value={r.plot_no} onChange={(e) => updateProp(i, "plot_no", e.target.value)} className="potr-table-input" /></td>
                    <td><input value={r.remarks} onChange={(e) => updateProp(i, "remarks", e.target.value)} className="potr-table-input" /></td>
                    <td className="potr-action-cell">
                      <button type="button" className="potr-add-btn" onClick={addProp}>+</button>
                      {propertyDetails.length > 1 && (
                        <button type="button" className="potr-rem-btn" onClick={() => removeProp(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="potr-signature-section">
          <div className="potr-signature-block">
            <div className="potr-signature-line"></div>
            <input name="signature_name" value={form.signature_name} onChange={handleChange} className="potr-sig-input" required />
            <select name="signature_designation" value={form.signature_designation} onChange={handleChange} className="potr-designation-select">
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
        <div className="potr-footer">
          <button className="potr-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="potr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}