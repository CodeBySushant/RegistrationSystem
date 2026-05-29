// src/pages/application/LandBoundaryVerificationForm.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────── Styles ─────────────────────────── */
const STYLES = `
  .lbvf-container {
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
  }

  /* ── All inputs/selects white ── */
  .lbvf-container input[type="text"],
  .lbvf-container input[type="date"],
  .lbvf-container select,
  .lbvf-container textarea {
    background-color: #fff;
    font-family: inherit;
  }
  .lbvf-container input[type="text"]:focus,
  .lbvf-container input[type="date"]:focus,
  .lbvf-container select:focus,
  .lbvf-container textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
  }

  /* ── Top form-row (addressee + date) ── */
  .lbvf-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
    gap: 16px;
  }

  /* ── Addressee block — structured like gov letter ── */
  .lbvf-addressee-block { display: flex; flex-direction: column; gap: 8px; font-size: 1rem; }
  .lbvf-addr-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .lbvf-addr-label { font-weight: bold; white-space: nowrap; }

  /* ── Shared inline input/select ── */
  .lbvf-input {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
  }
  .lbvf-select {
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
    cursor: pointer;
  }
  .lbvf-w-sm   { width: 110px; }
  .lbvf-w-md   { width: 200px; }
  .lbvf-w-lg   { width: 280px; }
  .lbvf-w-date { width: 150px; }

  /* ── Date block ── */
  .lbvf-date-block { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 1rem; }
  .lbvf-date-block label { white-space: nowrap; }

  /* ── Subject ── */
  .lbvf-subject-line { text-align: center; margin: 25px 0; font-size: 1rem; }

  /* ── Body ── */
  .lbvf-certificate-body { line-height: 2.4; font-size: 1rem; text-align: justify; margin-bottom: 20px; }

  /* ── Fields grid (2-col) ── */
  .lbvf-fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 24px;
    margin-bottom: 24px;
  }
  .lbvf-field-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .lbvf-field-group label { font-size: 0.9rem; font-weight: bold; color: #333; }
  .lbvf-field-group input,
  .lbvf-field-group select {
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
  }
  .lbvf-full-width { grid-column: 1 / -1; }
  @media (max-width: 600px) {
    .lbvf-fields-grid { grid-template-columns: 1fr; }
    .lbvf-full-width  { grid-column: 1; }
  }

  /* ── Signature section ── */
  .lbvf-signature-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
    margin-right: 20px;
    gap: 10px;
  }
  .lbvf-sig-field { display: flex; align-items: center; gap: 8px; }
  .lbvf-sig-field label { font-weight: bold; white-space: nowrap; min-width: 100px; text-align: right; }
  .lbvf-sig-field input,
  .lbvf-sig-field select {
    width: 200px;
    padding: 5px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
  }

  /* ── Required star ── */
  .lbvf-req { color: red; margin-left: 3px; }

  /* ── Applicant details overrides ── */
  .lbvf-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .lbvf-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem; margin: 0 0 15px 0;
    border-bottom: 1px solid #eee; padding-bottom: 8px;
  }
  .lbvf-container .applicant-details-box .details-grid {
    display: flex !important; flex-direction: column !important; gap: 18px !important;
  }
  .lbvf-container .applicant-details-box .detail-input {
    max-width: 400px; width: 100%;
    border: 1px solid #ddd; padding: 8px;
    border-radius: 4px; box-sizing: border-box;
    background-color: #fff;
  }

  /* ── Footer buttons ── */
  .lbvf-footer {
    text-align: center;
    margin-top: 36px;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .lbvf-btn {
    padding: 10px 26px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.15s;
  }
  .lbvf-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .lbvf-btn-save  { background-color: #2c3e50; color: #fff; }
  .lbvf-btn-save:hover:not(:disabled)  { background-color: #1a252f; }
  .lbvf-btn-print { background-color: #1a6b3a; color: #fff; }
  .lbvf-btn-print:hover:not(:disabled) { background-color: #145230; }

  /* ── Copyright ── */
  .lbvf-copyright { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    .lbvf-container { padding: 18px 14px; }
    .lbvf-form-row  { flex-direction: column; }
    .lbvf-w-lg      { width: 100%; }
  }
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialState = () => ({
  date:               new Date().toISOString().slice(0, 10),
  // Addressee
  addresseePost:      "प्रमुख प्रशासकीय अधिकृत ज्यु",
  addresseeMunicipality: MUNICIPALITY.name,
  addresseeDistrict:  MUNICIPALITY.city || "",
  // Main fields
  mainDistrict:       MUNICIPALITY.city || "",
  mainMunicipality:   MUNICIPALITY.name,
  mainWardNo1:        MUNICIPALITY.wardNumber || "१",
  prevLocationType:   "साबिक",
  prevWardNo:         MUNICIPALITY.wardNumber || "१",
  tole:               "",
  applicantTitle:     "श्री",
  applicantRelation:  "छोरा",
  applicantAge:       "",
  guardianTitle:      "श्री",
  guardianName:       "",
  kittaNo:            "",
  landName:           "",
  landArea:           "",
  feeAmount:          "",
  feeAmountWords:     "",
  // Signature
  sigApplicantType:   "निवेदक",
  sigName:            "",
  sigAddress:         "",
  sigWard:            "",
  sigPhone:           "",
  coapplicantName:    "",
  // Applicant details
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
});

const validate = (fd) => {
  if (!fd.mainDistrict?.trim())          return "मुख्य जिल्ला भर्नुहोस्";
  if (!fd.mainMunicipality?.trim())      return "पालिकाको नाम भर्नुहोस्";
  if (!fd.mainWardNo1?.trim())           return "वडा नं. भर्नुहोस्";
  if (!fd.tole?.trim())                  return "टोल भर्नुहोस्";
  if (!fd.applicantName?.trim())         return "निवेदकको नाम भर्नुहोस्";
  if (!fd.applicantAge?.trim())          return "निवेदकको उमेर भर्नुहोस्";
  if (!fd.guardianName?.trim())          return "अभिभावकको नाम भर्नुहोस्";
  if (!fd.kittaNo?.trim())               return "कित्ता नं. भर्नुहोस्";
  if (!fd.landArea?.trim())              return "क्षेत्रफल भर्नुहोस्";
  if (!fd.feeAmount?.trim())             return "रकम भर्नुहोस्";
  if (!fd.feeAmountWords?.trim())        return "रकम अक्षरुपी भर्नुहोस्";
  if (!fd.sigName?.trim())               return "दस्तखत गर्नेको नाम भर्नुहोस्";
  if (!fd.sigPhone?.trim())              return "सम्पर्क नम्बर भर्नुहोस्";
  if (!fd.applicantAddress?.trim())      return "निवेदक ठेगाना भर्नुहोस्";
  if (!fd.applicantCitizenship?.trim())  return "नागरिकता नं. भर्नुहोस्";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const LandBoundaryVerificationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(makeInitialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ── Clean print — isolated window, all fields + applicant box ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const f = formData;
    const v = (val) => `<span class="value">${val || ""}</span>`;

    const content = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<title>जग्गा साँध सिमाङ्कन निवेदन</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Kalimati','Noto Sans Devanagari',Arial,sans-serif; color:#000; background:white; padding:15mm 20mm; font-size:11pt; line-height:1.8; }
  .header { text-align:center; margin-bottom:16px; position:relative; min-height:90px; }
  .logo { position:absolute; left:0; top:0; width:70px; }
  .mun-name   { color:#c0392b; font-size:20pt; font-weight:700; }
  .ward-title { color:#c0392b; font-size:16pt; font-weight:700; margin:4px 0; }
  .addr       { color:#c0392b; font-size:10pt; }
  .meta { display:flex; justify-content:space-between; align-items:flex-start; margin:14px 0; }
  .addressee { font-size:11pt; font-weight:bold; line-height:1.9; }
  .subject { text-align:center; font-weight:bold; font-size:12pt; margin:18px 0; text-decoration:underline; }
  /* value spans size to content — no fixed min-width so small values
     don't leave big gaps and long values don't get clipped/merged */
  .value { font-weight:bold; padding:0 3px; white-space:nowrap; }
  .body-text { font-size:11pt; line-height:2.2; text-align:justify; margin-bottom:16px; }
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 28px; margin-bottom:18px; }
  .grid .full { grid-column:1/-1; }
  .g-row { display:flex; gap:6px; align-items:baseline; font-size:10pt; }
  .g-label { font-weight:600; min-width:110px; }
  .g-val { flex:1; }
  .sig-section { display:flex; flex-direction:column; align-items:flex-end; margin:18px 20px 0 0; gap:6px; }
  .sig-row { display:flex; gap:8px; align-items:baseline; font-size:10pt; }
  .sig-label { font-weight:600; min-width:90px; text-align:right; }
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

  <div class="meta">
    <div class="addressee">
      श्री ${v(f.addresseePost)},<br/>
      ${v(f.addresseeMunicipality)} ${v(f.addresseeDistrict)}
    </div>
    <div>मिति : <strong>${f.date || ""}</strong></div>
  </div>

  <div class="subject">विषय: जग्गाको साँध सिमाङ्कन गर्न अधिन खटाई पाउँ बारे।</div>

  <div class="body-text">
    यस सम्बन्धमा म/हामीले तल उल्लेखित जग्गाको सीमा सिमाङ्कन गराउन अनुरोध गर्दछौं।
    आवश्यक नक्सा, कित्ता विवरण र अन्य कागजात संलग्न गरिएको छ।
  </div>

  <div class="grid">
    <div class="g-row"><span class="g-label">मुख्य जिल्ला:</span><span class="g-val">${v(f.mainDistrict)}</span></div>
    <div class="g-row"><span class="g-label">पालिका:</span><span class="g-val">${v(f.mainMunicipality)}</span></div>
    <div class="g-row"><span class="g-label">वडा नं.:</span><span class="g-val">${v(f.mainWardNo1)}</span></div>
    <div class="g-row"><span class="g-label">पूर्व स्थान प्रकार:</span><span class="g-val">${v(f.prevLocationType)}</span></div>
    <div class="g-row"><span class="g-label">पूर्व वडा नं.:</span><span class="g-val">${v(f.prevWardNo)}</span></div>
    <div class="g-row"><span class="g-label">टोल:</span><span class="g-val">${v(f.tole)}</span></div>
    <div class="g-row"><span class="g-label">निवेदकको नाम:</span><span class="g-val">${v(f.applicantName)}</span></div>
    <div class="g-row"><span class="g-label">उमेर:</span><span class="g-val">${v(f.applicantAge)}</span></div>
    <div class="g-row"><span class="g-label">अभिभावक/पति:</span><span class="g-val">${v(f.guardianName)}</span></div>
    <div class="g-row"><span class="g-label">कित्ता नं.:</span><span class="g-val">${v(f.kittaNo)}</span></div>
    <div class="g-row"><span class="g-label">जग्गाको नाम:</span><span class="g-val">${v(f.landName)}</span></div>
    <div class="g-row"><span class="g-label">क्षेत्रफल:</span><span class="g-val">${v(f.landArea)}</span></div>
    <div class="g-row"><span class="g-label">दर्ता दस्तुर (रु.):</span><span class="g-val">${v(f.feeAmount)}</span></div>
    <div class="g-row full"><span class="g-label">रकम (अक्षरुपी):</span><span class="g-val">${v(f.feeAmountWords)}</span></div>
  </div>

  <div class="sig-section">
    <div class="sig-row"><span class="sig-label">प्रकार :</span><span class="value">${f.sigApplicantType || ""}</span></div>
    <div class="sig-row"><span class="sig-label">नाम :</span><span class="value">${f.sigName || ""}</span></div>
    <div class="sig-row"><span class="sig-label">ठेगाना :</span><span class="value">${f.sigAddress || ""}</span></div>
    <div class="sig-row"><span class="sig-label">वडा नं. :</span><span class="value">${f.sigWard || ""}</span></div>
    <div class="sig-row"><span class="sig-label">सम्पर्क नं. :</span><span class="value">${f.sigPhone || ""}</span></div>
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
    if (err) { alert("कृपया आवश्यक सूचना भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axios.post("/api/forms/land-boundary-verification", payload);

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormData(makeInitialState());
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
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
        className="lbvf-container"
        onSubmit={(e) => { e.preventDefault(); handleSave(false); }}
      >
        {/* Municipality header */}
        <MunicipalityHeader showLogo />

        {/* ── Addressee + Date ── clean structured layout ── */}
        <div className="lbvf-form-row">

          <div className="lbvf-addressee-block">
            <div className="lbvf-addr-line">
              <span className="lbvf-addr-label">श्री</span>
              <input
                type="text"
                name="addresseePost"
                value={formData.addresseePost}
                onChange={handleChange}
                className="lbvf-input lbvf-w-lg"
                placeholder="पद/नाम"
              />
              <span>,</span>
            </div>
            <div className="lbvf-addr-line">
              <input
                type="text"
                name="addresseeMunicipality"
                value={formData.addresseeMunicipality}
                onChange={handleChange}
                className="lbvf-input lbvf-w-md"
              />
              <input
                type="text"
                name="addresseeDistrict"
                value={formData.addresseeDistrict}
                onChange={handleChange}
                className="lbvf-input lbvf-w-sm"
                placeholder="जिल्ला"
              />
            </div>
          </div>

          {/* Date */}
          <div className="lbvf-date-block">
            <label>मिति :</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="lbvf-input lbvf-w-date"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="lbvf-subject-line">
          <strong>विषय: <u>जग्गाको साँध सिमाङ्कन गर्न अधिन खटाई पाउँ बारे।</u></strong>
        </div>

        <p className="lbvf-certificate-body">
          यस सम्बन्धमा म/हामीले तल उल्लेखित जग्गाको सीमा सिमाङ्कन गराउन अनुरोध
          गर्दछौं। आवश्यक नक्सा, कित्ता विवरण र अन्य कागजात संलग्न गरिएको छ।
        </p>

        {/* Fields grid */}
        <div className="lbvf-fields-grid">
          <div className="lbvf-field-group">
            <label>मुख्य जिल्ला <span className="lbvf-req">*</span></label>
            <input type="text" name="mainDistrict"     value={formData.mainDistrict}     onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>पालिका <span className="lbvf-req">*</span></label>
            <input type="text" name="mainMunicipality" value={formData.mainMunicipality} onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>वडा नं. <span className="lbvf-req">*</span></label>
            <input type="text" name="mainWardNo1"      value={formData.mainWardNo1}      onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>पूर्व स्थान प्रकार</label>
            <select name="prevLocationType" value={formData.prevLocationType} onChange={handleChange}>
              <option>साबिक</option>
              <option>यहाँ</option>
            </select>
          </div>
          <div className="lbvf-field-group">
            <label>पूर्व वडा नं.</label>
            <input type="text" name="prevWardNo"    value={formData.prevWardNo}    onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>टोल <span className="lbvf-req">*</span></label>
            <input type="text" name="tole"          value={formData.tole}          onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>निवेदकको नाम <span className="lbvf-req">*</span></label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>उमेर <span className="lbvf-req">*</span></label>
            <input type="text" name="applicantAge"  value={formData.applicantAge}  onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>अभिभावक/पति <span className="lbvf-req">*</span></label>
            <input type="text" name="guardianName"  value={formData.guardianName}  onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>कित्ता नं. <span className="lbvf-req">*</span></label>
            <input type="text" name="kittaNo"       value={formData.kittaNo}       onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>जग्गाको नाम</label>
            <input type="text" name="landName"      value={formData.landName}      onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>क्षेत्रफल <span className="lbvf-req">*</span></label>
            <input type="text" name="landArea"      value={formData.landArea}      onChange={handleChange} />
          </div>
          <div className="lbvf-field-group">
            <label>दर्ता दस्तुर (रु.) <span className="lbvf-req">*</span></label>
            <input type="text" name="feeAmount"     value={formData.feeAmount}     onChange={handleChange} />
          </div>
          <div className="lbvf-field-group lbvf-full-width">
            <label>रकम (अक्षरुपी) <span className="lbvf-req">*</span></label>
            <input type="text" name="feeAmountWords" value={formData.feeAmountWords} onChange={handleChange} />
          </div>
        </div>

        {/* Signature section */}
        <div className="lbvf-signature-section">
          <div className="lbvf-sig-field">
            <label>प्रकार :</label>
            <select name="sigApplicantType" value={formData.sigApplicantType} onChange={handleChange}>
              <option>निवेदक</option>
              <option>निवेदिका</option>
            </select>
          </div>
          <div className="lbvf-sig-field">
            <label>नाम :<span className="lbvf-req">*</span></label>
            <input type="text" name="sigName"    value={formData.sigName}    onChange={handleChange} required />
          </div>
          <div className="lbvf-sig-field">
            <label>ठेगाना :</label>
            <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} />
          </div>
          <div className="lbvf-sig-field">
            <label>वडा नं. :</label>
            <input type="text" name="sigWard"    value={formData.sigWard}    onChange={handleChange} />
          </div>
          <div className="lbvf-sig-field">
            <label>सम्पर्क नं. :<span className="lbvf-req">*</span></label>
            <input type="text" name="sigPhone"   value={formData.sigPhone}   onChange={handleChange} required />
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Footer — two buttons */}
        <div className="lbvf-footer">
          <button
            type="submit"
            className="lbvf-btn lbvf-btn-save"
            disabled={submitting}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="lbvf-btn lbvf-btn-print"
            disabled={submitting}
            onClick={() => handleSave(true)}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="lbvf-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default LandBoundaryVerificationForm;