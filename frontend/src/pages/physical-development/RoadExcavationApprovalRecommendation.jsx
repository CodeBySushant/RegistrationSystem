// src/pages/physical-development/RoadExcavationApprovalRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const FORM_KEY = "road-excavation-approval";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.road-excavation-container {
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
.meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; flex-wrap: wrap; gap: 8px; }
.meta-left     { display: flex; flex-direction: column; gap: 6px; }
.meta-left p,
.meta-right p  { margin: 5px 0; }

/* ── Shared inputs ── */
.road-excavation-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.road-excavation-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
}
.road-excavation-container .inline-box-input {
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
.road-excavation-container .dotted-input:focus,
.road-excavation-container .line-input:focus,
.road-excavation-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input  { width: 120px; }
.medium-input { width: 180px; }
.tiny-box     { width: 50px; text-align: center; }
.small-box    { width: 100px; }
.medium-box   { width: 150px; }
.full-width   { flex-grow: 1; width: 100%; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; display: flex; align-items: center; }

/* ── Body ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 20px;
}
.specific-details-grid { margin-top: 20px; display: grid; gap: 15px; }
.form-group-row         { display: flex; align-items: center; gap: 8px; }
.form-group-row label   { white-space: nowrap; }

/* ── Conditions ── */
.conditions-section { margin-top: 20px; margin-bottom: 30px; }
.conditions-list    { font-size: 0.95rem; line-height: 1.8; padding-left: 20px; }
.conditions-list li { margin-bottom: 8px; text-align: justify; }

/* ── Former address ── */
.former-address-section { margin-bottom: 30px; }
.address-input-wrapper  { display: block; width: 300px; margin-top: 5px; }
.address-input-wrapper .dotted-input { width: 100%; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 30px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; height: 40px; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
}
.designation-select:focus { outline: none; border-color: #2563eb; }

/* ── Bodartha ── */
.bodartha-section { margin-bottom: 30px; font-size: 0.95rem; }
.bodartha-item    { margin-bottom: 15px; }
.bodartha-item p  { margin: 2px 0; }

/* ── Toast ── */
.rear-toast {
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
  animation: rear-toast-in 0.25s ease;
  max-width: 360px;
}
.rear-toast--success { background: #1a7f3c; color: #fff; }
.rear-toast--error   { background: #c0392b; color: #fff; }
@keyframes rear-toast-in {
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
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
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
  .road-excavation-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .rear-toast    { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .road-excavation-container,
  .road-excavation-container * { visibility: visible; }
  .road-excavation-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    padding: 10mm 14mm;
    background: white;
    max-width: 100%;
    margin: 0;
  }
  .top-bar-title,
  .form-footer,
  .rear-toast,
  .copyright-footer { display: none !important; }
  .dotted-input,
  .line-input,
  .inline-box-input,
  .designation-select,
  .detail-input { border: none !important; border-bottom: 1px dotted #000 !important; background: transparent !important; }
  button { display: none !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const INITIAL_FORM = {
  chalan_no:                   "",
  date_nepali:                  "",
  addressee_name:               "",
  addressee_place:              "",
  subject_text:                 "सडक खन्ने स्वीकृति ।",
  place_for_excavation:         "",
  completion_days:              "",
  approved_road:                "",
  approved_unit:                "",
  approved_unit_value:          "",
  deposit_amount:               "",
  applicant_previous_address:   "",
  designation:                  "",
};

const validate = (form) => {
  if (!form.addressee_name.trim())        return "प्राप्तकर्ताको नाम आवश्यक छ।";
  if (!form.place_for_excavation.trim())  return "सडक खन्ने स्थान आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function RoadExcavationApprovalRecommendation() {
  const { user } = useAuth();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axiosInstance.post(API_URL, form);
      showToast("success", `सफलतापूर्वक सेभ भयो। ID: ${res.data?.id ?? ""}`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
      }, 300);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Server error";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="road-excavation-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`rear-toast rear-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          सडक खन्ने स्वीकृतिको सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; सडक खन्ने स्वीकृतिको सिफारिस</span>
        </div>

        {/* Header */}
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
            <label>
              पत्र संख्या :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" placeholder="२०८२/८३ ..." />
            </label>
          </div>
          <div className="meta-right">
            <label>
              मिति :
              <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="dotted-input small-input" placeholder="२०८२-०८-०६" />
            </label>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text bold-text">{form.subject_text}</span></p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" value={form.addressee_name} onChange={onChange} type="text" className="line-input medium-input" placeholder="नाम *" required />
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange} type="text" className="line-input medium-input" placeholder="ठेगाना" />
          </div>
        </div>

        {/* Body */}
        <div className="form-body">
          <p>
            तपाईंले यस वडा कार्यालयमा मिति{" "}
            {/* date_nepali shown read-only in paragraph — editable only in meta row */}
            <span className="inline-box-input small-box" style={{ display: "inline-block", minWidth: 100 }}>
              {form.date_nepali || "______"}
            </span>{" "}
            मा दिनु भएको निवेदन अनुसार निम्न बमोजिम स्थानको{" "}
            <input name="place_for_excavation" value={form.place_for_excavation} onChange={onChange} className="inline-box-input medium-box" placeholder="स्थान *" required />{" "}
            सडक खन्ने अनुमति दिईएको छ | लेखिए बमोजिमको शर्तहरु पालना गरी यो
            पत्र प्राप्त भएको मितिले{" "}
            <input name="completion_days" value={form.completion_days} onChange={onChange} className="inline-box-input tiny-box" placeholder="दिन" />{" "}
            दिन भित्र कार्य सम्पन्न गर्नुहोला |
          </p>

          <div className="specific-details-grid">
            <div className="form-group-row">
              <label className="bold-text">खन्न स्वीकृति प्रदान गरेको सडक</label>
              <input name="approved_road" value={form.approved_road} onChange={onChange} className="dotted-input full-width" />
            </div>
            <div className="form-group-row">
              <label className="bold-text">सडक खन्न स्वीकृति इकाइ</label>
              <input name="approved_unit" value={form.approved_unit} onChange={onChange} className="dotted-input medium-input" />
              <span>बर्ग मिटर</span>
              <input name="approved_unit_value" value={form.approved_unit_value} onChange={onChange} className="dotted-input small-input" placeholder="मान" />
            </div>
            <div className="form-group-row">
              <label className="bold-text">धरौटी रकम (रु.)</label>
              <input name="deposit_amount" value={form.deposit_amount} onChange={onChange} className="dotted-input full-width" />
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="conditions-section">
          <h4 className="bold-text">शर्तहरु :</h4>
          <ol className="conditions-list">
            <li>सडक खन्ने कार्य सम्पन्न भएपछि खनेको ठाउँ पहिलेकै अवस्थामा पुनर्स्थापना गर्नु पर्नेछ।</li>
            <li>कार्य अवधिभर सुरक्षा व्यवस्था मिलाउनु पर्नेछ।</li>
            <li>तोकिएको समयभित्र कार्य सम्पन्न नभएमा धरौटी जफत हुनेछ।</li>
            <li>सम्बन्धित निकायको निर्देशन पालना गर्नु पर्नेछ।</li>
          </ol>
        </div>

        {/* Former address */}
        <div className="former-address-section">
          <label className="bold-text">निवेदकको साविकको ठेगाना</label>
          <div className="address-input-wrapper">
            <input name="applicant_previous_address" value={form.applicant_previous_address} onChange={onChange} className="dotted-input full-width" />
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <select name="designation" value={form.designation} onChange={onChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Bodartha */}
        <div className="bodartha-section">
          <h4 className="bold-text">बोधार्थ</h4>
          <div className="bodartha-item">
            <p className="bold-text">१. श्री प्राबिधिक शाखा :</p>
            <p>माथि उल्लेखित शर्तहरु पालना भए नभएको अनुगमन गरी प्रतिवेदन पेश गर्नु हुन |</p>
          </div>
          <div className="bodartha-item">
            <p className="bold-text">२. श्री ट्राफिक प्रहरी कार्यालय :</p>
            <p>सवारी साधनको सहजताको लागि अनुरोध छ |</p>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>

      </form>
    </>
  );
}