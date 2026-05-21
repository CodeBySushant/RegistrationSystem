// src/pages/social-family/OldNonProfitOrgRegCertificate.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "old-non-profit-org-certificate";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.onp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ── Top bar ── */
.onp-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.onp-top-left  { font-weight: 600; }
.onp-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.onp-paper {
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
.onp-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.onp-logo img  { width: 90px; height: 90px; }
.onp-head-text { flex: 1; text-align: center; }
.onp-head-main { font-size: 20px; font-weight: 600; }
.onp-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.onp-head-sub  { margin-top: 4px; font-size: 14px; }
.onp-head-meta { font-size: 13px; text-align: right; }
.onp-meta-line { margin-bottom: 4px; }

/* ── Shared inputs ── */
.onp-page input[type="text"],
.onp-page input[type="date"],
.onp-page select {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  padding: 4px 6px;
  background: #fff;
}
.onp-page input[type="text"]:focus,
.onp-page select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.onp-small-input  { width: 120px; }
.onp-medium-input { width: 180px; }
.onp-wide-input   { flex: 1; min-width: 220px; }
.onp-fy-select    { padding: 4px 6px; }
.onp-sign-name    { width: 200px; }

/* ── Subject + stamp block ── */
.onp-subject-block {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
}
.onp-subject-wrap { display: flex; align-items: center; font-size: 15px; }
.onp-sub-label    { font-weight: 600; margin-right: 6px; }
.onp-subject-text { text-decoration: underline; }
.onp-stamp-box {
  border: 1px solid #c1c1c1;
  width: 120px;
  height: 120px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* ── Sections / fields ── */
.onp-section { margin-top: 18px; font-size: 14px; }
.onp-field-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}
.onp-field-row label { min-width: 230px; }

/* ── Signature ── */
.onp-sign-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
}
.onp-post-select { padding: 4px 6px; }

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
.onp-submit-row { text-align: center; margin-top: 30px; }
.onp-submit-btn {
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
.onp-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.onp-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Toast ── */
.onp-toast {
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
  animation: onp-toast-in 0.25s ease;
  max-width: 360px;
}
.onp-toast--success { background: #1a7f3c; color: #fff; }
.onp-toast--error   { background: #c0392b; color: #fff; }
@keyframes onp-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.onp-footer { text-align: right; font-size: 0.8rem; color: #666; padding: 10px 24px 20px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .onp-paper        { margin: 0 8px 20px; padding: 20px 16px; }
  .onp-topbar       { flex-direction: column; gap: 4px; }
  .onp-toast        { right: 12px; left: 12px; max-width: none; }
  .onp-field-row    { flex-direction: column; align-items: flex-start; }
  .onp-wide-input   { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .onp-paper,
  .onp-paper * { visibility: visible; }
  .onp-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    margin: 0;
    padding: 10mm 14mm;
    box-shadow: none;
    background: white;
  }
  .onp-topbar,
  .onp-submit-row,
  .onp-toast,
  .onp-footer { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
  .onp-stamp-box { border: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = () => ({
  fiscalYear:         "2082/83",
  date:               new Date().toISOString().slice(0, 10),
  regNo:              "",
  regDate:            "",
  organizationName:   "",
  organizationAddress:"",
  subjectArea:        "",
  startDate:          "",
  email:              "",
  phone:              "",
  presidentName:      "",
  presidentAddress:   "",
  presidentEmail:     "",
  presidentPhone:     "",
  bankAccountInfo:    "",
  bankEmail:          "",
  bankPhone:          "",
  signerName:         "",
  signerDesignation:  "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
});

const validate = (f) => {
  if (!f.organizationName?.trim()) return "संस्थाको नाम आवश्यक छ।";
  if (!f.applicantName?.trim())    return "निवेदकको नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function OldNonProfitOrgRegCertificate() {
  const { user } = useAuth();

  const [form, setForm]           = useState(makeInitialForm);
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
        setForm(makeInitialForm());
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

      <div className="onp-page">

        {/* Toast */}
        {toast && (
          <div className={`onp-toast onp-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="onp-topbar">
          <div className="onp-top-left">गैर नाफामूलक संस्था दर्ता</div>
          <div className="onp-top-right">दर्ता विवरण / गैर नाफामूलक संस्था दर्ता</div>
        </header>

        <form className="onp-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="onp-letterhead">
            <div className="onp-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
            </div>
            <div className="onp-head-text">
              <div className="onp-head-main">{MUNICIPALITY.name}</div>
              <div className="onp-head-ward">{wardLabel}</div>
              <div className="onp-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="onp-head-meta">
              <div className="onp-meta-line">
                आ. व :
                <select name="fiscalYear" value={form.fiscalYear} onChange={handleChange} className="onp-fy-select">
                  <option>2082/83</option>
                  <option>2081/82</option>
                  <option>2080/81</option>
                </select>
              </div>
              <div className="onp-meta-line">
                मिति :{" "}
                <input type="text" name="date" className="onp-small-input" value={form.date} onChange={handleChange} placeholder="२०८२-०८-०६" />
              </div>
              <div className="onp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* Subject + stamp */}
          <div className="onp-subject-block">
            <div className="onp-subject-wrap">
              <span className="onp-sub-label">विषयः</span>
              <span className="onp-subject-text">गैर नाफामूलक संस्था दर्ता प्रमाण पत्र ।</span>
            </div>
            <div className="onp-stamp-box">
              <div>संस्थाको छाप वा</div>
              <div>फोटो</div>
            </div>
          </div>

          {/* Section 1: Organisation */}
          <section className="onp-section">
            <div className="onp-field-row">
              <label>दर्ता नं. :</label>
              <input type="text" name="regNo" className="onp-medium-input" value={form.regNo} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>दर्ता मिति :</label>
              <input type="text" name="regDate" className="onp-medium-input" value={form.regDate} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>१) संस्थाको नाम : <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="organizationName" className="onp-wide-input" value={form.organizationName} onChange={handleChange} required />
            </div>
            <div className="onp-field-row">
              <label>ठेगाना :</label>
              <input type="text" name="organizationAddress" className="onp-wide-input" value={form.organizationAddress} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>विषयगत क्षेत्र :</label>
              <input type="text" name="subjectArea" className="onp-medium-input" value={form.subjectArea} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>संस्थाको कारोबार शुरू भएको मिति :</label>
              <input type="text" name="startDate" className="onp-medium-input" value={form.startDate} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>ई–मेल :</label>
              <input type="text" name="email" className="onp-wide-input" value={form.email} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input type="text" name="phone" className="onp-medium-input" value={form.phone} onChange={handleChange} />
            </div>
          </section>

          {/* Section 2: President */}
          <section className="onp-section">
            <div className="onp-field-row">
              <label>२) सभापति / अध्यक्ष / मुख्य व्यक्तिको नाम, थर :</label>
              <input type="text" name="presidentName" className="onp-wide-input" value={form.presidentName} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>ठेगाना :</label>
              <input type="text" name="presidentAddress" className="onp-wide-input" value={form.presidentAddress} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>ई–मेल :</label>
              <input type="text" name="presidentEmail" className="onp-wide-input" value={form.presidentEmail} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input type="text" name="presidentPhone" className="onp-medium-input" value={form.presidentPhone} onChange={handleChange} />
            </div>
          </section>

          {/* Section 3: Bank */}
          <section className="onp-section">
            <div className="onp-field-row">
              <label>३) बैंकमा खाता भएका भए सम्बन्धीत नाम, थर, ठेगाना :</label>
              <input type="text" name="bankAccountInfo" className="onp-wide-input" value={form.bankAccountInfo} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>ई–मेल :</label>
              <input type="text" name="bankEmail" className="onp-wide-input" value={form.bankEmail} onChange={handleChange} />
            </div>
            <div className="onp-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input type="text" name="bankPhone" className="onp-medium-input" value={form.bankPhone} onChange={handleChange} />
            </div>
          </section>

          {/* Signature */}
          <div className="onp-sign-top">
            <input
              type="text"
              name="signerName"
              className="onp-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select name="signerDesignation" className="onp-post-select" value={form.signerDesignation} onChange={handleChange}>
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
          <div className="onp-submit-row">
            <button className="onp-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="onp-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}