// src/pages/business/IndustryFormCancellation.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "industry-cancellation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
/* ===== PAGE WRAPPER ===== */
.ufc-page {
  max-width: 950px;
  margin: 0 auto;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ===== TOP BAR ===== */
.ufc-topbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ufc-top-right { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ===== MAIN PAPER / FORM ===== */
.ufc-paper {
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

/* ===== ANNEX HEADING ===== */
.ufc-annex { text-align: center; font-size: 1rem; line-height: 1.8; margin-bottom: 10px; }
.ufc-annex-title { margin-top: 4px; font-weight: bold; font-size: 1.1rem; }

/* ===== DATE ===== */
.ufc-date-row { text-align: right; margin-top: 10px; font-size: 1rem; }
.ufc-date-input {
  width: 120px;
  padding: 2px 5px;
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
}
.ufc-date-input:focus { border-color: #2563eb; }

/* ===== TO BLOCK ===== */
.ufc-to-block { margin-top: 20px; font-size: 1.05rem; line-height: 2; }
.ufc-long-input {
  width: 280px;
  padding: 4px 6px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  margin: 0 6px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
}
.ufc-long-input.second { margin-top: 6px; display: inline-block; }
.ufc-long-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }

/* ===== SUBJECT ===== */
.ufc-subject-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  font-size: 1.1rem;
  font-weight: bold;
}
.ufc-subject-label { margin-right: 6px; }
.ufc-subject-text  { text-decoration: underline; }

/* ===== BODY ===== */
.ufc-body { margin-top: 18px; font-size: 1.05rem; line-height: 2.4; text-align: justify; }
.ufc-small-input {
  width: 110px;
  padding: 3px 5px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  margin: 0 4px;
}
.ufc-tiny-input {
  width: 55px;
  padding: 3px 5px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  margin: 0 4px;
}
.ufc-small-input:focus,
.ufc-tiny-input:focus { border-color: #2563eb; }

/* ===== MIDDLE SECTION ===== */
.ufc-middle-section { display: flex; justify-content: space-between; margin-top: 20px; gap: 20px; flex-wrap: wrap; }

/* ===== REASONS ===== */
.ufc-reason       { font-size: 1rem; flex: 1; min-width: 200px; }
.ufc-reason-title { font-weight: bold; margin-bottom: 4px; }
.ufc-reason ol    { padding-left: 20px; margin: 4px 0; line-height: 1.9; }

/* ===== SIGNATURE BOX ===== */
.ufc-sign-box {
  border: 1px solid #ccc;
  padding: 12px 14px;
  font-size: 0.95rem;
  min-width: 230px;
  background: #fff;
  border-radius: 3px;
}
.ufc-sign-title { text-align: right; font-weight: bold; margin-bottom: 8px; }
.ufc-sign-field { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
.ufc-sign-field span { white-space: nowrap; }
.ufc-sign-field input {
  flex: 1;
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  padding: 3px 4px;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
}
.ufc-sign-field input:focus { border-color: #2563eb; }

/* ===== APPLICANT DETAILS BOX ===== */
.applicant-details-box {
  border: 2px solid #999;
  padding: 20px;
  background-color: #fff;
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
  background: #fff;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.9rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.ufc-toast {
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
  animation: ufc-toast-in 0.25s ease;
  max-width: 360px;
}
.ufc-toast--success { background: #1a7f3c; color: #fff; }
.ufc-toast--error   { background: #c0392b; color: #fff; }
@keyframes ufc-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== FOOTER ===== */
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

/* ===== RESPONSIVE ===== */
@media (max-width: 700px) {
  .ufc-paper           { padding: 20px 14px; }
  .ufc-topbar          { flex-direction: column; gap: 4px; }
  .ufc-middle-section  { flex-direction: column; }
  .ufc-toast           { right: 12px; left: 12px; max-width: none; }
}

/* ===== PRINT ===== */
@media print {
  body * { visibility: hidden; }
  .ufc-paper,
  .ufc-paper * { visibility: visible; }
  .ufc-paper {
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
  .ufc-toast,
  .ufc-topbar { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = (user) => ({
  date:                  new Date().toISOString().slice(0, 10),
  to_line1:              MUNICIPALITY.officeLine || "",
  to_line2:              MUNICIPALITY.name,
  reg_certificate_date:  "",
  district:              MUNICIPALITY.city || "",
  municipality:          MUNICIPALITY.name,
  ward:                  user?.ward || "",
  industry_location:     "",
  started_date:          "",
  closed_date:           "",
  reason_short:          "",
  signature:             "",
  signer_name:           "",
  signer_position:       "",
  applicantName:         "",
  applicantAddress:      "",
  applicantCitizenship:  "",
  applicantPhone:        "",
});

/* ─────────────────────────── Component ─────────────────────────── */
export default function IndustryFormCancellation() {
  const { user } = useAuth();

  const [form, setForm]   = useState(() => makeInitialForm(user));
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  // Unified handler — works for both name-based inputs and direct key/value calls
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

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

      <div className="ufc-page">

        {/* Toast */}
        {toast && (
          <div className={`ufc-toast ufc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="ufc-topbar">
          उद्योगको दर्ता खारेजी ।
          <span className="ufc-top-right">उद्योग &gt; उद्योगको दर्ता खारेजी</span>
        </div>

        <form className="ufc-paper" onSubmit={handleSubmit}>

          {/* Annex heading */}
          <div className="ufc-annex">
            <div>अनुसूची–३२</div>
            <div>(नियम १० को उपनियम (३) संग सम्बन्धित)</div>
            <div className="ufc-annex-title">उद्योगको दर्ता खारेजको लागि दिइने निवेदन</div>
          </div>

          {/* Date — now editable */}
          <div className="ufc-date-row">
            मिति :{" "}
            <input
              name="date"
              className="ufc-date-input"
              value={form.date}
              onChange={handleChange}
              placeholder="२०८२-०८-०६"
            />
          </div>

          {/* To block */}
          <div className="ufc-to-block">
            <span>श्री</span>
            <input type="text" name="to_line1" className="ufc-long-input" value={form.to_line1} onChange={handleChange} />
            <span>ज्यु,</span>
            <br />
            <input type="text" name="to_line2" className="ufc-long-input second" value={form.to_line2} onChange={handleChange} />
          </div>

          {/* Subject */}
          <div className="ufc-subject-row">
            <span className="ufc-subject-label">विषयः</span>
            <span className="ufc-subject-text">उद्योग दर्ता खारेज गरिदिने सम्बन्धमा ।</span>
          </div>

          {/* Body */}
          <p className="ufc-body">
            उद्योग दर्ता प्रमाण मिति{" "}
            <input type="text" name="reg_certificate_date" className="ufc-small-input" value={form.reg_certificate_date} onChange={handleChange} />{" "}
            मा दर्ता भई {MUNICIPALITY.provinceLine}{" "}
            <input type="text" name="district" className="ufc-small-input" value={form.district} onChange={handleChange} />{" "}
            जिल्ला{" "}
            <input type="text" name="municipality" className="ufc-small-input" value={form.municipality} onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input type="text" name="ward" className="ufc-tiny-input" value={form.ward} onChange={handleChange} />{" "}
            मा स्थित यस उद्योग{" "}
            <input type="text" name="industry_location" className="ufc-small-input" value={form.industry_location} onChange={handleChange} />{" "}
            मिति{" "}
            <input type="text" name="started_date" className="ufc-small-input" value={form.started_date} onChange={handleChange} />{" "}
            देखि संचालन भएको र मिति{" "}
            <input type="text" name="closed_date" className="ufc-small-input" value={form.closed_date} onChange={handleChange} />{" "}
            देखि उद्योग बन्द भएकोले ...
          </p>

          {/* Middle: reasons + signature */}
          <div className="ufc-middle-section">
            <div className="ufc-reason">
              <div className="ufc-reason-title">खास कारण:</div>
              <ol>
                <li>उद्योग संचालन गर्न नसकिएको कारणले स्थायी रुपमा बन्द गरिएको।</li>
                <li>उद्योग सञ्चालन उद्देश्य परिवर्तन गरिएको।</li>
                <li>सरकारी वा स्थानीय तहको नीतिगत निर्णय।</li>
                <li>उद्योग सञ्चालनको आर्थिक अवस्था प्रतिकुल।</li>
                <li>उद्योग स्थानान्तरण गरिएको।</li>
                <li>मुद्दा विचाराधीन नरहेको।</li>
              </ol>
              <div style={{ marginTop: 8 }}>
                <label>कुनै छोटो कारण लेख्नुहोस्: </label>
                <input type="text" name="reason_short" className="ufc-small-input" value={form.reason_short} onChange={handleChange} />
              </div>
            </div>

            <div className="ufc-sign-box">
              <div className="ufc-sign-title">निवेदकको</div>
              <div className="ufc-sign-field">
                <span>हस्ताक्षर :</span>
                <input type="text" name="signature"       value={form.signature}       onChange={handleChange} />
              </div>
              <div className="ufc-sign-field">
                <span>नाम, थर :</span>
                <input type="text" name="signer_name"     value={form.signer_name}     onChange={handleChange} />
              </div>
              <div className="ufc-sign-field">
                <span>पद :</span>
                <input type="text" name="signer_position" value={form.signer_position} onChange={handleChange} />
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