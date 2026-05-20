// src/pages/house-land/PartialHouseConstructionCompletedCertificate.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "partial-house-construction-completed-certificate";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.partial-construction-container {
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
.partial-construction-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.partial-construction-container .line-input {
  border: none;
  border-bottom: 1px solid #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.partial-construction-container .inline-box-input {
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
.partial-construction-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.partial-construction-container .dotted-input:focus,
.partial-construction-container .line-input:focus,
.partial-construction-container .inline-box-input:focus,
.partial-construction-container .inline-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.full-width-input { width: 100%; }
.tiny-box         { width: 40px; text-align: center; }
.small-box        { width: 100px; }
.medium-box       { width: 150px; }
.long-box         { width: 250px; }

/* ── Body paragraph ── */
.form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; position: relative; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; height: 40px; }
.signature-block .line-input { width: 100%; margin: 0 0 5px 0; }
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
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
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
.phcc-toast {
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
  animation: phcc-toast-in 0.25s ease;
  max-width: 360px;
}
.phcc-toast--success { background: #1a7f3c; color: #fff; }
.phcc-toast--error   { background: #c0392b; color: #fff; }
@keyframes phcc-toast-in {
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
.copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .partial-construction-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .phcc-toast    { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .partial-construction-container,
  .partial-construction-container * { visibility: visible; }
  .partial-construction-container {
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
  .phcc-toast,
  .top-bar-title { display: none !important; }
  .inline-box-input,
  .line-input,
  .dotted-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const INITIAL_FORM = (user) => ({
  letter_no:           "२०८२/८३",
  chalani_no:          "",
  date_nep:            new Date().toISOString().slice(0, 10),
  municipality_text:   MUNICIPALITY.name,
  ward_no:             user?.ward || "",
  resident_name:       "",
  previous_place_text: "",
  previous_place_type: "",
  previous_ward_no:    "",
  plot_number:         "",
  area:                "",
  floors_approved:     "",
  completion_date:     "२०८२-०८-०६",
  completion_type:     "आंशिक",
  signer_name:         "",
  signer_designation:  "",
  // ApplicantDetailsNp
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
  notes:               "",
});

const validate = (form) => {
  if (!form.resident_name.trim())  return "निवासीको नाम आवश्यक छ।";
  if (!form.plot_number.trim())    return "कित्ता नं. आवश्यक छ।";
  if (!form.signer_name.trim())    return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signer_designation)    return "पद छनौट गर्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function PartialHouseConstructionCompletedCertificate() {
  const { user } = useAuth();

  const [form, setForm]       = useState(() => INITIAL_FORM(user));
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

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
        setForm(INITIAL_FORM(user));
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "सेभ गर्न असफल भयो।";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="partial-construction-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`phcc-toast phcc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          आंशिक / पूर्ण घर निर्माण सम्पन्न प्रमाणपत्र ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; आंशिक / पूर्ण घर निर्माण सम्पन्न प्रमाणपत्र
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
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="dotted-input small-input" />
            </p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Body paragraph — municipality_text and ward_no now editable */}
        <div className="form-body">
          <p>
            प्रस्तुत विषयमा{" "}
            <input name="municipality_text" value={form.municipality_text} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            वडा नं{" "}
            <input name="ward_no"           value={form.ward_no}           onChange={handleChange} className="inline-box-input tiny-box" />{" "}
            निवासी{" "}
            <input name="resident_name"     value={form.resident_name}     onChange={handleChange} className="inline-box-input long-box"   placeholder="निवासीको नाम *" required />{" "}
            ले यस कार्यालयमा दिनुभएको निवेदन अनुसार निजको नाममा रहेको साविक{" "}
            <input name="previous_place_text" value={form.previous_place_text} onChange={handleChange} className="inline-box-input medium-box" placeholder="साविक ठाउँ" />{" "}
            <select name="previous_place_type" value={form.previous_place_type} onChange={handleChange} className="inline-select">
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>{" "}
            वडा नं{" "}
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="inline-box-input tiny-box"  required />{" "}
            कि.नं.{" "}
            <input name="plot_number"      value={form.plot_number}      onChange={handleChange} className="inline-box-input small-box" placeholder="कित्ता नं *" required />{" "}
            क्षे.फ.{" "}
            <input name="area"             value={form.area}             onChange={handleChange} className="inline-box-input small-box" placeholder="क्षेत्रफल *" required />{" "}
            जग्गामा घर निर्माणका लागि तहाँ कार्यालयबाट नक्शा स्वीकृत गराई{" "}
            <input name="floors_approved"  value={form.floors_approved}  onChange={handleChange} className="inline-box-input small-box" placeholder="तला *" required />{" "}
            तला घर मिति{" "}
            <input name="completion_date"  value={form.completion_date}  onChange={handleChange} className="inline-box-input small-box" required />{" "}
            मा निर्माण कार्य सम्पन्न भएकोले{" "}
            <select name="completion_type" value={form.completion_type} onChange={handleChange} className="inline-select bold-text">
              <option>आंशिक</option>
              <option>पूर्ण</option>
            </select>{" "}
            घर निर्माण सम्पन्न प्रमाणपत्र उपलब्ध गराई दिनु हुन सिफारिस साथ अनुरोध छ।
          </p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="line-input full-width-input"
              placeholder="हस्ताक्षरकर्ताको नाम *"
              required
            />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
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
}