// DomesticAnimalMaternityNutritionAllowance.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DomesticAnimalMaternityNutritionAllowance.css)
   All classes prefixed with "damn-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* --- Main Container --- */
  .damn-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* --- Utility --- */
  .damn-bold      { font-weight: bold; }
  .damn-underline { text-decoration: underline; }

  /* --- Top Bar --- */
  .damn-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .damn-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* --- Meta --- */
  .damn-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .damn-meta-left p, .damn-meta-right p { margin: 5px 0; }
  .damn-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .damn-w-small  { width: 120px; }
  .damn-w-tiny   { width: 40px; text-align: center; }
  .damn-w-medium { width: 160px; }
  .damn-w-long   { width: 250px; }

  /* --- Subject --- */
  .damn-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* --- Addressee --- */
  .damn-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .damn-addressee-row { margin-bottom: 8px; }

  /* --- Body --- */
  .damn-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .damn-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .damn-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }

  /* --- Required-star wrapper --- */
  .damn-req-wrap {
    position: relative;
    display: inline-block;
  }
  .damn-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }
  .damn-req-wrap input { padding-left: 18px; }

  /* --- Signature --- */
  .damn-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .damn-signature-block   { width: 220px; text-align: center; }
  .damn-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .damn-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .damn-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* --- Footer --- */
  .damn-footer { text-align: center; margin-top: 40px; }
  .damn-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  .damn-save-print-btn:hover    { background-color: #1a252f; }
  .damn-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .damn-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
const toNepaliDigits = (str) => {
  const map = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };
  return str.replace(/[0-9]/g, (d) => map[d]);
};

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalan_no: "",
  subject: "गाई / भैंसी सुत्केरी पोषण भत्ता उपलब्ध गरिदिने बारे ।",
  issue_date: new Date().toISOString().slice(0, 10),
  nepali_date_label: "", 
  district: MUNICIPALITY.district,
  municipality_name_header: MUNICIPALITY.name,
  municipality_name_body: MUNICIPALITY.name,
  municipality_city: MUNICIPALITY.city,
  ward_no: "",
  resident_name: "",
  duration_value: "",
  duration_unit: "महिना",
  calving_date: "",
  animal_count: 1,
  signer_name: "",
  signer_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DomesticAnimalMaternityNutritionAllowance = () => {
  const { user } = useAuth();
  const { form, setForm } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "animal_count" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSave = async (shouldPrint = false) => {
    if (!form.resident_name?.trim()) {
      alert("निवासीको नाम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/animal-maternity-allowance",
        payload,
      );
      if (res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + res.data.id);
        }
        setForm(initialState);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  // clean form after submit
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
      <title>गाई / भैंसी सुत्केरी पोषण भत्ता</title>
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
        .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
        .addressee { margin-bottom: 16px; font-size: 11pt; }
        .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 24px; }
        .value { font-weight: bold; padding: 0 4px; display: inline-block; min-width: 60px; }
        .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
        .sig-block { width: 200px; text-align: center; }
        .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
        .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
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
        <div class="addr">${MUNICIPALITY.officeLine}</div>
        <div class="addr">${MUNICIPALITY.provinceLine}</div>
      </div>

      <div class="meta">
        <div>
          <div>पत्र संख्या : <strong>२०८२/८३</strong></div>
          <div>चलानी नं. : <span class="value">${form.chalan_no || ""}</span></div>
        </div>
        <div style="text-align:right">
          <div>मिति : <strong>${form.issue_date || ""}</strong></div>
          <div>ने.सं : <strong>${form.nepali_date_label || ""}</strong></div>
        </div>
      </div>

      <div class="subject">विषय: ${form.subject}</div>

      <div class="addressee">
        श्री पशु सेवा शाखा,<br/>
        <span class="value">${form.municipality_name_header || ""}</span> ।
      </div>

      <div class="body-text">
        प्रस्तुत विषयमा यस नगर कार्यपालिकाबाट पारित "गाई/भैंसी सुत्केरी पोषण
        भत्ता, ब्याडको बोका व्यवस्थापन र भ्याक्सिनेसन कार्यक्रम कार्यान्वयन
        विधि, २०७४" अनुसार जिल्ला
        <span class="value">${form.municipality_city || ""}</span>
        <span class="value">${form.municipality_name_body || ""}</span>
        वडा नं. <span class="value">${form.ward_no || ""}</span>
        बस्ने
        <span class="value">${form.resident_name || ""}</span>
        को निजकै घरमा विगत
        <span class="value">${form.duration_value || ""}</span>
        <span class="value">${form.duration_unit || ""}</span>
        देखि पालन पोषण हुँदै आएको गाई / भैंसी मिति
        <span class="value">${form.calving_date || ""}</span>
        मा सुत्केरी भएकोले कार्यविधि अनुसार निजले पाउने सुत्केरी पोषण भत्ता
        उपलब्ध गरि दिनु हुन अनुरोध छ ।
      </div>

      <div class="signature">
        <div class="sig-block">
          <div class="sig-line"></div>
          <div>${form.signer_name || ""}</div>
          <div>${form.signer_designation || ""}</div>
        </div>
      </div>

      <div class="applicant-box">
        <div class="applicant-title">निवेदकको विवरण</div>
        <div class="field-row">
          <span class="field-label">नाम:</span>
          <span class="field-val">${form.applicant_name || ""}</span>
        </div>
        <div class="field-row">
          <span class="field-label">ठेगाना:</span>
          <span class="field-val">${form.applicant_address || ""}</span>
        </div>
        <div class="field-row">
          <span class="field-label">नागरिकता नं.:</span>
          <span class="field-val">${form.applicant_citizenship_no || ""}</span>
        </div>
        <div class="field-row">
          <span class="field-label">फोन:</span>
          <span class="field-val">${form.applicant_phone || ""}</span>
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

      <form
        className="damn-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="damn-top-bar">
          गाई / भैंसी सुत्केरी पोषण भत्ता ।
          <span className="damn-breadcrumb">
            पशुपालन &gt; गाई / भैंसी सुत्केरी पोषण भत्ता
          </span>
        </div>

        {/* ── Header ── */}
        <div className="damn-header">
          <MunicipalityHeader />
        </div>

        {/* ── Meta ── */}
        <div className="damn-meta-row">
          <div className="damn-meta-left">
            <p>
              पत्र संख्या : <span className="damn-bold">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :
              <input
                name="chalan_no"
                type="text"
                className="damn-dotted-input damn-w-small"
                value={form.chalan_no || ""}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="damn-meta-right">
            <p>
              मिति :
              <input
                name="issue_date"
                type="date"
                className="damn-dotted-input damn-w-small"
                value={form.issue_date || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              ने.सं :
              <input
                name="nepali_date_label"
                type="text"
                className="damn-dotted-input"
                style={{ width: "220px" }}
                placeholder="जस्तै: 1146 थिंलागा, 30 शनिबार"
                value={form.nepali_date_label || ""}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="damn-subject">
          <p>
            विषय: <span className="damn-underline">{form.subject}</span>
          </p>
        </div>

        {/* ── Addressee ── */}
        <div className="damn-addressee">
          <div className="damn-addressee-row">
            <span>श्री पशु सेवा शाखा,</span>
          </div>
          <div className="damn-addressee-row">
            <input
              name="municipality_name_header"
              type="text"
              className="damn-inline-input damn-w-medium"
              value={form.municipality_name_header}
              onChange={handleChange}
            />
            <span>।</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="damn-body">
          <p>
            प्रस्तुत विषयमा यस नगर कार्यपालिकाबाट पारित "गाई/भैंसी सुत्केरी पोषण
            भत्ता, ब्याडको बोका व्यवस्थापन र भ्याक्सिनेसन कार्यक्रम कार्यान्वयन
            विधि, २०७४" अनुसार जिल्ला
            <input
              name="municipality_city"
              type="text"
              className="damn-inline-input damn-w-medium"
              value={form.municipality_city}
              onChange={handleChange}
            />
            <input
              name="municipality_name_body"
              type="text"
              className="damn-inline-input damn-w-medium"
              value={form.municipality_name_body}
              onChange={handleChange}
            />
            वडा नं.
            {/* BUG FIX: was bare <input> with no className — now properly styled */}
            <input
              name="ward_no"
              type="text"
              className="damn-inline-input damn-w-tiny"
              value={form.ward_no}
              onChange={handleChange}
            />
            बस्ने
            <div className="damn-req-wrap">
              <span className="damn-req-star">*</span>
              <input
                name="resident_name"
                type="text"
                className="damn-inline-input damn-w-long"
                required
                value={form.resident_name}
                onChange={handleChange}
              />
            </div>
            को निजकै घरमा विगत
            <div className="damn-req-wrap">
              <span className="damn-req-star">*</span>
              <input
                name="duration_value"
                type="text"
                className="damn-inline-input damn-w-tiny"
                required
                value={form.duration_value}
                onChange={handleChange}
              />
            </div>
            <select
              name="duration_unit"
              className="damn-inline-select"
              value={form.duration_unit}
              onChange={handleChange}
            >
              <option value="महिना">महिना</option>
              <option value="वर्ष">वर्ष</option>
            </select>
            देखि पालन पोषण हुँदै आएको गाई / भैंसी मिति
            <input
              name="calving_date"
              type="date"
              className="damn-inline-input damn-w-medium"
              value={form.calving_date || ""}
              onChange={handleChange}
            />
            मा सुत्केरी भएकोले कार्यविधि अनुसार निजले पाउने सुत्केरी पोषण भत्ता
            उपलब्ध गरि दिनु हुन अनुरोध छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="damn-signature-section">
          <div className="damn-signature-block">
            <div className="damn-signature-line"></div>
            <input
              name="signer_name"
              type="text"
              className="damn-sig-name-input"
              required
              value={form.signer_name}
              onChange={handleChange}
            />
            <select
              name="signer_designation"
              className="damn-designation-select"
              value={form.signer_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="damn-footer">
          <button
            type="submit"
            className="damn-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="damn-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="damn-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default DomesticAnimalMaternityNutritionAllowance;
