// src/pages/application/BusinessDeregistrationForm.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BusinessDeregistrationForm.css)
   All classes prefixed with "bdf-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .bdf-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 25px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: "Arial", sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 1.6;
  }

  /* ── Title Header ── */
  .bdf-title-header { text-align: center; margin-bottom: 20px; }
  .bdf-title-header h3 { margin: 0; font-size: 18px; }
  .bdf-title-header h4 { margin: 5px 0; font-size: 16px; font-weight: bold; }

  /* ── Top Row ── */
  .bdf-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 15px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 15px;
    gap: 20px;
  }
  .bdf-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .bdf-form-group label { font-weight: bold; margin-right: 8px; }

  .bdf-header-to-group { display: flex; flex-direction: column; gap: 4px; }
  .bdf-form-group-inline {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .bdf-form-group-inline label {
    font-weight: bold;
    white-space: nowrap;
    margin-right: 4px;
  }

  /* ── Header Meta ── */
  .bdf-header-meta { display: flex; flex-direction: column; align-items: flex-end; }
  .bdf-stamp-box {
    width: 120px; height: 120px;
    border: 1px solid #000;
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 10px;
    font-size: 14px; background: #fff; margin-bottom: 15px;
  }
  .bdf-date-group { font-weight: bold; }
  .bdf-date-group input[type="date"] {
    border: none;
    border-bottom: 1px dotted #000;
    background: #fff;
    font-family: inherit;
    font-size: 14px;
    padding: 2px 6px;
    outline: none;
    color: #000;
  }

  /* ── Subject ── */
  .bdf-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate Body ── */
  .bdf-certificate-body {
    line-height: 2.6;
    font-size: 15px;
    text-align: justify;
  }

  /* ── PrintField / PrintSelect shared styles ── */
  .bdf-pf-input {
    display: inline-block;
    vertical-align: baseline;
    padding: 2px 6px;
    font-family: inherit;
    font-size: 15px;
    color: #000;
    background-color: #fff;
    border: none;
    border-bottom: 1px dotted #555;
    outline: none;
    width: 150px;
    max-width: 100%;
    box-sizing: border-box;
    transition: border-color 0.15s, background-color 0.15s;
  }
  .bdf-pf-input:focus {
    border-bottom-color: #3b7dd8;
    background-color: #f0f7ff;
  }
  .bdf-pf-input.bdf-short       { width: 80px; }
  .bdf-pf-input.bdf-header-field {
    font-size: 16px;
    font-weight: bold;
    width: 250px;
    border-bottom: 1px dotted #000;
  }

  .bdf-pf-value {
    display: inline-block;
    vertical-align: baseline;
    padding: 0 4px;
    font-family: inherit;
    font-size: 15px;
    color: #000;
    min-width: 60px;
    border-bottom: 1px solid #000;
    word-break: break-word;
  }
  .bdf-pf-value.bdf-short        { min-width: 40px; }
  .bdf-pf-value.bdf-header-field {
    font-size: 16px;
    font-weight: bold;
    min-width: 200px;
  }

  .bdf-pf-select {
    display: inline-block;
    vertical-align: baseline;
    padding: 2px 6px;
    font-family: inherit;
    font-size: 15px;
    color: #000;
    background-color: #fff;
    border: none;
    border-bottom: 1px dotted #555;
    outline: none;
    min-width: 80px;
    cursor: pointer;
  }
  .bdf-pf-select:focus { border-bottom-color: #3b7dd8; }

  /* ── Documents List ── */
  .bdf-documents-list { margin: 20px 0; padding-left: 20px; }
  .bdf-documents-list strong { font-size: 16px; }
  .bdf-documents-list ol { margin-top: 10px; padding-left: 25px; line-height: 1.8; }

  /* ── Signature & Thumbprint ── */
  .bdf-signature-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    gap: 20px;
  }
  .bdf-thumb-section { flex-basis: 30%; min-width: 200px; }
  .bdf-section-title { font-weight: bold; font-size: 16px; text-align: center; margin-bottom: 10px; }
  .bdf-thumb-boxes { display: flex; justify-content: space-around; }
  .bdf-thumb-box { display: flex; flex-direction: column; align-items: center; }
  .bdf-thumb-box label { font-weight: bold; font-size: 14px; margin-bottom: 5px; }
  .bdf-thumb-area { width: 60px; height: 80px; border: 1px solid #000; background: #f9f9f9; }

  .bdf-signature-section {
    flex-basis: 50%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .bdf-signature-label { font-weight: bold; font-size: 16px; margin-bottom: 10px; }
  .bdf-signature-section .bdf-form-group-inline {
    width: 100%;
    max-width: 320px;
    justify-content: flex-end;
  }
  .bdf-signature-section .bdf-pf-input,
  .bdf-signature-section .bdf-pf-value { width: 200px; min-width: 200px; }

  /* ── Applicant Details overrides ── */
  .bdf-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 4px;
  }
  .bdf-container .applicant-details-box h3 {
    color: #555; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .bdf-container .details-grid { display: flex; flex-direction: column; gap: 15px; }
  .bdf-container .detail-group { display: flex; flex-direction: column; }
  .bdf-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .bdf-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    font-family: inherit;
    font-size: 0.9rem;
  }
  .bdf-container .detail-input:focus { border-color: #3b7dd8; outline: none; }

  /* ── Required star ── */
  .bdf-req { color: red; font-weight: bold; }

  /* ── Submit ── */
  .bdf-submit-area { text-align: center; margin-top: 30px; }
  .bdf-submit-btn {
    background-color: #343a40;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  .bdf-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .bdf-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

  /* ── Print ──
     PrintField/PrintSelect already swap to <span> before window.print(),
     so no input-colour hacks are needed — only layout cleanup.        */
  @media print {
    body * { visibility: hidden; }
    .bdf-container,
    .bdf-container * { visibility: visible; }
    .bdf-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      max-width: none;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 15px;
      background: white !important;
      background-image: none !important;
      font-size: 14px;
      line-height: 1.8;
      color: #000;
    }
    .bdf-submit-area { display: none !important; }

    .bdf-pf-value {
      border-bottom: 1px solid #000 !important;
      color: #000 !important;
      background: transparent !important;
    }

    /* Fallback for ApplicantDetailsNp inputs not wrapped by PrintField */
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      opacity: 1 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    input::placeholder, textarea::placeholder {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
    }

    .bdf-container .applicant-details-box {
      page-break-inside: avoid;
      break-inside: avoid;
      border: 1px solid #ccc !important;
      background: white !important;
    }
    .bdf-stamp-box  { border: 1px solid #000 !important; }
    .bdf-thumb-area { border: 1px solid #000 !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   PrintField / PrintSelect
   IMPORTANT: defined at MODULE SCOPE (outside the component) so their
   identity is stable across renders — prevents the 1-char-per-keystroke
   focus-loss bug that occurs when components are defined inside another
   component's function body.
───────────────────────────────────────────────────────────────────────────── */
const PrintField = ({ value, isPrint, className = "", name, onChange, ...rest }) => {
  if (isPrint) {
    return <span className={`bdf-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`bdf-pf-input ${className}`}
      {...rest}
    />
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`bdf-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`bdf-pf-select ${className}`}
    >
      {children}
    </select>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  headerTo: "श्रीमान्",
  headerMunicipality: MUNICIPALITY?.name || "",
  headerOffice: MUNICIPALITY?.englishDistrict || "",
  date: new Date().toISOString().slice(0, 10),
  municipality: MUNICIPALITY?.name || "",
  firmType: "प्राइभेट फर्म",
  firmRegNo: "",
  firmName: "",
  dissolveReason: "",
  applicantNameForDissolve: "",
  sigSignature: "",
  sigName: "",
  sigAddress: "",
  sigFirmStamp: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  wardNo: MUNICIPALITY?.wardNumber || "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BusinessDeregistrationForm = () => {
  const [formData, setFormData]     = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [isPrint, setIsPrint]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    const required = [
      "firmRegNo", "firmName", "dissolveReason",
      "applicantNameForDissolve", "sigSignature",
      "sigName", "sigAddress", "sigFirmStamp",
      "applicantName", "applicantAddress", "applicantCitizenship",
    ];
    for (const f of required) {
      if (!d[f] || !String(d[f]).trim()) return `${f} आवश्यक छ`;
    }
    if (d.applicantPhone && !/^[0-9+\-\s]{6,20}$/.test(String(d.applicantPhone))) {
      return "फोन नम्बर अमान्य";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्। (" + err + ")");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/business-deregistration", payload);

      if (res.status === 201 || res.status === 200) {
        alert("फर्म सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        setIsPrint(true);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* After isPrint → true, React repaints with <span> values,
     then RAF fires: print dialog opens, then form resets.       */
  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      setFormData(initialState);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  const sigFields = [
    { label: "दस्तखत",    name: "sigSignature" },
    { label: "नाम",       name: "sigName"      },
    { label: "ठेगाना",    name: "sigAddress"   },
    { label: "फर्मको छाप", name: "sigFirmStamp" },
  ];

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="bdf-container">
        <form onSubmit={handleSubmit}>

          {/* ── Header ── */}
          <div className="bdf-title-header">
            <MunicipalityHeader showLogo />
            <h3>अनुसूची-१५.३</h3>
            <h4>प्राइभेट फर्म तथा साझेदारी फर्म खारेजीको लागि निवेदन</h4>
          </div>

          <div className="bdf-form-row">
            <div className="bdf-header-to-group">
              <div className="bdf-form-group-inline">
                <PrintField
                  name="headerTo"
                  value={formData.headerTo}
                  onChange={handleChange}
                  isPrint={isPrint}
                  className="bdf-header-field"
                />
                <span>ज्यु,</span>
              </div>
              <PrintField
                name="headerMunicipality"
                value={formData.headerMunicipality}
                onChange={handleChange}
                isPrint={isPrint}
                className="bdf-header-field"
              />
              <PrintField
                name="headerOffice"
                value={formData.headerOffice}
                onChange={handleChange}
                isPrint={isPrint}
                className="bdf-header-field"
              />
            </div>

            <div className="bdf-header-meta">
              <div className="bdf-stamp-box">रु. २० को टिकट</div>
              <div className="bdf-form-group bdf-date-group">
                <label>मिति :</label>
                {isPrint
                  ? <span className="bdf-pf-value">{formData.date}</span>
                  : <input type="date" name="date" value={formData.date} onChange={handleChange} />
                }
              </div>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="bdf-subject-line">
            <strong>विषय: <u>फर्म खारेजी सम्बन्धमा ।</u></strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="bdf-certificate-body">
            उपर्युक्त सम्बन्धमा मेरो नाममा यस&nbsp;
            <PrintSelect
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              isPrint={isPrint}
            >
              <option>{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</option>
            </PrintSelect>
            &nbsp;मा व्यापारिक प्रयोजनको लागि दर्ता भएको&nbsp;
            <PrintSelect
              name="firmType"
              value={formData.firmType}
              onChange={handleChange}
              isPrint={isPrint}
            >
              <option>प्राइभेट फर्म</option>
              <option>साझेदारी फर्म</option>
            </PrintSelect>
            &nbsp;नं.&nbsp;
            <PrintField
              name="firmRegNo"
              value={formData.firmRegNo}
              onChange={handleChange}
              isPrint={isPrint}
              className="bdf-short"
              required
            />
            &nbsp;को&nbsp;
            <PrintField
              name="firmName"
              value={formData.firmName}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="फर्मको नाम"
              required
            />
            &nbsp;नामको फर्म&nbsp;
            <PrintField
              name="dissolveReason"
              value={formData.dissolveReason}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="कारण"
              required
            />
            &nbsp;कारणले खारेज गरी पाउन रु. २० को टिकट टाँसी यो निवेदन दिएको छु।
            उक्त फर्मको नामबाट नेपाल सरकार र अन्य कुनै निकायमा कुनै राजस्व र अन्य रकम
            बुझाउन बाँकी छैन। कुनै किसिमको रकमा वा राजस्व बुझाउन बाँकी देखिएमा पछि
            कुनै उजुरबाजुर नगरी सम्बन्धित निकायमा बुझाउन मेरो मन्जुरी छ। निम्नानुसार
            लाग्ने दस्तुर तिरी मेरो&nbsp;
            <PrintField
              name="applicantNameForDissolve"
              value={formData.applicantNameForDissolve}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="तपाईको नाम"
              required
            />
            &nbsp;नामको उक्त फर्म खारेज गरी पाउन श्रीमान समक्ष अनुरोध गर्दछु।
          </p>

          {/* ── Documents list ── */}
          <div className="bdf-documents-list">
            <strong>संलग्न कागजातहरु:</strong>
            <ol>
              <li>सक्कल प्रमाणपत्र</li>
              <li>नागरिकता दर्ता प्रमाणपत्रको प्रतिलिपि</li>
              <li>कर तिरेको निस्सा</li>
              <li>लेखा परिक्षण प्रतिवेदन</li>
              <li>अन्य (भएमा उल्लेख गर्ने)</li>
            </ol>
          </div>

          {/* ── Signature & Thumbprint ── */}
          <div className="bdf-signature-wrapper">
            <div className="bdf-thumb-section">
              <label className="bdf-section-title">औंठा छाप</label>
              <div className="bdf-thumb-boxes">
                <div className="bdf-thumb-box">
                  <label>बायाँ</label>
                  <div className="bdf-thumb-area" />
                </div>
                <div className="bdf-thumb-box">
                  <label>दायाँ</label>
                  <div className="bdf-thumb-area" />
                </div>
              </div>
            </div>

            <div className="bdf-signature-section">
              <p className="bdf-signature-label">निवेदक</p>
              {sigFields.map(({ label, name }) => (
                <div className="bdf-form-group-inline" key={name}>
                  <label>{label} : <span className="bdf-req">*</span></label>
                  <PrintField
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    isPrint={isPrint}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {/* ── Submit (hidden in print mode) ── */}
          {!isPrint && (
            <div className="bdf-submit-area">
              <button type="submit" className="bdf-submit-btn" disabled={submitting}>
                {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default BusinessDeregistrationForm;