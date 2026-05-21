// src/pages/social-family/OrganizationRegistrationPunishment.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "organization-registration-punishment";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.orp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ── Top bar ── */
.orp-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.orp-top-left  { font-weight: 600; }
.orp-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.orp-paper {
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
.orp-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.orp-logo img  { width: 90px; height: 90px; }
.orp-head-text { flex: 1; text-align: center; }
.orp-head-main { font-size: 20px; font-weight: 600; }
.orp-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.orp-head-sub  { margin-top: 4px; font-size: 14px; }
.orp-head-meta { font-size: 13px; text-align: right; }
.orp-meta-line { margin-bottom: 4px; }

/* ── Shared inputs ── */
.orp-page input[type="text"],
.orp-page select,
.orp-page textarea {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  padding: 4px 6px;
  background: #fff;
}
.orp-page input[type="text"]:focus,
.orp-page select:focus,
.orp-page textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.orp-small-input  { width: 120px; }
.orp-long-input   { width: 260px; margin: 0 4px; }
.orp-sign-name    { width: 200px; }
.orp-to-second    { display: block; margin-top: 4px; }

/* ── Ref row ── */
.orp-ref-row   { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; flex-wrap: wrap; }
.orp-ref-block { display: flex; align-items: center; gap: 6px; }
.orp-ref-block input { width: 180px; }

/* ── To block ── */
.orp-to-block { margin-top: 22px; font-size: 14px; }

/* ── Subject ── */
.orp-subject-row {
  display: flex;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.orp-sub-label    { font-weight: 600; margin-right: 6px; }
.orp-subject-text { text-decoration: underline; }

/* ── Intro textarea ── */
.orp-intro-section { margin-top: 16px; }
.orp-intro-textarea {
  width: 100%;
  min-height: 80px;
  resize: vertical;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.6;
}

/* ── Table ── */
.orp-table-wrapper { margin-top: 10px; border: 1px solid #cfcfcf; overflow-x: auto; }
.orp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.orp-table th,
.orp-table td { border: 1px solid #cfcfcf; padding: 4px 6px; text-align: center; }
.orp-table td input {
  width: 100%;
  border: none;
  outline: none;
  padding: 3px 4px;
  box-sizing: border-box;
  font-family: inherit;
  background: transparent;
}
.orp-table td input:focus { background: #f0f6ff; }
.orp-table-actions { width: 56px; white-space: nowrap; }
.orp-row-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  margin: 0 2px;
  transition: opacity 0.15s;
}
.orp-row-btn:hover { opacity: 0.8; }
.orp-row-btn-add { background: #2563eb; color: #fff; }
.orp-row-btn-rm  { background: #c0392b; color: #fff; }

/* ── Signature ── */
.orp-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.orp-post-select { padding: 4px 6px; }

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
.orp-submit-row { text-align: center; margin-top: 30px; }
.orp-submit-btn {
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
.orp-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.orp-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Toast ── */
.orp-toast {
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
  animation: orp-toast-in 0.25s ease;
  max-width: 360px;
}
.orp-toast--success { background: #1a7f3c; color: #fff; }
.orp-toast--error   { background: #c0392b; color: #fff; }
@keyframes orp-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.orp-footer { text-align: right; font-size: 0.8rem; color: #666; padding: 10px 24px 20px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .orp-paper   { margin: 0 8px 20px; padding: 20px 16px; }
  .orp-ref-row { flex-direction: column; gap: 12px; }
  .orp-topbar  { flex-direction: column; gap: 4px; }
  .orp-toast   { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .orp-paper,
  .orp-paper * { visibility: visible; }
  .orp-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    margin: 0;
    padding: 10mm 14mm;
    box-shadow: none;
    background: white;
  }
  .orp-topbar,
  .orp-submit-row,
  .orp-toast,
  .orp-footer,
  .orp-table-actions { display: none !important; }
  input, select, textarea { border: none !important; background: transparent !important; }
  .orp-table th,
  .orp-table td { border: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyRow = () => ({
  id:          Date.now() + Math.random(),
  name:        "",
  fatherName:  "",
  permAddress: "",
  tempAddress: "",
  area:        "",
  religion:    "",
});

const makeInitialForm = (user) => ({
  date:               new Date().toISOString().slice(0, 10),
  refLetterNo:        "",
  chalaniNo:          "",
  toOffice:           MUNICIPALITY.officeLine || "",
  toOffice2:          MUNICIPALITY.name,
  district:           MUNICIPALITY.city || "",
  municipalityWardNo: user?.ward || MUNICIPALITY.wardNumber || "",
  introText:          "",
  signerName:         "",
  signerDesignation:  "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
});

const validate = (form, rows) => {
  if (!form.applicantName?.trim())          return "निवेदकको नाम आवश्यक छ।";
  if (!rows.some((r) => r.name?.trim()))    return "कम्तिमा एक व्यक्तिको नाम हाल्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function OrganizationRegistrationPunishment() {
  const { user } = useAuth();

  const [form, setForm]           = useState(() => makeInitialForm(user));
  const [rows, setRows]           = useState([emptyRow()]);
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

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [name]: value } : r)));
  };

  const addRow    = ()    => setRows((r) => [...r, emptyRow()]);
  const removeRow = (idx) => setRows((r) => r.length > 1 ? r.filter((_, i) => i !== idx) : r);

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setToast(null);

    const err = validate(form, rows);
    if (err) { showToast("error", err); return; }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );
      payload.persons = rows; // send as array; axiosInstance serialises to JSON

      const res = await axios.post(API_URL, payload);
      showToast("success", `रेकर्ड सेभ भयो। ID: ${res.data?.id ?? ""}`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
        setRows([emptyRow()]);
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

      <div className="orp-page">

        {/* Toast */}
        {toast && (
          <div className={`orp-toast orp-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="orp-topbar">
          <div className="orp-top-left">सजाय पाएका नपाएको ।</div>
          <div className="orp-top-right">अवलोकन पृष्ठ / सजाय पाएका नपाएको सिफारिस</div>
        </header>

        <form className="orp-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="orp-letterhead">
            <div className="orp-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Emblem" />
            </div>
            <div className="orp-head-text">
              <div className="orp-head-main">{MUNICIPALITY.name}</div>
              <div className="orp-head-ward">{wardLabel}</div>
              <div className="orp-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="orp-head-meta">
              <div className="orp-meta-line">
                मिति :{" "}
                <input type="text" name="date" className="orp-small-input" value={form.date} onChange={handleChange} placeholder="२०८२-०८-०६" />
              </div>
            </div>
          </div>

          {/* Ref row */}
          <div className="orp-ref-row">
            <div className="orp-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
            </div>
            <div className="orp-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
            </div>
          </div>

          {/* Addressee */}
          <div className="orp-to-block">
            <span>श्री</span>
            <input type="text" name="toOffice" className="orp-long-input" value={form.toOffice} onChange={handleChange} placeholder="प्राप्तकर्ता" />
            <span>ज्यु,</span>
            <br />
            <input type="text" name="toOffice2" className="orp-long-input orp-to-second" value={form.toOffice2} onChange={handleChange} />
          </div>

          {/* Subject */}
          <div className="orp-subject-row">
            <span className="orp-sub-label">विषयः</span>
            <span className="orp-subject-text">सजाय पाएको नपाएकोबारे ।</span>
          </div>

          {/* Intro textarea — div wrapper, not <p> (textarea inside p is invalid HTML) */}
          <div className="orp-intro-section">
            <textarea
              name="introText"
              className="orp-intro-textarea"
              value={form.introText}
              onChange={handleChange}
              placeholder="मुख्य परिचय / उद्देश्य (यदि चाहियो)"
            />
          </div>

          {/* Persons table */}
          <div className="orp-table-wrapper">
            <table className="orp-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>व्यक्तिको नाम थर</th>
                  <th>बाबुको नाम थर</th>
                  <th>स्थायी ठेगाना</th>
                  <th>अस्थायी ठेगाना</th>
                  <th>क्षेत्रफल</th>
                  <th>धर्म</th>
                  <th className="orp-table-actions">क्रिया</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td><input type="text" name="name"        value={r.name}        onChange={(e) => handleRowChange(i, e)} placeholder="नाम थर" /></td>
                    <td><input type="text" name="fatherName"  value={r.fatherName}  onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="permAddress" value={r.permAddress} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="tempAddress" value={r.tempAddress} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="area"        value={r.area}        onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="religion"    value={r.religion}    onChange={(e) => handleRowChange(i, e)} /></td>
                    <td className="orp-table-actions">
                      {rows.length > 1 && (
                        <button type="button" className="orp-row-btn orp-row-btn-rm" onClick={() => removeRow(i)} title="हटाउनुहोस्">−</button>
                      )}
                      {i === rows.length - 1 && (
                        <button type="button" className="orp-row-btn orp-row-btn-add" onClick={addRow} title="थप्नुहोस्">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature */}
          <div className="orp-sign-top">
            <input
              type="text"
              name="signerName"
              className="orp-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select name="signerDesignation" className="orp-post-select" value={form.signerDesignation} onChange={handleChange}>
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
          <div className="orp-submit-row">
            <button className="orp-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="orp-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}