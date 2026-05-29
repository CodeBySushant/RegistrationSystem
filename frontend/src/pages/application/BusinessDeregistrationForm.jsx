// src/pages/application/BusinessDeregistrationForm.jsx
import React, { useState } from "react";
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

  /* Read-only fields (signed/stamped after printing) */
  .bdf-container input[readonly] {
    background-color: #f5f5f5 !important;
    cursor: not-allowed;
    color: #999;
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
  .bdf-sig-hint { font-size: 0.78rem; color: #888; font-style: italic; margin-left: 6px; white-space: nowrap; }

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
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialState = () => ({
  wardOfficerName:          "",
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
  // sigSignature & sigFirmStamp are filled by hand after printing — not required here
  const required = [
    ["firmRegNo",                "दर्ता नं."],
    ["firmName",                 "फर्मको नाम"],
    ["dissolveReason",           "खारेजीको कारण"],
    ["applicantNameForDissolve", "निवेदकको नाम (फर्म खारेजी)"],
    ["sigName",                  "हस्ताक्षरकर्ताको नाम"],
    ["sigAddress",               "ठेगाना"],
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

/* readOnly fields get signed/stamped by hand after printing */
const SIG_FIELDS = [
  { label: "दस्तखत",     name: "sigSignature", readOnly: true,  required: false },
  { label: "नाम",        name: "sigName",      readOnly: false, required: true  },
  { label: "ठेगाना",     name: "sigAddress",   readOnly: false, required: true  },
  { label: "फर्मको छाप",  name: "sigFirmStamp", readOnly: true,  required: false },
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

  /* ── Clean print — isolated window, all values + applicant box ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const f = formData;
    const v = (val) => `<span class="value">${val || ""}</span>`;

    const content = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<title>फर्म खारेजी निवेदन</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Kalimati','Noto Sans Devanagari',Arial,sans-serif; color:#000; background:white; padding:15mm 20mm; font-size:11pt; line-height:1.8; }
  .header { text-align:center; margin-bottom:14px; position:relative; min-height:90px; }
  .logo { position:absolute; left:0; top:0; width:70px; }
  .mun-name   { color:#c0392b; font-size:20pt; font-weight:700; }
  .ward-title { color:#c0392b; font-size:16pt; font-weight:700; margin:4px 0; }
  .addr       { color:#c0392b; font-size:10pt; }
  .doc-title  { text-align:center; margin:10px 0 4px; font-size:13pt; }
  .doc-sub    { text-align:center; font-weight:bold; font-size:11pt; margin-bottom:14px; }
  .meta { display:flex; justify-content:space-between; align-items:flex-start; margin:14px 0; }
  .addressee { font-size:11pt; font-weight:bold; line-height:1.9; }
  .stamp-box { width:110px; height:110px; border:1px solid #000; display:flex; align-items:center; justify-content:center; text-align:center; font-size:9pt; padding:8px; }
  .subject { text-align:center; font-weight:bold; font-size:12pt; margin:18px 0; text-decoration:underline; }
  /* value spans size to content — no fixed min-width so small values
     don't leave big gaps and long values don't get clipped/merged */
  .value { font-weight:bold; padding:0 3px; white-space:nowrap; }
  /* blank signing line for fields filled by hand after printing */
  .sign-line { display:inline-block; border-bottom:1px solid #000; min-width:140px; height:1.2em; vertical-align:baseline; }
  .body-text { font-size:11pt; line-height:2.2; text-align:justify; margin-bottom:16px; }
  .docs { margin:14px 0; }
  .docs ol { padding-left:28px; line-height:1.9; font-size:10pt; }
  .sig-wrap { display:flex; justify-content:space-between; margin-top:24px; gap:20px; }
  .thumb-section { width:30%; }
  .sec-title { font-weight:bold; text-align:center; margin-bottom:8px; font-size:10pt; }
  .thumb-boxes { display:flex; justify-content:space-around; }
  .thumb-box { display:flex; flex-direction:column; align-items:center; font-size:9pt; }
  .thumb-area { width:55px; height:70px; border:1px solid #000; margin-top:4px; }
  .sig-section { width:55%; display:flex; flex-direction:column; align-items:flex-end; }
  .sig-row { display:flex; gap:8px; margin-bottom:8px; font-size:10pt; align-items:baseline; }
  .sig-label { font-weight:600; min-width:80px; text-align:right; }
  .applicant-box { border:1px solid #999; padding:14px; margin-top:24px; border-radius:3px; }
  .applicant-title { font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:6px; margin-bottom:10px; font-size:11pt; }
  .field-row { display:flex; margin-bottom:8px; font-size:10pt; }
  .field-label { min-width:160px; font-weight:600; }
  .field-val { flex:1; }
</style>
</head><body>
  <div class="header">
    <img class="logo" src="/nepallogo.svg" alt="Nepal"/>
    <div class="mun-name">${MUNICIPALITY.name}</div>
    <div class="ward-title">${wardTitle}</div>
    <div class="addr">${MUNICIPALITY.officeLine}</div>
    <div class="addr">${MUNICIPALITY.provinceLine}</div>
  </div>

  <div class="doc-title">अनुसूची-१५.३</div>
  <div class="doc-sub">प्राइभेट फर्म तथा साझेदारी फर्म खारेजीको लागि निवेदन</div>

  <div class="meta">
    <div class="addressee">
      श्रीमान् ${v(f.wardOfficerName)} ज्यु,<br/>
      ${v(f.headerMunicipality)} ${v(f.headerOffice)}<br/>
      मिति : <strong>${f.date || ""}</strong>
    </div>
    <div class="stamp-box">रु. २० को टिकट</div>
  </div>

  <div class="subject">विषय: फर्म खारेजी सम्बन्धमा ।</div>

  <div class="body-text">
    उपर्युक्त सम्बन्धमा मेरो नाममा यस ${v(f.municipality)} मा व्यापारिक प्रयोजनको लागि दर्ता भएको
    ${v(f.firmType)} नं. ${v(f.firmRegNo)} को ${v(f.firmName)} नामको फर्म
    ${v(f.dissolveReason)} कारणले खारेज गरी पाउन रु. २० को टिकट टाँसी यो निवेदन दिएको छु।
    उक्त फर्मको नामबाट नेपाल सरकार र अन्य कुनै निकायमा कुनै राजस्व र अन्य रकम बुझाउन बाँकी छैन।
    कुनै किसिमको रकमा वा राजस्व बुझाउन बाँकी देखिएमा पछि कुनै उजुरबाजुर नगरी सम्बन्धित निकायमा
    बुझाउन मेरो मन्जुरी छ। निम्नानुसार लाग्ने दस्तुर तिरी मेरो ${v(f.applicantNameForDissolve)}
    नामको उक्त फर्म खारेज गरी पाउन श्रीमान समक्ष अनुरोध गर्दछु।
  </div>

  <div class="docs">
    <strong>संलग्न कागजातहरु:</strong>
    <ol>
      <li>सक्कल प्रमाणपत्र</li>
      <li>नागरिकता दर्ता प्रमाणपत्रको प्रतिलिपि</li>
      <li>कर तिरेको निस्सा</li>
      <li>लेखा परिक्षण प्रतिवेदन</li>
      <li>अन्य (भएमा उल्लेख गर्ने)</li>
    </ol>
  </div>

  <div class="sig-wrap">
    <div class="thumb-section">
      <div class="sec-title">औंठा छाप</div>
      <div class="thumb-boxes">
        <div class="thumb-box">बायाँ<div class="thumb-area"></div></div>
        <div class="thumb-box">दायाँ<div class="thumb-area"></div></div>
      </div>
    </div>
    <div class="sig-section">
      <div class="sec-title">निवेदक</div>
      <div class="sig-row"><span class="sig-label">दस्तखत :</span><span class="sign-line"></span></div>
      <div class="sig-row"><span class="sig-label">नाम :</span><span class="value">${f.sigName || ""}</span></div>
      <div class="sig-row"><span class="sig-label">ठेगाना :</span><span class="value">${f.sigAddress || ""}</span></div>
      <div class="sig-row"><span class="sig-label">फर्मको छाप :</span><span class="sign-line"></span></div>
    </div>
  </div>

  <div class="applicant-box">
    <div class="applicant-title">निवेदकको विवरण</div>
    <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${f.applicantName || ""}</span></div>
    <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${f.applicantAddress || ""}</span></div>
    <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${f.applicantCitizenship || ""}</span></div>
    <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${f.applicantPhone || ""}</span></div>
  </div>
</body></html>`;

    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(content);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 500);
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
          handleCleanPrint();
        } else {
          alert("फर्म सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormData(makeInitialState());
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
            {SIG_FIELDS.map(({ label, name, readOnly, required }) => (
              <div className="bdf-sig-field" key={name}>
                <label>
                  {label} :{required && <span className="bdf-req">*</span>}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="bdf-input"
                  readOnly={readOnly}
                  required={required}
                  placeholder={readOnly ? "प्रिन्ट पछि हस्ताक्षर/छाप" : ""}
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