// src/pages/business/BusinessClosed.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "business-closed";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
/* ===== MAIN CONTAINER ===== */
.bc-container {
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

/* ===== TOP BAR ===== */
.bc-topbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.bc-topbar-right { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ===== LETTERHEAD ===== */
.bc-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}
.bc-logo img   { width: 80px; height: 80px; }
.bc-head-text  { text-align: center; flex: 1; }
.bc-head-main  { color: #e74c3c; font-size: 2.2rem; font-weight: bold; line-height: 1.2; margin: 0; }
.bc-head-ward  { color: #e74c3c; font-size: 2.5rem; font-weight: bold; margin: 5px 0; }
.bc-head-sub   { color: #e74c3c; font-size: 1rem; margin: 0; }
.bc-head-meta  { text-align: right; font-size: 1rem; }
.bc-head-day   { margin-top: 4px; font-size: 0.9rem; color: #555; }
.bc-small-input {
  width: 120px;
  padding: 2px 5px;
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
}
.bc-small-input:focus { border-color: #2563eb; }

/* ===== REF ROW ===== */
.bc-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 1rem; flex-wrap: wrap; }
.bc-ref-block { display: flex; align-items: center; gap: 6px; }
.bc-ref-block input {
  width: 160px;
  padding: 4px 6px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
}
.bc-ref-block input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }

/* ===== SUBJECT ===== */
.bc-subject-row {
  display: flex;
  align-items: center;
  margin-top: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: center;
}
.bc-subject-label { margin-right: 6px; }
.bc-subject-text  { text-decoration: underline; }

/* ===== SALUTATION & BODY ===== */
.bc-salutation { margin-top: 22px; font-size: 1.05rem; }
.bc-inline-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
  width: 200px;
}
.bc-inline-input:focus { border-color: #2563eb; }
.bc-address-line {
  margin-top: 10px;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.bc-address-line select {
  padding: 4px 6px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
}
.bc-address-line select:focus { outline: none; border-color: #2563eb; }
.bc-ward-input {
  width: 60px;
  padding: 4px 6px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
}
.bc-ward-input:focus { border-color: #2563eb; }
.bc-body-text { margin-top: 18px; font-size: 1.05rem; }
.bc-body-text textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  resize: vertical;
}
.bc-body-text textarea:focus { border-color: #2563eb; }

/* ===== TABLE ===== */
.bc-table-wrapper { margin-top: 20px; }
.bc-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
.bc-table th,
.bc-table td { border: 1px solid #c2c2c2; padding: 6px 4px; text-align: left; }
.bc-table th { background-color: #f0f0f0; text-align: center; font-weight: bold; }
.bc-table td input {
  width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.95rem;
}
.bc-table td input:focus { background: #f0f6ff; }
.bc-table-actions { text-align: center; white-space: nowrap; width: 56px; }
.bc-row-btn {
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
.bc-row-btn:hover { opacity: 0.8; }
.bc-row-btn-add { background: #2563eb; color: #fff; }
.bc-row-btn-rm  { background: #c0392b; color: #fff; }
.bc-add-row-btn {
  margin-top: 8px;
  padding: 6px 14px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  border-radius: 3px;
  transition: background 0.15s;
}
.bc-add-row-btn:hover { background: #f5f5f5; }

/* ===== Applicant details box ===== */
.applicant-details-box {
  border: 2px solid #999;
  padding: 20px;
  background-color: #fff;
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
  font-size: 0.9rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.bc-toast {
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
  animation: bc-toast-in 0.25s ease;
  max-width: 360px;
}
.bc-toast--success { background: #1a7f3c; color: #fff; }
.bc-toast--error   { background: #c0392b; color: #fff; }
@keyframes bc-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== FOOTER ===== */
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

/* ===== RESPONSIVE ===== */
@media (max-width: 700px) {
  .bc-container { padding: 20px 14px; }
  .bc-ref-row   { flex-direction: column; gap: 12px; }
  .bc-topbar    { flex-direction: column; gap: 4px; }
  .bc-toast     { right: 12px; left: 12px; max-width: none; }
}

/* ===== PRINT ===== */
@media print {
  body * { visibility: hidden; }
  .bc-container,
  .bc-container * { visibility: visible; }
  .bc-container {
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
  .bc-toast,
  .bc-topbar,
  .bc-table-actions,
  .bc-add-row-btn { display: none !important; }
  input, select, textarea { border: none !important; background: transparent !important; }
  .bc-table th,
  .bc-table td { border: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const toNepaliDigits = (str) => {
  const map = { 0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

const emptyRow = () => ({
  id:      Date.now() + Math.random(),
  type:    "",
  name:    "",
  houseNo: "",
  tole:    "",
  wardNo:  "",
  remarks: "",
});

const makeInitialForm = (user) => ({
  date:                new Date().toISOString().slice(0, 10),
  refLetterNo:         "",
  chalaniNo:           "",
  municipality:        MUNICIPALITY.name,
  wardNo:              user?.ward || "",
  introText:           "",
  toOfficePerson:      "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
});

/* ─────────────────────────── Component ─────────────────────────── */
export default function BusinessClosed() {
  const { user } = useAuth();

  const [form, setForm]   = useState(() => makeInitialForm(user));
  const [rows, setRows]   = useState([emptyRow()]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onRowChange = (index, e) => {
    const { name, value } = e.target;
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [name]: value } : r)));
  };

  const addRow    = ()    => setRows((p) => [...p, emptyRow()]);
  const removeRow = (idx) => setRows((p) => p.length > 1 ? p.filter((_, i) => i !== idx) : p);

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      // Normalise empty strings → null; keep businesses as array
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );
      payload.businesses = rows.filter(
        (r) => r.type || r.name || r.houseNo || r.tole || r.wardNo || r.remarks
      );

      const res = await axiosInstance.post(API_URL, payload);
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
        setRows([emptyRow()]);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="bc-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`bc-toast bc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="bc-topbar">
          व्यवसाय बन्द ।
          <span className="bc-topbar-right">व्यवसाय &gt; व्यवसाय बन्द</span>
        </div>

        {/* Letterhead */}
        <div className="bc-letterhead">
          <div className="bc-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="bc-head-text">
            <div className="bc-head-main">{MUNICIPALITY.name}</div>
            <div className="bc-head-ward">{wardLabel}</div>
            <div className="bc-head-sub">
              {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="bc-head-meta">
            <div>
              मिति :{" "}
              <input
                name="date"
                className="bc-small-input"
                value={form.date}
                onChange={onChange}
                placeholder="२०८२-०८-०६"
              />
            </div>
            <div className="bc-head-day">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
          </div>
        </div>

        {/* Ref row */}
        <div className="bc-ref-row">
          <div className="bc-ref-block">
            <label>पत्र संख्या :</label>
            <input name="refLetterNo" value={form.refLetterNo} onChange={onChange} />
          </div>
          <div className="bc-ref-block">
            <label>चलानी नं. :</label>
            <input name="chalaniNo" value={form.chalaniNo} onChange={onChange} />
          </div>
        </div>

        {/* Subject */}
        <div className="bc-subject-row">
          <span className="bc-subject-label">विषयः</span>
          <span className="bc-subject-text">व्यवसाय बन्द बारे ।</span>
        </div>

        {/* Salutation */}
        <p className="bc-salutation">
          श्री{" "}
          <input
            name="toOfficePerson"
            value={form.toOfficePerson}
            onChange={onChange}
            placeholder="ज्युलाई नाम"
            className="bc-inline-input"
          />{" "}
          ज्यु,
        </p>

        {/* Address line */}
        <div className="bc-address-line">
          <span>उपर्युक्त सम्बन्धमा</span>
          <select name="municipality" value={form.municipality} onChange={onChange}>
            <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
          </select>
          <span>वडा नं.</span>
          <input name="wardNo" value={form.wardNo} onChange={onChange} className="bc-ward-input" />
        </div>

        {/* Intro textarea */}
        <div className="bc-body-text">
          <textarea
            name="introText"
            value={form.introText}
            onChange={onChange}
            rows="3"
            placeholder="व्यवसाय बन्द सम्बन्धी छोटो व्यहोरा / कारण (optional)"
          />
        </div>

        {/* Business table — now with row remove buttons */}
        <div className="bc-table-wrapper">
          <table className="bc-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>व्यवसायको प्रकार</th>
                <th>व्यवसायको नाम</th>
                <th>घर नं.</th>
                <th>टोलको नाम</th>
                <th>वडा नं.</th>
                <th>कैफियत</th>
                <th className="bc-table-actions"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id}>
                  <td style={{ textAlign: "center", width: 32 }}>{i + 1}</td>
                  <td><input name="type"    value={r.type}    onChange={(e) => onRowChange(i, e)} /></td>
                  <td><input name="name"    value={r.name}    onChange={(e) => onRowChange(i, e)} /></td>
                  <td><input name="houseNo" value={r.houseNo} onChange={(e) => onRowChange(i, e)} /></td>
                  <td><input name="tole"    value={r.tole}    onChange={(e) => onRowChange(i, e)} /></td>
                  <td><input name="wardNo"  value={r.wardNo}  onChange={(e) => onRowChange(i, e)} /></td>
                  <td><input name="remarks" value={r.remarks} onChange={(e) => onRowChange(i, e)} /></td>
                  <td className="bc-table-actions">
                    <button type="button" className="bc-row-btn bc-row-btn-add" onClick={addRow} title="थप्नुहोस्">+</button>
                    {rows.length > 1 && (
                      <button type="button" className="bc-row-btn bc-row-btn-rm" onClick={() => removeRow(i)} title="हटाउनुहोस्">−</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="bc-add-row-btn" onClick={addRow}>
            + पङ्क्ति थप्नुहोस्
          </button>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={form} handleChange={onChange} />

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