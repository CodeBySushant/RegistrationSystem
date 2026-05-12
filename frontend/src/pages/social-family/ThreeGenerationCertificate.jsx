import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from ThreeGenerationCertificate.css)
   All classes prefixed with "tgc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .tgc-container {
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
  .tgc-bold       { font-weight: bold; }
  .tgc-underline  { text-decoration: underline; }
  .tgc-red        { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .tgc-red-mark   { color: red; position: absolute; top: 0; left: 0; }
  .tgc-red-asterisk { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .tgc-in-cell    { font-size: 0.8rem; }
  .tgc-ml-20      { margin-left: 20px; }

  /* ── Top Bar ── */
  .tgc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .tgc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .tgc-header { text-align: center; margin-bottom: 20px; position: relative; }
  .tgc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .tgc-header-text { display: flex; flex-direction: column; align-items: center; }
  .tgc-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .tgc-ward-title   { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .tgc-address-text,
  .tgc-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .tgc-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .tgc-meta-left p, .tgc-meta-right p { margin: 5px 0; }
  .tgc-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .tgc-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .tgc-small-input { width: 120px; }
  .tgc-tiny-input  { width: 80px; }
  .tgc-full-width  { width: 100%; }

  /* ── Body ── */
  .tgc-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .tgc-inline-box {
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
  .tgc-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .tgc-tiny-box   { width: 40px;  text-align: center; }
  .tgc-medium-box { width: 200px; }

  /* ── Tables ── */
  .tgc-table-section  { margin-top: 20px; margin-bottom: 20px; }
  .tgc-table-title    { text-align: center; color: #555; font-weight: bold; margin-bottom: 10px; }
  .tgc-table-scroll   { overflow-x: auto; }
  .tgc-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .tgc-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
  }
  .tgc-table td { border: 1px solid #555; padding: 5px; }
  .tgc-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    font-family: inherit;
    color: #e74c3c;
  }
  .tgc-action-cell { text-align: center; }
  .tgc-add-btn {
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
  .tgc-add-btn:hover { background-color: #1e429f; }

  /* ── Signature ── */
  .tgc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .tgc-signature-block  { width: 220px; text-align: center; position: relative; }
  .tgc-signature-line   { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .tgc-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .tgc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .tgc-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .tgc-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .tgc-container .detail-group { display: flex; flex-direction: column; }
  .tgc-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .tgc-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .tgc-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .tgc-footer { text-align: center; margin-top: 40px; }
  .tgc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .tgc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .tgc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .tgc-copyright {
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
    .tgc-container, .tgc-container * { visibility: visible; }
    .tgc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .tgc-top-bar, .tgc-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factories
───────────────────────────────────────────────────────────────────────────── */
const emptyLandRow = () => ({ plot_no: "", seat_no: "", area: "" });
const emptyGenRow  = () => ({
  name: "", relation: "", citizenship_no: "", issue_date: "", district: "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialFormState = {
  reference_no:          "२०८२/८३",
  chalani_no:            "",
  date_bs:               "२०८२-०८-०६",
  previous_admin_type:   "",
  previous_ward_no:      "",
  resident_prefix:       "श्री",
  resident_name:         "",
  signatory_name:        "",
  signatory_designation: "",
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
const ThreeGenerationCertificate = () => {
  const [form, setForm]             = useState(initialFormState);
  const [lands, setLands]           = useState([emptyLandRow()]);
  const [generations, setGenerations] = useState([emptyGenRow()]);
  const [loading, setLoading]       = useState(false);
  const { user } = useAuth();

  /* ── Generic field updater for flat form fields ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Land table handlers ── */
  const onLandChange = (idx, key, value) =>
    setLands((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  const addLand    = () => setLands((prev) => [...prev, emptyLandRow()]);
  const removeLand = (idx) => setLands((prev) => prev.filter((_, i) => i !== idx));

  /* ── Generation table handlers ── */
  const onGenChange = (idx, key, value) =>
    setGenerations((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  const addGen    = () => setGenerations((prev) => [...prev, emptyGenRow()]);
  const removeGen = (idx) => setGenerations((prev) => prev.filter((_, i) => i !== idx));

  /* ── Build full payload ── */
  const buildPayload = () => ({ ...form, lands, generations });

  /* ── Reset all state ── */
  const resetAll = () => {
    setForm(initialFormState);
    setLands([emptyLandRow()]);
    setGenerations([emptyGenRow()]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/three-generation-certificate", buildPayload());
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
      const res = await axios.post("/api/forms/three-generation-certificate", buildPayload());
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
    <>
      <style>{STYLES}</style>

      <form className="tgc-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="tgc-top-bar">
          तीन पुस्ते प्रमाणित ।
          <span className="tgc-breadcrumb">
            सामाजिक / पारिवारिक &gt; तीन पुस्ते प्रमाणित
          </span>
        </div>

        {/* ── Header ── */}
        <div className="tgc-header">
          <div className="tgc-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="tgc-header-text">
            <h1 className="tgc-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="tgc-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="tgc-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="tgc-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="tgc-meta-row">
          <div className="tgc-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="tgc-bold">
                <input
                  name="reference_no"
                  value={form.reference_no}
                  onChange={handleChange}
                  className="tgc-line-input tgc-tiny-input"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="tgc-dotted-input tgc-small-input"
              />
            </p>
          </div>
          <div className="tgc-meta-right">
            <p>
              मिति :{" "}
              <input
                name="date_bs"
                value={form.date_bs}
                onChange={handleChange}
                className="tgc-line-input tgc-tiny-input"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="tgc-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ{" "}
            <span className="tgc-bold tgc-ml-20">{MUNICIPALITY.name}</span> वडा
            नं. <span className="tgc-bold">{user?.ward || "१"}</span> (साविक
            <input
              name="previous_admin_type"
              value={form.previous_admin_type}
              onChange={handleChange}
              className="tgc-inline-box tgc-medium-box"
            />
            वडा नं.{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="tgc-inline-box tgc-tiny-box"
              required
            />
            ) निवासी
            <select
              name="resident_prefix"
              value={form.resident_prefix}
              onChange={handleChange}
              className="tgc-inline-select"
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input
              name="resident_name"
              value={form.resident_name}
              onChange={handleChange}
              className="tgc-inline-box tgc-medium-box"
              required
            />{" "}
            को तीन पुस्ते तपसिलमा उल्लेख भए अनुसार रहेको व्यहोरा प्रमाणित साथ
            अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* ── Land table ── */}
        <div className="tgc-table-section">
          <h4 className="tgc-table-title">जग्गाको विवरण</h4>
          <div className="tgc-table-scroll">
            <table className="tgc-table">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>क्र.स.</th>
                  <th style={{ width: "20%" }}>कित्ता नं.</th>
                  <th style={{ width: "30%" }}>सिट नं.</th>
                  <th style={{ width: "35%" }}>क्षेत्रफल</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {lands.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.plot_no}
                        onChange={(e) => onLandChange(i, "plot_no", e.target.value)}
                        className="tgc-table-input"
                        required
                      />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={r.seat_no}
                        onChange={(e) => onLandChange(i, "seat_no", e.target.value)}
                        className="tgc-table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.area}
                        onChange={(e) => onLandChange(i, "area", e.target.value)}
                        className="tgc-table-input"
                        required
                      />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td className="tgc-action-cell">
                      <button type="button" className="tgc-add-btn" onClick={addLand}>+</button>
                      {lands.length > 1 && (
                        <button type="button" className="tgc-add-btn" onClick={() => removeLand(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Generations table ── */}
        <div className="tgc-table-section">
          <h4 className="tgc-table-title">तीन पुस्ते विवरण</h4>
          <div className="tgc-table-scroll">
            <table className="tgc-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.स.</th>
                  <th style={{ width: "20%" }}>नाम</th>
                  <th style={{ width: "15%" }}>नाता</th>
                  <th style={{ width: "20%" }}>नागरिकता नं.</th>
                  <th style={{ width: "20%" }}>जारी मिति</th>
                  <th style={{ width: "15%" }}>जिल्ला</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {generations.map((g, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input value={g.name} onChange={(e) => onGenChange(i, "name", e.target.value)} className="tgc-table-input" required />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td>
                      <input value={g.relation} onChange={(e) => onGenChange(i, "relation", e.target.value)} className="tgc-table-input" required />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td>
                      <input value={g.citizenship_no} onChange={(e) => onGenChange(i, "citizenship_no", e.target.value)} className="tgc-table-input" required />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td>
                      <input value={g.issue_date} onChange={(e) => onGenChange(i, "issue_date", e.target.value)} className="tgc-table-input" required />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td>
                      <input value={g.district} onChange={(e) => onGenChange(i, "district", e.target.value)} className="tgc-table-input" required />
                      <span className="tgc-red-asterisk tgc-in-cell">*</span>
                    </td>
                    <td className="tgc-action-cell">
                      <button type="button" className="tgc-add-btn" onClick={addGen}>+</button>
                      {generations.length > 1 && (
                        <button type="button" className="tgc-add-btn" onClick={() => removeGen(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="tgc-signature-section">
          <div className="tgc-signature-block">
            <div className="tgc-signature-line"></div>
            <span className="tgc-red-mark">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="tgc-line-input tgc-full-width"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="tgc-designation-select"
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
        <div className="tgc-footer">
          <button
            className="tgc-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="tgc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default ThreeGenerationCertificate;