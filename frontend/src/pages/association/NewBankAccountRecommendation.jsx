// src/pages/social-family/NewBankAccountRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "new-bank-account-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.nbcr-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', 'Mangal', sans-serif;
}

/* ── Top bar ── */
.nbcr-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.nbcr-top-left  { font-weight: 600; }
.nbcr-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.nbcr-paper {
  margin: 0 24px 20px;
  padding: 28px 40px 40px;
  background-color: #fff;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
  box-sizing: border-box;
}

/* ── Letterhead ── */
.nbcr-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.nbcr-logo img  { width: 90px; height: 90px; }
.nbcr-head-text { flex: 1; text-align: center; }
.nbcr-head-main { font-size: 20px; font-weight: 600; }
.nbcr-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.nbcr-head-sub  { margin-top: 4px; font-size: 14px; }
.nbcr-head-meta { font-size: 13px; text-align: right; }
.nbcr-meta-line { margin-bottom: 4px; }

/* ── Shared inputs ── */
.nbcr-page input[type="text"],
.nbcr-page input[type="date"],
.nbcr-page select {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  padding: 4px 6px;
  background: #fff;
}
.nbcr-page input[type="text"]:focus,
.nbcr-page input[type="date"]:focus,
.nbcr-page select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

.nbcr-small-input  { width: 120px; }
.nbcr-tiny-input   { width: 60px; }
.nbcr-small-inline { width: 110px; }
.nbcr-medium-input { width: 220px; }
.nbcr-long-input   { width: 260px; margin: 0 4px; }
.nbcr-sign-name    { width: 200px; }

/* ── Ref row ── */
.nbcr-ref-row   { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; flex-wrap: wrap; }
.nbcr-ref-block { display: flex; align-items: center; gap: 6px; }
.nbcr-ref-block input { width: 180px; }

/* ── To block ── */
.nbcr-to-block  { margin-top: 22px; font-size: 14px; }
.nbcr-to-second { margin-top: 4px; display: block; }

/* ── Subject ── */
.nbcr-subject-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.nbcr-sub-label    { font-weight: 600; margin-right: 6px; }
.nbcr-subject-text { text-decoration: underline; }

/* ── Body ── */
.nbcr-body { margin-top: 16px; font-size: 14px; line-height: 2.2; }
.nbcr-bold { font-weight: 600; }

/* ── Officials table ── */
.nbcr-table-title   { margin-top: 16px; font-weight: 600; text-decoration: underline; }
.nbcr-table-wrapper { margin-top: 8px; border: 1px solid #d0d0d0; }
.nbcr-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.nbcr-table th,
.nbcr-table td { border: 1px solid #d0d0d0; padding: 4px 6px; text-align: center; }
.nbcr-table td input,
.nbcr-table td select {
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 3px 4px;
  font-family: inherit;
  background: transparent;
}
.nbcr-table td input:focus,
.nbcr-table td select:focus { background: #f0f6ff; }

/* ── Signature ── */
.nbcr-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.nbcr-post-select { padding: 4px 6px; }

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

/* ── Submit row ── */
.nbcr-submit-row { text-align: center; margin-top: 30px; }
.nbcr-submit-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 28px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.nbcr-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.nbcr-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Toast ── */
.nbcr-toast {
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
  animation: nbcr-toast-in 0.25s ease;
  max-width: 360px;
}
.nbcr-toast--success { background: #1a7f3c; color: #fff; }
.nbcr-toast--error   { background: #c0392b; color: #fff; }
@keyframes nbcr-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.nbcr-footer { text-align: right; font-size: 0.8rem; color: #666; padding: 10px 24px 20px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .nbcr-paper    { margin: 0 8px 20px; padding: 20px 16px; }
  .nbcr-ref-row  { flex-direction: column; gap: 12px; }
  .nbcr-topbar   { flex-direction: column; gap: 4px; }
  .nbcr-toast    { right: 12px; left: 12px; max-width: none; }
  .nbcr-long-input,
  .nbcr-medium-input { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .nbcr-paper,
  .nbcr-paper * { visibility: visible; }
  .nbcr-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    margin: 0;
    padding: 10mm 14mm;
    box-shadow: none;
    background: white;
  }
  .nbcr-topbar,
  .nbcr-submit-row,
  .nbcr-toast,
  .nbcr-footer { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
  .nbcr-table th,
  .nbcr-table td { border: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const INITIAL_OFFICIALS = [
  { title: "श्री", name: "", designation: "अध्यक्ष"    },
  { title: "श्री", name: "", designation: "कोषाध्यक्ष" },
  { title: "श्री", name: "", designation: "सचिव"        },
];

const makeInitialForm = (user) => ({
  date:               new Date().toISOString().slice(0, 10),
  patraSankhya:       "",
  chalanNo:           "",
  toName:             "",
  toPlace:            MUNICIPALITY.officeLine || "",
  district:           MUNICIPALITY.city || "",
  municipalityWardNo: user?.ward || MUNICIPALITY.wardNumber || "",
  groupName:          "",
  groupWardNo:        user?.ward || MUNICIPALITY.wardNumber || "",
  groupRefPatraNo:    "",
  groupRefChalanNo:   "",
  officials:          INITIAL_OFFICIALS.map((o) => ({ ...o })),
  signerName:         "",
  signerDesignation:  "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
});

const validate = (f) => {
  if (!f.groupName?.trim())      return "समूह / समिति / संस्था नाम आवश्यक छ।";
  if (!f.applicantName?.trim())  return "निवेदकको नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function NewBankAccountRecommendation() {
  const { user } = useAuth();

  const [form, setForm]           = useState(() => makeInitialForm(user));
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]         = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleOfficialChange = (index, field, value) => {
    setForm((p) => ({
      ...p,
      officials: p.officials.map((o, i) => (i === index ? { ...o, [field]: value } : o)),
    }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setSubmitting(true);
    try {
      // Normalise empty strings → null; keep officials as array (axios serialises to JSON)
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axios.post(API_URL, payload);
      showToast("success", `रेकर्ड सेभ भयो। ID: ${res.data?.id ?? ""}`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
      }, 300);
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      showToast("error", "त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="nbcr-page">

        {/* Toast */}
        {toast && (
          <div className={`nbcr-toast nbcr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="nbcr-topbar">
          <div className="nbcr-top-left">खाता खोली दिने ।</div>
          <div className="nbcr-top-right">अवलोकन पृष्ठ / खाता खोली दिने</div>
        </header>

        <form className="nbcr-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="nbcr-letterhead">
            <div className="nbcr-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
            </div>
            <div className="nbcr-head-text">
              <div className="nbcr-head-main">{MUNICIPALITY.name}</div>
              <div className="nbcr-head-ward">{wardLabel}</div>
              <div className="nbcr-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="nbcr-head-meta">
              <div className="nbcr-meta-line">
                मिति :{" "}
                <input type="text" name="date" value={form.date} onChange={handleChange} className="nbcr-small-input" placeholder="२०८२-०८-०६" />
              </div>
              <div className="nbcr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* Ref row */}
          <div className="nbcr-ref-row">
            <div className="nbcr-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="patraSankhya" value={form.patraSankhya} onChange={handleChange} />
            </div>
            <div className="nbcr-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalanNo" value={form.chalanNo} onChange={handleChange} />
            </div>
          </div>

          {/* Addressee */}
          <div className="nbcr-to-block">
            <span>श्री</span>
            <input type="text" name="toName" className="nbcr-long-input" value={form.toName} onChange={handleChange} placeholder="प्राप्तकर्ताको नाम" />
            <span>ज्यु,</span>
            <br />
            <input type="text" name="toPlace" className="nbcr-long-input nbcr-to-second" value={form.toPlace} onChange={handleChange} />
          </div>

          {/* Subject */}
          <div className="nbcr-subject-row">
            <span className="nbcr-sub-label">विषयः</span>
            <span className="nbcr-subject-text">खाता खोली दिने बारे ।</span>
          </div>

          {/* Body */}
          <p className="nbcr-body">
            जिल्ला{" "}
            <input type="text" name="district" className="nbcr-small-inline" value={form.district} onChange={handleChange} />{" "}
            - <span className="nbcr-bold">{MUNICIPALITY.name}</span> वडा नं.{" "}
            <input type="text" name="municipalityWardNo" className="nbcr-tiny-input" value={form.municipalityWardNo} onChange={handleChange} />{" "}
            अन्तर्गत रहने{" "}
            <input type="text" name="groupName" className="nbcr-medium-input" placeholder="समूह / समिति / संस्था नाम *" value={form.groupName} onChange={handleChange} required />{" "}
            ले पत्र संख्या{" "}
            <input type="text" name="groupRefPatraNo" className="nbcr-small-inline" value={form.groupRefPatraNo} onChange={handleChange} />{" "}
            च.न.{" "}
            <input type="text" name="groupRefChalanNo" className="nbcr-small-inline" value={form.groupRefChalanNo} onChange={handleChange} />{" "}
            को प्राप्त पत्र अनुसार सो समूहको खाता खोल्न बैंकको नियमानुसार निम्न
            पदाधिकारीको संयुक्त दस्तखतबाट संचालन हुने गरी खाता खोलिदिन सिफारिस
            साथ आग्रह गरेको छ ।
          </p>

          {/* Officials table */}
          <div className="nbcr-table-title">तपशिल :</div>
          <div className="nbcr-table-wrapper">
            <table className="nbcr-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>श्री / सुश्री</th>
                  <th>नाम, थर</th>
                  <th>पद</th>
                </tr>
              </thead>
              <tbody>
                {form.officials.map((o, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>
                      <select value={o.title} onChange={(e) => handleOfficialChange(i, "title", e.target.value)}>
                        <option>श्री</option>
                        <option>सुश्री</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" value={o.name} onChange={(e) => handleOfficialChange(i, "name", e.target.value)} placeholder="नाम, थर" />
                    </td>
                    <td>
                      <select value={o.designation} onChange={(e) => handleOfficialChange(i, "designation", e.target.value)}>
                        <option>अध्यक्ष</option>
                        <option>कोषाध्यक्ष</option>
                        <option>सचिव</option>
                        <option>अन्य</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature */}
          <div className="nbcr-sign-top">
            <input
              type="text"
              name="signerName"
              className="nbcr-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select name="signerDesignation" className="nbcr-post-select" value={form.signerDesignation} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          {/* Applicant details */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* Submit */}
          <div className="nbcr-submit-row">
            <button className="nbcr-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="nbcr-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}