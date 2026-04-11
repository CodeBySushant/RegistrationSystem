import React, { useState, useRef } from "react";
import "./ActingWardOfficerAssigned.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "acting-ward-officer-assigned";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────────────────────────
   Tiny helper: renders a plain <span> in print,
   an <input> on screen — keeps inline layout intact.
───────────────────────────────────────────── */
const PrintableInput = ({
  value,
  onChange,
  className = "",
  required = false,
  placeholder = "",
  style = {},
}) => (
  <>
    {/* Screen */}
    <input
      className={`form-input ${className} screen-only`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      style={style}
    />
    {/* Print */}
    <span className={`print-value ${className} print-only`} style={style}>
      {value || "\u00A0"}
    </span>
  </>
);

/* ─────────────────────────────────────────────
   PrintableSelect — same idea for <select>
───────────────────────────────────────────── */
const PrintableSelect = ({ value, onChange, options, className = "" }) => (
  <>
    <select
      className={`form-select ${className} screen-only`}
      value={value}
      onChange={onChange}
    >
      <option value="">पद छनौट गर्नुहोस्</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <span className={`print-value ${className} print-only`}>
      {value || "\u00A0"}
    </span>
  </>
);

/* ─────────────────────────────────────────────
   PrintableTextarea
───────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const ActingWardOfficerAssigned = () => {
  const { user } = useAuth();

  const initialForm = {
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "२०८२-१२-१८",
    subject: "कार्यवाहक तोकिएको सम्बन्धमा।",
    assigned_member_name: "",
    assigned_member_address: MUNICIPALITY.name,   // ← from config, not hardcoded
    assigned_ward_no: user?.ward || "१",
    assign_from_date: "२०८२-१२-१८",
    assign_to_date: "२०८२-१२-१८",
    bodartha_text: "",
    signatory_name: "",
    signatory_position: "",
    // Applicant
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const formRef = useRef(null);

  /* Generic updater — works for both plain inputs and ApplicantDetailsNp */
  const upd = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  /* ── Validation ── */
  const validate = () => {
    const errors = [];
    if (!form.assigned_member_name.trim())
      errors.push("वडा सदस्यको नाम आवश्यक छ।");
    if (!form.signatory_name.trim()) errors.push("हस्ताक्षरकर्ताको नाम आवश्यक छ।");
    if (!form.signatory_position) errors.push("पद छनौट गर्नुहोस्।");
    if (!form.assign_from_date.trim()) errors.push("सुरु मिति आवश्यक छ।");
    if (!form.assign_to_date.trim()) errors.push("अन्त्य मिति आवश्यक छ।");
    return errors;
  };

  /* ── Submit → Save → Print → Reset ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const errors = validate();
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
      // Print first, then reset
      window.print();
      setForm(initialForm);
      setMsg({ type: "success", text: `सफलतापूर्वक सेभ भयो (ID: ${body.id})` });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || form.assigned_ward_no} वडा कार्यालय`;

  return (
    <div className="awo-page-wrapper">
      {/* ── Breadcrumb (screen only) ── */}
      <div className="awo-breadcrumb screen-only">
        <span className="awo-breadcrumb-title">कार्यवाहक तोकिएको सिफारिस</span>
        <span className="awo-breadcrumb-path">
          आधिकारिक प्रयोग &rsaquo; कार्यवाहक तोकिएको सिफारिस
        </span>
      </div>

      <div className="awo-container" ref={formRef}>
        <form onSubmit={handleSubmit} noValidate>

          {/* ══ OFFICIAL HEADER ══ */}
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

          {/* ══ META ROW ══ */}
          <div className="awo-meta-row">
            <div className="awo-meta-left">
              <div className="awo-meta-field">
                <label>पत्र संख्या:</label>
                <PrintableInput
                  value={form.letter_no}
                  onChange={upd("letter_no")}
                  className="meta-input"
                />
              </div>
              <div className="awo-meta-field">
                <label>चलानी नं.:</label>
                <PrintableInput
                  value={form.reference_no}
                  onChange={upd("reference_no")}
                  className="meta-input"
                  placeholder="चलानी नं."
                />
              </div>
            </div>
            <div className="awo-meta-right">
              <div className="awo-meta-field">
                <label>मिति:</label>
                <PrintableInput
                  value={form.date}
                  onChange={upd("date")}
                  className="meta-input"
                />
              </div>
            </div>
          </div>

          {/* ══ SUBJECT ══ */}
          <div className="awo-subject">
            <span className="awo-subject-label">विषय:</span>
            <span className="awo-subject-text">{form.subject}</span>
          </div>

          {/* ══ ADDRESSEE ══ */}
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
              <PrintableInput
                value={form.assigned_member_address}
                onChange={upd("assigned_member_address")}
                className="addressee-addr-input"
              />
              <span>वडा नं.</span>
              <PrintableInput
                value={form.assigned_ward_no}
                onChange={upd("assigned_ward_no")}
                className="ward-no-input"
              />
            </div>
          </div>

          {/* ══ BODY PARAGRAPH ══ */}
          <div className="awo-body-para">
            <p>
              प्रस्तुत विषयमा कार्यालयको कामकाजको शिलशिलामा मिति{" "}
              <PrintableInput
                value={form.assign_from_date}
                onChange={upd("assign_from_date")}
                className="inline-date-input"
                required
              />{" "}
              गते देखि{" "}
              <PrintableInput
                value={form.assign_to_date}
                onChange={upd("assign_to_date")}
                className="inline-date-input"
                required
              />{" "}
              गते सम्म बाहिर जानु पर्ने भएकोले सो अवधि सम्म यस{" "}
              <PrintableInput
                value={form.assigned_ward_no}
                onChange={upd("assigned_ward_no")}
                className="ward-no-input"
              />{" "}
              नं वडा कार्यालयको वडा अध्यक्षको कामकाज सम्हाल्ने गरी तपाईंलाई
              कार्यवाहक वडा अध्यक्ष तोकेको छु। ईमान्दारीपूर्वक कामकाज गर्नुहोला।
            </p>
          </div>

          {/* ══ SIGNATURE SAMPLE LABEL ══ */}
          <div className="awo-sig-sample-label">दस्तखत नमूना</div>

          {/* ══ BODARTHA ══ */}
          <div className="awo-bodartha">
            <p className="awo-bodartha-title">बोधार्थ:</p>
            <div className="awo-editor-wrap">
              <div className="awo-editor-toolbar screen-only">
                <button type="button" className="tool-btn bold" tabIndex={-1}>B</button>
                <button type="button" className="tool-btn italic" tabIndex={-1}>I</button>
                <button type="button" className="tool-btn underline" tabIndex={-1}>U</button>
                <span className="tool-sep">|</span>
                <button type="button" className="tool-btn" tabIndex={-1}>Styles</button>
                <button type="button" className="tool-btn" tabIndex={-1}>Format</button>
              </div>
              <PrintableTextarea
                value={form.bodartha_text}
                onChange={upd("bodartha_text")}
                rows={6}
              />
            </div>
          </div>

          {/* ══ SIGNATURE BLOCK ══ */}
          <div className="awo-signature-section">
            <div className="awo-signature-block">
              <div className="awo-sig-field">
                <PrintableInput
                  value={form.signatory_name}
                  onChange={upd("signatory_name")}
                  className="sig-name-input"
                  required
                  placeholder="हस्ताक्षरकर्ताको नाम *"
                />
              </div>
              <div className="awo-sig-field">
                <PrintableSelect
                  value={form.signatory_position}
                  onChange={upd("signatory_position")}
                  options={["वडा अध्यक्ष", "वडा सचिव"]}
                  className="sig-pos-select"
                />
              </div>
            </div>
          </div>

          {/* ══ APPLICANT DETAILS ══ */}
          <div className="awo-applicant-wrapper screen-only">
            <ApplicantDetailsNp formData={form} handleChange={upd} />
          </div>

          {/* ══ MESSAGE ══ */}
          {msg && (
            <div className={`awo-msg awo-msg--${msg.type} screen-only`}>
              {msg.type === "success" ? "✓" : "✗"} {msg.text}
            </div>
          )}

          {/* ══ SINGLE ACTION BUTTON ══ */}
          <div className="awo-actions screen-only">
            <button
              type="submit"
              className="awo-btn awo-btn--primary"
              disabled={loading}
            >
              {loading ? "⏳ सेभ हुँदै..." : "🖨 सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>

        {/* ══ FOOTER ══ */}
        <footer className="awo-footer screen-only">
          © सर्वाधिकार सुरक्षित — {MUNICIPALITY.name}
        </footer>
      </div>
    </div>
  );
};

export default ActingWardOfficerAssigned;