// src/pages/application/BusinessDeregistrationForm.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────── Styles ─────────────────────────── */
const STYLES = `
  .bdf-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 30px 40px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: 'Kalimati', 'Kokila', 'Arial', sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 1.6;
  }

  /* ── All inputs/selects white ── */
  .bdf-container input[type="text"],
  .bdf-container input[type="date"],
  .bdf-container select {
    background-color: #fff;
    font-family: inherit;
  }
  .bdf-container input[type="text"]:focus,
  .bdf-container input[type="date"]:focus,
  .bdf-container select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
  }

  /* ── Title header ── */
  .bdf-title-header { text-align: center; margin-bottom: 20px; }
  .bdf-title-header h3 { margin: 8px 0 2px; font-size: 17px; }
  .bdf-title-header h4 { margin: 2px 0; font-size: 15px; font-weight: bold; }

  /* ── Top row (addressee + stamp/date) ── */
  .bdf-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 15px;
    gap: 20px;
    align-items: flex-start;
  }

  /* Addressee block */
  .bdf-addressee-block { display: flex; flex-direction: column; gap: 8px; font-size: 1rem; }
  .bdf-addr-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .bdf-addr-label { font-weight: bold; white-space: nowrap; }

  /* Shared inline inputs */
  .bdf-input {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
  }
  .bdf-select {
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
    cursor: pointer;
  }
  .bdf-w-sm   { width: 100px; }
  .bdf-w-md   { width: 180px; }
  .bdf-w-lg   { width: 280px; }
  .bdf-w-date { width: 150px; }

  /* Header meta (stamp + date) */
  .bdf-header-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .bdf-stamp-box {
    width: 120px; height: 120px;
    border: 1px solid #000;
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 10px;
    font-size: 13px; background: #fff;
  }
  .bdf-date-row { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 1rem; }
  .bdf-date-row label { white-space: nowrap; }

  /* ── Subject ── */
  .bdf-subject-line { text-align: center; margin: 20px 0; font-size: 1rem; }

  /* ── Body paragraph — inline inputs ── */
  .bdf-certificate-body { line-height: 2.8; font-size: 1rem; text-align: justify; margin-bottom: 20px; }
  .bdf-certificate-body .bdf-input,
  .bdf-certificate-body .bdf-select {
    display: inline-block;
    vertical-align: baseline;
    margin: 0 4px;
  }

  /* ── Documents list ── */
  .bdf-documents-list { margin: 20px 0; padding-left: 20px; }
  .bdf-documents-list strong { font-size: 1rem; }
  .bdf-documents-list ol { margin-top: 10px; padding-left: 25px; line-height: 1.9; }

  /* ── Signature & thumbprint wrapper ── */
  .bdf-signature-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    gap: 20px;
  }

  /* Thumbprint */
  .bdf-thumb-section { flex-basis: 30%; min-width: 200px; }
  .bdf-section-title { font-weight: bold; font-size: 1rem; text-align: center; margin-bottom: 10px; }
  .bdf-thumb-boxes   { display: flex; justify-content: space-around; }
  .bdf-thumb-box     { display: flex; flex-direction: column; align-items: center; }
  .bdf-thumb-box label { font-weight: bold; font-size: 0.9rem; margin-bottom: 5px; }
  .bdf-thumb-area    { width: 60px; height: 80px; border: 1px solid #000; background: #f9f9f9; }

  /* Signature */
  .bdf-signature-section {
    flex-basis: 50%; min-width: 280px;
    display: flex; flex-direction: column; align-items: flex-end;
  }
  .bdf-signature-label { font-weight: bold; font-size: 1rem; margin-bottom: 10px; }
  .bdf-sig-field { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .bdf-sig-field label { font-weight: bold; white-space: nowrap; min-width: 90px; text-align: right; }
  .bdf-sig-field input { width: 200px; }

  /* ── Required star ── */
  .bdf-req { color: red; margin-left: 3px; }

  /* ── Applicant details — scoped overrides that don't fight the component ── */
  .bdf-container .applicant-details-box {
    border: 1px solid #ddd !important;
    padding: 20px !important;
    background-color: rgba(255,255,255,0.5) !important;
    margin-top: 20px !important;
    border-radius: 4px !important;
  }
  .bdf-container .applicant-details-box h3 {
    color: #777 !important;
    font-size: 1.1rem !important;
    margin: 0 0 15px 0 !important;
    border-bottom: 1px solid #eee !important;
    padding-bottom: 8px !important;
  }
  .bdf-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .bdf-container .applicant-details-box .detail-group {
    display: flex !important;
    flex-direction: column !important;
  }
  .bdf-container .applicant-details-box .detail-group label {
    font-size: 0.9rem !important;
    margin-bottom: 5px !important;
    font-weight: bold !important;
    color: #333 !important;
  }
  .bdf-container .applicant-details-box .detail-input {
    border: 1px solid #ddd !important;
    padding: 8px !important;
    border-radius: 4px !important;
    width: 100% !important;
    max-width: 400px !important;
    box-sizing: border-box !important;
    background-color: #fff !important;
    font-family: inherit !important;
    font-size: 0.9rem !important;
  }
  .bdf-container .applicant-details-box .detail-input:focus {
    border-color: #2563eb !important;
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.12) !important;
  }
  .bdf-container .applicant-details-box .bg-gray {
    background-color: #eef2f5 !important;
  }

  /* ── Footer buttons ── */
  .bdf-footer {
    text-align: center;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .bdf-btn {
    padding: 10px 26px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.15s;
  }
  .bdf-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .bdf-btn-save  { background-color: #2c3e50; color: #fff; }
  .bdf-btn-save:hover:not(:disabled)  { background-color: #1a252f; }
  .bdf-btn-print { background-color: #1a6b3a; color: #fff; }
  .bdf-btn-print:hover:not(:disabled) { background-color: #145230; }

  /* ── Copyright ── */
  .bdf-copyright { text-align: right; font-size: 0.8rem; color: #666; margin-top: 24px; border-top: 1px solid #eee; padding-top: 10px; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    .bdf-container { padding: 18px 14px; }
    .bdf-form-row  { flex-direction: column; }
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .bdf-container, .bdf-container * { visibility: visible; }
    .bdf-container {
      position: absolute; left: 0; top: 0;
      width: 100%; max-width: none;
      box-shadow: none; border: none;
      margin: 0; padding: 12mm 16mm;
      background: white !important;
      background-image: none !important;
    }
    .bdf-footer, .bdf-copyright { display: none !important; }
    input, select {
      border: none !important; background: transparent !important;
      color: #000 !important; -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
    }
    input::placeholder { color: transparent !important; }
    .bdf-stamp-box, .bdf-thumb-area { border: 1px solid #000 !important; }
  }
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialState = () => ({
  wardOfficerName:          "",   // was headerTo — now just the officer name
  headerMunicipality:       MUNICIPALITY.name,
  headerOffice:             MUNICIPALITY.city || "",
  date:                     new Date().toISOString().slice(0, 10),
  municipality:             MUNICIPALITY.name,
  firmType:                 "प्राइभेट फर्म",
  firmRegNo:                "",
  firmName:                 "",
  dissolveReason:           "",
  applicantNameForDissolve: "",
  sigSignature:             "",
  sigName:                  "",
  sigAddress:               "",
  sigFirmStamp:             "",
  applicantName:            "",
  applicantAddress:         "",
  applicantCitizenship:     "",
  applicantPhone:           "",
  wardNo:                   MUNICIPALITY.wardNumber || "",
});

const validate = (d) => {
  const required = [
    ["firmRegNo",                "दर्ता नं."],
    ["firmName",                 "फर्मको नाम"],
    ["dissolveReason",           "खारेजीको कारण"],
    ["applicantNameForDissolve", "निवेदकको नाम (फर्म खारेजी)"],
    ["sigSignature",             "दस्तखत"],
    ["sigName",                  "हस्ताक्षरकर्ताको नाम"],
    ["sigAddress",               "ठेगाना"],
    ["sigFirmStamp",             "फर्मको छाप"],
    ["applicantName",            "निवेदकको नाम"],
    ["applicantAddress",         "निवेदकको ठेगाना"],
    ["applicantCitizenship",     "नागरिकता नं."],
  ];
  for (const [field, label] of required) {
    if (!d[field] || !String(d[field]).trim()) return `${label} आवश्यक छ`;
  }
  if (d.applicantPhone && !/^[0-9+\-\s]{6,20}$/.test(String(d.applicantPhone)))
    return "फोन नम्बर अमान्य";
  return null;
};

const SIG_FIELDS = [
  { label: "दस्तखत",     name: "sigSignature" },
  { label: "नाम",        name: "sigName"      },
  { label: "ठेगाना",     name: "sigAddress"   },
  { label: "फर्मको छाप",  name: "sigFirmStamp" },
];

/* ─────────────────────────── Component ─────────────────────────── */
const BusinessDeregistrationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData]     = useState(makeInitialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* Single save — no duplicate POSTs */
  const handleSave = async (shouldPrint = false) => {
    const err = validate(formData);
    if (err) { alert("कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्। (" + err + ")"); return; }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axios.post("/api/forms/business-deregistration", payload);

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          window.print();
          setTimeout(() => setFormData(makeInitialState()), 500);
        } else {
          alert("फर्म सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
          setFormData(makeInitialState());
        }
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

  return (
    <>
      <style>{STYLES}</style>

      <form
        className="bdf-container"
        onSubmit={(e) => { e.preventDefault(); handleSave(false); }}
      >
        {/* Title header */}
        <div className="bdf-title-header">
          <MunicipalityHeader showLogo />
          <h3>अनुसूची-१५.३</h3>
          <h4>प्राइभेट फर्म तथा साझेदारी फर्म खारेजीको लागि निवेदन</h4>
        </div>

        {/* ── Addressee + stamp/date ── */}
        <div className="bdf-form-row">

          {/* Addressee — श्रीमान् hardcoded, input is just the officer name */}
          <div className="bdf-addressee-block">
            {/* Line 1: श्रीमान् [ward officer name] ज्यु, */}
            <div className="bdf-addr-line">
              <span className="bdf-addr-label">श्रीमान्</span>
              <input
                type="text"
                name="wardOfficerName"
                value={formData.wardOfficerName}
                onChange={handleChange}
                className="bdf-input bdf-w-lg"
                placeholder="वडा अधिकारीको नाम / पद"
              />
              <span>ज्यु,</span>
            </div>
            {/* Line 2: [municipality] [office/district] */}
            <div className="bdf-addr-line">
              <select
                name="headerMunicipality"
                value={formData.headerMunicipality}
                onChange={handleChange}
                className="bdf-select bdf-w-md"
              >
                <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
              </select>
              <input
                type="text"
                name="headerOffice"
                value={formData.headerOffice}
                onChange={handleChange}
                className="bdf-input bdf-w-md"
                placeholder="जिल्ला / कार्यालय"
              />
            </div>
          </div>

          {/* Stamp + date */}
          <div className="bdf-header-meta">
            <div className="bdf-stamp-box">रु. २० को टिकट</div>
            <div className="bdf-date-row">
              <label>मिति :</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bdf-input bdf-w-date"
              />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="bdf-subject-line">
          <strong>विषय: <u>फर्म खारेजी सम्बन्धमा ।</u></strong>
        </div>

        {/* Body */}
        <p className="bdf-certificate-body">
          उपर्युक्त सम्बन्धमा मेरो नाममा यस{" "}
          <select name="municipality" value={formData.municipality} onChange={handleChange} className="bdf-select bdf-w-md">
            <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
          </select>{" "}
          मा व्यापारिक प्रयोजनको लागि दर्ता भएको{" "}
          <select name="firmType" value={formData.firmType} onChange={handleChange} className="bdf-select bdf-w-md">
            <option>प्राइभेट फर्म</option>
            <option>साझेदारी फर्म</option>
          </select>{" "}
          नं.{" "}
          <input type="text" name="firmRegNo" value={formData.firmRegNo} onChange={handleChange} className="bdf-input bdf-w-sm" placeholder="दर्ता नं. *" required />{" "}
          को{" "}
          <input type="text" name="firmName" value={formData.firmName} onChange={handleChange} className="bdf-input bdf-w-md" placeholder="फर्मको नाम *" required />{" "}
          नामको फर्म{" "}
          <input type="text" name="dissolveReason" value={formData.dissolveReason} onChange={handleChange} className="bdf-input bdf-w-md" placeholder="कारण *" required />{" "}
          कारणले खारेज गरी पाउन रु. २० को टिकट टाँसी यो निवेदन दिएको छु।
          उक्त फर्मको नामबाट नेपाल सरकार र अन्य कुनै निकायमा कुनै राजस्व र अन्य रकम
          बुझाउन बाँकी छैन। कुनै किसिमको रकमा वा राजस्व बुझाउन बाँकी देखिएमा पछि
          कुनै उजुरबाजुर नगरी सम्बन्धित निकायमा बुझाउन मेरो मन्जुरी छ। निम्नानुसार
          लाग्ने दस्तुर तिरी मेरो{" "}
          <input type="text" name="applicantNameForDissolve" value={formData.applicantNameForDissolve} onChange={handleChange} className="bdf-input bdf-w-md" placeholder="तपाईको नाम *" required />{" "}
          नामको उक्त फर्म खारेज गरी पाउन श्रीमान समक्ष अनुरोध गर्दछु।
        </p>

        {/* Documents list */}
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

        {/* Signature + thumbprint */}
        <div className="bdf-signature-wrapper">

          <div className="bdf-thumb-section">
            <p className="bdf-section-title">औंठा छाप</p>
            <div className="bdf-thumb-boxes">
              <div className="bdf-thumb-box"><label>बायाँ</label><div className="bdf-thumb-area" /></div>
              <div className="bdf-thumb-box"><label>दायाँ</label><div className="bdf-thumb-area" /></div>
            </div>
          </div>

          <div className="bdf-signature-section">
            <p className="bdf-signature-label">निवेदक</p>
            {SIG_FIELDS.map(({ label, name }) => (
              <div className="bdf-sig-field" key={name}>
                <label>{label} :<span className="bdf-req">*</span></label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="bdf-input"
                  required
                />
              </div>
            ))}
          </div>

        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Footer — two buttons */}
        <div className="bdf-footer">
          <button type="submit" className="bdf-btn bdf-btn-save" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button type="button" className="bdf-btn bdf-btn-print" disabled={submitting} onClick={() => handleSave(true)}>
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="bdf-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default BusinessDeregistrationForm;