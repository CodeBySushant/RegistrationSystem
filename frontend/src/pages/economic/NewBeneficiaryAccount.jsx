import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────
   STYLES — scoped under .new-beneficiary-container
───────────────────────────────────────────── */
const styles = `
  /* --- Main Container --- */
  .new-beneficiary-container {
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
  .new-beneficiary-container .top-bar-title {
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

  .new-beneficiary-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Meta Data --- */
  .new-beneficiary-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .new-beneficiary-container .meta-left p,
  .new-beneficiary-container .meta-right p { margin: 5px 0; }

  .new-beneficiary-container .bold-text { font-weight: bold; }

  /* Meta inputs — was transparent; now white bg + border */
  .new-beneficiary-container .dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .new-beneficiary-container .small-input  { width: 120px; }
  .new-beneficiary-container .medium-input { width: 200px; }
  .new-beneficiary-container .date-input   { width: 170px; }

  /* --- Subject --- */
  .new-beneficiary-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .new-beneficiary-container .underline-text { text-decoration: underline; }

  /* --- Addressee Section --- */
  .new-beneficiary-container .addressee-section {
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .new-beneficiary-container .addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Addressee inputs — was transparent; now white bg + border */
  .new-beneficiary-container .line-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    margin: 0 6px;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .new-beneficiary-container .full-width-input { width: 100%; box-sizing: border-box; }

  /* --- Body Paragraph & Inputs --- */
  .new-beneficiary-container .form-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 40px;
  }

  .new-beneficiary-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Signature Section --- */
  .new-beneficiary-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .new-beneficiary-container .signature-block {
    width: 240px;
    text-align: center;
  }

  .new-beneficiary-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    width: 100%;
  }

  /* Signer name — was transparent; now white bg + border + margin */
  .new-beneficiary-container .sig-name-input {
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

  .new-beneficiary-container .designation-select {
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
  .new-beneficiary-container .nb-req-wrap {
    position: relative;
    display: inline-block;
  }
  .new-beneficiary-container .nb-req-wrap.nb-req-block {
    display: block;
    width: 100%;
  }
  .new-beneficiary-container .nb-req-star {
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
  .new-beneficiary-container .nb-req-wrap input {
    padding-left: 18px;
  }

  /* --- Footer --- */
  .new-beneficiary-container .form-footer { text-align: center; margin-top: 40px; }

  .new-beneficiary-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .new-beneficiary-container .save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .new-beneficiary-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .new-beneficiary-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .new-beneficiary-container { padding: 20px 16px; }

    .new-beneficiary-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .new-beneficiary-container .small-input,
    .new-beneficiary-container .medium-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .new-beneficiary-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .new-beneficiary-container .signature-section { justify-content: center; }
    .new-beneficiary-container .meta-data-row { flex-direction: column; }
  }
`;

/* ─────────────────────────────────────────────
   INITIAL STATE
   - Hardcoded values now editable
   - body_municipality_name and body_ward_no default to MUNICIPALITY config
   - citizenship_issue_date added (was hardcoded "२०८२-०८-०६")
   - patra_sankhya, issue_date, ne_sa added
───────────────────────────────────────────── */
const initialState = {
  // Meta
  patra_sankhya: "२०८२/८३",
  dispatch_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  ne_sa: "",

  // Addressee
  addressee_office: "",
  addressee_address: "",
  addressee_ward: "",

  // Body
  body_municipality_name: MUNICIPALITY?.name || "",
  body_ward_no: MUNICIPALITY?.wardNumber || "",
  old_ward: "",
  fiscal_year: "2082/83",
  allowance_type: "",
  citizenship_no: "",
  citizenship_issue_date: "",
  beneficiary_name: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // ApplicantDetailsNp
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const NewBeneficiaryAccount = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.addressee_office?.trim()) {
      alert("प्राप्तकर्ताको कार्यालय आवश्यक छ");
      return;
    }
    if (!form.allowance_type?.trim()) {
      alert("भत्ताको प्रकार आवश्यक छ");
      return;
    }
    if (!form.citizenship_no?.trim()) {
      alert("नागरिकता नं. आवश्यक छ");
      return;
    }
    if (!form.beneficiary_name?.trim()) {
      alert("लाभग्राहीको नाम आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/new-beneficiary-account", form);
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
        <title>नयाँ लाभग्राहीको खाता खोलिदिने</title>
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
            <div>चलानी नं. : <span class="value">${form.dispatch_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="subject">विषय: नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा ।</div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_office || ""}</span><br/>
          <span class="value">${form.addressee_address || ""}</span><br/>
          <span class="value">${form.addressee_ward || ""}</span> ।
        </div>

        <div class="body-text">
          प्रस्तुत बिषयमा यस
          <span class="value">${form.body_municipality_name || ""}</span>
          वडा नं
          <span class="value">${form.body_ward_no || ""}</span>
          (साविक <span class="value">${form.old_ward || ""}</span>) बाट आ.व.
          <span class="value">${form.fiscal_year || ""}</span>
          को <span class="value">${form.allowance_type || ""}</span>
          बापतको सामाजिक सुरक्षा भत्ता पाउन योग्य लाभग्राही ना.प्र.नं.
          <span class="value">${form.citizenship_no || ""}</span>
          जारी मिति <span class="value">${form.citizenship_issue_date || ""}</span>
          भएको श्री <span class="value">${form.beneficiary_name || ""}</span>
          को सामाजिक सुरक्षा भत्ता प्रयोजनको लागि खाता खोलिदिन हुन अनुरोध छ ।
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
        className="new-beneficiary-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा
          <span className="top-right-bread">
            आर्थिक &gt; नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा
          </span>
        </div>

        {/* --- Header (shared component replaces inline block) --- */}
        <MunicipalityHeader />

        {/* --- Meta — all hardcoded values now editable --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="nb-req-wrap">
                <span className="nb-req-star">*</span>
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
              <span className="nb-req-wrap">
                <span className="nb-req-star">*</span>
                <input
                  name="dispatch_no"
                  type="text"
                  className="dotted-input small-input"
                  value={form.dispatch_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <span className="nb-req-wrap">
                <span className="nb-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="dotted-input date-input"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p style={{ textAlign: "right" }}>
              ने.सं :{" "}
              <span className="nb-req-wrap">
                <span className="nb-req-star">*</span>
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

        {/* --- Subject (hardcoded) --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा ।
            </span>
          </p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="addressee_office"
                type="text"
                className="line-input medium-input"
                value={form.addressee_office}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="addressee-row">
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="addressee_address"
                type="text"
                className="line-input medium-input"
                value={form.addressee_address}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="addressee-row">
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="addressee_ward"
                type="text"
                className="line-input medium-input"
                value={form.addressee_ward}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>

        {/* --- Main Body — every input wrapped + previously hardcoded values now editable --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा यस{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="body_municipality_name"
                type="text"
                className="dotted-input medium-input"
                value={form.body_municipality_name}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="body_ward_no"
                type="text"
                className="dotted-input small-input"
                value={form.body_ward_no}
                onChange={handleChange}
              />
            </span>{" "}
            (साविक{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="old_ward"
                type="text"
                className="dotted-input medium-input"
                value={form.old_ward}
                onChange={handleChange}
                required
              />
            </span>
            ) बाट आ.व.
            <select
              name="fiscal_year"
              className="inline-select"
              value={form.fiscal_year}
              onChange={handleChange}
            >
              <option value="2082/83">2082/83</option>
              <option value="2083/84">2083/84</option>
            </select>
            को{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="allowance_type"
                type="text"
                className="dotted-input medium-input"
                value={form.allowance_type}
                onChange={handleChange}
                required
              />
            </span>{" "}
            बापतको सामाजिक सुरक्षा भत्ता पाउन योग्य लाभग्राही ना.प्र.नं.{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="citizenship_no"
                type="text"
                className="dotted-input medium-input"
                value={form.citizenship_no}
                onChange={handleChange}
                required
              />
            </span>{" "}
            जारी मिति{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="citizenship_issue_date"
                type="text"
                className="dotted-input medium-input"
                placeholder="जस्तै: २०८२-०८-०६"
                value={form.citizenship_issue_date}
                onChange={handleChange}
              />
            </span>{" "}
            भएको श्री{" "}
            <span className="nb-req-wrap">
              <span className="nb-req-star">*</span>
              <input
                name="beneficiary_name"
                type="text"
                className="dotted-input medium-input"
                value={form.beneficiary_name}
                onChange={handleChange}
                required
              />
            </span>{" "}
            को सामाजिक सुरक्षा भत्ता प्रयोजनको लागि खाता खोलिदिन हुन अनुरोध छ ।
          </p>
        </div>

        {/* --- Signature Section — signer_name now white bg + border + margin --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="nb-req-wrap nb-req-block">
              <span className="nb-req-star">*</span>
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

export default NewBeneficiaryAccount;