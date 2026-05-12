// src/pages/social-family/JesthaNagarikSifarisWada.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "jestha-nagarik-sifaris-wada";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.jestha-nagarik-container {
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
  box-sizing: border-box;
}

/* ── Utility ── */
.bold-text       { font-weight: bold; }
.underline-text  { text-decoration: underline; }
.red-text-input  { color: #e74c3c; }

/* ── Top bar ── */
.top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Header ── */
.form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.header-logo img     { position: absolute; left: 0; top: 0; width: 80px; }
.header-text         { display: flex; flex-direction: column; align-items: center; }
.municipality-name   { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ward-title          { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.address-text,
.province-text       { color: #e74c3c; margin: 0; font-size: 1rem; }

/* ── Meta row ── */
.meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; flex-wrap: wrap; gap: 8px; }
.meta-left p,
.meta-right p  { margin: 5px 0; }

/* ── Shared inputs ── */
.jestha-nagarik-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.jestha-nagarik-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.jestha-nagarik-container .inline-box-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-family: inherit;
}
.jestha-nagarik-container .dotted-input:focus,
.jestha-nagarik-container .line-input:focus,
.jestha-nagarik-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.medium-input     { width: 200px; }
.full-width-input { width: 100%; }
.tiny-input       { width: 80px; }
.tiny-box         { width: 40px; text-align: center; }
.medium-box       { width: 160px; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
.subject-input   { width: 340px; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; position: relative; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; height: 40px; }
.signature-block .line-input { width: 100%; margin: 0 0 5px 0; border-bottom: 1px solid #000; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  cursor: pointer;
}
.designation-select:focus { outline: none; border-color: #2563eb; }

/* ── Applicant details box ── */
.applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 20px;
  border-radius: 4px;
}
.applicant-details-box h3 {
  color: #777;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.details-grid  { display: grid; grid-template-columns: 1fr; gap: 15px; }
.detail-group  { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.9rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.jns-toast {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.92rem;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: jns-toast-in 0.25s ease;
  max-width: 360px;
}
.jns-toast--success { background: #1a7f3c; color: #fff; }
.jns-toast--error   { background: #c0392b; color: #fff; }
@keyframes jns-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .jestha-nagarik-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .jns-toast     { right: 12px; left: 12px; max-width: none; }
  .subject-input { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .jestha-nagarik-container,
  .jestha-nagarik-container * { visibility: visible; }
  .jestha-nagarik-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 10mm 14mm;
    background: white;
  }
  .form-footer,
  .copyright-footer,
  .jns-toast,
  .top-bar-title { display: none !important; }
  .inline-box-input,
  .line-input,
  .dotted-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const INITIAL_FORM = {
  chalani_no:              "",
  date:                    "",
  subject:                 "ज्येष्ठ नागरिक परिचय-पत्रको सिफारिस सम्बन्धमा ।",
  addressee_line3:         "",
  from_district:           "",
  from_place:              "",
  from_ward_no:            "",
  current_municipality:    MUNICIPALITY.name,
  applicant_reason_text:   "",  // the applicant name/detail in the body paragraph
  signatory_name:          "",  // signature block name — separate from body applicant
  signatory_designation:   "",
  // ApplicantDetailsNp
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
};

const validate = (form) => {
  if (!form.applicant_reason_text.trim()) return "निवेदकको नाम/विवरण आवश्यक छ।";
  if (!form.signatory_name.trim())        return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signatory_designation)        return "पद छनौट गर्नुहोस्।";
  if (!form.applicantName.trim())         return "निवेदकको नाम (तल) आवश्यक छ।";
  if (!form.applicantAddress.trim())      return "निवेदकको ठेगाना आवश्यक छ।";
  if (!form.applicantCitizenship.trim())  return "नागरिकता नं. आवश्यक छ।";
  if (!form.applicantPhone.trim())        return "फोन नं. आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const JesthaNagarikSifarisWada = () => {
  const { user } = useAuth();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्न असफल भयो।";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="jestha-nagarik-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`jns-toast jns-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          ज्येष्ठ नागरिक सिफारिस ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; ज्येष्ठ नागरिक सिफारिस
          </span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">{wardLabel}</h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                type="text"
                name="chalani_no"
                className="dotted-input small-input"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                className="line-input tiny-input"
                placeholder="२०८२-०८-०६"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="line-input subject-input"
              />
            </span>
          </p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री जिल्ला प्रशासन कार्यालय,</span>
          </div>
          <div className="addressee-row">
            <span>{MUNICIPALITY.city || ""}</span>
          </div>
          <div className="addressee-row">
            <input
              type="text"
              name="addressee_line3"
              className="line-input medium-input"
              value={form.addressee_line3}
              onChange={handleChange}
              placeholder="थप ठेगाना"
            />
          </div>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            प्रस्तुत बिषयमा{" "}
            <input
              name="from_district"
              className="inline-box-input medium-box red-text-input"
              value={form.from_district}
              onChange={handleChange}
              placeholder="जिल्ला"
            />{" "}
            जिल्ला{" "}
            <input
              name="from_place"
              className="inline-box-input medium-box red-text-input"
              value={form.from_place}
              onChange={handleChange}
              placeholder="स्थान"
            />{" "}
            वडा नं{" "}
            <input
              name="from_ward_no"
              className="inline-box-input tiny-box red-text-input"
              value={form.from_ward_no}
              onChange={handleChange}
            />{" "}
            स्थायी ठेगाना भई हाल{" "}
            <input
              name="current_municipality"
              className="inline-box-input medium-box"
              value={form.current_municipality}
              onChange={handleChange}
            />{" "}
            वडा नं {user?.ward || MUNICIPALITY.wardNumber || "१"} मा बसोबास गर्ने{" "}
            <input
              name="applicant_reason_text"
              className="inline-box-input medium-box"
              value={form.applicant_reason_text}
              onChange={handleChange}
              placeholder="निवेदकको नाम/विवरण *"
              required
            />{" "}
            ले दिनुभएको निवेदन अनुसार कानुन बमोजिम ज्येष्ठ नागरिक भएको हुँदा
            ज्येष्ठ नागरिक परिचय-पत्र उपलब्ध गराइ पाउँ भनि यस वडा कार्यालयमा
            निवेदन दिनुभएको हुँदा तहाँ कार्यालयको नियमानुसार निज{" "}
            <input
              name="applicant_reason_text"
              className="inline-box-input medium-box"
              value={form.applicant_reason_text}
              onChange={handleChange}
              placeholder="निवेदकको नाम *"
            />{" "}
            लाई ज्येष्ठ नागरिक परिचय-पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ
            अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              type="text"
              name="signatory_name"
              className="line-input full-width-input"
              value={form.signatory_name}
              onChange={handleChange}
              placeholder="हस्ताक्षरकर्ताको नाम *"
              required
            />
            <select
              name="signatory_designation"
              className="designation-select"
              value={form.signatory_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default JesthaNagarikSifarisWada;