// src/pages/house-land/KittaKatRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "kitta-kat-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.kittakat-container {
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
.kittakat-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.kittakat-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.kittakat-container .inline-box-input {
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
.kittakat-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.bold-select {
  border: 1px solid #ccc;
  background: #fff;
  padding: 2px;
  font-weight: bold;
  margin-left: 5px;
  font-family: inherit;
  font-size: 1rem;
}
.kittakat-container .dotted-input:focus,
.kittakat-container .line-input:focus,
.kittakat-container .inline-box-input:focus,
.kittakat-container .inline-select:focus,
.bold-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.medium-input     { width: 200px; }
.full-width-input { width: 100%; }
.tiny-box         { width: 40px; text-align: center; }
.small-box        { width: 100px; }
.medium-box       { width: 200px; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; display: flex; align-items: center; flex-wrap: wrap; }

/* ── Body paragraph ── */
.form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 20px; }

/* ── Table ── */
.table-section    { margin: 20px 0 30px; }
.table-title      { text-align: center; font-weight: bold; margin-bottom: 10px; color: #555; }
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
  text-align: left;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
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
.add-plot-btn {
  margin-top: 8px;
  padding: 4px 14px;
  font-size: 0.88rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  cursor: pointer;
  font-family: inherit;
}
.add-plot-btn:hover { background: #e8e8e8; }

/* ── Field inspection report ── */
.field-report-section { margin-bottom: 40px; }
.report-title  { text-align: center; text-decoration: underline; margin-bottom: 15px; font-size: 1.1rem; font-weight: bold; color: #555; }
.report-row    { display: flex; align-items: center; margin-bottom: 8px; font-size: 1rem; }
.report-row label { min-width: 220px; }
.long-input    { flex-grow: 1; border-bottom: 1px solid #ccc; border-top: none; border-left: none; border-right: none; background: transparent; outline: none; padding: 2px 5px; font-family: inherit; font-size: 1rem; }
.long-input:focus { border-color: #2563eb; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; position: relative; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; height: 40px; }
.signature-block .line-input { width: 100%; margin: 0 0 5px 0; border-bottom: 1px solid #000; }
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

/* ── Toast ── */
.kkr-toast {
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
  animation: kkr-toast-in 0.25s ease;
  max-width: 360px;
}
.kkr-toast--success { background: #1a7f3c; color: #fff; }
.kkr-toast--error   { background: #c0392b; color: #fff; }
@keyframes kkr-toast-in {
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
.copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .kittakat-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .kkr-toast     { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .kittakat-container,
  .kittakat-container * { visibility: visible; }
  .kittakat-container {
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
  .kkr-toast,
  .top-bar-title,
  .action-cell,
  .add-plot-btn { display: none !important; }
  .inline-box-input,
  .line-input,
  .dotted-input,
  .long-input,
  .table-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyPlot = () => ({
  id:      Date.now() + Math.random(),
  seat_no: "",
  plot_no: "",
  area:    "",
});

const INITIAL_FORM = (user) => ({
  letter_no:               "२०८२/८३",
  chalani_no:              "",
  date_nep:                new Date().toISOString().slice(0, 10),
  addressee_type:          "नापी कार्यालय",
  addressee_location:      "",
  district:                MUNICIPALITY.city || "",
  municipality:            MUNICIPALITY.name,
  ward_no:                 user?.ward || "",
  previous_place_text:     "",
  previous_ward_no:        "",
  applicant_prefix:        "श्री",
  applicant_name:          "",
  requested_for:           "",
  split_area:              "",
  split_area_unit:         "",
  built_plot_area:         "",
  total_house_area:        "",
  ground_floor_area:       "",
  paune_far:               "",
  reason_for_recommendation: "",
  recommender:             "",
  technician_name:         "",
  technician_signature:    "",
  signer_name:             "",
  signer_designation:      "",
  // ApplicantDetailsNp
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
  notes:                   "",
});

const REPORT_ROWS = [
  ["built_plot_area",           "घर बनेको जग्गाको क्षेत्रफल", false],
  ["total_house_area",          "घरको जम्मा क्षेत्रफल",       false],
  ["ground_floor_area",         "घरको भुइँ तल्लाको क्षेत्रफल", false],
  ["paune_far",                 "पाउने फार",                    true ],
  ["reason_for_recommendation", "सिफारिस दिन मिल्ने कारण",     true ],
  ["recommender",               "सिफारिस गर्ने:",              false],
  ["technician_name",           "प्राबिधिकको नाम",             true ],
  ["technician_signature",      "प्राबिधिकको हस्ताक्षर",      false],
];

const validate = (form, plots) => {
  if (!form.applicant_name.trim())  return "निवेदकको नाम आवश्यक छ।";
  if (!form.requested_for.trim())   return "अनुरोधको विषय आवश्यक छ।";
  if (!form.split_area.trim())      return "विभाजन क्षेत्रफल आवश्यक छ।";
  for (const p of plots) {
    if (!p.seat_no.trim() || !p.plot_no.trim()) return "प्लटको सिट नं. र कित्ता नं. आवश्यक छ।";
  }
  if (!form.signer_name.trim())     return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signer_designation)     return "पद छनौट गर्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function KittaKatRecommendation() {
  const { user } = useAuth();

  const [form, setForm]   = useState(() => INITIAL_FORM(user));
  const [plots, setPlots] = useState([emptyPlot()]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  /* Plot row helpers */
  const setPlot = (idx, key, value) =>
    setPlots((rows) => rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  const addPlot    = ()    => setPlots((rows) => [...rows, emptyPlot()]);
  const removePlot = (idx) => setPlots((rows) => rows.length > 1 ? rows.filter((_, i) => i !== idx) : rows);

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form, plots);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { ...form, plots });
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM(user));
        setPlots([emptyPlot()]);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "सेभ गर्न असफल भयो।";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="kittakat-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`kkr-toast kkr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          कित्ताकाट सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; कित्ताकाट सिफारिस</span>
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
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="dotted-input small-input" />
            </p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <select name="addressee_type" value={form.addressee_type} onChange={handleChange} className="bold-select">
              <option>नापी कार्यालय</option>
              <option>मालपोत कार्यालय</option>
            </select>
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_location" value={form.addressee_location} onChange={handleChange} className="line-input medium-input" placeholder="ठाउँ *" required />
            <span className="bold-text">, काठमाडौँ</span>
          </div>
        </div>

        {/* Body paragraph — district/municipality/ward_no now editable */}
        <div className="form-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <input name="district"     value={form.district}     onChange={handleChange} className="inline-box-input medium-box" placeholder="जिल्ला" />{" "}
            <input name="municipality" value={form.municipality} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            वडा नं.{" "}
            <input name="ward_no"      value={form.ward_no}      onChange={handleChange} className="inline-box-input tiny-box" />{" "}
            स्थायी बासिन्दा (साविकको ठेगाना{" "}
            <input name="previous_place_text" value={form.previous_place_text} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            वडा नं.{" "}
            <input name="previous_ward_no"    value={form.previous_ward_no}    onChange={handleChange} className="inline-box-input tiny-box" />{" "}
            ){" "}
            <select name="applicant_prefix" value={form.applicant_prefix} onChange={handleChange} className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
            </select>{" "}
            <input name="applicant_name"  value={form.applicant_name}  onChange={handleChange} className="inline-box-input medium-box" placeholder="निवेदकको नाम *" required />{" "}
            को नाममा श्रेस्ता दर्ता कायम रहेको तल उल्लेखित घर-जग्गा मध्ये{" "}
            <input name="requested_for"   value={form.requested_for}   onChange={handleChange} className="inline-box-input medium-box" placeholder="अनुरोध *" required />{" "}
            तर्फबाट{" "}
            <input name="split_area"      value={form.split_area}      onChange={handleChange} className="inline-box-input small-box"  placeholder="क्षेत्रफल *" required />{" "}
            क्षेत्रफल जग्गा{" "}
            <select name="split_area_unit" value={form.split_area_unit} onChange={handleChange} className="inline-select">
              <option value="">एकाइ</option>
              <option value="वर्गमिटर">वर्गमिटर</option>
              <option value="रोपनी">रोपनी</option>
            </select>{" "}
            कित्ताकाट गर्न प्राविधिक निरीक्षण गर्दा मापदण्ड अनुसार मिल्ने
            देखिएको हुनाले सोको लागि सिफारिस गरिन्छ।
          </p>
        </div>

        {/* Plots table — React-controlled */}
        <div className="table-section">
          <h4 className="table-title">घर रहेको जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>सिट नं</th>
                  <th>कित्ता नं.</th>
                  <th>क्षेत्रफल</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {plots.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td><input value={p.seat_no} onChange={(e) => setPlot(i, "seat_no", e.target.value)} className="table-input" placeholder="सिट नं *" required /></td>
                    <td><input value={p.plot_no} onChange={(e) => setPlot(i, "plot_no", e.target.value)} className="table-input" placeholder="कित्ता नं *" required /></td>
                    <td><input value={p.area}    onChange={(e) => setPlot(i, "area",    e.target.value)} className="table-input" placeholder="क्षेत्रफल" /></td>
                    <td className="action-cell">
                      <button type="button" className="add-btn" onClick={addPlot} title="थप्नुहोस्">+</button>
                      {plots.length > 1 && (
                        <button type="button" className="rm-btn" onClick={() => removePlot(i)} title="हटाउनुहोस्">−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="add-plot-btn" onClick={addPlot}>
            + कतार थप्नुहोस्
          </button>
        </div>

        {/* Field inspection report — driven by config array */}
        <div className="field-report-section">
          <h4 className="report-title underline-text">कित्ताकाट सिफारिस फिल्ड निरीक्षण प्रतिवेदन</h4>
          {REPORT_ROWS.map(([name, label, required]) => (
            <div className="report-row" key={name}>
              <label>{label}</label>
              {required && <span style={{ color: "red", margin: "0 4px" }}>*</span>}
              <input name={name} value={form[name]} onChange={handleChange} className="long-input" />
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="line-input full-width-input"
              placeholder="हस्ताक्षरकर्ताको नाम *"
              required
            />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
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
}