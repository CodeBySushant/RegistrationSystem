// src/pages/social-family/IncomeSourceCertification.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "income-source-certification";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.income-source-container {
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
.income-source-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.income-source-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 5px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.income-source-container .inline-box-input {
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
.income-source-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.income-source-container .dotted-input:focus,
.income-source-container .line-input:focus,
.income-source-container .inline-box-input:focus,
.income-source-container .inline-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.medium-input     { width: 200px; }
.full-width-input { width: 100%; }
.tiny-box         { width: 40px; text-align: center; }
.medium-box       { width: 180px; }

/* ── Subject ── */
.subject-section   { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
.salutation-section { margin-bottom: 20px; font-size: 1.05rem; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

/* ── Table ── */
.table-section    { margin: 20px 0 40px; }
.table-title      { margin-bottom: 5px; color: #555; font-weight: bold; }
.table-responsive { overflow-x: auto; }
.income-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255,255,255,0.6);
}
.income-table th {
  background-color: #e0e0e0;
  border: 1px solid #555;
  padding: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
}
.income-table td { border: 1px solid #555; padding: 5px; vertical-align: middle; }
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

/* ── Total row ── */
.total-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
}
.total-row label { font-weight: bold; margin-right: 5px; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 40px; margin-bottom: 30px; }
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
.isc-toast {
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
  animation: isc-toast-in 0.25s ease;
  max-width: 360px;
}
.isc-toast--success { background: #1a7f3c; color: #fff; }
.isc-toast--error   { background: #c0392b; color: #fff; }
@keyframes isc-toast-in {
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
  .income-source-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .isc-toast     { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .income-source-container,
  .income-source-container * { visibility: visible; }
  .income-source-container {
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
  .isc-toast,
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

const emptyIncomeRow = () => ({
  id:          Date.now() + Math.random(),
  description: "",
  annual_income: "",
});

const INITIAL_FORM = {
  chalani_no:             "",
  municipality:           MUNICIPALITY.name,
  previous_unit_type:     "",
  previous_ward:          "",
  applicant_name:         "",
  total_income:           "",
  signatory_name:         "",
  signatory_designation:  "",
  // ApplicantDetailsNp
  applicantName:          "",
  applicantAddress:       "",
  applicantCitizenship:   "",
  applicantPhone:         "",
};

const validate = (form, incomeRows) => {
  if (!form.applicant_name.trim())       return "निवेदकको नाम आवश्यक छ।";
  for (const row of incomeRows) {
    if (!row.description.trim())         return "विवरण आवश्यक छ।";
    if (!row.annual_income.trim())       return "वार्षिक आय आवश्यक छ।";
  }
  if (!form.signatory_name.trim())       return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signatory_designation)       return "पद छनौट गर्नुहोस्।";
  if (!form.applicantName.trim())        return "निवेदकको नाम (तल) आवश्यक छ।";
  if (!form.applicantAddress.trim())     return "निवेदकको ठेगाना आवश्यक छ।";
  if (!form.applicantCitizenship.trim()) return "नागरिकता नं. आवश्यक छ।";
  if (!form.applicantPhone.trim())       return "फोन नं. आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const IncomeSourceCertification = () => {
  const { user } = useAuth();

  const [form, setForm]           = useState(INITIAL_FORM);
  const [incomeRows, setIncomeRows] = useState([emptyIncomeRow()]);
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  /* Income row updaters */
  const onRowChange = (idx, key, value) =>
    setIncomeRows((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  const addRow    = ()    => setIncomeRows((rows) => [...rows, emptyIncomeRow()]);
  const removeRow = (idx) => setIncomeRows((rows) => rows.filter((_, i) => i !== idx));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form, incomeRows);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { ...form, income_rows: incomeRows });
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
        setIncomeRows([emptyIncomeRow()]);
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

  /* Nepali serial numbers */
  const NP_NUMS = ["१","२","३","४","५","६","७","८","९","१०","११","१२"];
  const npNum   = (i) => NP_NUMS[i] ?? String(i + 1);

  return (
    <>
      <style>{styles}</style>

      <form className="income-source-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`isc-toast isc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          आय श्रोत प्रमाणित ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; आय श्रोत प्रमाणित
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

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">आय श्रोत प्रमाणित सम्बन्धमा ।</span>
          </p>
        </div>

        {/* Salutation */}
        <div className="salutation-section">
          <p>श्री जो जस संग सम्बन्ध राख्दछ ।</p>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            प्रस्तुत बिषयमा यस{" "}
            <input
              name="municipality"
              type="text"
              className="inline-box-input medium-box"
              value={form.municipality}
              onChange={handleChange}
            />{" "}
            वडा नं.{" "}
            <span className="bold-text">
              {user?.ward || MUNICIPALITY.wardNumber || "१"}
            </span>{" "}
            (साविक जिल्ला{" "}
            <select
              name="previous_unit_type"
              className="inline-select"
              value={form.previous_unit_type}
              onChange={handleChange}
            >
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            <input
              name="previous_ward"
              type="text"
              className="inline-box-input tiny-box"
              value={form.previous_ward}
              onChange={handleChange}
            />{" "}
            ) मा बस्ने{" "}
            <input
              name="applicant_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.applicant_name}
              onChange={handleChange}
              placeholder="निवेदकको नाम *"
              required
            />{" "}
            ले दिनु भएको निवेदन अनुसार निज निवेदकको आय श्रोत तपशिल बमोजिम
            रहेको व्यहोरा सिफारिस साथ सादर अनुरोध गर्दछु ।
          </p>
        </div>

        {/* Income table */}
        <div className="table-section">
          <h4 className="table-title">तपशिल</h4>
          <div className="table-responsive">
            <table className="income-table">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>क्र.सं.</th>
                  <th style={{ width: "47%" }}>विवरण</th>
                  <th style={{ width: "37%" }}>वार्षिक आय श्रोत</th>
                  <th style={{ width: "8%" }}></th>
                </tr>
              </thead>
              <tbody>
                {incomeRows.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ textAlign: "center" }}>{npNum(i)}</td>
                    <td>
                      <input
                        className="table-input"
                        value={row.description}
                        onChange={(e) => onRowChange(i, "description", e.target.value)}
                        placeholder="विवरण *"
                        required
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        value={row.annual_income}
                        onChange={(e) => onRowChange(i, "annual_income", e.target.value)}
                        placeholder="वार्षिक आय *"
                        required
                      />
                    </td>
                    <td className="action-cell">
                      <button type="button" className="add-btn" onClick={addRow} title="थप्नुहोस्">+</button>
                      {incomeRows.length > 1 && (
                        <button type="button" className="rm-btn" onClick={() => removeRow(i)} title="हटाउनुहोस्">−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="total-row">
            <label>जम्मा :</label>
            <input
              name="total_income"
              type="text"
              className="line-input medium-input"
              value={form.total_income}
              onChange={handleChange}
              placeholder="जम्मा रकम"
            />
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

export default IncomeSourceCertification;