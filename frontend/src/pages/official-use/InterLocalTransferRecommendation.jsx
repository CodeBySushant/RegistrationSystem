// src/pages/official-use/InterLocalTransferRecommendation.jsx
import React, { useState, useRef } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const FORM_KEY = "inter-local-transfer-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Nepal&display=swap');

:root {
  --ilt-primary:    #c0392b;
  --ilt-primary-dk: #922b21;
  --ilt-dark:       #1a1a2e;
  --ilt-mid:        #4a4a6a;
  --ilt-border:     #c8c8d8;
  --ilt-bg:         #f7f6f2;
  --ilt-white:      #ffffff;
  --ilt-input-bd:   #bbb;
  --ilt-success:    #1e8449;
  --ilt-error:      #c0392b;
  --ff:             'Tiro Devanagari Nepal', 'Kalimati', 'Kokila', serif;
  --radius:         4px;
  --shadow:         0 2px 12px rgba(0,0,0,.10);
}

.ilt-page-wrapper {
  min-height: 100vh;
  background-color: var(--ilt-bg);
  padding: 24px 16px 60px;
  font-family: var(--ff);
  color: var(--ilt-dark);
}

/* ── Container (paper) ── */
.ilt-container {
  max-width: 900px;
  margin: 0 auto;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  border: 1px solid var(--ilt-border);
  border-radius: 6px;
  box-shadow: var(--shadow);
  padding: 40px 52px;
}

/* ── Top bar (inside container) ── */
.ilt-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.ilt-top-bar-title { font-weight: 700; font-size: 1.1rem; color: #333; }
.ilt-top-bar-path  { font-size: 0.9rem; color: #777; }

/* ── Header wrapper ── */
.ilt-header-section { text-align: center; margin-bottom: 14px; position: relative; min-height: 90px; }

/* ── Divider ── */
.ilt-divider {
  border: none;
  border-top: 2.5px double var(--ilt-primary);
  margin: 14px 0 22px;
}

/* ── Meta row ── */
.ilt-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.ilt-meta-left,
.ilt-meta-right { display: flex; flex-direction: column; gap: 8px; }
.ilt-meta-field { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; }
.ilt-meta-field label { white-space: nowrap; color: var(--ilt-mid); font-weight: 600; min-width: 90px; }

/* ── Subject ── */
.ilt-subject { text-align: center; margin: 18px 0 22px; font-size: 1.05rem; }
.ilt-subject-label { font-weight: 700; margin-right: 6px; }
.ilt-subject-text  { font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }

/* ── Required-star wrapper ── */
.ilt-req-wrap { position: relative; display: inline-block; vertical-align: middle; }
.ilt-req-star {
  position: absolute;
  left: 5px; top: 50%;
  transform: translateY(-50%);
  color: red; font-weight: bold;
  pointer-events: none; font-size: 13px; z-index: 1;
}
.ilt-req-wrap .ilt-input { padding-left: 16px; }

/* ── Shared input / select ── */
.ilt-input {
  background: var(--ilt-white);
  border: 1px solid var(--ilt-input-bd);
  border-radius: var(--radius);
  padding: 5px 10px;
  font-family: var(--ff);
  font-size: 0.95rem;
  color: var(--ilt-dark);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  vertical-align: middle;
}
.ilt-input:focus {
  border-color: var(--ilt-primary);
  box-shadow: 0 0 0 2px rgba(192,57,43,.15);
}
.ilt-input::placeholder { color: #bbb; font-size: 0.85rem; }

.ilt-select {
  background: var(--ilt-white);
  border: 1px solid var(--ilt-input-bd);
  border-radius: var(--radius);
  padding: 6px 10px;
  font-family: var(--ff);
  font-size: 0.95rem;
  color: var(--ilt-dark);
  outline: none;
  cursor: pointer;
  width: 100%;
  transition: border-color .2s;
}
.ilt-select:focus {
  border-color: var(--ilt-primary);
  box-shadow: 0 0 0 2px rgba(192,57,43,.15);
}

/* Input size variants */
.meta-input     { width: 160px; }
.inline-sm      { width: 70px; text-align: center; }
.inline-md      { width: 180px; }
.inline-lg      { width: 240px; }
.detail-input   { width: 100%; }
.sig-name-input { width: 220px; text-align: center; }

/* ── Body paragraph ── */
.ilt-body-para {
  font-size: 1rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 28px;
}
.ilt-body-para p { margin: 0; }

/* ── Dehay (details grid) ── */
.ilt-dehay { margin: 20px 0 30px; }
.ilt-dehay-title {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  margin-bottom: 14px;
  font-size: 1rem;
}
.ilt-dehay-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 32px;
}
.ilt-dehay-col   { display: flex; flex-direction: column; gap: 12px; }
.ilt-detail-item { display: flex; align-items: center; gap: 10px; }
.ilt-detail-item label {
  min-width: 165px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ilt-mid);
  flex-shrink: 0;
}

/* ── Notes rich editor ── */
.ilt-notes { margin: 20px 0 30px; }
.ilt-notes-title { font-weight: 700; margin-bottom: 8px; font-size: 1rem; }
.ilt-editor-wrap {
  border: 1px solid var(--ilt-border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--ilt-white);
}
.ilt-editor-toolbar {
  background: #f5f5f5;
  padding: 5px 10px;
  border-bottom: 1px solid var(--ilt-border);
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
.ilt-tool {
  cursor: pointer;
  font-size: 0.85rem;
  padding: 2px 8px;
  border: 1px solid #ddd;
  background: var(--ilt-white);
  border-radius: 2px;
  transition: background .15s;
}
.ilt-tool:hover  { background: #e8e8e8; }
.ilt-tool:active { background: #dcdcdc; }
.ilt-tool.bold      { font-weight: bold; }
.ilt-tool.italic    { font-style: italic; }
.ilt-tool.underline { text-decoration: underline; }
.ilt-tool-sep { color: #bbb; padding: 0 2px; }
.ilt-tool-select {
  font-family: var(--ff);
  font-size: 0.82rem;
  padding: 2px 4px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background: var(--ilt-white);
  cursor: pointer;
}
.ilt-editable {
  width: 100%;
  min-height: 110px;
  outline: none;
  padding: 12px;
  font-family: var(--ff);
  font-size: 1rem;
  box-sizing: border-box;
  background: var(--ilt-white);
  color: var(--ilt-dark);
  line-height: 1.8;
}
.ilt-editable:empty:before {
  content: attr(data-placeholder);
  color: #bbb;
}

/* ── Signature ── */
.ilt-signature-section {
  display: flex;
  justify-content: flex-end;
  margin: 36px 0 28px;
}
.ilt-signature-block {
  width: 240px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

/* ── Applicant wrapper ── */
.ilt-applicant-wrapper { margin-bottom: 24px; padding-top: 8px; }

/* ── Message ── */
.ilt-msg { padding: 12px 18px; border-radius: var(--radius); font-size: 0.95rem; margin-bottom: 16px; font-weight: 600; }
.ilt-msg--success { background: #eafaf1; border: 1px solid #a9dfbf; color: var(--ilt-success); }
.ilt-msg--error   { background: #fdedec; border: 1px solid #f5b7b1; color: var(--ilt-error); }

/* ── Action buttons ── */
.ilt-actions { display: flex; justify-content: center; gap: 12px; padding-top: 10px; }
.ilt-btn {
  padding: 11px 32px;
  border: none;
  border-radius: var(--radius);
  font-family: var(--ff);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  transition: background .2s, transform .1s;
}
.ilt-btn--save  { background: #2c3e50; }
.ilt-btn--save:hover:not(:disabled)  { background: #1a252f; }
.ilt-btn--print { background: #1a6b3a; }
.ilt-btn--print:hover:not(:disabled) { background: #145530; }
.ilt-btn:disabled              { opacity: .6; cursor: not-allowed; }
.ilt-btn:active:not(:disabled) { transform: scale(.97); }

/* ── Footer ── */
.ilt-footer { text-align: right; font-size: 0.8rem; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; margin-top: 36px; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .ilt-container    { padding: 24px 18px; }
  .ilt-meta-row     { flex-direction: column; }
  .ilt-dehay-grid   { grid-template-columns: 1fr; }
  .ilt-body-para .ilt-input { width: 100%; }
  .ilt-signature-section    { justify-content: center; }
}
@media (max-width: 480px) {
  .ilt-container    { padding: 16px 12px; }
}
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const StarInput = ({ value, onChange, className = "", required = false, placeholder = "", type = "text" }) => (
  <span className="ilt-req-wrap">
    <span className="ilt-req-star">*</span>
    <input
      type={type}
      className={`ilt-input ${className}`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </span>
);

/* ─────────────────────────── Helpers ─────────────────────────── */

const DEHAY_LEFT_FIELDS = [
  ["नाम थर:",                  "employee_name"],
  ["पद/तह:",                   "employee_post_title"],
  ["सेवा/समूह/उपसमूह:",        "service_group"],
  ["नियुक्ति दिने स्थानीय तह:","appointing_local"],
  ["सरुवा जाने स्थानीय तह:",   "transfer_local"],
  ["स्थायी ठेगाना:",            "permanent_address"],
];

const DEHAY_RIGHT_FIELDS = [
  ["फोन नं:",    "phone",                    "text"],
  ["जन्म मिति:", "dob",                      "date"],
  ["ना.प्र.नं:", "citizenship_no",           "text"],
  ["जारी मिति:", "citizenship_issue_date",   "date"],
  ["जारी जिल्ला:","citizenship_issue_district","text"],
];

const INITIAL_FORM = {
  letter_no:                    "",
  reference_no:                 "",
  date:                         new Date().toISOString().slice(0, 10),
  subject:                      "अन्तर स्थानीय सरुवा सहमति दिईएको सम्बन्धमा",
  requested_person_name:        "",
  requested_person_position:    "",
  requested_person_position_code: "",
  transfer_to_local:            "",
  transfer_to_position:         "",
  employee_name:                "",
  employee_post_title:          "",
  service_group:                "",
  appointing_local:             MUNICIPALITY.name,
  transfer_local:               "",
  permanent_address:            "",
  phone:                        "",
  dob:                          "",
  citizenship_no:               "",
  citizenship_issue_date:       "",
  citizenship_issue_district:   "",
  signatory_name:               "",
  signatory_position:           "",
  applicant_name:               "",
  applicant_address:            "",
  applicant_citizenship_no:     "",
  applicant_phone:              "",
  notes:                        "",
};

const validate = (form) => {
  const errors = [];
  if (!form.employee_name.trim())   errors.push("कर्मचारीको नाम आवश्यक छ।");
  if (!form.citizenship_no.trim())  errors.push("नागरिकता नं. आवश्यक छ।");
  if (!form.signatory_name.trim())  errors.push("हस्ताक्षरकर्ताको नाम आवश्यक छ।");
  return errors;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function InterLocalTransferRecommendation() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null);
  const editorRef = useRef(null);

  const upd = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  /* Rich-text toolbar command */
  const exec = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setForm((s) => ({ ...s, notes: editorRef.current?.innerHTML || "" }));
  };

  const onEditorInput = () =>
    setForm((s) => ({ ...s, notes: editorRef.current?.innerHTML || "" }));

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;
    setMsg(null);

    const errors = validate(form);
    if (errors.length) {
      setMsg({ type: "error", text: errors.join(" | ") });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, {
        ...form,
        submitted_by: user?.username || "unknown",
        ward: user?.ward,
      });
      if (shouldPrint) {
        handleCleanPrint();
      } else {
        setMsg({ type: "success", text: `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id || "—"})` });
      }
      setForm(INITIAL_FORM);
      if (editorRef.current) editorRef.current.innerHTML = "";
    } catch (err) {
      const text = err.response?.data?.message || err.response?.data?.error || err.message || "सेभ गर्न सकिएन";
      setMsg({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated window, values sized to content ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `वडा नं. ${user?.ward || ""} वडा कार्यालय`;

    const esc = (v) =>
      String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const dehayRows = (fields) =>
      fields
        .map(
          ([label, key]) => `
            <div class="detail-row">
              <span class="detail-label">${esc(label)}</span>
              <span class="value">${esc(form[key])}</span>
            </div>`
        )
        .join("");

    const notesHtml = form.notes || "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>अन्तर स्थानीय सरुवा सहमति</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Tiro Devanagari Nepal', 'Kalimati', 'Noto Sans Devanagari', serif;
            color: #000; background: white;
            padding: 15mm 20mm; font-size: 11pt; line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 14px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .gov-label { font-size: 10pt; color: #333; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 16pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .divider { border: none; border-top: 2.5px double #c0392b; margin: 12px 0 18px; }
          .meta { display: flex; justify-content: space-between; margin: 14px 0; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 16px 0; text-decoration: underline; }
          .body-text { font-size: 11pt; line-height: 2.3; text-align: justify; margin-bottom: 20px; }
          /* value sizes to content — short values inline, long ones wrap cleanly */
          .value { font-weight: bold; padding: 0 4px; border-bottom: 1px solid #aaa; }
          .value-inline { white-space: nowrap; }
          .dehay-title { font-weight: bold; text-decoration: underline; margin: 16px 0 10px; }
          .dehay-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 28px; }
          .detail-row { display: flex; gap: 8px; font-size: 10.5pt; margin-bottom: 4px; }
          .detail-label { font-weight: 600; min-width: 150px; }
          .notes-title { font-weight: bold; margin: 14px 0 6px; }
          .notes-content { border: 1px solid #ccc; padding: 10px; min-height: 40px; margin-bottom: 20px; }
          .signature { display: flex; justify-content: flex-end; margin-top: 36px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="${esc(MUNICIPALITY.logoSrc || "/nepallogo.svg")}" alt="Nepal" />
          <div class="gov-label">नेपाल सरकार</div>
          <div class="mun-name">${esc(MUNICIPALITY.name)}</div>
          <div class="ward-title">${esc(wardTitle)}</div>
          <div class="addr">${esc(MUNICIPALITY.officeLine)}</div>
          <div class="addr">${esc(MUNICIPALITY.provinceLine)}</div>
        </div>
        <hr class="divider" />

        <div class="meta">
          <div>
            <div>पत्र संख्या : <span class="value value-inline">${esc(form.letter_no)}</span></div>
            <div>चलानी नं. : <span class="value value-inline">${esc(form.reference_no)}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value value-inline">${esc(form.date)}</span></div>
          </div>
        </div>

        <div class="subject">विषय: ${esc(form.subject)}</div>

        <div class="body-text">
          श्री <span class="value">${esc(form.requested_person_name)}</span>
          ले यस कार्यालयमा मिति <span class="value value-inline">${esc(form.date)}</span>
          मा माथि स्वीकृति भई <span class="value">${esc(form.transfer_to_local)}</span>
          को पद <span class="value">${esc(form.transfer_to_position)}</span>
          को च.न. <span class="value value-inline">${esc(form.requested_person_position_code)}</span>
          मा प्राप्त भएको निवेदन अनुसार कर्मचारी <span class="value">${esc(form.employee_name)}</span>
          को पदनाम <span class="value">${esc(form.employee_post_title)}</span>
          बमोजिम <span class="value">${esc(form.service_group)}</span>
          लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ।
        </div>

        <div class="dehay-title">देहाय</div>
        <div class="dehay-grid">
          <div>${dehayRows(DEHAY_LEFT_FIELDS)}</div>
          <div>${dehayRows(DEHAY_RIGHT_FIELDS)}</div>
        </div>

        ${
          notesHtml
            ? `<div class="notes-title">कैफियत:</div><div class="notes-content">${notesHtml}</div>`
            : ""
        }

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${esc(form.signatory_name)}</div>
            <div>${esc(form.signatory_position)}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span>${esc(form.applicant_name)}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span>${esc(form.applicant_address)}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span>${esc(form.applicant_citizenship_no)}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span>${esc(form.applicant_phone)}</span></div>
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

  return (
    <>
      <style>{styles}</style>

      <div className="ilt-page-wrapper">
        <div className="ilt-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(false);
            }}
            noValidate
          >

            {/* Top bar (inside container) */}
            <div className="ilt-top-bar">
              <span className="ilt-top-bar-title">अन्तर स्थानीय संस्थागत सरुवा सहमति</span>
              <span className="ilt-top-bar-path">आधिकारिक प्रयोग &rsaquo; अन्तर स्थानीय संस्थागत सरुवा सहमति</span>
            </div>

            {/* Header */}
            <div className="ilt-header-section">
              <MunicipalityHeader formTitle="अन्तर स्थानीय संस्थागत सरुवा सहमति" />
            </div>

            <div className="ilt-divider" />

            {/* Meta row */}
            <div className="ilt-meta-row">
              <div className="ilt-meta-left">
                <div className="ilt-meta-field">
                  <label>पत्र संख्या:</label>
                  <StarInput value={form.letter_no} onChange={upd("letter_no")} className="meta-input" placeholder="पत्र संख्या" />
                </div>
                <div className="ilt-meta-field">
                  <label>चलानी नं.:</label>
                  <StarInput value={form.reference_no} onChange={upd("reference_no")} className="meta-input" placeholder="चलानी नं." />
                </div>
              </div>
              <div className="ilt-meta-right">
                <div className="ilt-meta-field">
                  <label>मिति:</label>
                  <StarInput value={form.date} onChange={upd("date")} className="meta-input" type="date" />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="ilt-subject">
              <span className="ilt-subject-label">विषय:</span>
              <span className="ilt-subject-text">{form.subject}</span>
            </div>

            {/* Body paragraph */}
            <div className="ilt-body-para">
              <p>
                श्री{" "}
                <StarInput value={form.requested_person_name} onChange={upd("requested_person_name")} className="inline-md" placeholder="नाम" />{" "}
                ले यस कार्यालयमा मिति{" "}
                <strong>{form.date || "______"}</strong>{" "}
                मा माथि स्वीकृति भई{" "}
                <StarInput value={form.transfer_to_local} onChange={upd("transfer_to_local")} className="inline-lg" placeholder="सरुवा जाने स्थानीय तह" />{" "}
                को पद{" "}
                <StarInput value={form.transfer_to_position} onChange={upd("transfer_to_position")} className="inline-md" placeholder="पद" />{" "}
                को च.न.{" "}
                <StarInput value={form.requested_person_position_code} onChange={upd("requested_person_position_code")} className="inline-sm" placeholder="च.न." />{" "}
                मा प्राप्त भएको निवेदन अनुसार कर्मचारी{" "}
                <StarInput value={form.employee_name} onChange={upd("employee_name")} className="inline-md" placeholder="कर्मचारीको नाम" required />{" "}
                को पदनाम{" "}
                <StarInput value={form.employee_post_title} onChange={upd("employee_post_title")} className="inline-md" placeholder="पद/तह" />{" "}
                बमोजिम{" "}
                <StarInput value={form.service_group} onChange={upd("service_group")} className="inline-lg" placeholder="सेवा/समूह/उपसमूह" />{" "}
                लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ।
              </p>
            </div>

            {/* Dehay (details table) */}
            <div className="ilt-dehay">
              <h4 className="ilt-dehay-title">देहाय</h4>
              <div className="ilt-dehay-grid">

                {/* Left column */}
                <div className="ilt-dehay-col">
                  {DEHAY_LEFT_FIELDS.map(([label, key]) => (
                    <div className="ilt-detail-item" key={key}>
                      <label>{label}</label>
                      <StarInput value={form[key]} onChange={upd(key)} className="detail-input" />
                    </div>
                  ))}
                </div>

                {/* Right column */}
                <div className="ilt-dehay-col">
                  {DEHAY_RIGHT_FIELDS.map(([label, key, type]) => (
                    <div className="ilt-detail-item" key={key}>
                      <label>{label}</label>
                      <StarInput
                        value={form[key]}
                        onChange={upd(key)}
                        className="detail-input"
                        type={type}
                        required={key === "citizenship_no"}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Notes — working rich-text editor */}
            <div className="ilt-notes">
              <p className="ilt-notes-title">कैफियत:</p>
              <div className="ilt-editor-wrap">
                <div className="ilt-editor-toolbar">
                  <button type="button" className="ilt-tool bold"      onClick={() => exec("bold")}      tabIndex={-1}>B</button>
                  <button type="button" className="ilt-tool italic"    onClick={() => exec("italic")}    tabIndex={-1}>I</button>
                  <button type="button" className="ilt-tool underline" onClick={() => exec("underline")} tabIndex={-1}>U</button>
                  <span className="ilt-tool-sep">|</span>
                  <select
                    className="ilt-tool-select"
                    defaultValue=""
                    onChange={(e) => { exec("fontSize", e.target.value); e.target.value = ""; }}
                    tabIndex={-1}
                  >
                    <option value="" disabled>Styles</option>
                    <option value="2">सानो</option>
                    <option value="3">मध्यम</option>
                    <option value="5">ठूलो</option>
                  </select>
                  <select
                    className="ilt-tool-select"
                    defaultValue=""
                    onChange={(e) => { exec(e.target.value); e.target.value = ""; }}
                    tabIndex={-1}
                  >
                    <option value="" disabled>Format</option>
                    <option value="justifyLeft">बायाँ</option>
                    <option value="justifyCenter">बीच</option>
                    <option value="justifyRight">दायाँ</option>
                    <option value="insertUnorderedList">सूची</option>
                  </select>
                </div>
                <div
                  ref={editorRef}
                  className="ilt-editable"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="कैफियत यहाँ लेख्नुहोस्..."
                  onInput={onEditorInput}
                />
              </div>
            </div>

            {/* Signature */}
            <div className="ilt-signature-section">
              <div className="ilt-signature-block">
                <StarInput
                  value={form.signatory_name}
                  onChange={upd("signatory_name")}
                  className="sig-name-input"
                  required
                  placeholder="हस्ताक्षरकर्ताको नाम"
                />
                <select
                  className="ilt-select"
                  value={form.signatory_position}
                  onChange={upd("signatory_position")}
                >
                  <option value="">पद छनौट गर्नुहोस्</option>
                  <option value="प्रमुख प्रशासकीय अधिकृत">प्रमुख प्रशासकीय अधिकृत</option>
                  <option value="वडा सचिव">वडा सचिव</option>
                </select>
              </div>
            </div>

            {/* Applicant details */}
            <div className="ilt-applicant-wrapper">
              <ApplicantDetailsNp formData={form} handleChange={handleChange} />
            </div>

            {/* Message */}
            {msg && (
              <div className={`ilt-msg ilt-msg--${msg.type}`}>
                {msg.type === "success" ? "✓" : "✗"} {msg.text}
              </div>
            )}

            {/* Footer buttons */}
            <div className="ilt-actions">
              <button type="submit" className="ilt-btn ilt-btn--save" disabled={loading}>
                {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
              </button>
              <button type="button" className="ilt-btn ilt-btn--print" disabled={loading} onClick={() => handleSave(true)}>
                {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>

          <footer className="ilt-footer">
            © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
          </footer>
        </div>
      </div>
    </>
  );
}