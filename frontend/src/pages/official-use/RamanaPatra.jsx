import React, { useState } from "react";
import "./RamanaPatra.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "ramana-patra";
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

/* ─────────────────────────────────────────────
   PrintableSelect
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   PrintableTextarea
───────────────────────────────────────────── */
const PrintableTextarea = ({ value, onChange, rows = 6 }) => (
  <>
    <textarea
      className="rp-textarea screen-only"
      rows={rows}
      value={value}
      onChange={onChange}
    />
    <div className="rp-print-value rp-textarea-print print-only">
      {value || "\u00A0"}
    </div>
  </>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function RamanaPatra() {
  const { user } = useAuth();

  const initialForm = {
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "२०८२-१२-१८",
    recipient_name: "",
    recipient_address: "",

    // Narrative body
    decision_no: "",
    decision_date: "",
    emp_post: "",
    emp_name: "",
    transfer_office: "",
    transfer_date: "",
    attendance_date: "",

    // 16 Points
    point1_name: "",
    point2_signal: "",
    point3_a_level: "",
    point3_b_class: "",
    point3_c_service: "",
    point4_a_birth_bs: "",
    point4_b_birth_ad: "",
    point4_c_birth_dist: "",
    point5_appoint_date: "",
    point6_a_salary: "",
    point6_b_grade: "",
    point7_provident: "",
    point8_investment: "",
    point9_pan: "",
    point10_leave: "",
    point11_med_claim: "",
    point12_loan: "",
    point13_last_payment_date: "",
    point14_a_social_tax: "",
    point14_b_income_tax: "",
    point15_travel_allowance: "",
    point16_other: "",

    bodartha: "",
    signatory_name: "",
    signatory_position: "",

    // Applicant details
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const upd = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  /* ── Validation ── */
  const validate = () => {
    const errors = [];
    if (!form.emp_name.trim()) errors.push("कर्मचारीको नाम आवश्यक छ।");
    if (!form.signatory_name.trim()) errors.push("हस्ताक्षरकर्ताको नाम आवश्यक छ।");
    if (!form.signatory_position) errors.push("पद छनौट गर्नुहोस्।");
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

      // Success → print → reset
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
    <div className="rp-page-wrapper">
      {/* ── Breadcrumb (screen only) ── */}
      <div className="rp-breadcrumb screen-only">
        <span className="rp-breadcrumb-title">रमाना पत्र</span>
        <span className="rp-breadcrumb-path">
          आधिकारिक प्रयोग &rsaquo; रमाना पत्र
        </span>
      </div>

      <div className="rp-container">
        <form onSubmit={handleSubmit} noValidate>

          {/* ══ OFFICIAL HEADER ══ */}
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

          {/* ══ META ROW ══ */}
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

          {/* ══ SUBJECT ══ */}
          <div className="rp-subject">
            <span className="rp-subject-text">विषय: रमाना पत्र ।</span>
          </div>

          {/* ══ RECIPIENT ══ */}
          <div className="rp-addressee">
            <div className="rp-addressee-row">
              <span>श्री</span>
              <PrintableInput
                value={form.recipient_name}
                onChange={upd("recipient_name")}
                className="addr-md"
                placeholder="प्राप्तकर्ताको नाम"
              />
              <span>ज्यू,</span>
            </div>
            <div className="rp-addressee-row">
              <PrintableInput
                value={form.recipient_address}
                onChange={upd("recipient_address")}
                className="addr-lg"
                placeholder="ठेगाना"
              />
            </div>
          </div>

          {/* ══ NARRATIVE PARAGRAPH ══ */}
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

          {/* ══ 16-POINT NUMBERED LIST ══ */}
          <div className="rp-numbered">

            <div className="rp-num-row">
              <span className="rp-num-label">१. कर्मचारीको नाम थर :</span>
              <PrintableInput value={form.point1_name} onChange={upd("point1_name")} className="w-lg" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">२. कर्मचारीको संकेत नम्बर :</span>
              <PrintableInput value={form.point2_signal} onChange={upd("point2_signal")} className="w-md" />
            </div>

            <div className="rp-num-row rp-num-row--inline">
              <span className="rp-num-label">३. साविक</span>
              <span className="rp-sub-label">(अ) तह :</span>
              <PrintableInput value={form.point3_a_level} onChange={upd("point3_a_level")} className="w-sm" />
              <span className="rp-sub-label">(आ) श्रेणी :</span>
              <PrintableInput value={form.point3_b_class} onChange={upd("point3_b_class")} className="w-sm" />
              <span className="rp-sub-label">(इ) सेवा :</span>
              <PrintableInput value={form.point3_c_service} onChange={upd("point3_c_service")} className="w-md" />
            </div>

            <div className="rp-num-row rp-num-row--inline">
              <span className="rp-num-label">४. जन्म मिति</span>
              <span className="rp-sub-label">(वि.सं.) :</span>
              <PrintableInput value={form.point4_a_birth_bs} onChange={upd("point4_a_birth_bs")} className="w-md" />
              <span className="rp-sub-label">(ई.सं.) :</span>
              <PrintableInput value={form.point4_b_birth_ad} onChange={upd("point4_b_birth_ad")} className="w-md" />
              <span className="rp-sub-label">जिल्ला :</span>
              <PrintableInput value={form.point4_c_birth_dist} onChange={upd("point4_c_birth_dist")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">५. नियुक्ति मिति :</span>
              <PrintableInput value={form.point5_appoint_date} onChange={upd("point5_appoint_date")} className="w-md" />
            </div>

            <div className="rp-num-row rp-num-row--inline">
              <span className="rp-num-label">६. खाइपाई आएको</span>
              <span className="rp-sub-label">(अ) मासिक तलब रु. :</span>
              <PrintableInput value={form.point6_a_salary} onChange={upd("point6_a_salary")} className="w-md" />
              <span className="rp-sub-label">(आ) ग्रेड दर रु. :</span>
              <PrintableInput value={form.point6_b_grade} onChange={upd("point6_b_grade")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">७. सञ्चय कोष कट्टी नम्बर :</span>
              <PrintableInput value={form.point7_provident} onChange={upd("point7_provident")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">८. नागरिक लगानी कोष कट्टी :</span>
              <PrintableInput value={form.point8_investment} onChange={upd("point8_investment")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">९. व्यक्तिगत प्यान नम्बर :</span>
              <PrintableInput value={form.point9_pan} onChange={upd("point9_pan")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">१०. बिदाको विवरण :</span>
              <PrintableInput value={form.point10_leave} onChange={upd("point10_leave")} className="w-lg" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">११. औषधि उपचार बापत बाँकी रकम रु. :</span>
              <PrintableInput value={form.point11_med_claim} onChange={upd("point11_med_claim")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">१२. ऋण वा सापटी केहि भए :</span>
              <PrintableInput value={form.point12_loan} onChange={upd("point12_loan")} className="w-lg" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">१३. तलब भत्ता भुक्तानी भएको अन्तिम मिति :</span>
              <PrintableInput value={form.point13_last_payment_date} onChange={upd("point13_last_payment_date")} className="w-md" />
            </div>

            <div className="rp-num-row rp-num-row--inline">
              <span className="rp-num-label">१४.</span>
              <span className="rp-sub-label">(अ) सामाजिक सुरक्षा कर कट्टी :</span>
              <PrintableInput value={form.point14_a_social_tax} onChange={upd("point14_a_social_tax")} className="w-md" />
              <span className="rp-sub-label">(आ) आयकर कट्टी :</span>
              <PrintableInput value={form.point14_b_income_tax} onChange={upd("point14_b_income_tax")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">१५. भ्रमण खर्च एवं पेश्की बाँकी :</span>
              <PrintableInput value={form.point15_travel_allowance} onChange={upd("point15_travel_allowance")} className="w-md" />
            </div>

            <div className="rp-num-row">
              <span className="rp-num-label">१६. अन्य केहि भए :</span>
              <PrintableInput value={form.point16_other} onChange={upd("point16_other")} className="w-lg" />
            </div>

          </div>

          {/* ══ BODARTHA ══ */}
          <div className="rp-bodartha">
            <p className="rp-bodartha-title">बोधार्थ:</p>
            <div className="rp-editor-wrap">
              <div className="rp-editor-toolbar screen-only">
                <button type="button" className="rp-tool bold" tabIndex={-1}>B</button>
                <button type="button" className="rp-tool italic" tabIndex={-1}>I</button>
                <button type="button" className="rp-tool underline" tabIndex={-1}>U</button>
                <span className="rp-tool-sep">|</span>
                <button type="button" className="rp-tool" tabIndex={-1}>Styles</button>
                <button type="button" className="rp-tool" tabIndex={-1}>Format</button>
              </div>
              <PrintableTextarea value={form.bodartha} onChange={upd("bodartha")} rows={6} />
            </div>
          </div>

          {/* ══ SIGNATURE ══ */}
          <div className="rp-signature-section">
            <div className="rp-signature-block">
              <PrintableInput
                value={form.signatory_name}
                onChange={upd("signatory_name")}
                className="sig-name"
                required
                placeholder="हस्ताक्षरकर्ताको नाम *"
              />
              <PrintableSelect
                value={form.signatory_position}
                onChange={upd("signatory_position")}
                options={["वडा अध्यक्ष", "वडा सचिव"]}
                className="sig-pos"
              />
            </div>
          </div>

          {/* ══ APPLICANT DETAILS — no box ══ */}
          <div className="rp-applicant-wrapper screen-only">
            <ApplicantDetailsNp formData={form} handleChange={upd} />
          </div>

          {/* ══ MESSAGE ══ */}
          {msg && (
            <div className={`rp-msg rp-msg--${msg.type} screen-only`}>
              {msg.type === "success" ? "✓" : "✗"} {msg.text}
            </div>
          )}

          {/* ══ SINGLE BUTTON ══ */}
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
  );
}