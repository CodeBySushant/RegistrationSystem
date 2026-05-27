import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useWardForm } from "../../hooks/useWardForm";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   PrintField — module scope (must NOT be inside
   the component; remounting kills typing)
───────────────────────────────────────────── */
const PrintField = ({
  value,
  isPrint,
  className = "",
  name,
  onChange,
  ...rest
}) => {
  if (isPrint) {
    return <span className={`cwhs-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`cwhs-pf-input ${className}`}
      {...rest}
    />
  );
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date: new Date().toISOString().slice(0, 10),
  districtOffice: MUNICIPALITY?.district,
  preMarriageDate: "२०८२.०७.१५",
  preMarriageDistrict: "",
  currentMunicipality: MUNICIPALITY?.name || "",
  currentWard: MUNICIPALITY?.wardNumber || "",
  officeTitle: "प्रमुख जिल्ला अधिकारी",
  husbandName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: cwhs-)
───────────────────────────────────────────── */
const styles = `
.cwhs-container {
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
.cwhs-header-row { margin-bottom: 16px; }
.cwhs-form-row {
  display: flex; justify-content: space-between;
  flex-wrap: wrap; margin-bottom: 25px;
  padding-bottom: 15px; border-bottom: 1px dashed #ccc; gap: 20px;
}

.cwhs-top-bar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.cwhs-breadcrumb {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.cwhs-header-to-group { display: flex; flex-direction: column; gap: 4px; }
.cwhs-header-to-group h3 { font-size: 16px; font-weight: bold; margin: 0 0 8px 0; }
.cwhs-date-group { display: flex; flex-direction: row; align-items: baseline; font-weight: bold; gap: 8px; }
.cwhs-date-group input {
  border: none; border-bottom: 1px dotted #000;
  background-color: #fff; color: #000;
  font-family: inherit; font-size: 14px; padding: 2px 6px; outline: none;
}
.cwhs-date-group input:focus { border-bottom-color: #3b7dd8; }
.cwhs-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }
.cwhs-certificate-body { line-height: 2.8; font-size: 15px; text-align: justify; }

.cwhs-pf-input {
  display: inline-block; vertical-align: baseline;
  padding: 2px 6px; font-family: inherit; font-size: 15px;
  color: #000; background-color: #fff;
  border: none; border-bottom: 1px dotted #555;
  outline: none; width: 150px; max-width: 100%;
  box-sizing: border-box; transition: border-color 0.15s, background-color 0.15s;
}
.cwhs-pf-input:focus { border-bottom-color: #3b7dd8; background-color: #f0f7ff; }
.cwhs-pf-input.short        { width: 70px; }
.cwhs-pf-input.header-field { font-size: 16px; font-weight: bold; width: 260px; border-bottom: 1px dotted #000; }

.cwhs-pf-value {
  display: inline-block; vertical-align: baseline;
  padding: 0 4px; font-family: inherit; font-size: 15px;
  color: #000; min-width: 60px; border-bottom: 1px solid #000; word-break: break-word;
}
.cwhs-pf-value.short        { min-width: 40px; }
.cwhs-pf-value.header-field { font-size: 16px; font-weight: bold; min-width: 200px; }

.cwhs-submit-area {
  clear: both; display: flex; justify-content: center;
  gap: 12px; margin-top: 30px; padding-top: 30px;
}
.cwhs-submit-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.cwhs-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.cwhs-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }
.cwhs-print-btn {
  background-color: #1a6b3a; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.cwhs-print-btn:hover:not(:disabled) { background-color: #145530; }
.cwhs-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

@media print {
  body * { visibility: hidden; }
  .cwhs-container, .cwhs-container * { visibility: visible; }
  .cwhs-container {
    position: absolute; left: 0; top: 0; width: 100%; max-width: none;
    box-shadow: none; border: none; margin: 0; padding: 15px;
    background: white !important; background-image: none !important;
    font-size: 14px; line-height: 1.8; color: #000;
  }
  .cwhs-submit-area { display: none !important; }
  .cwhs-pf-value { border-bottom: 1px solid #000 !important; color: #000 !important; background: transparent !important; }
  input, select, textarea {
    color: #000 !important; -webkit-text-fill-color: #000 !important;
    background: transparent !important; border: none !important;
    border-bottom: 1px solid #000 !important; opacity: 1 !important;
    -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
  }
  input::placeholder, textarea::placeholder { color: transparent !important; -webkit-text-fill-color: transparent !important; }
}

@media (max-width: 768px) {
  .cwhs-container { width: 100%; padding: 15px; }
  .cwhs-form-row { flex-direction: column; }
  .cwhs-pf-input { width: 110px; }
  .cwhs-pf-input.header-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const CitizenshipwithHusbandSurname = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [isPrint, setIsPrint] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (data) => {
    if (!data.preMarriageDistrict?.trim())
      return "विवाहपूर्वको जिल्ला आवश्यक छ";
    if (!data.currentMunicipality?.trim()) return "हालको गा.पा./न.पा. आवश्यक छ";
    if (!data.currentWard?.trim()) return "वडा नम्बर आवश्यक छ";
    if (!data.husbandName?.trim()) return "पतिको नाम आवश्यक छ";
    if (!data.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!data.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/citizenship-husband-surname",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormData(INITIAL_STATE);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Submission failed";
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

    const content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>पतिको थर सहित नागरिकता</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Kalimati','Kokila',Arial,sans-serif; color:#000; background:white; padding:15mm 20mm; font-size:11pt; line-height:2; }
    .header { text-align:center; margin-bottom:20px; position:relative; min-height:90px; }
    .logo   { position:absolute; left:0; top:0; width:70px; }
    .mun-name   { color:#c0392b; font-size:20pt; font-weight:700; }
    .ward-title { color:#c0392b; font-size:16pt; font-weight:700; margin:4px 0; }
    .addr       { color:#c0392b; font-size:10pt; }
    .meta       { display:flex; justify-content:space-between; margin:16px 0; font-size:11pt; }
    .subject    { text-align:center; font-weight:bold; font-size:12pt; margin:20px 0; }
    .addressee  { margin-bottom:16px; font-size:11pt; font-weight:bold; }
    .body-text  { font-size:11pt; line-height:2.4; text-align:justify; margin-bottom:24px; }
    .value { font-weight:bold; padding:0 4px; solid #000; display:inline-block; min-width:60px; }
    .applicant-box { border:1px solid #999; padding:14px; margin-top:20px; border-radius:3px; }
    .applicant-title { font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:6px; margin-bottom:10px; font-size:11pt; }
    .field-row { display:flex; margin-bottom:8px; font-size:10pt; }
    .field-label { min-width:160px; font-weight:600; }
    .field-val   { flex:1; }
  </style>
</head>
<body>
  <div class="header">
    <img class="logo" src="/nepallogo.svg" alt="Nepal" />
    <div class="mun-name">${MUNICIPALITY.name}</div>
    <div class="ward-title">${wardTitle}</div>
    <div class="addr">${MUNICIPALITY.officeLine}</div>
    <div class="addr">${MUNICIPALITY.provinceLine}</div>
  </div>
  <div class="meta">
    <div>मिति : <strong>${formData.date}</strong></div>
  </div>
  <div class="addressee">
    श्रीमान् ${formData.officeTitle || ""}ज्यु,<br/>
    <span class="value">${formData.districtOffice}</span>
  </div>
  <div class="subject">
    विषय: <u>पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u>
  </div>
  <p class="body-text">
    प्रस्तुत विषयमा मेरो विवाह नहुँदै मिति
    <span class="value">${formData.preMarriageDate}</span>
    मा <span class="value">${formData.preMarriageDistrict}</span>
    जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा हाल यस जिल्लाको
    <span class="value">${formData.currentMunicipality}</span>
    गा.पा. / न.पा. वडा नं. <span class="value">${formData.currentWard}</span>
    बस्ने <span class="value">${formData.husbandName}</span>
    सँग वैवाहिक सम्बन्ध कायम भएकोले पतिको नाम, थर र वतन कायम गरी
    नागरिकताको प्रतिलिपि पाउँ भनी आवश्यक कागजातहरु संलग्न राखी यो निवेदन पेश गर्दछु ।
  </p>
  <div class="applicant-box">
    <div class="applicant-title">निवेदकको विवरण</div>
    <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${formData.applicantName}</span></div>
    <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${formData.applicantAddress}</span></div>
    <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${formData.applicantCitizenship}</span></div>
    <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${formData.applicantPhone}</span></div>
  </div>
</body>
</html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(content);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 500);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="cwhs-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >
          {/* ── Top Bar ── */}
          <div className="cwhs-top-bar">
            पतिको वतन कायम गरी नागरिकताको प्रतिलिपि ।
            <span className="cwhs-breadcrumb">
              निवेदन &gt; पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ
            </span>
          </div>

          <div className="cwhs-header-row">
            <MunicipalityHeader showLogo />
          </div>

          <div className="cwhs-form-row">
            <div className="cwhs-header-to-group">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  श्रीमान्
                </span>

                <PrintField
                  name="officeTitle"
                  value={formData.officeTitle}
                  onChange={handleChange}
                  isPrint={isPrint}
                  className="header-field"
                  placeholder="पदको नाम"
                  required
                />

                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  ज्यु,
                </span>
              </div>
              <PrintField
                name="districtOffice"
                value={formData.districtOffice}
                onChange={handleChange}
                isPrint={isPrint}
                className="header-field"
                required
              />
            </div>
            <div className="cwhs-date-group">
              <label>मिति :</label>
              {isPrint ? (
                <span className="cwhs-pf-value">{formData.date}</span>
              ) : (
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>

          <div className="cwhs-subject-line">
            <strong>
              विषय:{" "}
              <u>पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u>
            </strong>
          </div>

          <p className="cwhs-certificate-body">
            प्रस्तुत विषयमा मेरो विवाह नहुँदै मिति&nbsp;
            <PrintField
              name="preMarriageDate"
              value={formData.preMarriageDate}
              onChange={handleChange}
              isPrint={isPrint}
              required
            />
            &nbsp;मा&nbsp;
            <PrintField
              name="preMarriageDistrict"
              value={formData.preMarriageDistrict}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="जिल्ला"
              required
            />
            &nbsp;जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा हाल यस
            जिल्लाको&nbsp;
            <PrintField
              name="currentMunicipality"
              value={formData.currentMunicipality}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="गा.पा. / न.पा."
              required
            />
            &nbsp;गा.पा. / न.पा. वडा नं&nbsp;
            <PrintField
              name="currentWard"
              value={formData.currentWard}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="वडा"
              className="short"
              required
            />
            &nbsp;बस्ने&nbsp;
            <PrintField
              name="husbandName"
              value={formData.husbandName}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="पतिको नाम"
              required
            />
            &nbsp;सँग वैवाहिक सम्बन्ध कायम भएकोले पतिको नाम, थर र वतन कायम गरी
            नागरिकताको प्रतिलिपि पाउँ भनी आवश्यक कागजातहरु संलग्न राखी यो निवेदन
            पेश गर्दछु ।
          </p>

          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {!isPrint && (
            <div className="cwhs-submit-area">
              <button
                type="submit"
                className="cwhs-submit-btn"
                disabled={submitting}
              >
                {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
              </button>
              <button
                type="button"
                className="cwhs-print-btn"
                disabled={submitting}
                onClick={() => handleSave(true)}
              >
                {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CitizenshipwithHusbandSurname;
