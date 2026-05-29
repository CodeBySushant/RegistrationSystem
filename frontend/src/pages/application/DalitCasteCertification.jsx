import React, { useState, useRef } from "react";
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
  cdoTitle:             "प्रमुख जिल्ला अधिकारी",
  headerDistrict:       MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict:         MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  palikaName:           MUNICIPALITY?.name            || "",
  wardNo:               MUNICIPALITY?.wardNumber      || "",
  residentName:         "",
  relation:             "छोरा",
  guardianName:         "",
  casteName:            "",
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
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

/* required-star wrapper */
.dcc-req-wrap { position: relative; display: inline-block; }
.dcc-req-star {
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 13px;
  line-height: 1;
}
.dcc-req-wrap .dcc-inline-input { padding-left: 15px; }

/* inline input */
.dcc-inline-input {
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
.dcc-inline-input:focus {
  border-bottom-color: #3b7dd8;
  background-color: #f0f7ff;
}
.dcc-inline-input.short        { width: 70px; }
.dcc-inline-input.long         { width: 220px; }
.dcc-inline-input.header-field {
  font-size: 16px;
  font-weight: bold;
  width: 260px;
  border-bottom: 1px dotted #000;
}

/* inline select */
.dcc-inline-select {
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
.dcc-inline-select:focus { border-bottom-color: #3b7dd8; }

.dcc-footer {
  clear: both;
  text-align: center;
  margin-top: 30px;
  padding-top: 30px;
}
.dcc-save-print-btn {
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
}
.dcc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.dcc-copyright {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .dcc-container { width: 100%; padding: 15px; }
  .dcc-form-row { flex-direction: column; }
  .dcc-inline-input { width: 110px; }
  .dcc-inline-input.header-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const DalitCasteCertification = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading]   = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    if (!d.cdoTitle?.trim())       return "अधिकारीको पद आवश्यक छ";
    if (!d.mainDistrict?.trim())   return "जिल्लाको नाम आवश्यक छ";
    if (!d.palikaName?.trim())     return "पालिकाको नाम आवश्यक छ";
    if (!d.wardNo?.trim())         return "वडा नम्बर आवश्यक छ";
    if (!d.residentName?.trim())   return "निवासीको नाम आवश्यक छ";
    if (!d.casteName?.trim())      return "जातिको नाम आवश्यक छ";
    if (!d.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!d.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    const err = validate(formData);
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setLoading(true);
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
        <title>दलित जाति प्रमाणित</title>
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
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .addressee { margin-bottom: 8px; font-size: 11pt; font-weight: bold; }
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
            <div class="addressee">श्रीमान् <span class="value">${formData.cdoTitle || ""}</span>ज्यु,</div>
            <div><span class="value">${formData.headerDistrict || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <strong>${formData.date || ""}</strong></div>
          </div>
        </div>

        <div class="subject">विषय: दलित जाति प्रमाणित गरि पाउँ ।</div>

        <div class="body-text">
          <span class="value">${formData.mainDistrict || ""}</span>
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
          दलित जाति अन्तर्गत
          <span class="value">${formData.casteName || ""}</span>
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा
          कार्यालयको सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को
          टिकट टाँसी यो निवेदन पेश गरेको छु ।
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

      <div className="dcc-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >
          {/* ── Municipality header ── */}
          <div className="dcc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="dcc-form-row">
            <div className="dcc-header-to-group">
              <h3>
                श्रीमान्{" "}
                <span className="dcc-req-wrap">
                  <span className="dcc-req-star">*</span>
                  <input
                    type="text"
                    name="cdoTitle"
                    className="dcc-inline-input long"
                    value={formData.cdoTitle}
                    onChange={handleChange}
                    required
                  />
                </span>
                ज्यु,
              </h3>
              <div className="dcc-req-wrap">
                <span className="dcc-req-star">*</span>
                <input
                  type="text"
                  name="headerDistrict"
                  className="dcc-inline-input header-field"
                  value={formData.headerDistrict}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="dcc-date-group">
              <label>मिति :</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
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
            <span className="dcc-req-wrap">
              <span className="dcc-req-star">*</span>
              <input
                type="text"
                name="mainDistrict"
                className="dcc-inline-input"
                value={formData.mainDistrict}
                onChange={handleChange}
                required
              />
            </span>
            &nbsp;जिल्ला&nbsp;
            <span className="dcc-req-wrap">
              <span className="dcc-req-star">*</span>
              <input
                type="text"
                name="palikaName"
                className="dcc-inline-input"
                value={formData.palikaName}
                onChange={handleChange}
                placeholder="गाउँपालिका/नगरपालिका"
                required
              />
            </span>
            &nbsp;वडा नं.&nbsp;
            <span className="dcc-req-wrap">
              <span className="dcc-req-star">*</span>
              <input
                type="text"
                name="wardNo"
                className="dcc-inline-input short"
                value={formData.wardNo}
                onChange={handleChange}
                placeholder="वडा"
                required
              />
            </span>
            &nbsp;निवासी&nbsp;
            <span className="dcc-req-wrap">
              <span className="dcc-req-star">*</span>
              <input
                type="text"
                name="residentName"
                className="dcc-inline-input"
                value={formData.residentName}
                onChange={handleChange}
                placeholder="निवासीको नाम"
                required
              />
            </span>
            &nbsp;को&nbsp;
            <select
              name="relation"
              className="dcc-inline-select"
              value={formData.relation}
              onChange={handleChange}
            >
              <option>छोरा</option>
              <option>छोरी</option>
              <option>पति</option>
              <option>पत्नी</option>
            </select>
            &nbsp;म&nbsp;
            <input
              type="text"
              name="guardianName"
              className="dcc-inline-input"
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="अभिभावकको नाम"
            />
            &nbsp;दलित जाति अन्तर्गत&nbsp;
            <span className="dcc-req-wrap">
              <span className="dcc-req-star">*</span>
              <input
                type="text"
                name="casteName"
                className="dcc-inline-input"
                value={formData.casteName}
                onChange={handleChange}
                placeholder="जातिको नाम"
                required
              />
            </span>
            &nbsp;जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा
            कार्यालयको सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को
            टिकट टाँसी यो निवेदन पेश गरेको छु ।
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Footer buttons ── */}
          <div className="dcc-footer">
            <button
              type="submit"
              className="dcc-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="dcc-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="dcc-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>
        </form>
      </div>
    </>
  );
};

export default DalitCasteCertification;