// src/pages/application/BusinessRegistrationApplicationForm.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BusinessRegistrationApplicationForm.css)
   All classes prefixed with "braf-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .braf-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-family: 'Arial', sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.5;
  }

  .braf-container textarea {
    border: 1px dotted #000 !important;
    min-height: 40px;
    padding: 5px;
    background-color: transparent;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
  }

  /* --- Top Bar --- */
  .braf-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .braf-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* --- श्री block --- */
  .braf-shree-block {
    width: 100%;
    max-width: 500px;
    margin-top: 20px;
  }
  .braf-shree-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 12px;
    font-size: 14px;
  }
  .braf-name-input {
    width: 220px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 14px;
  }
  .braf-shree-stack  { display: flex; flex-direction: column; gap: 10px; }
  .braf-stack-row    { display: flex; align-items: center; gap: 6px; }
  .braf-stack-input  {
    width: 100%;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    height: 30px;
    font-family: inherit;
    font-size: 14px;
  }

  /* --- Subject / Body --- */
  .braf-subject-line {
    text-align: center;
    margin: 10px 0 20px;
    font-size: 16px;
    font-weight: bold;
  }
  .braf-certificate-body {
    line-height: 1.8;
    font-size: 14px;
    text-align: justify;
    margin-bottom: 15px;
    text-indent: 40px;
  }

  /* --- Form section --- */
  .braf-form-section { margin-bottom: 0; }
  .braf-form-group-flex {
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .braf-form-group-flex label {
    font-weight: normal;
    margin-right: 5px;
    white-space: nowrap;
  }
  .braf-form-group-flex input {
    flex-grow: 1;
    margin-right: 15px;
    min-width: 100px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 14px;
  }
  .braf-biz-select {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 14px;
    margin-right: 15px;
  }

  /* --- Right-aligned निवेदक block --- */
  .braf-right-row-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
  }
  .braf-right-row-title { font-weight: bold; font-size: 15px; margin-bottom: 6px; }
  .braf-right-row       { display: flex; align-items: baseline; gap: 8px; }
  .braf-right-label     { white-space: nowrap; font-size: 14px; }
  .braf-right-row-input {
    width: 260px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-size: 14px;
    font-family: inherit;
  }

  /* --- Signature & Thumbprint --- */
  .braf-right-signature-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 25px;
  }
  .braf-signature-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 10px;
  }
  .braf-signature-row label { font-size: 14px; }
  .braf-signature-input {
    width: 200px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-size: 14px;
    font-family: inherit;
  }
  .braf-signature-input[readonly] { cursor: not-allowed; }

  .braf-thumb-box-wrapper { width: 260px; border: 1px solid #000; }
  .braf-thumb-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #000;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
  .braf-thumb-header span { padding: 4px 0; border-right: 1px solid #000; }
  .braf-thumb-header span:last-child { border-right: none; }
  .braf-thumb-body { display: grid; grid-template-columns: 1fr 1fr; height: 120px; }
  .braf-thumb-cell { border-right: 1px solid #000; }
  .braf-thumb-cell:last-child { border-right: none; }

  /* --- Kabuliyat --- */
  .braf-kabuliyat-wrapper { margin-top: 25px; font-size: 14px; line-height: 1.9; }
  .braf-kabuliyat-title {
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 10px;
    font-size: 15px;
  }
  .braf-kabuliyat-text { text-align: justify; }

  /* --- Inline inputs (kabuliyat / sanakhat / tippani) --- */
  .braf-inline-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    margin: 0 4px;
    font-size: 14px;
    font-family: inherit;
  }
  .braf-inline-input.braf-small  { width: 50px; }
  .braf-inline-input.braf-medium { width: 120px; }
  .braf-inline-input.braf-long   { width: 200px; }

  .braf-inline-select {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    margin: 0 4px;
    font-size: 14px;
    font-family: inherit;
  }

  /* --- Date center row --- */
  .braf-date-center-row {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 6px;
    margin: 25px 0;
    font-size: 14px;
  }
  .braf-date-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    text-align: center;
    font-size: 14px;
    font-family: inherit;
  }
  .braf-date-input.braf-small { width: 60px; }

  /* --- Sanakhat --- */
  .braf-sanakhat-title {
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 10px;
    font-size: 15px;
  }
  .braf-sanakhat-paragraph {
    font-size: 14px;
    line-height: 1.9;
    text-align: justify;
    margin-top: 20px;
  }

  /* --- Tippani --- */
  .braf-tippani-section { margin-top: 30px; font-size: 14px; line-height: 1.9; }
  .braf-tippani-heading { text-align: center; margin-bottom: 15px; }
  .braf-tippani-heading h3 { margin: 0; text-decoration: underline; }
  .braf-tippani-heading p  { margin: 4px 0 0; font-size: 13px; }
  .braf-tippani-paragraph  { text-align: justify; }
  .braf-tippani-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
  }
  .braf-tippani-sign { width: 40%; }
  .braf-line-input {
    width: 100%;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 14px;
  }
  .braf-tippani-sign label { display: block; margin-top: 6px; font-size: 13px; }

  /* --- Required star --- */
  .braf-req { color: red; margin: 0 3px; font-weight: bold; }

  /* --- Applicant Details overrides --- */
  .braf-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .braf-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .braf-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .braf-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* --- Submit --- */
  .braf-submit-area { text-align: center; margin-top: 30px; }
  .braf-submit-btn {
    background-color: #343a40;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  .braf-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .braf-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

  /* --- Print --- */
  @media print {
    body * { visibility: hidden; }
    .braf-container,
    .braf-container * { visibility: visible; }
    .braf-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }
    .braf-submit-area { display: none !important; }
    .braf-top-bar     { display: none !important; }
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
    input::placeholder { color: transparent !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: added missing fields for shree-block and kabuliyat inputs
   so they are controlled and submitted with the form.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  // shree block (were uncontrolled — now wired)
  shreeTitle: "",
  shreeOffice: "",
  shreeDistrict: "",
  shreeMunicipality: "",

  // business details
  businessNameNp: "",
  businessNameEn: "",
  businessTole: "",
  businessDistrict: "",
  businessWard: "",
  businessRoad: "",
  businessHouseNo: "",
  businessPhone: "",
  capitalAmount: "",
  capitalInWords: "",
  businessObjective: "",
  mainGoods: "",
  proprietorName: "",
  permDistrict: "",
  permWard: "",
  permTole: "",
  permPhone: "",
  citizenshipNo: "",
  citizenshipIssueDistrict: "",
  citizenshipIssueDate: "",
  tempAddress: "",
  tempDistrict: "",
  tempWard: "",
  tempTole: "",
  grandfatherName: "",
  grandfatherAddress: "",
  fatherName: "",
  fatherAddress: "",
  husbandName: "",
  husbandAddress: "",

  // kabuliyat (were uncontrolled — now wired)
  kabGrandfatherRelation: "नाति",
  kabGrandfatherName: "",
  kabParentRelation: "छोरा",
  kabParentName: "",
  kabAge: "",
  kabFirmName: "",
  kabApplicantName: "",
  kabWardNo: "",

  // kabuliyat date row
  kabYear: "",
  kabMonth: "",
  kabDay: "",
  kabWeekday: "",

  // sanakhat
  selfName: "",
  sanakhatWardNo: "",

  // tippani
  tippaniName: "",
  tippaniBusinessName: "",
  tippaniPeshGarne: "",
  tippaniSadarGarne: "",

  // signature
  applicantSignature: "",
  witnessName: "",

  // applicant details box
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  municipality: MUNICIPALITY?.name || "",
  wardNo: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Helper
───────────────────────────────────────────────────────────────────────────── */
const Required = () => <span className="braf-req">*</span>;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BusinessRegistrationApplicationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.businessNameNp?.trim()) return "व्यवसायको नाम (नेपाली) आवश्यक छ";
    if (!formData.proprietorName?.trim()) return "प्रोप्राइटरको नाम आवश्यक छ";
    if (!formData.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + error);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));

      const res = await axios.post("/api/forms/business-registration", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        setTimeout(() => {
          window.print();
          setFormData(initialState);
          setFormKey((k) => k + 1);
        }, 300);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "केही गल्ती भयो";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="braf-container">
        <form key={formKey} onSubmit={handleSubmit}>

          {/* ── Top Bar ── */}
          <div className="braf-top-bar">
            व्यवसाय दर्ता गर्ने दरखास्त।
            <span className="braf-breadcrumb">
              व्यापार / व्यवसाय &gt; व्यवसाय दर्ता गर्ने दरखास्त
            </span>
          </div>

          {/* ── श्री block ──
              BUG FIX: all four inputs were uncontrolled (no name/value/onChange).
              Now wired to shreeTitle, shreeOffice, shreeDistrict, shreeMunicipality. */}
          <div className="braf-shree-block">
            <div className="braf-shree-row">
              <span>श्री</span>
              <Required />
              <input
                type="text"
                name="shreeTitle"
                value={formData.shreeTitle}
                onChange={handleChange}
                className="braf-name-input"
                placeholder="पदको नाम"
              />
              <span>ज्यू,</span>
            </div>
            <div className="braf-shree-stack">
              <div className="braf-stack-row">
                <Required />
                <input
                  type="text"
                  name="shreeOffice"
                  value={formData.shreeOffice}
                  onChange={handleChange}
                  className="braf-stack-input"
                  placeholder="कार्यालयको नाम"
                />
              </div>
              <div className="braf-stack-row">
                <Required />
                <input
                  type="text"
                  name="shreeDistrict"
                  value={formData.shreeDistrict}
                  onChange={handleChange}
                  className="braf-stack-input"
                  placeholder="जिल्ला"
                />
              </div>
              <div className="braf-stack-row">
                <Required />
                <input
                  type="text"
                  name="shreeMunicipality"
                  value={formData.shreeMunicipality}
                  onChange={handleChange}
                  className="braf-stack-input"
                  placeholder="नगरपालिका/गाउँपालिका"
                />
              </div>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="braf-subject-line">
            <strong>विषय: <u>व्यवसाय दर्ता गर्ने बारे।</u></strong>
          </div>

          <p className="braf-certificate-body">
            महोदय,
            <br />
            तल लेखिए बमोजिमको व्यहोरा जनाइ म/हामीले देहायको फर्म/कम्पनी दर्ता गरी
            पाउँ भनी यो निवेदन पेस गरेका छौं। निवेदनसाथ सक्कली कागजातहरू संलग्न
            गरेका छौं। सो को जाँचबुझ गरी कानुनबमोजिम दर्ता गरिदिनुहुन अनुरोध छ।
          </p>

          {/* ── Main Fields ── */}
          <div className="braf-form-section">

            <div className="braf-form-group-flex">
              <label>१. व्यवसायको पूरा नाम (नेपालीमा): <Required /></label>
              <input type="text" name="businessNameNp" value={formData.businessNameNp} onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex">
              <label>२. व्यवसायको पूरा नाम (अंग्रेजीमा ठूलो अक्षरमा): <Required /></label>
              <input type="text" name="businessNameEn" value={formData.businessNameEn} onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex">
              <label>३. व्यवसायको ठेगाना: <Required /></label>
              <input type="text" name="businessTole"    value={formData.businessTole}    onChange={handleChange} />
              <label>जिल्ला: <Required /></label>
              <input type="text" name="businessDistrict" value={formData.businessDistrict} onChange={handleChange} />
              <label>वडा नं: <Required /></label>
              <input type="text" name="businessWard"    value={formData.businessWard}    onChange={handleChange} />
              <label>बाटो: <Required /></label>
              <input type="text" name="businessRoad"    value={formData.businessRoad}    onChange={handleChange} />
              <label>घर नं: <Required /></label>
              <input type="text" name="businessHouseNo" value={formData.businessHouseNo} onChange={handleChange} />
              <label>फोन: <Required /></label>
              <input type="text" name="businessPhone"   value={formData.businessPhone}   onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex">
              <label>४. व्यवसायमा लगानी गर्ने पूँजी रु: <Required /></label>
              <input type="text" name="capitalAmount"  value={formData.capitalAmount}  onChange={handleChange} />
              <label>(अक्षरेपी): <Required /></label>
              <input type="text" name="capitalInWords" value={formData.capitalInWords} onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex">
              <label>५. व्यवसायको उद्देश्य: <Required /></label>
              <select
                name="businessObjective"
                value={formData.businessObjective}
                onChange={handleChange}
                className="braf-biz-select"
              >
                <option value="">-- छनोट गर्नुहोस् --</option>
                <option value="व्यापार">स्थानीय व्यापार</option>
                <option value="सेवा">सेवामूलक व्यवसाय</option>
              </select>
            </div>

            <div className="braf-form-group-flex">
              <label>६. कारोबार हुने मुख्य वस्तु/सेवाको विवरण: <Required /></label>
              <input type="text" name="mainGoods" value={formData.mainGoods} onChange={handleChange} style={{ flex: 2 }} />
            </div>

            <div className="braf-form-group-flex">
              <label>७. प्रोप्राइटरको पूरा नाम: <Required /></label>
              <input type="text" name="proprietorName" value={formData.proprietorName} onChange={handleChange} />
            </div>

            {/* Permanent Address */}
            <div className="braf-form-group-flex">
              <label>स्थायी ठेगाना (नागरिकता अनुसार):</label>
              <label>जिल्ला: <Required /></label>
              <input type="text" name="permDistrict"             value={formData.permDistrict}             onChange={handleChange} />
              <label>वडा: <Required /></label>
              <input type="text" name="permWard"                 value={formData.permWard}                 onChange={handleChange} />
              <label>टोल: <Required /></label>
              <input type="text" name="permTole"                 value={formData.permTole}                 onChange={handleChange} />
              <label>फोन: <Required /></label>
              <input type="text" name="permPhone"                value={formData.permPhone}                onChange={handleChange} />
              <label>नागरिकता नं: <Required /></label>
              <input type="text" name="citizenshipNo"            value={formData.citizenshipNo}            onChange={handleChange} />
              <label>जारी जिल्ला: <Required /></label>
              <input type="text" name="citizenshipIssueDistrict" value={formData.citizenshipIssueDistrict} onChange={handleChange} />
              <label>जारी मिति: <Required /></label>
              <input type="date" name="citizenshipIssueDate"     value={formData.citizenshipIssueDate}     onChange={handleChange} />
            </div>

            {/* Temporary Address */}
            <div className="braf-form-group-flex">
              <label>हालको ठेगाना: <Required /></label>
              <input type="text" name="tempAddress"  value={formData.tempAddress}  onChange={handleChange} />
              <label>जिल्ला: <Required /></label>
              <input type="text" name="tempDistrict" value={formData.tempDistrict} onChange={handleChange} />
              <label>वडा: <Required /></label>
              <input type="text" name="tempWard"     value={formData.tempWard}     onChange={handleChange} />
              <label>टोल: <Required /></label>
              <input type="text" name="tempTole"     value={formData.tempTole}     onChange={handleChange} />
            </div>

            {/* तीन पुस्ते */}
            <div className="braf-form-group-flex">
              <label>८. प्रोप्राइटरको तीन पुस्ते:</label>
            </div>
            <div className="braf-form-group-flex">
              <label>(क) बाजेको नाम: <Required /></label>
              <input type="text" name="grandfatherName"    value={formData.grandfatherName}    onChange={handleChange} />
              <label>ठेगाना: <Required /></label>
              <input type="text" name="grandfatherAddress" value={formData.grandfatherAddress} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>(ख) बाबुको नाम: <Required /></label>
              <input type="text" name="fatherName"    value={formData.fatherName}    onChange={handleChange} />
              <label>ठेगाना: <Required /></label>
              <input type="text" name="fatherAddress" value={formData.fatherAddress} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>(ग) विवाहित महिलाको हकमा पतिको नाम: <Required /></label>
              <input type="text" name="husbandName"    value={formData.husbandName}    onChange={handleChange} />
              <label>ठेगाना: <Required /></label>
              <input type="text" name="husbandAddress" value={formData.husbandAddress} onChange={handleChange} />
            </div>
          </div>

          {/* ── निवेदक right block ── */}
          <div className="braf-right-row-wrapper">
            <div className="braf-right-row-title">निवेदक</div>
            <div className="braf-right-row">
              <label className="braf-right-label">प्रोप्राइटरको नाम : <Required /></label>
              <input
                type="text"
                name="proprietorName"
                value={formData.proprietorName}
                onChange={handleChange}
                className="braf-right-row-input"
              />
            </div>
          </div>

          {/* ── Signature + Thumbprint ── */}
          <div className="braf-right-signature-wrapper">
            <div className="braf-signature-row">
              <label>सही :</label>
              <input
                type="text"
                name="applicantSignature"
                value={formData.applicantSignature}
                readOnly
                className="braf-signature-input"
              />
            </div>
            <div className="braf-thumb-box-wrapper">
              <div className="braf-thumb-header">
                <span>दायाँ</span>
                <span>बायाँ</span>
              </div>
              <div className="braf-thumb-body">
                <div className="braf-thumb-cell"></div>
                <div className="braf-thumb-cell"></div>
              </div>
            </div>
          </div>

          {/* ── Kabuliyat ──
              BUG FIX: all inline inputs were uncontrolled. Now wired to
              kabGrandfatherRelation, kabGrandfatherName, kabParentRelation,
              kabParentName, kabAge, kabFirmName, kabApplicantName, kabWardNo. */}
          <div className="braf-kabuliyat-wrapper">
            <div className="braf-kabuliyat-title">कबुलियतनामा</div>
            <p className="braf-kabuliyat-text">
              लिखितम्
              <Required />
              <input
                type="text"
                name="kabGrandfatherName"
                value={formData.kabGrandfatherName}
                onChange={handleChange}
                className="braf-inline-input braf-long"
              />
              को नातो
              <select
                name="kabGrandfatherRelation"
                value={formData.kabGrandfatherRelation}
                onChange={handleChange}
                className="braf-inline-select"
              >
                <option>नाति</option>
                <option>नातिनी</option>
              </select>
              <Required />
              <input
                type="text"
                name="kabParentName"
                value={formData.kabParentName}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              को
              <select
                name="kabParentRelation"
                value={formData.kabParentRelation}
                onChange={handleChange}
                className="braf-inline-select"
              >
                <option value="">छनोट</option>
                <option>छोरा</option>
                <option>छोरी</option>
              </select>
              <Required />
              <input
                type="text"
                name="kabApplicantName"
                value={formData.kabApplicantName}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              बसे वर्ष
              <Required />
              <input
                type="text"
                name="kabAge"
                value={formData.kabAge}
                onChange={handleChange}
                className="braf-inline-input braf-small"
              />
              को
              <Required />
              <input
                type="text"
                name="kabFirmName"
                value={formData.kabFirmName}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              अगाडि
              <Required />
              <input
                type="text"
                name="kabWardNo"
                value={formData.kabWardNo}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              को नामले व्यवसाय दर्ता गर्न निले यस वडा कार्यालयमा दरखास्त दिएकोमा
              उक्त व्यवसाय सम्बन्धमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा
              नियम समेत पालना गरी काम गर्नेछु। सो पालना गर्ने कुरामा कबुलियत समेत
              गर्ने तपाईको मंजुर छ / छैन भनी वडा कार्यालयबाट सोधनी भएकोमा मेरो
              चित्त बुझ्यो। यसमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा नियम
              उल्लंघन गरेको देखिएमा ऐन कानुन बमोजिम सहुँला, बुझाउँला पनि मेरो
              मनोमानी राजी खुशी संग यो कबुलियत नामको कागज लेखी
              <Required />
              <input
                type="text"
                name="kabApplicantName"
                value={formData.kabApplicantName}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              वडा नं
              <Required />
              <input
                type="text"
                name="kabWardNo"
                value={formData.kabWardNo}
                onChange={handleChange}
                className="braf-inline-input braf-small"
              />
              को कार्यालयमा चढाएँ।
            </p>
          </div>

          {/* ── Date row ── */}
          <div className="braf-date-center-row">
            <span>ईतिसंवत</span>
            <Required />
            <input
              type="text"
              name="kabYear"
              value={formData.kabYear}
              onChange={handleChange}
              className="braf-date-input braf-small"
            />
            <span>साल</span>
            <Required />
            <input
              type="text"
              name="kabMonth"
              value={formData.kabMonth}
              onChange={handleChange}
              className="braf-date-input braf-small"
            />
            <span>महिना</span>
            <Required />
            <input
              type="text"
              name="kabDay"
              value={formData.kabDay}
              onChange={handleChange}
              className="braf-date-input braf-small"
            />
            <span>गतेरोज</span>
            <Required />
            <input
              type="text"
              name="kabWeekday"
              value={formData.kabWeekday}
              onChange={handleChange}
              className="braf-date-input braf-small"
            />
            <span>शुभम्</span>
          </div>

          {/* ── Sanakhat ── */}
          <div className="braf-sanakhat-title">(सनाखत सम्बन्धी कागजात)</div>
          <div className="braf-sanakhat-paragraph">
            यसमा लेखिएको फारम तथा कबुलियतनामा म आफै स्वयं
            <Required />
            <input
              type="text"
              name="selfName"
              value={formData.selfName}
              onChange={handleChange}
              className="braf-inline-input braf-long"
            />
            को
            <Required />
            <input
              type="text"
              name="sanakhatWardNo"
              value={formData.sanakhatWardNo}
              onChange={handleChange}
              className="braf-inline-input braf-small"
            />
            नं वडा कार्यालयमा उपस्थित भई दर्ता गरिएको हुँ । निवेदन संग संलग्न
            नागरिकता प्रमाणपत्रको प्रतिलिपी फोटो तथा अन्य कागजातहरु मेरा आफ्नै
            हुन् । माथि उल्लिखित सम्पूर्ण व्यहोरा समेत साँचो हो । कुनै कुरा फरक
            परेमा कानून बमोजिम सहुँला बुझाउँला पनि सनाखत गर्ने ।
          </div>

          {/* ── Witness signature ── */}
          <div className="braf-right-signature-wrapper">
            <div className="braf-signature-row">
              <label>प्रोप्राइटरको नाम : <Required /></label>
              <input
                type="text"
                name="witnessName"
                value={formData.witnessName}
                onChange={handleChange}
                className="braf-signature-input"
              />
            </div>
            <div className="braf-thumb-box-wrapper">
              <div className="braf-thumb-header">
                <span>दायाँ</span>
                <span>बायाँ</span>
              </div>
              <div className="braf-thumb-body">
                <div className="braf-thumb-cell"></div>
                <div className="braf-thumb-cell"></div>
              </div>
            </div>
          </div>

          {/* ── Tippani ── */}
          <div className="braf-tippani-section">
            <div className="braf-tippani-heading">
              <h3>टिप्पणी</h3>
              <p>(वडा कार्यालयले मात्र भर्ने)</p>
            </div>
            <div className="braf-tippani-paragraph">
              श्रीमान्
              <Required />
              <input
                type="text"
                name="tippaniName"
                value={formData.tippaniName}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              नामक व्यवसाय
              <Required />
              <input
                type="text"
                name="tippaniBusinessName"
                value={formData.tippaniBusinessName}
                onChange={handleChange}
                className="braf-inline-input braf-long"
              />
              को नाममा दर्ता गरी पाउन आवश्यक सबै कागजातहरु रितपूर्वक पेश हुन आएको
              माग बमोजिम दर्ता गरिदिन मनासिव र <Required />
              अख्तेयी र <Required />
              <input
                type="text"
                name="tippaniSadarGarne"
                value={formData.tippaniSadarGarne}
                onChange={handleChange}
                className="braf-inline-input braf-medium"
              />
              राजश्व लिई निजको नाममा व्यवसाय दर्ता गरी प्रमाणपत्र दिनको निमित्त
              निर्णयार्थ पेश गरेको छु ।
            </div>
            <div className="braf-tippani-footer">
              <div className="braf-tippani-sign">
                <Required />
                <input
                  type="text"
                  name="tippaniPeshGarne"
                  value={formData.tippaniPeshGarne}
                  onChange={handleChange}
                  className="braf-line-input"
                />
                <label>पेश गर्ने</label>
              </div>
              <div className="braf-tippani-sign">
                <Required />
                <input
                  type="text"
                  name="tippaniSadarGarne"
                  value={formData.tippaniSadarGarne}
                  onChange={handleChange}
                  className="braf-line-input"
                />
                <label>सदर गर्ने</label>
              </div>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="braf-submit-area">
            <button type="submit" className="braf-submit-btn" disabled={submitting}>
              {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default BusinessRegistrationApplicationForm;