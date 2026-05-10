// src/pages/others/DifferentEnglishSpellingCertification.jsx
import React, { useState } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axios from "../../utils/axiosInstance";

const FORM_KEY = "different-english-spelling-certification";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.spelling-cert-container {
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
.center-text    { text-align: center; }

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

/* ── Meta ── */
.meta-data-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1rem; }
.meta-left p,
.meta-right p  { margin: 5px 0; }

/* ── Toast ── */
.sc-toast {
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
  animation: sc-toast-in 0.25s ease;
  max-width: 360px;
}
.sc-toast--success { background: #1a7f3c; color: #fff; }
.sc-toast--error   { background: #c0392b; color: #fff; }
@keyframes sc-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Shared inputs ── */
.spelling-cert-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.spelling-cert-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.spelling-cert-container .inline-box-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 4px;
  font-size: 1rem;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-family: inherit;
}
.spelling-cert-container .dotted-input:focus,
.spelling-cert-container .line-input:focus,
.spelling-cert-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.medium-input     { width: 200px; }
.long-input       { width: 300px; }
.full-width-input { width: 100%; }
.tiny-box         { width: 44px; text-align: center; }
.small-box        { width: 100px; }
.medium-box       { width: 180px; }

/* ── Inline select ── */
.inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 4px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.inline-select:focus { outline: none; border-color: #2563eb; }

/* ── Required-star wrapper ── */
.inline-input-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.input-required-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 13px;
  line-height: 1;
  z-index: 1;
}
.inline-input-wrapper .inline-box-input,
.inline-input-wrapper .line-input,
.inline-input-wrapper input { padding-left: 16px; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 24px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 28px;
}

/* ── Table ── */
.table-section    { margin: 16px 0 36px; }
.table-title      { margin-bottom: 6px; font-size: 1rem; }
.table-responsive { overflow-x: auto; }
.details-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255,255,255,0.6);
}
.details-table th {
  background-color: #e0e0e0;
  border: 1px solid #555;
  padding: 8px;
  text-align: center;
  font-size: 0.88rem;
  font-weight: bold;
  color: #333;
  text-decoration: underline;
}
.details-table td { border: 1px solid #555; padding: 4px 6px; vertical-align: middle; }
.table-input {
  width: 95%;
  border: none;
  background: transparent;
  outline: none;
  padding: 4px;
  font-size: 0.95rem;
  color: #c0392b;
  font-family: inherit;
}
.add-row-btn {
  margin-top: 8px;
  padding: 5px 14px;
  font-size: 0.88rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  cursor: pointer;
  font-family: inherit;
}
.add-row-btn:hover { background: #e8e8e8; }
.rm-row-btn {
  border: none;
  background: none;
  color: #c0392b;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 4px;
  line-height: 1;
}

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 24px; }
.signature-block   { width: 230px; text-align: center; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 8px; height: 44px; }
.signature-block .line-input { margin-bottom: 6px; width: 100%; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
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
  font-size: 1.05rem;
  margin: 0 0 14px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.detail-group { display: flex; flex-direction: column; gap: 4px; }
.detail-group label { font-size: 0.88rem; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px 10px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
}
.detail-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 2px; }

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 36px; }
.save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 28px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 28px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .spelling-cert-container { padding: 20px 14px; }
  .meta-data-row           { flex-direction: column; gap: 8px; }
  .top-bar-title           { flex-direction: column; gap: 4px; }
  .details-grid            { grid-template-columns: 1fr; }
  .sc-toast                { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .spelling-cert-container,
  .spelling-cert-container * { visibility: visible; }
  .spelling-cert-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white;
  }
  .form-footer,
  .add-row-btn,
  .rm-row-btn,
  .sc-toast,
  .top-bar-title { display: none !important; }
  .inline-box-input,
  .line-input,
  .dotted-input,
  .table-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyDoc = () => ({
  id:       Date.now() + Math.random(),
  doc_name: "",
  diff_name:"",
});

const INITIAL_FORM = {
  reference_no:            "",
  municipality:            MUNICIPALITY.name,
  previous_unit_type:      "",
  previous_ward:           "",
  salutation:              "श्री",
  applicant_name:          "",
  english_spelling_basis:  "",
  docs:                    [emptyDoc()],
  recommender_name:        "",
  recommender_designation: "",
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
};

const validate = (form) => {
  if (!form.applicant_name.trim())        return "कृपया निवेदकको नाम (माथि) प्रविष्ट गर्नुहोस्।";
  if (!form.english_spelling_basis.trim())return "अंग्रेजी हिज्जेको आधार प्रविष्ट गर्नुहोस्।";
  if (!form.recommender_name.trim())      return "सिफारिसकर्ताको नाम प्रविष्ट गर्नुहोस्।";
  if (!form.recommender_designation)      return "सिफारिसकर्ताको पद छनौट गर्नुहोस्।";
  for (const d of form.docs) {
    if (!d.doc_name.trim() || !d.diff_name.trim())
      return "कागजात र फरक नाम थर पूरा गर्नुहोस्।";
  }
  if (!form.applicantName.trim())         return "निवेदकको नाम (तल) प्रविष्ट गर्नुहोस्।";
  if (!form.applicantAddress.trim())      return "निवेदकको ठेगाना प्रविष्ट गर्नुहोस्।";
  if (!form.applicantCitizenship.trim())  return "नागरिकता नं. प्रविष्ट गर्नुहोस्।";
  if (!form.applicantPhone.trim())        return "फोन नं. प्रविष्ट गर्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const DifferentEnglishSpellingCertification = () => {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  /* Field updaters */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const updateDoc = (idx, key) => (e) =>
    setForm((s) => ({
      ...s,
      docs: s.docs.map((d, i) => (i === idx ? { ...d, [key]: e.target.value } : d)),
    }));

  const addDocRow = () =>
    setForm((s) => ({ ...s, docs: [...s.docs, emptyDoc()] }));

  const removeDocRow = (idx) =>
    setForm((s) => ({ ...s, docs: s.docs.filter((_, i) => i !== idx) }));

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      showToast("success", `सेभ भयो (id: ${res.data?.id ?? "unknown"})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
      }, 300);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "सेभ गर्न असफल भयो।";
      showToast("error", msg);
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="spelling-cert-container" onSubmit={handleSubmit} noValidate>

        {/* Toast */}
        {toast && (
          <div className={`sc-toast sc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          फरक फरक अंग्रेजी हिज्जे प्रमाणित ।
          <span className="top-right-bread">अन्य &gt; फरक फरक अंग्रेजी हिज्जे प्रमाणित</span>
        </div>

        {/* Meta */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                type="text"
                className="dotted-input small-input"
                value={form.reference_no}
                onChange={update("reference_no")}
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
          <p>
            विषय:{" "}
            <span className="underline-text">फरक फरक अंग्रेजी हिज्जे प्रमाणित ।</span>
          </p>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            उपरोक्त विषयमा{" "}
            <input type="text" className="inline-box-input medium-box" value={form.municipality} onChange={update("municipality")} />{" "}
            वडा नं. <span className="bold-text">१</span> (साविक{" "}
            <input type="text" className="inline-box-input small-box" value={form.previous_unit_type} onChange={update("previous_unit_type")} placeholder="इकाई" />
            <select className="inline-select" value={form.previous_unit_type} onChange={update("previous_unit_type")}>
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            , वडा नं.{" "}
            <input type="text" className="inline-box-input tiny-box" value={form.previous_ward} onChange={update("previous_ward")} />{" "}
            ) निवासी{" "}
            <select className="inline-select" value={form.salutation} onChange={update("salutation")}>
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" className="inline-box-input medium-box" value={form.applicant_name} onChange={update("applicant_name")} placeholder="निवेदकको नाम" />
            </div>{" "}
            को नाम थर मा अंग्रेजी हिज्जे{" "}
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" className="inline-box-input medium-box" value={form.english_spelling_basis} onChange={update("english_spelling_basis")} placeholder="हिज्जेको आधार" />
            </div>{" "}
            को आधारमा तल उल्लेखित कागजातमा अंग्रेजी हिज्जे फरक भएकोले प्रमाणित गरिन्छ ।
          </p>
        </div>

        {/* Documents table */}
        <div className="table-section">
          <h4 className="table-title underline-text bold-text center-text">
            फरक अंग्रेजी हिज्जे र कागजात विवरण
          </h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "47%" }}>फरक भएको कागजात</th>
                  <th style={{ width: "47%" }}>फरक भएको नाम थर</th>
                  <th style={{ width: "6%" }}></th>
                </tr>
              </thead>
              <tbody>
                {form.docs.map((d, idx) => (
                  <tr key={d.id}>
                    <td><input className="table-input" value={d.doc_name}  onChange={updateDoc(idx, "doc_name")}  placeholder="कागजात" /></td>
                    <td><input className="table-input" value={d.diff_name} onChange={updateDoc(idx, "diff_name")} placeholder="फरक नाम थर" /></td>
                    <td>
                      {idx !== 0 && (
                        <button type="button" className="rm-row-btn" onClick={() => removeDocRow(idx)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={addDocRow}>
              + पंक्ति थप्नुहोस्
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <div className="inline-input-wrapper" style={{ display: "block", marginBottom: 6 }}>
              <span className="input-required-star">*</span>
              <input
                type="text"
                className="line-input full-width-input"
                value={form.recommender_name}
                onChange={update("recommender_name")}
                placeholder="सिफारिसकर्ताको नाम"
              />
            </div>
            <select
              className="designation-select"
              value={form.recommender_designation}
              onChange={update("recommender_designation")}
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
            {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DifferentEnglishSpellingCertification;