// src/pages/official-use/ActingWardOfficerAssigned.jsx
import React, { useState, useRef } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const FORM_KEY = "acting-ward-officer-assigned";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Nepal&display=swap');

:root {
  --clr-primary:    #c0392b;
  --clr-primary-dk: #922b21;
  --clr-dark:       #1a1a2e;
  --clr-mid:        #4a4a6a;
  --clr-border:     #c8c8d8;
  --clr-bg:         #f7f6f2;
  --clr-white:      #ffffff;
  --clr-input-bg:   #ffffff;
  --clr-input-bd:   #bbb;
  --clr-success:    #1e8449;
  --clr-error:      #c0392b;
  --ff-nepali:      'Tiro Devanagari Nepal', 'Kalimati', 'Kokila', serif;
  --radius:         4px;
  --shadow-card:    0 2px 12px rgba(0,0,0,.10);
}

.awo-page-wrapper {
  min-height: 100vh;
  background-color: var(--clr-bg);
  padding: 24px 16px 60px;
  font-family: var(--ff-nepali);
  color: var(--clr-dark);
}

/* ── Container ── */
.awo-container {
  max-width: 900px;
  margin: 0 auto;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  border: 1px solid var(--clr-border);
  border-radius: 6px;
  box-shadow: var(--shadow-card);
  padding: 40px 52px;
}

/* ── Header wrapper ── */
.awo-header-section { text-align: center; margin-bottom: 14px; position: relative; min-height: 90px; }

/* ── Divider ── */
.awo-divider {
  border: none;
  border-top: 2.5px double var(--clr-primary);
  margin: 14px 0 22px;
}

/* ── Meta row ── */
.awo-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.awo-meta-left,
.awo-meta-right { display: flex; flex-direction: column; gap: 8px; }
.awo-meta-field { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; }
.awo-meta-field label { white-space: nowrap; color: var(--clr-mid); font-weight: 600; min-width: 90px; }

/* ── Required-star wrapper ── */
.awo-req-wrap { position: relative; display: inline-block; vertical-align: middle; }
.awo-req-star {
  position: absolute;
  left: 5px; top: 50%;
  transform: translateY(-50%);
  color: red; font-weight: bold;
  pointer-events: none; font-size: 13px; z-index: 1;
}
.awo-req-wrap .form-input { padding-left: 16px; }

/* ── Shared input/select ── */
.form-input {
  background: var(--clr-input-bg);
  border: 1px solid var(--clr-input-bd);
  border-radius: var(--radius);
  padding: 5px 10px;
  font-family: var(--ff-nepali);
  font-size: 0.95rem;
  color: var(--clr-dark);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  vertical-align: middle;
}
.form-input:focus {
  border-color: var(--clr-primary);
  box-shadow: 0 0 0 2px rgba(192,57,43,.15);
}
.form-input::placeholder { color: #bbb; font-size: 0.85rem; }

.form-select {
  background: var(--clr-input-bg);
  border: 1px solid var(--clr-input-bd);
  border-radius: var(--radius);
  padding: 6px 10px;
  font-family: var(--ff-nepali);
  font-size: 0.95rem;
  color: var(--clr-dark);
  outline: none;
  cursor: pointer;
  width: 100%;
  transition: border-color .2s;
}
.form-select:focus {
  border-color: var(--clr-primary);
  box-shadow: 0 0 0 2px rgba(192,57,43,.15);
}

/* Input size variants */
.meta-input            { width: 160px; }
.addressee-name-input  { width: 220px; }
.addressee-addr-input  { width: 180px; }
.ward-no-input         { width: 52px; text-align: center; }
.inline-date-input     { width: 130px; }
.sig-name-input        { width: 220px; text-align: center; }

/* ── Subject ── */
.awo-subject { text-align: center; margin: 18px 0 22px; font-size: 1.05rem; }
.awo-subject-label { font-weight: 700; margin-right: 6px; }
.awo-subject-text  { font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }

/* ── Addressee ── */
.awo-addressee { margin-bottom: 22px; padding-left: 8px; }
.awo-addressee-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  font-size: 1rem;
}

/* ── Body paragraph ── */
.awo-body-para {
  font-size: 1rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 24px;
  color: var(--clr-dark);
}
.awo-body-para p { margin: 0; }

/* ── Signature sample label ── */
.awo-sig-sample-label {
  text-align: center;
  font-size: 0.88rem;
  color: #888;
  border: 1px dashed #ccc;
  padding: 4px 12px;
  display: inline-block;
  border-radius: 3px;
  margin-bottom: 22px;
}

/* ── Bodartha rich editor ── */
.awo-bodartha { margin-bottom: 30px; }
.awo-bodartha-title { font-weight: 700; margin-bottom: 8px; font-size: 1rem; }
.awo-editor-wrap {
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--clr-white);
}
.awo-editor-toolbar {
  background: #f5f5f5;
  padding: 5px 10px;
  border-bottom: 1px solid var(--clr-border);
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
.tool-btn {
  cursor: pointer;
  font-size: 0.85rem;
  padding: 2px 8px;
  border: 1px solid #ddd;
  background: var(--clr-white);
  border-radius: 2px;
  transition: background .15s;
}
.tool-btn:hover  { background: #e8e8e8; }
.tool-btn:active { background: #dcdcdc; }
.tool-btn.bold   { font-weight: bold; }
.tool-btn.italic { font-style: italic; }
.tool-btn.underline { text-decoration: underline; }
.tool-sep { color: #bbb; padding: 0 2px; }
.tool-select {
  font-family: var(--ff-nepali);
  font-size: 0.82rem;
  padding: 2px 4px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background: var(--clr-white);
  cursor: pointer;
}
.awo-editable {
  width: 100%;
  min-height: 110px;
  outline: none;
  padding: 12px;
  font-family: var(--ff-nepali);
  font-size: 1rem;
  box-sizing: border-box;
  background: var(--clr-white);
  color: var(--clr-dark);
  line-height: 1.8;
}
.awo-editable:empty:before {
  content: attr(data-placeholder);
  color: #bbb;
}

/* ── Signature section ── */
.awo-signature-section { display: flex; justify-content: flex-end; margin: 30px 0; }
.awo-signature-block { width: 240px; text-align: center; display: flex; flex-direction: column; gap: 10px; }
.awo-sig-field { display: flex; flex-direction: column; align-items: center; }

/* ── Applicant wrapper ── */
.awo-applicant-wrapper { margin-bottom: 28px; padding-top: 8px; }

/* ── Message ── */
.awo-msg { padding: 12px 18px; border-radius: var(--radius); font-size: 0.95rem; margin-bottom: 16px; font-weight: 600; }
.awo-msg--success { background: #eafaf1; border: 1px solid #a9dfbf; color: var(--clr-success); }
.awo-msg--error   { background: #fdedec; border: 1px solid #f5b7b1; color: var(--clr-error); }

/* ── Action buttons ── */
.awo-actions { display: flex; justify-content: center; gap: 12px; padding-top: 10px; }
.awo-btn {
  padding: 11px 32px;
  border: none;
  border-radius: var(--radius);
  font-family: var(--ff-nepali);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  transition: background .2s, transform .1s;
}
.awo-btn:disabled { opacity: .6; cursor: not-allowed; }
.awo-btn:active:not(:disabled) { transform: scale(.97); }
.awo-btn--save  { background: #2c3e50; }
.awo-btn--save:hover:not(:disabled)  { background: #1a252f; }
.awo-btn--print { background: #1a6b3a; }
.awo-btn--print:hover:not(:disabled) { background: #145530; }

/* ── Footer ── */
.awo-footer { text-align: right; font-size: 0.8rem; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; margin-top: 36px; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .awo-container { padding: 24px 18px; }
  .awo-meta-row     { flex-direction: column; gap: 8px; }
  .awo-meta-right   { align-items: flex-start; }
  .awo-addressee-row { flex-wrap: wrap; }
  .form-input,
  .addressee-name-input,
  .addressee-addr-input { width: 100%; max-width: 100%; box-sizing: border-box; }
  .awo-signature-section { justify-content: center; }
  .awo-actions { flex-direction: column; align-items: stretch; }
  .awo-btn { text-align: center; width: 100%; }
}
@media (max-width: 480px) {
  .awo-container { padding: 16px 12px; }
}
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const StarInput = ({ value, onChange, className = "", required = false, placeholder = "", type = "text", style = {} }) => (
  <span className="awo-req-wrap">
    <span className="awo-req-star">*</span>
    <input
      type={type}
      className={`form-input ${className}`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      style={style}
    />
  </span>
);

/* ─────────────────────────── Helpers ─────────────────────────── */
const INITIAL_FORM = (user) => ({
  letter_no:            "",
  reference_no:         "",
  date:                 new Date().toISOString().slice(0, 10),
  subject:              "कार्यवाहक तोकिएको सम्बन्धमा।",
  assigned_member_name: "",
  assigned_member_address: MUNICIPALITY.name,
  assigned_ward_no:     user?.ward || "",
  assign_from_date:     "",
  assign_to_date:       "",
  bodartha_text:        "",
  signatory_name:       "",
  signatory_position:   "",
  applicant_name:       "",
  applicant_address:    "",
  applicant_citizenship_no: "",
  applicant_phone:      "",
});

const validate = (form) => {
  const errors = [];
  if (!form.assigned_member_name.trim()) errors.push("वडा सदस्यको नाम आवश्यक छ।");
  if (!form.signatory_name.trim())       errors.push("हस्ताक्षरकर्ताको नाम आवश्यक छ।");
  if (!form.signatory_position)          errors.push("पद छनौट गर्नुहोस्।");
  if (!form.assign_from_date.trim())     errors.push("सुरु मिति आवश्यक छ।");
  if (!form.assign_to_date.trim())       errors.push("अन्त्य मिति आवश्यक छ।");
  return errors;
};

/* ─────────────────────────── Component ─────────────────────────── */
const ActingWardOfficerAssigned = () => {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(INITIAL_FORM(user));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null);
  const editorRef = useRef(null);

  const upd = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  /* Rich-text toolbar command */
  const exec = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setForm((s) => ({ ...s, bodartha_text: editorRef.current?.innerHTML || "" }));
  };

  const onEditorInput = () =>
    setForm((s) => ({ ...s, bodartha_text: editorRef.current?.innerHTML || "" }));

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
        setMsg({ type: "success", text: `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? "—"})` });
      }
      setForm(INITIAL_FORM(user));
      if (editorRef.current) editorRef.current.innerHTML = "";
    } catch (err) {
      const text = err.response?.data?.message || err.response?.data?.error || err.message || "फारम सेभ गर्न त्रुटि भयो।";
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
        : `वडा नं. ${user?.ward || form.assigned_ward_no || ""} वडा कार्यालय`;

    const esc = (v) =>
      String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const bodarthaHtml = form.bodartha_text || "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>कार्यवाहक तोकिएको सिफारिस</title>
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
          .addressee { margin-bottom: 16px; }
          .body-text { font-size: 11pt; line-height: 2.3; text-align: justify; margin-bottom: 20px; }
          /* value sizes to content — short values inline, long ones wrap cleanly */
          .value { font-weight: bold; padding: 0 4px; border-bottom: 1px solid #aaa; }
          .value-inline { white-space: nowrap; }
          .bodartha-title { font-weight: bold; margin: 14px 0 6px; }
          .bodartha-content { border: 1px solid #ccc; padding: 10px; min-height: 40px; margin-bottom: 20px; }
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

        <div class="addressee">
          श्री वडा सदस्य <span class="value">${esc(form.assigned_member_name)}</span> ज्यू,<br/>
          <span class="value">${esc(form.assigned_member_address)}</span>
          वडा नं. <span class="value value-inline">${esc(form.assigned_ward_no)}</span>
        </div>

        <div class="body-text">
          प्रस्तुत विषयमा कार्यालयको कामकाजको शिलशिलामा मिति
          <span class="value value-inline">${esc(form.assign_from_date)}</span>
          गते देखि <span class="value value-inline">${esc(form.assign_to_date)}</span>
          गते सम्म बाहिर जानु पर्ने भएकोले सो अवधि सम्म यस
          <span class="value value-inline">${esc(form.assigned_ward_no)}</span>
          नं वडा कार्यालयको वडा अध्यक्षको कामकाज सम्हाल्ने गरी तपाईंलाई
          कार्यवाहक वडा अध्यक्ष तोकेको छु। ईमान्दारीपूर्वक कामकाज गर्नुहोला।
        </div>

        ${
          bodarthaHtml
            ? `<div class="bodartha-title">बोधार्थ:</div><div class="bodartha-content">${bodarthaHtml}</div>`
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

      <div className="awo-page-wrapper">
        <div className="awo-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(false);
            }}
            noValidate
          >

            {/* Header */}
            <div className="awo-header-section">
              <MunicipalityHeader formTitle="कार्यवाहक तोकिएको सिफारिस" />
            </div>

            <div className="awo-divider" />

            {/* Meta row */}
            <div className="awo-meta-row">
              <div className="awo-meta-left">
                <div className="awo-meta-field">
                  <label>पत्र संख्या:</label>
                  <StarInput value={form.letter_no} onChange={upd("letter_no")} className="meta-input" placeholder="पत्र संख्या" />
                </div>
                <div className="awo-meta-field">
                  <label>चलानी नं.:</label>
                  <StarInput value={form.reference_no} onChange={upd("reference_no")} className="meta-input" placeholder="चलानी नं." />
                </div>
              </div>
              <div className="awo-meta-right">
                <div className="awo-meta-field">
                  <label>मिति:</label>
                  <StarInput value={form.date} onChange={upd("date")} className="meta-input" type="date" />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="awo-subject">
              <span className="awo-subject-label">विषय:</span>
              <span className="awo-subject-text">{form.subject}</span>
            </div>

            {/* Addressee */}
            <div className="awo-addressee">
              <div className="awo-addressee-row">
                <span>श्री वडा सदस्य</span>
                <StarInput
                  value={form.assigned_member_name}
                  onChange={upd("assigned_member_name")}
                  className="addressee-name-input"
                  required
                  placeholder="वडा सदस्यको नाम"
                />
                <span>ज्यू,</span>
              </div>
              <div className="awo-addressee-row">
                <StarInput value={form.assigned_member_address} onChange={upd("assigned_member_address")} className="addressee-addr-input" />
                <span>वडा नं.</span>
                <StarInput value={form.assigned_ward_no} onChange={upd("assigned_ward_no")} className="ward-no-input" />
              </div>
            </div>

            {/* Body paragraph */}
            <div className="awo-body-para">
              <p>
                प्रस्तुत विषयमा कार्यालयको कामकाजको शिलशिलामा मिति{" "}
                <StarInput value={form.assign_from_date} onChange={upd("assign_from_date")} className="inline-date-input" required />{" "}
                गते देखि{" "}
                <StarInput value={form.assign_to_date} onChange={upd("assign_to_date")} className="inline-date-input" required />{" "}
                गते सम्म बाहिर जानु पर्ने भएकोले सो अवधि सम्म यस{" "}
                <StarInput value={form.assigned_ward_no} onChange={upd("assigned_ward_no")} className="ward-no-input" />{" "}
                नं वडा कार्यालयको वडा अध्यक्षको कामकाज सम्हाल्ने गरी तपाईंलाई
                कार्यवाहक वडा अध्यक्ष तोकेको छु। ईमान्दारीपूर्वक कामकाज गर्नुहोला।
              </p>
            </div>

            {/* Signature sample label */}
            <div className="awo-sig-sample-label">दस्तखत नमूना</div>

            {/* Bodartha — working rich-text editor */}
            <div className="awo-bodartha">
              <p className="awo-bodartha-title">बोधार्थ:</p>
              <div className="awo-editor-wrap">
                <div className="awo-editor-toolbar">
                  <button type="button" className="tool-btn bold"      onClick={() => exec("bold")}      tabIndex={-1}>B</button>
                  <button type="button" className="tool-btn italic"    onClick={() => exec("italic")}    tabIndex={-1}>I</button>
                  <button type="button" className="tool-btn underline" onClick={() => exec("underline")} tabIndex={-1}>U</button>
                  <span className="tool-sep">|</span>
                  <select
                    className="tool-select"
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
                    className="tool-select"
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
                  className="awo-editable"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="बोधार्थ यहाँ लेख्नुहोस्..."
                  onInput={onEditorInput}
                />
              </div>
            </div>

            {/* Signature block */}
            <div className="awo-signature-section">
              <div className="awo-signature-block">
                <div className="awo-sig-field">
                  <StarInput value={form.signatory_name} onChange={upd("signatory_name")} className="sig-name-input" required placeholder="हस्ताक्षरकर्ताको नाम" />
                </div>
                <div className="awo-sig-field" style={{ width: "100%" }}>
                  <select
                    className="form-select"
                    value={form.signatory_position}
                    onChange={upd("signatory_position")}
                  >
                    <option value="">पद छनौट गर्नुहोस्</option>
                    <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                    <option value="वडा सचिव">वडा सचिव</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Applicant Details */}
            <div className="awo-applicant-wrapper">
              <ApplicantDetailsNp formData={form} handleChange={handleChange} />
            </div>

            {/* Message */}
            {msg && (
              <div className={`awo-msg awo-msg--${msg.type}`}>
                {msg.type === "success" ? "✓" : "✗"} {msg.text}
              </div>
            )}

            {/* Footer buttons */}
            <div className="awo-actions">
              <button type="submit" className="awo-btn awo-btn--save" disabled={loading}>
                {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
              </button>
              <button type="button" className="awo-btn awo-btn--print" disabled={loading} onClick={() => handleSave(true)}>
                {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <footer className="awo-footer">
            © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
          </footer>
        </div>
      </div>
    </>
  );
};

export default ActingWardOfficerAssigned;