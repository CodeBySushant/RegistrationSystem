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
const PrintField = ({ value, isPrint, className = "", name, onChange, required = false, placeholder, ...rest }) => {
  if (isPrint) {
    return <span className={`cwos-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <span className="cwos-req-wrap">
      {required && <span className="cwos-req-star">*</span>}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`cwos-pf-input ${className}${required ? " cwos-has-star" : ""}`}
        required={required}
        {...rest}
      />
    </span>
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`cwos-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select name={name} value={value} onChange={onChange} className={`cwos-pf-select ${className}`}>
      {children}
    </select>
  );
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:                new Date().toISOString().slice(0, 10),
  addressee_title:     "प्रमुख जिल्ला अधिकारी",
  districtOffice:      MUNICIPALITY?.district,
  preMarriageDate:     "२०८२.०७.१५",
  preMarriageDistrict: "",
  relationshipStatus:  "सम्बन्धविच्छेद",
  certificateInfo:     "",
  currentHusbandName:  "",
  currentDistrict:     MUNICIPALITY?.district || "जिल्ला",
  currentPalikaType:   "गा.पा.",
  currentPalikaName:   MUNICIPALITY?.name || "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: cwos-)
───────────────────────────────────────────── */
const styles = `
.cwos-container {
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
.cwos-header-row { margin-bottom: 16px; }
.cwos-form-row {
  display: flex; justify-content: space-between;
  flex-wrap: wrap; margin-bottom: 25px;
  padding-bottom: 15px; border-bottom: 1px dashed #ccc; gap: 20px;
}
.cwos-header-to-group { display: flex; flex-direction: column; gap: 6px; }

/* श्रीमान् + input on same row */
.cwos-shree-row {
  display: flex; align-items: baseline; gap: 8px;
  font-size: 15px; font-weight: bold;
}

/* Required star wrapper */
.cwos-req-wrap {
  position: relative;
  display: inline-block;
  vertical-align: baseline;
}
.cwos-req-star {
  position: absolute;
  left: 5px; top: 50%;
  transform: translateY(-50%);
  color: red; font-weight: bold;
  pointer-events: none; font-size: 13px; z-index: 1;
}
.cwos-has-star { padding-left: 16px !important; }

.cwos-date-group {
  display: flex; flex-direction: row;
  align-items: baseline; font-weight: bold; gap: 8px;
}
.cwos-date-group input {
  border: none; border-bottom: 1px dotted #000;
  background-color: #fff; color: #000;
  font-family: inherit; font-size: 14px; padding: 2px 6px; outline: none; width: 160px;
}
.cwos-date-group input:focus { border-bottom-color: #3b7dd8; }

.cwos-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }
.cwos-certificate-body { line-height: 2.8; font-size: 15px; text-align: justify; }

/* PrintField screen */
.cwos-pf-input {
  display: inline-block; vertical-align: baseline;
  padding: 2px 6px; font-family: inherit; font-size: 15px;
  color: #000; background-color: #fff;
  border: none; border-bottom: 1px dotted #555;
  outline: none; width: 150px; max-width: 100%;
  box-sizing: border-box; transition: border-color 0.15s, background-color 0.15s;
}
.cwos-pf-input:focus { border-bottom-color: #3b7dd8; background-color: #f0f7ff; }
.cwos-pf-input.short        { width: 70px; }
.cwos-pf-input.long         { width: 220px; }
.cwos-pf-input.header-field { font-size: 15px; font-weight: bold; width: 220px; border-bottom: 1px dotted #000; }
.cwos-pf-input.title-field  { font-size: 15px; font-weight: bold; width: 280px; border-bottom: 1px dotted #000; }

/* PrintField print */
.cwos-pf-value {
  display: inline-block; vertical-align: baseline;
  padding: 0 4px; font-family: inherit; font-size: 15px;
  color: #000; min-width: 60px;
  border-bottom: 1px solid #000; word-break: break-word;
}
.cwos-pf-value.short        { min-width: 40px; }
.cwos-pf-value.long         { min-width: 160px; }
.cwos-pf-value.header-field { font-size: 16px; font-weight: bold; min-width: 200px; }

/* PrintSelect screen */
.cwos-pf-select {
  display: inline-block; vertical-align: baseline;
  padding: 2px 6px; font-family: inherit; font-size: 15px;
  color: #000; background-color: #fff;
  border: none; border-bottom: 1px dotted #555;
  outline: none; min-width: 80px; cursor: pointer;
}
.cwos-pf-select:focus { border-bottom-color: #3b7dd8; }

/* Footer buttons */
.cwos-submit-area {
  clear: both; display: flex; justify-content: center;
  gap: 12px; margin-top: 30px; padding-top: 30px;
}
.cwos-submit-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.cwos-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.cwos-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }
.cwos-print-btn {
  background-color: #1a6b3a; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.cwos-print-btn:hover:not(:disabled) { background-color: #145530; }
.cwos-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

@media print {
  body * { visibility: hidden; }
  .cwos-container, .cwos-container * { visibility: visible; }
  .cwos-container {
    position: absolute; left: 0; top: 0; width: 100%; max-width: none;
    box-shadow: none; border: none; margin: 0; padding: 15px;
    background: white !important; background-image: none !important;
    font-size: 14px; line-height: 1.8; color: #000;
  }
  .cwos-submit-area { display: none !important; }
  .cwos-req-star { display: none !important; }
  .cwos-pf-value { border-bottom: 1px solid #000 !important; color: #000 !important; background: transparent !important; }
  input, select, textarea {
    color: #000 !important; -webkit-text-fill-color: #000 !important;
    background: transparent !important; border: none !important;
    border-bottom: 1px solid #000 !important; opacity: 1 !important;
    -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
  }
  input::placeholder, textarea::placeholder {
    color: transparent !important; -webkit-text-fill-color: transparent !important;
  }
}

@media (max-width: 768px) {
  .cwos-container { width: 100%; padding: 15px; }
  .cwos-form-row { flex-direction: column; }
  .cwos-pf-input { width: 110px; }
  .cwos-pf-input.long { width: 160px; }
  .cwos-pf-input.header-field,
  .cwos-pf-input.title-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const CitizenshipwithoutHusbandSurname = () => {
  const { user } = useAuth();
  // useWardForm: auto-fills ward_no from logged-in user
  const { form: wardForm, setForm: setWardForm, handleChange: handleWardChange } = useWardForm(INITIAL_STATE);
  const [formData, setFormDataRaw] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [isPrint, setIsPrint]       = useState(false);

  // Merged form — ward_no always from useWardForm
  const form = { ...formData, ward_no: wardForm.ward_no };

  const handleChange = (e) => {
    handleWardChange(e);
    const { name, value } = e.target;
    setFormDataRaw((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    if (!d.addressee_title?.trim())      return "प्राप्तकर्ताको पद आवश्यक छ";
    if (!d.districtOffice?.trim())       return "जिल्ला कार्यालय आवश्यक छ";
    if (!d.preMarriageDistrict?.trim())  return "विवाहपूर्वको जिल्ला आवश्यक छ";
    if (!d.certificateInfo?.trim())      return "प्रमाणपत्र विवरण आवश्यक छ";
    if (!d.currentHusbandName?.trim())   return "हालको पतिको नाम आवश्यक छ";
    if (!d.currentPalikaName?.trim())    return "हालको पालिकाको नाम आवश्यक छ";
    if (!d.applicantName?.trim())        return "निवेदकको नाम आवश्यक छ";
    if (!d.applicantPhone?.trim())       return "फोन नम्बर आवश्यक छ";
    return null;
  };

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (submitting) return;

    const err = validate(form);
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/citizenship-remove-husband", payload);

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormDataRaw(INITIAL_STATE);
        setWardForm((p) => ({ ...p, ...INITIAL_STATE }));
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || error.message || "Submission failed";
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
    const content = `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8"/>
  <title>पूर्व पतिको नाम हटाई नागरिकता</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Kalimati','Kokila',Arial,sans-serif; color:#000; background:white; padding:15mm 20mm; font-size:11pt; line-height:2; }
    .header { text-align:center; margin-bottom:20px; position:relative; min-height:90px; }
    .logo   { position:absolute; left:0; top:0; width:70px; }
    .mun-name   { color:#c0392b; font-size:20pt; font-weight:700; }
    .ward-title { color:#c0392b; font-size:16pt; font-weight:700; margin:4px 0; }
    .addr       { color:#c0392b; font-size:10pt; }
    .meta       { display:flex; justify-content:space-between; margin:16px 0; font-size:11pt; }
    .subject    { text-align:center; font-weight:bold; font-size:12pt; margin:20px 0; }
    .addressee  { margin-bottom:16px; font-size:11pt; font-weight:bold; }
    .body-text  { font-size:11pt; line-height:2.4; text-align:justify; margin-bottom:24px; }
    /* value spans size to content — no fixed min-width so small values
       don't leave big gaps and long values don't get clipped/merged */
    .value { font-weight:bold; padding:0 4px; white-space:nowrap; }
    .applicant-box { border:1px solid #999; padding:14px; margin-top:20px; border-radius:3px; }
    .applicant-title { font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:6px; margin-bottom:10px; font-size:11pt; }
    .field-row { display:flex; margin-bottom:8px; font-size:10pt; }
    .field-label { min-width:160px; font-weight:600; }
    .field-val   { flex:1; }
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
    <div>मिति : <strong>${f.date}</strong></div>
  </div>
  <div class="addressee">
    श्रीमान् <span class="value">${f.addressee_title}</span>ज्यु,<br/>
    <span class="value">${f.districtOffice}</span>
  </div>
  <div class="subject">
    विषय: <u>पूर्व पतिको नामथर हटाई हालको पतिको नाम थर वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u>
  </div>
  <p class="body-text">
    प्रस्तुत विषयमा मेरो मिति <span class="value">${f.preMarriageDate}</span>
    मा <span class="value">${f.preMarriageDistrict}</span>
    जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा
    मेरो श्रीमानसँग <span class="value">${f.relationshipStatus}</span>
    भई <span class="value">${f.certificateInfo}</span>
    दर्ताको प्रमाणपत्र समेत प्राप्त गरिसकेको र हाल
    <span class="value">${f.currentHusbandName}</span>
    <span class="value">${f.currentDistrict}</span> जिल्ला
    <span class="value">${f.currentPalikaType}</span>
    <span class="value">${f.currentPalikaName}</span> बस्ने
  </p>
  <div class="applicant-box">
    <div class="applicant-title">निवेदकको विवरण</div>
    <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${f.applicantName}</span></div>
    <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${f.applicantAddress}</span></div>
    <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${f.applicantCitizenship}</span></div>
    <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${f.applicantPhone}</span></div>
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

      <div className="cwos-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(false); }}>

          {/* ── Municipality header ── */}
          <div className="cwos-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="cwos-form-row">
            <div className="cwos-header-to-group">
              {/* श्रीमान् hardcoded + editable title beside it */}
              <div className="cwos-shree-row">
                <span>श्रीमान्</span>
                <PrintField
                  name="addressee_title"
                  value={form.addressee_title}
                  onChange={handleChange}
                  isPrint={isPrint}
                  className="title-field"
                  required
                  placeholder="प्रमुख जिल्ला अधिकारी"
                />
                <span>ज्यु,</span>
              </div>
              {/* District office on next line */}
              <PrintField
                name="districtOffice"
                value={form.districtOffice}
                onChange={handleChange}
                isPrint={isPrint}
                className="header-field"
                required
                placeholder="जिल्ला कार्यालय"
              />
            </div>

            <div className="cwos-date-group">
              <label>मिति :</label>
              {isPrint
                ? <span className="cwos-pf-value">{form.date}</span>
                : <input type="text" name="date" value={form.date} onChange={handleChange} />
              }
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="cwos-subject-line">
            <strong>
              विषय:{" "}
              <u>
                पूर्व पतिको नामथर हटाई हालको पतिको नाम थर वतन कायम गरी
                नागरिकताको प्रतिलिपि पाउँ ।
              </u>
            </strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="cwos-certificate-body">
            प्रस्तुत विषयमा मेरो मिति&nbsp;
            <PrintField name="preMarriageDate"    value={form.preMarriageDate}    onChange={handleChange} isPrint={isPrint} required />
            &nbsp;मा&nbsp;
            <PrintField name="preMarriageDistrict" value={form.preMarriageDistrict} onChange={handleChange} isPrint={isPrint} placeholder="जिल्ला" required />
            &nbsp;जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा
            मेरो श्रीमानसँग&nbsp;
            <PrintSelect name="relationshipStatus" value={form.relationshipStatus} onChange={handleChange} isPrint={isPrint}>
              <option>सम्बन्धविच्छेद</option>
              <option>अन्य</option>
            </PrintSelect>
            &nbsp;भई&nbsp;
            <PrintField name="certificateInfo" value={form.certificateInfo} onChange={handleChange} isPrint={isPrint} placeholder="सम्बन्धविच्छेद दर्ताको प्रमाणपत्र" className="long" required />
            &nbsp;दर्ताको प्रमाणपत्र समेत प्राप्त गरिसकेको र हाल&nbsp;
            <PrintField name="currentHusbandName" value={form.currentHusbandName} onChange={handleChange} isPrint={isPrint} placeholder="हालको पतिको नाम" required />
            &nbsp;
            <PrintField name="currentDistrict" value={form.currentDistrict} onChange={handleChange} isPrint={isPrint} required />
            &nbsp;जिल्ला&nbsp;
            <PrintSelect name="currentPalikaType" value={form.currentPalikaType} onChange={handleChange} isPrint={isPrint}>
              <option>गा.पा.</option>
              <option>न.पा.</option>
            </PrintSelect>
            &nbsp;
            <PrintField name="currentPalikaName" value={form.currentPalikaName} onChange={handleChange} isPrint={isPrint} placeholder="पालिकाको नाम" required />
            &nbsp;बस्ने
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Two footer buttons ── */}
          {!isPrint && (
            <div className="cwos-submit-area">
              <button type="submit" className="cwos-submit-btn" disabled={submitting}>
                {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
              </button>
              <button type="button" className="cwos-print-btn" disabled={submitting} onClick={() => handleSave(true)}>
                {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default CitizenshipwithoutHusbandSurname;