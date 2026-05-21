// src/pages/social-family/ClubRegistration.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "club-registration";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.crp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ── Top bar ── */
.crp-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.crp-top-left { font-weight: 600; }
.crp-top-right { opacity: 0.9; }

/* ── Paper ── */
.crp-paper {
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
.crp-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.crp-logo img  { width: 90px; height: 90px; }
.crp-head-text { flex: 1; text-align: center; }
.crp-head-main { font-size: 20px; font-weight: 600; }
.crp-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.crp-head-sub  { margin-top: 4px; font-size: 14px; }
.crp-head-meta { font-size: 13px; text-align: right; }
.crp-meta-line { margin-bottom: 4px; }

/* ── Shared inputs ── */
.crp-page input[type="text"],
.crp-page input[type="date"],
.crp-page select {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  padding: 4px 6px;
  background: #fff;
}
.crp-page input[type="text"]:focus,
.crp-page input[type="date"]:focus,
.crp-page select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.crp-small-input  { width: 120px; }
.crp-tiny-input   { width: 60px; }
.crp-small-inline { width: 110px; }
.crp-medium-input { width: 200px; }
.crp-long-input   { width: 260px; margin: 0 4px; }
.crp-sign-name    { width: 200px; }

/* ── Letter ref row ── */
.crp-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; flex-wrap: wrap; }
.crp-ref-block { display: flex; align-items: center; gap: 6px; }
.crp-ref-block input { width: 180px; }

/* ── To block ── */
.crp-to-block    { margin-top: 22px; font-size: 14px; }
.crp-to-second   { margin-top: 4px; display: block; }

/* ── Subject ── */
.crp-subject-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.crp-sub-label    { font-weight: 600; margin-right: 6px; }
.crp-subject-text { text-decoration: underline; }

/* ── Body ── */
.crp-body { margin-top: 16px; font-size: 14px; line-height: 2.2; }
.crp-bold { font-weight: 600; }

/* ── Blank area ── */
.crp-blank-area { margin-top: 20px; border: 1px solid #e0e0e0; min-height: 260px; }

/* ── Signature ── */
.crp-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.crp-post-select { padding: 4px 6px; }

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
.crp-submit-row { text-align: center; margin-top: 30px; }
.crp-submit-btn {
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
.crp-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.crp-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Toast ── */
.crp-toast {
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
  animation: crp-toast-in 0.25s ease;
  max-width: 360px;
}
.crp-toast--success { background: #1a7f3c; color: #fff; }
.crp-toast--error   { background: #c0392b; color: #fff; }
@keyframes crp-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.crp-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  padding: 10px 24px 20px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .crp-paper    { margin: 0 8px 20px; padding: 20px 16px; }
  .crp-ref-row  { flex-direction: column; gap: 12px; }
  .crp-topbar   { flex-direction: column; gap: 4px; }
  .crp-toast    { right: 12px; left: 12px; max-width: none; }
  .crp-long-input,
  .crp-medium-input { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .crp-paper,
  .crp-paper * { visibility: visible; }
  .crp-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    margin: 0;
    padding: 10mm 14mm;
    box-shadow: none;
    background: white;
  }
  .crp-topbar,
  .crp-submit-row,
  .crp-toast,
  .crp-footer { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = (user) => ({
  date:              new Date().toISOString().slice(0, 10),
  patraSankhya:     "",
  chalanNo:         "",
  toName:           "",
  toSecondLine:     MUNICIPALITY.officeLine || "",
  district:         MUNICIPALITY.city || "",
  municipality:     MUNICIPALITY.name,
  wardNo:           user?.ward || MUNICIPALITY.wardNumber || "",
  residentName:     "",
  clubName:         "",
  clubAddress:      "",
  signerName:       "",
  signerDesignation:"",
  applicantName:    "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone:   "",
});

const validate = (f) => {
  if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ।";
  if (!f.clubName?.trim())      return "क्लबको नाम आवश्यक छ।";
  if (!f.signerName?.trim())    return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function ClubRegistration() {
  const { user } = useAuth();

  const [form, setForm]         = useState(() => makeInitialForm(user));
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]       = useState(null); // { type, text }

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
      // Normalise empty strings to null for backend consistency
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

      <div className="crp-page">

        {/* Toast */}
        {toast && (
          <div className={`crp-toast crp-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="crp-topbar">
          <div className="crp-top-left">क्लब दर्ता सिफारिस ।</div>
          <div className="crp-top-right">अवलोकन पृष्ठ / क्लब दर्ता सिफारिस</div>
        </header>

        <form className="crp-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="crp-letterhead">
            <div className="crp-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Emblem" />
            </div>
            <div className="crp-head-text">
              <div className="crp-head-main">{MUNICIPALITY.name}</div>
              <div className="crp-head-ward">{wardLabel}</div>
              <div className="crp-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="crp-head-meta">
              <div className="crp-meta-line">
                मिति :{" "}
                <input type="date" name="date" value={form.date} onChange={handleChange} className="crp-small-input" />
              </div>
              <div className="crp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* Ref row */}
          <div className="crp-ref-row">
            <div className="crp-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="patraSankhya" value={form.patraSankhya} onChange={handleChange} />
            </div>
            <div className="crp-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalanNo" value={form.chalanNo} onChange={handleChange} />
            </div>
          </div>

          {/* Addressee */}
          <div className="crp-to-block">
            <span>श्री</span>
            <input type="text" name="toName" className="crp-long-input" value={form.toName} onChange={handleChange} placeholder="प्राप्तकर्ताको नाम" />
            <span>ज्यु,</span>
            <br />
            <input type="text" name="toSecondLine" className="crp-long-input crp-to-second" value={form.toSecondLine} onChange={handleChange} />
          </div>

          {/* Subject */}
          <div className="crp-subject-row">
            <span className="crp-sub-label">विषयः</span>
            <span className="crp-subject-text">सिफारिस गरिएको बारे ।</span>
          </div>

          {/* Body */}
          <p className="crp-body">
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <input type="text" name="district" className="crp-small-inline" value={form.district} onChange={handleChange} />{" "}
            - <span className="crp-bold">{MUNICIPALITY.name}</span> वडा नं.{" "}
            <input type="text" name="wardNo" className="crp-tiny-input" value={form.wardNo} onChange={handleChange} />{" "}
            मा स्थायी बसोबास रहने{" "}
            <input type="text" name="residentName" className="crp-medium-input" placeholder="व्यक्तिको नाम" value={form.residentName} onChange={handleChange} />{" "}
            ले{" "}
            <input type="text" name="clubName" className="crp-medium-input" placeholder="क्लबको नाम *" value={form.clubName} onChange={handleChange} required />{" "}
            नामक क्लब दर्ता सिफारिस गरी पाउँ भनी यस वडा कार्यालयमा निवेदन
            दिएको हुँदा उक्त क्लब{" "}
            <input type="text" name="clubAddress" className="crp-medium-input" placeholder="ठेगाना / स्थान" value={form.clubAddress} onChange={handleChange} />{" "}
            मा दर्ता गर्न सिफारिस साथ अनुरोध गरिएको छ ।
          </p>

          {/* Blank area */}
          <div className="crp-blank-area" />

          {/* Signature */}
          <div className="crp-sign-top">
            <input
              type="text"
              name="signerName"
              className="crp-sign-name"
              placeholder="नाम, थर *"
              value={form.signerName}
              onChange={handleChange}
              required
            />
            <select name="signerDesignation" className="crp-post-select" value={form.signerDesignation} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
            </select>
          </div>

          {/* Applicant details */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* Submit */}
          <div className="crp-submit-row">
            <button className="crp-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="crp-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}