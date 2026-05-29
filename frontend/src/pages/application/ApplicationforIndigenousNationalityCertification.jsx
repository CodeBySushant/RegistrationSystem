import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:                 new Date().toISOString().slice(0, 10),
  headerDesignation:    "प्रमुख जिल्ला अधिकारी",
  headerDistrict:       "",
  bodyDistrict:         "",
  palikaName:           MUNICIPALITY?.name || "",
  wardNo:               "",
  residentName:         "",
  relation:             "छोरा",
  guardianName:         "",
  tribeName:            "",
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
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

/* Title bar — breadcrumb only, no heavy divider line */
.ainc-top-bar-title {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
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
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  flex-wrap: wrap;
}
/* consistent widths for the श्रीमान् row inputs */
.ainc-name-input { width: 300px; }

.ainc-stack-row {
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 300px; /* matches the lone पद input above */
}
.ainc-stack-input {
  flex: 1;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  outline: none;
  padding: 0 6px;
  font-size: 14px;
  font-family: inherit;
}
.ainc-stack-input:focus {
  border-color: #3b7dd8;
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
  text-align: left;
  margin-bottom: 25px;
}

/* Inline inputs */
.ainc-inline-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 4px;
  font-size: 14px;
  font-family: inherit;
  vertical-align: baseline;
  outline: none;
  padding: 3px 6px;
  transition: background-color 0.15s, border-color 0.15s;
}
.ainc-inline-input:focus {
  background-color: #f0f7ff;
  border-color: #3b7dd8;
}
.ainc-inline-input.small  { width: 60px; }
.ainc-inline-input.medium { width: 140px; }
.ainc-inline-input.long   { width: 200px; }

.ainc-inline-select {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 4px;
  font-size: 14px;
  font-family: inherit;
  width: auto;
  min-width: 80px;
  outline: none;
  cursor: pointer;
  vertical-align: baseline;
  padding: 3px 6px;
}
.ainc-inline-select:focus { border-color: #3b7dd8; }

/* required-star wrapper */
.ainc-req-wrap { position: relative; display: inline-block; margin: 0 2px; }
.ainc-req-wrap input { margin: 0 !important; padding-left: 14px !important; }
.ainc-req-star {
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 12px;
  line-height: 1;
  z-index: 1;
}

/* Footer */
.ainc-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
}
.ainc-save-print-btn {
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
}
.ainc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.ainc-copyright {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ainc-container { width: 100%; padding: 15px; }
  .ainc-inline-input.long { width: 140px; }
  .ainc-inline-input.medium { width: 100px; }
  .ainc-name-input { width: 45%; }
  .ainc-stack-row { max-width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ApplicationforIndigenousNationalityCertification = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.headerDesignation.trim()) return "अधिकारीको पद आवश्यक छ";
    if (!formData.headerDistrict.trim())    return "जिल्ला आवश्यक छ";
    if (!formData.bodyDistrict.trim())      return "जिल्ला आवश्यक छ";
    if (!formData.palikaName.trim())        return "पालिकाको नाम आवश्यक छ";
    if (!formData.wardNo.trim())            return "वडा नं. आवश्यक छ";
    if (!formData.residentName.trim())      return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName.trim())      return "अभिभावकको नाम आवश्यक छ";
    if (!formData.tribeName.trim())         return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName.trim())     return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone.trim())    return "फोन नम्बर आवश्यक छ";
    return null;
  };

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    const error = validate();
    if (error) { alert(error); return; }

    setLoading(true);
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
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        }
        setFormData(INITIAL_STATE);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated print window, values interpolated as spans ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>जनजाति प्रमाणित</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 16px 0; align-items: flex-start; }
          .addressee { font-size: 11pt; font-weight: bold; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .body-text { font-size: 11pt; line-height: 2.4; text-align: justify; margin-bottom: 24px; }
          /* value spans size to content — no fixed min-width so small values
             don't leave big gaps and long values don't get clipped/merged */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 28px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine || ""}</div>
          <div class="addr">${MUNICIPALITY.provinceLine || ""}</div>
        </div>

        <div class="meta">
          <div>
            <div class="addressee">
              श्रीमान् <span class="value">${formData.headerDesignation || ""}</span> ज्यू,
            </div>
            <div style="margin-top:6px"><span class="value">${formData.headerDistrict || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <strong>${formData.date || ""}</strong></div>
          </div>
        </div>

        <div class="subject">विषय: जनजाति प्रमाणित गरि पाउँ।</div>

        <div class="body-text">
          <span class="value">${formData.bodyDistrict || ""}</span>
          जिल्ला
          <span class="value">${formData.palikaName || ""}</span>
          वडा नं.
          <span class="value">${formData.wardNo || ""}</span>
          निवासी
          <span class="value">${formData.residentName || ""}</span>
          को
          <span class="value">${formData.relation || ""}</span>
          म
          <span class="value">${formData.guardianName || ""}</span>
          जनजाति अन्तर्गत
          <span class="value">${formData.tribeName || ""}</span>
          जातिमा पर्ने भएकोले प्रमाणित गरि पाउन निवेदन पेश गरेको छु।
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${formData.applicantName || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${formData.applicantAddress || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${formData.applicantCitizenship || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${formData.applicantPhone || ""}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="ainc-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >

          {/* ── Municipality header ── */}
          <div className="ainc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Breadcrumb (subject heading removed — it belongs to the विषय line) ── */}
          <div className="ainc-top-bar-title">
            प्रमाणपत्र &gt; जनजाति प्रमाणपत्र
          </div>

          {/* ── Addressee ── */}
          <div className="ainc-shree-block">
            <div className="ainc-shree-row">
              <span>श्रीमान्</span>
              <span className="ainc-req-wrap">
                <span className="ainc-req-star">*</span>
                <input
                  name="headerDesignation"
                  value={formData.headerDesignation}
                  onChange={handleChange}
                  className="ainc-inline-input ainc-name-input"
                  placeholder="पद"
                  required
                />
              </span>
              <span>ज्यू,</span>
            </div>

            <div className="ainc-stack-row">
              <span className="ainc-req-wrap" style={{ flex: 1, margin: 0 }}>
                <span className="ainc-req-star">*</span>
                <input
                  type="text"
                  name="headerDistrict"
                  value={formData.headerDistrict}
                  onChange={handleChange}
                  className="ainc-stack-input"
                  style={{ paddingLeft: 16, width: "100%" }}
                  placeholder="जिल्ला"
                  required
                />
              </span>
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
            <span className="ainc-req-wrap">
              <span className="ainc-req-star">*</span>
              <input
                name="bodyDistrict"
                value={formData.bodyDistrict}
                onChange={handleChange}
                className="ainc-inline-input medium"
                placeholder="जिल्ला"
                required
              />
            </span>
            जिल्ला
            <span className="ainc-req-wrap">
              <span className="ainc-req-star">*</span>
              <input
                name="palikaName"
                value={formData.palikaName}
                onChange={handleChange}
                className="ainc-inline-input medium"
                required
              />
            </span>
            <span style={{ whiteSpace: "nowrap" }}>वडा नं.</span>
            <span className="ainc-req-wrap">
              <span className="ainc-req-star">*</span>
              <input
                name="wardNo"
                value={formData.wardNo}
                onChange={handleChange}
                className="ainc-inline-input small"
                required
              />
            </span>
            निवासी
            <span className="ainc-req-wrap">
              <span className="ainc-req-star">*</span>
              <input
                name="residentName"
                value={formData.residentName}
                onChange={handleChange}
                className="ainc-inline-input long"
                placeholder="निवासीको नाम"
                required
              />
            </span>
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
            <span className="ainc-req-wrap">
              <span className="ainc-req-star">*</span>
              <input
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="ainc-inline-input long"
                placeholder="अभिभावकको नाम"
                required
              />
            </span>
            जनजाति अन्तर्गत
            <span className="ainc-req-wrap">
              <span className="ainc-req-star">*</span>
              <input
                name="tribeName"
                value={formData.tribeName}
                onChange={handleChange}
                className="ainc-inline-input long"
                placeholder="जातिको नाम"
                required
              />
            </span>
            जातिमा पर्ने भएकोले प्रमाणित गरि पाउन निवेदन पेश गरेको छु।
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Footer buttons ── */}
          <div className="ainc-footer">
            <button
              type="submit"
              className="ainc-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाउँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="ainc-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाउँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ainc-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default ApplicationforIndigenousNationalityCertification;