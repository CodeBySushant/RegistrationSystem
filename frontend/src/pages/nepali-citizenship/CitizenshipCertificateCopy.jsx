import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES — all classes prefixed "ccc-"
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .ccc-container {
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
  .ccc-bold       { font-weight: bold; }
  .ccc-text-right { text-align: right; }
  .ccc-underline  { text-decoration: underline; }

  /* ── Top Bar ── */
  .ccc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ccc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Meta ── */
  .ccc-meta-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }
  .ccc-meta-row p    { margin: 5px 0; }

  /* ── Inputs — now white bg + border + radius (was dotted-bottom transparent) ── */
  .ccc-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 1rem;
    color: #000;
    box-sizing: border-box;
    vertical-align: middle;
    display: inline-block;
  }
  .ccc-input:focus { border-color: #c0392b; }

  .ccc-tiny   { width: 60px;  text-align: center; }
  .ccc-small  { width: 110px; }
  .ccc-medium { width: 160px; }
  .ccc-long   { width: 250px; }
  .ccc-date   { width: 170px; }

  .ccc-select {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    padding: 4px 6px;
    margin: 0 2px;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    vertical-align: middle;
  }

  /* ── Red * wrapper ── */
  .ccc-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .ccc-req-wrap.ccc-req-block {
    display: block;
    width: 100%;
  }
  .ccc-req-star {
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
  .ccc-req-wrap input { padding-left: 18px; }

  /* ── Addressee ── */
  .ccc-addressee   { margin-bottom: 20px; font-size: 1.05rem; line-height: 1.9; }
  .ccc-addressee p { margin: 4px 0; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }

  /* ── Subject ── */
  .ccc-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .ccc-body { font-size: 1.05rem; margin-bottom: 20px; }
  .ccc-para { line-height: 2.6; text-align: justify; margin: 0; }

  /* ── Structured citizenship details box ── */
  .ccc-details-section {
    margin-top: 16px;
    margin-bottom: 30px;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 18px 20px;
    background-color: rgba(255,255,255,0.55);
  }
  .ccc-details-title {
    font-size: 1.05rem;
    font-weight: bold;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
    color: #2c3e50;
  }
  .ccc-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    column-gap: 24px;
    row-gap: 14px;
  }
  .ccc-detail-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ccc-detail-row label {
    flex-shrink: 0;
    min-width: 130px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
  }
  .ccc-detail-row .ccc-req-wrap { flex: 1; }
  .ccc-detail-row input {
    width: 100%;
    box-sizing: border-box;
  }

  /* ── Signature ── */
  .ccc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .ccc-signature-block { width: 260px; text-align: center; }
  .ccc-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 8px; width: 100%; }
  .ccc-sig-name-input {
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
  .ccc-designation-select {
    width: 100%;
    margin-top: 4px;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Footer ── */
  .ccc-footer { text-align: center; margin-top: 40px; }
  .ccc-save-btn {
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    margin: 0 6px;
  }
  .ccc-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .ccc-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .ccc-msg {
    margin-top: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.95rem;
    display: inline-block;
  }
  .ccc-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .ccc-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  .ccc-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print (preserves natural display for screen) ── */
  .ccc-hide-print { /* no display override on screen */ }
  @media print {
    .ccc-hide-print { display: none !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .ccc-container { padding: 20px 16px; }
    .ccc-tiny, .ccc-small, .ccc-medium, .ccc-long, .ccc-date {
      width: 100% !important;
      margin: 4px 0;
    }
    .ccc-req-wrap { display: block; width: 100%; }
    .ccc-details-grid { grid-template-columns: 1fr; }
    .ccc-detail-row { flex-direction: column; align-items: flex-start; gap: 4px; }
    .ccc-detail-row label { min-width: auto; }
    .ccc-meta-row { flex-direction: column; }
    .ccc-footer { display: flex; flex-direction: column; gap: 10px; }
    .ccc-footer button { width: 100%; margin: 0; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-proof-copy";

const buildInitialState = (ward) => ({
  // Meta
  patra_sankhya:           "२०८२/८३",
  reference_no:            "",
  issue_date:              new Date().toISOString().slice(0, 10),
  ne_sa:                   "",

  // Addressee
  addressee_title:         "प्रमुख जिल्ला अधिकारी",
  recipient_office_type:   "जिल्ला",
  recipient_location:      "",
  addressee_city:          MUNICIPALITY?.city || "",

  // Body — current address
  current_district:        MUNICIPALITY?.city || "",
  current_local_unit:      MUNICIPALITY?.name?.replace(" नगरपालिका", "") || "",
  current_local_unit_type: "नगरपालिका",
  current_ward:            ward ? String(ward) : "१",

  // Body — previous address
  prev_district:           MUNICIPALITY?.city || "",
  prev_local_unit:         "",
  prev_local_unit_type:    "",
  prev_ward:               "",

  // Body — applicant ref
  applicant_name_body:     "",
  relation:                "",
  condition:               "झुत्रो भएको",

  // Structured citizenship details
  cit_holder_name:         "",
  cit_no:                  "",
  cit_issue_date:          "",
  cit_issue_district:      MUNICIPALITY?.city || "",
  cit_father_name:         "",
  cit_mother_name:         "",
  cit_husband_name:        "",

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

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipCertificateCopy() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, current_ward: String(user.ward) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ── Validation ── */
  const validate = () => {
    if (!form.recipient_location?.trim()) return "प्रशासन कार्यालयको स्थान आवश्यक छ।";
    if (!form.applicant_name_body?.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.cit_holder_name?.trim())     return "नागरिकता धारकको नाम आवश्यक छ।";
    if (!form.cit_no?.trim())              return "नागरिकता नं. आवश्यक छ।";
    if (!form.signatory_name?.trim())      return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
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
            text: "रेकर्ड सफलतापूर्वक सेभ भयो । ID: " + (res.data?.id ?? ""),
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
        "सेभ हुन सकेन";
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
        <title>नागरिकता प्रमाण-पत्र प्रतिलिपि</title>
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
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 16px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .details-box { border: 1px solid #999; padding: 14px 18px; margin: 16px 0; border-radius: 3px; }
          .details-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; font-size: 11pt; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 24px; row-gap: 6px; font-size: 10.5pt; }
          .field-row { display: flex; }
          .field-label { min-width: 130px; font-weight: 600; }
          .field-val { flex: 1; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 240px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .app-field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .app-field-label { min-width: 160px; font-weight: 600; }
          .app-field-val { flex: 1; }
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
            <div>चलानी नं. : <span class="value">${form.reference_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="addressee">
          श्रीमान् <span class="value">${form.addressee_title || ""}</span> ज्यू,<br/>
          <span class="value">${form.recipient_office_type || ""}</span> प्रशासन कार्यालय,<br/>
          <span class="value">${form.recipient_location || ""}</span>,
          <span class="value">${form.addressee_city || ""}</span> ।
        </div>

        <div class="subject">विषय: सिफारिस सम्बन्धमा ।</div>

        <div class="body-text">
          उपरोक्त सम्बन्धमा जिल्ला
          <span class="value">${form.current_district || ""}</span>
          <span class="value">${form.current_local_unit || ""}</span>
          <span class="value">${form.current_local_unit_type || ""}</span>
          वडा नं <span class="value">${form.current_ward || ""}</span>
          (साविक जिल्ला <span class="value">${form.prev_district || ""}</span>
          <span class="value">${form.prev_local_unit || ""}</span>
          <span class="value">${form.prev_local_unit_type || ""}</span>
          वडा नं <span class="value">${form.prev_ward || ""}</span>)
          मा स्थायी रुपले बसोबास गरि बस्ने
          <span class="value">${form.applicant_name_body || ""}</span> ले
          <span class="value">${form.relation || ""}</span>
          नाताले प्राप्त गर्नु भएको नागरिकता प्रमाणपत्र
          <span class="value">${form.condition || ""}</span>
          ले निजलाई प्रतिलिपी नागरिकता नियमानुसार उपलब्ध गराइदिनु हुन स्थायी
          बसोबास प्रमाणित, साथ सिफारिस गरिएको व्यहोरा अनुरोध छ ।
        </div>

        <div class="details-box">
          <div class="details-title">मैले नागरिकताको प्रमाण-पत्र लिएको विवरण यस प्रकार छ :</div>
          <div class="details-grid">
            <div class="field-row"><span class="field-label">नाम, थर:</span><span class="field-val">${form.cit_holder_name || ""}</span></div>
            <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${form.cit_no || ""}</span></div>
            <div class="field-row"><span class="field-label">जारी मिति:</span><span class="field-val">${form.cit_issue_date || ""}</span></div>
            <div class="field-row"><span class="field-label">जारी जिल्ला:</span><span class="field-val">${form.cit_issue_district || ""}</span></div>
            <div class="field-row"><span class="field-label">बाबुको नाम:</span><span class="field-val">${form.cit_father_name || ""}</span></div>
            <div class="field-row"><span class="field-label">आमाको नाम:</span><span class="field-val">${form.cit_mother_name || ""}</span></div>
            <div class="field-row"><span class="field-label">पतिको नाम:</span><span class="field-val">${form.cit_husband_name || ""}</span></div>
          </div>
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
          <div class="app-field-row"><span class="app-field-label">नाम:</span><span class="app-field-val">${form.applicant_name || ""}</span></div>
          <div class="app-field-row"><span class="app-field-label">ठेगाना:</span><span class="app-field-val">${form.applicant_address || ""}</span></div>
          <div class="app-field-row"><span class="app-field-label">नागरिकता नं.:</span><span class="app-field-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="app-field-row"><span class="app-field-label">फोन:</span><span class="app-field-val">${form.applicant_phone || ""}</span></div>
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
        className="ccc-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="ccc-top-bar ccc-hide-print">
          नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
          <span className="ccc-breadcrumb">
            नेपाली नागरिकता &gt; नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
          </span>
        </div>

        {/* ── Header (shared component replaces inline block) ── */}
        <MunicipalityHeader />

        {/* ── Meta — all hardcoded values now editable ── */}
        <div className="ccc-meta-row">
          <div className="ccc-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="patra_sankhya"
                  className="ccc-input ccc-small"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="reference_no"
                  className="ccc-input ccc-small"
                  placeholder="जस्तै: ००१"
                  value={form.reference_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="ccc-meta-right ccc-text-right">
            <p>
              मिति :{" "}
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  type="date"
                  name="issue_date"
                  className="ccc-input ccc-date"
                  value={form.issue_date}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="ne_sa"
                  className="ccc-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 चौलागा, 24 शनिबार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* ── Addressee — title now editable, hardcoded काठमाडौँ now editable ── */}
        <div className="ccc-addressee">
          <p>
            श्रीमान्{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="addressee_title"
                className="ccc-input ccc-long"
                value={form.addressee_title}
                onChange={handleChange}
              />
            </span>
            {" "}ज्यू,
          </p>
          <p>
            <select
              name="recipient_office_type"
              className="ccc-select"
              value={form.recipient_office_type}
              onChange={handleChange}
            >
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            {" "}प्रशासन कार्यालय,
          </p>
          <p>
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="recipient_location"
                className="ccc-input ccc-medium"
                value={form.recipient_location}
                onChange={handleChange}
                required
              />
            </span>
            ,{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="addressee_city"
                className="ccc-input ccc-medium"
                value={form.addressee_city}
                onChange={handleChange}
              />
            </span>
            {" "}।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="ccc-subject">
          <p>विषय: <span className="ccc-underline">सिफारिस सम्बन्धमा ।</span></p>
        </div>

        {/* ── Body — every input wrapped + caaठमाडौँ replaced with editable ── */}
        <div className="ccc-body">
          <p className="ccc-para">
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="current_district"
                className="ccc-input ccc-small"
                value={form.current_district}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="current_local_unit"
                className="ccc-input ccc-medium"
                value={form.current_local_unit}
                onChange={handleChange}
              />
            </span>
            <select
              name="current_local_unit_type"
              className="ccc-select"
              value={form.current_local_unit_type}
              onChange={handleChange}
            >
              <option value="नगरपालिका">नगरपालिका</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="उपमहानगरपालिका">उपमहानगरपालिका</option>
              <option value="महानगरपालिका">महानगरपालिका</option>
            </select>
            वडा नं{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="current_ward"
                className="ccc-input ccc-tiny"
                value={form.current_ward}
                onChange={handleChange}
              />
            </span>{" "}
            (साविक जिल्ला{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="prev_district"
                className="ccc-input ccc-small"
                value={form.prev_district}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="prev_local_unit"
                className="ccc-input ccc-medium"
                value={form.prev_local_unit}
                onChange={handleChange}
              />
            </span>
            <select
              name="prev_local_unit_type"
              className="ccc-select"
              value={form.prev_local_unit_type}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            वडा नं{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="prev_ward"
                className="ccc-input ccc-tiny"
                value={form.prev_ward}
                onChange={handleChange}
              />
            </span>
            ) मा स्थायी रुपले बसोबास गरि बस्ने{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="applicant_name_body"
                className="ccc-input ccc-long"
                value={form.applicant_name_body}
                onChange={handleChange}
                required
              />
            </span>{" "}
            ले{" "}
            <span className="ccc-req-wrap">
              <span className="ccc-req-star">*</span>
              <input
                name="relation"
                className="ccc-input ccc-small"
                placeholder="नाता"
                value={form.relation}
                onChange={handleChange}
              />
            </span>{" "}
            नाताले प्राप्त गर्नु भएको नागरिकता प्रमाणपत्र{" "}
            <select
              name="condition"
              className="ccc-select"
              value={form.condition}
              onChange={handleChange}
            >
              <option value="झुत्रो भएको">झुत्रो भएको</option>
              <option value="हराएको">हराएको</option>
              <option value="नष्ट भएको">नष्ट भएको</option>
            </select>
            {" "}ले निजलाई प्रतिलिपी नागरिकता नियमानुसार उपलब्ध गराइदिनु हुन
            स्थायी बसोबास प्रमाणित, साथ सिफारिस गरिएको व्यहोरा अनुरोध छ ।
          </p>
        </div>

        {/* ── Citizenship Details — properly structured box (was scattered inline) ── */}
        <div className="ccc-details-section">
          <div className="ccc-details-title">
            मैले नागरिकताको प्रमाण-पत्र लिएको विवरण यस प्रकार छ :
          </div>
          <div className="ccc-details-grid">
            <div className="ccc-detail-row">
              <label>नाम, थर :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="cit_holder_name"
                  className="ccc-input"
                  value={form.cit_holder_name}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
            <div className="ccc-detail-row">
              <label>नागरिकता नं. :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="cit_no"
                  className="ccc-input"
                  value={form.cit_no}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
            <div className="ccc-detail-row">
              <label>जारी मिति :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  type="date"
                  name="cit_issue_date"
                  className="ccc-input"
                  value={form.cit_issue_date}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="ccc-detail-row">
              <label>जारी जिल्ला :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="cit_issue_district"
                  className="ccc-input"
                  value={form.cit_issue_district}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="ccc-detail-row">
              <label>बाबुको नाम :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="cit_father_name"
                  className="ccc-input"
                  value={form.cit_father_name}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="ccc-detail-row">
              <label>आमाको नाम :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="cit_mother_name"
                  className="ccc-input"
                  value={form.cit_mother_name}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="ccc-detail-row">
              <label>पतिको नाम :</label>
              <span className="ccc-req-wrap">
                <span className="ccc-req-star">*</span>
                <input
                  name="cit_husband_name"
                  className="ccc-input"
                  value={form.cit_husband_name}
                  onChange={handleChange}
                />
              </span>
            </div>
          </div>
        </div>

        {/* ── Signature — signatory_name now white bg + border + margin ── */}
        <div className="ccc-signature-section">
          <div className="ccc-signature-block">
            <div className="ccc-signature-line"></div>
            <span className="ccc-req-wrap ccc-req-block">
              <span className="ccc-req-star">*</span>
              <input
                name="signatory_name"
                className="ccc-sig-name-input"
                value={form.signatory_name}
                onChange={handleChange}
                required
              />
            </span>
            <select
              name="signatory_position"
              value={form.signatory_position}
              onChange={handleChange}
              className="ccc-designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="ccc-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer ── */}
        <div className="ccc-footer ccc-hide-print">
          <div>
            <button
              type="submit"
              className="ccc-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="ccc-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
          {message && (
            <div className={`ccc-msg ${message.type === "error" ? "ccc-msg-error" : "ccc-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="ccc-copyright ccc-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>
      </form>
    </>
  );
}