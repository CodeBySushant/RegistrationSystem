// src/pages/social-family/OrganizationRegistered.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "organization-registered";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.orgreg-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ── Top bar ── */
.orgreg-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.orgreg-top-left  { font-weight: 600; }
.orgreg-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.orgreg-paper {
  margin: 0 24px 20px;
  padding: 28px 40px 40px;
  background-color: #fff;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
  box-sizing: border-box;
}

/* ── Letterhead ── */
.orgreg-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.orgreg-logo img  { width: 90px; height: 90px; }
.orgreg-head-text { flex: 1; text-align: center; }
.orgreg-head-main { font-size: 20px; font-weight: 600; }
.orgreg-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.orgreg-head-sub  { margin-top: 4px; font-size: 14px; }
.orgreg-head-meta { font-size: 13px; text-align: right; }
.orgreg-meta-line { margin-bottom: 4px; }

/* ── Shared inputs ── */
.orgreg-page input[type="text"],
.orgreg-page select {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  padding: 4px 6px;
  background: #fff;
}
.orgreg-page input[type="text"]:focus,
.orgreg-page select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.orgreg-small-input  { width: 120px; }
.orgreg-tiny-input   { width: 60px; }
.orgreg-small-inline { width: 100px; }
.orgreg-medium-input { width: 190px; }
.orgreg-long-input   { width: 260px; margin-top: 4px; }
.orgreg-sign-name    { width: 200px; }
.orgreg-select       { min-width: 110px; }

/* ── Ref row ── */
.orgreg-ref-row   { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; flex-wrap: wrap; }
.orgreg-ref-block { display: flex; align-items: center; gap: 6px; }
.orgreg-ref-block input { width: 180px; }

/* ── To block ── */
.orgreg-to-block  { margin-top: 22px; font-size: 14px; }
.orgreg-to-second { display: block; margin-top: 6px; }

/* ── Subject ── */
.orgreg-subject-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.orgreg-sub-label    { font-weight: 600; margin-right: 6px; }
.orgreg-subject-text { text-decoration: underline; }

/* ── Body ── */
.orgreg-body { margin-top: 16px; font-size: 14px; line-height: 2.2; }

/* ── Blank area ── */
.orgreg-blank-area { margin-top: 20px; border: 1px solid #e0e0e0; min-height: 260px; }

/* ── Signature ── */
.orgreg-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.orgreg-post-select { padding: 4px 6px; }

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

/* ── Submit row ── */
.orgreg-submit-row { text-align: center; margin-top: 30px; }
.orgreg-submit-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 28px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.orgreg-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.orgreg-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Toast ── */
.orgreg-toast {
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
  animation: orgreg-toast-in 0.25s ease;
  max-width: 360px;
}
.orgreg-toast--success { background: #1a7f3c; color: #fff; }
.orgreg-toast--error   { background: #c0392b; color: #fff; }
@keyframes orgreg-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.orgreg-footer { text-align: right; font-size: 0.8rem; color: #666; padding: 10px 24px 20px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .orgreg-paper   { margin: 0 8px 20px; padding: 20px 16px; }
  .orgreg-ref-row { flex-direction: column; gap: 12px; }
  .orgreg-topbar  { flex-direction: column; gap: 4px; }
  .orgreg-toast   { right: 12px; left: 12px; max-width: none; }
  .orgreg-long-input,
  .orgreg-medium-input { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .orgreg-paper,
  .orgreg-paper * { visibility: visible; }
  .orgreg-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    margin: 0;
    padding: 10mm 14mm;
    box-shadow: none;
    background: white;
  }
  .orgreg-topbar,
  .orgreg-submit-row,
  .orgreg-toast,
  .orgreg-footer { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = (user) => ({
  localityType:      "नगरपालिका",
  wardNo:            user?.ward || MUNICIPALITY.wardNumber || "",
  district:          MUNICIPALITY.city || "",
  toOffice:          MUNICIPALITY.officeLine || "",
  organizationName:  "",
  registrationDate:  "",
  regNo:             "",   // पत्र संख्या — was missing from original initialState
  chalanNo:          "",   // चलानी नं. — was named regNo but bound to separate field
  certNo:            "",   // was used in JSX but missing from original initialState
  extraInfo:         "",
  signerName:        "",
  signerDesignation: "",
  applicantName:     "",
  applicantAddress:  "",
  applicantCitizenship: "",
  applicantPhone:    "",
  date:              new Date().toISOString().slice(0, 10),
});

const validate = (f) => {
  if (!f.organizationName?.trim()) return "कृपया संस्था नाम भर्नुहोस्।";
  if (!f.applicantName?.trim())    return "कृपया निवेदकको नाम भर्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function OrganizationRegistered() {
  const { user } = useAuth();

  const [form, setForm]           = useState(() => makeInitialForm(user));
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]         = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axios.post(API_URL, payload);
      showToast("success", `रेकर्ड सेभ भयो। ID: ${res.data?.id ?? ""}`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
      }, 300);
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      showToast("error", "त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="orgreg-page">

        {/* Toast */}
        {toast && (
          <div className={`orgreg-toast orgreg-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="orgreg-topbar">
          <div className="orgreg-top-left">संस्था दर्ता गरिएको ।</div>
          <div className="orgreg-top-right">अवलोकन पृष्ठ / संस्था दर्ता गरिएको</div>
        </header>

        <form className="orgreg-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="orgreg-letterhead">
            <div className="orgreg-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
            </div>
            <div className="orgreg-head-text">
              <div className="orgreg-head-main">{MUNICIPALITY.name}</div>
              <div className="orgreg-head-ward">{wardLabel}</div>
              <div className="orgreg-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="orgreg-head-meta">
              <div className="orgreg-meta-line">
                मिति :{" "}
                <input type="text" name="date" className="orgreg-small-input" value={form.date} onChange={handleChange} placeholder="२०८२-०८-०६" />
              </div>
              <div className="orgreg-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* Ref row — regNo and chalanNo are now separate properly-named fields */}
          <div className="orgreg-ref-row">
            <div className="orgreg-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="regNo" value={form.regNo} onChange={handleChange} />
            </div>
            <div className="orgreg-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalanNo" value={form.chalanNo} onChange={handleChange} />
            </div>
          </div>

          {/* Addressee */}
          <div className="orgreg-to-block">
            <span>श्री अध्यक्ष ज्यु,</span>
            <br />
            <input type="text" name="toOffice" className="orgreg-long-input orgreg-to-second" value={form.toOffice} onChange={handleChange} />
          </div>

          {/* Subject */}
          <div className="orgreg-subject-row">
            <span className="orgreg-sub-label">विषयः</span>
            <span className="orgreg-subject-text">संस्था दर्ता गरिएको बारे ।</span>
          </div>

          {/* Body */}
          <p className="orgreg-body">
            प्रस्तुत विषयमा{" "}
            <select name="localityType" className="orgreg-select" value={form.localityType} onChange={handleChange}>
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
            </select>{" "}
            वडा नं.{" "}
            <input type="text" name="wardNo" className="orgreg-tiny-input" value={form.wardNo} onChange={handleChange} />{" "}
            जिल्ला{" "}
            <input type="text" name="district" className="orgreg-small-inline" value={form.district} onChange={handleChange} />{" "}
            मा रहेको{" "}
            <input type="text" name="organizationName" className="orgreg-medium-input" placeholder="संस्था नाम *" value={form.organizationName} onChange={handleChange} required />{" "}
            नामक संस्था दर्ता सम्बन्धि मिति{" "}
            <input type="text" name="registrationDate" className="orgreg-small-inline" value={form.registrationDate} onChange={handleChange} />{" "}
            मा प्राप्त निवेदन तथा आवश्यक कागजातका आधारमा{" "}
            <input type="text" name="certNo" className="orgreg-medium-input" placeholder="प्रमाण पत्र नं." value={form.certNo} onChange={handleChange} />{" "}
            नामक संस्था दर्ता गरी प्रमाण पत्र जारी गरिएको व्यहोरा जानकारी गराइएको छ ।
          </p>

          {/* Blank area */}
          <div className="orgreg-blank-area" />

          {/* Signature */}
          <div className="orgreg-sign-top">
            <input
              type="text"
              name="signerName"
              className="orgreg-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select name="signerDesignation" className="orgreg-post-select" value={form.signerDesignation} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          {/* Applicant details */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* Submit */}
          <div className="orgreg-submit-row">
            <button className="orgreg-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="orgreg-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}