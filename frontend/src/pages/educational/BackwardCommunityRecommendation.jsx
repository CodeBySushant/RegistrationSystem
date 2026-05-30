import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (prefix: bcr-)
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .bcr-container {
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

  .bcr-bold      { font-weight: bold; }
  .bcr-underline { text-decoration: underline; }

  .bcr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .bcr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Meta ── */
  .bcr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .bcr-meta-left p, .bcr-meta-right p {
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .bcr-meta-right { text-align: right; }
  .bcr-meta-right p { justify-content: flex-end; }
  .bcr-meta-input {
    border: 1px solid #ccc;
    background-color: #fff;
    outline: none;
    padding: 4px 8px;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
  }
  .bcr-w-small  { width: 130px; }
  .bcr-w-date   { width: 150px; }
  .bcr-w-nesa   { width: 220px; }

  /* ── Subject / Salutation ── */
  .bcr-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
  .bcr-salutation { margin-bottom: 20px; font-size: 1rem; }

  /* ── Body ── */
  .bcr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .bcr-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .bcr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .bcr-w-tiny   { width: 50px;  text-align: center; }
  .bcr-w-medium { width: 160px; }
  .bcr-w-long   { width: 220px; }

  /* ── Red required-star wrapper ── */
  .bcr-req-wrap { position: relative; display: inline-block; }
  .bcr-req-star {
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
  .bcr-req-wrap input { padding-left: 18px; }

  /* ── Signature ── */
  .bcr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .bcr-signature-block   { width: 220px; text-align: center; }
  .bcr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .bcr-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .bcr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .bcr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .bcr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .bcr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .bcr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .bcr-footer { text-align: center; margin-top: 40px; }
  .bcr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .bcr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .bcr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .bcr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  issue_date: "२०८२-०८-०६",
  nepali_date_label: "1146 थिंलाथ्व, 2 शनिवार",
  tole_address: "",
  ward_no: "",
  applicant_gender: "श्री",
  applicant_fullname: "",
  signer_name: "",
  signer_designation: "",
  // Applicant footer details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BackwardCommunityRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — one POST, no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;

    // Basic validation
    if (!form.ward_no?.trim()) {
      alert("वडा नं. आवश्यक छ");
      return;
    }
    if (!form.applicant_fullname?.trim()) {
      alert("निवेदकको नाम आवश्यक छ");
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
        "/api/forms/backward-community-recommendation",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id ?? ""));
        }
        setForm(initialState);
      } else {
        alert("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
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

    const v = (val) => (val === null || val === undefined ? "" : String(val));

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>विपन्नको सिफारिस</title>
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
          .meta { display: flex; justify-content: space-between; align-items: flex-start; margin: 16px 0; font-size: 11pt; line-height: 1.8; }
          .meta-left { text-align: left; }
          .meta-right { text-align: right; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 22px 0; text-decoration: underline; }
          .salutation { margin-bottom: 16px; font-size: 11pt; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 28px; }
          /* value sizes to content — small values don't leave big gaps, long
             values don't clip or merge into surrounding text */
          .value { font-weight: bold; padding: 0 4px; }
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
          <div class="meta-left">
            <div>पत्र संख्या : <span class="value">${v(form.letter_no)}</span></div>
            <div>चलानी नं. : <span class="value">${v(form.chalani_no)}</span></div>
          </div>
          <div class="meta-right">
            <div>मिति : <span class="value">${v(form.issue_date)}</span></div>
            <div>ने.सं : <span class="value">${v(form.nepali_date_label)}</span></div>
          </div>
        </div>

        <div class="subject">विषय: विपन्नको सिफारिस सम्बन्धमा।</div>

        <div class="salutation">श्री जो जस सँग सम्बन्ध राख्दछ,</div>

        <div class="body-text">
          उपरोक्त विषयमा <span class="value">${MUNICIPALITY.name}</span>
          वडा नं. <span class="value">${MUNICIPALITY.wardNumber || ""}</span>,
          टोल <span class="value">${v(form.tole_address)}</span>,
          वडा नं. <span class="value">${v(form.ward_no)}</span>
          निवासी <span class="value">${v(form.applicant_gender)}</span>
          <span class="value">${v(form.applicant_fullname)}</span>
          ले मेरो पारिवारिक आर्थिक स्थिति नाजुक भएको कारणले विपन्न भएको हुनाले
          मेरो परिवार मेरो उच्च शिक्षाको खर्च जुटाउन असमर्थ भएकोले सो खुलाई
          सिफारिस पाऊँ भनी यस कार्यालयमा निवेदन पेश गरेकोले सो सम्बन्धमा बुझ्दा
          जानेबुझे सम्म व्यहोरा मनासिब भएकोले निजलाई विपन्न व्यक्तिका लागि
          आरक्षित गरिएको स्थानमा सहभागी हुन पाउने व्यवस्था गरी दिनुहुन सिफारिस
          गरिएको छ ।
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${v(form.signer_name)}</div>
            <div>${v(form.signer_designation)}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${v(form.applicant_name)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${v(form.applicant_address)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${v(form.applicant_citizenship_no)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${v(form.applicant_phone)}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
      return;
    }
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
        className="bcr-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="bcr-top-bar">
          विपन्नको सिफारिस ।
          <span className="bcr-breadcrumb">शैक्षिक &gt; विपन्नको सिफारिस</span>
        </div>

        {/* ── Header (shared component) ── */}
        <MunicipalityHeader />

        {/* ── Meta ── */}
        <div className="bcr-meta-row">
          <div className="bcr-meta-left">
            <p>
              पत्र संख्या :
              <input
                type="text"
                name="letter_no"
                value={form.letter_no}
                onChange={handleChange}
                className="bcr-meta-input bcr-w-small"
              />
            </p>
            <p>
              चलानी नं. :
              <input
                type="text"
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="bcr-meta-input bcr-w-small"
              />
            </p>
          </div>
          <div className="bcr-meta-right">
            <p>
              मिति :
              <input
                type="text"
                name="issue_date"
                value={form.issue_date}
                onChange={handleChange}
                className="bcr-meta-input bcr-w-date"
              />
            </p>
            <p>
              ने.सं :
              <input
                type="text"
                name="nepali_date_label"
                value={form.nepali_date_label}
                onChange={handleChange}
                className="bcr-meta-input bcr-w-nesa"
              />
            </p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="bcr-subject">
          <p>
            विषय:{" "}
            <span className="bcr-underline">विपन्नको सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* ── Salutation (fixed phrase — "to whom it may concern") ── */}
        <div className="bcr-salutation">
          <p>श्री जो जस सँग सम्बन्ध राख्दछ,</p>
        </div>

        {/* ── Body ── */}
        <div className="bcr-body">
          <p>
            उपरोक्त विषयमा{" "}
            <span className="bcr-bold bcr-underline">{MUNICIPALITY.name}</span>{" "}
            वडा नं. {MUNICIPALITY.wardNumber}, टोल
            <span className="bcr-req-wrap">
              <span className="bcr-req-star">*</span>
              <input
                type="text"
                name="tole_address"
                value={form.tole_address}
                onChange={handleChange}
                className="bcr-inline-input bcr-w-medium"
                required
              />
            </span>
            , वडा नं.
            <span className="bcr-req-wrap">
              <span className="bcr-req-star">*</span>
              <input
                type="text"
                name="ward_no"
                value={form.ward_no}
                onChange={handleChange}
                className="bcr-inline-input bcr-w-tiny"
                required
              />
            </span>{" "}
            निवासी
            <select
              name="applicant_gender"
              value={form.applicant_gender}
              onChange={handleChange}
              className="bcr-inline-select bcr-bold"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <span className="bcr-req-wrap">
              <span className="bcr-req-star">*</span>
              <input
                type="text"
                name="applicant_fullname"
                value={form.applicant_fullname}
                onChange={handleChange}
                className="bcr-inline-input bcr-w-long"
                required
              />
            </span>{" "}
            ले मेरो पारिवारिक आर्थिक स्थिति नाजुक भएको कारणले विपन्न भएको हुनाले
            मेरो परिवार मेरो उच्च शिक्षाको खर्च जुटाउन असमर्थ भएकोले सो खुलाई
            सिफारिस पाऊँ भनी यस कार्यालयमा निवेदन पेश गरेकोले सो सम्बन्धमा बुझ्दा
            जानेबुझे सम्म व्यहोरा मनासिब भएकोले निजलाई विपन्न व्यक्तिका लागि
            आरक्षित गरिएको स्थानमा सहभागी हुन पाउने व्यवस्था गरी दिनुहुन सिफारिस
            गरिएको छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="bcr-signature-section">
          <div className="bcr-signature-block">
            <div className="bcr-signature-line"></div>
            <div className="bcr-req-wrap" style={{ width: "100%" }}>
              <span className="bcr-req-star">*</span>
              <input
                type="text"
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="bcr-sig-name-input"
                required
              />
            </div>
            <select
              name="signer_designation"
              value={form.signer_designation}
              onChange={handleChange}
              className="bcr-designation-select"
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

        {/* ── Footer buttons ── */}
        <div className="bcr-footer">
          <button
            type="submit"
            className="bcr-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="bcr-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="bcr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default BackwardCommunityRecommendation;