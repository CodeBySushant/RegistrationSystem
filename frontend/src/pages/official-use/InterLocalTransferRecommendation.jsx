// src/pages/official-use/InterLocalTransferRecommendation.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

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

/* ── Breadcrumb ── */
.ilt-breadcrumb {
  max-width: 900px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--ilt-white);
  border: 1px solid var(--ilt-border);
  border-radius: var(--radius);
  padding: 10px 18px;
  box-shadow: var(--shadow);
}
.ilt-breadcrumb-title { font-weight: 700; font-size: 1rem; }
.ilt-breadcrumb-path  { font-size: 0.82rem; color: #888; }

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

/* ── Header ── */
.ilt-header {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
  margin-bottom: 20px;
}
.ilt-header-logo img { width: 80px; height: auto; flex-shrink: 0; }
.ilt-header-text     { text-align: center; }
.ilt-gov-label    { font-size: 0.95rem; margin: 0 0 2px; color: var(--ilt-mid); }
.ilt-municipality { font-size: 2rem; font-weight: 800; margin: 0 0 4px; color: var(--ilt-primary); line-height: 1.2; }
.ilt-ward         { font-size: 1.25rem; font-weight: 700; margin: 0 0 4px; color: var(--ilt-primary-dk); }
.ilt-address,
.ilt-province     { margin: 0; font-size: 0.92rem; color: var(--ilt-mid); }

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

/* ── Action button ── */
.ilt-actions { display: flex; justify-content: center; padding-top: 10px; }
.ilt-btn {
  padding: 11px 32px;
  border: none;
  border-radius: var(--radius);
  font-family: var(--ff);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--ilt-primary);
  color: #fff;
  transition: background .2s, transform .1s;
}
.ilt-btn:hover:not(:disabled)  { background: var(--ilt-primary-dk); }
.ilt-btn:disabled               { opacity: .6; cursor: not-allowed; }
.ilt-btn:active:not(:disabled)  { transform: scale(.97); }

/* ── Footer ── */
.ilt-footer { text-align: right; font-size: 0.8rem; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; margin-top: 36px; }

/* ── Print value spans (hidden on screen) ── */
.ilt-print-value {
  display: none;
  font-family: var(--ff);
  font-size: 1rem;
  color: #000;
  border-bottom: 1px solid #aaa;
  min-width: 60px;
  padding: 0 4px 1px;
  vertical-align: middle;
}
.ilt-print-value.meta-input     { min-width: 140px; }
.ilt-print-value.inline-sm      { min-width: 60px; text-align: center; }
.ilt-print-value.inline-md      { min-width: 160px; }
.ilt-print-value.inline-lg      { min-width: 220px; }
.ilt-print-value.detail-input   { min-width: 120px; }
.ilt-print-value.sig-name-input { min-width: 200px; text-align: center; }
.ilt-print-value.sig-pos-select { min-width: 180px; text-align: center; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .ilt-container    { padding: 24px 18px; }
  .ilt-header       { flex-direction: column; text-align: center; }
  .ilt-municipality { font-size: 1.5rem; }
  .ilt-ward         { font-size: 1.1rem; }
  .ilt-meta-row     { flex-direction: column; }
  .ilt-dehay-grid   { grid-template-columns: 1fr; }
  .ilt-body-para .ilt-input { width: 100%; }
  .ilt-signature-section    { justify-content: center; }
  .ilt-breadcrumb   { flex-direction: column; gap: 4px; align-items: flex-start; }
}
@media (max-width: 480px) {
  .ilt-municipality { font-size: 1.25rem; }
  .ilt-container    { padding: 16px 12px; }
}

/* ── Print ── */
@media print {
  body > *:not(.ilt-page-wrapper) { display: none !important; }
  .ilt-page-wrapper { background: none !important; padding: 0 !important; }
  .ilt-container {
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
  .ilt-print-value { display: inline !important; }
  .ilt-breadcrumb,
  .ilt-actions,
  .ilt-footer,
  .ilt-msg,
  .ilt-applicant-wrapper { display: none !important; }
  .ilt-body-para    { line-height: 2.2; font-size: 1rem; }
  .ilt-municipality { font-size: 1.7rem; }
  .ilt-ward         { font-size: 1.1rem; }
  .ilt-header-logo img { width: 70px; }
  .ilt-body-para,
  .ilt-dehay,
  .ilt-signature-section { page-break-inside: avoid; }
  @page { size: A4; margin: 15mm 20mm; }
}
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const PrintableInput = ({ value, onChange, className = "", required = false, placeholder = "", type = "text" }) => (
  <>
    <input
      type={type}
      className={`ilt-input ${className} screen-only`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
    <span className={`ilt-print-value ${className} print-only`}>
      {value || "\u00A0"}
    </span>
  </>
);

const PrintableSelect = ({ value, onChange, options, className = "" }) => (
  <>
    <select
      className={`ilt-select ${className} screen-only`}
      value={value}
      onChange={onChange}
    >
      <option value="">पद छनौट गर्नुहोस्</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <span className={`ilt-print-value ${className} print-only`}>
      {value || "\u00A0"}
    </span>
  </>
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

const INITIAL_FORM = (user) => ({
  letter_no:                    "२०८२/८३",
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
});

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

  const [form, setForm]       = useState(() => INITIAL_FORM(user));
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
      setForm(INITIAL_FORM(user));
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

      <div className="ilt-page-wrapper">
        {/* Breadcrumb */}
        <div className="ilt-breadcrumb screen-only">
          <span className="ilt-breadcrumb-title">अन्तर स्थानीय संस्थागत सरुवा सहमति</span>
          <span className="ilt-breadcrumb-path">
            आर्थिक प्रबेश &rsaquo; अन्तर स्थानीय संस्थागत सरुवा सहमति
          </span>
        </div>

        <div className="ilt-container">
          <form onSubmit={handleSubmit} noValidate>

            {/* Header */}
            <header className="ilt-header">
              <div className="ilt-header-logo">
                <img src={MUNICIPALITY.logoSrc} alt="नेपाल सरकार" />
              </div>
              <div className="ilt-header-text">
                <p className="ilt-gov-label">नेपाल सरकार</p>
                <h1 className="ilt-municipality">{MUNICIPALITY.name}</h1>
                <h2 className="ilt-ward">{wardLabel}</h2>
                <p className="ilt-address">{MUNICIPALITY.officeLine}</p>
                <p className="ilt-province">{MUNICIPALITY.provinceLine}</p>
              </div>
            </header>

            <div className="ilt-divider" />

            {/* Meta row */}
            <div className="ilt-meta-row">
              <div className="ilt-meta-left">
                <div className="ilt-meta-field">
                  <label>पत्र संख्या:</label>
                  <PrintableInput value={form.letter_no} onChange={upd("letter_no")} className="meta-input" />
                </div>
                <div className="ilt-meta-field">
                  <label>चलानी नं.:</label>
                  <PrintableInput value={form.reference_no} onChange={upd("reference_no")} className="meta-input" placeholder="चलानी नं." />
                </div>
              </div>
              <div className="ilt-meta-right">
                <div className="ilt-meta-field">
                  <label>मिति:</label>
                  <PrintableInput value={form.date} onChange={upd("date")} className="meta-input" type="date" />
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
                <PrintableInput value={form.requested_person_name} onChange={upd("requested_person_name")} className="inline-md" placeholder="नाम" />{" "}
                ले यस कार्यालयमा मिति{" "}
                <strong>{form.date || "______"}</strong>{" "}
                मा माथि स्वीकृति भई{" "}
                <PrintableInput value={form.transfer_to_local} onChange={upd("transfer_to_local")} className="inline-lg" placeholder="सरुवा जाने स्थानीय तह" />{" "}
                को पद{" "}
                <PrintableInput value={form.transfer_to_position} onChange={upd("transfer_to_position")} className="inline-md" placeholder="पद" />{" "}
                को च.न.{" "}
                <PrintableInput value={form.requested_person_position_code} onChange={upd("requested_person_position_code")} className="inline-sm" placeholder="च.न." />{" "}
                मा प्राप्त भएको निवेदन अनुसार कर्मचारी{" "}
                <PrintableInput value={form.employee_name} onChange={upd("employee_name")} className="inline-md" placeholder="कर्मचारीको नाम" required />{" "}
                को पदनाम{" "}
                <PrintableInput value={form.employee_post_title} onChange={upd("employee_post_title")} className="inline-md" placeholder="पद/तह" />{" "}
                बमोजिम{" "}
                <PrintableInput value={form.service_group} onChange={upd("service_group")} className="inline-lg" placeholder="सेवा/समूह/उपसमूह" />{" "}
                लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ।
              </p>
            </div>

            {/* Dehay (details table) */}
            <div className="ilt-dehay">
              <h4 className="ilt-dehay-title">देहाय</h4>
              <div className="ilt-dehay-grid">

                {/* Left column — driven by config array */}
                <div className="ilt-dehay-col">
                  {DEHAY_LEFT_FIELDS.map(([label, key]) => (
                    <div className="ilt-detail-item" key={key}>
                      <label>{label}</label>
                      <PrintableInput value={form[key]} onChange={upd(key)} className="detail-input" />
                    </div>
                  ))}
                </div>

                {/* Right column */}
                <div className="ilt-dehay-col">
                  {DEHAY_RIGHT_FIELDS.map(([label, key, type]) => (
                    <div className="ilt-detail-item" key={key}>
                      <label>{label}</label>
                      <PrintableInput
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

            {/* Signature */}
            <div className="ilt-signature-section">
              <div className="ilt-signature-block">
                <PrintableInput
                  value={form.signatory_name}
                  onChange={upd("signatory_name")}
                  className="sig-name-input"
                  required
                  placeholder="हस्ताक्षरकर्ताको नाम *"
                />
                <PrintableSelect
                  value={form.signatory_position}
                  onChange={upd("signatory_position")}
                  options={["प्रमुख प्रशासकीय अधिकृत", "वडा सचिव"]}
                  className="sig-pos-select"
                />
              </div>
            </div>

            {/* Applicant details (screen only) */}
            <div className="ilt-applicant-wrapper screen-only">
              <ApplicantDetailsNp formData={form} handleChange={upd} />
            </div>

            {/* Message */}
            {msg && (
              <div className={`ilt-msg ilt-msg--${msg.type} screen-only`}>
                {msg.type === "success" ? "✓" : "✗"} {msg.text}
              </div>
            )}

            {/* Submit */}
            <div className="ilt-actions screen-only">
              <button type="submit" className="ilt-btn" disabled={loading}>
                {loading ? "⏳ सेभ हुँदै..." : "🖨 सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>

          <footer className="ilt-footer screen-only">
            © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
          </footer>
        </div>
      </div>
    </>
  );
}