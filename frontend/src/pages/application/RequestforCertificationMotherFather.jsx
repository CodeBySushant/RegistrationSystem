// src/pages/application/RequestforCertificationMotherFather.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes prefixed with "rcmf-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rcmf-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 25px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: 'Kalimati', 'Kokila', 'Arial', sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
  }

  .rcmf-container input[type="text"],
  .rcmf-container input[type="date"],
  .rcmf-container select,
  .rcmf-container textarea {
    background-color: #fff;
    font-family: inherit;
  }

  /* ── Top row (addressee + date) ── */
  .rcmf-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
  }

  /* ── Generic form-group ── */
  .rcmf-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .rcmf-form-group label { font-weight: bold; margin-right: 8px; }
  .rcmf-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
    background-color: #fff;
  }

  /* ── Header "To" ── */
  .rcmf-header-to-group { display: flex; flex-direction: column; }
  .rcmf-header-to-group h3 { font-size: 16px; font-weight: bold; margin: 0 0 10px 0; }
  .rcmf-header-to-group input {
    font-family: inherit;
    font-size: 16px;
    padding: 4px 6px;
    margin-bottom: 8px;
    border: none;
    border-bottom: 1px dotted #000;
    background: #fff;
    width: 250px;
    max-width: 100%;
  }

  /* ── Date group ── */
  .rcmf-date-group { font-weight: bold; }
  .rcmf-date-group input {
    border: none;
    border-bottom: 1px dotted #000;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    padding: 2px 6px;
    outline: none;
  }

  /* ── Subject ── */
  .rcmf-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .rcmf-certificate-body {
    line-height: 2.8;
    font-size: 16px;
    text-align: justify;
  }
  .rcmf-certificate-body input[type="text"],
  .rcmf-certificate-body select {
    display: inline-block;
    vertical-align: baseline;
    padding: 4px 6px;
    font-family: inherit;
    font-size: 15px;
    background-color: #fff;
    border: none;
    border-bottom: 1px dotted #000;
    margin: 0 5px;
    width: 120px;
    max-width: 100%;
    box-sizing: border-box;
  }
  .rcmf-certificate-body select { width: auto; min-width: 80px; }
  .rcmf-certificate-body .rcmf-short-input { width: 80px; }

  /* ── required-star wrapper (for inline body inputs) ── */
  .rcmf-req-wrap { position: relative; display: inline-block; margin: 0 5px; }
  .rcmf-req-wrap input { margin: 0 !important; padding-left: 15px !important; }
  .rcmf-req-star {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 13px;
    line-height: 1;
    z-index: 1;
  }

  /* ── Signature section — now RIGHT-floated ── */
  .rcmf-signature-section-right {
    margin-top: 30px;
    margin-bottom: 20px;
    float: right;
    width: 40%;
    min-width: 300px;
  }
  .rcmf-signature-section-right h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
  }

  /* ── Column form-group (signature fields) ── */
  .rcmf-form-group-column {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  .rcmf-form-group-column label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .rcmf-form-group-column input {
    width: 350px;
    max-width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Required star (label) ── */
  .rcmf-req { color: red; margin-left: 4px; }

  /* ── Applicant details overrides — clears the float ── */
  .rcmf-container .applicant-details-box {
    clear: both;
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .rcmf-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .rcmf-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .rcmf-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #fff;
  }

  /* ── Footer — clears the float ── */
  .rcmf-footer {
    clear: both;
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
  }
  .rcmf-save-print-btn {
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: inherit;
  }
  .rcmf-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .rcmf-copyright {
    clear: both;
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .rcmf-container { width: 100%; padding: 15px; }
    .rcmf-signature-section-right { float: none; width: 100%; min-width: 0; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: new Date().toISOString().slice(0, 10),
  cdoTitle: "प्रमुख जिल्ला अधिकारी",
  headerDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "1",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  doc1Detail: "",
  doc2Detail: "",
  sigName: "",
  sigMobile: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const RequestforCertificationMotherFather = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.cdoTitle?.trim())                   return "अधिकारीको पद भर्नुहोस्";
    if (!fd.headerDistrict?.trim())             return "जिल्ला भर्नुहोस्";
    if (!fd.mainDistrict?.trim())               return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.palikaName?.trim())                 return "पालिका/नगरपालिका भर्नुहोस्";
    if (!fd.wardNo?.toString().trim())          return "वडा नं. भर्नुहोस्";
    if (!fd.residentName?.trim())               return "निवासीको नाम भर्नुहोस्";
    if (!fd.guardianName?.trim())               return "वुवा/आमाको नाम भर्नुहोस्";
    if (!fd.doc1Detail?.trim())                 return "निवेदकको नागरिकताको विवरण भर्नुहोस्";
    if (!fd.doc2Detail?.trim())                 return "वुवा/आमाको नागरिकताको विवरण भर्नुहोस्";
    if (!fd.sigName?.trim())                    return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigMobile?.trim())                  return "मोबाइल नम्बर भर्नुहोस्";
    if (!phoneRegex.test(String(fd.sigMobile))) return "मोबाइल नम्बर अमान्य छ";
    return null;
  };

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    const err = validate(formData);
    if (err) {
      alert("कृपया: " + err);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/request-for-certification-mf", payload);

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormData(initialState);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
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
        <title>प्रमाणित गरि पाउँ</title>
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
          .sig-section { float: right; width: 45%; margin-top: 10px; }
          .sig-section h4 { font-size: 11pt; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-bottom: 10px; }
          .sig-row { margin-bottom: 8px; font-size: 10pt; }
          .applicant-box { clear: both; border: 1px solid #999; padding: 14px; margin-top: 28px; border-radius: 3px; }
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

        <div class="subject">विषय: प्रमाणित गरि पाउँ ।</div>

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
          को नागरिकता प्रमाणपत्रमा
          <span class="value">${formData.doc1Detail || ""}</span>
          भएको र वुवा/आमाको नागरिकतामा
          <span class="value">${formData.doc2Detail || ""}</span>
          भई फरक परे पनि हामीहरु बाबु, आमा र छोरा भएकोले सोही व्यहोरा प्रमाणित
          गरि पाउन, वडा कार्यालयको सिफारिस र कागजात संलग्न राखी यो निवेदन पेश
          गरेको छु ।
        </div>

        <div class="sig-section">
          <h4>निवेदकको विवरण</h4>
          <div class="sig-row">नाम : <span class="value">${formData.sigName || ""}</span></div>
          <div class="sig-row">मोबाइल नं. : <span class="value">${formData.sigMobile || ""}</span></div>
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

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="rcmf-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >

          {/* ── Municipality Header ── */}
          <div className="rcmf-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="rcmf-form-row">
            <div className="rcmf-header-to-group">
              <h3>
                श्रीमान्{" "}
                <span className="rcmf-req-wrap">
                  <span className="rcmf-req-star">*</span>
                  <input
                    type="text"
                    name="cdoTitle"
                    value={formData.cdoTitle}
                    onChange={handleChange}
                    style={{ width: 230 }}
                    required
                  />
                </span>
                ज्यु,
              </h3>
              <span className="rcmf-req-wrap">
                <span className="rcmf-req-star">*</span>
                <input
                  type="text"
                  name="headerDistrict"
                  value={formData.headerDistrict}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
            <div className="rcmf-form-group rcmf-date-group">
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
          <div className="rcmf-subject-line">
            <strong>विषय: <u>प्रमाणित गरि पाउँ ।</u></strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="rcmf-certificate-body">
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="mainDistrict"
                value={formData.mainDistrict}
                onChange={handleChange}
                required
              />
            </span>
            जिल्ला
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="palikaName"
                placeholder="गाउँपालिका/नगरपालिका"
                value={formData.palikaName}
                onChange={handleChange}
                required
              />
            </span>
            वडा नं.
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="wardNo"
                placeholder="वडा"
                value={formData.wardNo}
                onChange={handleChange}
                required
                className="rcmf-short-input"
              />
            </span>
            निवासी
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="residentName"
                placeholder="निवासीको नाम"
                value={formData.residentName}
                onChange={handleChange}
                required
              />
            </span>
            को
            <select name="relation" value={formData.relation} onChange={handleChange}>
              <option>छोरा</option>
              <option>छोरी</option>
              <option>पति</option>
              <option>पत्नी</option>
            </select>
            म
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="guardianName"
                placeholder="वुवा/आमाको नाम"
                value={formData.guardianName}
                onChange={handleChange}
                required
              />
            </span>
            को नागरिकता प्रमाणपत्रमा
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="doc1Detail"
                placeholder="निवेदकको नागरिकता विवरण"
                value={formData.doc1Detail}
                onChange={handleChange}
                required
              />
            </span>
            भएको र वुवा/आमाको नागरिकतामा
            <span className="rcmf-req-wrap">
              <span className="rcmf-req-star">*</span>
              <input
                type="text"
                name="doc2Detail"
                placeholder="वुवा/आमाको नागरिकता विवरण"
                value={formData.doc2Detail}
                onChange={handleChange}
                required
              />
            </span>
            भई फरक परे पनि हामीहरु बाबु, आमा र छोरा भएकोले सोही व्यहोरा प्रमाणित
            गरि पाउन, वडा कार्यालयको सिफारिस र कागजात संलग्न राखी यो निवेदन पेश
            गरेको छु ।
          </p>

          {/* ── Applicant signature detail — now RIGHT side ── */}
          <div className="rcmf-signature-section-right">
            <h4>निवेदकको विवरण</h4>
            <div className="rcmf-form-group-column">
              <label>नाम : <span className="rcmf-req">*</span></label>
              <input
                type="text"
                name="sigName"
                value={formData.sigName}
                onChange={handleChange}
                placeholder="पूरा नाम"
                required
              />
            </div>
            <div className="rcmf-form-group-column">
              <label>मोबाइल नं. : <span className="rcmf-req">*</span></label>
              <input
                type="text"
                name="sigMobile"
                value={formData.sigMobile}
                onChange={handleChange}
                placeholder="मोबाइल नम्बर"
                required
              />
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {/* ── Footer buttons ── */}
          <div className="rcmf-footer">
            <button
              type="submit"
              className="rcmf-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="rcmf-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="rcmf-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default RequestforCertificationMotherFather;