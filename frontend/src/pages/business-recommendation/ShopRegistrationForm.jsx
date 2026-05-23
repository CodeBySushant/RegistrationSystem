// src/pages/business/ShopRegistrationForm.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "shop-registration";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.srf-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d6d7da;
  font-family: 'Kalimati', 'Kokila', sans-serif;
}

/* ── Top bar ── */
.srf-topbar {
  background-color: #111827;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
  font-size: 14px;
}
.srf-top-left  { font-weight: 600; }
.srf-top-right { opacity: 0.9; }

/* ── Paper / form ── */
.srf-paper {
  max-width: 950px;
  margin: 24px auto 20px;
  padding: 30px 40px 40px;
  background-color: #fff;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
  font-family: 'Kalimati', 'Kokila', sans-serif;
  color: #000;
  box-sizing: border-box;
}

/* ── Letterhead ── */
.srf-letterhead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.srf-logo img   { width: 80px; height: 80px; }
.srf-head-text  { flex: 1; text-align: center; }
.srf-head-main  { font-size: 2rem; font-weight: bold; color: #e74c3c; }
.srf-head-ward  { font-size: 2.2rem; font-weight: bold; color: #e74c3c; }
.srf-head-sub   { margin-top: 4px; font-size: 1rem; color: #e74c3c; }
.srf-head-meta  { text-align: right; font-size: 13px; }

/* ── All inputs white ── */
.srf-paper input,
.srf-paper select { background-color: #fff; font-family: inherit; }
.srf-paper input:focus,
.srf-paper select:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }

.srf-small-input  { width: 110px; padding: 4px 6px; border: 1px solid #c1c1c1; outline: none; }
.srf-medium-input { width: 170px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 3px; margin: 0 4px; outline: none; vertical-align: middle; }
.srf-tiny-input   { width: 60px;  padding: 4px 6px; border: 1px solid #ccc; border-radius: 3px; margin: 0 2px; outline: none; vertical-align: middle; }
.srf-short-input  { width: 120px; padding: 3px 6px; border: 1px solid #ccc; border-radius: 3px; margin: 0 4px; outline: none; vertical-align: middle; }
.srf-long-input   { width: 260px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 3px; margin: 0 4px; outline: none; vertical-align: middle; }

/* ── Ref row ── */
.srf-ref-row   { display: flex; gap: 40px; margin-top: 20px; flex-wrap: wrap; }
.srf-ref-block { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.srf-ref-block input { width: 160px; padding: 5px 6px; border: 1px solid #c1c1c1; outline: none; }

/* ── To block ── */
.srf-to-block { margin-top: 22px; font-size: 1.05rem; line-height: 2; }

/* ── Subject ── */
.srf-subject-row  { display: flex; align-items: center; margin-top: 22px; font-size: 15px; }
.srf-subject-label { font-weight: 600; margin-right: 6px; }
.srf-subject-text  { text-decoration: underline; }

/* ── Salutation ── */
.srf-salutation { margin-top: 18px; font-size: 1.05rem; }

/* ── Inline rows ── */
.srf-inline-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-size: 1.05rem;
  margin-top: 8px;
  line-height: 2.4;
}

/* ── Body para ── */
.srf-body { margin-top: 16px; font-size: 1.05rem; line-height: 2.6; text-align: justify; }

/* ── Signature ── */
.srf-sign-row { margin-top: 50px; margin-bottom: 30px; display: flex; justify-content: flex-end; }
.srf-post-select { display: flex; align-items: center; gap: 8px; }
.srf-post-input { width: 200px; padding: 5px 6px; border: 1px solid #c1c1c1; outline: none; }
.srf-post-select select { padding: 5px 8px; border: 1px solid #c1c1c1; }

/* ── Applicant details box ── */
.applicant-details-box { border: 2px solid #999; padding: 20px; background-color: transparent; margin-top: 20px; border-radius: 4px; }
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.details-grid  { display: flex; flex-direction: column; gap: 18px; }
.detail-group  { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd; padding: 8px; border-radius: 4px;
  width: 100%; max-width: 400px; box-sizing: border-box;
  background-color: #fff; font-family: inherit; font-size: 0.9rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.srf-toast {
  position: fixed; top: 20px; right: 24px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 6px; font-size: 0.92rem;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: srf-toast-in 0.25s ease; max-width: 360px;
}
.srf-toast--success { background: #1a7f3c; color: #fff; }
.srf-toast--error   { background: #c0392b; color: #fff; }
@keyframes srf-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn { background-color: #2c3e50; color: white; padding: 10px 25px; border: none; border-radius: 4px; font-size: 1rem; font-family: inherit; cursor: pointer; transition: background 0.15s; }
.save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .srf-paper   { padding: 20px 14px; }
  .srf-topbar  { flex-direction: column; gap: 4px; }
  .srf-toast   { right: 12px; left: 12px; max-width: none; }
  .srf-ref-row { flex-direction: column; gap: 12px; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .srf-paper, .srf-paper * { visibility: visible; }
  .srf-topbar, .form-footer, .copyright-footer, .srf-toast { display: none !important; }
  .srf-paper { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; border: none; margin: 0; padding: 10mm 14mm; background: white; }
  input, select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialForm = (user) => ({
  date:                 new Date().toISOString().slice(0, 10),
  refLetterNo:          "",
  chalaniNo:            "",
  to_office:            "",
  to_district:          "",
  subject_district:     "",
  municipality_ward_no: user?.ward || "",
  sabik_ward_no:        "",
  sabik_area:           "",   // was used in JSX but missing from original initialState
  sabik_ward_no2:       "",   // same
  resident_name:        "",
  on_behalf_of:         "",
  son_daughter_of:      "",
  age:                  "",
  applicant_main:       "",
  land_owner_no:        "",
  te_no_sabik:          "",
  te_no_ward:           "",
  location_detail:      "",
  ward_no_body:         user?.ward || "",
  industry_name_2:      "",
  sign_name:            "",
  sign_position:        "",
  ward_no:              user?.ward || "",
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
});

/* ─────────────────────────── Component ─────────────────────────── */
function ShopRegistrationForm() {
  const { user } = useAuth();

  const [form, setForm]   = useState(() => makeInitialForm(user));
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

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
      setTimeout(() => { window.print(); setForm(makeInitialForm(user)); }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      showToast("error", err.response?.data?.message || err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="srf-page">
        {toast && (
          <div className={`srf-toast srf-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>{toast.text}
          </div>
        )}
        <header className="srf-topbar">
          <div className="srf-top-left">पसल तथा फार्म दर्ता सिफारिश ।</div>
          <div className="srf-top-right">अवलोकन पृष्ठ / पसल तथा फार्म दर्ता सिफारिश</div>
        </header>

        <form className="srf-paper" onSubmit={handleSubmit}>
          {/* Letterhead */}
          <div className="srf-letterhead">
            <div className="srf-logo"><img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" /></div>
            <div className="srf-head-text">
              <div className="srf-head-main">{MUNICIPALITY.name}</div>
              <div className="srf-head-ward">{wardLabel}</div>
              <div className="srf-head-sub">{MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}</div>
            </div>
            <div className="srf-head-meta">
              <div>मिति : <input type="text" name="date" className="srf-small-input" value={form.date} onChange={handleChange} placeholder="२०८२-०८-०६" /></div>
            </div>
          </div>

          {/* Ref row */}
          <div className="srf-ref-row">
            <div className="srf-ref-block"><label>पत्र संख्या :</label><input type="text" name="refLetterNo" value={form.refLetterNo} onChange={handleChange} /></div>
            <div className="srf-ref-block"><label>चलानी नं. :</label><input type="text" name="chalaniNo" value={form.chalaniNo} onChange={handleChange} /></div>
          </div>

          {/* To */}
          <div className="srf-to-block">
            <span>श्री</span>
            <input type="text" name="to_office" className="srf-long-input" value={form.to_office} onChange={handleChange} placeholder="कार्यालय/व्यक्ति" />
            <br />
            <span>घरेलु तथा साना उद्योग कार्यालय,</span>
            <input type="text" name="to_district" className="srf-medium-input" value={form.to_district} onChange={handleChange} placeholder="जिल्ला" />
          </div>

          {/* Subject */}
          <div className="srf-subject-row">
            <span className="srf-subject-label">विषय:</span>
            <span className="srf-subject-text">सिफारिस गरिएको ।</span>
          </div>
          <p className="srf-salutation">महोदय,</p>

          {/* Inline rows */}
          <div className="srf-inline-row">
            <span>प्रस्तुत विषयमा</span>
            <input type="text" name="subject_district"     className="srf-medium-input" value={form.subject_district}     onChange={handleChange} placeholder="जिल्ला" />
            <span>जिल्ला</span>
            <input type="text" name="municipality_ward_no" className="srf-medium-input" value={form.municipality_ward_no} onChange={handleChange} placeholder="नगरपालिका" />
            <span>{MUNICIPALITY.name} वडा नं.</span>
            <input type="text" name="sabik_ward_no"        className="srf-tiny-input"   value={form.sabik_ward_no}        onChange={handleChange} />
            <span>साबिक</span>
            <input type="text" name="sabik_area"           className="srf-tiny-input"   value={form.sabik_area}           onChange={handleChange} />
            <span>वडा नं.</span>
            <input type="text" name="sabik_ward_no2"       className="srf-tiny-input"   value={form.sabik_ward_no2}       onChange={handleChange} />
          </div>

          <div className="srf-inline-row">
            <span>निवासी श्री</span>
            <input type="text" name="resident_name"   className="srf-medium-input" value={form.resident_name}   onChange={handleChange} />
            <span>को तर्फबाट श्री</span>
            <input type="text" name="on_behalf_of"    className="srf-medium-input" value={form.on_behalf_of}    onChange={handleChange} />
            <span>को छोरा / छोरी वर्ष</span>
            <input type="text" name="age"             className="srf-tiny-input"   value={form.age}             onChange={handleChange} />
            <span>को श्री</span>
            <input type="text" name="son_daughter_of" className="srf-medium-input" value={form.son_daughter_of} onChange={handleChange} />
          </div>

          <div className="srf-inline-row">
            <span>उक्त</span>
            <input type="text" name="applicant_main"   className="srf-medium-input" value={form.applicant_main}   onChange={handleChange} />
            <span>को जग्गा धनी प्रमाण पुर्जा नं.</span>
            <input type="text" name="land_owner_no"    className="srf-medium-input" value={form.land_owner_no}    onChange={handleChange} />
            <span>ते नं. वडा साबिक</span>
            <input type="text" name="te_no_sabik"      className="srf-tiny-input"   value={form.te_no_sabik}      onChange={handleChange} />
            <span>वडा नं.</span>
            <input type="text" name="te_no_ward"       className="srf-tiny-input"   value={form.te_no_ward}       onChange={handleChange} />
            <span>अन्तर्गत रहेको</span>
            <input type="text" name="location_detail"  className="srf-medium-input" value={form.location_detail}  onChange={handleChange} />
          </div>

          <p className="srf-body">
            संचालन गर्नका लागि सिफारिस गरी पाउँ भनी यस{" "}
            <input type="text" name="ward_no_body" className="srf-short-input" value={form.ward_no_body} onChange={handleChange} />{" "}
            नं. वडा कार्यालयमा निवेदन दिनु भएको उक्त उद्योग संचालन गर्दा कुनै पनि
            जनस्वास्थ्य महत्त्वपूर्ण स्थल, विद्यालय, मन्दिर र धार्मिकस्थलहरूलाई
            कुनै बाधा नपरी तथा वातावरणीय प्रदूषण समेत नहुने हुँदा यस वडा
            कार्यालयबाट सिफारिस साथ संलग्न सिफारिस पत्र पठाइएको छ । निजको नाममा
            उक्त{" "}
            <input type="text" name="industry_name_2" className="srf-short-input" value={form.industry_name_2} onChange={handleChange} />{" "}
            दर्ता गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
          </p>

          {/* Signature */}
          <div className="srf-sign-row">
            <div className="srf-post-select">
              <input type="text" name="sign_name" className="srf-post-input" placeholder="नाम, थर" value={form.sign_name} onChange={handleChange} />
              <select name="sign_position" value={form.sign_position} onChange={handleChange}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          <div className="form-footer">
            <button className="save-print-btn" type="submit" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
          <div className="copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>
        </form>
      </div>
    </>
  );
}

export default ShopRegistrationForm;