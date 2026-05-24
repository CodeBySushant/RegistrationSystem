// src/pages/english-format/new/AnnualIncomeVerificationNew.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import ApplicantDetailsEn from "../../../components/ApplicantDetailsEn";

const FORM_KEY = "annual-income-verification-new";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.annual-income-verification-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Times New Roman', Times, serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
}

/* ── English header ── */
.aiv-header { text-align: center; margin-bottom: 20px; color: #8B0000; }
.aiv-logo   { width: 80px; margin-bottom: 10px; }
.aiv-municipality { font-size: 1.4rem; font-weight: bold; }
.aiv-ward         { font-size: 1.1rem; }
.aiv-sub          { font-size: 0.95rem; }

/* ── Form rows ── */
.form-row {
  display: flex; justify-content: space-between;
  flex-wrap: wrap; margin-bottom: 15px;
}
.form-group { display: flex; flex-direction: row; align-items: baseline; margin-bottom: 10px; }
.form-group label { font-weight: bold; margin-right: 8px; }
.form-group input {
  width: 200px; max-width: 100%; padding: 5px;
  border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-family: inherit;
}
.form-group input:focus,
.form-group select:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.12); }

/* ── Subject ── */
.subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

/* ── Certificate body ── */
.certificate-body { line-height: 2.8; font-size: 16px; text-align: justify; }
.certificate-body input[type="text"],
.certificate-body select {
  display: inline-block; vertical-align: baseline;
  padding: 4px 6px; font-family: inherit; font-size: 15px;
  background-color: transparent; border: none;
  border-bottom: 1px dotted #000; margin: 0 5px;
  width: 120px; max-width: 100%; box-sizing: border-box;
}
.certificate-body input[type="text"]:focus,
.certificate-body select:focus { outline: none; border-bottom-color: #2563eb; }
.certificate-body select { width: auto; min-width: 80px; }

/* ── Income table ── */
.table-wrapper { width: 100%; overflow-x: auto; margin: 20px 0; }
.income-table {
  width: 100%; min-width: 800px; border-collapse: collapse; text-align: center;
}
.income-table th,
.income-table td { border: 1px solid #000; padding: 8px; vertical-align: middle; font-size: 14px; }
.income-table th { background-color: #f0f0f0; font-weight: bold; }
.income-table input[type="text"] {
  width: 100%; box-sizing: border-box; border: 1px solid #ccc;
  padding: 4px; text-align: center; font-family: inherit;
}
.income-table input[type="text"]:focus { outline: none; border-color: #2563eb; }
.income-table .inline-select { margin-left: 8px; padding: 4px; font-family: inherit; border: 1px solid #ccc; }
.add-btn {
  width: 30px; height: 30px; font-size: 20px; font-weight: bold;
  background-color: #2563eb; color: white; border: none; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center; margin: 0 auto;
  transition: background 0.15s;
}
.add-btn:hover { background-color: #1d4ed8; }
.rm-btn {
  width: 30px; height: 30px; font-size: 18px; font-weight: bold;
  background-color: #c0392b; color: white; border: none; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center; margin: 0 auto;
  transition: background 0.15s;
}
.rm-btn:hover { background-color: #922b21; }

/* ── Note body ── */
.note-body { font-size: 14px; line-height: 2.5; }
.note-body input[type="text"] {
  display: inline-block; vertical-align: baseline;
  padding: 4px 6px; font-family: inherit; font-size: 14px;
  background-color: transparent; border: none;
  border-bottom: 1px dotted #000; margin: 0 5px; width: 100px;
}
.note-body input[type="text"]:focus { outline: none; border-bottom-color: #2563eb; }
.note-body .inline-select {
  margin: 0 5px; padding: 4px 6px; border: 1px solid #ccc;
  border-radius: 3px; font-family: inherit; font-size: 14px;
}

/* ── Designation ── */
.designation-section {
  display: flex; flex-direction: column; align-items: flex-end;
  margin-top: 40px; margin-right: 20px;
}
.designation-section input {
  width: 220px; max-width: 100%; border: none;
  border-bottom: 1px solid #000; margin-bottom: 5px;
  text-align: center; background: transparent; box-sizing: border-box; font-family: inherit;
}
.designation-section select {
  width: 220px; max-width: 100%; padding: 5px;
  border: 1px solid #ccc; border-radius: 4px; text-align: center;
  box-sizing: border-box; font-family: inherit;
}
.designation-section select:focus { outline: none; border-color: #2563eb; }

/* ── Applicant details box ── */
.annual-income-verification-container .applicant-details-box {
  border: 1px solid #ddd; padding: 20px;
  background-color: rgba(255,255,255,0.4); margin-top: 20px; border-radius: 4px;
}
.annual-income-verification-container .applicant-details-box h3 {
  color: #777; font-size: 1.1rem; margin: 0 0 15px 0;
  border-bottom: 1px solid #eee; padding-bottom: 8px;
  font-family: 'Times New Roman', Times, serif;
}
.annual-income-verification-container .details-grid {
  display: flex !important; flex-direction: column !important; gap: 18px !important;
}
.annual-income-verification-container .detail-group { display: flex; flex-direction: column; }
.annual-income-verification-container .detail-group label {
  font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
}
.annual-income-verification-container .detail-input {
  border: 1px solid #ddd; padding: 8px; border-radius: 4px;
  width: 100%; max-width: 400px; box-sizing: border-box; font-family: inherit; font-size: 0.95rem;
}
.annual-income-verification-container .detail-input:focus {
  outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.aiv-toast {
  position: fixed; top: 20px; right: 24px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 6px; font-size: 0.92rem;
  font-family: 'Times New Roman', serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: aiv-toast-in 0.25s ease; max-width: 380px;
}
.aiv-toast--success { background: #1a7f3c; color: #fff; }
.aiv-toast--error   { background: #c0392b; color: #fff; }
@keyframes aiv-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Submit ── */
.submit-area { text-align: center; margin-top: 30px; }
.submit-btn {
  background-color: #343a40; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold;
  font-family: inherit; transition: background 0.15s;
}
.submit-btn:hover:not(:disabled) { background-color: #23272b; }
.submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .annual-income-verification-container { padding: 14px; }
  .form-row { flex-direction: column; }
  .aiv-toast { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .annual-income-verification-container,
  .annual-income-verification-container * { visibility: visible; }
  .annual-income-verification-container {
    position: absolute; left: 0; top: 0;
    width: 100%; box-shadow: none; border: none;
    margin: 0; padding: 10mm 14mm; background: white;
  }
  .submit-area, .aiv-toast { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
  .income-table th, .income-table td { border: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyIncomeRow = () => ({
  id:            Date.now() + Math.random(),
  ownerTitle:    "Mr.",
  ownerName:     "",
  relation:      "",
  incomeSource:  "",
  incomeDetails: "",
  annualIncome:  "",
  remarks:       "",
});

const INITIAL_FORM = (user) => ({
  letterNo:                 "1970/60",
  refNo:                    "",
  date:                     new Date().toISOString().slice(0, 10),
  applicantNameBody:        "",
  relation:                 "son",
  guardianTitle:            "Mr.",
  guardianName:             "",
  municipality:             MUNICIPALITY.englishName || MUNICIPALITY.name || "",
  wardNo:                   user?.ward?.toString() || "",
  prevAddress:              "",
  prevWardNo:               "",
  district:                 MUNICIPALITY.englishDistrict || MUNICIPALITY.city || "",
  province:                 MUNICIPALITY.englishProvince || "",
  country:                  "Nepal",
  currency:                 "USD",
  totalAnnualIncome:        "",
  totalAnnualIncomeWords:   "",
  equivalentCurrency:       "",
  equivalentCurrencyWords:  "",
  usdRate:                  "",
  designation:              "",
  applicantName:            "",
  applicantAddress:         "",
  applicantCitizenship:     "",
  applicantPhone:           "",
});

const CURRENCIES = ["USD","AUD","GBP","EUR","JPY","KRW","CAD","NZD"];

const validate = (formData, incomeSources) => {
  const required = [
    "applicantNameBody","guardianName","municipality","wardNo",
    "district","province","country",
    "totalAnnualIncome","totalAnnualIncomeWords",
    "equivalentCurrency","equivalentCurrencyWords",
    "currency","usdRate","designation",
    "applicantName","applicantAddress","applicantCitizenship","applicantPhone",
  ];
  for (const k of required) {
    if (!formData[k] || String(formData[k]).trim() === "")
      return `Please fill required field: ${k}`;
  }
  if (!incomeSources.length)
    return "At least one income source row is required.";
  if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone)))
    return "Please enter a valid phone number.";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const AnnualIncomeVerificationNew = () => {
  const { user } = useAuth();

  const [formData, setFormData]       = useState(() => INITIAL_FORM(user));
  const [incomeSources, setIncomeSources] = useState([emptyIncomeRow()]);
  const [loading, setLoading]         = useState(false);
  const [toast, setToast]             = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    setIncomeSources((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [name]: value } : r))
    );
  };

  const addIncomeRow    = ()    => setIncomeSources((p) => [...p, emptyIncomeRow()]);
  const removeIncomeRow = (idx) => setIncomeSources((p) => p.length > 1 ? p.filter((_, i) => i !== idx) : p);

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "All Ward Offices"
      : `Ward No. ${user?.ward || MUNICIPALITY.wardNumber || "1"} Ward Office`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(formData, incomeSources);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      // Strip stable row ids before posting
      const payload = {
        ...formData,
        table_rows: incomeSources.map(({ id, ...rest }) => rest),
      };

      const res = await axiosInstance.post(API_URL, payload);
      showToast("success", `Saved successfully (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setFormData(INITIAL_FORM(user));
        setIncomeSources([emptyIncomeRow()]);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      showToast("error", err.response?.data?.message || err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="annual-income-verification-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`aiv-toast aiv-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* English letterhead */}
        <div className="aiv-header">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" className="aiv-logo" />
          <div className="aiv-municipality">{MUNICIPALITY.englishName || MUNICIPALITY.name}</div>
          <div className="aiv-ward">{wardLabel}</div>
          <div className="aiv-sub">{MUNICIPALITY.officeLine} | {MUNICIPALITY.provinceLine}</div>
        </div>

        {/* Ref row */}
        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        {/* Subject */}
        <div className="subject-line">
          <strong>Subject: <u>Annual Income Certificate</u></strong><br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        {/* Body */}
        <p className="certificate-body">
          This is to certify that{" "}
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
          </select>
          <input type="text" name="applicantNameBody" value={formData.applicantNameBody} onChange={handleChange} required />,{" "}
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>{" "}
          of{" "}
          <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required />{" "}
          and{" "}
          <select><option>wife</option></select>{" "}
          of{" "}
          <input type="text" placeholder="Husband's Name" />,{" "}
          <span style={{ color: "red" }}>permanent resident</span> of{" "}
          <strong>{formData.municipality}</strong> Ward No.{" "}
          <strong>{formData.wardNo}</strong>,{" "}
          <strong>{formData.district}</strong> District,{" "}
          <strong>{formData.province}</strong>, Nepal, his family has following
          sources of income from the following sources. The details have been
          verified according to the evidence and records that are provided to office.
        </p>

        {/* Income table */}
        <div className="table-wrapper">
          <table className="income-table">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Owner's Name</th>
                <th>Relation</th>
                <th>Sources of Income</th>
                <th>Annual Income</th>
                <th>Remarks</th>
                <th style={{ width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {incomeSources.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>
                    <select name="ownerTitle" value={row.ownerTitle} onChange={(e) => handleIncomeChange(index, e)} className="inline-select">
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select><br />
                    <input type="text" name="ownerName" value={row.ownerName} onChange={(e) => handleIncomeChange(index, e)} required />
                  </td>
                  <td>
                    <input type="text" name="relation" value={row.relation} onChange={(e) => handleIncomeChange(index, e)} required />
                  </td>
                  <td>
                    Income from{" "}
                    <input type="text" name="incomeSource" value={row.incomeSource} onChange={(e) => handleIncomeChange(index, e)} required /><br />
                    (<input type="text" name="incomeDetails" value={row.incomeDetails} onChange={(e) => handleIncomeChange(index, e)} />)
                  </td>
                  <td>
                    <input type="text" name="annualIncome" value={row.annualIncome} onChange={(e) => handleIncomeChange(index, e)} required />
                  </td>
                  <td>
                    <input type="text" name="remarks" value={row.remarks} onChange={(e) => handleIncomeChange(index, e)} />
                  </td>
                  <td>
                    <button type="button" className="add-btn" onClick={addIncomeRow} title="Add row">+</button>
                    {incomeSources.length > 1 && (
                      <button type="button" className="rm-btn" onClick={() => removeIncomeRow(index)} style={{ marginTop: 4 }} title="Remove row">−</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total & exchange */}
        <div className="note-body">
          <p>
            <strong>Total Annual Income in NRs.</strong>
            <input type="text" name="totalAnnualIncome" value={formData.totalAnnualIncome} onChange={handleChange} required />
            (In words:
            <input type="text" name="totalAnnualIncomeWords" value={formData.totalAnnualIncomeWords} onChange={handleChange} required />
            )
          </p>
          <p>
            <strong>Today's Buying Rate</strong>
            <select name="currency" value={formData.currency} onChange={handleChange} className="inline-select">
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            1 = NRs.
            <input type="text" name="usdRate" value={formData.usdRate} onChange={handleChange} required />
          </p>
          <p>
            <strong>Equivalent to currency =</strong>
            <input type="text" name="equivalentCurrency" value={formData.equivalentCurrency} onChange={handleChange} required />
            (In words:
            <input type="text" name="equivalentCurrencyWords" value={formData.equivalentCurrencyWords} onChange={handleChange} required />
            )
          </p>
        </div>

        {/* Designation */}
        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsEn formData={formData} handleChange={handleChange} />

        {/* Submit */}
        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save and Print Record"}
          </button>
        </div>

      </form>
    </>
  );
};

export default AnnualIncomeVerificationNew;