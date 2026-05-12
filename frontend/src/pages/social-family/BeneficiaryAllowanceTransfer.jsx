// src/pages/social-family/BeneficiaryAllowanceTransfer.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "beneficiary-allowance-transfer";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.beneficiary-transfer-container {
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
.beneficiary-transfer-container .form-header-section {
  text-align: center;
  margin-bottom: 20px;
}
.header-top-small  { margin: 2px 0; font-size: 0.9rem; }
.beneficiary-transfer-container .municipality-name {
  font-size: 1.4rem; margin: 5px 0; font-weight: bold; color: #000;
}
.beneficiary-transfer-container .address-text { color: #000; margin: 0; font-size: 1rem; }
.subject-title { margin-top: 15px; text-decoration: underline; font-weight: bold; font-size: 1.1rem; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

/* ── Shared inputs ── */
.beneficiary-transfer-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.beneficiary-transfer-container .inline-box-input {
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
.beneficiary-transfer-container .line-input:focus,
.beneficiary-transfer-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.medium-input { width: 200px; }
.small-input  { width: 80px; }
.tiny-box     { width: 40px; text-align: center; }
.small-box    { width: 100px; }
.medium-box   { width: 150px; }

/* ── Inline select ── */
.beneficiary-transfer-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-family: inherit;
  font-size: 1rem;
  vertical-align: middle;
}
.beneficiary-transfer-container .inline-select:focus { outline: none; border-color: #2563eb; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 20px;
}

/* ── Tapsil ── */
.tapsil-section  { margin-bottom: 20px; }
.tapsil-list     { padding-left: 20px; margin-top: 5px; list-style-type: none; }
.tapsil-list li  { margin-bottom: 5px; }

/* ── Table 1 (beneficiary details) ── */
.table-section { margin-bottom: 30px; }
.beneficiary-table { width: 100%; border-collapse: collapse; border: 1px solid #000; }
.beneficiary-table td { border: 1px solid #000; padding: 8px; vertical-align: middle; }
.label-col { background-color: #f5f5f5; width: 30%; font-weight: bold; }
.input-col { background-color: #fff; }
.table-input {
  width: 95%;
  border: none;
  border-bottom: 1px dotted #ccc;
  outline: none;
  font-family: inherit;
  font-size: 0.95rem;
  background: transparent;
}
.table-input:focus { border-color: #2563eb; }

/* ── Table 2 (transfer details) ── */
.table-responsive { overflow-x: auto; }
.transfer-table { width: 100%; border-collapse: collapse; border: 1px solid #000; }
.transfer-table th {
  border: 1px solid #000;
  background-color: #e0e0e0;
  padding: 8px;
  text-align: left;
  font-family: inherit;
}
.transfer-table td {
  border: 1px solid #000;
  padding: 10px;
  vertical-align: top;
  background-color: #fdfdfd;
}
.row-group { margin-bottom: 5px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }

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
.bat-toast {
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
  animation: bat-toast-in 0.25s ease;
  max-width: 360px;
}
.bat-toast--success { background: #1a7f3c; color: #fff; }
.bat-toast--error   { background: #c0392b; color: #fff; }
@keyframes bat-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #34495e;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
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
  .beneficiary-transfer-container { padding: 20px 14px; }
  .top-bar-title  { flex-direction: column; gap: 4px; }
  .addressee-row  { flex-direction: column; align-items: flex-start; }
  .bat-toast      { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .beneficiary-transfer-container,
  .beneficiary-transfer-container * { visibility: visible; }
  .beneficiary-transfer-container {
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
  .bat-toast,
  .top-bar-title { display: none !important; }
  .inline-box-input,
  .line-input,
  .table-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const INITIAL_FORM = {
  // Addressee
  addressee_name:          "",
  addressee_type:          "नगर",
  addressee_ward:          "१",
  province:                "",
  // Body
  fiscal_year_from:        "",
  fiscal_year_to:          "",
  target_local_level:      "",
  target_ward_no:          "",
  // Table 1
  beneficiary_name:        "",
  beneficiary_quarter:     "",
  beneficiary_citizenship: "",
  beneficiary_card_no:     "",
  // Table 2
  old_local_level:         MUNICIPALITY.name,
  new_local_level:         "",
  old_ward:                "",
  new_ward:                "",
  old_year:                "",
  old_quarter:             "",
  new_year:                "",
  new_quarter:             "",
  // ApplicantDetailsNp
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
};

const validate = (form) => {
  if (!form.fiscal_year_from.trim())    return "आर्थिक वर्ष (देखि) आवश्यक छ।";
  if (!form.fiscal_year_to.trim())      return "आर्थिक वर्ष (सम्म) आवश्यक छ।";
  if (!form.target_local_level.trim())  return "गन्तव्य स्थानीय तह आवश्यक छ।";
  if (!form.beneficiary_name.trim())    return "लाभग्राहीको नाम आवश्यक छ।";
  if (!form.applicantName.trim())       return "निवेदकको नाम आवश्यक छ।";
  if (!form.applicantAddress.trim())    return "निवेदकको ठेगाना आवश्यक छ।";
  if (!form.applicantCitizenship.trim())return "नागरिकता नं. आवश्यक छ।";
  if (!form.applicantPhone.trim())      return "फोन नं. आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function BeneficiaryAllowanceTransfer() {
  const { user } = useAuth();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
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

      <form onSubmit={handleSubmit} className="beneficiary-transfer-container">

        {/* Toast */}
        {toast && (
          <div className={`bat-toast bat-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          लाभग्राहीको लगत स्थानान्तरण ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; लाभग्राहीको लगत स्थानान्तरण
          </span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <p className="header-top-small bold-text">अनुसूची - ९</p>
          <p className="header-top-small">(दफा १८ (क) सँग सम्बन्धित)</p>
          <h1 className="municipality-name">
            {MUNICIPALITY.name} नगर कार्यपालिकाको कार्यालय
          </h1>
          <p className="address-text bold-text">{MUNICIPALITY.officeLine}</p>
          <h3 className="subject-title">
            विषय : लाभग्राहीको लगत स्थानान्तरण सम्बन्धमा
          </h3>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input
              name="addressee_name"
              type="text"
              className="line-input medium-input"
              value={form.addressee_name}
              onChange={handleChange}
              placeholder="प्राप्तकर्ताको नाम *"
            />
            <select
              name="addressee_type"
              className="inline-select"
              value={form.addressee_type}
              onChange={handleChange}
            >
              <option value="नगर">नगर</option>
              <option value="गाउँ">गाउँ</option>
            </select>
            <span>कार्यपालिकाको कार्यालय</span>
          </div>
          <div className="addressee-row">
            <label>वडा नं.</label>
            <input
              name="addressee_ward"
              type="text"
              className="line-input small-input"
              value={form.addressee_ward}
              onChange={handleChange}
            />
          </div>
          <div className="addressee-row">
            <span>जिल्ला {MUNICIPALITY.city || ""}</span>
            <span style={{ marginLeft: "50px" }}>प्रदेश</span>
            <input
              name="province"
              type="text"
              className="line-input medium-input"
              value={form.province}
              onChange={handleChange}
              placeholder="प्रदेश *"
            />
          </div>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            प्रस्तुत विषयमा तालिका - १ बमोजिमको विवरण भएको लाभग्राहीको तालिका -
            २ बमोजिमको स्थानीय तहमा सामाजिक सुरक्षा लगत स्थानान्तरणको लागि
            निवेदन दिएको हुँदा निजले आर्थिक वर्ष{" "}
            <input
              name="fiscal_year_from"
              type="text"
              className="inline-box-input medium-box"
              value={form.fiscal_year_from}
              onChange={handleChange}
              placeholder="आ.व. *"
              required
            />{" "}
            को लागि सामाजिक सुरक्षा भत्ता प्राप्त गर्न नियम अनुसार नवीकरण
            समेत गर्नुभएकाले निजको नाम यस{" "}
            <span className="bg-gray-text">{MUNICIPALITY.name}</span> को
            सामाजिक सुरक्षा भत्ता प्राप्त लाभग्राहीको मुख्य अभिलेखबाट नाम
            हटाई आर्थिक वर्ष{" "}
            <input
              name="fiscal_year_to"
              type="text"
              className="inline-box-input medium-box"
              value={form.fiscal_year_to}
              onChange={handleChange}
              placeholder="आ.व. *"
              required
            />{" "}
            चौमासिकबाट निजको निवेदन माग बमोजिम त्यस{" "}
            <input
              name="target_local_level"
              type="text"
              className="inline-box-input medium-box"
              value={form.target_local_level}
              onChange={handleChange}
              placeholder="स्थानीय तह *"
              required
            />{" "}
            को वडा नं.{" "}
            <input
              name="target_ward_no"
              type="text"
              className="inline-box-input tiny-box"
              value={form.target_ward_no}
              onChange={handleChange}
              required
            />{" "}
            बाट पाउनेगरि लगत कायम गरिदिनुहुन अनुरोध छ।
          </p>
        </div>

        {/* Tapsil */}
        <div className="tapsil-section">
          <h4 className="underline-text bold-text">तपसिल :</h4>
          <ol className="tapsil-list">
            <li>१. निवेदकको नागरिकताको प्रमाण पत्रको प्रतिलिपि थान एक ।</li>
            <li>२. बसाई सराई गरि आएको पत्रको प्रतिलिपि थान एक ।</li>
            <li>३. भत्ता बुझ्ने परिचय पत्रको सक्कलै थान एक ।</li>
          </ol>
        </div>

        {/* Table 1: Beneficiary details */}
        <div className="table-section">
          <p>तालिका नं. - १ : (लाभग्राहीको विवरण ।)</p>
          <table className="beneficiary-table">
            <tbody>
              {[
                ["नाम थर",               "beneficiary_name",        "नाम थर *"],
                ["भत्ता प्राप्त गरेको चौमासिक", "beneficiary_quarter", "चौमासिक *"],
                ["नागरिकता नं.",          "beneficiary_citizenship", "नागरिकता नं. *"],
                ["परिचय पत्र नं.",        "beneficiary_card_no",    "परिचय पत्र नं. *"],
              ].map(([label, name, placeholder]) => (
                <tr key={name}>
                  <td className="label-col">{label}</td>
                  <td className="input-col">
                    <input
                      name={name}
                      type="text"
                      className="table-input"
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 2: Transfer details */}
        <div className="table-section">
          <p>तालिका नं. - २ : (भत्ता स्थानान्तरणको लागि निवेदकले पेश गर्नुपर्ने विवरण ।)</p>
          <div className="table-responsive">
            <table className="transfer-table">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>साविक स्थानीय तह</th>
                  <th style={{ width: "50%" }}>हाल कायम भएको स्थानीय तह</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label>स्थानीय तह</label>
                    <input name="old_local_level" type="text" className="inline-box-input medium-box" value={form.old_local_level} onChange={handleChange} />
                  </td>
                  <td>
                    <label>स्थानीय तह</label>
                    <input name="new_local_level" type="text" className="inline-box-input medium-box" value={form.new_local_level} onChange={handleChange} placeholder="स्थानीय तह *" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="row-group">
                      <label>वडा नं.</label>
                      <input name="old_ward" type="text" className="inline-box-input tiny-box" value={form.old_ward} onChange={handleChange} />
                    </div>
                  </td>
                  <td>
                    <div className="row-group">
                      <label>वडा नं.</label>
                      <input name="new_ward" type="text" className="inline-box-input tiny-box" value={form.new_ward} onChange={handleChange} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="row-group"><label>भत्ता बुझेको अवधि</label></div>
                    <div className="row-group">
                      <label>आ. व.</label>
                      <input name="old_year"    type="text" className="inline-box-input small-box" value={form.old_year}    onChange={handleChange} />
                      <label>चौमासिक</label>
                      <input name="old_quarter" type="text" className="inline-box-input small-box" value={form.old_quarter} onChange={handleChange} />
                    </div>
                  </td>
                  <td>
                    <div className="row-group"><label>भत्ता बुझेको अवधि</label></div>
                    <div className="row-group">
                      <label>आ. व.</label>
                      <input name="new_year"    type="text" className="inline-box-input small-box" value={form.new_year}    onChange={handleChange} />
                      <label>चौमासिक</label>
                      <input name="new_quarter" type="text" className="inline-box-input small-box" value={form.new_quarter} onChange={handleChange} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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