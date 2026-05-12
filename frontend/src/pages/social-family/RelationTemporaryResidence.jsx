// RelationTemporaryResidence.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from RelationTemporaryResidence.css)
   All classes prefixed with "rtr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rtr-container {
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
  .rtr-bold      { font-weight: bold; }
  .rtr-underline { text-decoration: underline; }
  .rtr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .rtr-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .rtr-red-star  { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .rtr-in-cell   { font-size: 0.8rem; }
  .rtr-bg-gray   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }
  .rtr-center    { text-align: center; }

  /* ── Top Bar ── */
  .rtr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .rtr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .rtr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .rtr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .rtr-header-text { display: flex; flex-direction: column; align-items: center; }
  .rtr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .rtr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .rtr-address-text,
  .rtr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .rtr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .rtr-meta-left p, .rtr-meta-right p { margin: 5px 0; }
  .rtr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .rtr-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .rtr-w-tiny   { width: 80px; }
  .rtr-w-small  { width: 120px; }
  .rtr-w-medium { width: 180px; }
  .rtr-w-full   { width: 100%; }

  /* ── Subject / Salutation ── */
  .rtr-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
  .rtr-salutation { margin-bottom: 20px; font-size: 1.05rem; }

  /* ── Body ── */
  .rtr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .rtr-inline-input {
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
  .rtr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .rtr-w-tiny-box   { width: 40px; text-align: center; }
  .rtr-w-medium-box { width: 180px; }

  /* ── Tables ── */
  .rtr-table-section    { margin-top: 20px; margin-bottom: 20px; }
  .rtr-table-title      { margin-bottom: 5px; color: #2c5d8f; }
  .rtr-table-responsive { overflow-x: auto; }
  .rtr-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .rtr-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
  }
  .rtr-table td     { border: 1px solid #555; padding: 5px; }
  .rtr-table-input  {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    color: #e74c3c;
    font-family: inherit;
  }
  .rtr-table-select {
    border: 1px solid #ccc;
    background: #fff;
    padding: 2px;
    width: 90%;
    font-size: 0.9rem;
    font-family: inherit;
  }
  .rtr-action-cell { text-align: center; }
  .rtr-add-btn {
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
  .rtr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .rtr-signature-block   { width: 220px; text-align: center; position: relative; }
  .rtr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .rtr-sig-name-input    { width: 100%; margin-bottom: 5px; }
  .rtr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .rtr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .rtr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .rtr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .rtr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .rtr-footer { text-align: center; margin-top: 40px; }
  .rtr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .rtr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .rtr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .rtr-copyright {
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
    .rtr-container,
    .rtr-container * { visibility: visible; }
    .rtr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .rtr-top-bar,
    .rtr-footer { display: none !important; }
    .rtr-add-btn { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .rtr-table th { background-color: #e0e0e0 !important; -webkit-print-color-adjust: exact; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factories
───────────────────────────────────────────────────────────────────────────── */
const emptyFamilyRow    = () => ({ name: "", relation: "आफै", remarks: "" });
const emptyLocationRow  = () => ({ tol: "", road_name: "", house_no: "" });

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: was used but never defined — caused immediate crash on load.
   municipality_name / ward_title removed (should come from MUNICIPALITY config,
   not be editable form fields).
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  reference_no: "",
  chalani_no: "",
  date_bs: "२०८२-०८-०६",
  permanent_district: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  permanent_prev_unit: "",
  permanent_prev_unit_type: "",
  permanent_ward_no: MUNICIPALITY?.wardNumber || "१",
  current_municipality: MUNICIPALITY?.name || "",
  current_ward_no: MUNICIPALITY?.wardNumber || "१",
  person_name: "",
  person_family_head: "",
  family_origin_district: "",
  family_origin_unit: "",
  family_origin_ward_no: "",
  residence_since_bs: "२०८२-०८-०६",
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
const RelationTemporaryResidence = () => {
  const [form, setForm]   = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Generic field setter ── */
  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ── handleChange for ApplicantDetailsNp ── */
  const handleChange = (e) => setField(e.target.name, e.target.value);

  /* ── Dynamic table state (BUG FIX: was referenced but never defined) ── */
  const [familyDetails, setFamilyDetails]         = useState([emptyFamilyRow()]);
  const [residenceLocations, setResidenceLocations] = useState([emptyLocationRow()]);

  const onFamilyChange = (idx, key, value) =>
    setFamilyDetails((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  const addFamilyRow    = () => setFamilyDetails((r) => [...r, emptyFamilyRow()]);
  const removeFamilyRow = (idx) =>
    setFamilyDetails((r) => r.filter((_, i) => i !== idx));

  const onLocationChange = (idx, key, value) =>
    setResidenceLocations((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  const addLocationRow    = () => setResidenceLocations((r) => [...r, emptyLocationRow()]);
  const removeLocationRow = (idx) =>
    setResidenceLocations((r) => r.filter((_, i) => i !== idx));

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        family_details:       familyDetails,
        residence_locations:  residenceLocations,
      };
      const res = await axios.post("/api/forms/relation-temporary-residence", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
        setFamilyDetails([emptyFamilyRow()]);
        setResidenceLocations([emptyLocationRow()]);
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
      const payload = {
        ...form,
        family_details:      familyDetails,
        residence_locations: residenceLocations,
      };
      const res = await axios.post("/api/forms/relation-temporary-residence", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
        setFamilyDetails([emptyFamilyRow()]);
        setResidenceLocations([emptyLocationRow()]);
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

      <form className="rtr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="rtr-top-bar">
          अस्थायी बसोबास सम्बन्धी सिफारिस ।
          <span className="rtr-breadcrumb">
            सामाजिक / पारिवारिक &gt; अस्थायी बसोबास सम्बन्धी सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="rtr-header">
          <div className="rtr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="rtr-header-text">
            {/* BUG FIX: was form.municipality_name / form.ward_title
                (not in initialState). Now reads from MUNICIPALITY config. */}
            <h1 className="rtr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="rtr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`}
            </h2>
            <p className="rtr-address-text">{MUNICIPALITY.officeLine || "नागार्जुन, काठमाडौँ"}</p>
            <p className="rtr-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="rtr-meta-row">
          <div className="rtr-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="rtr-bold">
                <input
                  value={form.reference_no}
                  onChange={(e) => setField("reference_no", e.target.value)}
                  className="rtr-line-input rtr-w-tiny"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                value={form.chalani_no}
                onChange={(e) => setField("chalani_no", e.target.value)}
                className="rtr-dotted-input rtr-w-small"
              />
            </p>
          </div>
          <div className="rtr-meta-right">
            <p>
              मिति :{" "}
              <input
                value={form.date_bs}
                onChange={(e) => setField("date_bs", e.target.value)}
                className="rtr-line-input rtr-w-tiny"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="rtr-subject">
          <p>
            विषय:{" "}
            <span className="rtr-underline">
              अस्थायी बसोबास प्रमाणित सम्बन्धमा ।
            </span>
          </p>
        </div>

        {/* ── Salutation ── */}
        <div className="rtr-salutation">
          <p>श्री जो जस संग सम्बन्ध राख्दछ । ,</p>
        </div>

        {/* ── Body ── */}
        <div className="rtr-body">
          <p>
            प्रस्तुत विषयमा जिल्ला{" "}
            <span className="rtr-bold">{form.permanent_district}</span> साविक
            <input
              value={form.permanent_prev_unit}
              onChange={(e) => setField("permanent_prev_unit", e.target.value)}
              className="rtr-inline-input rtr-w-medium-box"
            />
            <select
              value={form.permanent_prev_unit_type}
              onChange={(e) => setField("permanent_prev_unit_type", e.target.value)}
              className="rtr-inline-select"
            >
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं. <span className="rtr-bold">{form.permanent_ward_no}</span>{" "}
            स्थायी घर भई हाल{" "}
            <span className="rtr-bg-gray">{form.current_municipality}</span> वडा
            नं. <span className="rtr-bg-gray">{form.current_ward_no}</span> बस्ने
            <input
              value={form.person_name}
              onChange={(e) => setField("person_name", e.target.value)}
              className="rtr-inline-input rtr-w-medium-box"
              required
            />{" "}
            <span className="rtr-red">*</span> ले यस कार्यालयमा पेश गर्नुभएको
            निवेदनका आधारमा निज
            <input
              value={form.person_family_head}
              onChange={(e) => setField("person_family_head", e.target.value)}
              className="rtr-inline-input rtr-w-medium-box"
              required
            />{" "}
            <span className="rtr-red">*</span> आफ्नो परिवार सहित जिल्ला
            <input
              value={form.family_origin_district}
              onChange={(e) => setField("family_origin_district", e.target.value)}
              className="rtr-inline-input rtr-w-medium-box"
              required
            />{" "}
            <span className="rtr-red">*</span>
            <input
              value={form.family_origin_unit}
              onChange={(e) => setField("family_origin_unit", e.target.value)}
              className="rtr-inline-input rtr-w-medium-box"
              required
            />{" "}
            <span className="rtr-red">*</span> वडा नं.
            <input
              value={form.family_origin_ward_no}
              onChange={(e) => setField("family_origin_ward_no", e.target.value)}
              className="rtr-inline-input rtr-w-tiny-box"
              required
            />{" "}
            <span className="rtr-red">*</span> मा मिति
            <input
              value={form.residence_since_bs}
              onChange={(e) => setField("residence_since_bs", e.target.value)}
              className="rtr-inline-input rtr-w-medium-box"
            />{" "}
            साल देखि बमोजिमका परिवार सहित अस्थायी बसोबास गर्दै आएको व्यहोरा
            प्रमाणित गरिन्छ।
          </p>
        </div>

        {/* ── Table 1: Family details ── */}
        <div className="rtr-table-section">
          <h4 className="rtr-table-title rtr-center rtr-bold">तपसिल</h4>
          <div className="rtr-table-responsive">
            <table className="rtr-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.सं.</th>
                  <th style={{ width: "35%" }}>नामथर</th>
                  <th style={{ width: "20%" }}>नाता</th>
                  <th style={{ width: "35%" }}>कैफियत</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {familyDetails.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.name}
                        onChange={(e) => onFamilyChange(i, "name", e.target.value)}
                        className="rtr-table-input"
                        required
                      />{" "}
                      <span className="rtr-red-star rtr-in-cell">*</span>
                    </td>
                    <td>
                      <select
                        value={r.relation}
                        onChange={(e) => onFamilyChange(i, "relation", e.target.value)}
                        className="rtr-table-select"
                      >
                        <option>आफै</option>
                        <option>पति</option>
                        <option>पत्नी</option>
                        <option>छोरा</option>
                        <option>छोरी</option>
                      </select>
                    </td>
                    <td>
                      <input
                        value={r.remarks}
                        onChange={(e) => onFamilyChange(i, "remarks", e.target.value)}
                        className="rtr-table-input"
                      />
                    </td>
                    <td className="rtr-action-cell">
                      <button type="button" className="rtr-add-btn" onClick={addFamilyRow}>+</button>
                      {familyDetails.length > 1 && (
                        <button type="button" className="rtr-add-btn" onClick={() => removeFamilyRow(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Table 2: Residence locations ── */}
        <div className="rtr-table-section">
          <h4 className="rtr-table-title rtr-center rtr-bold">बसोबास स्थान</h4>
          <div className="rtr-table-responsive">
            <table className="rtr-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.सं.</th>
                  <th style={{ width: "35%" }}>टोल</th>
                  <th style={{ width: "40%" }}>बाटोको नाम</th>
                  <th style={{ width: "15%" }}>घर नं</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {residenceLocations.map((l, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={l.tol}
                        onChange={(e) => onLocationChange(i, "tol", e.target.value)}
                        className="rtr-table-input"
                        required
                      />{" "}
                      <span className="rtr-red-star rtr-in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={l.road_name}
                        onChange={(e) => onLocationChange(i, "road_name", e.target.value)}
                        className="rtr-table-input"
                        required
                      />{" "}
                      <span className="rtr-red-star rtr-in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={l.house_no}
                        onChange={(e) => onLocationChange(i, "house_no", e.target.value)}
                        className="rtr-table-input"
                      />
                    </td>
                    <td className="rtr-action-cell">
                      <button type="button" className="rtr-add-btn" onClick={addLocationRow}>+</button>
                      {residenceLocations.length > 1 && (
                        <button type="button" className="rtr-add-btn" onClick={() => removeLocationRow(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="rtr-signature-section">
          <div className="rtr-signature-block">
            <div className="rtr-signature-line"></div>
            <span className="rtr-red-mark">*</span>
            <input
              value={form.signatory_name}
              onChange={(e) => setField("signatory_name", e.target.value)}
              className="rtr-line-input rtr-w-full rtr-sig-name-input"
              required
            />
            <select
              value={form.signatory_designation}
              onChange={(e) => setField("signatory_designation", e.target.value)}
              className="rtr-designation-select"
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
        <div className="rtr-footer">
          <button
            className="rtr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="rtr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default RelationTemporaryResidence;