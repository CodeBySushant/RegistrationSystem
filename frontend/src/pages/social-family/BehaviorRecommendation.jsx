// src/pages/social-family/BehaviorRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "behavior-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.behavior-recommendation-container {
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
.bold-text      { font-weight: bold; }
.underline-text { text-decoration: underline; }
.bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

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

/* ── Inputs ── */
.behavior-recommendation-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.behavior-recommendation-container .line-input {
  border: none;
  border-bottom: 1px solid #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.behavior-recommendation-container .inline-box-input {
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
.behavior-recommendation-container .dotted-input:focus,
.behavior-recommendation-container .line-input:focus,
.behavior-recommendation-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}
.small-input      { width: 120px; }
.medium-box       { width: 180px; }
.full-width-input { width: 100%; }

/* ── Inline select ── */
.behavior-recommendation-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.behavior-recommendation-container .inline-select:focus { outline: none; border-color: #2563eb; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Salutation ── */
.salutation-section { margin-bottom: 20px; font-size: 1.05rem; }

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
.br-toast {
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
  animation: br-toast-in 0.25s ease;
  max-width: 360px;
}
.br-toast--success { background: #1a7f3c; color: #fff; }
.br-toast--error   { background: #c0392b; color: #fff; }
@keyframes br-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #34495e;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
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
  .behavior-recommendation-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .br-toast      { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .behavior-recommendation-container,
  .behavior-recommendation-container * { visibility: visible; }
  .behavior-recommendation-container {
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
  .br-toast,
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
  chalani_no:               "",
  municipality:             MUNICIPALITY.name,
  applicant_relation_name:  "",
  applicant_relation_type:  "नाति",
  relative_name:            "",
  relative_gender:          "छोरा",
  relative_of:              "",
  signatory_name:           "",
  signatory_designation:    "",
  // ApplicantDetailsNp fields
  applicantName:            "",
  applicantAddress:         "",
  applicantCitizenship:     "",
  applicantPhone:           "",
};

const validate = (form) => {
  if (!form.applicant_relation_name.trim()) return "नाम थर आवश्यक छ।";
  if (!form.relative_name.trim())           return "सम्बन्धित व्यक्तिको नाम आवश्यक छ।";
  if (!form.relative_of.trim())             return "सम्बन्धको विवरण आवश्यक छ।";
  if (!form.signatory_name.trim())          return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signatory_designation)          return "पद छनौट गर्नुहोस्।";
  if (!form.applicantName.trim())           return "निवेदकको नाम आवश्यक छ।";
  if (!form.applicantAddress.trim())        return "निवेदकको ठेगाना आवश्यक छ।";
  if (!form.applicantCitizenship.trim())    return "नागरिकता नं. आवश्यक छ।";
  if (!form.applicantPhone.trim())          return "फोन नं. आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const BehaviorRecommendation = () => {
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

      <form onSubmit={handleSubmit} className="behavior-recommendation-container">

        {/* Toast */}
        {toast && (
          <div className={`br-toast br-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          चालचलन सिफारिस ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; चालचलन सिफारिस
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
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा ।</span></p>
        </div>

        {/* Salutation */}
        <div className="salutation-section">
          <p className="bold-text">जो जस संग सम्बन्ध छ ।</p>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <input
              name="municipality"
              type="text"
              className="inline-box-input medium-box"
              value={form.municipality}
              onChange={handleChange}
            />{" "}
            वडा नं. <span className="bg-gray-text">{user?.ward || MUNICIPALITY.wardNumber || "१"}</span> बस्ने{" "}
            <input
              name="applicant_relation_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.applicant_relation_name}
              onChange={handleChange}
              placeholder="नाम थर *"
              required
            />{" "}
            को{" "}
            <select
              name="applicant_relation_type"
              className="inline-select"
              value={form.applicant_relation_type}
              onChange={handleChange}
            >
              <option value="नाति">नाति</option>
              <option value="नातिनी">नातिनी</option>
              <option value="बुहारी">बुहारी</option>
            </select>
            <input
              name="relative_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.relative_name}
              onChange={handleChange}
              placeholder="सम्बन्धित नाम *"
              required
            />{" "}
            को{" "}
            <select
              name="relative_gender"
              className="inline-select"
              value={form.relative_gender}
              onChange={handleChange}
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input
              name="relative_of"
              type="text"
              className="inline-box-input medium-box"
              value={form.relative_of}
              onChange={handleChange}
              placeholder="नाम *"
              required
            />{" "}
            ले यस कार्यालयमा दिएको निवेदन उपर सर्जमिन मुचुल्का तयार गरी बुझ्दा
            हाल सम्म निजको चालचलन राम्रो रहेको पाइएको हुँदा सोही अनुसारको ब्यहोरा
            निजको फोटो टाँस गरी प्रमाणित गरिन्छ ।
          </p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              name="signatory_name"
              type="text"
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
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
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

export default BehaviorRecommendation;