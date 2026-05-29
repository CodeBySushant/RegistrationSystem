import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:                 new Date().toISOString().slice(0, 10),
  cdoTitle:             "प्रमुख जिल्ला अधिकारी",
  headerDistrict:       "",
  mainDistrict:         "",
  palikaName:           MUNICIPALITY?.name || "",
  wardNo:               "",
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
   STYLES  (prefix: kacc-)
───────────────────────────────────────────── */
const styles = `
.kacc-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Kalimati','Kokila','Arial',sans-serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
}

.kacc-header-row {
  margin-bottom: 16px;
}

.kacc-form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  gap: 16px;
}

.kacc-header-to-group {
  display: flex;
  flex-direction: column;
}
.kacc-header-to-group h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
}
.kacc-header-to-group input {
  font-family: inherit;
  font-size: 16px;
  padding: 4px 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 250px;
  max-width: 100%;
  outline: none;
}
.kacc-header-to-group input:focus { border-color: #3b7dd8; }

.kacc-date-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-weight: bold;
  gap: 8px;
}
.kacc-date-group input {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  padding: 3px 6px;
}
.kacc-date-group input:focus { border-color: #3b7dd8; }

.kacc-subject-line {
  text-align: center;
  margin: 25px 0;
  font-size: 16px;
}

.kacc-certificate-body {
  line-height: 2.8;
  font-size: 16px;
  text-align: left;
}
.kacc-certificate-body input[type="text"],
.kacc-certificate-body select {
  display: inline-block;
  vertical-align: baseline;
  padding: 3px 6px;
  font-family: inherit;
  font-size: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 4px;
  width: 120px;
  max-width: 100%;
  box-sizing: border-box;
  outline: none;
}
.kacc-certificate-body input[type="text"]:focus,
.kacc-certificate-body select:focus { border-color: #3b7dd8; }
.kacc-certificate-body select {
  width: auto;
  min-width: 80px;
  cursor: pointer;
}
.kacc-certificate-body .kacc-short { width: 80px; }

/* required-star wrapper */
.kacc-req-wrap { position: relative; display: inline-block; margin: 0 2px; }
.kacc-req-wrap input { margin: 0 !important; padding-left: 15px !important; }
.kacc-req-star {
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 12px;
  line-height: 1;
  z-index: 1;
}

.kacc-footer {
  clear: both;
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
}
.kacc-save-print-btn {
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
}
.kacc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.kacc-copyright {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .kacc-container { width: 100%; padding: 15px; }
  .kacc-form-row { flex-direction: column; gap: 12px; }
  .kacc-certificate-body input[type="text"] { width: 90px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ApplicationforKhasAryaCasteCertification = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.cdoTitle?.trim())       return "अधिकारीको पद आवश्यक छ";
    if (!formData.headerDistrict?.trim()) return "हेडर जिल्ला आवश्यक छ";
    if (!formData.mainDistrict?.trim())   return "मुख्य जिल्ला आवश्यक छ";
    if (!formData.palikaName?.trim())     return "पालिकाको नाम आवश्यक छ";
    if (!formData.wardNo?.trim())         return "वडा नं. आवश्यक छ";
    if (!formData.residentName?.trim())   return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName?.trim())   return "अभिभावकको नाम आवश्यक छ";
    if (!formData.casteName?.trim())      return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    const error = validate();
    if (error) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + error); return; }

    setLoading(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach(
        (k) => payload[k] === "" && (payload[k] = null),
      );

      const res = await axios.post(
        "/api/forms/khas-arya-certification",
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
        <title>खस आर्य जाति प्रमाणित</title>
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
            <div class="addressee">श्रीमान् <span class="value">${formData.cdoTitle || ""}</span>ज्यु,</div>
            <div style="margin-top:6px"><span class="value">${formData.headerDistrict || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <strong>${formData.date || ""}</strong></div>
          </div>
        </div>

        <div class="subject">विषय: खस आर्य जाति प्रमाणित गरि पाउँ ।</div>

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
          खस आर्य जाति अन्तर्गत
          <span class="value">${formData.casteName || ""}</span>
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
          सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
          निवेदन पेश गरेको छु ।
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

      <div className="kacc-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >

          {/* ── Municipality header ── */}
          <div className="kacc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date row ── */}
          <div className="kacc-form-row">
            <div className="kacc-header-to-group">
              <h3>
                श्रीमान्{" "}
                <span className="kacc-req-wrap">
                  <span className="kacc-req-star">*</span>
                  <input
                    type="text"
                    name="cdoTitle"
                    value={formData.cdoTitle}
                    onChange={handleChange}
                    style={{ width: 230, fontSize: 16, marginBottom: 0 }}
                    required
                  />
                </span>
                ज्यु,
              </h3>
              <span className="kacc-req-wrap">
                <span className="kacc-req-star">*</span>
                <input
                  type="text"
                  name="headerDistrict"
                  value={formData.headerDistrict}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </span>
            </div>

            <div className="kacc-date-group">
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
          <div className="kacc-subject-line">
            <strong>
              विषय: <u>खस आर्य जाति प्रमाणित गरि पाउँ ।</u>
            </strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="kacc-certificate-body">
            <span className="kacc-req-wrap">
              <span className="kacc-req-star">*</span>
              <input
                type="text"
                name="mainDistrict"
                value={formData.mainDistrict}
                onChange={handleChange}
                placeholder=""
                required
              />
            </span>
            जिल्ला
            <span className="kacc-req-wrap">
              <span className="kacc-req-star">*</span>
              <input
                type="text"
                name="palikaName"
                value={formData.palikaName}
                onChange={handleChange}
                required
              />
            </span>
            <span style={{ whiteSpace: "nowrap" }}>वडा नं.</span>
            <span className="kacc-req-wrap">
              <span className="kacc-req-star">*</span>
              <input
                type="text"
                name="wardNo"
                value={formData.wardNo}
                onChange={handleChange}
                className="kacc-short"
                required
              />
            </span>
            निवासी
            <span className="kacc-req-wrap">
              <span className="kacc-req-star">*</span>
              <input
                type="text"
                name="residentName"
                value={formData.residentName}
                onChange={handleChange}
                placeholder="निवासीको नाम"
                required
              />
            </span>
            को
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="पति">पति</option>
              <option value="पत्नी">पत्नी</option>
            </select>
            म
            <span className="kacc-req-wrap">
              <span className="kacc-req-star">*</span>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="अभिभावकको नाम"
                required
              />
            </span>
            खस आर्य जाति अन्तर्गत
            <span className="kacc-req-wrap">
              <span className="kacc-req-star">*</span>
              <input
                type="text"
                name="casteName"
                value={formData.casteName}
                onChange={handleChange}
                placeholder="जातिको नाम"
                required
              />
            </span>
            जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
            सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
            निवेदन पेश गरेको छु ।
          </p>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Footer buttons ── */}
          <div className="kacc-footer">
            <button
              type="submit"
              className="kacc-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाउँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="kacc-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाउँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="kacc-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default ApplicationforKhasAryaCasteCertification;