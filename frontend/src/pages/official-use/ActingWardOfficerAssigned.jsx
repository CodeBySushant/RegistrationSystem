// src/pages/official-use/ActingWardOfficerAssigned.jsx
import React, { useState, useRef } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

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

/* ── Breadcrumb ── */
.awo-breadcrumb {
  max-width: 900px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--clr-white);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  padding: 10px 18px;
  box-shadow: var(--shadow-card);
}
.awo-breadcrumb-title { font-weight: 700; font-size: 1rem; color: var(--clr-dark); }
.awo-breadcrumb-path  { font-size: 0.82rem; color: #888; }

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

/* ── Header ── */
.awo-header {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
  margin-bottom: 20px;
}
.awo-header-logo img { width: 80px; height: auto; flex-shrink: 0; }
.awo-header-text { text-align: center; }
.awo-gov-label    { font-size: 0.95rem; margin: 0 0 2px; color: var(--clr-mid); letter-spacing: .5px; }
.awo-municipality { font-size: 2rem; font-weight: 800; margin: 0 0 4px; color: var(--clr-primary); line-height: 1.2; }
.awo-ward         { font-size: 1.25rem; font-weight: 700; margin: 0 0 4px; color: var(--clr-primary-dk); }
.awo-address,
.awo-province     { margin: 0; font-size: 0.92rem; color: var(--clr-mid); }

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

/* ── Bodartha ── */
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
.tool-btn.bold   { font-weight: bold; }
.tool-btn.italic { font-style: italic; }
.tool-btn.underline { text-decoration: underline; }
.tool-sep { color: #bbb; padding: 0 2px; }
.editor-textarea {
  width: 100%;
  border: none;
  outline: none;
  padding: 12px;
  font-family: var(--ff-nepali);
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
  min-height: 100px;
  background: var(--clr-white);
  color: var(--clr-dark);
  display: block;
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

/* ── Action button ── */
.awo-actions { display: flex; justify-content: center; padding-top: 10px; }
.awo-btn {
  padding: 11px 32px;
  border: none;
  border-radius: var(--radius);
  font-family: var(--ff-nepali);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s, transform .1s;
}
.awo-btn:disabled { opacity: .6; cursor: not-allowed; }
.awo-btn:active:not(:disabled) { transform: scale(.97); }
.awo-btn--primary { background: var(--clr-primary); color: #fff; letter-spacing: .3px; }
.awo-btn--primary:hover:not(:disabled) { background: var(--clr-primary-dk); }

/* ── Footer ── */
.awo-footer { text-align: right; font-size: 0.8rem; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; margin-top: 36px; }

/* ── Print value spans (hidden on screen, shown in print) ── */
.print-value {
  display: none;
  font-family: var(--ff-nepali);
  font-size: 1rem;
  color: #000;
  border-bottom: 1px solid #aaa;
  min-width: 80px;
  padding: 0 4px 1px;
  vertical-align: middle;
}
.print-value.meta-input           { min-width: 140px; }
.print-value.addressee-name-input { min-width: 200px; }
.print-value.addressee-addr-input { min-width: 160px; }
.print-value.ward-no-input        { min-width: 44px; text-align: center; }
.print-value.inline-date-input    { min-width: 110px; }
.print-value.sig-name-input       { min-width: 200px; text-align: center; }
.print-value.sig-pos-select       { min-width: 120px; text-align: center; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .awo-container { padding: 24px 18px; }
  .awo-header { flex-direction: column; text-align: center; }
  .awo-municipality { font-size: 1.5rem; }
  .awo-ward         { font-size: 1.1rem; }
  .awo-meta-row     { flex-direction: column; gap: 8px; }
  .awo-meta-right   { align-items: flex-start; }
  .awo-addressee-row { flex-wrap: wrap; }
  .form-input,
  .addressee-name-input,
  .addressee-addr-input { width: 100%; max-width: 100%; box-sizing: border-box; }
  .awo-signature-section { justify-content: center; }
  .awo-actions { flex-direction: column; align-items: stretch; }
  .awo-btn { text-align: center; width: 100%; }
  .awo-breadcrumb { flex-direction: column; gap: 4px; align-items: flex-start; }
}
@media (max-width: 480px) {
  .awo-municipality { font-size: 1.25rem; }
  .awo-container { padding: 16px 12px; }
}

/* ── Print ── */
@media print {
  body > *:not(.awo-page-wrapper) { display: none !important; }
  .awo-page-wrapper { background: none !important; padding: 0 !important; }
  .awo-container {
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
  .screen-only { display: none !important; }
  .print-only  { display: inline !important; }
  .print-value { display: inline !important; }
  .awo-editor-wrap .print-value {
    display: block !important;
    border: none;
    border-bottom: 1px solid #aaa;
    min-height: 60px;
    padding: 4px 0;
    white-space: pre-wrap;
  }
  .awo-header-logo img { width: 70px; }
  .awo-municipality { font-size: 1.7rem; }
  .awo-ward         { font-size: 1.1rem; }
  .awo-body-para    { line-height: 2.2; font-size: 1rem; }
  .awo-body-para,
  .awo-addressee,
  .awo-signature-section { page-break-inside: avoid; }
  .awo-bodartha .awo-editor-wrap { border: none; }
  .awo-breadcrumb,
  .awo-actions,
  .awo-footer,
  .awo-msg,
  .awo-applicant-wrapper { display: none !important; }
  @page { size: A4; margin: 15mm 20mm; }
}
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const PrintableInput = ({ value, onChange, className = "", required = false, placeholder = "", style = {} }) => (
  <>
    <input
      className={`form-input ${className} screen-only`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      style={style}
    />
    <span className={`print-value ${className} print-only`} style={style}>
      {value || "\u00A0"}
    </span>
  </>
);

const PrintableSelect = ({ value, onChange, options, className = "" }) => (
  <>
    <select
      className={`form-select ${className} screen-only`}
      value={value}
      onChange={onChange}
    >
      <option value="">पद छनौट गर्नुहोस्</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <span className={`print-value ${className} print-only`}>
      {value || "\u00A0"}
    </span>
  </>
);

const PrintableTextarea = ({ value, onChange, rows = 6 }) => (
  <>
    <textarea
      className="editor-textarea screen-only"
      rows={rows}
      value={value}
      onChange={onChange}
    />
    <div
      className="print-value print-only"
      style={{ minHeight: "80px", whiteSpace: "pre-wrap" }}
    >
      {value || "\u00A0"}
    </div>
  </>
);

/* ─────────────────────────── Helpers ─────────────────────────── */
const INITIAL_FORM = (user) => ({
  letter_no:            "२०८२/८३",
  reference_no:         "",
  date:                 "२०८२-१२-१८",
  subject:              "कार्यवाहक तोकिएको सम्बन्धमा।",
  assigned_member_name: "",
  assigned_member_address: MUNICIPALITY.name,
  assigned_ward_no:     user?.ward || "१",
  assign_from_date:     "२०८२-१२-१८",
  assign_to_date:       "२०८२-१२-१८",
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

  const [form, setForm]       = useState(() => INITIAL_FORM(user));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null); // { type: 'success'|'error', text: string }
  const formRef               = useRef(null);

  /* Generic field updater — also compatible with ApplicantDetailsNp's handleChange(key)(e) API */
  const upd = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || form.assigned_ward_no} वडा कार्यालय`;

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
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "फारम सेभ गर्न त्रुटि भयो।");
      window.print();
      setForm(INITIAL_FORM(user));
      setMsg({ type: "success", text: `सफलतापूर्वक सेभ भयो (ID: ${body.id})` });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="awo-page-wrapper">
        {/* Breadcrumb (screen only) */}
        <div className="awo-breadcrumb screen-only">
          <span className="awo-breadcrumb-title">कार्यवाहक तोकिएको सिफारिस</span>
          <span className="awo-breadcrumb-path">
            आधिकारिक प्रयोग &rsaquo; कार्यवाहक तोकिएको सिफारिस
          </span>
        </div>

        <div className="awo-container" ref={formRef}>
          <form onSubmit={handleSubmit} noValidate>

            {/* Header */}
            <header className="awo-header">
              <div className="awo-header-logo">
                <img src={MUNICIPALITY.logoSrc} alt="नेपाल सरकार" />
              </div>
              <div className="awo-header-text">
                <p className="awo-gov-label">नेपाल सरकार</p>
                <h1 className="awo-municipality">{MUNICIPALITY.name}</h1>
                <h2 className="awo-ward">{wardLabel}</h2>
                <p className="awo-address">{MUNICIPALITY.officeLine}</p>
                <p className="awo-province">{MUNICIPALITY.provinceLine}</p>
              </div>
            </header>

            <div className="awo-divider" />

            {/* Meta row */}
            <div className="awo-meta-row">
              <div className="awo-meta-left">
                <div className="awo-meta-field">
                  <label>पत्र संख्या:</label>
                  <PrintableInput value={form.letter_no} onChange={upd("letter_no")} className="meta-input" />
                </div>
                <div className="awo-meta-field">
                  <label>चलानी नं.:</label>
                  <PrintableInput value={form.reference_no} onChange={upd("reference_no")} className="meta-input" placeholder="चलानी नं." />
                </div>
              </div>
              <div className="awo-meta-right">
                <div className="awo-meta-field">
                  <label>मिति:</label>
                  <PrintableInput value={form.date} onChange={upd("date")} className="meta-input" />
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
                <PrintableInput
                  value={form.assigned_member_name}
                  onChange={upd("assigned_member_name")}
                  className="addressee-name-input"
                  required
                  placeholder="वडा सदस्यको नाम *"
                />
                <span>ज्यू,</span>
              </div>
              <div className="awo-addressee-row">
                <PrintableInput value={form.assigned_member_address} onChange={upd("assigned_member_address")} className="addressee-addr-input" />
                <span>वडा नं.</span>
                <PrintableInput value={form.assigned_ward_no} onChange={upd("assigned_ward_no")} className="ward-no-input" />
              </div>
            </div>

            {/* Body paragraph */}
            <div className="awo-body-para">
              <p>
                प्रस्तुत विषयमा कार्यालयको कामकाजको शिलशिलामा मिति{" "}
                <PrintableInput value={form.assign_from_date} onChange={upd("assign_from_date")} className="inline-date-input" required />{" "}
                गते देखि{" "}
                <PrintableInput value={form.assign_to_date} onChange={upd("assign_to_date")} className="inline-date-input" required />{" "}
                गते सम्म बाहिर जानु पर्ने भएकोले सो अवधि सम्म यस{" "}
                <PrintableInput value={form.assigned_ward_no} onChange={upd("assigned_ward_no")} className="ward-no-input" />{" "}
                नं वडा कार्यालयको वडा अध्यक्षको कामकाज सम्हाल्ने गरी तपाईंलाई
                कार्यवाहक वडा अध्यक्ष तोकेको छु। ईमान्दारीपूर्वक कामकाज गर्नुहोला।
              </p>
            </div>

            {/* Signature sample label */}
            <div className="awo-sig-sample-label">दस्तखत नमूना</div>

            {/* Bodartha */}
            <div className="awo-bodartha">
              <p className="awo-bodartha-title">बोधार्थ:</p>
              <div className="awo-editor-wrap">
                <div className="awo-editor-toolbar screen-only">
                  <button type="button" className="tool-btn bold"      tabIndex={-1}>B</button>
                  <button type="button" className="tool-btn italic"    tabIndex={-1}>I</button>
                  <button type="button" className="tool-btn underline" tabIndex={-1}>U</button>
                  <span className="tool-sep">|</span>
                  <button type="button" className="tool-btn"           tabIndex={-1}>Styles</button>
                  <button type="button" className="tool-btn"           tabIndex={-1}>Format</button>
                </div>
                <PrintableTextarea value={form.bodartha_text} onChange={upd("bodartha_text")} rows={6} />
              </div>
            </div>

            {/* Signature block */}
            <div className="awo-signature-section">
              <div className="awo-signature-block">
                <div className="awo-sig-field">
                  <PrintableInput value={form.signatory_name} onChange={upd("signatory_name")} className="sig-name-input" required placeholder="हस्ताक्षरकर्ताको नाम *" />
                </div>
                <div className="awo-sig-field">
                  <PrintableSelect value={form.signatory_position} onChange={upd("signatory_position")} options={["वडा अध्यक्ष", "वडा सचिव"]} className="sig-pos-select" />
                </div>
              </div>
            </div>

            {/* Applicant Details (screen only) */}
            <div className="awo-applicant-wrapper screen-only">
              <ApplicantDetailsNp formData={form} handleChange={upd} />
            </div>

            {/* Message */}
            {msg && (
              <div className={`awo-msg awo-msg--${msg.type} screen-only`}>
                {msg.type === "success" ? "✓" : "✗"} {msg.text}
              </div>
            )}

            {/* Submit */}
            <div className="awo-actions screen-only">
              <button type="submit" className="awo-btn awo-btn--primary" disabled={loading}>
                {loading ? "⏳ सेभ हुँदै..." : "🖨 सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <footer className="awo-footer screen-only">
            © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
          </footer>
        </div>
      </div>
    </>
  );
};

export default ActingWardOfficerAssigned;