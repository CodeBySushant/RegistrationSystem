// src/components/CitizenshipRecommendation.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────
   STYLES — all classes prefixed "cr-"
───────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .cr-container {
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

  /* ── Utility ── */
  .cr-bold      { font-weight: bold; }
  .cr-underline { text-decoration: underline; }
  .cr-right     { text-align: right; }

  /* ── Top Bar ── */
  .cr-top-bar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .cr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Meta ── */
  .cr-meta-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 16px;
    font-size: 1rem;
  }
  .cr-meta-row p { margin: 5px 0; }

  /* ── Inputs — bordered + radius (was bottom-border only, sharp) ── */
  .cr-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    box-sizing: border-box;
    vertical-align: middle;
    display: inline-block;
  }
  .cr-input:focus { border-color: #c0392b; background-color: #fffaf9; }

  .cr-tiny   { width: 60px; text-align: center; }
  .cr-small  { width: 120px; }
  .cr-medium { width: 220px; }
  .cr-long   { width: 350px; }
  .cr-date   { width: 170px; }

  .cr-inline-select {
    font-family: inherit;
    font-size: 0.95rem;
    padding: 4px 8px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #000;
    vertical-align: middle;
    cursor: pointer;
  }
  .cr-inline-select:focus { border-color: #c0392b; outline: none; }

  /* ── Red * wrapper ── */
  .cr-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .cr-req-wrap.cr-req-block { display: block; width: 100%; }
  .cr-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 13px;
    z-index: 1;
  }
  .cr-req-wrap input { padding-left: 18px; }

  /* ── Recipient ── */
  .cr-recipient { margin-top: 20px; margin-bottom: 20px; font-size: 1.05rem; line-height: 1.9; }
  .cr-recipient p {
    margin: 4px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* ── Subject ── */
  .cr-subject { text-align: center; margin: 24px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Intro paragraph ── */
  .cr-intro {
    text-align: justify;
    line-height: 2.4;
    margin-bottom: 24px;
    font-size: 1.05rem;
  }

  /* ── Details list ── */
  .cr-details-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 30px;
    font-size: 1rem;
  }
  .cr-list-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .cr-list-row .cr-label {
    min-width: 220px;
    font-weight: 500;
  }

  /* ── Photo + Signature ── */
  .cr-photo-sig-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;
    flex-wrap: wrap;
    gap: 20px;
  }
  .cr-photo-container p { margin-bottom: 5px; font-size: 0.95rem; }
  .cr-photo-box {
    width: 110px;
    height: 130px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    background-color: #fafafa;
  }

  .cr-signature-section { display: flex; justify-content: flex-end; flex: 1; min-width: 250px; }
  .cr-signature-block { width: 260px; text-align: center; }
  .cr-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 8px; width: 100%; }

  .cr-sig-name-input {
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
  .cr-sig-select {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 3px;
    color: #000;
    outline: none;
  }

  /* ── Sanakhat ── */
  .cr-sanakhat { margin-top: 40px; font-size: 1rem; }
  .cr-sanakhat-title {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    text-decoration: underline;
  }
  .cr-sanakhat-text  { text-align: justify; line-height: 2.4; margin-bottom: 20px; }
  .cr-sanakhat-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }
  .cr-sanakhat-fields { display: flex; flex-direction: column; gap: 12px; flex: 1; min-width: 280px; }
  .cr-sanakhat-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .cr-sanakhat-row label { width: 100px; font-weight: 500; }

  /* Thumbprint */
  .cr-thumbprint { width: 200px; text-align: center; }
  .cr-thumb-title {
    margin-bottom: 5px;
    font-size: 0.9rem;
    border-bottom: 1px solid #000;
    display: inline-block;
    padding: 0 20px;
  }
  .cr-thumb-boxes { display: flex; justify-content: center; }
  .cr-thumb-box {
    width: 80px;
    height: 100px;
    border: 1px solid #000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 5px;
    font-size: 0.8rem;
    border-right: none;
    background-color: #fafafa;
  }
  .cr-thumb-box:last-child { border-right: 1px solid #000; }

  /* ── Submit message ── */
  .cr-msg {
    margin-top: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.95rem;
    display: inline-block;
  }
  .cr-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .cr-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  /* ── Footer ── */
  .cr-footer { text-align: center; margin-top: 40px; }
  .cr-save-btn {
    color: #fff;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    margin: 0 6px;
  }
  .cr-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .cr-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .cr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print (preserves natural display for screen) ── */
  .cr-hide-print { /* default display preserved */ }
  @media print {
    .cr-hide-print { display: none !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .cr-container { padding: 20px 14px; }
    .cr-tiny, .cr-small, .cr-medium, .cr-long, .cr-date {
      width: 100% !important;
      margin: 4px 0;
    }
    .cr-req-wrap { display: block; width: 100%; }
    .cr-meta-row { flex-direction: column; }
    .cr-list-row { flex-direction: column; align-items: flex-start; }
    .cr-list-row .cr-label { min-width: 0; }
    .cr-photo-sig-flex { flex-direction: column; align-items: stretch; }
    .cr-signature-section { justify-content: center; }
    .cr-sanakhat-details { flex-direction: column; }
    .cr-thumbprint { align-self: center; }
    .cr-footer { display: flex; flex-direction: column; gap: 10px; }
    .cr-footer button { width: 100%; margin: 0; }
  }
`;

/* ─────────────────────────────────────────────
   Constants / Helpers
───────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-recommendation";

const DEFAULT_DISTRICT = MUNICIPALITY?.district || MUNICIPALITY?.city || "";

const buildInitialState = (ward) => ({
  // Meta (was hardcoded as bold text)
  patra_sankhya:           "२०८२/८३",
  chalani_no:              "",
  issue_date:              new Date().toISOString().slice(0, 10),
  ne_sa:                   "",

  // Recipient
  recipient_office:        "जिल्ला प्रशासन कार्यालय",
  recipient_district:      DEFAULT_DISTRICT,

  // Body intro
  body_municipality:       MUNICIPALITY?.name || "",
  applicant_name_body:     "",

  // Details
  birth_place:             "",
  father_name:             "",
  father_address:          "",
  mother_name:             "",
  mother_address:          "",
  spouse_name:             "",
  spouse_address:          "",
  permanent_municipality:  MUNICIPALITY?.name || "",
  permanent_ward:          ward ? String(ward) : "१",
  relative_name:           "",
  relative_address:        "",
  dob:                     "",
  cit_team_reg_name:       "",
  applicant_signature:     "",

  // Signature
  signatory_name:          "",
  signatory_position:      "",

  // Sanakhat
  sanakhat_applicant_name: "",
  sanakhat_relation:       "",
  sanakhat_name:           "",
  sanakhat_prpn_no:        "",
  sanakhat_signature:      "",
  sanakhat_date:           new Date().toISOString().slice(0, 10),

  // ApplicantDetailsNp footer (snake_case standard)
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",

  notes:                   "",
});

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CitizenshipRecommendation() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, permanent_ward: String(user.ward) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ── Validation ── */
  const validate = () => {
    if (!form.applicant_name_body?.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.signatory_name?.trim())      return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
    if (!form.applicant_name?.trim())      return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          setMessage({
            type: "success",
            text: "रेकर्ड सफलतापूर्वक सेभ भयो (id: " + (res.data?.id ?? "") + ")",
          });
        }
        setForm(buildInitialState(user?.ward));
      } else {
        throw new Error("Unexpected response: " + res.status);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्न सकिएन";
      setMessage({ type: "error", text: msg });
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
        <title>नेपाली नागरिकताको सिफारिस</title>
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
          .header { text-align: center; margin-bottom: 16px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 14px 0; }
          .recipient { margin-bottom: 14px; font-size: 11pt; line-height: 1.9; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 16px 0; text-decoration: underline; }
          .intro-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 16px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .details-list { margin-bottom: 24px; }
          .details-row { display: flex; margin-bottom: 8px; font-size: 11pt; line-height: 1.8; }
          .details-label { min-width: 280px; font-weight: 600; }
          .details-val { flex: 1; }
          .photo-sig { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 24px; margin-bottom: 24px; }
          .photo-box { width: 100px; height: 120px; border: 1px solid #555; font-size: 9pt; text-align: center; display: flex; align-items: center; justify-content: center; }
          .sig-block { text-align: center; width: 240px; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .sanakhat { margin-top: 30px; }
          .sanakhat-title { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 12px; text-decoration: underline; }
          .sanakhat-text { font-size: 11pt; line-height: 2.0; text-align: justify; margin-bottom: 16px; }
          .sanakhat-flex { display: flex; justify-content: space-between; align-items: flex-start; }
          .sanakhat-fields { font-size: 10.5pt; }
          .sanakhat-fields p { margin: 6px 0; }
          .thumb { width: 180px; height: 110px; border: 1.5px solid #333; display: flex; }
          .thumb-half { flex: 1; border-right: 1px solid #333; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 4px; font-size: 9pt; }
          .thumb-half:last-child { border-right: none; }
          .applicant-box { border: 1px solid #999; padding: 12px 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 8px; font-size: 10pt; }
          .applicant-row { display: flex; margin-bottom: 5px; font-size: 9.8pt; }
          .applicant-label { min-width: 140px; font-weight: 600; }
          .applicant-val { flex: 1; }
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
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="recipient">
          श्री <span class="value">${form.recipient_office || ""}</span><br/>
          <span class="value">${form.recipient_district || ""}</span> ।
        </div>

        <div class="subject">विषय: सिफारिस गरिएको ।</div>

        <div class="intro-text">
          महोदय,<br/>
          यस <span class="value">${form.body_municipality || ""}</span>
          अन्तर्गत निम्न लिखित विवरण भएका श्री
          <span class="value">${form.applicant_name_body || ""}</span>
          ले स्थायी नेपाली नागरिकताको प्रमाण-पत्र बनाउनको लागि सिफारिस पाऊँ
          भनि निवेदन दिएको हुँदा निम्न विवरणमा उल्लेखित व्यक्तिलाई स्थायी
          नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ
          अनुरोध गर्दछु !
        </div>

        <div class="details-list">
          <div class="details-row"><span class="details-label">जन्मस्थान :</span><span class="details-val"><span class="value">${form.birth_place || ""}</span></span></div>
          <div class="details-row"><span class="details-label">बाबुको नाम थर, वतन :</span><span class="details-val"><span class="value">${form.father_name || ""}</span>, <span class="value">${form.father_address || ""}</span></span></div>
          <div class="details-row"><span class="details-label">आमाको नाम थर, वतन :</span><span class="details-val"><span class="value">${form.mother_name || ""}</span>, <span class="value">${form.mother_address || ""}</span></span></div>
          <div class="details-row"><span class="details-label">पति/पत्नीको नाम थर, वतन :</span><span class="details-val"><span class="value">${form.spouse_name || ""}</span>, <span class="value">${form.spouse_address || ""}</span></span></div>
          <div class="details-row"><span class="details-label">स्थायी ठेगाना :</span><span class="details-val"><span class="value">${form.permanent_municipality || ""}</span> वडा नं. <span class="value">${form.permanent_ward || ""}</span></span></div>
          <div class="details-row"><span class="details-label">सम्बन्धित व्यक्तिको नाम थर, वतन :</span><span class="details-val"><span class="value">${form.relative_name || ""}</span>, <span class="value">${form.relative_address || ""}</span></span></div>
          <div class="details-row"><span class="details-label">जन्म मिति :</span><span class="details-val"><span class="value">${form.dob || ""}</span></span></div>
          <div class="details-row"><span class="details-label">नागरिकता टोलीमा नाम दर्ता :</span><span class="details-val"><span class="value">${form.cit_team_reg_name || ""}</span></span></div>
          <div class="details-row"><span class="details-label">सिफारिस माग गर्नेको सही :</span><span class="details-val"><span class="value">${form.applicant_signature || ""}</span></span></div>
        </div>

        <div class="photo-sig">
          <div>
            <div style="font-size:9.5pt; margin-bottom:4px; text-align:center;">सिफारिस माग गर्नेको फोटो</div>
            <div class="photo-box">फोटो</div>
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signatory_name || ""}</div>
            <div>${form.signatory_position || ""}</div>
          </div>
        </div>

        <div class="sanakhat">
          <div class="sanakhat-title">सनाखत</div>
          <div class="sanakhat-text">
            निवेदक <span class="value">${form.sanakhat_applicant_name || ""}</span>
            मेरो <span class="value">${form.sanakhat_relation || ""}</span>
            नाता हुन ! निजले हालसम्म कही कतैबाट नेपाली नागरिकताको प्रमाण-पत्र लिएको छैन ! व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउला भनि सनाखत र सहिछाप गर्नेको :
          </div>
          <div class="sanakhat-flex">
            <div class="sanakhat-fields">
              <p>नाम : <span class="value">${form.sanakhat_name || ""}</span></p>
              <p>ना.प्र.नं. : <span class="value">${form.sanakhat_prpn_no || ""}</span></p>
              <p>सही छाप : <span class="value">${form.sanakhat_signature || ""}</span></p>
              <p>मिति : <span class="value">${form.sanakhat_date || ""}</span></p>
            </div>
            <div>
              <div style="font-size:9pt; text-align:center; margin-bottom:4px;">औंठा छाप</div>
              <div class="thumb">
                <div class="thumb-half">दायाँ</div>
                <div class="thumb-half">बायाँ</div>
              </div>
            </div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="applicant-row"><span class="applicant-label">नाम:</span><span class="applicant-val">${form.applicant_name || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">ठेगाना:</span><span class="applicant-val">${form.applicant_address || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">नागरिकता नं.:</span><span class="applicant-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">फोन:</span><span class="applicant-val">${form.applicant_phone || ""}</span></div>
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
     Render
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form
        className="cr-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >
        {/* ── Top Bar ── */}
        <div className="cr-top-bar cr-hide-print">
          नेपाली नागरिकताको सिफारिस ।
          <span className="cr-breadcrumb">
            नागरिकता &gt; नेपाली नागरिकताको सिफारिस
          </span>
        </div>

        {/* ── Header (shared component replaces inline block) ── */}
        <MunicipalityHeader />

        {/* ── Meta — all hardcoded values now editable ── */}
        <div className="cr-meta-row">
          <div>
            <p>
              पत्र संख्या :{" "}
              <span className="cr-req-wrap">
                <span className="cr-req-star">*</span>
                <input
                  name="patra_sankhya"
                  className="cr-input cr-small"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="cr-req-wrap">
                <span className="cr-req-star">*</span>
                <input
                  name="chalani_no"
                  className="cr-input cr-small"
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="cr-right">
            <p>
              मिति :{" "}
              <span className="cr-req-wrap">
                <span className="cr-req-star">*</span>
                <input
                  type="date"
                  name="issue_date"
                  className="cr-input cr-date"
                  value={form.issue_date}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="cr-req-wrap">
                <span className="cr-req-star">*</span>
                <input
                  name="ne_sa"
                  className="cr-input"
                  style={{ width: 220 }}
                  placeholder="जस्तै: 1146 चौलागा, 23 शुक्रबार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* ── Recipient ── */}
        <div className="cr-recipient">
          <p>
            श्री{" "}
            <select
              name="recipient_office"
              value={form.recipient_office}
              onChange={handleChange}
              className="cr-inline-select"
            >
              <option value="जिल्ला प्रशासन कार्यालय">जिल्ला प्रशासन कार्यालय</option>
              <option value="इलाका प्रशासन कार्यालय">इलाका प्रशासन कार्यालय</option>
            </select>
          </p>
          <p>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="recipient_district"
                value={form.recipient_district}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="जिल्ला"
              />
            </span>
            {" "}।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="cr-subject">
          विषय: <span className="cr-underline">सिफारिस गरिएको ।</span>
        </div>

        {/* ── Intro — municipality name now editable ── */}
        <div className="cr-intro">
          महोदय,<br />
          यस{" "}
          <span className="cr-req-wrap">
            <span className="cr-req-star">*</span>
            <input
              name="body_municipality"
              value={form.body_municipality}
              onChange={handleChange}
              className="cr-input cr-medium"
            />
          </span>
          {" "}अन्तर्गत निम्न लिखित विवरण भएका श्री{" "}
          <span className="cr-req-wrap">
            <span className="cr-req-star">*</span>
            <input
              name="applicant_name_body"
              value={form.applicant_name_body}
              onChange={handleChange}
              className="cr-input cr-medium"
              required
            />
          </span>
          {" "}ले स्थायी नेपाली नागरिकताको प्रमाण-पत्र बनाउनको लागि सिफारिस पाऊँ
          भनि निवेदन दिएको हुँदा निम्न विवरणमा उल्लेखित व्यक्तिलाई स्थायी
          नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ
          अनुरोध गर्दछु !
        </div>

        {/* ── Details List ── */}
        <div className="cr-details-list">
          <div className="cr-list-row">
            <span className="cr-label">जन्मस्थान :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="birth_place"
                value={form.birth_place}
                onChange={handleChange}
                className="cr-input cr-long"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">बाबुको नाम थर, वतन :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="father_name"
                value={form.father_name}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="नाम"
              />
            </span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="father_address"
                value={form.father_address}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="वतन"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">आमाको नाम थर, वतन :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="mother_name"
                value={form.mother_name}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="नाम"
              />
            </span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="mother_address"
                value={form.mother_address}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="वतन"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">पति/पत्नीको नाम थर, वतन :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="spouse_name"
                value={form.spouse_name}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="नाम"
              />
            </span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="spouse_address"
                value={form.spouse_address}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="वतन"
              />
            </span>
          </div>

          {/* Permanent address — was hardcoded display; now editable */}
          <div className="cr-list-row">
            <span className="cr-label">स्थायी ठेगाना :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="permanent_municipality"
                value={form.permanent_municipality}
                onChange={handleChange}
                className="cr-input cr-medium"
              />
            </span>
            <span>वडा नं.</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="permanent_ward"
                value={form.permanent_ward}
                onChange={handleChange}
                className="cr-input cr-tiny"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">सम्बन्धित व्यक्तिको नाम थर, वतन :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="relative_name"
                value={form.relative_name}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="नाम"
              />
            </span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="relative_address"
                value={form.relative_address}
                onChange={handleChange}
                className="cr-input cr-medium"
                placeholder="वतन"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">जन्म मिति :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="cr-input cr-date"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">जिल्ला प्रशासनबाट खटिएको नागरिकता टोलीमा नाम दर्ता :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="cit_team_reg_name"
                value={form.cit_team_reg_name}
                onChange={handleChange}
                className="cr-input cr-long"
              />
            </span>
          </div>

          <div className="cr-list-row">
            <span className="cr-label">सिफारिस माग गर्ने व्यक्तिको सही :-</span>
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="applicant_signature"
                value={form.applicant_signature}
                onChange={handleChange}
                className="cr-input cr-medium"
              />
            </span>
          </div>
        </div>

        {/* ── Photo + Signature ── */}
        <div className="cr-photo-sig-flex">
          <div className="cr-photo-container">
            <p>सिफारिस माग गर्नेको फोटो</p>
            <div className="cr-photo-box">फोटो</div>
          </div>
          <div className="cr-signature-section">
            <div className="cr-signature-block">
              <div className="cr-signature-line"></div>
              <span className="cr-req-wrap cr-req-block">
                <span className="cr-req-star">*</span>
                <input
                  name="signatory_name"
                  value={form.signatory_name}
                  onChange={handleChange}
                  className="cr-sig-name-input"
                  required
                />
              </span>
              <select
                name="signatory_position"
                value={form.signatory_position}
                onChange={handleChange}
                className="cr-sig-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Sanakhat ── */}
        <div className="cr-sanakhat">
          <h3 className="cr-sanakhat-title">सनाखत</h3>
          <p className="cr-sanakhat-text">
            निवेदक{" "}
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="sanakhat_applicant_name"
                value={form.sanakhat_applicant_name}
                onChange={handleChange}
                className="cr-input cr-medium"
              />
            </span>
            {" "}मेरो{" "}
            <span className="cr-req-wrap">
              <span className="cr-req-star">*</span>
              <input
                name="sanakhat_relation"
                value={form.sanakhat_relation}
                onChange={handleChange}
                className="cr-input cr-small"
              />
            </span>
            {" "}नाता हुन ! निजले हालसम्म कही कतैबाट नेपाली नागरिकताको प्रमाण-पत्र
            लिएको छैन ! व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउला भनि
            सनाखत र सहिछाप गर्नेको :
          </p>
          <div className="cr-sanakhat-details">
            <div className="cr-sanakhat-fields">
              <div className="cr-sanakhat-row">
                <label>नाम :-</label>
                <span className="cr-req-wrap">
                  <span className="cr-req-star">*</span>
                  <input
                    name="sanakhat_name"
                    value={form.sanakhat_name}
                    onChange={handleChange}
                    className="cr-input cr-medium"
                  />
                </span>
              </div>
              <div className="cr-sanakhat-row">
                <label>ना.प्र.नं. :-</label>
                <span className="cr-req-wrap">
                  <span className="cr-req-star">*</span>
                  <input
                    name="sanakhat_prpn_no"
                    value={form.sanakhat_prpn_no}
                    onChange={handleChange}
                    className="cr-input cr-medium"
                  />
                </span>
              </div>
              <div className="cr-sanakhat-row">
                <label>सही छाप :-</label>
                <span className="cr-req-wrap">
                  <span className="cr-req-star">*</span>
                  <input
                    name="sanakhat_signature"
                    value={form.sanakhat_signature}
                    onChange={handleChange}
                    className="cr-input cr-medium"
                  />
                </span>
              </div>
              <div className="cr-sanakhat-row">
                <label>मिति :-</label>
                <span className="cr-req-wrap">
                  <span className="cr-req-star">*</span>
                  <input
                    type="date"
                    name="sanakhat_date"
                    value={form.sanakhat_date}
                    onChange={handleChange}
                    className="cr-input cr-date"
                  />
                </span>
              </div>
            </div>
            <div className="cr-thumbprint">
              <p className="cr-thumb-title">औंठा छाप</p>
              <div className="cr-thumb-boxes">
                <div className="cr-thumb-box">दायाँ</div>
                <div className="cr-thumb-box">बायाँ</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="cr-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer — two buttons ── */}
        <div className="cr-footer cr-hide-print">
          <div>
            <button
              type="submit"
              className="cr-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="cr-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
          {message && (
            <div className={`cr-msg ${message.type === "error" ? "cr-msg-error" : "cr-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="cr-copyright cr-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
        </div>
      </form>
    </>
  );
}