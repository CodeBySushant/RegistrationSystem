import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes scoped under .audit-container
───────────────────────────────────────────────────────────────────────────── */
const styles = `
  /* --- Main Container --- */
  .audit-container {
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
  .audit-container .bold-text { font-weight: bold; }
  .audit-container .underline-text { text-decoration: underline; }

  /* --- Top Bar --- */
  .audit-container .top-bar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }

  .audit-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Meta Data --- */
  .audit-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .audit-container .meta-left p,
  .audit-container .meta-right p { margin: 5px 0; }

  /* --- Meta input — was transparent; now white bg like body inputs --- */
  .audit-container .dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .audit-container .small-input { width: 120px; }

  /* --- Addressee Section --- */
  .audit-container .addressee-section {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .audit-container .addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  /* --- Addressee/bodartha input — was transparent; now white bg --- */
  .audit-container .line-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    margin: 0 10px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .audit-container .medium-input { width: 250px; }
  .audit-container .full-width-input { width: 100%; box-sizing: border-box; }

  /* --- Subject --- */
  .audit-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* --- Body Paragraph & Inputs --- */
  .audit-container .form-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }

  .audit-container .inline-box-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .audit-container .tiny-box  { width: 60px;  text-align: center; }
  .audit-container .small-box { width: 100px; }
  .audit-container .medium-box{ width: 160px; }
  .audit-container .long-box  { width: 250px; }

  /* --- Bodartha Section --- */
  .audit-container .bodartha-section {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .audit-container .bodartha-section label {
    font-size: 1.1rem;
    white-space: nowrap;
  }

  .audit-container .bodartha-input-container {
    position: relative;
    width: 250px;
  }

  .audit-container .bodartha-input-container .line-input {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
  }

  /* --- Signature Section --- */
  .audit-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .audit-container .signature-block {
    width: 220px;
    text-align: center;
  }

  /* signature signer_name keeps the signature-line look (no box) */
  .audit-container .signature-block .sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
    padding: 4px 4px 4px 18px;
    box-sizing: border-box;
  }

  .audit-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .audit-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Red * wrapper — inline by default, block modifier for full-width contexts --- */
  .audit-container .audit-req-wrap {
    position: relative;
    display: inline-block;
  }
  .audit-container .audit-req-wrap.audit-req-block {
    display: block;
    width: 100%;
  }

  .audit-container .audit-req-star {
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

  .audit-container .audit-req-wrap input { padding-left: 18px; }

  /* --- Applicant Details Box --- */
  .audit-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .audit-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .audit-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .audit-container .detail-group { display: flex; flex-direction: column; }

  .audit-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .audit-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Footer --- */
  .audit-container .form-footer { text-align: center; margin-top: 40px; }

  .audit-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .audit-container .save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .audit-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .audit-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .audit-container { padding: 20px 16px; }

    .audit-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .audit-container .inline-box-input {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .audit-container .small-box,
    .audit-container .medium-box,
    .audit-container .long-box,
    .audit-container .medium-input,
    .audit-container .small-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .audit-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .audit-container .bodartha-input-container { width: 100%; }
    .audit-container .signature-section { justify-content: center; }
    .audit-container .meta-data-row { flex-direction: column; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   - Hardcoded पत्र संख्या / मिति now editable
   - ne_sa added (like DAIC's nepali_date_label)
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  // Meta
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  nepali_date_label: "",

  // Subject (fixed)
  subject: "लेखा परिक्षण सम्बन्धमा ।",

  // Addressee
  subject_to: "",
  subject_org: "",

  // Body
  office_name: "",
  ward_no: MUNICIPALITY?.wardNumber || "",
  organization_name: "",
  organization_extra: "",
  fiscal_year: "",
  auditor_name: "",
  auditor_certificate_no: "",
  organization_reg_no: "",
  auditor_org_name: "",
  auditor_org_extra: "",
  auditor_extra_role: "",

  // Bodartha
  bodartha: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // ApplicantDetailsNp
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const LekhaParikshyan = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.subject_to?.trim()) {
      alert("प्राप्तकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.office_name?.trim()) {
      alert("कार्यालयको नाम आवश्यक छ");
      return;
    }
    if (!form.organization_name?.trim()) {
      alert("संस्थाको नाम आवश्यक छ");
      return;
    }
    if (!form.auditor_name?.trim()) {
      alert("लेखा परिक्षकको नाम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/lekha-parikshyan", form);
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

  /* ── Clean print — isolated window, no surrounding UI ── */
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
        <title>लेखा परिक्षण सम्बन्धमा</title>
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
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .bodartha { margin: 16px 0; font-size: 11pt; }
          .bodartha-label { font-weight: bold; text-decoration: underline; margin-right: 8px; }
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
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.nepali_date_label || ""}</span></div>
          </div>
        </div>

        <div class="subject">विषय: ${form.subject}</div>

        <div class="addressee">
          श्री <span class="value">${form.subject_to || ""}</span><br/>
          <span class="value">${form.subject_org || ""}</span> ।
        </div>

        <div class="body-text">
          प्रस्तुत बिषयमा यस
          <span class="value">${form.office_name || ""}</span>
          वडा नं. <span class="value">${form.ward_no || ""}</span>
          मा रहेको श्री
          <span class="value">${form.organization_name || ""}</span>
          <span class="value">${form.organization_extra || ""}</span>
          को आ.व. <span class="value">${form.fiscal_year || ""}</span>
          को लेखा परिक्षण गर्न… लेखा परिक्षक श्री
          <span class="value">${form.auditor_name || ""}</span>
          प्रमाण पत्र नं. <span class="value">${form.auditor_certificate_no || ""}</span>
          संस्था दर्ता नम्बर <span class="value">${form.organization_reg_no || ""}</span>
          भएको <span class="value">${form.auditor_org_name || ""}</span>
          <span class="value">${form.auditor_org_extra || ""}</span>
          का <span class="value">${form.auditor_extra_role || ""}</span>
          लाई लेखा परिक्षणको अनुमति…
        </div>

        <div class="bodartha">
          <span class="bodartha-label">बोधार्थ:</span>
          <span class="value">${form.bodartha || ""}</span>
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
     Render — root is now <form> so onSubmit fires (was <div>)
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="audit-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* Top Bar */}
        <div className="top-bar-title">
          लेखा परिक्षण सम्बन्धमा ।
          <span className="top-right-bread">
            आर्थिक &gt; लेखा परिक्षण सम्बन्धमा ।
          </span>
        </div>

        {/* Header — shared component replaces inline header block */}
        <MunicipalityHeader />

        {/* Meta — all hardcoded values now editable */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="audit-req-wrap">
                <span className="audit-req-star">*</span>
                <input
                  name="patra_sankhya"
                  type="text"
                  className="dotted-input small-input"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="audit-req-wrap">
                <span className="audit-req-star">*</span>
                <input
                  name="chalani_no"
                  type="text"
                  className="dotted-input small-input"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <span className="audit-req-wrap">
                <span className="audit-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="dotted-input small-input"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="audit-req-wrap">
                <span className="audit-req-star">*</span>
                <input
                  name="nepali_date_label"
                  type="text"
                  className="dotted-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  value={form.nepali_date_label || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="subject_to"
                type="text"
                className="line-input medium-input"
                value={form.subject_to}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="addressee-row">
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="subject_org"
                type="text"
                className="line-input medium-input"
                value={form.subject_org}
                onChange={handleChange}
                required
              />
            </span>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">{form.subject}</span>
          </p>
        </div>

        {/* Main Body — every input wrapped with red * */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा यस{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="office_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.office_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            वडा नं.{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="ward_no"
                type="text"
                className="inline-box-input tiny-box"
                value={form.ward_no}
                onChange={handleChange}
              />
            </span>{" "}
            मा रहेको श्री{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="organization_name"
                type="text"
                className="inline-box-input long-box"
                value={form.organization_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="organization_extra"
                type="text"
                className="inline-box-input medium-box"
                value={form.organization_extra}
                onChange={handleChange}
              />
            </span>{" "}
            को आ.व.{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="fiscal_year"
                type="text"
                className="inline-box-input small-box"
                value={form.fiscal_year}
                onChange={handleChange}
              />
            </span>{" "}
            को लेखा परिक्षण गर्न… लेखा परिक्षक श्री{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="auditor_name"
                type="text"
                className="inline-box-input long-box"
                value={form.auditor_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            प्रमाण पत्र नं.{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="auditor_certificate_no"
                type="text"
                className="inline-box-input medium-box"
                value={form.auditor_certificate_no}
                onChange={handleChange}
              />
            </span>{" "}
            संस्था दर्ता नम्बर{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="organization_reg_no"
                type="text"
                className="inline-box-input medium-box"
                value={form.organization_reg_no}
                onChange={handleChange}
              />
            </span>{" "}
            भएको{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="auditor_org_name"
                type="text"
                className="inline-box-input long-box"
                value={form.auditor_org_name}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="auditor_org_extra"
                type="text"
                className="inline-box-input medium-box"
                value={form.auditor_org_extra}
                onChange={handleChange}
              />
            </span>{" "}
            का{" "}
            <span className="audit-req-wrap">
              <span className="audit-req-star">*</span>
              <input
                name="auditor_extra_role"
                type="text"
                className="inline-box-input medium-box"
                value={form.auditor_extra_role}
                onChange={handleChange}
              />
            </span>{" "}
            लाई लेखा परिक्षणको अनुमति…
          </p>
        </div>

        {/* Bodartha */}
        <div className="bodartha-section">
          <label className="bold-text underline-text">बोधार्थ:</label>
          <div className="bodartha-input-container">
            <span className="audit-req-wrap audit-req-block">
              <span className="audit-req-star">*</span>
              <input
                name="bodartha"
                type="text"
                className="line-input full-width-input"
                value={form.bodartha}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="audit-req-wrap audit-req-block">
              <span className="audit-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="sig-name-input"
                value={form.signer_name}
                onChange={handleChange}
                required
              />
            </span>
            <select
              name="signer_designation"
              className="designation-select"
              value={form.signer_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* Footer — Save (submit) + Save & Print (button) */}
        <div className="form-footer">
          <button
            type="submit"
            className="save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default LekhaParikshyan;