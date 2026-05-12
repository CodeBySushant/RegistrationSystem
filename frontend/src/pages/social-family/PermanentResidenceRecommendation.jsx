// PermanentResidenceRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from PermanentResidenceRecommendation.css)
   All classes prefixed with "prr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .prr-container {
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
  .prr-bold      { font-weight: bold; }
  .prr-underline { text-decoration: underline; }
  .prr-red       { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
  .prr-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .prr-red-star  { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .prr-in-cell   { font-size: 0.8rem; }

  /* ── Top Bar ── */
  .prr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .prr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .prr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .prr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .prr-header-text { display: flex; flex-direction: column; align-items: center; }
  .prr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .prr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .prr-address-text,
  .prr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .prr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .prr-meta-left p, .prr-meta-right p { margin: 5px 0; }

  .prr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .prr-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .prr-w-tiny   { width: 80px; }
  .prr-w-small  { width: 120px; }
  .prr-w-medium { width: 180px; }
  .prr-w-full   { width: 100%; }
  .prr-flex-grow { flex-grow: 1; }

  /* ── Salutation / Subject ── */
  .prr-salutation { margin-bottom: 20px; font-size: 1.05rem; }
  .prr-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .prr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 20px;
  }
  .prr-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .prr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .prr-w-tiny-box   { width: 40px;  text-align: center; }
  .prr-w-medium-box { width: 180px; }

  /* ── Resident details ── */
  .prr-resident-section { margin-bottom: 30px; }
  .prr-resident-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 4px;
  }
  .prr-resident-row label { margin-right: 5px; margin-left: 10px; white-space: nowrap; }

  /* ── Table ── */
  .prr-table-section    { margin-top: 20px; margin-bottom: 40px; }
  .prr-table-responsive { overflow-x: auto; }
  .prr-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .prr-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
  }
  .prr-table td    { border: 1px solid #555; padding: 5px; }
  .prr-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    color: #e74c3c;
    font-family: inherit;
  }
  .prr-action-cell { text-align: center; }
  .prr-add-btn {
    background-color: blue;
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

  /* ── Signature ── */
  .prr-signature-section { display: flex; justify-content: flex-end; margin-top: 40px; margin-bottom: 30px; }
  .prr-signature-block   { width: 220px; text-align: center; position: relative; }
  .prr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .prr-sig-name-input    { width: 100%; margin-bottom: 5px; }
  .prr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant details overrides ── */
  .prr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .prr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .prr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .prr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .prr-footer { text-align: center; margin-top: 40px; }
  .prr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .prr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .prr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .prr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print (was completely missing in original CSS) ── */
  @media print {
    body * { visibility: hidden; }
    .prr-container,
    .prr-container * { visibility: visible; }
    .prr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .prr-top-bar,
    .prr-footer  { display: none !important; }
    .prr-add-btn { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .prr-table th {
      background-color: #e0e0e0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factory
───────────────────────────────────────────────────────────────────────────── */
const emptyLocationRow = () => ({ tol: "", road_name: "", house_no: "" });

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: was used but never defined.
   municipality_name / ward_title removed; read from MUNICIPALITY config.
   prev_unit_type and prev_ward_no added for the two uncontrolled body inputs.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  reference_no: "",
  chalani_no: "",
  date_bs: "२०८२-०८-०६",
  salutation_person_prefix: "श्री",
  applicant_name: "",
  previous_unit: "",
  current_municipality: MUNICIPALITY?.name || "",
  current_municipality_display: MUNICIPALITY?.city || "",
  ward_no: MUNICIPALITY?.wardNumber || "१",
  prev_unit_type: "",          // BUG FIX: was uncontrolled select in body
  prev_ward_no: "",            // BUG FIX: was uncontrolled input in body
  since_date_bs: "२०८२-०८-०६",
  npr_no: "",
  npr_issue_district: "",
  npr_issue_date_bs: "",
  signatory_name: "",
  signatory_designation: "",
  // ApplicantDetailsNp fields
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const PermanentResidenceRecommendation = () => {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Generic field setter (BUG FIX: was called everywhere but never defined) ── */
  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ── handleChange for ApplicantDetailsNp ── */
  const handleChange = (e) => setField(e.target.name, e.target.value);

  /* ── Dynamic locations table (BUG FIX: was referenced but never defined) ── */
  const [locations, setLocations] = useState([emptyLocationRow()]);

  const onLocationChange = (idx, key, value) =>
    setLocations((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  const addLocation    = () => setLocations((r) => [...r, emptyLocationRow()]);
  const removeLocation = (idx) =>
    setLocations((r) => r.filter((_, i) => i !== idx));

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, locations };
      const res = await axios.post("/api/forms/permanent-residence-recommendation", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
        setLocations([emptyLocationRow()]);
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

  /* ── Save + Print ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const payload = { ...form, locations };
      const res = await axios.post("/api/forms/permanent-residence-recommendation", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
        setLocations([emptyLocationRow()]);
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

      <form className="prr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="prr-top-bar">
          स्थायी बसोबास सिफारिस ।
          <span className="prr-breadcrumb">सामाजिक / पारिवारिक &gt; स्थायी बसोबास सिफारिस</span>
        </div>

        {/* ── Header ──
            BUG FIX: was form.municipality_name / form.ward_title (not in initialState).
            Now reads from MUNICIPALITY config. */}
        <div className="prr-header">
          <div className="prr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="prr-header-text">
            <h1 className="prr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="prr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`}
            </h2>
            <p className="prr-address-text">
              {form.current_municipality}{form.current_municipality_display ? `, ${form.current_municipality_display}` : ""}
            </p>
            <p className="prr-province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="prr-meta-row">
          <div className="prr-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="prr-bold">
                <input
                  value={form.reference_no}
                  onChange={(e) => setField("reference_no", e.target.value)}
                  className="prr-line-input prr-w-tiny"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                value={form.chalani_no}
                onChange={(e) => setField("chalani_no", e.target.value)}
                className="prr-dotted-input prr-w-small"
              />
            </p>
          </div>
          <div className="prr-meta-right">
            <p>
              मिति :{" "}
              <input
                value={form.date_bs}
                onChange={(e) => setField("date_bs", e.target.value)}
                className="prr-line-input prr-w-tiny"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Salutation ── */}
        <div className="prr-salutation">
          <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Subject ── */}
        <div className="prr-subject">
          <p>
            विषय:{" "}
            <span className="prr-underline">
              <input
                value={form.salutation_person_prefix}
                onChange={(e) => setField("salutation_person_prefix", e.target.value)}
                className="prr-line-input prr-w-tiny"
              />
              &nbsp;
              <input
                value={form.applicant_name}
                onChange={(e) => setField("applicant_name", e.target.value)}
                className="prr-line-input prr-w-medium"
              />
            </span>
          </p>
        </div>

        {/* ── Body ── */}
        <div className="prr-body">
          <p>
            उपरोक्त विषयमा निवेदक&nbsp;
            <input
              value={form.applicant_name}
              onChange={(e) => setField("applicant_name", e.target.value)}
              className="prr-inline-input prr-w-medium-box"
              required
            />{" "}
            <span className="prr-red">*</span> ले पेश गर्नुभएको निवेदनका आधारमा&nbsp;
            <input
              value={form.previous_unit}
              onChange={(e) => setField("previous_unit", e.target.value)}
              className="prr-inline-input prr-w-medium-box"
            />{" "}
            <span className="prr-red">*</span>
            <input
              value={form.current_municipality}
              onChange={(e) => setField("current_municipality", e.target.value)}
              className="prr-inline-input prr-w-medium-box"
            />
            <input
              value={form.current_municipality_display}
              onChange={(e) => setField("current_municipality_display", e.target.value)}
              className="prr-inline-input prr-w-medium-box"
            />
            वडा नं{" "}
            <input
              value={form.ward_no}
              onChange={(e) => setField("ward_no", e.target.value)}
              className="prr-inline-input prr-w-tiny-box"
              required
            />{" "}
            (साविक&nbsp;
            <input
              value={form.previous_unit}
              onChange={(e) => setField("previous_unit", e.target.value)}
              className="prr-inline-input prr-w-medium-box"
            />
            {/* BUG FIX: was uncontrolled <select> — now wired to prev_unit_type */}
            <select
              value={form.prev_unit_type}
              onChange={(e) => setField("prev_unit_type", e.target.value)}
              className="prr-inline-select"
            >
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            {/* BUG FIX: was uncontrolled <input> — now wired to prev_ward_no */}
            <input
              value={form.prev_ward_no}
              onChange={(e) => setField("prev_ward_no", e.target.value)}
              className="prr-inline-input prr-w-tiny-box"
            />
            ) अन्तर्गत तल उल्लेखित स्थानमा विगत मिति{" "}
            <input
              value={form.since_date_bs}
              onChange={(e) => setField("since_date_bs", e.target.value)}
              className="prr-inline-input prr-w-medium-box"
            />{" "}
            देखि स्थाई बसोबास गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध छ ।
          </p>
        </div>

        {/* ── Resident details ── */}
        <div className="prr-resident-section">
          <h4 className="prr-bold">बसोबास गर्नेको :-</h4>
          <div className="prr-resident-row">
            <label>ना.प्रा.प.नं. : <span className="prr-red">*</span></label>
            <input
              value={form.npr_no}
              onChange={(e) => setField("npr_no", e.target.value)}
              className="prr-line-input prr-flex-grow"
            />
            <label>/ जिल्ला : <span className="prr-red">*</span></label>
            <input
              value={form.npr_issue_district}
              onChange={(e) => setField("npr_issue_district", e.target.value)}
              className="prr-line-input prr-flex-grow"
            />
            <label>/ जारी मिति :</label>
            <input
              value={form.npr_issue_date_bs}
              onChange={(e) => setField("npr_issue_date_bs", e.target.value)}
              className="prr-line-input prr-flex-grow"
            />
          </div>
        </div>

        {/* ── Locations table ── */}
        <div className="prr-table-section">
          <div className="prr-table-responsive">
            <table className="prr-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.सं.</th>
                  <th style={{ width: "35%" }}>टोल</th>
                  <th style={{ width: "35%" }}>बाटोको नाम</th>
                  <th style={{ width: "20%" }}>घर नं</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={loc.tol}
                        onChange={(e) => onLocationChange(i, "tol", e.target.value)}
                        className="prr-table-input"
                        required
                      />{" "}
                      <span className="prr-red-star prr-in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={loc.road_name}
                        onChange={(e) => onLocationChange(i, "road_name", e.target.value)}
                        className="prr-table-input"
                        required
                      />{" "}
                      <span className="prr-red-star prr-in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={loc.house_no}
                        onChange={(e) => onLocationChange(i, "house_no", e.target.value)}
                        className="prr-table-input"
                      />
                    </td>
                    <td className="prr-action-cell">
                      <button type="button" className="prr-add-btn" onClick={addLocation}>+</button>
                      {locations.length > 1 && (
                        <button type="button" className="prr-add-btn" onClick={() => removeLocation(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="prr-signature-section">
          <div className="prr-signature-block">
            <div className="prr-signature-line"></div>
            <span className="prr-red-mark">*</span>
            <input
              value={form.signatory_name}
              onChange={(e) => setField("signatory_name", e.target.value)}
              className="prr-line-input prr-w-full prr-sig-name-input"
              required
            />
            <select
              value={form.signatory_designation}
              onChange={(e) => setField("signatory_designation", e.target.value)}
              className="prr-designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="prr-footer">
          <button
            className="prr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="prr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default PermanentResidenceRecommendation;