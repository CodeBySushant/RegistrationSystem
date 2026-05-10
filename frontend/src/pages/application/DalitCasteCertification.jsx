import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   PrintField & PrintSelect — MODULE SCOPE ONLY.
   Never define inside the component — React
   creates a new type each render → input
   unmounts every keystroke → 1 char limit.
───────────────────────────────────────────── */
const PrintField = ({ value, isPrint, className = "", name, onChange, ...rest }) => {
  if (isPrint) {
    return <span className={`dcc-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`dcc-pf-input ${className}`}
      {...rest}
    />
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`dcc-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`dcc-pf-select ${className}`}
    >
      {children}
    </select>
  );
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:               new Date().toISOString().slice(0, 10),
  headerDistrict:     MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict:       MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  palikaName:         MUNICIPALITY?.name            || "",
  wardNo:             MUNICIPALITY?.wardNumber      || "",
  residentName:       "",
  relation:           "छोरा",
  guardianName:       "",
  casteName:          "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: dcc-)
───────────────────────────────────────────── */
const styles = `
.dcc-container {
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

.dcc-header-row { margin-bottom: 16px; }

.dcc-form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  gap: 20px;
}

.dcc-header-to-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dcc-header-to-group h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.dcc-date-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-weight: bold;
  gap: 8px;
}
.dcc-date-group input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  color: #000;
  font-family: inherit;
  font-size: 14px;
  padding: 2px 6px;
  outline: none;
}
.dcc-date-group input:focus { border-bottom-color: #3b7dd8; }

.dcc-subject-line {
  text-align: center;
  margin: 25px 0;
  font-size: 16px;
}

.dcc-certificate-body {
  line-height: 2.8;
  font-size: 15px;
  text-align: justify;
}

/* PrintField — screen (input) */
.dcc-pf-input {
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
.dcc-pf-input:focus {
  border-bottom-color: #3b7dd8;
  background-color: #f0f7ff;
}
.dcc-pf-input.short        { width: 70px; }
.dcc-pf-input.long         { width: 220px; }
.dcc-pf-input.header-field {
  font-size: 16px;
  font-weight: bold;
  width: 260px;
  border-bottom: 1px dotted #000;
}

/* PrintField — print mode (span) */
.dcc-pf-value {
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
.dcc-pf-value.short        { min-width: 40px; }
.dcc-pf-value.long         { min-width: 160px; }
.dcc-pf-value.header-field {
  font-size: 16px;
  font-weight: bold;
  min-width: 200px;
}

/* PrintSelect — screen */
.dcc-pf-select {
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
.dcc-pf-select:focus { border-bottom-color: #3b7dd8; }

.dcc-submit-area {
  clear: both;
  text-align: center;
  margin-top: 30px;
  padding-top: 30px;
}
.dcc-submit-btn {
  background-color: #343a40;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.dcc-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.dcc-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }

  .dcc-container,
  .dcc-container * { visibility: visible; }

  .dcc-container {
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

  .dcc-submit-area { display: none !important; }

  .dcc-pf-value {
    border-bottom: 1px solid #000 !important;
    color: #000 !important;
    background: transparent !important;
  }

  /* Fallback for inputs inside ApplicantDetailsNp */
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
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .dcc-container { width: 100%; padding: 15px; }
  .dcc-form-row { flex-direction: column; }
  .dcc-pf-input { width: 110px; }
  .dcc-pf-input.header-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const DalitCasteCertification = () => {
  const [formData, setFormData]     = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [isPrint, setIsPrint]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    if (!d.mainDistrict?.trim())   return "जिल्लाको नाम आवश्यक छ";
    if (!d.palikaName?.trim())     return "पालिकाको नाम आवश्यक छ";
    if (!d.wardNo?.trim())         return "वडा नम्बर आवश्यक छ";
    if (!d.residentName?.trim())   return "निवासीको नाम आवश्यक छ";
    if (!d.casteName?.trim())      return "जातिको नाम आवश्यक छ";
    if (!d.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!d.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/dalit-caste-certification",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        setIsPrint(true);
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

  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      setFormData(INITIAL_STATE);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  return (
    <>
      <style>{styles}</style>

      <div className="dcc-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality header ── */}
          <div className="dcc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="dcc-form-row">
            <div className="dcc-header-to-group">
              <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
              <PrintField
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                isPrint={isPrint}
                className="header-field"
                required
              />
            </div>

            <div className="dcc-date-group">
              <label>मिति :</label>
              {isPrint
                ? <span className="dcc-pf-value">{formData.date}</span>
                : <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
              }
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="dcc-subject-line">
            <strong>
              विषय: <u>दलित जाति प्रमाणित गरि पाउँ ।</u>
            </strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="dcc-certificate-body">
            <PrintField
              name="mainDistrict"
              value={formData.mainDistrict}
              onChange={handleChange}
              isPrint={isPrint}
              required
            />
            &nbsp;जिल्ला&nbsp;
            <PrintField
              name="palikaName"
              value={formData.palikaName}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="गाउँपालिका/नगरपालिका"
              required
            />
            &nbsp;वडा नं.&nbsp;
            <PrintField
              name="wardNo"
              value={formData.wardNo}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="वडा"
              className="short"
              required
            />
            &nbsp;निवासी&nbsp;
            <PrintField
              name="residentName"
              value={formData.residentName}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="निवासीको नाम"
              required
            />
            &nbsp;को&nbsp;
            <PrintSelect
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              isPrint={isPrint}
            >
              <option>छोरा</option>
              <option>छोरी</option>
              <option>पति</option>
              <option>पत्नी</option>
            </PrintSelect>
            &nbsp;म&nbsp;
            <PrintField
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="अभिभावकको नाम"
            />
            &nbsp;दलित जाति अन्तर्गत&nbsp;
            <PrintField
              name="casteName"
              value={formData.casteName}
              onChange={handleChange}
              isPrint={isPrint}
              placeholder="जातिको नाम"
              required
            />
            &nbsp;जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा
            कार्यालयको सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को
            टिकट टाँसी यो निवेदन पेश गरेको छु ।
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Submit (hidden in print mode) ── */}
          {!isPrint && (
            <div className="dcc-submit-area">
              <button
                type="submit"
                className="dcc-submit-btn"
                disabled={submitting}
              >
                {submitting
                  ? "पठाइँ हुँदैछ..."
                  : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default DalitCasteCertification;