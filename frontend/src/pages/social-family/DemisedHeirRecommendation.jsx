// src/pages/social-family/DemisedHeirRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "demised-heir-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.demised-heir-container {
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
.bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }
.center-text    { text-align: center; }
.red-asterisk   { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
.in-cell        { font-size: 0.8rem; }

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
.demised-heir-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.demised-heir-container .line-input {
  border: none;
  border-bottom: 1px solid #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.demised-heir-container .inline-box-input {
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
.demised-heir-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.demised-heir-container .dotted-input:focus,
.demised-heir-container .line-input:focus,
.demised-heir-container .inline-box-input:focus,
.demised-heir-container .inline-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.full-width-input { width: 100%; }
.tiny-box         { width: 40px; text-align: center; }
.small-box        { width: 100px; }
.medium-box       { width: 180px; }
.long-box         { width: 250px; }

/* ── Salutation / Subject ── */
.salutation-section { margin-bottom: 20px; font-size: 1.05rem; }
.subject-section    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

/* ── Table ── */
.table-section    { margin: 20px 0 40px; }
.table-title      { margin-bottom: 5px; color: #555; }
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
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  vertical-align: middle;
}
.details-table td { border: 1px solid #555; padding: 5px; vertical-align: middle; }
.table-input {
  width: 90%;
  border: none;
  background: transparent;
  outline: none;
  padding: 4px;
  font-size: 1rem;
  color: #e74c3c;
  font-family: inherit;
}
.table-input:focus { border-bottom: 1px solid #2563eb; }
.action-cell { text-align: center; white-space: nowrap; }
.add-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  margin: 0 2px;
  transition: background 0.15s;
}
.add-btn:hover { background-color: #1d4ed8; }
.rm-btn {
  background-color: #c0392b;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  margin: 0 2px;
  transition: background 0.15s;
}
.rm-btn:hover { background-color: #922b21; }

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
.applicant-details-box h3 {
  color: #777;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
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
.dhr-toast {
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
  animation: dhr-toast-in 0.25s ease;
  max-width: 360px;
}
.dhr-toast--success { background: #1a7f3c; color: #fff; }
.dhr-toast--error   { background: #c0392b; color: #fff; }
@keyframes dhr-toast-in {
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
  .demised-heir-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .dhr-toast     { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .demised-heir-container,
  .demised-heir-container * { visibility: visible; }
  .demised-heir-container {
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
  .dhr-toast,
  .top-bar-title,
  .action-cell { display: none !important; }
  .inline-box-input,
  .line-input,
  .dotted-input,
  .table-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyHeir = () => ({
  id:          Date.now() + Math.random(),
  name:        "",
  relation:    "",
  parent:      "",
  citizenship: "",
  house_no:    "",
  kitta_no:    "",
  road:        "",
});

const INITIAL_FORM = {
  chalani_no:           "",
  old_unit_name:        "",
  old_unit_type:        "",
  old_unit_ward:        "",
  applicant_declarant:  "",
  deceased_title:       "",
  deceased_name:        "",
  heirs_count:          "",
  signatory_name:       "",
  signatory_designation:"",
  // ApplicantDetailsNp
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
};

const NP_NUMS = ["१","२","३","४","५","६","७","८","९","१०","११","१२"];
const npNum   = (i) => NP_NUMS[i] ?? String(i + 1);

const validate = (form, heirs) => {
  if (!form.applicant_declarant.trim()) return "निवेदकको नाम आवश्यक छ।";
  if (!form.deceased_name.trim())       return "मृतकको नाम आवश्यक छ।";
  if (!form.heirs_count.trim())         return "हकदार संख्या आवश्यक छ।";
  for (const h of heirs) {
    if (!h.name.trim())       return "हकदारको नाम आवश्यक छ।";
    if (!h.relation.trim())   return "नाता आवश्यक छ।";
    if (!h.citizenship.trim())return "नागरिकता नं. आवश्यक छ।";
  }
  if (!form.signatory_name.trim())      return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signatory_designation)      return "पद छनौट गर्नुहोस्।";
  if (!form.applicantName.trim())       return "निवेदकको नाम (तल) आवश्यक छ।";
  if (!form.applicantAddress.trim())    return "निवेदकको ठेगाना आवश्यक छ।";
  if (!form.applicantCitizenship.trim())return "नागरिकता नं. आवश्यक छ।";
  if (!form.applicantPhone.trim())      return "फोन नं. आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const DemisedHeirRecommendation = () => {
  const { user } = useAuth();

  const [form, setForm]   = useState(INITIAL_FORM);
  const [heirs, setHeirs] = useState([emptyHeir()]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  /* Heir row updaters */
  const onHeirChange = (idx, key, value) =>
    setHeirs((rows) => rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  const addHeir    = ()    => setHeirs((rows) => [...rows, emptyHeir()]);
  const removeHeir = (idx) => setHeirs((rows) => rows.filter((_, i) => i !== idx));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form, heirs);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { ...form, heirs });
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
        setHeirs([emptyHeir()]);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्न असफल भयो।";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="demised-heir-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`dhr-toast dhr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          मृतक हकदारको सिफारिस ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; मृतक हकदारको सिफारिस
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
            <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Salutation */}
        <div className="salutation-section">
          <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <span className="bg-gray-text">{MUNICIPALITY.city || "काठमाडौँ"}</span>{" "}
            <span className="bg-gray-text">{MUNICIPALITY.name}</span> वडा नं.{" "}
            <span className="bg-gray-text">{user?.ward || MUNICIPALITY.wardNumber || "१"}</span>{" "}
            स्थायी ठेगाना (साविक{" "}
            <input
              name="old_unit_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.old_unit_name}
              onChange={handleChange}
              placeholder="साविक नाम"
            />
            <select
              name="old_unit_type"
              className="inline-select"
              value={form.old_unit_type}
              onChange={handleChange}
            >
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            <input
              name="old_unit_ward"
              type="text"
              className="inline-box-input tiny-box"
              value={form.old_unit_ward}
              onChange={handleChange}
              required
            />{" "}
            ) बस्ने श्री{" "}
            <input
              name="applicant_declarant"
              type="text"
              className="inline-box-input long-box"
              value={form.applicant_declarant}
              onChange={handleChange}
              placeholder="निवेदकको नाम *"
              required
            />{" "}
            ले हकदार प्रमाणित गरी पाउँ भनी यस वडा कार्यालयमा निवेदन दिनुभएको
            हुँदा सो सम्बन्धमा{" "}
            <input
              name="deceased_title"
              type="text"
              className="inline-box-input medium-box"
              value={form.deceased_title}
              onChange={handleChange}
              placeholder="श्री/सुश्री/श्रीमती *"
              required
            />{" "}
            <input
              name="deceased_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.deceased_name}
              onChange={handleChange}
              placeholder="मृतकको नाम *"
              required
            />{" "}
            का हकदारहरु देहाय बमोजिम उल्लेखित{" "}
            <input
              name="heirs_count"
              type="text"
              className="inline-box-input small-box"
              value={form.heirs_count}
              onChange={handleChange}
              placeholder="संख्या *"
              required
            />{" "}
            जना मात्र भएको व्यहोरा सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* Heir table — React-controlled */}
        <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>क्र.स.</th>
                  <th style={{ width: "18%" }}>हकदारहरुको नाम थर</th>
                  <th style={{ width: "12%" }}>नाता</th>
                  <th style={{ width: "16%" }}>बाबु/पतिको नाम</th>
                  <th style={{ width: "12%" }}>नागरिकता नं.</th>
                  <th style={{ width: "10%" }}>घर नं</th>
                  <th style={{ width: "10%" }}>कित्ता नं.</th>
                  <th style={{ width: "12%" }}>बाटोको नाम</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {heirs.map((heir, i) => (
                  <tr key={heir.id}>
                    <td style={{ textAlign: "center" }}>{npNum(i)}</td>
                    <td><input className="table-input" value={heir.name}        onChange={(e) => onHeirChange(i, "name",        e.target.value)} placeholder="नाम थर *" required /></td>
                    <td><input className="table-input" value={heir.relation}    onChange={(e) => onHeirChange(i, "relation",    e.target.value)} placeholder="नाता *" required /></td>
                    <td><input className="table-input" value={heir.parent}      onChange={(e) => onHeirChange(i, "parent",      e.target.value)} placeholder="बाबु/पतिको नाम" /></td>
                    <td><input className="table-input" value={heir.citizenship} onChange={(e) => onHeirChange(i, "citizenship", e.target.value)} placeholder="नागरिकता नं. *" required /></td>
                    <td><input className="table-input" value={heir.house_no}   onChange={(e) => onHeirChange(i, "house_no",   e.target.value)} placeholder="घर नं" /></td>
                    <td><input className="table-input" value={heir.kitta_no}   onChange={(e) => onHeirChange(i, "kitta_no",   e.target.value)} placeholder="कित्ता नं." /></td>
                    <td><input className="table-input" value={heir.road}       onChange={(e) => onHeirChange(i, "road",       e.target.value)} placeholder="बाटो" /></td>
                    <td className="action-cell">
                      <button type="button" className="add-btn" onClick={addHeir} title="थप्नुहोस्">+</button>
                      {heirs.length > 1 && (
                        <button type="button" className="rm-btn" onClick={() => removeHeir(i)} title="हटाउनुहोस्">−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              value={form.signatory_name}
              onChange={handleChange}
              placeholder="हस्ताक्षरकर्ताको नाम *"
              required
            />
            <select
              name="signatory_designation"
              className="designation-select"
              value={form.signatory_designation}
              onChange={handleChange}
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
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DemisedHeirRecommendation;