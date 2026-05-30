// src/pages/GovOrganizationReg/GovOrganizationReg.jsx
import React, { useState } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .gor-form-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gor-form-container {
    width: 90%;
    padding: 40px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
    margin-top: 10px;
    font-family: 'Kalimati', 'Kokila', "Mangal", sans-serif;
    color: #000;
  }

  .gor-top-bar-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .gor-top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  .gor-sub-header {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    line-height: 26px;
    border-top: 1px solid #ccc;
    padding-top: 14px;
  }

  /* ── Meta row: patra sankhya left, date + ref no right ── */
  .gor-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px 0 0;
  }
  .gor-meta-left,
  .gor-meta-right {
    font-size: 1rem;
  }
  .gor-meta-left { text-align: left; }
  .gor-meta-right { text-align: right; }
  .gor-meta-left p,
  .gor-meta-right p {
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .gor-meta-right p { justify-content: flex-end; }
  .gor-date-input {
    border: 1px solid #ccc;
    background-color: #fff;
    outline: none;
    width: 150px;
    font-size: 1rem;
    font-family: inherit;
    padding: 4px 8px;
    border-radius: 3px;
  }

  .gor-top-info {
    margin: 20px 0;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .gor-top-info-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .gor-top-info-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    width: 200px;
    font-size: 1rem;
    font-family: inherit;
    padding: 2px 5px 2px 18px;
  }

  /* ── Subject centered ── */
  .gor-subject {
    text-align: center;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 30px 0;
  }

  .gor-paragraph {
    font-size: 1rem;
    line-height: 2;
    margin-top: 10px;
  }

  .gor-section-title {
    font-weight: bold;
    margin-top: 30px;
    font-size: 1.05rem;
  }

  .gor-section {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .gor-section label {
    margin-top: 10px;
    margin-bottom: 4px;
    font-size: 1rem;
    font-weight: 600;
  }
  .gor-section input {
    margin-bottom: 4px;
    padding: 8px;
    border: 1px solid #bbb;
    width: 50%;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
  }

  .gor-inline-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    font-size: 1rem;
  }
  .gor-inline-row input {
    width: 80px !important;
    margin: 0 4px;
  }

  .gor-inline-input-wrapper {
    position: relative;
    display: inline-block;
  }
  .gor-input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
    z-index: 1;
  }
  .gor-inline-input-wrapper input {
    padding-left: 18px;
  }
  .gor-required {
    color: red;
    margin-left: 4px;
  }

  .gor-form-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .gor-form-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .gor-form-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .gor-form-container .detail-group {
    display: flex;
    flex-direction: column;
  }
  .gor-form-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
    margin-top: 0;
  }
  .gor-form-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .gor-form-container .bg-gray {
    background-color: #eef2f5 !important;
  }

  .gor-form-footer {
    text-align: center;
    margin-top: 40px;
  }
  .gor-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }
  .gor-save-print-btn:hover:not(:disabled) {
    background-color: #1a252f;
  }
  .gor-save-print-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .gor-copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  status: "pending",
  date: new Date().toISOString().slice(0, 10),
  letterNo: "2082/83",
  refNo: "",
  proposalName: "",
  officerName: "",
  municipalityName: "",
  wardNo: "",
  purpose: "",
  activities: "",
  headOffice: "",
  branchOffice: "",
  liability: "",
  femaleMembers: "",
  maleMembers: "",
  totalShareCapital: "",
  entranceFee: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   StarInput — defined outside so it never remounts (avoids focus loss)
───────────────────────────────────────────────────────────────────────────── */
const StarInput = ({ className = "", ...props }) => (
  <div className="gor-inline-input-wrapper">
    <span className="gor-input-required-star">*</span>
    <input className={className} {...props} />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const GovOrganizationReg = () => {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);

  /* ── validate ── */
  const validate = () => {
    const required = [
      "proposalName",
      "wardNo",
      "purpose",
      "activities",
      "headOffice",
      "liability",
      "totalShareCapital",
      "entranceFee",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (const k of required) {
      if (!form[k] || String(form[k]).trim() === "")
        return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(form.applicantPhone))) {
      return { ok: false, missing: "applicantPhone (invalid format)" };
    }
    return { ok: true };
  };

  /* ── Single save function — one POST, no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;

    const v = validate();
    if (!v.ok) {
      alert("कृपया भर्नुहोस्: " + v.missing);
      return;
    }

    setLoading(true);
    try {
      // Convert empty strings to null so backend doesn't store blank strings
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, val]) => [k, val === "" ? null : val])
      );

      const res = await axios.post(
        "/api/forms/gov-organization-registration",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        }
        setForm(initialState);
      } else {
        alert("Unexpected response: " + res.status);
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

  /* ── Clean print — isolated print window, only the form ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>सहकारी संस्था दर्ता सिफारिस</title>
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
          .sub-header { text-align: center; font-size: 12pt; margin: 16px 0; line-height: 1.6; border-top: 1px solid #ccc; padding-top: 12px; }
          .meta { display: flex; justify-content: space-between; align-items: flex-start; margin: 12px 0; font-size: 11pt; line-height: 1.8; }
          .meta-left { text-align: left; }
          .meta-right { text-align: right; }
          .top-info { margin: 18px 0; font-size: 11pt; line-height: 2; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .paragraph { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 20px; }
          .section-title { font-weight: bold; font-size: 11pt; margin: 18px 0 10px; }
          .detail-line { font-size: 11pt; line-height: 2; margin-bottom: 4px; }
          /* value sizes to content — no fixed width so small values don't leave
             big gaps and long values don't get clipped or merge into text */
          .value { font-weight: bold; padding: 0 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 24px; border-radius: 3px; }
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

        <div class="sub-header">
          अनुसूची २<br/>
          दर्ता दरखास्तको नमुना
        </div>

        <div class="meta">
          <div class="meta-left">
            <div>पत्र संख्या : <span class="value">${form.letterNo || ""}</span></div>
          </div>
          <div class="meta-right">
            <div>मिति : <span class="value">${form.date || ""}</span></div>
            <div>सन्दर्भ नं. : <span class="value">${form.refNo || ""}</span></div>
          </div>
        </div>

        <div class="top-info">
          श्री दत्ता गर्ने अधिकारी
          <span class="value">${form.officerName || ""}</span>
          ज्यू,<br/>
          <span class="value">${form.municipalityName || ""}</span>
          , नगर कार्यपालिकाको कार्यालय ।
        </div>

        <div class="subject">विषय : सहकारी संस्था दर्ता ।</div>

        <div class="paragraph">
          महोदय,<br/><br/>
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
          गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
        </div>

        <div class="section-title">संस्थासम्बन्धी विवरण</div>

        <div class="detail-line">(क) प्रस्तावित संस्था नामः <span class="value">${form.proposalName || ""}</span></div>
        <div class="detail-line">(ख) ठेगाना: वडा नं. <span class="value">${form.wardNo || ""}</span></div>
        <div class="detail-line">(ग) उद्देश्य: <span class="value">${form.purpose || ""}</span></div>
        <div class="detail-line">(घ) गतिविधि: <span class="value">${form.activities || ""}</span></div>
        <div class="detail-line">(ङ) मुख्य कार्यालय: <span class="value">${form.headOffice || ""}</span></div>
        <div class="detail-line">(च) शाखा कार्यालय: <span class="value">${form.branchOffice || ""}</span></div>
        <div class="detail-line">(छ) दायित्व: <span class="value">${form.liability || ""}</span></div>
        <div class="detail-line">(ज) सदस्य संख्या: महिला: <span class="value">${form.femaleMembers || ""}</span> जना &nbsp; पुरुष: <span class="value">${form.maleMembers || ""}</span> जना</div>
        <div class="detail-line">(झ) कुल शेयर पूँजीको रकमः <span class="value">${form.totalShareCapital || ""}</span></div>
        <div class="detail-line">(ञ) प्राप्त प्रवेश शुल्कको रकमः <span class="value">${form.entranceFee || ""}</span></div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${form.applicantName || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${form.applicantAddress || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${form.applicantCitizenship || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${form.applicantPhone || ""}</span>
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

  /* ───────────────────────────────────────────────────────────────────────────
     Render
  ─────────────────────────────────────────────────────────────────────────── */
  return (
    <div className="gor-form-page">
      <style>{STYLES}</style>

      <form
        className="gor-form-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="gor-top-bar-title">
          सहकारी संस्था दर्ता सिफारिस ।
          <span className="gor-top-right-bread">
            सहकारी &gt; सहकारी संस्था दर्ता सिफारिस
          </span>
        </div>

        {/* ── Letterhead Header (shared component) ── */}
        <MunicipalityHeader />

        {/* ── Sub Header ── */}
        <div className="gor-sub-header">
          <span>अनुसूची २</span>
          <br />
          <span>दर्ता दरखास्तको नमुना</span>
        </div>

        {/* ── Meta row: patra sankhya (left), date + ref no (right) ── */}
        <div className="gor-meta-row">
          <div className="gor-meta-left">
            <p>
              पत्र संख्या :
              <input
                type="text"
                className="gor-date-input"
                name="letterNo"
                placeholder="2082/83"
                value={form.letterNo}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="gor-meta-right">
            <p>
              मिति :
              <input
                name="date"
                type="date"
                className="gor-date-input"
                value={form.date || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              सन्दर्भ नं. :
              <StarInput
                type="text"
                className="gor-top-info-input"
                name="refNo"
                value={form.refNo}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>

        {/* ── Addressee / Top Info ── */}
        <div className="gor-top-info">
          <div className="gor-top-info-row">
            <span>श्री दत्ता गर्ने अधिकारी</span>
            <StarInput
              type="text"
              className="gor-top-info-input"
              name="officerName"
              value={form.officerName}
              onChange={handleChange}
            />
            <span>ज्यू,</span>
          </div>

          <div className="gor-top-info-row">
            <StarInput
              type="text"
              className="gor-top-info-input"
              name="municipalityName"
              value={form.municipalityName}
              onChange={handleChange}
            />
            <span>, नगर कार्यपालिकाको कार्यालय ।</span>
          </div>
        </div>

        {/* ── Subject (centered) ── */}
        <h3 className="gor-subject">विषय : सहकारी संस्था दर्ता ।</h3>

        {/* ── Intro paragraph ── */}
        <p className="gor-paragraph">
          महोदय,
          <br />
          <br />
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
          गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
        </p>

        {/* ── Section: Organization details ── */}
        <h3 className="gor-section-title">संस्थासम्बन्धी विवरण</h3>

        <div className="gor-section">
          <label>(क) प्रस्तावित संस्था नामः *</label>
          <StarInput
            type="text"
            name="proposalName"
            value={form.proposalName}
            onChange={handleChange}
          />

          <label>(ख) ठेगाना: वडा नं. *</label>
          <StarInput
            type="text"
            name="wardNo"
            value={form.wardNo}
            onChange={handleChange}
          />

          <label>(ग) उद्देश्य: *</label>
          <StarInput
            type="text"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
          />

          <label>(घ) गतिविधि: *</label>
          <StarInput
            type="text"
            name="activities"
            value={form.activities}
            onChange={handleChange}
          />

          <label>(ङ) मुख्य कार्यालय: *</label>
          <StarInput
            type="text"
            name="headOffice"
            value={form.headOffice}
            onChange={handleChange}
          />

          <label>(च) शाखा कार्यालय:</label>
          <StarInput
            type="text"
            name="branchOffice"
            value={form.branchOffice}
            onChange={handleChange}
          />

          <label>(छ) दायित्व: *</label>
          <StarInput
            type="text"
            name="liability"
            value={form.liability}
            onChange={handleChange}
          />

          <label>(ज) सदस्य संख्या:</label>
          <div className="gor-inline-row">
            महिला:{" "}
            <StarInput
              type="text"
              name="femaleMembers"
              value={form.femaleMembers}
              onChange={handleChange}
            />{" "}
            जना &nbsp; पुरुष:{" "}
            <StarInput
              type="text"
              name="maleMembers"
              value={form.maleMembers}
              onChange={handleChange}
            />{" "}
            जना
          </div>

          <label>(झ) कुल शेयर पूँजीको रकमः *</label>
          <StarInput
            type="text"
            name="totalShareCapital"
            value={form.totalShareCapital}
            onChange={handleChange}
          />

          <label>(ञ) प्राप्त प्रवेश शुल्कको रकमः *</label>
          <StarInput
            type="text"
            name="entranceFee"
            value={form.entranceFee}
            onChange={handleChange}
          />
        </div>

        {/* ── Applicant Details (shared component) ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons ── */}
        <div className="gor-form-footer">
          <button
            type="submit"
            className="gor-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="gor-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="gor-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
};

export default GovOrganizationReg;