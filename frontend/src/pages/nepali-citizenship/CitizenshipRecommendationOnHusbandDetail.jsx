import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────
   STYLES — all classes prefixed "crhd-"
───────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .crhd-container {
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
  .crhd-bold      { font-weight: bold; }
  .crhd-underline { text-decoration: underline; text-underline-offset: 4px; }

  /* ── Top Bar ── */
  .crhd-top-bar {
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
  .crhd-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Meta ── */
  .crhd-meta-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 16px;
    font-size: 1rem;
  }
  .crhd-meta-left p, .crhd-meta-right p { margin: 5px 0; }
  .crhd-meta-right { text-align: right; }

  /* ── Inputs — bordered + radius (was bottom-border only, sharp) ── */
  .crhd-input {
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
  .crhd-input:focus { border-color: #c0392b; background-color: #fffaf9; }

  .crhd-tiny   { width: 60px;  text-align: center; }
  .crhd-small  { width: 110px; }
  .crhd-medium { width: 170px; }
  .crhd-long   { width: 250px; }
  .crhd-date   { width: 170px; }

  .crhd-select-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    padding: 4px 6px;
    margin: 0 2px;
    font-size: 0.95rem;
    font-family: inherit;
    cursor: pointer;
    vertical-align: middle;
  }
  .crhd-select-input:focus { border-color: #c0392b; outline: none; }

  /* ── Red * wrapper ── */
  .crhd-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .crhd-req-wrap.crhd-req-block { display: block; width: 100%; }
  .crhd-req-star {
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
  .crhd-req-wrap input { padding-left: 18px; }

  /* ── Addressee ── */
  .crhd-addressee { margin: 20px 0; font-size: 1.05rem; line-height: 1.9; }
  .crhd-addressee p {
    margin: 4px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* ── Subject ── */
  .crhd-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .crhd-body { font-size: 1.05rem; margin-bottom: 30px; }
  .crhd-para { line-height: 2.6; text-align: justify; margin: 0; }

  /* ── Signature ── */
  .crhd-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .crhd-signature-block { width: 260px; text-align: center; }
  .crhd-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 8px; width: 100%; }

  .crhd-sig-name-input {
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

  .crhd-designation-select {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 3px;
    outline: none;
  }

  /* ── Submit message ── */
  .crhd-msg {
    margin-top: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.95rem;
    display: inline-block;
  }
  .crhd-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .crhd-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  /* ── Footer ── */
  .crhd-footer { text-align: center; margin-top: 40px; }
  .crhd-save-btn {
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    margin: 0 6px;
  }
  .crhd-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .crhd-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .crhd-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print (preserves natural display for screen) ── */
  .crhd-hide-print { /* default display preserved */ }
  @media print {
    .crhd-hide-print { display: none !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .crhd-container { padding: 20px 14px; }
    .crhd-tiny, .crhd-small, .crhd-medium, .crhd-long, .crhd-date {
      width: 100% !important;
      margin: 4px 0;
    }
    .crhd-req-wrap { display: block; width: 100%; }
    .crhd-meta-row { flex-direction: column; }
    .crhd-meta-right { text-align: left; }
    .crhd-signature-section { justify-content: center; }
    .crhd-footer { display: flex; flex-direction: column; gap: 10px; }
    .crhd-footer button { width: 100%; margin: 0; }
    .crhd-body .crhd-para { line-height: 2.2; }
  }
`;

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-recommendation-husband";

const DEFAULT_DISTRICT = MUNICIPALITY?.district || MUNICIPALITY?.city || "";

const buildInitialState = (ward) => ({
  // Meta
  patra_sankhya:           "२०८२/८३",
  chalani_no:              "",
  issue_date:              new Date().toISOString().slice(0, 10),
  ne_sa:                   "",

  // Addressee (recipient_district removed per user request)
  recipient_office:        "जिल्ला",
  recipient_municipality:  MUNICIPALITY?.name || "",

  // Body intro
  body_municipality:       MUNICIPALITY?.name || "",
  ward_no:                 ward ? String(ward) : "१",

  // Husband / wife
  husband_name_body:       "",
  wife_name_body:          "",

  // Pre-marriage citizenship
  pre_marriage_office:     "जिल्ला",
  pre_marriage_district:   "",
  pre_marriage_prpn_no:    "",
  pre_marriage_cit_date:   "",

  // Marriage location
  marriage_district:       DEFAULT_DISTRICT,
  marriage_municipality:   MUNICIPALITY?.name || "",
  marriage_ward:           "",

  // Husband details
  husband_name:            "",
  marriage_date:           "",

  // Signature
  signatory_name:          "",
  signatory_position:      "",

  // ApplicantDetailsNp footer
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",

  notes:                   "",
});

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CitizenshipRecommendationOnHusbandDetail() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ── Validation ── */
  const validate = () => {
    if (!form.husband_name_body?.trim())   return "पतिको नाम आवश्यक छ।";
    if (!form.wife_name_body?.trim())      return "श्रीमतीको नाम आवश्यक छ।";
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
        "सेभ गर्न सम्भव भएन";
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
        <title>पतिको नाममा नागरिकता सिफारिस</title>
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
          .addressee { margin-bottom: 14px; font-size: 11pt; line-height: 1.9; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 16px 0; text-decoration: underline; }
          .body-text { font-size: 11pt; line-height: 2.4; text-align: justify; margin-bottom: 24px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 240px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 6px; font-size: 10pt; }
          .field-label { min-width: 140px; font-weight: 600; }
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
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="addressee">
          श्री <span class="value">${form.recipient_office || ""}</span> प्रशासन कार्यालय,<br/>
          <span class="value">${form.recipient_municipality || ""}</span> ।
        </div>

        <div class="subject">विषय: सिफारिस सम्बन्धमा ।</div>

        <div class="body-text">
          प्रस्तुत विषयमा यस
          <span class="value">${form.body_municipality || ""}</span>
          वडा नं. <span class="value">${form.ward_no || ""}</span>,
          निवासी <span class="value">${form.husband_name_body || ""}</span>
          को श्रीमति <span class="value">${form.wife_name_body || ""}</span>
          ले विवाह पूर्व <span class="value">${form.pre_marriage_office || ""}</span>
          प्रशासन कार्यालय <span class="value">${form.pre_marriage_district || ""}</span>
          बाट ना.प्र.नं. <span class="value">${form.pre_marriage_prpn_no || ""}</span>
          को नेपाली नागरिकताको प्रमाण-पत्र मिति
          <span class="value">${form.pre_marriage_cit_date || ""}</span>
          मा लिनु भई निजको विवाह
          <span class="value">${form.marriage_district || ""}</span> जिल्ला
          <span class="value">${form.marriage_municipality || ""}</span>
          वडा नं. <span class="value">${form.marriage_ward || ""}</span>
          निवासी <span class="value">${form.husband_name || ""}</span>
          संग मिति <span class="value">${form.marriage_date || ""}</span>
          मा भएको हुँदा निजलाई पतिको थर र ठेगाना राखी नेपाली नागरिकताको
          प्रमाण-पत्र उपलब्ध गराई दिन हुन सिफारिस साथ अनुरोध छ ।
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signatory_name || ""}</div>
            <div>${form.signatory_position || ""}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${form.applicant_name || ""}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${form.applicant_address || ""}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${form.applicant_phone || ""}</span></div>
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
        className="crhd-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >
        {/* ── Top Bar ── */}
        <div className="crhd-top-bar crhd-hide-print">
          पतिको नाममा नेपाली नागरिकताको प्रमाण-पत्र ।
          <span className="crhd-breadcrumb">
            नेपाली नागरिकता &gt; पतिको नाममा नेपाली नागरिकताको प्रमाण पत्र
          </span>
        </div>

        {/* ── Header (shared component replaces inline block) ── */}
        <MunicipalityHeader />

        {/* ── Meta — all hardcoded values now editable ── */}
        <div className="crhd-meta-row">
          <div className="crhd-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="crhd-req-wrap">
                <span className="crhd-req-star">*</span>
                <input
                  name="patra_sankhya"
                  className="crhd-input crhd-small"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="crhd-req-wrap">
                <span className="crhd-req-star">*</span>
                <input
                  name="chalani_no"
                  className="crhd-input crhd-small"
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </span>
            </p>
          </div>
          <div className="crhd-meta-right">
            <p>
              मिति :{" "}
              <span className="crhd-req-wrap">
                <span className="crhd-req-star">*</span>
                <input
                  type="date"
                  name="issue_date"
                  className="crhd-input crhd-date"
                  value={form.issue_date}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="crhd-req-wrap">
                <span className="crhd-req-star">*</span>
                <input
                  name="ne_sa"
                  className="crhd-input"
                  style={{ width: 220 }}
                  placeholder="जस्तै: 1146 चौलागा, 23 शुक्रबार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* ── Addressee — recipient_district input removed ── */}
        <div className="crhd-addressee">
          <p>
            श्री{" "}
            <select
              name="recipient_office"
              className="crhd-select-input"
              value={form.recipient_office}
              onChange={handleChange}
            >
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            {" "}प्रशासन कार्यालय,
          </p>
          <p>
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="recipient_municipality"
                className="crhd-input crhd-medium"
                value={form.recipient_municipality}
                onChange={handleChange}
                placeholder="नगरपालिका/इलाका"
              />
            </span>
            {" "}।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="crhd-subject">
          <p>विषय: <span className="crhd-underline">सिफारिस सम्बन्धमा ।</span></p>
        </div>

        {/* ── Body — hardcoded municipality now editable ── */}
        <div className="crhd-body">
          <p className="crhd-para">
            प्रस्तुत विषयमा यस{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="body_municipality"
                className="crhd-input crhd-medium"
                value={form.body_municipality}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं.{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="ward_no"
                className="crhd-input crhd-tiny"
                value={form.ward_no}
                onChange={handleChange}
              />
            </span>
            , निवासी{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="husband_name_body"
                className="crhd-input crhd-long"
                value={form.husband_name_body}
                onChange={handleChange}
                required
              />
            </span>{" "}
            को श्रीमति{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="wife_name_body"
                className="crhd-input crhd-long"
                value={form.wife_name_body}
                onChange={handleChange}
                required
              />
            </span>{" "}
            ले विवाह पूर्व{" "}
            <select
              name="pre_marriage_office"
              className="crhd-select-input"
              value={form.pre_marriage_office}
              onChange={handleChange}
            >
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>{" "}
            प्रशासन कार्यालय{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="pre_marriage_district"
                className="crhd-input crhd-medium"
                value={form.pre_marriage_district}
                onChange={handleChange}
              />
            </span>{" "}
            बाट ना.प्र.नं.{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="pre_marriage_prpn_no"
                className="crhd-input crhd-medium"
                value={form.pre_marriage_prpn_no}
                onChange={handleChange}
              />
            </span>{" "}
            को नेपाली नागरिकताको प्रमाण-पत्र मिति{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                type="date"
                name="pre_marriage_cit_date"
                className="crhd-input crhd-date"
                value={form.pre_marriage_cit_date}
                onChange={handleChange}
              />
            </span>{" "}
            मा लिनु भई निजको विवाह{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="marriage_district"
                className="crhd-input crhd-small"
                value={form.marriage_district}
                onChange={handleChange}
              />
            </span>{" "}
            जिल्ला{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="marriage_municipality"
                className="crhd-input crhd-medium"
                value={form.marriage_municipality}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं.{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="marriage_ward"
                className="crhd-input crhd-tiny"
                value={form.marriage_ward}
                onChange={handleChange}
              />
            </span>{" "}
            निवासी{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                name="husband_name"
                className="crhd-input crhd-long"
                value={form.husband_name}
                onChange={handleChange}
              />
            </span>{" "}
            संग मिति{" "}
            <span className="crhd-req-wrap">
              <span className="crhd-req-star">*</span>
              <input
                type="date"
                name="marriage_date"
                className="crhd-input crhd-date"
                value={form.marriage_date}
                onChange={handleChange}
              />
            </span>{" "}
            मा भएको हुँदा निजलाई पतिको थर र ठेगाना राखी नेपाली नागरिकताको
            प्रमाण-पत्र उपलब्ध गराई दिन हुन सिफारिस साथ अनुरोध छ ।
          </p>
        </div>

        {/* ── Signature — signer_name now white bg + border + margin ── */}
        <div className="crhd-signature-section">
          <div className="crhd-signature-block">
            <div className="crhd-signature-line"></div>
            <span className="crhd-req-wrap crhd-req-block">
              <span className="crhd-req-star">*</span>
              <input
                name="signatory_name"
                className="crhd-sig-name-input"
                value={form.signatory_name}
                onChange={handleChange}
                placeholder="नाम"
                required
              />
            </span>
            <select
              name="signatory_position"
              className="crhd-designation-select"
              value={form.signatory_position}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="crhd-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer — two buttons ── */}
        <div className="crhd-footer crhd-hide-print">
          <div>
            <button
              type="submit"
              className="crhd-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="crhd-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
          {message && (
            <div className={`crhd-msg ${message.type === "error" ? "crhd-msg-error" : "crhd-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="crhd-copyright crhd-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
        </div>
      </form>
    </>
  );
}