// src/pages/planning/WithdrawalFundRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "withdrawal-fund-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.withdrawal-fund-container {
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
.addressee-plain-text { margin-left: 10px; font-size: 1.05rem; align-self: center; }

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
.meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.meta-left p,
.meta-right p  { margin: 5px 0; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 5px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

/* ── Body paragraph ── */
.body-paragraph {
  font-size: 1.05rem;
  line-height: 2.8;
  text-align: justify;
  margin-bottom: 30px;
}

/* ── Shared input bases ── */
.withdrawal-fund-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
}
.withdrawal-fund-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
}
.withdrawal-fund-container .inline-box-input {
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
.withdrawal-fund-container .line-input:focus,
.withdrawal-fund-container .dotted-input:focus,
.withdrawal-fund-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.medium-input     { width: 200px; }
.medium-box       { width: 180px; }
.long-box         { width: 250px; }
.long-input       { width: 300px; }
.full-width-input { width: 100%; }

/* ── Inline star wrapper ── */
.inline-input-wrapper {
  position: relative;
  display: inline-block;
}
.input-required-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 14px;
}
.inline-input-wrapper input { padding-left: 18px; }

/* ── Tapsil ── */
.tapsil-section { margin-bottom: 30px; }
.tapsil-list    { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.tapsil-item    { display: flex; align-items: center; gap: 10px; }
.tapsil-item label { min-width: 250px; font-weight: 600; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
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

/* ── ApplicantDetailsNp box ── */
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
.withdrawal-fund-container .applicant-details-box .details-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 18px !important;
}
.detail-group       { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  box-sizing: border-box;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray { background-color: #eef2f5; }
.withdrawal-fund-container .applicant-details-box .detail-input { max-width: 400px; width: 100%; }
.required { color: red; margin-left: 4px; }

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

/* ── Toast ── */
.wfr-toast {
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
  animation: wfr-toast-in 0.25s ease;
  max-width: 360px;
}
.wfr-toast--success { background: #1a7f3c; color: #fff; }
.wfr-toast--error   { background: #c0392b; color: #fff; }
@keyframes wfr-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .withdrawal-fund-container { padding: 20px 14px; }
  .meta-data-row  { flex-direction: column; gap: 8px; }
  .top-bar-title  { flex-direction: column; gap: 4px; }
  .addressee-row  { flex-direction: column; align-items: flex-start; }
  .long-box, .medium-box, .long-input, .medium-input { width: 100%; max-width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .withdrawal-fund-container,
  .withdrawal-fund-container * { visibility: visible; }
  .withdrawal-fund-container {
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
  .wfr-toast,
  .top-bar-title { display: none !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const TAPSIL_FIELDS = [
  { label: "१. बजेट उपशिर्षक नं.",                  name: "budget_subcode"    },
  { label: "२. खर्चको प्रकार",                       name: "expense_type"      },
  { label: "३. योजना तथा कार्यक्रमको नाम",           name: "program_name"      },
  { label: "४. कार्यक्रमको लागि विनियोजित रकम रु",  name: "allocated_amount"  },
  { label: "५. यस अघि भुक्तानी रकम रु",              name: "previous_payment"  },
  { label: "६. हाल भुक्तानी हुने रकम रु",            name: "current_payment"   },
  { label: "७. भुक्तानी पाउनेको नाम थर",             name: "payee_name"        },
];

const INITIAL_FORM = {
  chalan_no:                "",
  addressee_line1:          "प्रमुख प्रशासकीय अधिकृत",
  addressee_municipality:   MUNICIPALITY.name,
  addressee_implement_unit: "",
  addressee_district:       "",
  body_municipality:        MUNICIPALITY.name,
  fiscal_year:              "२०८२/८३",
  requested_amount:         "",
  body_municipality_2:      MUNICIPALITY.name,
  committee_chair:          "",
  consumer_committee_name:  "",
  implement_unit_name:      "",
  budget_subcode:           "",
  expense_type:             "",
  program_name:             "",
  allocated_amount:         "",
  previous_payment:         "",
  current_payment:          "",
  payee_name:               "",
  signatory_name:           "",
  signatory_designation:    "",
  applicantName:            "",
  applicantAddress:         "",
  applicantCitizenship:     "",
  applicantPhone:           "",
};

const toPayload = (form) =>
  Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
  );

const StarInput = ({ className = "", ...props }) => (
  <div className="inline-input-wrapper">
    <span className="input-required-star">*</span>
    <input className={className} {...props} />
  </div>
);

/* ─────────────────────────── Component ─────────────────────────── */
export default function WithdrawalFundRecommendation() {
  const { user } = useAuth();

  const [form, setForm]     = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]   = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Single save-and-print handler */
  const handleSaveAndPrint = async (e) => {
    e.preventDefault();
    if (loading) return;

    const required = ["requested_amount", "committee_chair", "signatory_name"];
    const missing  = required.filter((k) => !form[k]?.trim());
    if (missing.length) {
      showToast("error", "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, toPayload(form));
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
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

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber} नं. वडा कार्यालय`;

  return (
    <>
      <style>{styles}</style>

      <form onSubmit={handleSaveAndPrint} className="withdrawal-fund-container">

        {/* Toast */}
        {toast && (
          <div className={`wfr-toast wfr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          रकम निकासा सिफारिस ।
          <span className="top-right-bread">योजना &gt; रकम निकासा सिफारिस</span>
        </div>

        {/* Letterhead */}
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
              <StarInput name="chalan_no" type="text" className="dotted-input small-input" value={form.chalan_no} onChange={handleChange} />
            </p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">रकम निकासा सम्बन्धमा।</span></p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <StarInput name="addressee_line1"        type="text" className="line-input long-box" value={form.addressee_line1}        onChange={handleChange} />
          </div>
          <div className="addressee-row">
            <StarInput name="addressee_municipality" type="text" className="line-input long-box" value={form.addressee_municipality} onChange={handleChange} />
            <span className="addressee-plain-text">नगर कार्यपालिकाको कार्यालय</span>
          </div>
          <div className="addressee-row">
            <StarInput name="addressee_implement_unit" type="text" className="line-input long-box" placeholder="कार्यान्वयन इकाइ" value={form.addressee_implement_unit} onChange={handleChange} />
            <StarInput name="addressee_district"       type="text" className="line-input long-box" placeholder="जिल्ला"           value={form.addressee_district}       onChange={handleChange} />
          </div>
        </div>

        {/* Body paragraph */}
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस{" "}
          <StarInput name="body_municipality" className="inline-box-input long-box" value={form.body_municipality} onChange={handleChange} />{" "}
          सभाबाट स्वीकृत आ.व.{" "}
          <StarInput name="fiscal_year" type="text" className="inline-box-input medium-box" value={form.fiscal_year} onChange={handleChange} />{" "}
          को स्वीकृत वार्षिक बजेट तथा कार्यक्रम अन्तर्गत विनियोजन भएको बजेट बाट{" "}
          <StarInput name="requested_amount" type="text" className="inline-box-input medium-box" placeholder="रकम" value={form.requested_amount} onChange={handleChange} required />{" "}
          कार्य गर्न प्राबिधिक ल.ई अनुसार योजना सम्झौता भई आयोजना सम्पन्न भएकोले{" "}
          <StarInput name="body_municipality_2" type="text" className="inline-box-input long-box" value={form.body_municipality_2} onChange={handleChange} />{" "}
          रकम निकासा गर्न सिफारिस गरी पाउँ भनि यस वडा कार्यालयमा समितिका{" "}
          <StarInput name="committee_chair" type="text" className="inline-box-input medium-box" placeholder="अध्यक्षको नाम" value={form.committee_chair} onChange={handleChange} required />{" "}
          निवेदन दिनुभएको सो सम्बन्धमा{" "}
          <StarInput name="consumer_committee_name" type="text" className="inline-box-input medium-box" placeholder="उपभोक्ता समिति" value={form.consumer_committee_name} onChange={handleChange} />{" "}
          उपभोक्ता समितिले{" "}
          <StarInput name="implement_unit_name" type="text" className="inline-box-input medium-box" placeholder="कार्यान्वयन इकाइ" value={form.implement_unit_name} onChange={handleChange} />{" "}
          निर्माण कार्य सम्पन्न गरेकोले तहाँ कार्यालयको नियमानुसार प्राविधिक
          लागत मूल्याङ्कन फाराम अनुसारको रकम निकासा गरिदिनु हुन सिफारिस साथ
          अनुरोध गरिन्छ ।
        </p>

        {/* Tapsil */}
        <div className="tapsil-section">
          <h4 className="underline-text bold-text">तपशिल</h4>
          <div className="tapsil-list">
            {TAPSIL_FIELDS.map(({ label, name }) => (
              <div className="tapsil-item" key={name}>
                <label>{label}</label>
                <StarInput
                  name={name}
                  type="text"
                  className="line-input long-input"
                  value={form[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <StarInput
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              placeholder="नाम, थर"
              value={form.signatory_name}
              onChange={handleChange}
              required
            />
            <select
              name="signatory_designation"
              className="designation-select"
              value={form.signatory_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* Footer */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
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