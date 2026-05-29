// src/pages/official-use/RamanaPatra.jsx
import React, { useState, useRef } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const FORM_KEY = "ramana-patra";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Nepal&display=swap');

:root {
  --rp-primary:    #c0392b;
  --rp-primary-dk: #922b21;
  --rp-dark:       #1a1a2e;
  --rp-mid:        #4a4a6a;
  --rp-border:     #c8c8d8;
  --rp-bg:         #f7f6f2;
  --rp-white:      #ffffff;
  --rp-input-bd:   #bbb;
  --rp-success:    #1e8449;
  --rp-error:      #c0392b;
  --ff:            'Tiro Devanagari Nepal', 'Kalimati', 'Kokila', serif;
  --radius:        4px;
  --shadow:        0 2px 12px rgba(0,0,0,.10);
}

.rp-page-wrapper {
  min-height: 100vh;
  background-color: var(--rp-bg);
  padding: 24px 16px 60px;
  font-family: var(--ff);
  color: var(--rp-dark);
}

/* ── Container (paper) ── */
.rp-container {
  max-width: 900px;
  margin: 0 auto;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  border: 1px solid var(--rp-border);
  border-radius: 6px;
  box-shadow: var(--shadow);
  padding: 40px 52px;
}

/* ── Header wrapper ── */
.rp-header-section { text-align: center; margin-bottom: 14px; position: relative; min-height: 90px; }

/* ── Divider ── */
.rp-divider {
  border: none;
  border-top: 2.5px double var(--rp-primary);
  margin: 14px 0 22px;
}

/* ── Meta row ── */
.rp-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.rp-meta-left,
.rp-meta-right { display: flex; flex-direction: column; gap: 8px; }
.rp-meta-field { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; }
.rp-meta-field label { white-space: nowrap; color: var(--rp-mid); font-weight: 600; min-width: 90px; }

/* ── Subject ── */
.rp-subject { text-align: center; margin: 18px 0 22px; }
.rp-subject-text { font-size: 1.05rem; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }

/* ── Addressee ── */
.rp-addressee { margin-bottom: 22px; padding-left: 4px; }
.rp-addressee-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  font-size: 1rem;
}

/* ── Body paragraph ── */
.rp-body-para {
  font-size: 1rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 28px;
}
.rp-body-para p { margin: 0; }

/* ── Numbered list ── */
.rp-numbered {
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rp-num-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.97rem;
  flex-wrap: wrap;
  line-height: 2;
}
.rp-num-row--inline { flex-wrap: wrap; gap: 8px 12px; }
.rp-num-label { font-weight: 600; white-space: nowrap; color: var(--rp-dark); }
.rp-sub-label { white-space: nowrap; color: var(--rp-mid); font-size: 0.92rem; }

/* ── Required-star wrapper ── */
.rp-req-wrap { position: relative; display: inline-block; vertical-align: middle; }
.rp-req-star {
  position: absolute;
  left: 5px; top: 50%;
  transform: translateY(-50%);
  color: red; font-weight: bold;
  pointer-events: none; font-size: 13px; z-index: 1;
}
.rp-req-wrap .rp-input { padding-left: 16px; }

/* ── Shared input / select ── */
.rp-input {
  background: var(--rp-white);
  border: 1px solid var(--rp-input-bd);
  border-radius: var(--radius);
  padding: 4px 10px;
  font-family: var(--ff);
  font-size: 0.95rem;
  color: var(--rp-dark);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  vertical-align: middle;
}
.rp-input:focus {
  border-color: var(--rp-primary);
  box-shadow: 0 0 0 2px rgba(192,57,43,.15);
}
.rp-input::placeholder { color: #bbb; font-size: 0.85rem; }

.rp-select {
  background: var(--rp-white);
  border: 1px solid var(--rp-input-bd);
  border-radius: var(--radius);
  padding: 6px 10px;
  font-family: var(--ff);
  font-size: 0.95rem;
  color: var(--rp-dark);
  outline: none;
  cursor: pointer;
  width: 100%;
  transition: border-color .2s;
}
.rp-select:focus {
  border-color: var(--rp-primary);
  box-shadow: 0 0 0 2px rgba(192,57,43,.15);
}

/* Width variants */
.meta-w  { width: 160px; }
.w-sm    { width: 64px; text-align: center; }
.w-md    { width: 150px; }
.w-lg    { width: 240px; }
.addr-md { width: 200px; }
.addr-lg { width: 320px; }
.sig-name { width: 220px; text-align: center; }

/* ── Bodartha rich editor ── */
.rp-bodartha { margin-bottom: 30px; }
.rp-bodartha-title { font-weight: 700; margin-bottom: 8px; font-size: 1rem; }
.rp-editor-wrap {
  border: 1px solid var(--rp-border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--rp-white);
}
.rp-editor-toolbar {
  background: #f5f5f5;
  padding: 5px 10px;
  border-bottom: 1px solid var(--rp-border);
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
.rp-tool {
  cursor: pointer;
  font-size: 0.85rem;
  padding: 2px 8px;
  border: 1px solid #ddd;
  background: var(--rp-white);
  border-radius: 2px;
  transition: background .15s;
}
.rp-tool:hover     { background: #e8e8e8; }
.rp-tool:active    { background: #dcdcdc; }
.rp-tool.bold      { font-weight: bold; }
.rp-tool.italic    { font-style: italic; }
.rp-tool.underline { text-decoration: underline; }
.rp-tool-sep       { color: #bbb; padding: 0 2px; }
.rp-tool-select {
  font-family: var(--ff);
  font-size: 0.82rem;
  padding: 2px 4px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background: var(--rp-white);
  cursor: pointer;
}
.rp-editable {
  width: 100%;
  min-height: 120px;
  outline: none;
  padding: 12px;
  font-family: var(--ff);
  font-size: 1rem;
  box-sizing: border-box;
  background: var(--rp-white);
  color: var(--rp-dark);
  line-height: 1.8;
}
.rp-editable:empty:before {
  content: attr(data-placeholder);
  color: #bbb;
}

/* ── Signature ── */
.rp-signature-section { display: flex; justify-content: flex-end; margin: 30px 0; }
.rp-signature-block { width: 240px; text-align: center; display: flex; flex-direction: column; gap: 10px; align-items: center; }

/* ── Applicant wrapper ── */
.rp-applicant-wrapper { margin-bottom: 24px; padding-top: 8px; }

/* ── Message ── */
.rp-msg { padding: 12px 18px; border-radius: var(--radius); font-size: 0.95rem; margin-bottom: 16px; font-weight: 600; }
.rp-msg--success { background: #eafaf1; border: 1px solid #a9dfbf; color: var(--rp-success); }
.rp-msg--error   { background: #fdedec; border: 1px solid #f5b7b1; color: var(--rp-error); }

/* ── Action buttons ── */
.rp-actions { display: flex; justify-content: center; gap: 12px; padding-top: 10px; }
.rp-btn {
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
.rp-btn--save  { background: #2c3e50; }
.rp-btn--save:hover:not(:disabled)  { background: #1a252f; }
.rp-btn--print { background: #1a6b3a; }
.rp-btn--print:hover:not(:disabled) { background: #145530; }
.rp-btn:disabled               { opacity: .6; cursor: not-allowed; }
.rp-btn:active:not(:disabled)  { transform: scale(.97); }

/* ── Footer ── */
.rp-footer { text-align: right; font-size: 0.8rem; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; margin-top: 36px; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .rp-container    { padding: 24px 18px; }
  .rp-meta-row     { flex-direction: column; }
  .rp-num-row      { flex-wrap: wrap; }
  .rp-signature-section { justify-content: center; }
  .rp-breadcrumb   { flex-direction: column; gap: 4px; align-items: flex-start; }
  .rp-input.w-lg,
  .rp-input.addr-lg { width: 100%; max-width: 100%; }
}
@media (max-width: 480px) {
  .rp-container    { padding: 16px 12px; }
}
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const StarInput = ({ value, onChange, className = "", required = false, placeholder = "", type = "text" }) => (
  <span className="rp-req-wrap">
    <span className="rp-req-star">*</span>
    <input
      type={type}
      className={`rp-input ${className}`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </span>
);

/* ─────────────────────────── Helpers ─────────────────────────── */

const NUMBERED_POINTS = [
  { num: "१", label: "कर्मचारीको नाम थर :",           key: "point1_name",           cls: "w-lg" },
  { num: "२", label: "कर्मचारीको संकेत नम्बर :",      key: "point2_signal",         cls: "w-md" },
  {
    num: "३", label: "साविक", inline: true,
    subs: [
      ["(अ) तह :",   "point3_a_level",   "w-sm"],
      ["(आ) श्रेणी :","point3_b_class",   "w-sm"],
      ["(इ) सेवा :",  "point3_c_service", "w-md"],
    ],
  },
  {
    num: "४", label: "जन्म मिति", inline: true,
    subs: [
      ["(वि.सं.) :", "point4_a_birth_bs",   "w-md"],
      ["(ई.सं.) :",  "point4_b_birth_ad",   "w-md"],
      ["जिल्ला :",   "point4_c_birth_dist", "w-md"],
    ],
  },
  { num: "५",  label: "नियुक्ति मिति :",                         key: "point5_appoint_date",        cls: "w-md" },
  {
    num: "६", label: "खाइपाई आएको", inline: true,
    subs: [
      ["(अ) मासिक तलब रु. :", "point6_a_salary", "w-md"],
      ["(आ) ग्रेड दर रु. :",  "point6_b_grade",  "w-md"],
    ],
  },
  { num: "७",  label: "सञ्चय कोष कट्टी नम्बर :",                 key: "point7_provident",           cls: "w-md" },
  { num: "८",  label: "नागरिक लगानी कोष कट्टी :",                key: "point8_investment",          cls: "w-md" },
  { num: "९",  label: "व्यक्तिगत प्यान नम्बर :",                 key: "point9_pan",                 cls: "w-md" },
  { num: "१०", label: "बिदाको विवरण :",                          key: "point10_leave",              cls: "w-lg" },
  { num: "११", label: "औषधि उपचार बापत बाँकी रकम रु. :",        key: "point11_med_claim",          cls: "w-md" },
  { num: "१२", label: "ऋण वा सापटी केहि भए :",                   key: "point12_loan",               cls: "w-lg" },
  { num: "१३", label: "तलब भत्ता भुक्तानी भएको अन्तिम मिति :",  key: "point13_last_payment_date",  cls: "w-md" },
  {
    num: "१४", label: "", inline: true,
    subs: [
      ["(अ) सामाजिक सुरक्षा कर कट्टी :", "point14_a_social_tax",  "w-md"],
      ["(आ) आयकर कट्टी :",               "point14_b_income_tax",  "w-md"],
    ],
  },
  { num: "१५", label: "भ्रमण खर्च एवं पेश्की बाँकी :",          key: "point15_travel_allowance",   cls: "w-md" },
  { num: "१६", label: "अन्य केहि भए :",                          key: "point16_other",              cls: "w-lg" },
];

const INITIAL_FORM = {
  letter_no:      "",
  reference_no:      "",
  date:              "",
  recipient_name:    "",
  recipient_address: "",
  decision_no:       "",
  decision_date:     "",
  emp_post:          "",
  emp_name:          "",
  transfer_office:   "",
  transfer_date:     "",
  attendance_date:   "",
  point1_name:               "",
  point2_signal:             "",
  point3_a_level:            "",
  point3_b_class:            "",
  point3_c_service:          "",
  point4_a_birth_bs:         "",
  point4_b_birth_ad:         "",
  point4_c_birth_dist:       "",
  point5_appoint_date:       "",
  point6_a_salary:           "",
  point6_b_grade:            "",
  point7_provident:          "",
  point8_investment:         "",
  point9_pan:                "",
  point10_leave:             "",
  point11_med_claim:         "",
  point12_loan:              "",
  point13_last_payment_date: "",
  point14_a_social_tax:      "",
  point14_b_income_tax:      "",
  point15_travel_allowance:  "",
  point16_other:             "",
  bodartha:           "",
  signatory_name:     "",
  signatory_position: "",
  applicant_name:           "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
};

const validate = (form) => {
  const errors = [];
  if (!form.emp_name.trim())          errors.push("कर्मचारीको नाम आवश्यक छ।");
  if (!form.signatory_name.trim())    errors.push("हस्ताक्षरकर्ताको नाम आवश्यक छ।");
  if (!form.signatory_position)       errors.push("पद छनौट गर्नुहोस्।");
  return errors;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function RamanaPatra() {
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
    // sync HTML back to state
    setForm((s) => ({ ...s, bodartha: editorRef.current?.innerHTML || "" }));
  };

  const onEditorInput = () =>
    setForm((s) => ({ ...s, bodartha: editorRef.current?.innerHTML || "" }));

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

    // numbered points as a clean list
    const numberedHtml = NUMBERED_POINTS
      .map((pt) => {
        if (pt.inline) {
          const subs = pt.subs
            .map(([subLabel, subKey]) => `${esc(subLabel)} <span class="value">${esc(form[subKey])}</span>`)
            .join(" &nbsp; ");
          return `<div class="num-row"><span class="num-label">${esc(pt.num)}. ${esc(pt.label)}</span> ${subs}</div>`;
        }
        return `<div class="num-row"><span class="num-label">${esc(pt.num)}. ${esc(pt.label)}</span> <span class="value">${esc(form[pt.key])}</span></div>`;
      })
      .join("");

    // bodartha is rich HTML — already escaped at entry by the browser; insert as-is
    const bodarthaHtml = form.bodartha || "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>रमाना पत्र</title>
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
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 20px; }
          /* value sizes to content — short values inline, long ones wrap cleanly */
          .value { font-weight: bold; padding: 0 4px; }
          .value-inline { white-space: nowrap; }
          .numbered { margin-bottom: 22px; }
          .num-row { margin-bottom: 8px; font-size: 10.5pt; line-height: 1.9; }
          .num-label { font-weight: 600; }
          .bodartha-title { font-weight: bold; margin: 14px 0 6px; }
          .bodartha-content { border: 1px solid #ccc; padding: 10px; min-height: 50px; margin-bottom: 20px; }
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

        <div class="subject">विषय: रमाना पत्र ।</div>

        <div class="addressee">
          श्री <span class="value">${esc(form.recipient_name)}</span> ज्यू,<br/>
          <span class="value">${esc(form.recipient_address)}</span>
        </div>

        <div class="body-text">
          यस कार्यालयको निर्णय नं <span class="value value-inline">${esc(form.decision_no)}</span>
          मिति <span class="value value-inline">${esc(form.decision_date)}</span>
          को निर्णय अनुसार <span class="value">${esc(form.emp_post)}</span>
          <span class="value">${esc(form.emp_name)}</span>
          लाई यस कार्यालयबाट मिति <span class="value value-inline">${esc(form.transfer_date)}</span>
          देखि लागू हुने गरी <span class="value">${esc(form.transfer_office)}</span>
          मा सरुवा/काजमा खटाई पठाइएको हुनाले देहाय बमोजिमको विवरण खुलाई रमाना दिइएको व्यहोरा अनुरोध छ ।
        </div>

        <div class="numbered">${numberedHtml}</div>

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

      <div className="rp-page-wrapper">
        <div className="rp-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(false);
            }}
            noValidate
          >

            {/* Header */}
            <div className="rp-header-section">
              <MunicipalityHeader formTitle="रमाना पत्र" />
            </div>

            <div className="rp-divider" />

            {/* Meta row */}
            <div className="rp-meta-row">
              <div className="rp-meta-left">
                <div className="rp-meta-field">
                  <label>पत्र संख्या:</label>
                  <StarInput value={form.letter_no} onChange={upd("letter_no")} className="meta-w" />
                </div>
                <div className="rp-meta-field">
                  <label>चलानी नं.:</label>
                  <StarInput value={form.reference_no} onChange={upd("reference_no")} className="meta-w" placeholder="चलानी नं." />
                </div>
              </div>
              <div className="rp-meta-right">
                <div className="rp-meta-field">
                  <label>मिति:</label>
                  <StarInput value={form.date} onChange={upd("date")} className="meta-w" />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="rp-subject">
              <span className="rp-subject-text">विषय: रमाना पत्र ।</span>
            </div>

            {/* Recipient */}
            <div className="rp-addressee">
              <div className="rp-addressee-row">
                <span>श्री</span>
                <StarInput value={form.recipient_name} onChange={upd("recipient_name")} className="addr-md" placeholder="प्राप्तकर्ताको नाम" />
                <span>ज्यू,</span>
              </div>
              <div className="rp-addressee-row">
                <StarInput value={form.recipient_address} onChange={upd("recipient_address")} className="addr-lg" placeholder="ठेगाना" />
              </div>
            </div>

            {/* Narrative paragraph */}
            <div className="rp-body-para">
              <p>
                यस कार्यालयको निर्णय नं{" "}
                <StarInput value={form.decision_no} onChange={upd("decision_no")} className="w-sm" />{" "}
                मिति{" "}
                <StarInput value={form.decision_date} onChange={upd("decision_date")} className="w-md" />{" "}
                को निर्णय अनुसार{" "}
                <StarInput value={form.emp_post} onChange={upd("emp_post")} className="w-md" placeholder="पद" />{" "}
                <StarInput value={form.emp_name} onChange={upd("emp_name")} className="w-md" placeholder="कर्मचारीको नाम" required />{" "}
                लाई यस कार्यालयबाट मिति{" "}
                <StarInput value={form.transfer_date} onChange={upd("transfer_date")} className="w-md" />{" "}
                देखि लागू हुने गरी{" "}
                <StarInput value={form.transfer_office} onChange={upd("transfer_office")} className="w-lg" placeholder="सरुवा कार्यालय" />{" "}
                मा सरुवा/काजमा खटाई पठाइएको हुनाले देहाय बमोजिमको विवरण खुलाई रमाना दिइएको व्यहोरा अनुरोध छ ।
              </p>
            </div>

            {/* 16-point numbered list */}
            <div className="rp-numbered">
              {NUMBERED_POINTS.map((pt) =>
                pt.inline ? (
                  <div key={pt.num} className="rp-num-row rp-num-row--inline">
                    <span className="rp-num-label">{pt.num}.{pt.label && ` ${pt.label}`}</span>
                    {pt.subs.map(([subLabel, subKey, subCls]) => (
                      <React.Fragment key={subKey}>
                        <span className="rp-sub-label">{subLabel}</span>
                        <StarInput value={form[subKey]} onChange={upd(subKey)} className={subCls} />
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div key={pt.num} className="rp-num-row">
                    <span className="rp-num-label">{pt.num}. {pt.label}</span>
                    <StarInput value={form[pt.key]} onChange={upd(pt.key)} className={pt.cls} />
                  </div>
                )
              )}
            </div>

            {/* Bodartha — working rich-text editor */}
            <div className="rp-bodartha">
              <p className="rp-bodartha-title">बोधार्थ:</p>
              <div className="rp-editor-wrap">
                <div className="rp-editor-toolbar">
                  <button type="button" className="rp-tool bold"      onClick={() => exec("bold")}      tabIndex={-1}>B</button>
                  <button type="button" className="rp-tool italic"    onClick={() => exec("italic")}    tabIndex={-1}>I</button>
                  <button type="button" className="rp-tool underline" onClick={() => exec("underline")} tabIndex={-1}>U</button>
                  <span className="rp-tool-sep">|</span>
                  <select
                    className="rp-tool-select"
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
                    className="rp-tool-select"
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
                  className="rp-editable"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="बोधार्थ यहाँ लेख्नुहोस्..."
                  onInput={onEditorInput}
                />
              </div>
            </div>

            {/* Signature */}
            <div className="rp-signature-section">
              <div className="rp-signature-block">
                <StarInput value={form.signatory_name} onChange={upd("signatory_name")} className="sig-name" required placeholder="हस्ताक्षरकर्ताको नाम" />
                <select
                  className="rp-select"
                  value={form.signatory_position}
                  onChange={upd("signatory_position")}
                >
                  <option value="">पद छनौट गर्नुहोस्</option>
                  <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                  <option value="वडा सचिव">वडा सचिव</option>
                </select>
              </div>
            </div>

            {/* Applicant details */}
            <div className="rp-applicant-wrapper">
              <ApplicantDetailsNp formData={form} handleChange={handleChange} />
            </div>

            {/* Message */}
            {msg && (
              <div className={`rp-msg rp-msg--${msg.type}`}>
                {msg.type === "success" ? "✓" : "✗"} {msg.text}
              </div>
            )}

            {/* Footer buttons */}
            <div className="rp-actions">
              <button type="submit" className="rp-btn rp-btn--save" disabled={loading}>
                {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
              </button>
              <button type="button" className="rp-btn rp-btn--print" disabled={loading} onClick={() => handleSave(true)}>
                {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>

          <footer className="rp-footer">
            © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
          </footer>
        </div>
      </div>
    </>
  );
}