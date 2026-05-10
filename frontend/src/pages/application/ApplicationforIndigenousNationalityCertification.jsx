import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:                new Date().toISOString().slice(0, 10),
  headerDesignation:   "",
  headerOffice:        "",
  headerDistrict:      "",
  bodyDistrict:        "",
  palikaName:          MUNICIPALITY?.name || "",
  wardNo:              "",
  residentName:        "",
  relation:            "छोरा",
  guardianName:        "",
  tribeName:           "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ainc-)
───────────────────────────────────────────── */
const styles = `
.ainc-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: 'Kalimati','Kokila','Arial',sans-serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5;
}

/* Header */
.ainc-header-row {
  margin-bottom: 16px;
}

/* Title bar */
.ainc-top-bar-title {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
}
.ainc-top-right-bread {
  font-size: 12px;
  font-weight: normal;
  color: #666;
}

/* Addressee block */
.ainc-shree-block {
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
}
.ainc-shree-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 14px;
  flex-wrap: wrap;
}
.ainc-name-input {
  width: 180px;
}
.ainc-stack-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ainc-stack-input {
  flex: 1;
  height: 30px;
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  outline: none;
  padding: 0 6px;
  font-size: 14px;
  font-family: inherit;
}
.ainc-stack-input:focus {
  border-bottom-color: #3b7dd8;
  background-color: #f0f7ff;
}

/* Date row */
.ainc-form-group-inline {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin: 15px 0;
  gap: 8px;
}
.ainc-form-group-inline label {
  font-weight: bold;
}
.ainc-form-group-inline input[type="date"] {
  width: 160px;
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  outline: none;
  padding: 2px 6px;
  font-size: 14px;
  font-family: inherit;
}
.ainc-form-group-inline input[type="date"]:focus {
  border-bottom-color: #3b7dd8;
}

/* Subject */
.ainc-subject-line {
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
}

/* Body paragraph */
.ainc-certificate-body {
  line-height: 2.6;
  font-size: 15px;
  text-align: justify;
  margin-bottom: 25px;
}

/* Inline inputs */
.ainc-inline-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  margin: 0 4px;
  font-size: 14px;
  font-family: inherit;
  vertical-align: baseline;
  outline: none;
  padding: 1px 4px;
  transition: background-color 0.15s, border-bottom-color 0.15s;
}
.ainc-inline-input:focus {
  background-color: #f0f7ff;
  border-bottom-color: #3b7dd8;
}
.ainc-inline-input.small  { width: 60px; }
.ainc-inline-input.medium { width: 140px; }
.ainc-inline-input.long   { width: 200px; }

.ainc-inline-select {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  margin: 0 4px;
  font-size: 14px;
  font-family: inherit;
  width: auto;
  min-width: 80px;
  outline: none;
  cursor: pointer;
  vertical-align: baseline;
}
.ainc-inline-select:focus { border-bottom-color: #3b7dd8; }

/* Submit */
.ainc-submit-area {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}
.ainc-submit-btn {
  background-color: #343a40;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
}
.ainc-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.ainc-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }

  .ainc-container,
  .ainc-container * { visibility: visible; }

  .ainc-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: none;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
    font-size: 14px;
    line-height: 1.6;
  }

  .ainc-submit-area,
  .ainc-top-right-bread { display: none !important; }

  input, select, textarea {
    background: white !important;
    color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    box-shadow: none !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ainc-container { width: 100%; padding: 15px; }
  .ainc-inline-input.long { width: 140px; }
  .ainc-inline-input.medium { width: 100px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ApplicationforIndigenousNationalityCertification = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.residentName.trim())  return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName.trim())  return "अभिभावकको नाम आवश्यक छ";
    if (!formData.tribeName.trim())     return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone.trim())return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) { alert(error); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach(
        (k) => payload[k] === "" && (payload[k] = null),
      );

      const res = await axios.post(
        "/api/forms/indigenous-certification",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => setFormData(INITIAL_STATE), 500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="ainc-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality header ── */}
          <div className="ainc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Title bar ── */}
          <div className="ainc-top-bar-title">
            जनजाति प्रमाणपत्र जारी गर्ने दरखास्त
            <span className="ainc-top-right-bread">
              प्रमाणपत्र &gt; जनजाति प्रमाणपत्र
            </span>
          </div>

          {/* ── Addressee ── */}
          <div className="ainc-shree-block">
            <div className="ainc-shree-row">
              <span>श्रीमान्</span>
              <input
                name="headerDesignation"
                value={formData.headerDesignation}
                onChange={handleChange}
                className="ainc-inline-input ainc-name-input"
                placeholder="पद"
              />
              <input
                name="headerOffice"
                value={formData.headerOffice}
                onChange={handleChange}
                className="ainc-inline-input ainc-name-input"
                placeholder="कार्यालय"
              />
              <span>ज्यू,</span>
            </div>

            <div className="ainc-stack-row">
              <input
                type="text"
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                className="ainc-stack-input"
                placeholder="जिल्ला"
              />
            </div>
          </div>

          {/* ── Date ── */}
          <div className="ainc-form-group-inline">
            <label>मिति:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/* ── Subject ── */}
          <div className="ainc-subject-line">
            विषय: <u>जनजाति प्रमाणित गरि पाउँ।</u>
          </div>

          {/* ── Body paragraph ── */}
          <p className="ainc-certificate-body">
            <input
              name="bodyDistrict"
              value={formData.bodyDistrict}
              onChange={handleChange}
              className="ainc-inline-input medium"
              placeholder="जिल्ला"
            />
            जिल्ला
            <input
              name="palikaName"
              value={formData.palikaName}
              onChange={handleChange}
              className="ainc-inline-input medium"
            />
            वडा नं.
            <input
              name="wardNo"
              value={formData.wardNo}
              onChange={handleChange}
              className="ainc-inline-input small"
            />
            निवासी
            <input
              name="residentName"
              value={formData.residentName}
              onChange={handleChange}
              className="ainc-inline-input long"
              placeholder="निवासीको नाम"
            />
            को
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="ainc-inline-select"
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="पति">पति</option>
              <option value="पत्नी">पत्नी</option>
            </select>
            म
            <input
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              className="ainc-inline-input long"
              placeholder="अभिभावकको नाम"
            />
            जनजाति अन्तर्गत
            <input
              name="tribeName"
              value={formData.tribeName}
              onChange={handleChange}
              className="ainc-inline-input long"
              placeholder="जातिको नाम"
            />
            जातिमा पर्ने भएकोले प्रमाणित गरि पाउन निवेदन पेश गरेको छु।
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Submit ── */}
          <div className="ainc-submit-area">
            <button
              type="submit"
              className="ainc-submit-btn"
              disabled={submitting}
            >
              {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default ApplicationforIndigenousNationalityCertification;