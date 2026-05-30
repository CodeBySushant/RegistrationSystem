// CitizenshipMujulka.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES — all classes prefixed "cm-"
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .cm-container {
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
  .cm-bold      { font-weight: bold; }
  .cm-underline { text-decoration: underline; text-underline-offset: 4px; }
  .cm-center    { text-align: center; }
  .cm-mt20      { margin-top: 30px; }

  /* ── Top Bar ── */
  .cm-top-bar {
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
  .cm-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Body ── */
  .cm-body           { margin-top: 20px; font-size: 1.05rem; }
  .cm-body-paragraph { line-height: 2.5; text-align: justify; margin: 0; }

  /* ── Inputs — now bordered + radius (was bottom-border only, sharp) ── */
  .cm-f-input {
    display: inline-block;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    outline: none;
    padding: 4px 8px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 1rem;
    color: #000;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 3px;
  }
  .cm-f-input:focus { border-color: #c0392b; background-color: #fffaf9; }

  /* ── Select ── */
  .cm-f-select {
    display: inline-block;
    height: 30px;
    border: 1px solid #999;
    background-color: #ffffff;
    padding: 1px 6px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: middle;
    box-sizing: border-box;
  }
  .cm-f-select:focus { border-color: #c0392b; outline: none; }

  /* ── Width variants ── */
  .cm-tiny   { width: 60px;  text-align: center; }
  .cm-small  { width: 110px; }
  .cm-medium { width: 160px; }
  .cm-long   { width: 230px; }
  .cm-date   { width: 160px; }

  /* ── Red * wrapper ── */
  .cm-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .cm-req-wrap.cm-req-block { display: block; width: 100%; }
  .cm-req-star {
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
  .cm-req-wrap input { padding-left: 18px; }

  /* ── Table ── */
  .cm-table-section    { margin-top: 40px; margin-bottom: 40px; }
  .cm-table-title      { margin-bottom: 15px; color: #333; font-size: 1.1rem; font-weight: bold; }
  .cm-table-responsive { overflow-x: auto; }
  .cm-table            { width: 100%; border-collapse: collapse; }
  .cm-table th {
    border: 1px solid #2c3e50;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #fff;
    background-color: #2c3e50;
  }
  .cm-table td { border: 1px solid #bdc3c7; padding: 6px; background-color: #ffffff; vertical-align: middle; }
  .cm-table-input {
    width: 100%;
    height: 28px;
    border: 1px solid #ddd;
    background-color: #ffffff;
    outline: none;
    padding: 2px 6px 2px 18px;
    font-size: 0.9rem;
    font-family: inherit;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 3px;
  }
  .cm-table-input:focus { border-color: #c0392b; background-color: #fffaf9; }
  .cm-action-cell { text-align: center; vertical-align: middle; width: 60px; }
  .cm-remove-btn {
    background-color: #c0392b;
    color: #fff;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
  }
  .cm-remove-btn:hover:not(:disabled) { background-color: #962d22; }
  .cm-remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .cm-add-row-btn {
    margin-top: 10px;
    background: #2c3e50;
    color: #fff;
    border: none;
    padding: 7px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.92rem;
    font-family: inherit;
  }
  .cm-add-row-btn:hover { background: #1a252f; }

  /* ── Signature / roles blocks ── */
  .cm-sig-block      { margin-top: 30px; }
  .cm-sig-block h4   { margin-bottom: 12px; font-size: 1.05rem; color: #333; }

  /* ── Date block ── */
  .cm-date-block { margin-top: 20px; }

  /* ── Submit message ── */
  .cm-submit-msg {
    display: inline-block;
    padding: 8px 18px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 12px;
  }
  .cm-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .cm-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  /* ── Footer ── */
  .cm-footer { text-align: center; margin-top: 40px; }
  .cm-save-btn {
    color: #ffffff;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    margin: 0 6px;
  }
  .cm-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .cm-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .cm-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print (preserves natural display for screen) ── */
  .cm-hide-print { /* default display preserved */ }
  @media print {
    .cm-hide-print { display: none !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .cm-container { padding: 20px 16px; }
    .cm-tiny, .cm-small, .cm-medium, .cm-long, .cm-date {
      width: 100% !important;
      margin: 4px 0;
    }
    .cm-req-wrap { display: block; width: 100%; }
    .cm-footer { display: flex; flex-direction: column; gap: 10px; }
    .cm-footer button { width: 100%; margin: 0; }
    .cm-body-paragraph { line-height: 2.2; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants & helpers
───────────────────────────────────────────────────────────────────────────── */
const FORM_KEY = "citizenship-mujulka";
const API_URL  = `/api/forms/${FORM_KEY}`;

const DEFAULT_DISTRICT = MUNICIPALITY?.district || MUNICIPALITY?.city || "";

const emptyRow = () => ({
  district: "", local_unit: "", ward_no: "",
  residence: "", prpn_no: "", year: "",
});

const buildInitialState = (ward) => ({
  // Body intro
  province:              "",
  body_district:         DEFAULT_DISTRICT,
  municipality:          MUNICIPALITY?.name || "",
  ward_no:               ward ? String(ward) : "१",
  prev_address_type:     "",
  prev_address:          "",
  prev_ward:             "",

  // Family
  grandfather_title:     "श्री",
  grandfather_name:      "",
  relation_1_type:       "नाति",
  father_title:          "श्री",
  father_name:           "",
  relation_2_type:       "छोरा",

  // Subject of mujulka (renamed from applicant_* to avoid collision with ApplicantDetailsNp footer fields)
  subject_age:           "",
  subject_title:         "श्री",
  subject_name:          "",
  dob_basis:             "मेरो शैक्षिक योग्यताको प्रमाण-पत्र",
  dob:                   new Date().toISOString().slice(0, 10),

  // Check section
  check_subject_title:   "श्री",
  check_subject_name:    "",
  check_relation_type:   "छोरा",
  check_relative_title:  "श्री",
  check_relative_name:   "",
  check_dob:             new Date().toISOString().slice(0, 10),

  // Submit section
  submit_municipality:   MUNICIPALITY?.name || "",
  submit_dao_district:   DEFAULT_DISTRICT,

  // Table
  table_rows:            [emptyRow()],

  // Rohawar — "काठमाडौँ" district now editable
  rohawar_district_label: DEFAULT_DISTRICT,
  rohawar_local_unit:    "",
  rohawar_ward:          "",
  rohawar_position:      "",
  rohawar_title:         "श्री",
  rohawar_name:          "",

  // Kaam Tamel — "काठमाडौँ" district now editable
  tamel_district_label:  DEFAULT_DISTRICT,
  tamel_local_unit:      "",
  tamel_ward:            "",
  tamel_position:        "",
  tamel_title:           "श्री",
  tamel_name:            "",

  // Date
  date_year:             "",
  date_month:            "",
  date_day:              "",
  date_day_name:         "",

  // ApplicantDetailsNp footer (snake_case standard)
  applicant_name:        "",
  applicant_address:     "",
  applicant_citizenship_no: "",
  applicant_phone:       "",

  notes:                 "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipMujulka() {
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

  /* ── Table row handlers ── */
  const updateRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      table_rows: prev.table_rows.map((r, i) =>
        i === idx ? { ...r, [key]: val } : r
      ),
    }));
  };

  const addRow = () =>
    setForm((prev) => ({ ...prev, table_rows: [...prev.table_rows, emptyRow()] }));

  const removeRow = (idx) => {
    if (form.table_rows.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      table_rows: prev.table_rows.filter((_, i) => i !== idx),
    }));
  };

  /* ── Validation ── */
  const validate = () => {
    if (!form.subject_name?.trim())   return "मुचुल्काको विषयको नाम आवश्यक छ।";
    if (!form.applicant_name?.trim()) return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
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
      const payload = {
        ...form,
        table_rows: JSON.stringify(form.table_rows),
        ward_no:    String(form.ward_no),
      };

      const res = await axios.post(API_URL, payload);
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

    const tableRowsHtml = form.table_rows
      .map(
        (r, i) => `
        <tr>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${i + 1}</td>
          <td style="border:1px solid #555; padding:6px;">${r.district || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.local_unit || ""}</td>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${r.ward_no || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.residence || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.prpn_no || ""}</td>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${r.year || ""}</td>
        </tr>`
      )
      .join("");

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>नागरिकता मुचुल्का</title>
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
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 18px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .center { text-align: center; }
          .underline { text-decoration: underline; }
          .data-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
          .data-table th { background: #e0e0e0; border: 1px solid #555; padding: 6px; text-align: center; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .section-title { font-weight: bold; text-decoration: underline; text-align: center; margin-top: 24px; margin-bottom: 8px; font-size: 11pt; }
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

        <div class="section-title">नागरिकताको लागि मुचुल्का</div>

        <div class="body-text">
          लिखितम हामी तपसिलमा उल्लेखित मानिसहरु आगे बागमती प्रदेश
          <span class="value">${form.province || ""}</span>,
          <span class="value">${form.body_district || ""}</span> जिल्ला
          <span class="value">${form.municipality || ""}</span>
          वडा नं. <span class="value">${form.ward_no || ""}</span>
          को कार्यालय मार्फत (साविक
          <span class="value">${form.prev_address_type || ""}</span>
          <span class="value">${form.prev_address || ""}</span>,
          वडा नं. <span class="value">${form.prev_ward || ""}</span>
          <span class="value">${form.body_district || ""}</span>)
          निवासी <span class="value">${form.grandfather_title || ""}</span>
          <span class="value">${form.grandfather_name || ""}</span>
          का <span class="value">${form.relation_1_type || ""}</span>
          <span class="value">${form.father_title || ""}</span>
          <span class="value">${form.father_name || ""}</span>
          को <span class="value">${form.relation_2_type || ""}</span>
          वर्ष <span class="value">${form.subject_age || ""}</span>
          को <span class="value">${form.subject_title || ""}</span>
          <span class="value">${form.subject_name || ""}</span>
          ले हालसम्म नेपाली नागरिकताको प्रमाण-पत्र नलिएको र
          <span class="value">${form.dob_basis || ""}</span>
          अनुसार जन्म मिति <span class="value">${form.dob || ""}</span>
          कायम गरी स्थायी नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि वडा मुचुल्का
          गरी पाउँ भनि हामी वडा वासी समक्ष गरेको निवेदन अनुसार निजलाई जाँचबुझ गरी
          राम्रोसँग चिनेजानेको हुँदा निज
          <span class="value">${form.check_subject_title || ""}</span>
          <span class="value">${form.check_subject_name || ""}</span>
          को <span class="value">${form.check_relation_type || ""}</span>
          <span class="value">${form.check_relative_title || ""}</span>
          <span class="value">${form.check_relative_name || ""}</span>
          भएको निजको जन्ममिति <span class="value">${form.check_dob || ""}</span>
          भएकोले निजले हाल सम्म स्थायी नेपाली नागरिकताको प्रमाण-पत्र नलिएको र निजको
          माग अनुसार स्थायी नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गरिदिन सिफारिस गरिदिएमा
          कुनै फरक पर्ने छैन व्यहोरा ठीक साँचो हो झुठा ठहरे कानुन बमोजिम सहुँला बुझाउँला
          भनि यो वडा मुचुल्कामा सहिछाप गरी
          <span class="value">${form.submit_municipality || ""}</span>
          मार्फत जिल्ला प्रशासन कार्यालय
          <span class="value">${form.submit_dao_district || ""}</span>
          नेपाल सरकारमा चढायौं ।
        </div>

        <div class="section-title">तपसिल</div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:8%">क्र.स.</th>
              <th>जिल्ला</th>
              <th>गाउँपालिका</th>
              <th style="width:10%">वडा नं.</th>
              <th>निवास</th>
              <th>ना.प्र.प.नं.</th>
              <th style="width:10%">वर्ष</th>
            </tr>
          </thead>
          <tbody>${tableRowsHtml}</tbody>
        </table>

        <div class="section-title">रोहवर</div>
        <div class="body-text">
          <span class="value">${form.rohawar_district_label || ""}</span> जिल्ला
          <span class="value">${form.rohawar_local_unit || ""}</span>
          गाउँपालिका वडा नं. <span class="value">${form.rohawar_ward || ""}</span>
          का <span class="value">${form.rohawar_position || ""}</span>
          <span class="value">${form.rohawar_title || ""}</span>
          <span class="value">${form.rohawar_name || ""}</span>
        </div>

        <div class="section-title">काम तामेल गर्ने</div>
        <div class="body-text">
          <span class="value">${form.tamel_district_label || ""}</span> जिल्ला
          <span class="value">${form.tamel_local_unit || ""}</span>
          गाउँपालिका <span class="value">${form.tamel_ward || ""}</span>
          नं. वडा कार्यालय <span class="value">${form.tamel_position || ""}</span>
          पदमा कार्यरत <span class="value">${form.tamel_title || ""}</span>
          <span class="value">${form.tamel_name || ""}</span> ।
        </div>

        <div class="body-text center" style="margin-top:24px;">
          इति सम्वत <span class="value">${form.date_year || ""}</span>
          साल <span class="value">${form.date_month || ""}</span>
          महिना <span class="value">${form.date_day || ""}</span>
          गते रोज <span class="value">${form.date_day_name || ""}</span>
          शुभम् ।
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

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form
        className="cm-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >
        {/* ── Top Bar ── */}
        <div className="cm-top-bar cm-hide-print">
          नागरिकताको लागि मुचुल्का ।
          <span className="cm-breadcrumb">
            नेपाली नागरिकता &gt; नागरिकताको लागि मुचुल्का
          </span>
        </div>

        {/* ── Header (shared component) ── */}
        <MunicipalityHeader />

        {/* ── Body ── */}
        <div className="cm-body">
          <p className="cm-body-paragraph">
            लिखितम हामी तपसिलमा उल्लेखित मानिसहरु आगे बागमती प्रदेश{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="province" className="cm-f-input cm-medium" value={form.province} onChange={handleChange} />
            </span>
            ,{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="body_district" className="cm-f-input cm-medium" value={form.body_district} onChange={handleChange} />
            </span>{" "}
            जिल्ला{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="municipality" className="cm-f-input cm-medium" value={form.municipality} onChange={handleChange} />
            </span>{" "}
            वडा नं.{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="ward_no" className="cm-f-input cm-tiny" value={form.ward_no} onChange={handleChange} />
            </span>{" "}
            को कार्यालय मार्फत (साविक{" "}
            <select name="prev_address_type" className="cm-f-select" value={form.prev_address_type} onChange={handleChange}>
              <option value="">छान्नुहोस्</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="prev_address" className="cm-f-input cm-medium" value={form.prev_address} onChange={handleChange} />
            </span>
            , वडा नं.{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="prev_ward" className="cm-f-input cm-tiny" value={form.prev_ward} onChange={handleChange} />
            </span>{" "}
            ) निवासी{" "}
            <select name="grandfather_title" className="cm-f-select" value={form.grandfather_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="grandfather_name" className="cm-f-input cm-long" value={form.grandfather_name} onChange={handleChange} />
            </span>{" "}
            का{" "}
            <select name="relation_1_type" className="cm-f-select" value={form.relation_1_type} onChange={handleChange}>
              <option value="नाति">नाति</option>
              <option value="छोरा">छोरा</option>
            </select>{" "}
            <select name="father_title" className="cm-f-select" value={form.father_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="father_name" className="cm-f-input cm-long" value={form.father_name} onChange={handleChange} />
            </span>{" "}
            को{" "}
            <select name="relation_2_type" className="cm-f-select" value={form.relation_2_type} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>{" "}
            वर्ष{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="subject_age" className="cm-f-input cm-tiny" value={form.subject_age} onChange={handleChange} />
            </span>{" "}
            को{" "}
            <select name="subject_title" className="cm-f-select" value={form.subject_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="subject_name" className="cm-f-input cm-long" value={form.subject_name} onChange={handleChange} required />
            </span>{" "}
            ले हालसम्म नेपाली नागरिकताको प्रमाण-पत्र नलिएको र{" "}
            <select name="dob_basis" className="cm-f-select" value={form.dob_basis} onChange={handleChange}>
              <option value="मेरो शैक्षिक योग्यताको प्रमाण-पत्र">मेरो शैक्षिक योग्यताको प्रमाण-पत्र</option>
              <option value="जन्म दर्ता">जन्म दर्ता</option>
            </select>{" "}
            अनुसार जन्म मिति{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input type="date" name="dob" className="cm-f-input cm-date" value={form.dob} onChange={handleChange} />
            </span>{" "}
            कायम गरी स्थायी नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि वडा
            मुचुल्का गरी पाउँ भनि हामी वडा वासी समक्ष गरेको निवेदन अनुसार
            निजलाई जाँचबुझ गरी राम्रोसँग चिनेजानेको हुँदा निज{" "}
            <select name="check_subject_title" className="cm-f-select" value={form.check_subject_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="check_subject_name" className="cm-f-input cm-long" value={form.check_subject_name} onChange={handleChange} />
            </span>{" "}
            को{" "}
            <select name="check_relation_type" className="cm-f-select" value={form.check_relation_type} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>{" "}
            <select name="check_relative_title" className="cm-f-select" value={form.check_relative_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="check_relative_name" className="cm-f-input cm-long" value={form.check_relative_name} onChange={handleChange} />
            </span>{" "}
            भएको निजको जन्ममिति{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input type="date" name="check_dob" className="cm-f-input cm-date" value={form.check_dob} onChange={handleChange} />
            </span>{" "}
            भएकोले निजले हाल सम्म स्थायी नेपाली नागरिकताको प्रमाण-पत्र नलिएको
            र निजको माग अनुसार स्थायी नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध
            गरिदिन सिफारिस गरिदिएमा कुनै फरक पर्ने छैन व्यहोरा ठीक साँचो हो
            झुठा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो वडा मुचुल्कामा
            सहिछाप गरी{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="submit_municipality" className="cm-f-input cm-medium" value={form.submit_municipality} onChange={handleChange} />
            </span>{" "}
            मार्फत जिल्ला प्रशासन कार्यालय{" "}
            <span className="cm-req-wrap">
              <span className="cm-req-star">*</span>
              <input name="submit_dao_district" className="cm-f-input cm-medium" value={form.submit_dao_district} onChange={handleChange} />
            </span>{" "}
            नेपाल सरकारमा चढायौं ।
          </p>

          {/* ── Tapsil table — restructured (× on every row, separate add button below) ── */}
          <div className="cm-table-section">
            <h4 className="cm-table-title cm-center cm-underline">तपसिल</h4>
            <div className="cm-table-responsive">
              <table className="cm-table">
                <thead>
                  <tr>
                    <th style={{ width: "8%" }}>क्र.स.</th>
                    <th>जिल्ला</th>
                    <th>गाउँपालिका</th>
                    <th style={{ width: "10%" }}>वडा नं.</th>
                    <th>निवास</th>
                    <th>ना.प्र.प.नं.</th>
                    <th style={{ width: "10%" }}>वर्ष</th>
                    <th className="cm-hide-print" style={{ width: "60px" }}>कार्य</th>
                  </tr>
                </thead>
                <tbody>
                  {form.table_rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="cm-center">{idx + 1}</td>
                      <td>
                        <span className="cm-req-wrap cm-req-block">
                          <span className="cm-req-star">*</span>
                          <input value={row.district} onChange={updateRow(idx, "district")} className="cm-table-input" />
                        </span>
                      </td>
                      <td>
                        <span className="cm-req-wrap cm-req-block">
                          <span className="cm-req-star">*</span>
                          <input value={row.local_unit} onChange={updateRow(idx, "local_unit")} className="cm-table-input" />
                        </span>
                      </td>
                      <td>
                        <span className="cm-req-wrap cm-req-block">
                          <span className="cm-req-star">*</span>
                          <input value={row.ward_no} onChange={updateRow(idx, "ward_no")} className="cm-table-input" />
                        </span>
                      </td>
                      <td>
                        <span className="cm-req-wrap cm-req-block">
                          <span className="cm-req-star">*</span>
                          <input value={row.residence} onChange={updateRow(idx, "residence")} className="cm-table-input" />
                        </span>
                      </td>
                      <td>
                        <span className="cm-req-wrap cm-req-block">
                          <span className="cm-req-star">*</span>
                          <input value={row.prpn_no} onChange={updateRow(idx, "prpn_no")} className="cm-table-input" />
                        </span>
                      </td>
                      <td>
                        <span className="cm-req-wrap cm-req-block">
                          <span className="cm-req-star">*</span>
                          <input value={row.year} onChange={updateRow(idx, "year")} className="cm-table-input" />
                        </span>
                      </td>
                      <td className="cm-action-cell cm-hide-print">
                        <button
                          type="button"
                          className="cm-remove-btn"
                          onClick={() => removeRow(idx)}
                          disabled={form.table_rows.length <= 1}
                          title="पङ्क्ति हटाउनुहोस्"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="cm-add-row-btn cm-hide-print"
              onClick={addRow}
            >
              + पङ्क्ति थप्नुहोस्
            </button>
          </div>

          {/* ── Rohawar ── */}
          <div className="cm-sig-block">
            <h4 className="cm-center cm-underline">रोहवर</h4>
            <p className="cm-body-paragraph">
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input
                  name="rohawar_district_label"
                  className="cm-f-input cm-medium"
                  value={form.rohawar_district_label}
                  onChange={handleChange}
                />
              </span>{" "}
              जिल्ला{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="rohawar_local_unit" className="cm-f-input cm-medium" value={form.rohawar_local_unit} onChange={handleChange} />
              </span>{" "}
              गाउँपालिका वडा नं.{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="rohawar_ward" className="cm-f-input cm-tiny" value={form.rohawar_ward} onChange={handleChange} />
              </span>{" "}
              का{" "}
              <select name="rohawar_position" className="cm-f-select" value={form.rohawar_position} onChange={handleChange}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सदस्य">वडा सदस्य</option>
                <option value="स्थानीय">स्थानीय</option>
              </select>{" "}
              <select name="rohawar_title" className="cm-f-select" value={form.rohawar_title} onChange={handleChange}>
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="rohawar_name" className="cm-f-input cm-long" value={form.rohawar_name} onChange={handleChange} />
              </span>
            </p>
          </div>

          {/* ── Kaam Tamel Garne ── */}
          <div className="cm-sig-block">
            <h4 className="cm-center cm-underline">काम तामेल गर्ने</h4>
            <p className="cm-body-paragraph">
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input
                  name="tamel_district_label"
                  className="cm-f-input cm-medium"
                  value={form.tamel_district_label}
                  onChange={handleChange}
                />
              </span>{" "}
              जिल्ला{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="tamel_local_unit" className="cm-f-input cm-medium" value={form.tamel_local_unit} onChange={handleChange} />
              </span>{" "}
              गाउँपालिका{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="tamel_ward" className="cm-f-input cm-tiny" value={form.tamel_ward} onChange={handleChange} />
              </span>{" "}
              नं. वडा कार्यालय{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="tamel_position" className="cm-f-input cm-medium" value={form.tamel_position} onChange={handleChange} />
              </span>{" "}
              पदमा कार्यरत{" "}
              <select name="tamel_title" className="cm-f-select" value={form.tamel_title} onChange={handleChange}>
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="tamel_name" className="cm-f-input cm-long" value={form.tamel_name} onChange={handleChange} />
              </span>{" "}
              ।
            </p>
          </div>

          {/* ── Date ── */}
          <div className="cm-date-block cm-mt20">
            <p className="cm-body-paragraph cm-center">
              इति सम्वत{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="date_year" className="cm-f-input cm-tiny" value={form.date_year} onChange={handleChange} />
              </span>{" "}
              साल{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="date_month" className="cm-f-input cm-tiny" value={form.date_month} onChange={handleChange} />
              </span>{" "}
              महिना{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="date_day" className="cm-f-input cm-tiny" value={form.date_day} onChange={handleChange} />
              </span>{" "}
              गते रोज{" "}
              <span className="cm-req-wrap">
                <span className="cm-req-star">*</span>
                <input name="date_day_name" className="cm-f-input cm-small" value={form.date_day_name} onChange={handleChange} />
              </span>{" "}
              शुभम् ।
            </p>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <div className="cm-hide-print cm-mt20">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer — two buttons ── */}
        <div className="cm-footer cm-hide-print">
          {message && (
            <div className={`cm-submit-msg ${message.type === "error" ? "cm-msg-error" : "cm-msg-success"}`}>
              {message.text}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="cm-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="cm-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </div>

        <div className="cm-copyright cm-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>
      </form>
    </>
  );
}