// src/pages/MRP/PassportRecommendation.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import axios from "../../utils/axiosInstance";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "passport-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
/* ── Container ── */
.passport-rec-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: "Mangal", "Noto Sans Devanagari", "Kalimati", sans-serif;
  color: #000;
  position: relative;
  box-sizing: border-box;
}

/* ── Toast ── */
.pr-toast {
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
  font-family: "Mangal", "Noto Sans Devanagari", sans-serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: pr-toast-in 0.25s ease;
  max-width: 360px;
}
.pr-toast--success { background: #1a7f3c; color: #fff; }
.pr-toast--error   { background: #c0392b; color: #fff; }
@keyframes pr-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Required star ── */
.pr-required, .required {
  color: #c0392b;
  font-weight: 700;
  margin-left: 2px;
  font-size: 0.95rem;
}

/* ── Header ── */
.pr-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
  text-align: center;
}
.pr-logo { width: 72px; height: auto; flex-shrink: 0; }
.pr-header-text { display: flex; flex-direction: column; gap: 2px; }
.pr-muni-name  { color: #c0392b; font-size: 1.85rem; font-weight: 700; line-height: 1.2; }
.pr-ward-name  { color: #c0392b; font-size: 1.5rem;  font-weight: 700; }
.pr-address    { color: #c0392b; font-size: 0.9rem; }

/* ── Divider ── */
.pr-divider {
  border: none;
  border-top: 2px solid #bbb;
  margin: 14px 0 20px;
}

/* ── Meta row ── */
.pr-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  margin-bottom: 14px;
  align-items: center;
}

/* ── Inline field ── */
.pr-field-inline { display: flex; align-items: center; gap: 6px; }
.pr-field-inline label {
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  color: #222;
}
.pr-field-inline input,
.pr-field-inline select {
  padding: 5px 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  background: #fff;
  color: #111;
  box-sizing: border-box;
}

/* ── Addressee ── */
.pr-addressee { margin-bottom: 18px; display: flex; flex-direction: column; gap: 6px; }
.pr-addressee-line {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 4px 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
  width: 280px;
  max-width: 100%;
  color: #111;
  box-sizing: border-box;
}

/* ── Body paragraph ── */
.pr-body-paragraph {
  font-size: 1rem;
  line-height: 3;
  text-align: justify;
  color: #111;
  margin-bottom: 20px;
}
.pr-inline-wrap { display: inline-flex; align-items: center; gap: 2px; }
.pr-inline-input {
  display: inline-block;
  padding: 3px 6px;
  font-family: inherit;
  font-size: 0.92rem;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  color: #111;
  width: 130px;
  box-sizing: border-box;
  vertical-align: baseline;
  margin: 0 4px;
}
.pr-inline-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}
.pr-inline-input.pr-short  { width: 90px; }
.pr-inline-input.pr-xshort { width: 60px; }
.pr-inline-input.pr-long   { width: 180px; }
.pr-inline-input.pr-date   { width: 160px; }

/* ── Signature ── */
.pr-signature-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 32px 16px 24px 0;
  gap: 8px;
}
.pr-signature-line {
  width: 220px;
  border-bottom: 1px dotted #555;
  text-align: center;
  padding-bottom: 4px;
  font-size: 0.9rem;
  color: #444;
}
.pr-select {
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  background: #fff;
  color: #111;
  min-width: 180px;
  cursor: pointer;
}
.pr-select:focus { outline: none; border-color: #2563eb; }

/* ── ApplicantDetailsNp box ── */
.applicant-details-box {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(255,255,255,0.5);
}
.applicant-details-box h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #555;
  margin: 0 0 14px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; }
.detail-group { display: flex; flex-direction: column; gap: 5px; }
.detail-group label { font-size: 0.88rem; font-weight: 600; color: #333; }
.detail-input {
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  color: #111;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.detail-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}
.detail-input.bg-gray { background-color: #f3f5f7; }

/* ── Notes ── */
.pr-notes-group { display: flex; flex-direction: column; gap: 5px; margin-top: 16px; }
.pr-notes-group label { font-size: 0.88rem; font-weight: 600; color: #333; }
.pr-notes-group textarea {
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  color: #111;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  transition: border-color 0.15s;
}
.pr-notes-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* ── Footer / Submit ── */
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
  .passport-rec-container { padding: 20px 14px; }
  .pr-header { flex-direction: column; gap: 10px; }
  .pr-meta-row { flex-direction: column; gap: 10px; }
  .details-grid { grid-template-columns: 1fr; }
  .pr-body-paragraph { line-height: 3.2; }
  .pr-inline-input,
  .pr-inline-input.pr-long,
  .pr-inline-input.pr-date { width: 100px; }
  .pr-signature-section { align-items: flex-start; margin-right: 0; }
  .pr-toast { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .passport-rec-container,
  .passport-rec-container * { visibility: visible; }
  .passport-rec-container {
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
  .pr-toast,
  .pr-required,
  .required { display: none !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */
const INITIAL_FORM_DATA = (user) => ({
  letterNo: "२०८२/८३",
  refNo: "",
  dateOfLetter: new Date().toISOString().slice(0, 10),
  dayText: "",
  headerTo: "श्री ईलाका प्रशासन कार्यालय,",
  headerDistrict: MUNICIPALITY.city || "",
  mainDistrict: MUNICIPALITY.city || "",
  prevLocationType: "साबिक",
  prevWardNo: "",
  currentMunicipality: MUNICIPALITY.name || "",
  currentWardNo: user?.ward || "1",
  residentAddressType: "स्थायी",
  residentDistrict: "",
  citizenIssueDate: "",
  citizenNo: "",
  applicantName: "",
  designation: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  notes: "",
});

const validate = (formData) => {
  const required = [
    ["headerDistrict",    "हेडर जिल्ला आवश्यक छ।"],
    ["mainDistrict",      "जिल्ला आवश्यक छ।"],
    ["currentMunicipality","नगरपालिका आवश्यक छ।"],
    ["residentDistrict",  "बासिन्दाको जिल्ला आवश्यक छ।"],
    ["citizenIssueDate",  "नागरिकता जारी मिति आवश्यक छ।"],
    ["citizenNo",         "नागरिकता नं. आवश्यक छ।"],
    ["applicantName",     "निवेदकको नाम आवश्यक छ।"],
    ["designation",       "पद छनोट गर्नुहोस्।"],
    ["applicantAddress",  "निवेदकको ठेगाना आवश्यक छ।"],
    ["applicantCitizenship","नागरिकता नं. आवश्यक छ।"],
    ["applicantPhone",    "फोन नं. आवश्यक छ।"],
  ];
  for (const [field, msg] of required) {
    if (!formData[field]?.toString().trim()) return msg;
  }
  // currentWardNo checked separately since it can be a number
  if (!formData.currentWardNo?.toString().trim()) return "हालको वडा नं. आवश्यक छ।";
  return null;
};

const toPayload = (data) => ({
  letter_no:           data.letterNo           || null,
  ref_no:              data.refNo              || null,
  date_of_letter:      data.dateOfLetter       || null,
  day_text:            data.dayText            || null,
  header_to:           data.headerTo           || null,
  header_district:     data.headerDistrict     || null,
  main_district:       data.mainDistrict       || null,
  prev_location_type:  data.prevLocationType   || null,
  prev_ward_no:        data.prevWardNo         || null,
  current_municipality:data.currentMunicipality|| null,
  current_ward_no:     data.currentWardNo      || null,
  resident_address_type:data.residentAddressType|| null,
  resident_district:   data.residentDistrict   || null,
  citizen_issue_date:  data.citizenIssueDate   || null,
  citizen_no:          data.citizenNo          || null,
  applicant_name:      data.applicantName      || null,
  designation:         data.designation        || null,
  applicant_address:   data.applicantAddress   || null,
  applicant_citizenship:data.applicantCitizenship|| null,
  applicant_phone:     data.applicantPhone     || null,
  notes:               data.notes              || null,
});

/* ─────────────────────────── Component ─────────────────────────── */
const PassportRecommendation = () => {
  const { user } = useAuth();

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const [formData, setFormData] = useState(() => INITIAL_FORM_DATA(user));
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null); // { type: 'success'|'error', text: string }

  /* helpers */
  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* submit */
  const handleSaveAndPrint = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(formData);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, toPayload(formData));
      showToast("success", `सफलतापूर्वक सेभ भयो (id: ${res.data?.id ?? "unknown"})`);
      setTimeout(() => window.print(), 300);
    } catch (err) {
      const info = err.response?.data?.message || err.message || "सेभ गर्न असफल भयो।";
      showToast("error", info);
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── render ── */
  return (
    <>
      {/* Inject styles once */}
      <style>{styles}</style>

      <form className="passport-rec-container" onSubmit={handleSaveAndPrint}>

        {/* Toast */}
        {toast && (
          <div className={`pr-toast pr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Municipality Header */}
        <div className="pr-header">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" className="pr-logo" />
          <div className="pr-header-text">
            <div className="pr-muni-name">{MUNICIPALITY.name}</div>
            <div className="pr-ward-name">{wardLabel}</div>
            <div className="pr-address">{MUNICIPALITY.officeLine}</div>
            <div className="pr-address">{MUNICIPALITY.provinceLine}</div>
          </div>
        </div>

        <div className="pr-divider" />

        {/* Meta row */}
        <div className="pr-meta-row">
          <div className="pr-field-inline">
            <label>पत्र संख्या :</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="pr-field-inline">
            <label>चलानी नं. :</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
          <div className="pr-field-inline">
            <label>मिति :</label>
            <input type="date" name="dateOfLetter" value={formData.dateOfLetter} onChange={handleChange} />
          </div>
        </div>

        <div className="pr-field-inline" style={{ marginBottom: 12 }}>
          <label>नेपाली दिन/विवरण :</label>
          <input
            type="text"
            name="dayText"
            value={formData.dayText}
            onChange={handleChange}
            style={{ width: 260 }}
          />
        </div>

        {/* Addressee */}
        <div className="pr-addressee">
          <input
            type="text"
            name="headerTo"
            value={formData.headerTo}
            onChange={handleChange}
            className="pr-addressee-line"
          />
          <div className="pr-field-inline">
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              className="pr-addressee-line"
              placeholder="जिल्ला"
            />
            <span className="pr-required">*</span>
          </div>
        </div>

        {/* Body paragraph */}
        <div className="pr-body-paragraph">
          <span>जिल्ला</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="mainDistrict"
              value={formData.mainDistrict}
              onChange={handleChange}
              className="pr-inline-input"
            />
            <span className="pr-required">*</span>
          </span>

          <span>(</span>
          <input
            type="text"
            name="prevLocationType"
            value={formData.prevLocationType}
            onChange={handleChange}
            className="pr-inline-input pr-short"
          />
          <span>)</span>

          <input
            type="text"
            name="prevWardNo"
            placeholder="साविक वडा"
            value={formData.prevWardNo}
            onChange={handleChange}
            className="pr-inline-input pr-short"
          />

          <span>हाल वडा नं.</span>
          <input
            type="text"
            name="currentWardNo"
            value={formData.currentWardNo}
            onChange={handleChange}
            className="pr-inline-input pr-xshort"
          />

          <span>हाल</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="currentMunicipality"
              value={formData.currentMunicipality}
              onChange={handleChange}
              className="pr-inline-input pr-long"
            />
            <span className="pr-required">*</span>
          </span>

          <span>स्थायी/अस्थायी :</span>
          <input
            type="text"
            name="residentAddressType"
            value={formData.residentAddressType}
            onChange={handleChange}
            className="pr-inline-input pr-short"
          />

          <span>जिल्ला</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="residentDistrict"
              value={formData.residentDistrict}
              onChange={handleChange}
              className="pr-inline-input"
              placeholder="जिल्ला"
            />
            <span className="pr-required">*</span>
          </span>

          <span>नागरिकता जारी मिति :</span>
          <span className="pr-inline-wrap">
            <input
              type="date"
              name="citizenIssueDate"
              value={formData.citizenIssueDate}
              onChange={handleChange}
              className="pr-inline-input pr-date"
            />
            <span className="pr-required">*</span>
          </span>

          <span>नागरिकता नं. :</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="citizenNo"
              value={formData.citizenNo}
              onChange={handleChange}
              className="pr-inline-input"
            />
            <span className="pr-required">*</span>
          </span>

          <span>निवेदक :</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              className="pr-inline-input pr-long"
            />
            <span className="pr-required">*</span>
          </span>
          <span>को राहदानी सिफारिस गरिन्छ।</span>
        </div>

        {/* Signature / Designation */}
        <div className="pr-signature-section">
          <div className="pr-signature-line">हस्ताक्षर</div>
          <div className="pr-field-inline">
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="pr-select"
            >
              <option value="">पद छनोट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
            <span className="pr-required">*</span>
          </div>
        </div>

        {/* Applicant Details (shared component) */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Notes */}
        <div className="pr-notes-group">
          <label>कैफियत / टिप्पणी</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* Submit */}
        <div className="form-footer">
          <button type="submit" disabled={loading} className="save-print-btn">
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default PassportRecommendation;