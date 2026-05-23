// src/pages/business/IndustryTransferAcceptanceLetter.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "industry-transfer-request";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.itar-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  background: #d6d7da;
}

/* ── Top bar ── */
.itar-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.itar-top-left  { font-weight: 600; }
.itar-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.itar-container {
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
.itar-bold-text      { font-weight: bold; }
.itar-underline-text { text-decoration: underline; }

/* ── Header ── */
.itar-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.itar-header-logo img     { position: absolute; left: 0; top: 0; width: 80px; }
.itar-header-text         { display: flex; flex-direction: column; align-items: center; }
.itar-municipality-name   { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.itar-ward-title          { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.itar-address-text,
.itar-province-text       { color: #e74c3c; margin: 0; font-size: 1rem; }

/* ── Meta row ── */
.itar-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; flex-wrap: wrap; gap: 8px; }
.itar-meta-left p,
.itar-meta-right p  { margin: 5px 0; }
.itar-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.itar-dotted-input:focus { border-color: #2563eb; }
.itar-small-input { width: 120px; }

/* ── Annex heading ── */
.itar-annex       { text-align: center; font-size: 1rem; line-height: 1.8; margin: 20px 0 10px; }
.itar-annex-title { font-weight: 700; font-size: 1.15rem; margin-top: 4px; }

/* ── Addressee ── */
.itar-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.itar-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

/* ── Subject ── */
.itar-subject-section { text-align: center; margin: 20px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Body ── */
.itar-form-body       { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }
.itar-body-paragraph  { margin: 0; }

/* ── Inline inputs ── */
.itar-inline-box-input {
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
.itar-inline-box-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.itar-tiny-box   { width: 50px; }
.itar-small-box  { width: 110px; }
.itar-medium-box { width: 160px; }
.itar-long-box   { width: 260px; }

/* ── Reason block ── */
.itar-reason-block   { margin: 20px 0; }
.itar-reason-label   { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.itar-reason-textarea {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 3px;
  outline: none;
  box-sizing: border-box;
  min-height: 100px;
}
.itar-reason-textarea:focus { border-color: #2563eb; }

/* ── Docs + signature grid ── */
.itar-bottom-grid { display: flex; justify-content: space-between; gap: 20px; margin-top: 20px; align-items: flex-start; flex-wrap: wrap; }
.itar-docs        { font-size: 1rem; flex: 1; min-width: 200px; }
.itar-docs-title  { font-weight: 600; margin-bottom: 6px; }
.itar-docs ol     { margin: 4px 0; padding-left: 20px; line-height: 2.8; }

/* ── Signature box ── */
.itar-sign-box {
  border: 1px solid #c1c1c1;
  padding: 14px 18px;
  font-size: 1rem;
  min-width: 280px;
  background-color: #fff;
  border-radius: 3px;
}
.itar-sign-title { text-align: center; font-weight: 600; margin-bottom: 12px; font-size: 1.05rem; }
.itar-sign-field { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.itar-sign-field span { white-space: nowrap; min-width: 55px; }
.itar-sign-field .itar-inline-box-input { flex: 1; margin: 0; width: auto; }
.itar-designation-select {
  flex: 1;
  padding: 4px 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 3px;
  outline: none;
}
.itar-designation-select:focus { border-color: #2563eb; }

/* ── Applicant details box ── */
.applicant-details-box {
  border: 2px solid #999;
  padding: 20px;
  background-color: transparent;
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
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  background-color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.itar-toast {
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
  animation: itar-toast-in 0.25s ease;
  max-width: 360px;
}
.itar-toast--success { background: #1a7f3c; color: #fff; }
.itar-toast--error   { background: #c0392b; color: #fff; }
@keyframes itar-toast-in {
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
  .itar-container  { padding: 20px 14px; }
  .itar-topbar     { flex-direction: column; gap: 4px; }
  .itar-toast      { right: 12px; left: 12px; max-width: none; }
  .itar-bottom-grid { flex-direction: column; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .itar-container,
  .itar-container * { visibility: visible; }
  .itar-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 10mm 14mm;
    background: white;
  }
  .itar-topbar,
  .form-footer,
  .copyright-footer,
  .itar-toast { display: none !important; }
  input, select, textarea { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = (user) => ({
  date:                 new Date().toISOString().slice(0, 10),
  to_line1:             "",
  to_line2:             "",
  district:             MUNICIPALITY.city || "",
  from_municipality:    "",
  from_ward:            "",
  industry_name:        "",
  to_municipality:      MUNICIPALITY.name,
  to_ward:              user?.ward || "",
  transfer_reason:      "",
  doc_1:                "",
  doc_2:                "",
  doc_3:                "",
  signer_name:          "",
  signer_position:      "",
  signer_date:          "",
  signer_address:       "",
  ward_no:              user?.ward || "",
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
});

/* ─────────────────────────── Component ─────────────────────────── */
export default function IndustryTransferAcceptanceLetter() {
  const { user } = useAuth();

  const [form, setForm]   = useState(() => makeInitialForm(user));
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axiosInstance.post(API_URL, payload);
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
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

      <div className="itar-page">

        {/* Toast */}
        {toast && (
          <div className={`itar-toast itar-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="itar-topbar">
          <div className="itar-top-left">उद्योग स्थानान्तरण निवेदन ।</div>
          <div className="itar-top-right">अवलोकन पृष्ठ / उद्योग स्थानान्तरण निवेदन</div>
        </header>

        <form className="itar-container" onSubmit={handleSubmit}>

          {/* Header */}
          <div className="itar-form-header-section">
            <div className="itar-header-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
            </div>
            <div className="itar-header-text">
              <h1 className="itar-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="itar-ward-title">{wardLabel}</h2>
              <p className="itar-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="itar-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="itar-meta-data-row">
            <div className="itar-meta-left">
              <p>पत्र संख्या : <span className="itar-bold-text">२०८२/८३</span></p>
            </div>
            <div className="itar-meta-right">
              <p>
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  className="itar-dotted-input itar-small-input"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="२०८२-०८-०६"
                />
              </p>
            </div>
          </div>

          {/* Annex heading */}
          <div className="itar-annex">
            <div>अनुसूची–६</div>
            <div>(नियम ७ को उपनियम (१) संग सम्बन्धित)</div>
            <div className="itar-annex-title">उद्योग स्थानान्तरणको लागि निवेदन</div>
          </div>

          {/* Addressee */}
          <div className="itar-addressee-section">
            <div className="itar-addressee-row">
              <span>श्री</span>
              <input type="text" name="to_line1" className="itar-inline-box-input itar-long-box" value={form.to_line1} onChange={handleChange} placeholder="प्राप्तकर्ता" />
              <span>ज्यु,</span>
            </div>
            <div className="itar-addressee-row">
              <input type="text" name="to_line2" className="itar-inline-box-input itar-long-box" value={form.to_line2} onChange={handleChange} placeholder="ठेगाना" />
            </div>
          </div>

          {/* Subject */}
          <div className="itar-subject-section">
            <p>विषयः <span className="itar-underline-text">उद्योग स्थानान्तरणको लागि निवेदन गरिएको बारे ।</span></p>
          </div>

          {/* Body */}
          <div className="itar-form-body">
            <p className="itar-body-paragraph">
              महोदय, {MUNICIPALITY.provinceLine}{" "}
              <input type="text" name="district"          className="itar-inline-box-input itar-small-box"  value={form.district}          onChange={handleChange} />{" "}
              जिल्ला{" "}
              <input type="text" name="from_municipality" className="itar-inline-box-input itar-medium-box" value={form.from_municipality} onChange={handleChange} />{" "}
              नगरपालिका / गाउँपालिका वडा नं.{" "}
              <input type="text" name="from_ward"         className="itar-inline-box-input itar-tiny-box"   value={form.from_ward}         onChange={handleChange} />{" "}
              मा दर्ता रहेको{" "}
              <input type="text" name="industry_name"     className="itar-inline-box-input itar-medium-box" value={form.industry_name}     onChange={handleChange} />{" "}
              नामक उद्योगलाई{" "}
              <input type="text" name="to_municipality"   className="itar-inline-box-input itar-medium-box" value={form.to_municipality}   onChange={handleChange} />{" "}
              नगरपालिका / गाउँपालिका वडा नं.{" "}
              <input type="text" name="to_ward"           className="itar-inline-box-input itar-tiny-box"   value={form.to_ward}           onChange={handleChange} />{" "}
              मा स्थानान्तरण गर्नु पर्ने भएकोले स्थानान्तरणको स्वीकृति पाउँ भनी यो निवेदन पेश गरेको छु ।
            </p>
          </div>

          {/* Reason */}
          <div className="itar-reason-block">
            <div className="itar-reason-label">स्थानान्तरण गर्नु पर्नाको कारण :</div>
            <textarea
              name="transfer_reason"
              className="itar-reason-textarea"
              rows="4"
              placeholder="कारण लेख्नुहोस्…"
              value={form.transfer_reason}
              onChange={handleChange}
            />
          </div>

          {/* Docs + signature */}
          <div className="itar-bottom-grid">
            <div className="itar-docs">
              <div className="itar-docs-title">संलग्न कागजातहरू :</div>
              <ol>
                <li><input type="text" name="doc_1" className="itar-inline-box-input itar-medium-box" placeholder="कागजात १" value={form.doc_1} onChange={handleChange} /></li>
                <li><input type="text" name="doc_2" className="itar-inline-box-input itar-medium-box" placeholder="कागजात २" value={form.doc_2} onChange={handleChange} /></li>
                <li><input type="text" name="doc_3" className="itar-inline-box-input itar-medium-box" placeholder="कागजात ३" value={form.doc_3} onChange={handleChange} /></li>
              </ol>
            </div>

            <div className="itar-sign-box">
              <div className="itar-sign-title">निवेदक</div>
              <div className="itar-sign-field">
                <span>नाम :</span>
                <input type="text" name="signer_name"     className="itar-inline-box-input" value={form.signer_name}     onChange={handleChange} />
              </div>
              <div className="itar-sign-field">
                <span>पद :</span>
                <select name="signer_position" className="itar-designation-select" value={form.signer_position} onChange={handleChange}>
                  <option value="">पद छनौट गर्नुहोस्</option>
                  <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                  <option value="वडा सचिव">वडा सचिव</option>
                  <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
                </select>
              </div>
              <div className="itar-sign-field">
                <span>मिति :</span>
                <input type="text" name="signer_date"     className="itar-inline-box-input" value={form.signer_date}     onChange={handleChange} />
              </div>
              <div className="itar-sign-field">
                <span>ठेगाना :</span>
                <input type="text" name="signer_address"  className="itar-inline-box-input" value={form.signer_address}  onChange={handleChange} />
              </div>
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
      </div>
    </>
  );
}