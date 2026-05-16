// ElectricityCapacityIncrease.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from ElectricityCapacityIncrease.css)
   All classes prefixed with "eci-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .eci-container {
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
  }

  /* ── Utility ── */
  .eci-bold      { font-weight: bold; }
  .eci-underline { text-decoration: underline; }
  .eci-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }

  /* ── Top Bar ── */
  .eci-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .eci-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Print-only header ── */
  .eci-print-only { display: none; }

  /* ── Form layout ── */
  .eci-form-main { display: flex; flex-direction: column; gap: 16px; }

  .eci-form-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex-wrap: wrap;
  }
  .eci-form-row label {
    font-weight: bold;
    font-size: 1rem;
    min-width: 160px;
    padding-top: 8px;
  }
  .eci-meta-row              { align-items: center; gap: 12px; }
  .eci-meta-row label        { min-width: auto; padding-top: 0; }

  /* ── Inputs ── */
  .eci-input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    background-color: #fff;
    color: #000;
    outline: none;
    box-sizing: border-box;
    min-width: 0;
  }
  .eci-input:focus          { border-color: #2c3e50; }
  .eci-input.eci-input-err  { border-color: crimson; }
  textarea.eci-input         { resize: vertical; width: 100%; flex: unset; }

  /* ── Error text ── */
  .eci-error { color: crimson; font-size: 0.82rem; margin-top: 2px; }

  /* ── Applicant section ── */
  .eci-applicant-section {
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px 20px;
  }
  .eci-applicant-section h4 {
    margin: 0 0 12px 0;
    font-size: 1rem;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .eci-applicant-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    width: 100%;
  }
  .eci-applicant-field { display: flex; flex-direction: column; gap: 4px; }
  .eci-applicant-field label {
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    min-width: unset;
    padding-top: 0;
  }
  .eci-applicant-field .eci-input { flex: unset; width: 100%; }

  /* ── Actions ── */
  .eci-actions { justify-content: center; margin-top: 10px; }
  .eci-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .eci-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .eci-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .eci-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .eci-container,
    .eci-container * { visibility: visible; }
    .eci-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      max-width: 100%;
      padding: 20px 40px;
      box-shadow: none;
      background: white;
    }
    .eci-top-bar,
    .eci-actions  { display: none !important; }
    .eci-print-only { display: block !important; }
    .eci-input {
      border: none;
      border-bottom: 1px solid #999;
      border-radius: 0;
      background: transparent !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const FORM_KEY = "electricity-capacity-increase";
const API_URL  = `/api/forms/${FORM_KEY}`;
const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  letter_no:               "",
  reference_no:            "",
  date_bs:                 "",
  date_ad:                 todayIso(),
  recipient_name:          "",
  recipient_address:       "",
  ward_no:                 "",
  location:                "",
  business_name:           "",
  business_owner:          "",
  reason:                  "",
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const ElectricityCapacityIncrease = () => {
  const { user } = useAuth();
  const [form, setForm]         = useState(initialForm);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage]   = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    if (!form.recipient_name.trim())  err.recipient_name  = "आवश्यक छ";
    if (!form.location.trim())        err.location        = "आवश्यक छ";
    if (!form.business_name.trim())   err.business_name   = "आवश्यक छ";
    if (!form.applicant_name.trim())  err.applicant_name  = "आवश्यक छ";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);
    try {
      const payload = {
        letter_no:               form.letter_no      || null,
        reference_no:            form.reference_no   || null,
        date_bs:                 form.date_bs        || null,
        date_ad:                 form.date_ad        || null,
        recipient_name:          form.recipient_name,
        recipient_address:       form.recipient_address,
        municipality:            MUNICIPALITY.name,
        ward_no:                 user?.ward || form.ward_no || null,
        location:                form.location,
        business_name:           form.business_name,
        business_owner:          form.business_owner,
        reason:                  form.reason,
        applicant_name:          form.applicant_name,
        applicant_address:       form.applicant_address,
        applicant_citizenship_no: form.applicant_citizenship_no,
        applicant_phone:         form.applicant_phone,
      };

      const res = await axiosInstance.post(API_URL, payload);
      const savedId = res.data?.id || "unknown";
      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})` });
      setTimeout(() => window.print(), 300);
      setForm({ ...initialForm, date_ad: todayIso() });
    } catch (error) {
      const info = error.response?.data?.message || error.message || "Failed to save";
      setMessage({ type: "error", text: `Error: ${info}` });
      console.error("Submit error", error);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="eci-container">

        {/* ── Top Bar (hidden on print) ── */}
        <div className="eci-top-bar">
          <span>विद्युत क्षमता बढाउन</span>
          <span className="eci-breadcrumb">
            {MUNICIPALITY.name} &gt; विद्युत क्षमता बढाउन
          </span>
        </div>

        {/* ── Print-only municipality header ── */}
        <div className="eci-print-only">
          <MunicipalityHeader showLogo={true} />
          <h2 style={{ textAlign: "center", marginBottom: "16px" }}>विद्युत क्षमता बढाउन</h2>
        </div>

        <form className="eci-form-main" onSubmit={handleSubmit}>

          {/* ── Meta row ── */}
          <div className="eci-form-row eci-meta-row">
            <label>पत्र संख्या :</label>
            <input name="letter_no"   value={form.letter_no}   onChange={handleChange} className="eci-input" placeholder="पत्र संख्या" />
            <label>चलानी नं. :</label>
            <input name="reference_no" value={form.reference_no} onChange={handleChange} className="eci-input" placeholder="चलानी नं." />
            <label>मिति (बीएस) :</label>
            <input name="date_bs"     value={form.date_bs}     onChange={handleChange} className="eci-input" placeholder="२०८२-०८-०६" />
          </div>

          {/* ── Recipient ── */}
          <div className="eci-form-row">
            <label>प्राप्त गर्ने : <span className="eci-red">*</span></label>
            <input
              name="recipient_name"
              value={form.recipient_name}
              onChange={handleChange}
              className={`eci-input${errors.recipient_name ? " eci-input-err" : ""}`}
              placeholder="प्राप्त गर्नेको नाम"
            />
            {errors.recipient_name && <span className="eci-error">{errors.recipient_name}</span>}
          </div>

          {/* ── Recipient address ── */}
          <div className="eci-form-row">
            <label>ठेगाना :</label>
            <input name="recipient_address" value={form.recipient_address} onChange={handleChange} className="eci-input" placeholder="ठेगाना" />
          </div>

          {/* ── Ward ── */}
          <div className="eci-form-row">
            <label>वडा नं. :</label>
            <input
              name="ward_no"
              value={user?.ward || form.ward_no}
              onChange={handleChange}
              className="eci-input"
              placeholder="वडा नं."
              readOnly={!!user?.ward}
            />
          </div>

          {/* ── Location ── */}
          <div className="eci-form-row">
            <label>स्थान (ठाउँ) : <span className="eci-red">*</span></label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className={`eci-input${errors.location ? " eci-input-err" : ""}`}
              placeholder="स्थानको नाम"
            />
            {errors.location && <span className="eci-error">{errors.location}</span>}
          </div>

          {/* ── Business ── */}
          <div className="eci-form-row">
            <label>व्यवसाय/संचालक : <span className="eci-red">*</span></label>
            <input
              name="business_name"
              value={form.business_name}
              onChange={handleChange}
              className={`eci-input${errors.business_name ? " eci-input-err" : ""}`}
              placeholder="व्यवसायको नाम"
            />
            <input
              name="business_owner"
              value={form.business_owner}
              onChange={handleChange}
              className="eci-input"
              placeholder="संचालक"
            />
            {errors.business_name && <span className="eci-error">{errors.business_name}</span>}
          </div>

          {/* ── Reason ── */}
          <div className="eci-form-row">
            <label>कारण / विवरण :</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={4}
              className="eci-input"
              placeholder="कारण वा विवरण लेख्नुहोस्"
            />
          </div>

          {/* ── Applicant details ── */}
          <div className="eci-form-row eci-applicant-section">
            <h4>निवेदकको विवरण</h4>
            <div className="eci-applicant-grid">
              <div className="eci-applicant-field">
                <label>नाम : <span className="eci-red">*</span></label>
                <input
                  name="applicant_name"
                  value={form.applicant_name}
                  onChange={handleChange}
                  className={`eci-input${errors.applicant_name ? " eci-input-err" : ""}`}
                  placeholder="निवेदकको नाम"
                />
                {errors.applicant_name && <span className="eci-error">{errors.applicant_name}</span>}
              </div>
              <div className="eci-applicant-field">
                <label>ठेगाना :</label>
                <input name="applicant_address"        value={form.applicant_address}        onChange={handleChange} className="eci-input" placeholder="ठेगाना" />
              </div>
              <div className="eci-applicant-field">
                <label>नागरिकता नं. :</label>
                <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={handleChange} className="eci-input" placeholder="नागरिकता नं." />
              </div>
              <div className="eci-applicant-field">
                <label>फोन :</label>
                <input name="applicant_phone"          value={form.applicant_phone}          onChange={handleChange} className="eci-input" placeholder="फोन नम्बर" />
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="eci-form-row eci-actions">
            <button type="submit" className="eci-save-print-btn" disabled={submitting}>
              {submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          {message && (
            <div style={{
              textAlign: "center",
              marginTop: 12,
              color: message.type === "error" ? "crimson" : "green",
              fontWeight: "bold",
            }}>
              {message.text}
            </div>
          )}

        </form>

        <div className="eci-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </div>
    </>
  );
};

export default ElectricityCapacityIncrease;