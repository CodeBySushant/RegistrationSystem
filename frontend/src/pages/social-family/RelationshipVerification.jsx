// RelationshipVerification.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from RelationshipVerification.css)
   All classes prefixed with "rv-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rv-container {
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
  .rv-bold      { font-weight: bold; }
  .rv-underline { text-decoration: underline; }
  .rv-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .rv-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .rv-center    { text-align: center; }

  /* ── Top Bar ── */
  .rv-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .rv-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .rv-header { text-align: center; margin-bottom: 20px; position: relative; }
  .rv-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .rv-header-text { display: flex; flex-direction: column; align-items: center; }
  .rv-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .rv-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .rv-address-text,
  .rv-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .rv-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .rv-meta-left p, .rv-meta-right p { margin: 5px 0; }

  .rv-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .rv-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .rv-w-tiny   { width: 80px; }
  .rv-w-small  { width: 120px; }
  .rv-w-medium { width: 200px; }
  .rv-w-full   { width: 100%; }

  /* ── Addressee ── */
  .rv-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .rv-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

  /* ── Subject ── */
  .rv-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .rv-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .rv-inline-input {
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
  .rv-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .rv-w-tiny-box   { width: 40px;  text-align: center; }
  .rv-w-medium-box { width: 180px; }

  /* ── Table ── */
  .rv-table-section    { margin-top: 20px; margin-bottom: 40px; }
  .rv-table-responsive { overflow-x: auto; }
  .rv-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .rv-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
  }
  .rv-table td    { border: 1px solid #555; padding: 5px; }
  .rv-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    color: #e74c3c;
    font-family: inherit;
  }
  .rv-action-cell { text-align: center; }
  .rv-add-btn {
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
  .rv-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .rv-signature-block   { width: 220px; text-align: center; position: relative; }
  .rv-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .rv-sig-name-input    { width: 100%; margin-bottom: 5px; }
  .rv-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .rv-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .rv-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .rv-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .rv-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .rv-footer { text-align: center; margin-top: 40px; }
  .rv-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .rv-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .rv-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .rv-copyright {
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
    .rv-container,
    .rv-container * { visibility: visible; }
    .rv-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .rv-top-bar,
    .rv-footer  { display: none !important; }
    .rv-add-btn { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .rv-table th {
      background-color: #e0e0e0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factory
───────────────────────────────────────────────────────────────────────────── */
const emptyRelationRow = () => ({ name: "", relation: "", id_no: "", alive: true });

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: was used but never defined — caused immediate crash on load.
   municipality_name / ward_title removed; read from MUNICIPALITY config instead.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  reference_no: "",
  chalani_no: "",
  date_bs: "२०८२-०८-०६",
  addressee_line1: "",
  addressee_line2: "",
  ward_no: MUNICIPALITY?.wardNumber || "१",
  applicant_prefix: "श्री",
  applicant_name: "",
  subject_prefix: "श्री",
  subject_name: "",
  subject_role: "छोरा",
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
const RelationshipVerification = () => {
  const [form, setForm]     = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Generic field setter (BUG FIX: was called but never defined) ── */
  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ── handleChange for ApplicantDetailsNp ── */
  const handleChange = (e) => setField(e.target.name, e.target.value);

  /* ── Dynamic relations table state (BUG FIX: was referenced but never defined) ── */
  const [relations, setRelations] = useState([emptyRelationRow()]);

  const onRelationChange = (idx, key, value) =>
    setRelations((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  const addRelation    = () => setRelations((r) => [...r, emptyRelationRow()]);
  const removeRelation = (idx) =>
    setRelations((r) => r.filter((_, i) => i !== idx));

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, relations };
      const res = await axios.post("/api/forms/relationship-verification_form", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
        setRelations([emptyRelationRow()]);
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
      const payload = { ...form, relations };
      const res = await axios.post("/api/forms/relationship-verification_form", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
        setRelations([emptyRelationRow()]);
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

      <form className="rv-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="rv-top-bar">
          नाता प्रमाणित ।
          <span className="rv-breadcrumb">
            सामाजिक / पारिवारिक &gt; नाता प्रमाणित
          </span>
        </div>

        {/* ── Header ──
            BUG FIX: was form.municipality_name / form.ward_title
            (missing from initialState). Now reads from MUNICIPALITY config. */}
        <div className="rv-header">
          <div className="rv-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="rv-header-text">
            <h1 className="rv-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="rv-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`}
            </h2>
            <p className="rv-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
            <p className="rv-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="rv-meta-row">
          <div className="rv-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="rv-bold">
                <input
                  value={form.reference_no}
                  onChange={(e) => setField("reference_no", e.target.value)}
                  className="rv-line-input rv-w-tiny"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                value={form.chalani_no}
                onChange={(e) => setField("chalani_no", e.target.value)}
                className="rv-dotted-input rv-w-small"
              />
            </p>
          </div>
          <div className="rv-meta-right">
            <p>
              मिति :{" "}
              <input
                value={form.date_bs}
                onChange={(e) => setField("date_bs", e.target.value)}
                className="rv-line-input rv-w-tiny"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="rv-addressee">
          <div className="rv-addressee-row">
            <span>श्री</span>
            <input
              value={form.addressee_line1}
              onChange={(e) => setField("addressee_line1", e.target.value)}
              className="rv-line-input rv-w-medium"
              required
            />
            <span className="rv-red">*</span>
          </div>
          <div className="rv-addressee-row">
            <input
              value={form.addressee_line2}
              onChange={(e) => setField("addressee_line2", e.target.value)}
              className="rv-line-input rv-w-medium"
              required
            />
            <span className="rv-red">*</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="rv-subject">
          <p>
            विषय:{" "}
            <span className="rv-underline">नाता प्रमाणित प्रमाणपत्र ।</span>
          </p>
        </div>

        {/* ── Body ── */}
        <div className="rv-body">
          <p>
            देहायका व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध रहेको सो नाता सम्बन्ध
            प्रमाणित गरी पाउँ भनि &nbsp;
            <span className="rv-bold">{MUNICIPALITY.name}</span>{" "}
            <input
              value={form.ward_no}
              onChange={(e) => setField("ward_no", e.target.value)}
              className="rv-inline-input rv-w-tiny-box"
              required
            />
            नं. वडा कार्यालयमा मिति{" "}
            <input
              value={form.date_bs}
              onChange={(e) => setField("date_bs", e.target.value)}
              className="rv-inline-input rv-w-medium-box"
            />
            मा{" "}
            <select
              value={form.applicant_prefix}
              onChange={(e) => setField("applicant_prefix", e.target.value)}
              className="rv-inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              value={form.applicant_name}
              onChange={(e) => setField("applicant_name", e.target.value)}
              className="rv-inline-input rv-w-medium-box"
              required
            />{" "}
            <span className="rv-red">*</span> का नाति
            <select
              value={form.subject_prefix}
              onChange={(e) => setField("subject_prefix", e.target.value)}
              className="rv-inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
            </select>
            <input
              value={form.subject_name}
              onChange={(e) => setField("subject_name", e.target.value)}
              className="rv-inline-input rv-w-medium-box"
              required
            />{" "}
            <span className="rv-red">*</span> को
            <select
              value={form.subject_role}
              onChange={(e) => setField("subject_role", e.target.value)}
              className="rv-inline-select"
            >
              <option>छोरा</option>
              <option>छोरी</option>
            </select>
            ले दिनुभएको दरखास्त बमोजिम यस कार्यालयबाट आवश्यक जाँचबुझ गरी बुझ्दा
            तपाईको देहाय बमोजिमको व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध कायम
            रहेको देखिएकोले स्थानीय सरकार संचालन ऐन २०७४ को दफा १२ उपदफा २ को खण्ड
            (ङ) १ बमोजिम नाता प्रमाणित गरी यो प्रमाण पत्र प्रदान गरीएको छ ।
          </p>
        </div>

        {/* ── Relations table ── */}
        <div className="rv-table-section">
          <div className="rv-table-responsive">
            <table className="rv-table">
              <thead>
                <tr>
                  <th style={{ width: "5%"  }}>क्र.स.</th>
                  <th style={{ width: "35%" }}>नाता सम्बन्ध कायम गरेको व्यक्तिको नाम</th>
                  <th style={{ width: "20%" }}>नाता</th>
                  <th style={{ width: "30%" }}>नागरिकता नं. / जन्म दर्ता नं.</th>
                  <th style={{ width: "5%"  }}>जीवित/मृत्यु</th>
                  <th style={{ width: "5%"  }}></th>
                </tr>
              </thead>
              <tbody>
                {relations.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.name}
                        onChange={(e) => onRelationChange(i, "name", e.target.value)}
                        className="rv-table-input"
                        required
                      />
                    </td>
                    <td>
                      <input
                        value={r.relation}
                        onChange={(e) => onRelationChange(i, "relation", e.target.value)}
                        className="rv-table-input"
                        required
                      />
                    </td>
                    <td>
                      <input
                        value={r.id_no}
                        onChange={(e) => onRelationChange(i, "id_no", e.target.value)}
                        className="rv-table-input"
                        required
                      />
                    </td>
                    <td className="rv-center">
                      <input
                        type="checkbox"
                        checked={!!r.alive}
                        onChange={(e) => onRelationChange(i, "alive", e.target.checked)}
                      />
                    </td>
                    <td className="rv-action-cell">
                      <button type="button" className="rv-add-btn" onClick={addRelation}>+</button>
                      {relations.length > 1 && (
                        <button type="button" className="rv-add-btn" onClick={() => removeRelation(i)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="rv-signature-section">
          <div className="rv-signature-block">
            <div className="rv-signature-line"></div>
            <span className="rv-red-mark">*</span>
            <input
              value={form.signatory_name}
              onChange={(e) => setField("signatory_name", e.target.value)}
              className="rv-line-input rv-w-full rv-sig-name-input"
              required
            />
            <select
              value={form.signatory_designation}
              onChange={(e) => setField("signatory_designation", e.target.value)}
              className="rv-designation-select"
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
        <div className="rv-footer">
          <button
            className="rv-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="rv-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default RelationshipVerification;