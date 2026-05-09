// src/components/InterLocalTransferRecommendation.jsx
import React, { useState } from "react";
import "./InterLocalTransferRecommendation.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "inter-local-transfer-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────────────────────────
   PrintableInput — <input> on screen, <span> on print
───────────────────────────────────────────── */
const PrintableInput = ({
  value,
  onChange,
  className = "",
  required = false,
  placeholder = "",
  type = "text",
}) => (
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

/* ─────────────────────────────────────────────
   PrintableSelect
───────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function InterLocalTransferRecommendation() {
  const { user } = useAuth();

  const initialForm = {
    letter_no: "२०८२/८३",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10),
    subject: "अन्तर स्थानीय सरुवा सहमति दिईएको सम्बन्धमा",

    requested_person_name: "",
    requested_person_position: "",
    requested_person_position_code: "",

    transfer_to_local: "",
    transfer_to_position: "",

    employee_name: "",
    employee_post_title: "",
    service_group: "",

    appointing_local: MUNICIPALITY.name,        // ← from config
    transfer_local: "",
    permanent_address: "",

    phone: "",
    dob: "",
    citizenship_no: "",
    citizenship_issue_date: "",
    citizenship_issue_district: "",

    signatory_name: "",
    signatory_position: "",

    // Applicant footer fields
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",

    notes: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const upd = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  /* ── Validation ── */
  const validate = () => {
    const errors = [];
    if (!form.employee_name.trim()) errors.push("कर्मचारीको नाम आवश्यक छ।");
    if (!form.citizenship_no.trim()) errors.push("नागरिकता नं. आवश्यक छ।");
    if (!form.signatory_name.trim()) errors.push("हस्ताक्षरकर्ताको नाम आवश्यक छ।");
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

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) throw new Error(body.message || `HTTP ${res.status}`);

      // Save succeeded → print → reset
      window.print();
      setForm(initialForm);
      setMsg({ type: "success", text: `सफलतापूर्वक सेभ भयो (ID: ${body.id || "—"})` });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || "—"} वडा कार्यालय`;

  return (
    <div className="ilt-page-wrapper">
      {/* ── Breadcrumb ── */}
      <div className="ilt-breadcrumb screen-only">
        <span className="ilt-breadcrumb-title">अन्तर स्थानीय संस्थागत सरुवा सहमति</span>
        <span className="ilt-breadcrumb-path">
          आर्थिक प्रबेश &rsaquo; अन्तर स्थानीय संस्थागत सरुवा सहमति
        </span>
      </div>

      <div className="ilt-container">
        <form onSubmit={handleSubmit} noValidate>

          {/* ══ OFFICIAL HEADER ══ */}
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

          {/* ══ META ROW ══ */}
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

          {/* ══ SUBJECT ══ */}
          <div className="ilt-subject">
            <span className="ilt-subject-label">विषय:</span>
            <span className="ilt-subject-text">{form.subject}</span>
          </div>

          {/* ══ BODY PARAGRAPH ══ */}
          <div className="ilt-body-para">
            <p>
              श्री{" "}
              <PrintableInput
                value={form.requested_person_name}
                onChange={upd("requested_person_name")}
                className="inline-md"
                placeholder="नाम"
              />{" "}
              ले यस कार्यालयमा मिति{" "}
              <strong>{form.date || "______"}</strong>{" "}
              मा माथि स्वीकृति भई{" "}
              <PrintableInput
                value={form.transfer_to_local}
                onChange={upd("transfer_to_local")}
                className="inline-lg"
                placeholder="सरुवा जाने स्थानीय तह"
              />{" "}
              को पद{" "}
              <PrintableInput
                value={form.transfer_to_position}
                onChange={upd("transfer_to_position")}
                className="inline-md"
                placeholder="पद"
              />{" "}
              को च.न.{" "}
              <PrintableInput
                value={form.requested_person_position_code}
                onChange={upd("requested_person_position_code")}
                className="inline-sm"
                placeholder="च.न."
              />{" "}
              मा प्राप्त भएको निवेदन अनुसार कर्मचारी{" "}
              <PrintableInput
                value={form.employee_name}
                onChange={upd("employee_name")}
                className="inline-md"
                placeholder="कर्मचारीको नाम"
                required
              />{" "}
              को पदनाम{" "}
              <PrintableInput
                value={form.employee_post_title}
                onChange={upd("employee_post_title")}
                className="inline-md"
                placeholder="पद/तह"
              />{" "}
              बमोजिम{" "}
              <PrintableInput
                value={form.service_group}
                onChange={upd("service_group")}
                className="inline-lg"
                placeholder="सेवा/समूह/उपसमूह"
              />{" "}
              लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ।
            </p>
          </div>

          {/* ══ DEHAY (Details Table) ══ */}
          <div className="ilt-dehay">
            <h4 className="ilt-dehay-title">देहाय</h4>
            <div className="ilt-dehay-grid">

              {/* Left column */}
              <div className="ilt-dehay-col">
                {[
                  ["नाम थर:", "employee_name"],
                  ["पद/तह:", "employee_post_title"],
                  ["सेवा/समूह/उपसमूह:", "service_group"],
                  ["नियुक्ति दिने स्थानीय तह:", "appointing_local"],
                  ["सरुवा जाने स्थानीय तह:", "transfer_local"],
                  ["स्थायी ठेगाना:", "permanent_address"],
                ].map(([label, key]) => (
                  <div className="ilt-detail-item" key={key}>
                    <label>{label}</label>
                    <PrintableInput
                      value={form[key]}
                      onChange={upd(key)}
                      className="detail-input"
                    />
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div className="ilt-dehay-col">
                <div className="ilt-detail-item">
                  <label>फोन नं:</label>
                  <PrintableInput value={form.phone} onChange={upd("phone")} className="detail-input" />
                </div>
                <div className="ilt-detail-item">
                  <label>जन्म मिति:</label>
                  <PrintableInput value={form.dob} onChange={upd("dob")} className="detail-input" type="date" />
                </div>
                <div className="ilt-detail-item">
                  <label>ना.प्र.नं:</label>
                  <PrintableInput value={form.citizenship_no} onChange={upd("citizenship_no")} className="detail-input" required />
                </div>
                <div className="ilt-detail-item">
                  <label>जारी मिति:</label>
                  <PrintableInput value={form.citizenship_issue_date} onChange={upd("citizenship_issue_date")} className="detail-input" type="date" />
                </div>
                <div className="ilt-detail-item">
                  <label>जारी जिल्ला:</label>
                  <PrintableInput value={form.citizenship_issue_district} onChange={upd("citizenship_issue_district")} className="detail-input" />
                </div>
              </div>

            </div>
          </div>

          {/* ══ SIGNATURE ══ */}
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

          {/* ══ APPLICANT DETAILS — no box ══ */}
          <div className="ilt-applicant-wrapper screen-only">
            <ApplicantDetailsNp formData={form} handleChange={upd} />
          </div>

          {/* ══ MESSAGE ══ */}
          {msg && (
            <div className={`ilt-msg ilt-msg--${msg.type} screen-only`}>
              {msg.type === "success" ? "✓" : "✗"} {msg.text}
            </div>
          )}

          {/* ══ SINGLE BUTTON ══ */}
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
  );
}