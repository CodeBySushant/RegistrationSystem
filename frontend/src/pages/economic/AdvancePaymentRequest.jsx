import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────
   STYLES — scoped under .advance-payment-container
───────────────────────────────────────────── */
const styles = `
  /* --- Main Container --- */
  .advance-payment-container {
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

  /* --- Top Bar --- */
  .advance-payment-container .top-bar-title {
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

  .advance-payment-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Meta Data --- */
  .advance-payment-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .advance-payment-container .meta-left p,
  .advance-payment-container .meta-right p { margin: 5px 0; }

  .advance-payment-container .bold-text { font-weight: bold; }

  /* Meta inputs — was transparent; now white bg + border */
  .advance-payment-container .dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .advance-payment-container .small-input { width: 120px; }
  .advance-payment-container .date-input  { width: 170px; }

  /* --- Addressee Section --- */
  .advance-payment-container .addressee-section {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .advance-payment-container .addressee-row {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Addressee inputs — was transparent; now white bg + border */
  .advance-payment-container .line-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    margin: 0 6px;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .advance-payment-container .medium-input { width: 250px; }

  /* --- Subject --- */
  .advance-payment-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .advance-payment-container .underline-text { text-decoration: underline; }

  /* --- Body Paragraph & Inputs --- */
  .advance-payment-container .form-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }

  .advance-payment-container .inline-box-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .small-box  { width: 100px; }
  .advance-payment-container .medium-box { width: 160px; }
  .advance-payment-container .long-box   { width: 250px; }

  /* --- Signature Section --- */
  .advance-payment-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .advance-payment-container .signature-block {
    width: 240px;
    text-align: center;
  }

  .advance-payment-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    width: 100%;
  }

  /* Signer name — was transparent; now white bg + border + margin */
  .advance-payment-container .sig-name-input {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    padding: 6px 10px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .advance-payment-container .designation-select {
    width: 100%;
    margin-top: 4px;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  /* --- Red * wrapper — inline by default, block modifier for full-width --- */
  .advance-payment-container .apr-req-wrap {
    position: relative;
    display: inline-block;
  }
  .advance-payment-container .apr-req-wrap.apr-req-block {
    display: block;
    width: 100%;
  }
  .advance-payment-container .apr-req-star {
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
  .advance-payment-container .apr-req-wrap input {
    padding-left: 18px;
  }

  /* --- Footer --- */
  .advance-payment-container .form-footer { text-align: center; margin-top: 40px; }

  .advance-payment-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .advance-payment-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .advance-payment-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .advance-payment-container { padding: 20px 16px; }

    .advance-payment-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .advance-payment-container .inline-box-input,
    .advance-payment-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .advance-payment-container .small-box,
    .advance-payment-container .medium-box,
    .advance-payment-container .long-box,
    .advance-payment-container .medium-input,
    .advance-payment-container .small-input,
    .advance-payment-container .date-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .advance-payment-container .apr-req-wrap {
      display: block;
      width: 100%;
    }

    .advance-payment-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .advance-payment-container .signature-section { justify-content: center; }
    .advance-payment-container .meta-data-row { flex-direction: column; }
    .advance-payment-container .form-footer { display: flex; flex-direction: column; gap: 10px; }
    .advance-payment-container .form-footer button { width: 100%; margin: 0 !important; }
  }
`;

/* ─────────────────────────────────────────────
   INITIAL STATE
   - patra_sankhya, issue_date, ne_sa added (were hardcoded)
   - addressee_municipality added (was hardcoded MUNICIPALITY.name)
   - chalani_no left empty (unique per letter — placeholder hint only)
───────────────────────────────────────────── */
const initialState = {
  // Meta
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  ne_sa: "",

  // Addressee
  addressee_name: "",
  addressee_municipality: MUNICIPALITY?.name || "",
  addressee_office: "",

  // Body
  office_name: MUNICIPALITY?.name || "",
  fiscal_year: "२०८२/८३",
  program_name: "",
  budget_code: "",
  expense_title: "",
  expense_type: "",
  total_amount: "",
  requested_amount: "",
  amount_in_words: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const AdvancePaymentRequest = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.addressee_name?.trim()) {
      alert("प्राप्तकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.program_name?.trim()) {
      alert("कार्यक्रमको नाम आवश्यक छ");
      return;
    }
    if (!form.budget_code?.trim()) {
      alert("बजेट शिर्षक नम्बर आवश्यक छ");
      return;
    }
    if (!form.requested_amount?.trim()) {
      alert("माग गरिएको रकम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/advance-payment-request", form);
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
        <title>पेश्की अनुरोध सिफारिस</title>
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
          .addressee { margin-bottom: 16px; font-size: 11pt; line-height: 2; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 24px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
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
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_name || ""}</span> ज्यु,<br/>
          <span class="value">${form.addressee_municipality || ""}</span>
          <span class="value">${form.addressee_office || ""}</span>
        </div>

        <div class="subject">विषय: पेश्की उपलब्ध गराईदिने सम्बन्धमा।</div>

        <div class="body-text">
          प्रस्तुत विषयमा यस
          <span class="value">${form.office_name || ""}</span>
          चालु आ.व. <span class="value">${form.fiscal_year || ""}</span>
          को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत
          <span class="value">${form.program_name || ""}</span>
          को बजेट शिर्षक नम्बर
          <span class="value">${form.budget_code || ""}</span>
          मा रहेको <span class="value">${form.expense_title || ""}</span>
          <span class="value">${form.expense_type || ""}</span>
          अन्तर्गत जम्मा रकम रु.
          <span class="value">${form.total_amount || ""}</span>
          मध्ये बाट रु. <span class="value">${form.requested_amount || ""}</span>
          ( अक्षरेरुपी <span class="value">${form.amount_in_words || ""}</span>
          रुपैया मात्र ) पेश्की भुक्तानी दिनु हुन अनुरोध गर्दछु।
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

  /* ─────────────────────────────────────────────
     Render — root now <form> so onSubmit fires
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="advance-payment-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          पेश्की अनुरोध सिफारिस ।
          <span className="top-right-bread">
            आर्थिक &gt; पेश्की अनुरोध सिफारिस
          </span>
        </div>

        {/* --- Header (shared component replaces inline block) --- */}
        <MunicipalityHeader />

        {/* --- Meta — all hardcoded values now editable --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="apr-req-wrap">
                <span className="apr-req-star">*</span>
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
              <span className="apr-req-wrap">
                <span className="apr-req-star">*</span>
                <input
                  name="chalani_no"
                  type="text"
                  className="dotted-input small-input"
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <span className="apr-req-wrap">
                <span className="apr-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="dotted-input date-input"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="apr-req-wrap">
                <span className="apr-req-star">*</span>
                <input
                  name="ne_sa"
                  type="text"
                  className="dotted-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="addressee_name"
                type="text"
                className="line-input medium-input"
                value={form.addressee_name}
                onChange={handleChange}
                required
              />
            </span>
            <span>ज्यु,</span>
          </div>
          <div className="addressee-row">
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="addressee_municipality"
                type="text"
                className="line-input medium-input"
                value={form.addressee_municipality}
                onChange={handleChange}
              />
            </span>
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="addressee_office"
                type="text"
                className="line-input medium-input"
                value={form.addressee_office}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>

        {/* --- Subject (hardcoded) --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              पेश्की उपलब्ध गराईदिने सम्बन्धमा।
            </span>
          </p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा यस{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="office_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.office_name}
                onChange={handleChange}
              />
            </span>{" "}
            चालु आ.व.{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="fiscal_year"
                type="text"
                className="inline-box-input small-box"
                value={form.fiscal_year}
                onChange={handleChange}
              />
            </span>{" "}
            को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="program_name"
                type="text"
                className="inline-box-input long-box"
                value={form.program_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            को बजेट शिर्षक नम्बर{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="budget_code"
                type="text"
                className="inline-box-input small-box"
                value={form.budget_code}
                onChange={handleChange}
                required
              />
            </span>{" "}
            मा रहेको{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="expense_title"
                type="text"
                className="inline-box-input medium-box"
                value={form.expense_title}
                onChange={handleChange}
                required
              />
            </span>
            <select
              name="expense_type"
              className="inline-select"
              value={form.expense_type}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="संचालन">संचालन</option>
              <option value="पूँजीगत">पूँजीगत</option>
            </select>
            अन्तर्गत जम्मा रकम रु.{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="total_amount"
                type="text"
                className="inline-box-input medium-box"
                value={form.total_amount}
                onChange={handleChange}
                required
              />
            </span>{" "}
            मध्ये बाट रु.{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="requested_amount"
                type="text"
                className="inline-box-input medium-box"
                value={form.requested_amount}
                onChange={handleChange}
                required
              />
            </span>{" "}
            ( अक्षरेरुपी{" "}
            <span className="apr-req-wrap">
              <span className="apr-req-star">*</span>
              <input
                name="amount_in_words"
                type="text"
                className="inline-box-input long-box"
                value={form.amount_in_words}
                onChange={handleChange}
                required
              />
            </span>{" "}
            रुपैया मात्र ) पेश्की भुक्तानी दिनु हुन अनुरोध गर्दछु।
          </p>
        </div>

        {/* --- Signature Section — signer_name now white bg + border + margin --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="apr-req-wrap apr-req-block">
              <span className="apr-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="sig-name-input"
                required
                value={form.signer_name}
                onChange={handleChange}
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

        {/* --- Footer buttons — Save (submit) + Save & Print (button) --- */}
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

export default AdvancePaymentRequest;