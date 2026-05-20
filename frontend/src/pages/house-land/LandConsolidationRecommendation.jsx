// LandConsolidationRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from LandConsolidationRecommendation.css)
   All classes prefixed with "lcr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .lcr-container {
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
  .lcr-bold         { font-weight: bold; }
  .lcr-underline    { text-decoration: underline; }
  .lcr-red          { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .lcr-red-mark     { color: red; position: absolute; top: 0; left: 0; }
  .lcr-red-asterisk { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .lcr-in-cell      { font-size: 0.8rem; }

  /* ── Top Bar ── */
  .lcr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .lcr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .lcr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .lcr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .lcr-header-text { display: flex; flex-direction: column; align-items: center; }
  .lcr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .lcr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .lcr-address-text,
  .lcr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .lcr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .lcr-meta-left p, .lcr-meta-right p { margin: 5px 0; }
  .lcr-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .lcr-small-input { width: 120px; }

  /* ── Subject ── */
  .lcr-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .lcr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .lcr-inline-box {
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
  .lcr-medium-box { width: 180px; }

  /* ── Table ── */
  .lcr-table-section { margin-top: 20px; margin-bottom: 40px; }
  .lcr-table-scroll  { overflow-x: auto; }
  .lcr-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .lcr-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
  }
  .lcr-table td { border: 1px solid #555; padding: 5px; }
  .lcr-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    font-family: inherit;
    color: #e74c3c;
  }
  .lcr-action-cell { text-align: center; }
  .lcr-add-btn {
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
  .lcr-add-btn:hover { background-color: #1e429f; }
  .lcr-add-row-btn {
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
  .lcr-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .lcr-signature-block  { width: 220px; text-align: center; position: relative; }
  .lcr-signature-line   { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .lcr-sig-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .lcr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .lcr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .lcr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .lcr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .lcr-container .detail-group { display: flex; flex-direction: column; }
  .lcr-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .lcr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .lcr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .lcr-footer { text-align: center; margin-top: 40px; }
  .lcr-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .lcr-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .lcr-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .lcr-copyright {
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
    .lcr-container, .lcr-container * { visibility: visible; }
    .lcr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .lcr-top-bar, .lcr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factory
───────────────────────────────────────────────────────────────────────────── */
const emptyRow = () => ({
  current_gbv:  "",
  previous_gbv: "",
  seat_no:      "",
  plot_no:      "",
  area:         "",
  remarks:      "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:                  "२०८२/८३",
  chalani_no:                 "",
  date_nep:                   new Date().toISOString().slice(0, 10),
  municipality_text:          MUNICIPALITY.name,
  ward_no:                    "1",
  applicant_relation_prefix:  "श्री",
  applicant_relation_name:    "",
  relation_type:              "छोरा",
  relation_name:              "",
  notes:                      "",
  signer_name:                "",
  signer_designation:         "",
  applicant_name:             "",
  applicant_address:          "",
  applicant_citizenship_no:   "",
  applicant_phone:            "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function LandConsolidationRecommendation() {
  // FIX: useWardForm was called without being imported
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // FIX: rows/setRow/addRow/removeRow were used in JSX but never defined
  const [rows, setRows] = useState([emptyRow()]);

  const setRow    = (idx, key, value) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  const addRow    = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (idx) => setRows((prev) => prev.filter((_, i) => i !== idx));

  const buildPayload = () => ({ ...form, rows });

  const resetAll = () => {
    setForm(initialState);
    setRows([emptyRow()]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/land-consolidation-recommendation", buildPayload());
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
      const res = await axios.post("/api/forms/land-consolidation-recommendation", buildPayload());
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
    <div className="lcr-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="lcr-top-bar">
          जग्गा एकिकृत सिफारिस ।
          <span className="lcr-breadcrumb">
            घर / जग्गा जमिन &gt; जग्गा एकिकृत सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="lcr-header">
          <div className="lcr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="lcr-header-text">
            <h1 className="lcr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="lcr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="lcr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="lcr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="lcr-meta-row">
          <div className="lcr-meta-left">
            <p>पत्र संख्या : <span className="lcr-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="lcr-dotted lcr-small-input" />
            </p>
          </div>
          <div className="lcr-meta-right">
            <p>मिति : <span className="lcr-bold">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="lcr-subject">
          <p>विषय: <span className="lcr-underline">सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* ── Body ── */}
        <div className="lcr-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ{" "}
            <input name="municipality_text" value={form.municipality_text} onChange={handleChange} className="lcr-inline-box lcr-medium-box" />
            {" "}वडा नं. {user?.ward || form.ward_no} बस्ने{" "}
            <input name="applicant_relation_name" value={form.applicant_relation_name} onChange={handleChange} className="lcr-inline-box lcr-medium-box" required />
            {" "}<span className="lcr-red">*</span>{" "}
            को नाति/नातिनी/आदि सम्बन्धी विवरण अनुसारका कित्ताहरूलाई एकिकृत गर्न सिफारिस माग गरिएकोले
            कार्यालयको नियमानुसार ती कित्ताहरू एकिकृत गरिदिन सिफारिस गरिन्छ।
          </p>
        </div>

        {/* ── Land Rows Table ── */}
        <div className="lcr-table-section">
          <div className="lcr-table-scroll">
            <table className="lcr-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.स.</th>
                  <th style={{ width: "20%" }}>हालको गा. वि. स.</th>
                  <th style={{ width: "20%" }}>साविक गा. वि. स.</th>
                  <th style={{ width: "10%" }}>सिट नं.</th>
                  <th style={{ width: "15%" }}>कि. नं.</th>
                  <th style={{ width: "15%" }}>क्षेत्रफल</th>
                  <th style={{ width: "15%" }}>कैफियत</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input value={r.current_gbv}  onChange={(e) => setRow(i, "current_gbv",  e.target.value)} className="lcr-table-input" required />
                      <span className="lcr-red-asterisk lcr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={r.previous_gbv} onChange={(e) => setRow(i, "previous_gbv", e.target.value)} className="lcr-table-input" required />
                      <span className="lcr-red-asterisk lcr-in-cell">*</span>
                    </td>
                    <td>
                      <input value={r.seat_no} onChange={(e) => setRow(i, "seat_no", e.target.value)} className="lcr-table-input" />
                    </td>
                    <td>
                      <input value={r.plot_no} onChange={(e) => setRow(i, "plot_no", e.target.value)} className="lcr-table-input" />
                    </td>
                    <td>
                      <input value={r.area}    onChange={(e) => setRow(i, "area",    e.target.value)} className="lcr-table-input" />
                    </td>
                    <td>
                      <input value={r.remarks} onChange={(e) => setRow(i, "remarks", e.target.value)} className="lcr-table-input" />
                    </td>
                    <td className="lcr-action-cell">
                      <button type="button" className="lcr-add-btn" onClick={addRow}>+</button>
                      {rows.length > 1 && (
                        <button type="button" className="lcr-add-btn" onClick={() => removeRow(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addRow} className="lcr-add-row-btn">
              कतार थप्नुहोस्
            </button>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="lcr-signature-section">
          <div className="lcr-signature-block">
            <div className="lcr-signature-line"></div>
            <span className="lcr-red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="lcr-sig-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="lcr-designation-select">
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
        <div className="lcr-footer">
          <button className="lcr-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="lcr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}