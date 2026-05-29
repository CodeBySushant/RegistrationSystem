import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useWardForm } from "../../hooks/useWardForm";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   STYLES  (prefix: braf-)
───────────────────────────────────────────── */
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

  /* All inputs/selects/textareas white */
  .braf-container input,
  .braf-container select,
  .braf-container textarea {
    background-color: #fff !important;
    color: #000;
    font-family: inherit;
    font-size: 14px;
  }

  .braf-container textarea {
    border: 1px dotted #000 !important;
    min-height: 40px;
    padding: 5px;
    box-sizing: border-box;
    resize: vertical;
  }

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

  .braf-header-row { margin-bottom: 20px; }

  .braf-shree-block { width: 100%; max-width: 500px; margin-top: 20px; }
  .braf-shree-row   { display: flex; align-items: baseline; gap: 6px; margin-bottom: 12px; font-size: 14px; }
  .braf-name-input  {
    width: 220px;
    border: none;
    border-bottom: 1px dotted #000;
    background-color: #fff !important;
    font-family: inherit;
    font-size: 14px;
    padding: 2px 4px;
    outline: none;
  }
  .braf-shree-stack  { display: flex; flex-direction: column; gap: 10px; }
  .braf-stack-row    { display: flex; align-items: center; gap: 6px; }
  .braf-stack-input  {
    width: 100%;
    border: none;
    border-bottom: 1px dotted #000;
    background-color: #fff !important;
    height: 30px;
    font-family: inherit;
    font-size: 14px;
    padding: 2px 4px;
    outline: none;
  }

  .braf-subject-line    { text-align: center; margin: 10px 0 20px; font-size: 16px; font-weight: bold; }
  .braf-certificate-body {
    line-height: 1.8; font-size: 14px;
    text-align: justify; margin-bottom: 15px; text-indent: 40px;
  }

  .braf-form-section { margin-bottom: 0; }
  .braf-form-group-flex {
    display: flex; align-items: baseline;
    margin-bottom: 10px; flex-wrap: wrap;
  }
  .braf-form-group-flex label { font-weight: normal; margin-right: 5px; white-space: nowrap; }
  .braf-form-group-flex input {
    width: 180px;
    margin-right: 10px;
    border: none;
    border-bottom: 1px dotted #000;
    background-color: #fff !important;
    font-family: inherit;
    font-size: 14px;
    padding: 2px 4px;
    outline: none;
    flex-grow: 0;
  }
  /* Long inputs */
  input[name="businessNameNp"],
  input[name="businessNameEn"],
  input[name="mainGoods"] {
  width: 700px !important;
  }

  /* Medium inputs */
  input[name="capitalAmount"],
  input[name="capitalInWords"],
  input[name="grandfatherName"],
  input[name="grandfatherAddress"],
  input[name="fatherName"],
  input[name="fatherAddress"],
  input[name="husbandName"],
  input[name="husbandAddress"] {
  width: 300px !important;
  }

  /* Small inputs */
  input[name="businessWard"],
  input[name="permWard"],
  input[name="tempWard"] {
  width: 80px !important;
  }

  /* Phone inputs */
  input[name="businessPhone"],
  input[name="permPhone"] {
  width: 160px !important;
  }
  .braf-biz-select {
    border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important;
    font-family: inherit; font-size: 14px; margin-right: 15px;
    padding: 2px 4px; outline: none;
  }

  .braf-right-row-wrapper  { display: flex; flex-direction: column; align-items: flex-end; margin-top: 20px; }
  .braf-right-row-title    { font-weight: bold; font-size: 15px; margin-bottom: 6px; }
  .braf-right-row          { display: flex; align-items: baseline; gap: 8px; }
  .braf-right-label        { white-space: nowrap; font-size: 14px; }
  .braf-right-row-input    {
    width: 260px; border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important; font-size: 14px; font-family: inherit;
    padding: 2px 4px; outline: none;
  }

  .braf-right-signature-wrapper { display: flex; flex-direction: column; align-items: flex-end; margin-top: 25px; }
  .braf-signature-row           { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
  .braf-signature-row label     { font-size: 14px; }
  .braf-signature-input {
    width: 200px; border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important; font-size: 14px; font-family: inherit;
    padding: 2px 4px; outline: none;
  }
  .braf-signature-input[readonly] { cursor: not-allowed; background-color: #f5f5f5 !important; }

  .braf-thumb-box-wrapper { width: 260px; border: 1px solid #000; }
  .braf-thumb-header {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #000; text-align: center;
    font-weight: bold; font-size: 14px;
  }
  .braf-thumb-header span { padding: 4px 0; border-right: 1px solid #000; }
  .braf-thumb-header span:last-child { border-right: none; }
  .braf-thumb-body { display: grid; grid-template-columns: 1fr 1fr; height: 120px; }
  .braf-thumb-cell { border-right: 1px solid #000; }
  .braf-thumb-cell:last-child { border-right: none; }

  .braf-kabuliyat-wrapper { margin-top: 25px; font-size: 14px; line-height: 1.9; }
  .braf-kabuliyat-title   { text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 10px; font-size: 15px; }
  .braf-kabuliyat-text    { text-align: justify; }

  .braf-inline-input {
    border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important;
    margin: 0 4px; font-size: 14px; font-family: inherit;
    padding: 2px 4px; outline: none;
  }
  .braf-inline-input.braf-small  { width: 50px; }
  .braf-inline-input.braf-medium { width: 120px; }
  .braf-inline-input.braf-long   { width: 200px; }

  .braf-inline-select {
    border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important;
    margin: 0 4px; font-size: 14px; font-family: inherit;
    padding: 2px 4px; outline: none;
  }

  .braf-date-center-row {
    display: flex; justify-content: center; align-items: baseline;
    gap: 6px; margin: 25px 0; font-size: 14px;
  }
  .braf-date-input {
    border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important;
    text-align: center; font-size: 14px; font-family: inherit;
    padding: 2px 4px; outline: none;
  }
  .braf-date-input.braf-small { width: 60px; }

  .braf-sanakhat-title     { text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 10px; font-size: 15px; }
  .braf-sanakhat-paragraph { font-size: 14px; line-height: 1.9; text-align: justify; margin-top: 20px; }

  .braf-tippani-section  { margin-top: 30px; font-size: 14px; line-height: 1.9; }
  .braf-tippani-heading  { text-align: center; margin-bottom: 15px; }
  .braf-tippani-heading h3 { margin: 0; text-decoration: underline; }
  .braf-tippani-heading p  { margin: 4px 0 0; font-size: 13px; }
  .braf-tippani-paragraph  { text-align: justify; }
  .braf-tippani-footer     { display: flex; justify-content: space-between; margin-top: 35px; }
  .braf-tippani-sign       { width: 40%; }
  .braf-line-input {
    width: 100%; border: none; border-bottom: 1px dotted #000;
    background-color: #fff !important;
    font-family: inherit; font-size: 14px;
    padding: 2px 4px; outline: none;
  }
  .braf-tippani-sign label { display: block; margin-top: 6px; font-size: 13px; }

  .braf-req { color: red; margin: 0 3px; font-weight: bold; }

  /* Applicant Details overrides */
  .braf-container .applicant-details-box {
    border: 1px solid #ddd; padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px; border-radius: 4px;
  }
  .braf-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem; margin: 0 0 15px 0;
    border-bottom: 1px solid #eee; padding-bottom: 8px;
  }
  .braf-container .applicant-details-box .details-grid {
    display: flex !important; flex-direction: column !important; gap: 18px !important;
  }
  .braf-container .applicant-details-box .detail-input {
    max-width: 400px; width: 100%;
    border: 1px solid #ddd; padding: 8px;
    border-radius: 4px; box-sizing: border-box;
    background-color: #fff !important;
  }

  /* Two footer buttons */
  .braf-submit-area { display: flex; justify-content: center; gap: 12px; margin-top: 30px; }
  .braf-submit-btn {
    background-color: #2c3e50; color: white;
    padding: 12px 25px; border: none; border-radius: 5px;
    cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
  }
  .braf-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
  .braf-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }
  .braf-print-btn {
    background-color: #1a6b3a; color: white;
    padding: 12px 25px; border: none; border-radius: 5px;
    cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
  }
  .braf-print-btn:hover:not(:disabled) { background-color: #145530; }
  .braf-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

  @media print {
    body * { visibility: hidden; }
    .braf-container, .braf-container * { visibility: visible; }
    .braf-container {
      position: absolute; left: 0; top: 0; width: 100%;
      box-shadow: none; border: none; margin: 0; padding: 0; background: white;
    }
    .braf-submit-area, .braf-top-bar { display: none !important; }
  input, select, textarea {
    color: #000 !important;
    -webkit-text-fill-color: #000 !important;
    background: transparent !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    opacity: 1 !important;
  -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
    input::placeholder { color: transparent !important; }
  }
`;

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  shreeTitle:                "",
  shreeOffice:               "",
  shreeDistrict:             "",
  shreeMunicipality:         "",
  businessNameNp:            "",
  businessNameEn:            "",
  businessTole:              "",
  businessDistrict:          "",
  businessWard:              "",
  businessRoad:              "",
  businessHouseNo:           "",
  businessPhone:             "",
  capitalAmount:             "",
  capitalInWords:            "",
  businessObjective:         "",
  mainGoods:                 "",
  mainProprietorName:        "",
  rightProprietorName:       "",
  kabApplicantName1:         "",
  kabApplicantName2:         "",
  kabWardNo1:                "",
  kabWardNo2:                "",
  permDistrict:              "",
  permWard:                  "",
  permTole:                  "",
  permPhone:                 "",
  citizenshipNo:             "",
  citizenshipIssueDistrict:  "",
  citizenshipIssueDate:      "",
  tempAddress:               "",
  tempDistrict:              "",
  tempWard:                  "",
  tempTole:                  "",
  grandfatherName:           "",
  grandfatherAddress:        "",
  fatherName:                "",
  fatherAddress:             "",
  husbandName:               "",
  husbandAddress:            "",
  kabGrandfatherRelation:    "नाति",
  kabGrandfatherName:        "",
  kabParentRelation:         "छोरा",
  kabParentName:             "",
  kabAge:                    "",
  kabFirmName:               "",
  kabYear:                   "",
  kabMonth:                  "",
  kabDay:                    "",
  kabWeekday:                "",
  selfName:                  "",
  sanakhatWardNo:            "",
  tippaniName:               "",
  tippaniBusinessName:       "",
  tippaniPeshGarne:          "",
  tippaniSadarGarneText: "",
  tippaniSadarGarneSign: "",
  applicantSignature:        "",
  witnessName:               "",
  applicantName:             "",
  applicantAddress:          "",
  applicantCitizenship:      "",
  applicantPhone:            "",
  municipality:              MUNICIPALITY?.name || "",
  // ward_no injected by useWardForm
};

const Required = () => <span className="braf-req">*</span>;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const BusinessRegistrationApplicationForm = () => {
  const { user } = useAuth();
  // useWardForm: auto-fills form.ward_no from logged-in user's ward
  const { form: wardForm, setForm: setWardForm, handleChange: handleWardChange } = useWardForm(INITIAL_STATE);
  const [formData, setFormDataRaw] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  // Merged form — ward_no always from useWardForm
  const formData2 = { ...formData, ward_no: wardForm.ward_no };

  const handleChange = (e) => {
    handleWardChange(e);
    const { name, value } = e.target;
    setFormDataRaw((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!formData2.businessNameNp?.trim()) return "व्यवसायको नाम (नेपाली) आवश्यक छ";
    if (!formData2.mainProprietorName?.trim()) return "प्रोप्राइटरको नाम आवश्यक छ";
    if (!formData2.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!formData2.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (submitting) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData2 };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/business-registration", payload);

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        }
        setFormDataRaw(INITIAL_STATE);
        setWardForm((p) => ({ ...p, ...INITIAL_STATE }));
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "केही गल्ती भयो";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Clean print window ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const f = formData2;
    const val = (v) => `<span class="value">${v || ""}</span>`;

    const content = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<title>व्यवसाय दर्ता दरखास्त</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Kalimati','Kokila',Arial,sans-serif; color:#000; background:white; padding:12mm 18mm; font-size:10pt; line-height:1.8; }
  .header { text-align:center; margin-bottom:16px; position:relative; min-height:80px; }
  .logo { position:absolute; left:0; top:0; width:65px; }
  .mun-name   { color:#c0392b; font-size:18pt; font-weight:700; }
  .ward-title { color:#c0392b; font-size:14pt; font-weight:700; margin:3px 0; }
  .addr       { color:#c0392b; font-size:9pt; }
  .section-title { font-weight:bold; text-decoration:underline; text-align:center; margin:14px 0 8px; font-size:11pt; }
  .field-row  { display:flex; flex-wrap:wrap; margin-bottom:6px; align-items:baseline; gap:4px; font-size:10pt; }
  .field-label { min-width:200px; font-weight:normal; }
  /* value spans size to content — no fixed min-width so small values
     don't leave big gaps and long values don't get clipped/merged */
  .value { font-weight:bold; padding:0 3px; white-space:nowrap; }
  .body-para { text-align:justify; line-height:1.9; margin-bottom:10px; text-indent:30px; }
  .right-block { display:flex; flex-direction:column; align-items:flex-end; margin-top:16px; }
  .thumb-box { width:240px; border:1px solid #000; }
  .thumb-header { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid #000; text-align:center; font-weight:bold; font-size:9pt; }
  .thumb-header span { padding:3px 0; border-right:1px solid #000; }
  .thumb-header span:last-child { border-right:none; }
  .thumb-body { display:grid; grid-template-columns:1fr 1fr; height:100px; }
  .thumb-cell { border-right:1px solid #000; }
  .thumb-cell:last-child { border-right:none; }
  .date-center { text-align:center; margin:18px 0; font-size:10pt; }
  .tippani-footer { display:flex; justify-content:space-between; margin-top:24px; }
  .tippani-sign { width:40%; }
  .tippani-line { border-bottom:1px solid #000; margin-bottom:4px; min-height:20px; }
  .applicant-box { border:1px solid #999; padding:12px; margin-top:16px; border-radius:3px; }
  .applicant-title { font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:4px; margin-bottom:8px; font-size:10pt; }
  .a-row { display:flex; margin-bottom:6px; font-size:9pt; }
  .a-label { min-width:150px; font-weight:600; }
  .a-val   { flex:1; }
</style>
</head><body>
  <div class="header">
    <img class="logo" src="/nepallogo.svg" alt="Nepal"/>
    <div class="mun-name">${MUNICIPALITY.name}</div>
    <div class="ward-title">${wardTitle}</div>
    <div class="addr">${MUNICIPALITY.officeLine}</div>
    <div class="addr">${MUNICIPALITY.provinceLine}</div>
  </div>

  <div>श्री ${val(f.shreeTitle)} ज्यू,<br/>${val(f.shreeOffice)}<br/>${val(f.shreeDistrict)}<br/>${val(f.shreeMunicipality)}</div>

  <div class="section-title">विषय: व्यवसाय दर्ता गर्ने बारे।</div>
  <p class="body-para">महोदय, तल लेखिए बमोजिमको व्यहोरा जनाइ म/हामीले देहायको फर्म/कम्पनी दर्ता गरी पाउँ भनी यो निवेदन पेस गरेका छौं।</p>

  <div class="field-row"><span class="field-label">१. व्यवसायको नाम (नेपाली):</span>${val(f.businessNameNp)}</div>
  <div class="field-row"><span class="field-label">२. व्यवसायको नाम (अंग्रेजी):</span>${val(f.businessNameEn)}</div>
  <div class="field-row"><span class="field-label">३. ठेगाना:</span>${val(f.businessTole)} जिल्ला: ${val(f.businessDistrict)} वडा: ${val(f.businessWard)} बाटो: ${val(f.businessRoad)} घर नं: ${val(f.businessHouseNo)} फोन: ${val(f.businessPhone)}</div>
  <div class="field-row"><span class="field-label">४. पूँजी रु:</span>${val(f.capitalAmount)} (${val(f.capitalInWords)})</div>
  <div class="field-row"><span class="field-label">५. उद्देश्य:</span>${val(f.businessObjective)}</div>
  <div class="field-row"><span class="field-label">६. मुख्य वस्तु/सेवा:</span>${val(f.mainGoods)}</div>
  <div class="field-row"><span class="field-label">७. प्रोप्राइटरको नाम:</span>${val(f.mainProprietorName)}</div>
  <div class="field-row"><span class="field-label">स्थायी ठेगाना:</span>जिल्ला ${val(f.permDistrict)} वडा ${val(f.permWard)} टोल ${val(f.permTole)} फोन ${val(f.permPhone)}</div>
  <div class="field-row"><span class="field-label">नागरिकता नं:</span>${val(f.citizenshipNo)} जारी जिल्ला: ${val(f.citizenshipIssueDistrict)} मिति: ${val(f.citizenshipIssueDate)}</div>
  <div class="field-row"><span class="field-label">हालको ठेगाना:</span>${val(f.tempAddress)} जिल्ला ${val(f.tempDistrict)} वडा ${val(f.tempWard)} टोल ${val(f.tempTole)}</div>
  <div class="field-row"><span class="field-label">बाजेको नाम:</span>${val(f.grandfatherName)} ठेगाना: ${val(f.grandfatherAddress)}</div>
  <div class="field-row"><span class="field-label">बाबुको नाम:</span>${val(f.fatherName)} ठेगाना: ${val(f.fatherAddress)}</div>
  <div class="field-row"><span class="field-label">पतिको नाम:</span>${val(f.husbandName)} ठेगाना: ${val(f.husbandAddress)}</div>

  <div class="right-block">
    <div>निवेदक: ${val(f.mainProprietorName)}</div>
    <div style="margin-top:10px">सही: <span style="border-bottom:1px solid #000;display:inline-block;width:180px;"></span></div>
    <div class="thumb-box" style="margin-top:10px">
      <div class="thumb-header"><span>दायाँ</span><span>बायाँ</span></div>
      <div class="thumb-body"><div class="thumb-cell"></div><div class="thumb-cell"></div></div>
    </div>
  </div>

  <div class="section-title">कबुलियतनामा</div>
  <p class="body-para">
    लिखितम् ${val(f.kabGrandfatherName)} को नातो ${val(f.kabGrandfatherRelation)}
    ${val(f.kabParentName)} को ${val(f.kabParentRelation)}
    ${val(f.kabApplicantName1)} बसे वर्ष ${val(f.kabAge)} को
    ${val(f.kabFirmName)} अगाडि ${val(f.kabWardNo1)} को नामले व्यवसाय दर्ता गर्न ...
    ${val(f.kabApplicantName2)} वडा नं ${val(f.kabWardNo2)} को कार्यालयमा चढाएँ।
  </p>
  <div class="date-center">ईतिसंवत ${val(f.kabYear)} साल ${val(f.kabMonth)} महिना ${val(f.kabDay)} गतेरोज ${val(f.kabWeekday)} शुभम्</div>

  <div class="section-title">(सनाखत सम्बन्धी कागजात)</div>
  <p class="body-para">यसमा लेखिएको फारम तथा कबुलियतनामा म आफै स्वयं ${val(f.selfName)} को ${val(f.sanakhatWardNo)} नं वडा कार्यालयमा उपस्थित भई दर्ता गरिएको हुँ।</p>

  <div class="right-block">
    <div>प्रोप्राइटरको नाम: ${val(f.witnessName)}</div>
    <div class="thumb-box" style="margin-top:10px">
      <div class="thumb-header"><span>दायाँ</span><span>बायाँ</span></div>
      <div class="thumb-body"><div class="thumb-cell"></div><div class="thumb-cell"></div></div>
    </div>
  </div>

  <div class="section-title">टिप्पणी</div>
  <p class="body-para">श्रीमान् ${val(f.tippaniName)} नामक व्यवसाय ${val(f.tippaniBusinessName)} को नाममा दर्ता गरी पाउन आवश्यक सबै कागजातहरु रितपूर्वक पेश हुन आएको।</p>
  <div class="tippani-footer">
    <div class="tippani-sign"><div class="tippani-line">${f.tippaniPeshGarne || ""}</div><div>पेश गर्ने</div></div>
    <div class="tippani-sign"><div class="tippani-line">${f.tippaniSadarGarneSign || ""}</div><div>सदर गर्ने</div></div>
  </div>

  <div class="applicant-box">
    <div class="applicant-title">निवेदकको विवरण</div>
    <div class="a-row"><span class="a-label">नाम:</span><span class="a-val">${f.applicantName}</span></div>
    <div class="a-row"><span class="a-label">ठेगाना:</span><span class="a-val">${f.applicantAddress}</span></div>
    <div class="a-row"><span class="a-label">नागरिकता नं.:</span><span class="a-val">${f.applicantCitizenship}</span></div>
    <div class="a-row"><span class="a-label">फोन:</span><span class="a-val">${f.applicantPhone}</span></div>
  </div>
</body></html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(content);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="braf-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(false); }}>

          {/* ── Top Bar ── */}
          <div className="braf-top-bar">
            व्यवसाय दर्ता गर्ने दरखास्त।
            <span className="braf-breadcrumb">व्यापार / व्यवसाय &gt; व्यवसाय दर्ता गर्ने दरखास्त</span>
          </div>

          {/* ── Municipality Header ── */}
          <div className="braf-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── श्री block ── */}
          <div className="braf-shree-block">
            <div className="braf-shree-row">
              <span>श्री</span><Required />
              <input type="text" name="shreeTitle" value={formData2.shreeTitle} onChange={handleChange} className="braf-name-input" placeholder="पदको नाम" />
              <span>ज्यू,</span>
            </div>
            <div className="braf-shree-stack">
              <div className="braf-stack-row"><Required /><input type="text" name="shreeOffice"       value={formData2.shreeOffice}       onChange={handleChange} className="braf-stack-input" placeholder="कार्यालयको नाम" /></div>
              <div className="braf-stack-row"><Required /><input type="text" name="shreeDistrict"     value={formData2.shreeDistrict}     onChange={handleChange} className="braf-stack-input" placeholder="जिल्ला" /></div>
              <div className="braf-stack-row"><Required /><input type="text" name="shreeMunicipality" value={formData2.shreeMunicipality} onChange={handleChange} className="braf-stack-input" placeholder="नगरपालिका/गाउँपालिका" /></div>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="braf-subject-line"><strong>विषय: <u>व्यवसाय दर्ता गर्ने बारे।</u></strong></div>

          <p className="braf-certificate-body">
            महोदय,<br />
            तल लेखिए बमोजिमको व्यहोरा जनाइ म/हामीले देहायको फर्म/कम्पनी दर्ता गरी पाउँ भनी यो निवेदन पेस गरेका छौं।
            निवेदनसाथ सक्कली कागजातहरू संलग्न गरेका छौं। सो को जाँचबुझ गरी कानुनबमोजिम दर्ता गरिदिनुहुन अनुरोध छ।
          </p>

          {/* ── Main Fields ── */}
          <div className="braf-form-section">

            <div className="braf-form-group-flex">
              <label>१. व्यवसायको पूरा नाम (नेपालीमा): <Required /></label>
              <input type="text" name="businessNameNp" value={formData2.businessNameNp} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>२. व्यवसायको पूरा नाम (अंग्रेजीमा): <Required /></label>
              <input type="text" name="businessNameEn" value={formData2.businessNameEn} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>३. व्यवसायको ठेगाना: <Required /></label>
              <input type="text" name="businessTole"    value={formData2.businessTole}    onChange={handleChange} />
              <label>जिल्ला: <Required /></label>
              <input type="text" name="businessDistrict" value={formData2.businessDistrict} onChange={handleChange} />
              <label>वडा नं: <Required /></label>
              <input type="text" name="businessWard"    value={formData2.businessWard}    onChange={handleChange} />
              <label>बाटो: <Required /></label>
              <input type="text" name="businessRoad"    value={formData2.businessRoad}    onChange={handleChange} />
              <label>घर नं: <Required /></label>
              <input type="text" name="businessHouseNo" value={formData2.businessHouseNo} onChange={handleChange} />
              <label>फोन: <Required /></label>
              <input type="text" name="businessPhone"   value={formData2.businessPhone}   onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>४. पूँजी रु: <Required /></label>
              <input type="text" name="capitalAmount"  value={formData2.capitalAmount}  onChange={handleChange} />
              <label>(अक्षरेपी): <Required /></label>
              <input type="text" name="capitalInWords" value={formData2.capitalInWords} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>५. व्यवसायको उद्देश्य: <Required /></label>
              <select name="businessObjective" value={formData2.businessObjective} onChange={handleChange} className="braf-biz-select">
                <option value="">-- छनोट गर्नुहोस् --</option>
                <option value="व्यापार">स्थानीय व्यापार</option>
                <option value="सेवा">सेवामूलक व्यवसाय</option>
              </select>
            </div>
            <div className="braf-form-group-flex">
              <label>६. मुख्य वस्तु/सेवाको विवरण: <Required /></label>
              <input type="text" name="mainGoods" value={formData2.mainGoods} onChange={handleChange} style={{ flex: 2 }} />
            </div>
            <div className="braf-form-group-flex">
              <label>७. प्रोप्राइटरको पूरा नाम: <Required /></label>
              <input type="text" name="mainProprietorName" value={formData2.mainProprietorName} onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex">
              <label>स्थायी ठेगाना:</label>
              <label>जिल्ला: <Required /></label><input type="text" name="permDistrict"            value={formData2.permDistrict}            onChange={handleChange} />
              <label>वडा: <Required /></label><input type="text" name="permWard"                   value={formData2.permWard}                onChange={handleChange} />
              <label>टोल: <Required /></label><input type="text" name="permTole"                   value={formData2.permTole}                onChange={handleChange} />
              <label>फोन: <Required /></label><input type="text" name="permPhone"                  value={formData2.permPhone}               onChange={handleChange} />
              <label>नागरिकता नं: <Required /></label><input type="text" name="citizenshipNo"      value={formData2.citizenshipNo}           onChange={handleChange} />
              <label>जारी जिल्ला: <Required /></label><input type="text" name="citizenshipIssueDistrict" value={formData2.citizenshipIssueDistrict} onChange={handleChange} />
              <label>जारी मिति: <Required /></label><input type="date" name="citizenshipIssueDate" value={formData2.citizenshipIssueDate}    onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex">
              <label>हालको ठेगाना: <Required /></label><input type="text" name="tempAddress"  value={formData2.tempAddress}  onChange={handleChange} />
              <label>जिल्ला: <Required /></label><input type="text" name="tempDistrict" value={formData2.tempDistrict} onChange={handleChange} />
              <label>वडा: <Required /></label><input type="text" name="tempWard"     value={formData2.tempWard}     onChange={handleChange} />
              <label>टोल: <Required /></label><input type="text" name="tempTole"     value={formData2.tempTole}     onChange={handleChange} />
            </div>

            <div className="braf-form-group-flex"><label>८. प्रोप्राइटरको तीन पुस्ते:</label></div>
            <div className="braf-form-group-flex">
              <label>(क) बाजेको नाम: <Required /></label><input type="text" name="grandfatherName" value={formData2.grandfatherName} onChange={handleChange} />
              <label>ठेगाना: <Required /></label><input type="text" name="grandfatherAddress" value={formData2.grandfatherAddress} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>(ख) बाबुको नाम: <Required /></label><input type="text" name="fatherName" value={formData2.fatherName} onChange={handleChange} />
              <label>ठेगाना: <Required /></label><input type="text" name="fatherAddress" value={formData2.fatherAddress} onChange={handleChange} />
            </div>
            <div className="braf-form-group-flex">
              <label>(ग) पतिको नाम: <Required /></label><input type="text" name="husbandName" value={formData2.husbandName} onChange={handleChange} />
              <label>ठेगाना: <Required /></label><input type="text" name="husbandAddress" value={formData2.husbandAddress} onChange={handleChange} />
            </div>
          </div>

          {/* ── निवेदक right block ── */}
          <div className="braf-right-row-wrapper">
            <div className="braf-right-row-title">निवेदक</div>
            <div className="braf-right-row">
              <label className="braf-right-label">प्रोप्राइटरको नाम : <Required /></label>
              <input type="text" name="rightProprietorName" value={formData2.rightProprietorName} onChange={handleChange} className="braf-right-row-input" />
            </div>
          </div>

          {/* ── Signature + Thumbprint ── */}
          <div className="braf-right-signature-wrapper">
            <div className="braf-signature-row">
              <label>सही :</label>
              <input type="text" name="applicantSignature" value={formData2.applicantSignature} readOnly className="braf-signature-input" />
            </div>
            <div className="braf-thumb-box-wrapper">
              <div className="braf-thumb-header"><span>दायाँ</span><span>बायाँ</span></div>
              <div className="braf-thumb-body"><div className="braf-thumb-cell"></div><div className="braf-thumb-cell"></div></div>
            </div>
          </div>

          {/* ── Kabuliyat ── */}
          <div className="braf-kabuliyat-wrapper">
            <div className="braf-kabuliyat-title">कबुलियतनामा</div>
            <p className="braf-kabuliyat-text">
              लिखितम् <Required />
              <input type="text" name="kabGrandfatherName" value={formData2.kabGrandfatherName} onChange={handleChange} className="braf-inline-input braf-long" />
              को नातो
              <select name="kabGrandfatherRelation" value={formData2.kabGrandfatherRelation} onChange={handleChange} className="braf-inline-select">
                <option>नाति</option><option>नातिनी</option>
              </select>
              <Required />
              <input type="text" name="kabParentName" value={formData2.kabParentName} onChange={handleChange} className="braf-inline-input braf-medium" />
              को
              <select name="kabParentRelation" value={formData2.kabParentRelation} onChange={handleChange} className="braf-inline-select">
                <option value="">छनोट</option><option>छोरा</option><option>छोरी</option>
              </select>
              <Required />
              <input type="text" name="kabApplicantName1" value={formData2.kabApplicantName1} onChange={handleChange} className="braf-inline-input braf-medium" />
              बसे वर्ष <Required />
              <input type="text" name="kabAge" value={formData2.kabAge} onChange={handleChange} className="braf-inline-input braf-small" />
              को <Required />
              <input type="text" name="kabFirmName" value={formData2.kabFirmName} onChange={handleChange} className="braf-inline-input braf-medium" />
              अगाडि <Required />
              <input type="text" name="kabWardNo1" value={formData2.kabWardNo1} onChange={handleChange} className="braf-inline-input braf-medium" />
              को नामले व्यवसाय दर्ता गर्न निले यस वडा कार्यालयमा दरखास्त दिएकोमा
              उक्त व्यवसाय सम्बन्धमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा नियम समेत पालना गरी काम गर्नेछु।
              ... <Required />
              <input type="text" name="kabApplicantName2" value={formData2.kabApplicantName2} onChange={handleChange} className="braf-inline-input braf-medium" />
              वडा नं <Required />
              <input type="text" name="kabWardNo2" value={formData2.kabWardNo2} onChange={handleChange} className="braf-inline-input braf-small" />
              को कार्यालयमा चढाएँ।
            </p>
          </div>

          {/* ── Date row ── */}
          <div className="braf-date-center-row">
            <span>ईतिसंवत</span><Required />
            <input type="text" name="kabYear"    value={formData2.kabYear}    onChange={handleChange} className="braf-date-input braf-small" />
            <span>साल</span><Required />
            <input type="text" name="kabMonth"   value={formData2.kabMonth}   onChange={handleChange} className="braf-date-input braf-small" />
            <span>महिना</span><Required />
            <input type="text" name="kabDay"     value={formData2.kabDay}     onChange={handleChange} className="braf-date-input braf-small" />
            <span>गतेरोज</span><Required />
            <input type="text" name="kabWeekday" value={formData2.kabWeekday} onChange={handleChange} className="braf-date-input braf-small" />
            <span>शुभम्</span>
          </div>

          {/* ── Sanakhat ── */}
          <div className="braf-sanakhat-title">(सनाखत सम्बन्धी कागजात)</div>
          <div className="braf-sanakhat-paragraph">
            यसमा लेखिएको फारम तथा कबुलियतनामा म आफै स्वयं <Required />
            <input type="text" name="selfName" value={formData2.selfName} onChange={handleChange} className="braf-inline-input braf-long" />
            को <Required />
            <input type="text" name="sanakhatWardNo" value={formData2.sanakhatWardNo} onChange={handleChange} className="braf-inline-input braf-small" />
            नं वडा कार्यालयमा उपस्थित भई दर्ता गरिएको हुँ।
            निवेदन संग संलग्न नागरिकता प्रमाणपत्रको प्रतिलिपी फोटो तथा अन्य कागजातहरु मेरा आफ्नै हुन्।
            माथि उल्लिखित सम्पूर्ण व्यहोरा समेत साँचो हो।
          </div>

          {/* ── Witness signature ── */}
          <div className="braf-right-signature-wrapper">
            <div className="braf-signature-row">
              <label>प्रोप्राइटरको नाम : <Required /></label>
              <input type="text" name="witnessName" value={formData2.witnessName} onChange={handleChange} className="braf-signature-input" />
            </div>
            <div className="braf-thumb-box-wrapper">
              <div className="braf-thumb-header"><span>दायाँ</span><span>बायाँ</span></div>
              <div className="braf-thumb-body"><div className="braf-thumb-cell"></div><div className="braf-thumb-cell"></div></div>
            </div>
          </div>

          {/* ── Tippani ── */}
          <div className="braf-tippani-section">
            <div className="braf-tippani-heading">
              <h3>टिप्पणी</h3>
              <p>(वडा कार्यालयले मात्र भर्ने)</p>
            </div>
            <div className="braf-tippani-paragraph">
              श्रीमान् <Required />
              <input type="text" name="tippaniName" value={formData2.tippaniName} onChange={handleChange} className="braf-inline-input braf-medium" />
              नामक व्यवसाय <Required />
              <input type="text" name="tippaniBusinessName" value={formData2.tippaniBusinessName} onChange={handleChange} className="braf-inline-input braf-long" />
              को नाममा दर्ता गरी पाउन आवश्यक सबै कागजातहरु रितपूर्वक पेश हुन आएको माग बमोजिम दर्ता गरिदिन मनासिव र <Required />
              अख्तेयी र <Required />
              <input type="text" name="tippaniSadarGarneText" value={formData2.tippaniSadarGarneText} onChange={handleChange} className="braf-inline-input braf-medium" />
              राजश्व लिई निजको नाममा व्यवसाय दर्ता गरी प्रमाणपत्र दिनको निमित्त निर्णयार्थ पेश गरेको छु।
            </div>
            <div className="braf-tippani-footer">
              <div className="braf-tippani-sign">
                <Required /><input type="text" name="tippaniPeshGarne" value={formData2.tippaniPeshGarne} onChange={handleChange} className="braf-line-input" />
                <label>पेश गर्ने</label>
              </div>
              <div className="braf-tippani-sign">
                <Required /><input type="text" name="tippaniSadarGarneSign" value={formData2.tippaniSadarGarneSign} onChange={handleChange} className="braf-line-input" />
                <label>सदर गर्ने</label>
              </div>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData2} handleChange={handleChange} />

          {/* ── Two footer buttons ── */}
          <div className="braf-submit-area">
            <button type="submit" className="braf-submit-btn" disabled={submitting}>
              {submitting ? "पठाउँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button type="button" className="braf-print-btn" disabled={submitting} onClick={() => handleSave(true)}>
              {submitting ? "पठाउँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default BusinessRegistrationApplicationForm;