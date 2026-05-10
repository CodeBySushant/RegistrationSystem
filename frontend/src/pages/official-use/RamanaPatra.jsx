// src/pages/official-use/RamanaPatra.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

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

/* ── Breadcrumb ── */
.rp-breadcrumb {
  max-width: 900px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--rp-white);
  border: 1px solid var(--rp-border);
  border-radius: var(--radius);
  padding: 10px 18px;
  box-shadow: var(--shadow);
}
.rp-breadcrumb-title { font-weight: 700; font-size: 1rem; }
.rp-breadcrumb-path  { font-size: 0.82rem; color: #888; }

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

/* ── Header ── */
.rp-header {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
  margin-bottom: 20px;
}
.rp-header-logo img { width: 80px; height: auto; flex-shrink: 0; }
.rp-header-text     { text-align: center; }
.rp-gov-label    { font-size: 0.95rem; margin: 0 0 2px; color: var(--rp-mid); }
.rp-municipality { font-size: 2rem; font-weight: 800; margin: 0 0 4px; color: var(--rp-primary); line-height: 1.2; }
.rp-ward         { font-size: 1.25rem; font-weight: 700; margin: 0 0 4px; color: var(--rp-primary-dk); }
.rp-address,
.rp-province     { margin: 0; font-size: 0.92rem; color: var(--rp-mid); }

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

/* ── Bodartha ── */
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
.rp-tool.bold      { font-weight: bold; }
.rp-tool.italic    { font-style: italic; }
.rp-tool.underline { text-decoration: underline; }
.rp-tool-sep       { color: #bbb; padding: 0 2px; }
.rp-textarea {
  width: 100%;
  border: none;
  outline: none;
  padding: 12px;
  font-family: var(--ff);
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
  min-height: 100px;
  background: var(--rp-white);
  color: var(--rp-dark);
  display: block;
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

/* ── Action button ── */
.rp-actions { display: flex; justify-content: center; padding-top: 10px; }
.rp-btn {
  padding: 11px 32px;
  border: none;
  border-radius: var(--radius);
  font-family: var(--ff);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--rp-primary);
  color: #fff;
  transition: background .2s, transform .1s;
}
.rp-btn:hover:not(:disabled)  { background: var(--rp-primary-dk); }
.rp-btn:disabled               { opacity: .6; cursor: not-allowed; }
.rp-btn:active:not(:disabled)  { transform: scale(.97); }

/* ── Footer ── */
.rp-footer { text-align: right; font-size: 0.8rem; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; margin-top: 36px; }

/* ── Print value spans (hidden on screen) ── */
.rp-print-value {
  display: none;
  font-family: var(--ff);
  font-size: 0.97rem;
  color: #000;
  border-bottom: 1px solid #aaa;
  min-width: 50px;
  padding: 0 4px 1px;
  vertical-align: middle;
}
.rp-print-value.meta-w   { min-width: 140px; }
.rp-print-value.w-sm     { min-width: 54px; text-align: center; }
.rp-print-value.w-md     { min-width: 130px; }
.rp-print-value.w-lg     { min-width: 220px; }
.rp-print-value.addr-md  { min-width: 180px; }
.rp-print-value.addr-lg  { min-width: 300px; }
.rp-print-value.sig-name { min-width: 200px; text-align: center; }
.rp-print-value.sig-pos  { min-width: 160px; text-align: center; }
.rp-textarea-print {
  display: none;
  min-height: 60px;
  white-space: pre-wrap;
  border: none;
  border-bottom: 1px solid #aaa;
  padding: 4px 0;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .rp-container    { padding: 24px 18px; }
  .rp-header       { flex-direction: column; text-align: center; }
  .rp-municipality { font-size: 1.5rem; }
  .rp-ward         { font-size: 1.1rem; }
  .rp-meta-row     { flex-direction: column; }
  .rp-num-row      { flex-wrap: wrap; }
  .rp-signature-section { justify-content: center; }
  .rp-breadcrumb   { flex-direction: column; gap: 4px; align-items: flex-start; }
  .rp-input.w-lg,
  .rp-input.addr-lg { width: 100%; max-width: 100%; }
}
@media (max-width: 480px) {
  .rp-municipality { font-size: 1.25rem; }
  .rp-container    { padding: 16px 12px; }
}

/* ── Print ── */
@media print {
  body > *:not(.rp-page-wrapper) { display: none !important; }
  .rp-page-wrapper { background: none !important; padding: 0 !important; }
  .rp-container {
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 20px 40px !important;
    max-width: 100% !important;
    background-image: url("/papertexture1.jpg") !important;
    background-repeat: repeat !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .screen-only         { display: none !important; }
  .print-only          { display: inline !important; }
  .rp-print-value      { display: inline !important; }
  .rp-textarea-print   { display: block !important; }
  .rp-breadcrumb,
  .rp-actions,
  .rp-footer,
  .rp-msg,
  .rp-applicant-wrapper { display: none !important; }
  .rp-body-para    { line-height: 2.2; font-size: 1rem; }
  .rp-municipality { font-size: 1.7rem; }
  .rp-ward         { font-size: 1.1rem; }
  .rp-header-logo img { width: 70px; }
  .rp-body-para,
  .rp-numbered,
  .rp-signature-section { page-break-inside: avoid; }
  .rp-editor-wrap  { border: none; }
  @page { size: A4; margin: 15mm 20mm; }
}
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const PrintableInput = ({ value, onChange, className = "", required = false, placeholder = "", type = "text" }) => (
  <>
    <input
      type={type}
      className={`rp-input ${className} screen-only`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
    <span className={`rp-print-value ${className} print-only`}>
      {value || "\u00A0"}
    </span>
  </>
);

const PrintableSelect = ({ value, onChange, options, className = "" }) => (
  <>
    <select
      className={`rp-select ${className} screen-only`}
      value={value}
      onChange={onChange}
    >
      <option value="">पद छनौट गर्नुहोस्</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <span className={`rp-print-value ${className} print-only`}>
      {value || "\u00A0"}
    </span>
  </>
);

const PrintableTextarea = ({ value, onChange, rows = 6 }) => (
  <>
    <textarea className="rp-textarea screen-only" rows={rows} value={value} onChange={onChange} />
    <div className="rp-print-value rp-textarea-print print-only">
      {value || "\u00A0"}
    </div>
  </>
);

/* ─────────────────────────── Helpers ─────────────────────────── */

/* 16-point list config: [label, key, className, subRows?]
   subRows: array of [subLabel, key, className] for inline multi-field rows */
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

const INITIAL_FORM = () => ({
  letter_no:    "२०८२/८३",
  reference_no: "",
  date:         "२०८२-१२-१८",
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
});

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

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null); // { type: 'success'|'error', text: string }

  const upd = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || "—"} वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const errors = validate(form);
    if (errors.length) {
      setMsg({ type: "error", text: errors.join(" | ") });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          submitted_by: user?.username || "unknown",
          ward: user?.ward,
        }),
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) throw new Error(body.message || `HTTP ${res.status}`);

      window.print();
      setForm(INITIAL_FORM());
      setMsg({ type: "success", text: `सफलतापूर्वक सेभ भयो (ID: ${body.id || "—"})` });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="rp-page-wrapper">
        {/* Breadcrumb */}
        <div className="rp-breadcrumb screen-only">
          <span className="rp-breadcrumb-title">रमाना पत्र</span>
          <span className="rp-breadcrumb-path">
            आधिकारिक प्रयोग &rsaquo; रमाना पत्र
          </span>
        </div>

        <div className="rp-container">
          <form onSubmit={handleSubmit} noValidate>

            {/* Header */}
            <header className="rp-header">
              <div className="rp-header-logo">
                <img src={MUNICIPALITY.logoSrc} alt="नेपाल सरकार" />
              </div>
              <div className="rp-header-text">
                <p className="rp-gov-label">नेपाल सरकार</p>
                <h1 className="rp-municipality">{MUNICIPALITY.name}</h1>
                <h2 className="rp-ward">{wardLabel}</h2>
                <p className="rp-address">{MUNICIPALITY.officeLine}</p>
                <p className="rp-province">{MUNICIPALITY.provinceLine}</p>
              </div>
            </header>

            <div className="rp-divider" />

            {/* Meta row */}
            <div className="rp-meta-row">
              <div className="rp-meta-left">
                <div className="rp-meta-field">
                  <label>पत्र संख्या:</label>
                  <PrintableInput value={form.letter_no} onChange={upd("letter_no")} className="meta-w" />
                </div>
                <div className="rp-meta-field">
                  <label>चलानी नं.:</label>
                  <PrintableInput value={form.reference_no} onChange={upd("reference_no")} className="meta-w" placeholder="चलानी नं." />
                </div>
              </div>
              <div className="rp-meta-right">
                <div className="rp-meta-field">
                  <label>मिति:</label>
                  <PrintableInput value={form.date} onChange={upd("date")} className="meta-w" />
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
                <PrintableInput value={form.recipient_name} onChange={upd("recipient_name")} className="addr-md" placeholder="प्राप्तकर्ताको नाम" />
                <span>ज्यू,</span>
              </div>
              <div className="rp-addressee-row">
                <PrintableInput value={form.recipient_address} onChange={upd("recipient_address")} className="addr-lg" placeholder="ठेगाना" />
              </div>
            </div>

            {/* Narrative paragraph */}
            <div className="rp-body-para">
              <p>
                यस कार्यालयको निर्णय नं{" "}
                <PrintableInput value={form.decision_no} onChange={upd("decision_no")} className="w-sm" />{" "}
                मिति{" "}
                <PrintableInput value={form.decision_date} onChange={upd("decision_date")} className="w-md" />{" "}
                को निर्णय अनुसार{" "}
                <PrintableInput value={form.emp_post} onChange={upd("emp_post")} className="w-md" placeholder="पद" />{" "}
                <PrintableInput value={form.emp_name} onChange={upd("emp_name")} className="w-md" placeholder="कर्मचारीको नाम" required />{" "}
                लाई यस कार्यालयबाट मिति{" "}
                <PrintableInput value={form.transfer_date} onChange={upd("transfer_date")} className="w-md" />{" "}
                देखि लागू हुने गरी{" "}
                <PrintableInput value={form.transfer_office} onChange={upd("transfer_office")} className="w-lg" placeholder="सरुवा कार्यालय" />{" "}
                मा सरुवा/काजमा खटाई पठाइएको हुनाले देहाय बमोजिमको विवरण खुलाई रमाना दिइएको व्यहोरा अनुरोध छ ।
              </p>
            </div>

            {/* 16-point numbered list — driven by config array */}
            <div className="rp-numbered">
              {NUMBERED_POINTS.map((pt) =>
                pt.inline ? (
                  <div key={pt.num} className="rp-num-row rp-num-row--inline">
                    <span className="rp-num-label">{pt.num}.{pt.label && ` ${pt.label}`}</span>
                    {pt.subs.map(([subLabel, subKey, subCls]) => (
                      <React.Fragment key={subKey}>
                        <span className="rp-sub-label">{subLabel}</span>
                        <PrintableInput value={form[subKey]} onChange={upd(subKey)} className={subCls} />
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div key={pt.num} className="rp-num-row">
                    <span className="rp-num-label">{pt.num}. {pt.label}</span>
                    <PrintableInput value={form[pt.key]} onChange={upd(pt.key)} className={pt.cls} />
                  </div>
                )
              )}
            </div>

            {/* Bodartha */}
            <div className="rp-bodartha">
              <p className="rp-bodartha-title">बोधार्थ:</p>
              <div className="rp-editor-wrap">
                <div className="rp-editor-toolbar screen-only">
                  <button type="button" className="rp-tool bold"      tabIndex={-1}>B</button>
                  <button type="button" className="rp-tool italic"    tabIndex={-1}>I</button>
                  <button type="button" className="rp-tool underline" tabIndex={-1}>U</button>
                  <span className="rp-tool-sep">|</span>
                  <button type="button" className="rp-tool"           tabIndex={-1}>Styles</button>
                  <button type="button" className="rp-tool"           tabIndex={-1}>Format</button>
                </div>
                <PrintableTextarea value={form.bodartha} onChange={upd("bodartha")} rows={6} />
              </div>
            </div>

            {/* Signature */}
            <div className="rp-signature-section">
              <div className="rp-signature-block">
                <PrintableInput value={form.signatory_name} onChange={upd("signatory_name")} className="sig-name" required placeholder="हस्ताक्षरकर्ताको नाम *" />
                <PrintableSelect value={form.signatory_position} onChange={upd("signatory_position")} options={["वडा अध्यक्ष", "वडा सचिव"]} className="sig-pos" />
              </div>
            </div>

            {/* Applicant details (screen only) */}
            <div className="rp-applicant-wrapper screen-only">
              <ApplicantDetailsNp formData={form} handleChange={upd} />
            </div>

            {/* Message */}
            {msg && (
              <div className={`rp-msg rp-msg--${msg.type} screen-only`}>
                {msg.type === "success" ? "✓" : "✗"} {msg.text}
              </div>
            )}

            {/* Submit */}
            <div className="rp-actions screen-only">
              <button type="submit" className="rp-btn" disabled={loading}>
                {loading ? "⏳ सेभ हुँदै..." : "🖨 सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>

          <footer className="rp-footer screen-only">
            © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
          </footer>
        </div>
      </div>
    </>
  );
}