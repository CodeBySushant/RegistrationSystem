import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES — all classes prefixed "wpc-"
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .wpc-container {
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

  .wpc-bold      { font-weight: bold; }
  .wpc-underline { text-decoration: underline; }

  /* ── Top Bar ── */
  .wpc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .wpc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Meta ── */
  .wpc-meta-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }
  .wpc-meta-left p, .wpc-meta-right p { margin: 5px 0; }

  /* Meta input — was transparent; now white bg + border */
  .wpc-dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: inherit;
    font-size: 1rem;
  }
  .wpc-small-input { width: 120px; }
  .wpc-date-input  { width: 170px; }

  /* ── Subject ── */
  .wpc-subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* ── Addressee ── */
  .wpc-addressee { margin-bottom: 20px; font-size: 1.05rem; }
  .wpc-addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Addressee input — was transparent; now white bg + border */
  .wpc-line-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    margin: 0 6px;
    padding: 4px 8px;
    font-family: inherit;
    font-size: 1rem;
  }
  .wpc-large-input  { width: 300px; }
  .wpc-medium-input { width: 200px; }
  .wpc-small-input2 { width: 80px; text-align: center; }

  /* ── Body ── */
  .wpc-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .wpc-inline-box {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .wpc-tiny-box   { width: 60px;  text-align: center; }
  .wpc-small-box  { width: 110px; }
  .wpc-medium-box { width: 180px; }
  .wpc-long-box   { width: 250px; }

  /* ── Signature ── */
  .wpc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .wpc-signature-block { width: 240px; text-align: center; }
  .wpc-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 8px; width: 100%; }

  /* Signer name — was transparent; now white bg + border + margin */
  .wpc-sig-name-input {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    padding: 6px 10px;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 1rem;
  }

  .wpc-designation-select {
    width: 100%;
    margin-top: 4px;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Red * wrapper ── */
  .wpc-req-wrap {
    position: relative;
    display: inline-block;
  }
  .wpc-req-wrap.wpc-req-block {
    display: block;
    width: 100%;
  }
  .wpc-req-star {
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
  .wpc-req-wrap input { padding-left: 18px; }

  /* ── Footer ── */
  .wpc-footer { text-align: center; margin-top: 40px; }
  .wpc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .wpc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .wpc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .wpc-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .wpc-container { padding: 20px 16px; }

    .wpc-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .wpc-inline-box {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .wpc-tiny-box,
    .wpc-small-box,
    .wpc-medium-box,
    .wpc-long-box,
    .wpc-large-input,
    .wpc-medium-input,
    .wpc-small-input,
    .wpc-small-input2,
    .wpc-date-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .wpc-req-wrap {
      display: block;
      width: 100%;
    }

    .wpc-addressee-row { flex-direction: column; align-items: flex-start; }
    .wpc-signature-section { justify-content: center; }
    .wpc-meta-row { flex-direction: column; }
    .wpc-footer { display: flex; flex-direction: column; gap: 10px; }
    .wpc-footer button { width: 100%; margin: 0 !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   INITIAL STATE
   - Field names now match what's actually used in JSX (was completely out of sync)
   - All hardcoded values now editable with sensible defaults
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  // Meta
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  ne_sa: "",

  // Addressee
  addressee_municipality: MUNICIPALITY?.name || "",
  addressee_office: "",
  addressee_ward: MUNICIPALITY?.wardNumber || "",
  addressee_city: MUNICIPALITY?.city || "",

  // Body
  body_municipality: MUNICIPALITY?.name || "",
  body_ward_no: MUNICIPALITY?.wardNumber || "",
  body_fiscal_year: "२०८२/८३",
  plan_name: "",
  applicant_person_name: "",
  notification_date: "",
  inspection_result: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // ApplicantDetailsNp footer
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const WorkPlanningCompleted = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.addressee_office?.trim()) {
      alert("प्राप्तकर्ता कार्यालय आवश्यक छ");
      return;
    }
    if (!form.plan_name?.trim()) {
      alert("योजनाको नाम आवश्यक छ");
      return;
    }
    if (!form.applicant_person_name?.trim()) {
      alert("निवेदकको नाम आवश्यक छ");
      return;
    }
    if (!form.inspection_result?.trim()) {
      alert("निरिक्षण परिणाम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/work-planning-completed", form);
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

  /* ── Clean print — isolated window ── */
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
        <title>कार्य योजना पूरा भयो सिफारिस</title>
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

        <div class="subject">विषय: सिफारिस गरिएको वारे ।</div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_municipality || ""}</span><br/>
          <span class="value">${form.addressee_office || ""}</span><br/>
          <span class="value">${form.addressee_municipality || ""}</span>
          वडा नं <span class="value">${form.addressee_ward || ""}</span>,
          <span class="value">${form.addressee_city || ""}</span> ।
        </div>

        <div class="body-text">
          उपरोक्त सम्बन्धमा
          <span class="value">${form.body_municipality || ""}</span>
          वडा नं <span class="value">${form.body_ward_no || ""}</span>
          मा आ.व. <span class="value">${form.body_fiscal_year || ""}</span>
          मा संचालित <span class="value">${form.plan_name || ""}</span>
          योजना कार्य सम्पन्न भएको भनि श्री
          <span class="value">${form.applicant_person_name || ""}</span>
          ले मिति <span class="value">${form.notification_date || ""}</span>
          गतेमा दिनु भएको निवेदन अनुसार स्थलगत निरिक्षण गर्दा
          <span class="value">${form.inspection_result || ""}</span>
          योजना कार्य सम्पन्न देखिएकोले प्राविधिक वाट कार्य सम्पन्न मुल्यांकन
          गराई तहा कार्यालय नियमानुसार आवश्यक भुक्तानीका लागि सिफारिस साथ सादर
          अनुरोध छ।
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
     Render — root now <form> so onSubmit fires
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form
        className="wpc-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="wpc-top-bar">
          कार्य योजना पूरा भयो सिफारिस ।
          <span className="wpc-breadcrumb">
            आर्थिक &gt; कार्य योजना पूरा भयो सिफारिस
          </span>
        </div>

        {/* ── Header (shared component replaces inline block) ── */}
        <MunicipalityHeader />

        {/* ── Meta — all hardcoded values now editable ── */}
        <div className="wpc-meta-row">
          <div className="wpc-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="wpc-req-wrap">
                <span className="wpc-req-star">*</span>
                <input
                  name="patra_sankhya"
                  type="text"
                  className="wpc-dotted-input wpc-small-input"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="wpc-req-wrap">
                <span className="wpc-req-star">*</span>
                <input
                  name="chalani_no"
                  type="text"
                  className="wpc-dotted-input wpc-small-input"
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="wpc-meta-right">
            <p>
              मिति :{" "}
              <span className="wpc-req-wrap">
                <span className="wpc-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="wpc-dotted-input wpc-date-input"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="wpc-req-wrap">
                <span className="wpc-req-star">*</span>
                <input
                  name="ne_sa"
                  type="text"
                  className="wpc-dotted-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* ── Subject (hardcoded) ── */}
        <div className="wpc-subject-section">
          <p>
            विषय: <span className="wpc-underline">सिफारिस गरिएको वारे ।</span>
          </p>
        </div>

        {/* ── Addressee — all hardcoded municipality refs now editable ── */}
        <div className="wpc-addressee">
          <div className="wpc-addressee-row">
            <span>श्री</span>
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="addressee_municipality"
                type="text"
                className="wpc-line-input wpc-large-input"
                value={form.addressee_municipality}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className="wpc-addressee-row">
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="addressee_office"
                type="text"
                className="wpc-line-input wpc-large-input"
                value={form.addressee_office}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="wpc-addressee-row">
            <span>वडा नं</span>
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="addressee_ward"
                type="text"
                className="wpc-line-input wpc-small-input2"
                value={form.addressee_ward}
                onChange={handleChange}
              />
            </span>
            <span>,</span>
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="addressee_city"
                type="text"
                className="wpc-line-input wpc-medium-input"
                value={form.addressee_city}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>

        {/* ── Body — all hardcoded values now editable ── */}
        <div className="wpc-body">
          <p>
            उपरोक्त सम्बन्धमा{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="body_municipality"
                type="text"
                className="wpc-inline-box wpc-medium-box"
                value={form.body_municipality}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="body_ward_no"
                type="text"
                className="wpc-inline-box wpc-tiny-box"
                value={form.body_ward_no}
                onChange={handleChange}
              />
            </span>{" "}
            मा आ.व.{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="body_fiscal_year"
                type="text"
                className="wpc-inline-box wpc-small-box"
                value={form.body_fiscal_year}
                onChange={handleChange}
              />
            </span>{" "}
            मा संचालित{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="plan_name"
                type="text"
                className="wpc-inline-box wpc-long-box"
                value={form.plan_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            योजना कार्य सम्पन्न भएको भनि श्री{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="applicant_person_name"
                type="text"
                className="wpc-inline-box wpc-medium-box"
                value={form.applicant_person_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            ले मिति{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="notification_date"
                type="text"
                className="wpc-inline-box wpc-medium-box"
                placeholder="जस्तै: २०८२-०८-०६"
                value={form.notification_date}
                onChange={handleChange}
              />
            </span>{" "}
            गतेमा दिनु भएको निवेदन अनुसार स्थलगत निरिक्षण गर्दा{" "}
            <span className="wpc-req-wrap">
              <span className="wpc-req-star">*</span>
              <input
                name="inspection_result"
                type="text"
                className="wpc-inline-box wpc-long-box"
                value={form.inspection_result}
                onChange={handleChange}
                required
              />
            </span>{" "}
            योजना कार्य सम्पन्न देखिएकोले प्राविधिक वाट कार्य सम्पन्न मुल्यांकन
            गराई तहा कार्यालय नियमानुसार आवश्यक भुक्तानीका लागि सिफारिस साथ सादर
            अनुरोध छ।
          </p>
        </div>

        {/* ── Signature — signer_name now white bg + border + margin ── */}
        <div className="wpc-signature-section">
          <div className="wpc-signature-block">
            <div className="wpc-signature-line"></div>
            <span className="wpc-req-wrap wpc-req-block">
              <span className="wpc-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="wpc-sig-name-input"
                value={form.signer_name}
                onChange={handleChange}
                required
              />
            </span>
            <select
              name="signer_designation"
              className="wpc-designation-select"
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

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons — Save (submit) + Save & Print (button) ── */}
        <div className="wpc-footer">
          <button
            type="submit"
            className="wpc-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="wpc-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="wpc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default WorkPlanningCompleted;