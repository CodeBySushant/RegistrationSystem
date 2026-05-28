import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useWardForm } from "../../hooks/useWardForm";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   PrintField & PrintSelect — MODULE SCOPE ONLY
───────────────────────────────────────────── */
const PrintField = ({ value, isPrint, className = "", name, onChange, required = false, placeholder, type = "text", ...rest }) => {
  if (isPrint) {
    return <span className={`icar-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <span className="icar-req-wrap">
      {required && <span className="icar-req-star">*</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`icar-pf-input ${className}${required ? " icar-has-star" : ""}`}
        required={required}
        {...rest}
      />
    </span>
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`icar-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select name={name} value={value} onChange={onChange} className={`icar-pf-select ${className}`}>
      {children}
    </select>
  );
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  // Addressee — श्रीमान् hardcoded, title editable (initial: अध्यक्षज्यु)
  headerTitle:         "अध्यक्षज्यु",
  headerOffice:        MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  patientName:         "",
  age:                 "",
  gender:              "पुरुष",
  permJilla:           MUNICIPALITY?.englishDistrict || "",
  permPalika:          MUNICIPALITY?.name            || "",
  permWarda:           MUNICIPALITY?.wardNumber      || "",
  tempJilla:           MUNICIPALITY?.englishDistrict || "",
  tempPalika:          MUNICIPALITY?.name            || "",
  tempWarda:           MUNICIPALITY?.wardNumber      || "",
  ethnicity:           "ब्राहमण",
  familySize:          "",
  incomeSource:        "",
  monthlyIncome:       "",
  bankName:            "",
  bankBranch:          "",
  accountNo:           "",
  healthStatus:        "रुहु रोग",
  recommenderRelation: "",
  applicantSigName:    "",
  applicantSigAddress: "",
  applicantSigDate:    "",
  applicantSigPhone:   "",
  recName:             "",
  recPosition:         "पद छनोट गर्नुहोस्",
  recDate:             "",
  recOfficeStamp:      "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

const INITIAL_LAND = [{ id: 1, description: "", location: "" }];

/* ─────────────────────────────────────────────
   STYLES  (prefix: icar-)
───────────────────────────────────────────── */
const styles = `
.icar-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
}

.icar-header-row { margin-bottom: 16px; }

/* Addressee block — stacked layout */
.icar-addressee-block {
  margin-bottom: 16px;
  font-size: 15px;
}
.icar-shree-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
  font-weight: bold;
}
.icar-office-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-left: 4px;
}

/* विषय line */
.icar-subject-line {
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  margin: 16px 0 20px;
  text-decoration: underline;
}

/* Required star wrapper */
.icar-req-wrap {
  position: relative;
  display: inline-block;
  vertical-align: baseline;
}
.icar-req-star {
  position: absolute;
  left: 5px; top: 50%;
  transform: translateY(-50%);
  color: red; font-weight: bold;
  pointer-events: none; font-size: 13px; z-index: 1;
}
.icar-has-star { padding-left: 16px !important; }

/* PrintField screen */
.icar-pf-input {
  display: inline-block; vertical-align: baseline;
  padding: 2px 6px; font-family: inherit; font-size: 15px;
  color: #000; background-color: #fff;
  border: none; border-bottom: 1px dotted #555;
  outline: none; width: 150px; max-width: 100%;
  box-sizing: border-box; transition: border-color 0.15s, background-color 0.15s;
}
.icar-pf-input:focus { border-bottom-color: #3b7dd8; background-color: #f0f7ff; }
.icar-pf-input.short        { width: 70px; }
.icar-pf-input.long         { width: 220px; }
.icar-pf-input.header-field { font-size: 15px; font-weight: bold; width: 220px; border-bottom: 1px dotted #000; }
.icar-pf-input.title-field  { font-size: 15px; font-weight: bold; width: 200px; border-bottom: 1px dotted #000; }
.icar-pf-input.wide         { width: 100%; }

/* PrintField print */
.icar-pf-value {
  display: inline-block; vertical-align: baseline;
  padding: 0 4px; font-family: inherit; font-size: 15px;
  color: #000; min-width: 60px;
  border-bottom: 1px solid #000; word-break: break-word;
}
.icar-pf-value.short        { min-width: 40px; }
.icar-pf-value.long         { min-width: 160px; }
.icar-pf-value.header-field { font-size: 16px; font-weight: bold; min-width: 180px; }

/* PrintSelect screen */
.icar-pf-select {
  display: inline-block; vertical-align: baseline;
  padding: 4px 6px; font-family: inherit; font-size: 14px;
  color: #000; background-color: #fff;
  border: 1px solid #ccc; border-radius: 4px;
  outline: none; cursor: pointer;
}

/* Form sections */
.icar-form-section {
  margin-bottom: 20px; padding: 15px;
  border: 1px solid #ccc; border-radius: 4px;
}
.icar-form-section legend { font-weight: bold; font-size: 16px; padding: 0 10px; }
.icar-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
.icar-form-group { display: flex; flex-direction: column; }
.icar-form-group label { font-size: 14px; font-weight: bold; margin-bottom: 5px; }
.icar-form-group .icar-pf-input { width: 100%; }
.icar-req { color: red; font-weight: bold; }

/* Land table */
.icar-table-wrapper { width: 100%; overflow-x: auto; margin: 10px 0; }
.icar-land-table { width: 100%; min-width: 600px; border-collapse: collapse; }
.icar-land-table th,
.icar-land-table td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: middle; }
.icar-land-table th { background-color: #f0f0f0; font-weight: bold; }
.icar-land-table input { width: 100%; box-sizing: border-box; border: 1px solid #ccc; padding: 6px; font-family: inherit; background-color: #fff; }
.icar-action-cell { width: 50px; text-align: center; }
.icar-add-btn {
  width: 30px; height: 30px; font-size: 20px; font-weight: bold;
  background-color: #007bff; color: white;
  border: none; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center; margin: 0 auto;
}
.icar-add-btn:hover { background-color: #0056b3; }

/* Footer buttons */
.icar-submit-area {
  clear: both; display: flex; justify-content: center;
  gap: 12px; margin-top: 30px; padding-top: 20px;
  border-top: 1px solid #ddd;
}
.icar-submit-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.icar-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.icar-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }
.icar-print-btn {
  background-color: #1a6b3a; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.icar-print-btn:hover:not(:disabled) { background-color: #145530; }
.icar-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

@media print {
  body * { visibility: hidden; }
  .icar-container, .icar-container * { visibility: visible; }
  .icar-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
    font-size: 14px; line-height: 1.6;
  }
  .icar-submit-area { display: none !important; }
  .icar-action-cell { display: none !important; }
  .icar-req-star { display: none !important; }
  .icar-pf-value { border-bottom: 1px solid #000 !important; color: #000 !important; background: transparent !important; }
  input, select, textarea {
    color: #000 !important; -webkit-text-fill-color: #000 !important;
    background: transparent !important; border: none !important;
    border-bottom: 1px solid #000 !important; opacity: 1 !important;
    -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
  }
  input::placeholder, textarea::placeholder { color: transparent !important; -webkit-text-fill-color: transparent !important; }
  .icar-form-section { border: 1px solid #aaa !important; page-break-inside: avoid; break-inside: avoid; }
}

@media (max-width: 768px) {
  .icar-container { width: 100%; padding: 15px; }
  .icar-form-grid { grid-template-columns: 1fr; }
  .icar-pf-input { width: 110px; }
  .icar-pf-input.header-field, .icar-pf-input.title-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ImpoverishedCitizenApplicationandRecommendation = () => {
  const { user } = useAuth();
  const { form: wardForm, setForm: setWardForm, handleChange: handleWardChange } = useWardForm(INITIAL_STATE);
  const [formData, setFormDataRaw] = useState(INITIAL_STATE);
  const [landDetails, setLandDetails] = useState(INITIAL_LAND);
  const [submitting, setSubmitting]   = useState(false);
  const [isPrint, setIsPrint]         = useState(false);

  const form = { ...formData, ward_no: wardForm.ward_no };

  const handleChange = (e) => {
    handleWardChange(e);
    const { name, value } = e.target;
    setFormDataRaw((p) => ({ ...p, [name]: value }));
  };

  const handleLandChange = (index, e) => {
    const { name, value } = e.target;
    setLandDetails((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addLandRow = () => {
    setLandDetails((prev) => [...prev, { id: prev.length + 1, description: "", location: "" }]);
  };

  const validate = (fd, lands) => {
    if (!fd.patientName?.trim())   return "बिरामीको नाम आवश्यक छ";
    if (!fd.permPalika?.trim())    return "स्थायी पालिका आवश्यक छ";
    if (!fd.tempPalika?.trim())    return "अस्थायी पालिका आवश्यक छ";
    if (!fd.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!fd.applicantPhone?.trim()) return "सम्पर्क फोन आवश्यक छ";
    const phoneRegex = /^[0-9+\-\s]{6,20}$/;
    if (fd.applicantSigPhone && !phoneRegex.test(String(fd.applicantSigPhone))) return "निवेदकको फोन नम्बर अमान्य छ";
    if (fd.applicantPhone && !phoneRegex.test(String(fd.applicantPhone)))        return "सम्पर्क फोन नम्बर अमान्य छ";
    for (let i = 0; i < lands.length; i++) {
      const desc = lands[i].description?.trim();
      const loc  = lands[i].location?.trim();
      if ((desc && !loc) || (!desc && loc)) return `जग्गा पङ्क्ति ${i + 1} मा क्षेत्रफल र स्थान दुवै भर्नुहोस्`;
    }
    return null;
  };

  /* ── Single save ── */
  const handleSave = async (shouldPrint = false) => {
    if (submitting) return;

    const err = validate(form, landDetails);
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      payload.landDetails = JSON.stringify(landDetails);

      const res = await axios.post("/api/forms/impoverished-citizen-application", payload);

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormDataRaw(INITIAL_STATE);
        setWardForm((p) => ({ ...p, ...INITIAL_STATE }));
        setLandDetails(INITIAL_LAND);
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

  /* ── Clean print window ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const f = form;
    const val = (v) => `<span class="value">${v || ""}</span>`;
    const landRows = landDetails.map((item, i) =>
      `<tr><td>${i + 1}</td><td>${val(item.description)}</td><td>${val(item.location)}</td></tr>`
    ).join("");

    const content = `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8"/>
  <title>विपन्न नागरिक आवेदन तथा सिफारिस</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Kalimati','Kokila',Arial,sans-serif; color:#000; background:white; padding:12mm 18mm; font-size:10pt; line-height:1.8; }
    .header { text-align:center; margin-bottom:16px; position:relative; min-height:80px; }
    .logo   { position:absolute; left:0; top:0; width:65px; }
    .mun-name   { color:#c0392b; font-size:18pt; font-weight:700; }
    .ward-title { color:#c0392b; font-size:14pt; font-weight:700; margin:3px 0; }
    .addr       { color:#c0392b; font-size:9pt; }
    .addressee  { margin-bottom:10px; font-size:11pt; font-weight:bold; }
    .subject    { text-align:center; font-weight:bold; font-size:11pt; margin:12px 0; text-decoration:underline; }
    .section    { border:1px solid #aaa; padding:10px; margin-bottom:12px; border-radius:3px; page-break-inside:avoid; }
    .section-title { font-weight:bold; font-size:11pt; border-bottom:1px solid #ddd; padding-bottom:4px; margin-bottom:8px; }
    .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
    .field-row { margin-bottom:4px; font-size:10pt; }
    .field-label { font-weight:600; }
    .value { font-weight:bold; padding:0 3px; display:inline-block; min-width:40px; }
    table { width:100%; border-collapse:collapse; }
    th,td { border:1px solid #000; padding:6px; font-size:9pt; }
    th { background:#f0f0f0; }
    .applicant-box { border:1px solid #999; padding:12px; margin-top:12px; }
    .a-title { font-weight:bold; margin-bottom:8px; font-size:10pt; }
    .a-row { display:flex; margin-bottom:4px; font-size:9pt; }
    .a-label { min-width:140px; font-weight:600; }
  </style>
</head><body>
  <div class="header">
    <img class="logo" src="/nepallogo.svg" alt="Nepal"/>
    <div class="mun-name">${MUNICIPALITY.name}</div>
    <div class="ward-title">${wardTitle}</div>
    <div class="addr">${MUNICIPALITY.officeLine}</div>
    <div class="addr">${MUNICIPALITY.provinceLine}</div>
  </div>
  <div class="addressee">
    श्रीमान् ${val(f.headerTitle)},<br/>
    ${val(f.headerOffice)}
  </div>
  <div class="subject">विषय: विपन्न नागरिक आवेदन तथा सिफारिस</div>

  <div class="section">
    <div class="section-title">१. बिरामीको विवरण</div>
    <div class="grid">
      <div class="field-row"><span class="field-label">नाम:</span> ${val(f.patientName)}</div>
      <div class="field-row"><span class="field-label">उमेर:</span> ${val(f.age)}</div>
      <div class="field-row"><span class="field-label">लिङ्ग:</span> ${val(f.gender)}</div>
      <div class="field-row"><span class="field-label">स्थायी जिल्ला:</span> ${val(f.permJilla)}</div>
      <div class="field-row"><span class="field-label">स्थायी पालिका:</span> ${val(f.permPalika)}</div>
      <div class="field-row"><span class="field-label">स्थायी वडा:</span> ${val(f.permWarda)}</div>
      <div class="field-row"><span class="field-label">अस्थायी जिल्ला:</span> ${val(f.tempJilla)}</div>
      <div class="field-row"><span class="field-label">अस्थायी पालिका:</span> ${val(f.tempPalika)}</div>
      <div class="field-row"><span class="field-label">अस्थायी वडा:</span> ${val(f.tempWarda)}</div>
      <div class="field-row"><span class="field-label">जात:</span> ${val(f.ethnicity)}</div>
      <div class="field-row"><span class="field-label">परिवार संख्या:</span> ${val(f.familySize)}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">२. आय स्रोत र मासिक आम्दानी</div>
    <div class="grid">
      <div class="field-row"><span class="field-label">आय स्रोत:</span> ${val(f.incomeSource)}</div>
      <div class="field-row"><span class="field-label">मासिक आम्दानी:</span> ${val(f.monthlyIncome)}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">३. नगद जग्गा</div>
    <table><thead><tr><th>क्र.स.</th><th>क्षेत्रफल</th><th>भूमिस स्थान</th></tr></thead>
    <tbody>${landRows}</tbody></table>
  </div>

  <div class="section">
    <div class="section-title">४. बैंक विवरण</div>
    <div class="grid">
      <div class="field-row"><span class="field-label">बैंकको नाम:</span> ${val(f.bankName)}</div>
      <div class="field-row"><span class="field-label">शाखा:</span> ${val(f.bankBranch)}</div>
      <div class="field-row"><span class="field-label">खाता नं.:</span> ${val(f.accountNo)}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">५. स्वास्थ्य अवस्था / ७. सिफारिसकर्ता</div>
    <div class="grid">
      <div class="field-row"><span class="field-label">रोगको किसिम:</span> ${val(f.healthStatus)}</div>
      <div class="field-row"><span class="field-label">सिफारिसकर्ता सम्बन्ध:</span> ${val(f.recommenderRelation)}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">निवेदक हस्ताक्षर</div>
    <div class="grid">
      <div class="field-row"><span class="field-label">नाम:</span> ${val(f.applicantSigName)}</div>
      <div class="field-row"><span class="field-label">ठेगाना:</span> ${val(f.applicantSigAddress)}</div>
      <div class="field-row"><span class="field-label">मिति:</span> ${val(f.applicantSigDate)}</div>
      <div class="field-row"><span class="field-label">फोन:</span> ${val(f.applicantSigPhone)}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">सिफारिस गर्नेको विवरण</div>
    <div class="grid">
      <div class="field-row"><span class="field-label">नाम:</span> ${val(f.recName)}</div>
      <div class="field-row"><span class="field-label">पद:</span> ${val(f.recPosition)}</div>
      <div class="field-row"><span class="field-label">मिति:</span> ${val(f.recDate)}</div>
      <div class="field-row"><span class="field-label">कार्यालय छाप:</span> ${val(f.recOfficeStamp)}</div>
    </div>
  </div>

  <div class="applicant-box">
    <div class="a-title">निवेदकको विवरण</div>
    <div class="a-row"><span class="a-label">नाम:</span><span>${f.applicantName}</span></div>
    <div class="a-row"><span class="a-label">ठेगाना:</span><span>${f.applicantAddress}</span></div>
    <div class="a-row"><span class="a-label">नागरिकता नं.:</span><span>${f.applicantCitizenship}</span></div>
    <div class="a-row"><span class="a-label">फोन:</span><span>${f.applicantPhone}</span></div>
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
      <style>{styles}</style>

      <div className="icar-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(false); }}>

          {/* ── Municipality header ── */}
          <div className="icar-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee block: श्रीमान् hardcoded, title editable, office below ── */}
          <div className="icar-addressee-block">
            <div className="icar-shree-row">
              <span>श्रीमान्</span>
              <PrintField
                name="headerTitle"
                value={form.headerTitle}
                onChange={handleChange}
                isPrint={isPrint}
                className="title-field"
                required
                placeholder="अध्यक्षज्यु"
              />
              <span>,</span>
            </div>
            <div className="icar-office-row">
              <PrintField
                name="headerOffice"
                value={form.headerOffice}
                onChange={handleChange}
                isPrint={isPrint}
                className="header-field"
                required
                placeholder="कार्यालयको नाम"
              />
            </div>
          </div>

          {/* ── विषय ── */}
          <div className="icar-subject-line">
            विषय: विपन्न नागरिक आवेदन तथा सिफारिस
          </div>

          {/* ── Section 1: बिरामीको विवरण ── */}
          <fieldset className="icar-form-section">
            <legend>१. बिरामीको विवरण</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>नाम: <span className="icar-req">*</span></label>
                <PrintField name="patientName" value={form.patientName} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>उमेर: <span className="icar-req">*</span></label>
                <PrintField name="age" value={form.age} onChange={handleChange} isPrint={isPrint} className="short" required />
              </div>
              <div className="icar-form-group">
                <label>लिङ्ग:</label>
                <PrintSelect name="gender" value={form.gender} onChange={handleChange} isPrint={isPrint}>
                  <option>पुरुष</option><option>महिला</option><option>अन्य</option>
                </PrintSelect>
              </div>
              <div className="icar-form-group">
                <label>स्थायी जिल्ला: <span className="icar-req">*</span></label>
                <PrintField name="permJilla" value={form.permJilla} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>स्थायी पालिका: <span className="icar-req">*</span></label>
                <PrintField name="permPalika" value={form.permPalika} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>स्थायी वडा: <span className="icar-req">*</span></label>
                <PrintField name="permWarda" value={form.permWarda} onChange={handleChange} isPrint={isPrint} className="short" required />
              </div>
              <div className="icar-form-group">
                <label>अस्थायी जिल्ला: <span className="icar-req">*</span></label>
                <PrintField name="tempJilla" value={form.tempJilla} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>अस्थायी पालिका: <span className="icar-req">*</span></label>
                <PrintField name="tempPalika" value={form.tempPalika} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>अस्थायी वडा: <span className="icar-req">*</span></label>
                <PrintField name="tempWarda" value={form.tempWarda} onChange={handleChange} isPrint={isPrint} className="short" required />
              </div>
              <div className="icar-form-group">
                <label>जात:</label>
                <PrintField name="ethnicity" value={form.ethnicity} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>परिवार संख्या:</label>
                <PrintField name="familySize" value={form.familySize} onChange={handleChange} isPrint={isPrint} className="short" />
              </div>
            </div>
          </fieldset>

          {/* ── Section 2: आय स्रोत ── */}
          <fieldset className="icar-form-section">
            <legend>२. आय स्रोत र मासिक आम्दानी</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>आय स्रोत:</label>
                <PrintField name="incomeSource" value={form.incomeSource} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>मासिक आम्दानी:</label>
                <PrintField name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} isPrint={isPrint} className="short" />
              </div>
            </div>
          </fieldset>

          {/* ── Section 3: Land table ── */}
          <fieldset className="icar-form-section">
            <legend>३. नगद जग्गा (अचल र चलन सम्पत्ति):</legend>
            <div className="icar-table-wrapper">
              <table className="icar-land-table">
                <thead>
                  <tr>
                    <th>क्र.स.</th>
                    <th>क्षेत्रफल</th>
                    <th>भूमिस स्थान</th>
                    {!isPrint && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {landDetails.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        {isPrint
                          ? <span className="icar-pf-value">{item.description}</span>
                          : <input type="text" name="description" value={item.description} onChange={(e) => handleLandChange(index, e)} />
                        }
                      </td>
                      <td>
                        {isPrint
                          ? <span className="icar-pf-value">{item.location}</span>
                          : <input type="text" name="location" value={item.location} onChange={(e) => handleLandChange(index, e)} />
                        }
                      </td>
                      {!isPrint && (
                        <td className="icar-action-cell">
                          {index === landDetails.length - 1 && (
                            <button type="button" onClick={addLandRow} className="icar-add-btn">+</button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          {/* ── Section 4: Bank ── */}
          <fieldset className="icar-form-section">
            <legend>४. बैंक विवरण</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>बैंकको नाम:</label>
                <PrintField name="bankName" value={form.bankName} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>शाखा:</label>
                <PrintField name="bankBranch" value={form.bankBranch} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>खाता नं.:</label>
                <PrintField name="accountNo" value={form.accountNo} onChange={handleChange} isPrint={isPrint} />
              </div>
            </div>
          </fieldset>

          {/* ── Section 5: Health ── */}
          <fieldset className="icar-form-section">
            <legend>५. स्वास्थ्य अवस्था</legend>
            <div className="icar-form-group">
              <label>रोगको किसिम: <span className="icar-req">*</span></label>
              <PrintField name="healthStatus" value={form.healthStatus} onChange={handleChange} isPrint={isPrint} required />
            </div>
          </fieldset>

          {/* ── Section 7: Recommender ── */}
          <fieldset className="icar-form-section">
            <legend>७. सिफारिसकर्ताको विवरण</legend>
            <div className="icar-form-group">
              <label>सम्बन्ध:</label>
              <PrintField name="recommenderRelation" value={form.recommenderRelation} onChange={handleChange} isPrint={isPrint} />
            </div>
          </fieldset>

          {/* ── Applicant Signature ── */}
          <fieldset className="icar-form-section">
            <legend>निवेदक हस्ताक्षर</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>नाम: <span className="icar-req">*</span></label>
                <PrintField name="applicantSigName" value={form.applicantSigName} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>ठेगाना: <span className="icar-req">*</span></label>
                <PrintField name="applicantSigAddress" value={form.applicantSigAddress} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>मिति:</label>
                <PrintField name="applicantSigDate" value={form.applicantSigDate} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>फोन: <span className="icar-req">*</span></label>
                <PrintField name="applicantSigPhone" value={form.applicantSigPhone} onChange={handleChange} isPrint={isPrint} required />
              </div>
            </div>
          </fieldset>

          {/* ── Recommender ── */}
          <fieldset className="icar-form-section">
            <legend>सिफारिस गर्नेको विवरण</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>नाम: <span className="icar-req">*</span></label>
                <PrintField name="recName" value={form.recName} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>पद:</label>
                <PrintSelect name="recPosition" value={form.recPosition} onChange={handleChange} isPrint={isPrint}>
                  <option>पद छनोट गर्नुहोस्</option>
                  <option>वडा अध्यक्ष</option>
                  <option>वडा सचिव</option>
                  <option>वडा सदस्य</option>
                </PrintSelect>
              </div>
              <div className="icar-form-group">
                <label>मिति:</label>
                <PrintField name="recDate" value={form.recDate} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>कार्यालय छाप:</label>
                <PrintField name="recOfficeStamp" value={form.recOfficeStamp} onChange={handleChange} isPrint={isPrint} />
              </div>
            </div>
          </fieldset>

          {/* ── Applicant details footer ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Two footer buttons ── */}
          {!isPrint && (
            <div className="icar-submit-area">
              <button type="submit" className="icar-submit-btn" disabled={submitting}>
                {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
              </button>
              <button type="button" className="icar-print-btn" disabled={submitting} onClick={() => handleSave(true)}>
                {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default ImpoverishedCitizenApplicationandRecommendation;