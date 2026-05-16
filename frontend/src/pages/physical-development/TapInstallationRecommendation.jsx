// src/pages/physical-development/TapInstallationRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const FORM_KEY = "tap-installation-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.tap-installation-container {
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
.meta-left     { display: flex; flex-direction: column; gap: 6px; }

/* ── Shared inputs ── */
.tap-installation-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.tap-installation-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
}
.tap-installation-container .inline-box-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  display: inline-block;
  vertical-align: middle;
}
.tap-installation-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.tap-installation-container .dotted-input:focus,
.tap-installation-container .line-input:focus,
.tap-installation-container .inline-box-input:focus,
.tap-installation-container .inline-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input  { width: 120px; }
.medium-input { width: 200px; }
.small-box    { width: 100px; }
.medium-box   { width: 180px; }
.long-box     { width: 250px; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; display: flex; align-items: center; }

/* ── Body ── */
.form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

/* ── Kitta table ── */
.table-section { margin: 20px 0; }
.table-title   { text-align: center; color: #2c3e50; margin-bottom: 10px; font-weight: bold; text-decoration: underline; }
.kitta-table   { width: 100%; border-collapse: collapse; background-color: rgba(255,255,255,0.6); }
.kitta-table th {
  background-color: #eee;
  border: 1px solid #555;
  padding: 8px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
.kitta-table td { border: 1px solid #555; padding: 5px; vertical-align: middle; }
.table-input {
  width: 100%;
  border: none;
  background: #fff;
  outline: none;
  padding: 4px;
  font-size: 1rem;
  font-family: inherit;
  color: #000;
}
.table-input:focus { border-bottom: 1px solid #2563eb; }
.action-cell    { text-align: center; white-space: nowrap; }
.add-row-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  margin: 2px;
  transition: opacity 0.15s;
}
.add-row-btn.remove-btn { background-color: #c0392b; }
.add-row-btn:hover      { opacity: 0.85; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; height: 40px; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
}
.designation-select:focus { outline: none; border-color: #2563eb; }

/* ── Bodartha ── */
.bodartha-section { margin-bottom: 30px; }
.bodartha-label   { margin-bottom: 5px; }
.bodartha-row     { display: flex; align-items: center; gap: 8px; }

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
  font-size: 1rem;
  background-color: #f3f5f7;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }

/* ── Toast ── */
.tir-toast {
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
  animation: tir-toast-in 0.25s ease;
  max-width: 360px;
}
.tir-toast--success { background: #1a7f3c; color: #fff; }
.tir-toast--error   { background: #c0392b; color: #fff; }
@keyframes tir-toast-in {
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
  .tap-installation-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .tir-toast     { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .tap-installation-container,
  .tap-installation-container * { visibility: visible; }
  .tap-installation-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    padding: 10mm 14mm;
    background: white;
    max-width: 100%;
    margin: 0;
  }
  .top-bar-title,
  .form-footer,
  .tir-toast,
  .action-cell,
  .copyright-footer { display: none !important; }
  .dotted-input,
  .line-input,
  .inline-box-input,
  .inline-select,
  .designation-select,
  .detail-input,
  .table-input { border: none !important; border-bottom: 1px dotted #000 !important; background: transparent !important; }
  .kitta-table th,
  .kitta-table td { border: 1px solid #000; }
  button { display: none !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyKitta = () => ({ description: "", kitta_no: "" });

const INITIAL_FORM = {
  chalan_no:              "",
  date_nepali:            "",
  addressee_name:         "",
  addressee_place:        "",
  previous_address:       "",
  owner_name:             "",
  kitta_main_no:          "",
  construction_type:      "आंशिक",
  tap_count:              "",
  kitta_list:             [emptyKitta()],
  designation:            "",
  bodartha_text:          "",
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_phone:        "",
};

const validate = (form) => {
  if (!form.addressee_name.trim())   return "प्राप्तकर्ताको नाम आवश्यक छ।";
  if (!form.owner_name.trim())       return "जग्गाधनीको नाम आवश्यक छ।";
  if (!form.kitta_list.length)       return "कम्तिमा एक कित्ता आवश्यक छ।";
  if (!form.applicant_name.trim())   return "निवेदकको नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function TapInstallationRecommendation() {
  const { user } = useAuth();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  /* Kitta row helpers */
  const setKitta = (idx, key, value) =>
    setForm((s) => ({
      ...s,
      kitta_list: s.kitta_list.map((r, i) => (i === idx ? { ...r, [key]: value } : r)),
    }));

  const addKittaRow = () =>
    setForm((s) => ({ ...s, kitta_list: [...s.kitta_list, emptyKitta()] }));

  const removeKittaRow = (idx) =>
    setForm((s) => ({
      ...s,
      kitta_list: s.kitta_list.length > 1
        ? s.kitta_list.filter((_, i) => i !== idx)
        : [emptyKitta()],
    }));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axiosInstance.post(API_URL, form);
      showToast("success", `सफलतापूर्वक सेभ भयो। ID: ${res.data?.id ?? ""}`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
      }, 300);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Server error";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="tap-installation-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`tir-toast tir-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          धारा जडान सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; धारा जडान सिफारिस</span>
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

        {/* Meta row — chalan_no and kitta_main_no each bound to ONE input only */}
        <div className="meta-data-row">
          <div className="meta-left">
            <label>
              पत्र संख्या :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" placeholder="२०८२/८३ ..." />
            </label>
            <label>
              कित्ता मु. नं. :
              <input name="kitta_main_no" value={form.kitta_main_no} onChange={onChange} className="dotted-input small-input" placeholder="कित्ता नं." />
            </label>
          </div>
          <div className="meta-right">
            <label>
              मिति :
              <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="dotted-input small-input" placeholder="२०८२-०८-०६" />
            </label>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text bold-text">धारा जडान सिफारिस।</span></p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" value={form.addressee_name} onChange={onChange} className="line-input medium-input" placeholder="नाम *" required />
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange} className="line-input medium-input" placeholder="ठेगाना" />
          </div>
        </div>

        {/* Body — date_nepali and kitta_main_no shown read-only; only editable in meta row */}
        <div className="form-body">
          <p>
            उपरोक्त सम्बन्धमा <strong>{MUNICIPALITY.name}</strong> वडा नं.{" "}
            <strong>{user?.ward || MUNICIPALITY.wardNumber || "__"}</strong> (साविकको ठेगाना{" "}
            <input name="previous_address" value={form.previous_address} onChange={onChange} className="inline-box-input medium-box" placeholder="साविक ठेगाना" />{" "}
            ) बस्ने श्री{" "}
            <input name="owner_name" value={form.owner_name} onChange={onChange} className="inline-box-input long-box" placeholder="जग्गाधनीको नाम *" required />{" "}
            को नाममा दर्ता कायम रहेको कि.नं.{" "}
            <span className="inline-box-input small-box" style={{ display: "inline-block", minWidth: 80 }}>
              {form.kitta_main_no || "______"}
            </span>{" "}
            को जग्गामा मिति{" "}
            <span className="inline-box-input small-box" style={{ display: "inline-block", minWidth: 80 }}>
              {form.date_nepali || "______"}
            </span>{" "}
            मा भवन निर्माण स्वीकृति लिनु भई{" "}
            <select name="construction_type" value={form.construction_type} onChange={onChange} className="inline-select">
              <option value="आंशिक">आंशिक</option>
              <option value="पूर्ण">पूर्ण</option>
            </select>{" "}
            रुपमा निर्माण सम्पन्न गर्नुभएको वा अभिलेखीकरण गर्नुभएको हुँदा{" "}
            <input name="tap_count" value={form.tap_count} onChange={onChange} className="inline-box-input medium-box" placeholder="धारा संख्या *" required />{" "}
            धारा जडान गरिदिन हुन सिफारिस साथ अनुरोध गरिन्छ।
          </p>
        </div>

        {/* Kitta table */}
        <div className="table-section">
          <h4 className="table-title">कित्ता नं. को विवरण</h4>
          <table className="kitta-table">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>क्र.स.</th>
                <th style={{ width: "55%" }}>जग्गाको विवरण</th>
                <th style={{ width: "30%" }}>कित्ता नं.</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {form.kitta_list.map((r, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>{i + 1}</td>
                  <td>
                    <input value={r.description} onChange={(e) => setKitta(i, "description", e.target.value)} className="table-input" placeholder="विवरण" />
                  </td>
                  <td>
                    <input value={r.kitta_no} onChange={(e) => setKitta(i, "kitta_no", e.target.value)} className="table-input" placeholder="कित्ता नं." />
                  </td>
                  <td className="action-cell">
                    {form.kitta_list.length > 1 && (
                      <button type="button" onClick={() => removeKittaRow(i)} className="add-row-btn remove-btn">−</button>
                    )}
                    {i === form.kitta_list.length - 1 && (
                      <button type="button" onClick={addKittaRow} className="add-row-btn">+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <select name="designation" value={form.designation} onChange={onChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Bodartha */}
        <div className="bodartha-section">
          <p className="bodartha-label bold-text">बोधार्थ:-</p>
          <div className="bodartha-row">
            <input name="bodartha_text" value={form.bodartha_text} onChange={onChange} className="line-input medium-input" placeholder="बोधार्थ" />
            <span>- जानकारीको लागि |</span>
          </div>
        </div>

        {/* Applicant details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम <span style={{ color: "red" }}>*</span></label>
              <input name="applicant_name" value={form.applicant_name} onChange={onChange} className="detail-input" required />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={onChange} className="detail-input" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={onChange} className="detail-input" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={onChange} className="detail-input" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>

      </form>
    </>
  );
}