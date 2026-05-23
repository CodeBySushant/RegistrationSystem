// src/pages/business/PartnershipRegistrationApplicationForm.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "partnership-registration";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.praf-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  background: #d6d7da;
}

/* ── Top bar ── */
.praf-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.praf-top-left  { font-weight: 600; }
.praf-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.praf-paper {
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

/* ── Letterhead ── */
.praf-letterhead { text-align: center; margin-bottom: 20px; position: relative; }
.praf-logo img   { position: absolute; left: 0; top: 0; width: 80px; }
.praf-head-text  { display: flex; flex-direction: column; align-items: center; }
.praf-head-main  { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.praf-head-ward  { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.praf-head-sub   { color: #e74c3c; margin: 0; font-size: 1rem; }

/* ── All inputs white ── */
.praf-paper input,
.praf-paper select,
.praf-paper textarea { background-color: #fff; font-family: inherit; }
.praf-paper input:focus,
.praf-paper select:focus,
.praf-paper textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* ── Title + date ── */
.praf-main-title { text-align: center; font-size: 1.2rem; font-weight: bold; margin: 20px 0 8px; }
.praf-date-row   { text-align: right; font-size: 1rem; margin-bottom: 10px; }
.praf-date-input {
  width: 120px;
  padding: 4px 6px;
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  font-family: inherit;
  font-size: inherit;
}
.praf-date-input:focus { border-color: #2563eb; }

/* ── To block ── */
.praf-to-block { margin-top: 16px; font-size: 1.05rem; line-height: 2.2; }
.praf-long-input {
  width: 260px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  background: #fff;
  margin-left: 6px;
  border-radius: 3px;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  vertical-align: middle;
}
.praf-to-second { margin-top: 6px; display: inline-block; }

/* ── Sections ── */
.praf-section  { margin-top: 20px; }
.praf-subtitle { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }

/* ── Field rows ── */
.praf-field-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
  margin-top: 10px;
}
.praf-field-row input,
.praf-field-row select {
  padding: 4px 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  outline: none;
}
.praf-small-input  { width: 80px; }
.praf-medium-input { width: 160px; }
.praf-wide-input   { flex: 1; min-width: 230px; }
.praf-select       { min-width: 90px; }

/* ── Partners table ── */
.praf-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; margin-top: 8px; }
.praf-table th,
.praf-table td { border: 1px solid #c1c1c1; padding: 6px 5px; vertical-align: middle; }
.praf-table th { background-color: #f0f0f0; text-align: center; font-weight: 600; }
.praf-table td input {
  width: 100%;
  border: none;
  padding: 3px 4px;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
}
.praf-table td input:focus { background: #f0f6ff; }
.praf-table td button {
  padding: 2px 8px;
  margin: 0 2px;
  cursor: pointer;
  border: 1px solid #c1c1c1;
  border-radius: 3px;
  background: #f0f0f0;
  font-family: inherit;
  transition: background 0.15s;
}
.praf-table td button:hover { background: #ddd; }

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
.praf-toast {
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
  animation: praf-toast-in 0.25s ease;
  max-width: 360px;
}
.praf-toast--success { background: #1a7f3c; color: #fff; }
.praf-toast--error   { background: #c0392b; color: #fff; }
@keyframes praf-toast-in {
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
  .praf-paper  { padding: 20px 14px; }
  .praf-topbar { flex-direction: column; gap: 4px; }
  .praf-toast  { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .praf-paper,
  .praf-paper * { visibility: visible; }
  .praf-topbar,
  .form-footer,
  .copyright-footer,
  .praf-toast { display: none !important; }
  .praf-paper {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 10mm 14mm;
    background: white;
  }
  input, select, textarea { border: none !important; background: transparent !important; }
  .praf-table th,
  .praf-table td { border: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const defaultPartner = () => ({
  id:              Date.now() + Math.random(),
  name:            "",
  father_or_spouse:"",
  address:         "",
  age:             "",
  investment:      "",
  share_percent:   "",
});

const makeInitialForm = () => ({
  date:                       new Date().toISOString().slice(0, 10),
  to_line1:                   "",
  to_line2:                   "",
  firm_name_np:               "",
  firm_name_en:               "",
  firm_address_full:          "",
  firm_nature:                "",
  partnership_duration_years: "",
  firm_phone:                 "",
  firm_email:                 "",
  firm_category:              "सानो",
  partners:                   [defaultPartner()],
  first_registration_info:    "",
  representative_name:        "",
  name_registered_date:       "",
  firm_start_date:            "",
  office_check_officer:       "",
  report_received_date:       "",
  deed_signature:             "",
  deed_holder_name:           "",
  deed_date:                  "",
  deed_year:                  "",
  deed_month:                 "",
  deed_day:                   "",
  applicant_name:             "",
  applicant_address:          "",
  applicant_citizenship:      "",
  applicant_phone:            "",
});

/* ─────────────────────────── Component ─────────────────────────── */
export default function PartnershipRegistrationApplicationForm() {
  const { user } = useAuth();

  const [form, setForm]   = useState(makeInitialForm);
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

  /* Partner row helpers */
  const updatePartner = (idx, key, value) =>
    setForm((s) => ({
      ...s,
      partners: s.partners.map((p, i) => (i === idx ? { ...p, [key]: value } : p)),
    }));

  const addPartner    = ()    => setForm((s) => ({ ...s, partners: [...s.partners, defaultPartner()] }));
  const removePartner = (idx) => setForm((s) => ({ ...s, partners: s.partners.filter((_, i) => i !== idx) }));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      // Strip stable row ids before posting
      const payload = {
        ...form,
        partners: form.partners.map(({ id, ...rest }) => rest),
      };

      const res = await axiosInstance.post(API_URL, payload);
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm());
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

      <div className="praf-page">

        {/* Toast */}
        {toast && (
          <div className={`praf-toast praf-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <header className="praf-topbar">
          <div className="praf-top-left">साझेदारी रजिष्ट्रेशन</div>
          <div className="praf-top-right">अवलोकन पृष्ठ / साझेदारी रजिष्ट्रेशन</div>
        </header>

        <form className="praf-paper" onSubmit={handleSubmit}>

          {/* Letterhead */}
          <div className="praf-letterhead">
            <div className="praf-logo">
              <img alt="Emblem" src={MUNICIPALITY.logoSrc} />
            </div>
            <div className="praf-head-text">
              <div className="praf-head-main">{MUNICIPALITY.name}</div>
              <div className="praf-head-ward">{wardLabel}</div>
              <div className="praf-head-sub">
                {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
              </div>
            </div>
          </div>

          <h2 className="praf-main-title">साझेदारी रजिष्ट्रेशन गर्ने दरखास्त फाराम</h2>

          <div className="praf-date-row">
            मिति :{" "}
            <input name="date" value={form.date} onChange={handleChange} className="praf-date-input" placeholder="२०८२-०८-०६" />
          </div>

          <div className="praf-to-block">
            <span>श्रीमान</span>
            <input name="to_line1" value={form.to_line1} onChange={handleChange} className="praf-long-input" placeholder="प्राप्तकर्ता" />
            <br />
            <input name="to_line2" value={form.to_line2} onChange={handleChange} className="praf-long-input praf-to-second" placeholder="ठेगाना" />
          </div>

          {/* Basic fields */}
          <section className="praf-section">
            <div className="praf-field-row">
              <span>१) फर्मको पूरा नाम (नेपालीमा) :</span>
              <input name="firm_name_np" value={form.firm_name_np} onChange={handleChange} className="praf-wide-input" />
            </div>
            <div className="praf-field-row">
              <span>२) फर्मको पूरा नाम (अंग्रेजीमा) :</span>
              <input name="firm_name_en" value={form.firm_name_en} onChange={handleChange} className="praf-wide-input" />
            </div>
            <div className="praf-field-row">
              <span>३) फर्मको पूर्ण ठेगाना :</span>
              <input name="firm_address_full" value={form.firm_address_full} onChange={handleChange} className="praf-wide-input" />
            </div>
            <div className="praf-field-row">
              <span>४) फर्मको प्रकृति :</span>
              <input name="firm_nature" value={form.firm_nature} onChange={handleChange} className="praf-medium-input" />
              <span>अवधि (वर्ष):</span>
              <input name="partnership_duration_years" value={form.partnership_duration_years} onChange={handleChange} className="praf-small-input" />
            </div>
            <div className="praf-field-row">
              <span>५) फर्म सम्पर्क फोन :</span>
              <input name="firm_phone" value={form.firm_phone} onChange={handleChange} className="praf-medium-input" />
              <span>इमेल :</span>
              <input name="firm_email" value={form.firm_email} onChange={handleChange} className="praf-medium-input" />
              <span>वर्ग :</span>
              <select name="firm_category" value={form.firm_category} onChange={handleChange} className="praf-select">
                <option value="सानो">सानो</option>
                <option value="मझौला">मझौला</option>
                <option value="ठूलो">ठूलो</option>
              </select>
            </div>
          </section>

          {/* Partners table — stable row.id keys */}
          <section className="praf-section">
            <h3 className="praf-subtitle">साझेदारहरु</h3>
            <table className="praf-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>नाम</th>
                  <th>बाजे/बाबु</th>
                  <th>ठेगाना</th>
                  <th>उमेर</th>
                  <th>लगानी</th>
                  <th>लाभ प्रतिशत</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {form.partners.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ textAlign: "center", width: 32 }}>{i + 1}</td>
                    <td><input value={p.name}             onChange={(e) => updatePartner(i, "name",             e.target.value)} /></td>
                    <td><input value={p.father_or_spouse} onChange={(e) => updatePartner(i, "father_or_spouse", e.target.value)} /></td>
                    <td><input value={p.address}          onChange={(e) => updatePartner(i, "address",          e.target.value)} /></td>
                    <td><input value={p.age}              onChange={(e) => updatePartner(i, "age",              e.target.value)} /></td>
                    <td><input value={p.investment}       onChange={(e) => updatePartner(i, "investment",       e.target.value)} /></td>
                    <td><input value={p.share_percent}    onChange={(e) => updatePartner(i, "share_percent",    e.target.value)} /></td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      {form.partners.length > 1 && (
                        <button type="button" onClick={() => removePartner(i)}>−</button>
                      )}
                      {i === form.partners.length - 1 && (
                        <button type="button" onClick={addPartner}>+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Office use */}
          <section className="praf-section">
            <div className="praf-field-row">
              <span>१०) नाम दर्ता मिति :</span>
              <input name="name_registered_date" value={form.name_registered_date} onChange={handleChange} className="praf-small-input" />
            </div>
            <div className="praf-field-row">
              <span>११) संचालन थालिएको मिति :</span>
              <input name="firm_start_date" value={form.firm_start_date} onChange={handleChange} className="praf-small-input" />
            </div>
            <div className="praf-field-row">
              <label>टिप्पणी (कार्यालयले भर्ने): जाँच अधिकारी</label>
              <input name="office_check_officer" value={form.office_check_officer} onChange={handleChange} className="praf-medium-input" />
              <label>रिपोर्ट प्राप्त मिति</label>
              <input name="report_received_date" value={form.report_received_date} onChange={handleChange} className="praf-small-input" />
            </div>
          </section>

          {/* Deed */}
          <section className="praf-section">
            <div className="praf-field-row">
              <span>दस्तखत :</span>
              <input name="deed_signature"   value={form.deed_signature}   onChange={handleChange} className="praf-medium-input" />
            </div>
            <div className="praf-field-row">
              <span>प्रोपाइटर/साझेदार पुरा नाम :</span>
              <input name="deed_holder_name" value={form.deed_holder_name} onChange={handleChange} className="praf-medium-input" />
            </div>
            <div className="praf-field-row">
              <span>हस्ती मानेको मिति :</span>
              <input name="deed_date"  value={form.deed_date}  onChange={handleChange} className="praf-small-input" />
              <span>साल :</span>
              <input name="deed_year"  value={form.deed_year}  onChange={handleChange} className="praf-small-input" />
              <span>महिना :</span>
              <input name="deed_month" value={form.deed_month} onChange={handleChange} className="praf-small-input" />
              <span>गते रोज :</span>
              <input name="deed_day"   value={form.deed_day}   onChange={handleChange} className="praf-small-input" />
            </div>
          </section>

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