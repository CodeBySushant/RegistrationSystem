// src/pages/social-family/CommitteeRegistration.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "committee-registration";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.cr-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ── Top bar ── */
.cr-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.cr-top-left  { font-weight: 600; }
.cr-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.cr-paper {
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
.cr-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.cr-logo img  { width: 90px; height: 90px; }
.cr-head-text { flex: 1; text-align: center; }
.cr-head-main { font-size: 20px; font-weight: 600; }
.cr-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.cr-head-sub  { margin-top: 4px; font-size: 14px; }
.cr-head-meta { font-size: 13px; text-align: right; }
.cr-meta-line { margin-bottom: 4px; }

/* ── Shared inputs ── */
.cr-page input[type="text"],
.cr-page input[type="date"],
.cr-page select {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  padding: 4px 6px;
  background: #fff;
}
.cr-page input[type="text"]:focus,
.cr-page input[type="date"]:focus,
.cr-page select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.cr-small-input  { width: 120px; }
.cr-tiny-input   { width: 60px; }
.cr-small-inline { width: 100px; }
.cr-medium-input { width: 190px; }
.cr-long-input   { width: 260px; margin: 0 4px; }
.cr-sign-name    { width: 200px; }
.cr-select       { min-width: 110px; }

/* ── Ref row ── */
.cr-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; flex-wrap: wrap; }
.cr-ref-block { display: flex; align-items: center; gap: 6px; }
.cr-ref-block input { width: 180px; }

/* ── To block ── */
.cr-to-block  { margin-top: 22px; font-size: 14px; }
.cr-to-second { margin-top: 4px; display: block; }

/* ── Subject ── */
.cr-subject-row {
  display: flex;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.cr-sub-label    { font-weight: 600; margin-right: 6px; }
.cr-subject-text { text-decoration: underline; }

/* ── Body ── */
.cr-body { margin-top: 16px; font-size: 14px; line-height: 2.2; }
.cr-bold { font-weight: 600; }

/* ── Blank area ── */
.cr-blank-area { margin-top: 20px; border: 1px solid #e0e0e0; min-height: 240px; }

/* ── Signature ── */
.cr-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.cr-post-select { padding: 4px 6px; }

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
.cr-submit-row { text-align: center; margin-top: 30px; }
.cr-submit-btn {
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
.cr-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.cr-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Toast ── */
.cr-toast {
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
  animation: cr-toast-in 0.25s ease;
  max-width: 360px;
}
.cr-toast--success { background: #1a7f3c; color: #fff; }
.cr-toast--error   { background: #c0392b; color: #fff; }
@keyframes cr-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.cr-footer { text-align: right; font-size: 0.8rem; color: #666; padding: 10px 24px 20px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .cr-paper   { margin: 0 8px 20px; padding: 20px 16px; }
  .cr-ref-row { flex-direction: column; gap: 12px; }
  .cr-topbar  { flex-direction: column; gap: 4px; }
  .cr-toast   { right: 12px; left: 12px; max-width: none; }
  .cr-long-input,
  .cr-medium-input { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .cr-paper,
  .cr-paper * { visibility: visible; }
  .cr-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    margin: 0;
    padding: 10mm 14mm;
    box-shadow: none;
    background: white;
  }
  .cr-topbar,
  .cr-submit-row,
  .cr-toast,
  .cr-footer { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = (user) => ({
  date:                  new Date().toISOString().slice(0, 10),
  patraSankhya:          "",
  chalanNo:              "",
  toName:                "",
  toPlace:               MUNICIPALITY.officeLine || "",
  district:              MUNICIPALITY.city || "",
  municipalityType:      "नगरपालिका",
  prevWardNoSecondary:   "",
  municipalityWardNo:    user?.ward || MUNICIPALITY.wardNumber || "",
  prevWardNo:            user?.ward || MUNICIPALITY.wardNumber || "",
  locationName:          "",
  signerName:            "",
  signerDesignation:     "",
  applicantName:         "",
  applicantAddress:      "",
  applicantCitizenship:  "",
  applicantPhone:        "",
});

const validate = (f) => {
  if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ।";
  if (!f.locationName?.trim())  return "समिति/ठेगाना आवश्यक छ।";
  if (!f.signerName?.trim())    return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function CommitteeRegistration() {
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

      <div className="cr-page">

        {/* Toast */}
        {toast && (
          <div className={`cr-toast cr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="cr-topbar">
          <div className="cr-top-left">समिति दर्ता सिफारिस</div>
          <div className="cr-top-right">अवलोकन पृष्ठ / समिति दर्ता सिफारिस</div>
        </header>

        <form className="cr-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="cr-letterhead">
            <div className="cr-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Emblem" />
            </div>
            <div className="cr-head-text">
              <div className="cr-head-main">{MUNICIPALITY.name}</div>
              <div className="cr-head-ward">{wardLabel}</div>
              <div className="cr-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="cr-head-meta">
              <div className="cr-meta-line">
                मिति :{" "}
                <input type="text" name="date" value={form.date} onChange={handleChange} className="cr-small-input" placeholder="२०८२-०८-०६" />
              </div>
              <div className="cr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* Ref row */}
          <div className="cr-ref-row">
            <div className="cr-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="patraSankhya" value={form.patraSankhya} onChange={handleChange} />
            </div>
            <div className="cr-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalanNo" value={form.chalanNo} onChange={handleChange} />
            </div>
          </div>

          {/* Addressee */}
          <div className="cr-to-block">
            <span>श्री</span>
            <input type="text" name="toName" className="cr-long-input" value={form.toName} onChange={handleChange} placeholder="प्राप्तकर्ताको नाम" />
            <span>जिल्ला प्रशासन कार्यालय,</span>
            <br />
            <input type="text" name="toPlace" className="cr-long-input cr-to-second" value={form.toPlace} onChange={handleChange} />
          </div>

          {/* Subject */}
          <div className="cr-subject-row">
            <span className="cr-sub-label">विषयः</span>
            <span className="cr-subject-text">सिफारिस गरिएको बारेमा ।</span>
          </div>

          {/* Body — municipalityWardNo bound to ONE input only */}
          <p className="cr-body">
            प्रस्तुत विषयमा{" "}
            <span className="cr-bold">यस {MUNICIPALITY.name}</span> वडा नं.{" "}
            <input type="text" name="municipalityWardNo" className="cr-tiny-input" value={form.municipalityWardNo} onChange={handleChange} />{" "}
            (साबिक{" "}
            <input type="text" name="prevWardNo" className="cr-small-inline" value={form.prevWardNo} onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input type="text" name="prevWardNoSecondary" className="cr-tiny-input" value={form.prevWardNoSecondary} onChange={handleChange} />
            ), जिल्ला{" "}
            <input type="text" name="district" className="cr-small-inline" value={form.district} onChange={handleChange} />{" "}
            स्थित{" "}
            <select name="municipalityType" className="cr-select" value={form.municipalityType} onChange={handleChange}>
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
            </select>{" "}
            स्थित{" "}
            <input type="text" name="locationName" className="cr-medium-input" placeholder="समिति / ठेगाना *" value={form.locationName} onChange={handleChange} required />{" "}
            नामक समिति दर्ता गर्नुपर्ने भएकोले सो को लागि "सिफारिस गरी पाउँ" भनी
            यस कार्यालयमा दर्ता निवेदन बमोजिम दर्ता सिफारिस गरिएको छ ।
          </p>

          {/* Blank area */}
          <div className="cr-blank-area" />

          {/* Signature */}
          <div className="cr-sign-top">
            <input
              type="text"
              name="signerName"
              className="cr-sign-name"
              placeholder="नाम, थर *"
              value={form.signerName}
              onChange={handleChange}
              required
            />
            <select name="signerDesignation" className="cr-post-select" value={form.signerDesignation} onChange={handleChange}>
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
          <div className="cr-submit-row">
            <button className="cr-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="cr-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}