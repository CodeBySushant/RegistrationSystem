// src/pages/business/BusinessExtensionPannumber.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "business-extension-pan";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.bep-container {
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

/* ── Top bar ── */
.bep-topbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.bep-topbar-right { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Letterhead ── */
.bep-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}
.bep-logo img  { width: 80px; height: 80px; }
.bep-head-text { flex: 1; text-align: center; }
.bep-head-main { color: #e74c3c; font-size: 2.2rem; font-weight: bold; line-height: 1.2; margin: 0; }
.bep-head-ward { color: #e74c3c; font-size: 2.5rem; font-weight: bold; margin: 5px 0; }
.bep-head-sub  { color: #e74c3c; font-size: 1rem; margin: 0; }
.bep-head-meta { text-align: right; font-size: 1rem; }
.bep-meta-line { margin-top: 4px; font-size: 0.9rem; color: #555; }
.bep-small-input {
  width: 120px;
  padding: 2px 5px;
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
}
.bep-small-input:focus { border-color: #2563eb; }

/* ── Shared inputs ── */
.bep-container input[type="text"],
.bep-container select,
.bep-container textarea {
  font-family: inherit;
  font-size: 1rem;
}
.bep-ref-block input,
.bep-long-input,
.bep-sign-name,
.bep-post-select {
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  padding: 4px 6px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
}
.bep-container input:focus,
.bep-container select:focus,
.bep-container textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.bep-tiny-input   { width: 60px; text-align: center; border: 1px solid #ccc; background: #fff; border-radius: 3px; padding: 4px 6px; font-family: inherit; font-size: 1rem; outline: none; }
.bep-small-inline { width: 110px; border: 1px solid #ccc; background: #fff; border-radius: 3px; padding: 4px 6px; font-family: inherit; font-size: 1rem; outline: none; }
.bep-medium-input { width: 180px; border: 1px solid #ccc; background: #fff; border-radius: 3px; padding: 4px 6px; font-family: inherit; font-size: 1rem; outline: none; }

/* ── Ref row ── */
.bep-ref-row   { display: flex; gap: 40px; margin-top: 20px; font-size: 1rem; flex-wrap: wrap; }
.bep-ref-block { display: flex; align-items: center; gap: 6px; }
.bep-ref-block input { width: 160px; }

/* ── To block ── */
.bep-to-block  { margin-top: 22px; font-size: 1.05rem; line-height: 2; }
.bep-long-input { width: 260px; margin-left: 6px; }
.bep-to-second  { display: block; margin-top: 6px; margin-left: 6px; }

/* ── Subject ── */
.bep-subject-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  font-size: 1.1rem;
  font-weight: bold;
}
.bep-sub-label    { margin-right: 6px; }
.bep-subject-text { text-decoration: underline; }

/* ── Body ── */
.bep-body {
  margin-top: 20px;
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
}
.bep-bold { font-weight: bold; }

/* ── Section / textarea ── */
.bep-section   { margin-top: 20px; }
.bep-subtitle  { font-size: 1.05rem; font-weight: bold; margin-bottom: 8px; }
.bep-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 80px;
  padding: 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  outline: none;
}

/* ── Signature ── */
.bep-sign-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 10px;
}
.bep-sign-name   { width: 200px; padding: 6px 8px; }
.bep-post-select { padding: 6px 8px; }

/* ── Applicant details box ── */
.applicant-details-box {
  border: 2px solid #999;
  padding: 20px;
  background-color: transparent;
  margin-top: 20px;
  border-radius: 4px;
}
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.details-grid  { display: flex; flex-direction: column; gap: 18px; }
.detail-group  { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.bep-toast {
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
  animation: bep-toast-in 0.25s ease;
  max-width: 360px;
}
.bep-toast--success { background: #1a7f3c; color: #fff; }
.bep-toast--error   { background: #c0392b; color: #fff; }
@keyframes bep-toast-in {
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
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .bep-container { padding: 20px 14px; }
  .bep-ref-row   { flex-direction: column; gap: 12px; }
  .bep-topbar    { flex-direction: column; gap: 4px; }
  .bep-toast     { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .bep-container,
  .bep-container * { visibility: visible; }
  .bep-container {
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
  .bep-toast,
  .bep-topbar { display: none !important; }
  input, select, textarea { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const toNepaliDigits = (str) =>
  String(str).replace(/[0-9]/g, (d) => "०१२३४५६७८९"[d]);

const makeInitialForm = (user) => ({
  date:                new Date().toISOString().slice(0, 10),
  refLetterNo:         "",
  chalaniNo:           "",
  toLine1:             MUNICIPALITY.officeLine || "",
  toLine2:             MUNICIPALITY.name,
  wardNo:              user?.ward || "",
  prevWardNo:          "",
  applicantNameTop:    "",
  panNo:               "",
  addedPanNo:          "",
  addedBusiness:       "",
  details:             "",
  signerName:          "",
  signerPost:          "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
});

const validate = (form) => {
  if (!form.applicantName?.trim())        return "निवेदकको नाम आवश्यक छ।";
  if (!form.applicantCitizenship?.trim()) return "नागरिकता नं. आवश्यक छ।";
  if (!form.panNo && !form.addedPanNo)    return "कम्तिमा एक पान नं. प्रविष्ट गर्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function BusinessExtensionPannumber() {
  const { user } = useAuth();

  const [form, setForm]       = useState(() => makeInitialForm(user));
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const onChange = (e) => {
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
    if (err) { showToast("error", "कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axiosInstance.post(API_URL, payload);
      showToast("success", `सफलतापूर्वक सेभ भयो। ID: ${res.data?.id ?? ""}`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || err.message || "Submission failed";
      showToast("error", "त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="bep-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`bep-toast bep-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="bep-topbar">
          व्यवसाय विस्तार / पान नं. सिफारिस ।
          <span className="bep-topbar-right">व्यवसाय &gt; पान नं. सिफारिस</span>
        </div>

        {/* Letterhead */}
        <div className="bep-letterhead">
          <div className="bep-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="bep-head-text">
            <div className="bep-head-main">{MUNICIPALITY.name}</div>
            <div className="bep-head-ward">{wardLabel}</div>
            <div className="bep-head-sub">
              {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="bep-head-meta">
            <div>
              मिति :{" "}
              {/* date is now editable — was readOnly in original */}
              <input
                name="date"
                className="bep-small-input"
                value={form.date}
                onChange={onChange}
                placeholder="२०८२-०८-०६"
              />
            </div>
            <div className="bep-meta-line">ने.सं.: ११४६ भद्र, २ शनिवार</div>
          </div>
        </div>

        {/* Ref row */}
        <div className="bep-ref-row">
          <div className="bep-ref-block">
            <label>पत्र संख्या :</label>
            <input name="refLetterNo" value={form.refLetterNo} onChange={onChange} />
          </div>
          <div className="bep-ref-block">
            <label>चलानी नं. :</label>
            <input name="chalaniNo" value={form.chalaniNo} onChange={onChange} />
          </div>
        </div>

        {/* To block */}
        <div className="bep-to-block">
          <span>श्री</span>
          <input name="toLine1" value={form.toLine1} onChange={onChange} className="bep-long-input" />
          <br />
          <input name="toLine2" value={form.toLine2} onChange={onChange} className="bep-long-input bep-to-second" />
        </div>

        {/* Subject */}
        <div className="bep-subject-row">
          <span className="bep-sub-label">विषयः</span>
          <span className="bep-subject-text">सिफारिस गरिएको बारे ।</span>
        </div>

        {/* Body */}
        <p className="bep-body">
          उपर्युक्त बिषयमा <span className="bep-bold">{MUNICIPALITY.name}</span>{" "}
          वडा नं.{" "}
          <input name="wardNo" value={form.wardNo} onChange={onChange} className="bep-tiny-input" />{" "}
          (साबिक{" "}
          <input name="prevWardNo" value={form.prevWardNo} onChange={onChange} className="bep-small-inline" />{" "}
          वडा नं.) मा बस्ने श्री{" "}
          <input name="applicantNameTop" value={form.applicantNameTop} onChange={onChange} className="bep-medium-input" />{" "}
          ले दिइएको निवेदन अनुसार{" "}
          <input name="panNo" value={form.panNo} onChange={onChange} className="bep-small-inline" />{" "}
          पान नं.{" "}
          <input name="addedPanNo" value={form.addedPanNo} onChange={onChange} className="bep-small-inline" />{" "}
          मा कारोबार थप गरी{" "}
          <input name="addedBusiness" value={form.addedBusiness} onChange={onChange} className="bep-medium-input" />{" "}
          सहितको व्यवसाय संचालन गर्दै आइरहेको अवस्था र हाल उक्त पान नं मा
          कारोबार थप गरी देहाय राखिएको विवरणको सत्यताको आधारमा कारोबार थप स्थायी
          लेखा नं. सिफारिस गरिएको छ।
        </p>

        {/* Bodartha section */}
        <section className="bep-section">
          <h3 className="bep-subtitle">बोधार्थ :</h3>
          <textarea
            name="details"
            rows={4}
            className="bep-textarea"
            placeholder="यहाँ कारोबार थप सम्बन्धी विवरण लेख्नुहोस्…"
            value={form.details}
            onChange={onChange}
          />
        </section>

        {/* Signature */}
        <div className="bep-sign-top">
          <input
            name="signerName"
            value={form.signerName}
            onChange={onChange}
            className="bep-sign-name"
            placeholder="नाम, थर"
          />
          <select name="signerPost" value={form.signerPost} onChange={onChange} className="bep-post-select">
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={form} handleChange={onChange} />

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
}