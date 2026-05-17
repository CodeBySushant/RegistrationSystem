// src/pages/nepali-citizenship/CitizenshipCertificateRecommendationCopy.jsx
import React, { useState } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axios from "../../utils/axiosInstance";

const FORM_KEY = "citizenship-certificate-copy";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.cit-cert-rec-copy-container {
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
.underline-text { text-decoration: underline; text-underline-offset: 4px; }
.red            { color: red; font-weight: bold; margin: 0 2px; }
.center-text    { text-align: center; }
.text-right     { text-align: right; }
.uppercase      { text-transform: uppercase; }
.mt-10 { margin-top: 10px; }
.mt-20 { margin-top: 20px; }
.mt-30 { margin-top: 30px; }
.mb-10 { margin-bottom: 10px; }
.mb-20 { margin-bottom: 20px; }

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
.form-header-simple { font-size: 1.05rem; line-height: 1.6; }
.form-header-simple p { margin: 2px 0; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Body ── */
.form-body        { font-size: 1.05rem; line-height: 1.8; }
.body-paragraph   { line-height: 2.3; text-align: justify; margin: 10px 0; }
.indent-text      { text-indent: 40px; }

/* ── Shared inputs ── */
.cit-cert-rec-copy-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #ffffff;
  outline: none;
  padding: 0 5px;
  margin: 0 2px;
  font-family: inherit;
  font-size: 1.05rem;
  text-align: center;
}
.cit-cert-rec-copy-container .dotted-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
}
.cit-cert-rec-copy-container .inline-select {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 2px 4px;
  margin: 0 2px;
  font-size: 1rem;
  font-family: inherit;
}
.cit-cert-rec-copy-container .inline-select:focus { outline: none; border-color: #2563eb; }

/* Size variants */
.tiny-input       { width: 50px; }
.small-input      { width: 100px; }
.medium-input     { width: 160px; }
.long-input       { width: 280px; }
.extra-long-input { width: 400px; }
.full-width-input { width: calc(100% - 100px); }

.en-label { font-family: 'Arial', sans-serif; font-size: 0.95rem; }

/* ── Details border box ── */
.details-border-box {
  border: 1px solid #000;
  padding: 15px 20px;
  background-color: rgba(255,255,255,0.4);
}
.detail-grid-row { display: flex; align-items: center; flex-wrap: wrap; }
.col-4  { width: 33.33%; padding: 0 5px; box-sizing: border-box; }
.col-6  { width: 50%;    padding: 0 5px; box-sizing: border-box; }
.col-12 { width: 100%;   padding: 0 5px; box-sizing: border-box; }

/* ── Thumbprint & signature ── */
.signature-flex-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
}
.thumbprint-container { width: 200px; text-align: center; }
.thumbprint-title {
  margin-bottom: 5px;
  font-size: 0.9rem;
  border-bottom: 1px solid #000;
  display: inline-block;
  padding: 0 20px;
}
.thumbprint-boxes { display: flex; justify-content: center; }
.thumb-box {
  width: 80px;
  height: 100px;
  border: 1px solid #000;
  border-right: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
  font-size: 0.8rem;
}
.thumb-box:last-child { border-right: 1px solid #000; }
.signature-block { text-align: right; font-size: 1.05rem; }
.signature-block p { margin: 10px 0; }
.sig-row { display: flex; justify-content: flex-end; align-items: center; }

/* ── Recommendation border box ── */
.recommendation-border-box {
  border: 1px solid #000;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 30px;
}
.rec-footer-flex { display: flex; justify-content: space-between; align-items: flex-start; }
.photo-box-container { width: 150px; }
.photo-box {
  width: 120px;
  height: 140px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  padding: 10px;
  box-sizing: border-box;
}
.office-stamp-container   { flex: 1; padding-top: 20px; }
.rec-signatory-container  { width: 280px; text-align: right; }

/* ── Bottom admin section ── */
.bottom-admin-section p { margin: 5px 0; line-height: 1.5; }

/* ── Toast ── */
.ccrc-toast {
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
  animation: ccrc-toast-in 0.25s ease;
  max-width: 380px;
}
.ccrc-toast--success { background: #1a7f3c; color: #fff; }
.ccrc-toast--error   { background: #c0392b; color: #fff; }
@keyframes ccrc-toast-in {
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
  transition: background 0.2s;
}
.save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.save-print-btn:disabled { background-color: #7f8c8d; cursor: not-allowed; }
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
  .cit-cert-rec-copy-container { padding: 20px 14px; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .ccrc-toast    { right: 12px; left: 12px; max-width: none; }
  .col-4, .col-6 { width: 100%; }
  .extra-long-input, .long-input { width: 100%; }
}

/* ── Print ── */
@media print {
  .hide-print,
  .save-print-btn,
  .top-bar-title,
  .copyright-footer,
  .ccrc-toast { display: none !important; }
  .cit-cert-rec-copy-container { padding: 0; background-image: none; }
  input.dotted-input,
  select.inline-select { border: none !important; appearance: none; background: transparent !important; }
  select.inline-select { padding: 0; }
  .details-border-box,
  .recommendation-border-box,
  .photo-box,
  .thumb-box { border: 1px solid #000 !important; }
  .thumbprint-title { border-bottom: 1px solid #000 !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

/* Build initial form — ward seeded from user at call time */
const makeInitialForm = (user) => ({
  recipient_office_type: "जिल्ला",
  recipient_district:    MUNICIPALITY.city || "काठमाडौँ",
  issue_office_district: MUNICIPALITY.city || "काठमाडौँ",
  copy_reason:           "झुत्रो भएको",
  prpn_no:               "",
  issue_date:            "",
  certificate_type:      "नागरिकताको किसिम",
  full_name_np:          "",
  full_name_en:          "",
  sex_np:                "पुरुष",
  sex_en:                "Male",
  birth_place_np:        "",
  birth_place_en:        "",
  perm_district_np:      MUNICIPALITY.city || "काठमाडौँ",
  perm_local_np:         MUNICIPALITY.name || "",
  perm_ward_np:          user?.ward || "१",
  perm_district_en:      "Kathmandu",
  perm_local_en:         MUNICIPALITY.englishName || MUNICIPALITY.name || "",
  perm_ward_en:          user?.ward || "1",
  dob_bs:                "",
  dob_ad:                "",
  father_name:           "",
  father_address:        "",
  father_cit_type:       "नागरिकताको किसिम",
  mother_name:           "",
  mother_address:        "",
  mother_cit_type:       "नागरिकताको किसिम",
  spouse_name:           "",
  spouse_address:        "",
  spouse_cit_type:       "नागरिकताको किसिम",
  issued_office:         "",
  issued_no:             "",
  applicant_sign_name:   "",
  applicant_sign_date:   new Date().toISOString().slice(0, 10),
  rec_birth_local:       "",
  rec_birth_ward:        user?.ward || "१",
  rec_birth_date:        "",
  rec_current_local:     MUNICIPALITY.name || "",
  rec_current_ward:      user?.ward || "१",
  rec_guardian_title:    "श्रीमान्",
  rec_guardian_name:     "",
  rec_relation_type:     "छोरा",
  rec_applicant_title:   "श्री",
  rec_applicant_name:    "",
  rec_cit_no:            "",
  rec_cit_date:          "",
  rec_cit_reason:        "झुत्रो भएको",
  rec_signatory_name:    "",
  rec_signatory_position:"वडा अध्यक्ष",
  bottom_date:           new Date().toISOString().slice(0, 10),
  bottom_applicant_name: "",
  bottom_applicant_relation: "",
  bottom_sanakhat_name:  "",
  applicant_name:        "",
  applicant_address:     "",
  applicant_citizenship_no: "",
  applicant_phone:       "",
  notes:                 "",
});

const CIT_TYPE_OPTIONS = ["नागरिकताको किसिम","वंशज","अंगीकृत","जन्म"];

const validate = (form) => {
  if (!form.full_name_np.trim())   return "पूरा नाम आवश्यक छ।";
  if (!form.applicant_name.trim()) return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
export default function CitizenshipCertificateRecommendationCopy() {
  const { user } = useAuth();

  const [form, setForm]       = useState(() => makeInitialForm(user));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      showToast("success", `रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(makeInitialForm(user));
      }, 300);
    } catch (err) {
      console.error("submit error:", err);
      const msg = err.response?.data?.message || err.message || "सेभ हुन सकेन";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="cit-cert-rec-copy-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`ccrc-toast ccrc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title hide-print">
          नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
          <span className="top-right-bread">
            नेपाली नागरिकता &gt; नागरिकता प्रतिलिपि सिफारिस
          </span>
        </div>

        {/* Header */}
        <div className="form-header-simple">
          <p>श्री प्रमुख जिल्ला अधिकारी ज्यु</p>
          <p>
            <select name="recipient_office_type" className="inline-select" value={form.recipient_office_type} onChange={handleChange}>
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select> प्रशासन कार्यालय
          </p>
          <p>
            <input name="recipient_district" className="dotted-input medium-input bold-text" value={form.recipient_district} onChange={handleChange} /> ।
          </p>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <u>नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।</u></p>
        </div>

        {/* Body */}
        <div className="form-body">
          <p>महोदय,</p>
          <p className="body-paragraph indent-text">
            मैले जिल्ला{" "}
            <input name="issue_office_district" className="dotted-input small-input" value={form.issue_office_district} onChange={handleChange} />{" "}
            प्रशासन कार्यालयबाट देहायको विवरण भएको नेपाली नागरिकता प्रमाणपत्र लिएकोमा सो प्रमाणपत्रको सक्कल{" "}
            <select name="copy_reason" className="inline-select" value={form.copy_reason} onChange={handleChange}>
              <option value="झुत्रो भएको">झुत्रो भएको</option>
              <option value="हराएको">हराएको</option>
            </select>{" "}
            हुँदा सोको प्रतिलिपि पाउनको लागि यो नागरिकता प्रमाणपत्रको प्रति संलग्न राखि रु. १० (दश) को टिकट टाँसी सिफारिस सहित यो निवेदन पेश गरेको छु।
          </p>

          <p className="center-text bold-text mt-20 mb-10">मैले नागरिकताको प्रमाण-पत्र लिएको विवरण यस प्रकार छ ।</p>

          {/* Details grid */}
          <div className="details-border-box">

            <div className="detail-grid-row">
              <div className="col-4">
                <label>१. ना.प्र.प.नं. :-</label>
                <input name="prpn_no" className="dotted-input" value={form.prpn_no} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label>नागरिकता जारी मिति :-</label>
                <input type="date" name="issue_date" className="dotted-input" value={form.issue_date} onChange={handleChange} />
              </div>
              <div className="col-4 text-right">
                <label>किसिम :-</label>
                <select name="certificate_type" className="inline-select" value={form.certificate_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="detail-grid-row mt-10">
              <div className="col-6">
                <label>२. नाम थर : <span className="red">*</span></label>
                <input name="full_name_np" className="dotted-input long-input" value={form.full_name_np} onChange={handleChange} required />
              </div>
            </div>
            <div className="detail-grid-row">
              <div className="col-12">
                <label className="en-label">FULL NAME (IN BLOCK) :- <span className="red">*</span></label>
                <input name="full_name_en" className="dotted-input extra-long-input uppercase" value={form.full_name_en} onChange={handleChange} />
              </div>
            </div>

            <div className="detail-grid-row mt-10">
              <div className="col-6">
                <label>३. लिङ्ग :-</label>
                <select name="sex_np" className="inline-select" value={form.sex_np} onChange={handleChange}>
                  <option value="पुरुष">पुरुष</option>
                  <option value="महिला">महिला</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>
              <div className="col-6">
                <label className="en-label">Sex :-</label>
                <input name="sex_en" className="dotted-input small-input" value={form.sex_en} onChange={handleChange} />
              </div>
            </div>

            <div className="detail-grid-row mt-10">
              <div className="col-6">
                <label>४. जन्म स्थान :- <span className="red">*</span></label>
                <input name="birth_place_np" className="dotted-input long-input" value={form.birth_place_np} onChange={handleChange} />
              </div>
            </div>
            <div className="detail-grid-row">
              <div className="col-12">
                <label className="en-label">PLACE OF BIRTH (IN BLOCK) :-</label>
                <input name="birth_place_en" className="dotted-input extra-long-input uppercase" value={form.birth_place_en} onChange={handleChange} />
              </div>
            </div>

            <div className="detail-grid-row mt-10">
              <div className="col-12"><label>५. स्थायी बासस्थान :</label></div>
            </div>
            <div className="detail-grid-row">
              <div className="col-4">
                <label>जिल्ला :</label>
                <input name="perm_district_np" className="dotted-input medium-input" value={form.perm_district_np} onChange={handleChange} />
              </div>
              <div className="col-4">
                <input name="perm_local_np" className="dotted-input medium-input" value={form.perm_local_np} onChange={handleChange} />
              </div>
              <div className="col-4 text-right">
                <label>वडा नं -</label>
                <input name="perm_ward_np" className="dotted-input tiny-input" value={form.perm_ward_np} onChange={handleChange} />
              </div>
            </div>
            <div className="detail-grid-row">
              <div className="col-4">
                <label className="en-label">Permanent Address:</label><br />
                <label className="en-label">District :</label>
                <input name="perm_district_en" className="dotted-input medium-input uppercase" value={form.perm_district_en} onChange={handleChange} />
              </div>
              <div className="col-4" style={{ display: "flex", alignItems: "flex-end" }}>
                <input name="perm_local_en" className="dotted-input medium-input uppercase" value={form.perm_local_en} onChange={handleChange} />
              </div>
              <div className="col-4 text-right" style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                <label className="en-label">Ward no :-</label>
                <input name="perm_ward_en" className="dotted-input tiny-input" value={form.perm_ward_en} onChange={handleChange} />
              </div>
            </div>

            <div className="detail-grid-row mt-10">
              <div className="col-6">
                <label>६. जन्म मिति (वि.सं.) : <span className="red">*</span></label>
                <input name="dob_bs" className="dotted-input medium-input" value={form.dob_bs} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="en-label">Date of birth (A.D) :</label>
                <input type="date" name="dob_ad" className="dotted-input" value={form.dob_ad} onChange={handleChange} />
              </div>
            </div>

            {/* Father */}
            <div className="detail-grid-row mt-10">
              <div className="col-4">
                <label>७. बाबुको नाम, थर :</label>
                <input name="father_name" className="dotted-input full-width-input" value={form.father_name} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label>बाबुको वतन :</label>
                <input name="father_address" className="dotted-input full-width-input" value={form.father_address} onChange={handleChange} />
              </div>
              <div className="col-4 text-right">
                <label>नागरिकताको किसिम :</label>
                <select name="father_cit_type" className="inline-select" value={form.father_cit_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Mother */}
            <div className="detail-grid-row mt-10">
              <div className="col-4">
                <label>८. आमाको नाम थर :</label>
                <input name="mother_name" className="dotted-input full-width-input" value={form.mother_name} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label>आमाको वतन :</label>
                <input name="mother_address" className="dotted-input full-width-input" value={form.mother_address} onChange={handleChange} />
              </div>
              <div className="col-4 text-right">
                <label>नागरिकताको किसिम :</label>
                <select name="mother_cit_type" className="inline-select" value={form.mother_cit_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Spouse */}
            <div className="detail-grid-row mt-10 mb-10">
              <div className="col-4">
                <label>९. पति/पत्नीको नाम थर :</label>
                <input name="spouse_name" className="dotted-input full-width-input" value={form.spouse_name} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label>पतिको वतन :</label>
                <input name="spouse_address" className="dotted-input full-width-input" value={form.spouse_address} onChange={handleChange} />
              </div>
              <div className="col-4 text-right">
                <label>नागरिकताको किसिम :</label>
                <select name="spouse_cit_type" className="inline-select" value={form.spouse_cit_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

          </div>{/* end details-border-box */}

          <p className="body-paragraph mt-20">
            माथि उल्लेखित विवरण मेरो{" "}
            <input name="issued_office" className="dotted-input medium-input" value={form.issued_office} onChange={handleChange} />{" "}
            कार्यालयबाट लिएको नं{" "}
            <input name="issued_no" className="dotted-input small-input" value={form.issued_no} onChange={handleChange} />{" "}
            को ना.प्र.प. को व्यहोरा संग दुरुस्त छ फरक छैन। लेखिएको व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउँला ।
          </p>

          {/* Thumbprint & applicant signature */}
          <div className="signature-flex-container">
            <div className="thumbprint-container">
              <p className="thumbprint-title">औंठा छाप</p>
              <div className="thumbprint-boxes">
                <div className="thumb-box">दायाँ</div>
                <div className="thumb-box">बायाँ</div>
              </div>
            </div>
            <div className="signature-block">
              <p className="bold-text">भवदीय,</p>
              <p className="mt-10">निवेदकको दस्तखत: ................................</p>
              <p className="sig-row mt-10">
                नाम थर: <span className="red">*</span>{" "}
                <input name="applicant_sign_name" className="dotted-input medium-input" value={form.applicant_sign_name} onChange={handleChange} />
              </p>
              <p className="sig-row mt-10">
                मिति:{" "}
                <input type="date" name="applicant_sign_date" className="dotted-input medium-input" value={form.applicant_sign_date} onChange={handleChange} />
              </p>
            </div>
          </div>

          {/* Recommendation box */}
          <div className="recommendation-border-box">
            <h4 className="center-text bold-text underline-text mb-20">यो प्रतिलिपि ना.प्र.प. को लागि सिफारिस</h4>
            <p className="body-paragraph">
              <input name="rec_birth_local"   className="dotted-input medium-input" value={form.rec_birth_local}   onChange={handleChange} placeholder="जन्म ठाउँ" />{" "}
              वडा नं.{" "}
              <input name="rec_birth_ward"    className="dotted-input tiny-input"   value={form.rec_birth_ward}    onChange={handleChange} />{" "}
              मा मिति{" "}
              <input type="date" name="rec_birth_date" className="dotted-input"    value={form.rec_birth_date}    onChange={handleChange} />{" "}
              मा जन्म भई हाल{" "}
              <input name="rec_current_local" className="dotted-input medium-input" value={form.rec_current_local} onChange={handleChange} placeholder="हाल ठाउँ" />{" "}
              वडा नं.{" "}
              <input name="rec_current_ward"  className="dotted-input tiny-input"   value={form.rec_current_ward}  onChange={handleChange} />{" "}
              मा स्थायी रुपमा बसोबास गरी आएका यसमा लेखिएका{" "}
              <select name="rec_guardian_title" className="inline-select" value={form.rec_guardian_title} onChange={handleChange}>
                <option value="श्रीमान्">श्रीमान्</option>
                <option value="श्रीमती">श्रीमती</option>
              </select>{" "}
              <input name="rec_guardian_name"   className="dotted-input long-input"   value={form.rec_guardian_name}   onChange={handleChange} placeholder="अभिभावकको नाम *" />{" "}
              को{" "}
              <select name="rec_relation_type" className="inline-select" value={form.rec_relation_type} onChange={handleChange}>
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
                <option value="पत्नी">पत्नी</option>
              </select>{" "}
              को{" "}
              <select name="rec_applicant_title" className="inline-select" value={form.rec_applicant_title} onChange={handleChange}>
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>{" "}
              <input name="rec_applicant_name" className="dotted-input long-input" value={form.rec_applicant_name} onChange={handleChange} placeholder="निवेदकको नाम *" />{" "}
              लाई म चिन्दछु । निजको माग बमोजिम उपयुक्त विवरण भएको नं{" "}
              <input name="rec_cit_no"   className="dotted-input small-input" value={form.rec_cit_no}   onChange={handleChange} />{" "}
              मिति{" "}
              <input type="date" name="rec_cit_date" className="dotted-input" value={form.rec_cit_date} onChange={handleChange} />{" "}
              को नागरिकता प्रमाणपत्रको सक्कल प्रति{" "}
              <select name="rec_cit_reason" className="inline-select" value={form.rec_cit_reason} onChange={handleChange}>
                <option value="झुत्रो भएको">झुत्रो भएको</option>
                <option value="हराएको">हराएको</option>
              </select>{" "}
              व्यहोरा साँचो हुँदा प्रतिलिपि दिएमा फरक नपर्ने व्यहोरा सिफारिस गर्दछु । उक्त विवरण झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला ।
            </p>

            <div className="rec-footer-flex mt-20">
              <div className="photo-box-container">
                <div className="photo-box">
                  दुवै कान देखिने हाल<br />खिचिएको २.५ x ३<br />से.मी. फोटो
                </div>
              </div>
              <div className="office-stamp-container center-text">
                <p>कार्यालयको नाम र छाप</p>
                <p className="bold-text">{MUNICIPALITY.name}</p>
              </div>
              <div className="rec-signatory-container">
                <p>सिफारिस गर्नेको :</p>
                <p className="mt-10">दस्तखत: ........................</p>
                <p className="sig-row mt-10">
                  नाम थर <span className="red">*</span>{" "}
                  <input name="rec_signatory_name" className="dotted-input medium-input" value={form.rec_signatory_name} onChange={handleChange} />
                </p>
                <p className="sig-row mt-10">
                  पद{" "}
                  <select name="rec_signatory_position" className="inline-select medium-input" value={form.rec_signatory_position} onChange={handleChange}>
                    <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                    <option value="वडा सचिव">वडा सचिव</option>
                    <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
                  </select>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom admin section */}
          <div className="bottom-admin-section center-text mt-30">
            <p>मिति <input type="date" name="bottom_date" className="dotted-input" value={form.bottom_date} onChange={handleChange} /></p>
            <p>जिल्ला प्रशासन कार्यालय, {MUNICIPALITY.city || "काठमाडौँ"}</p>
            <p>बाट</p>
          </div>
          <p className="body-paragraph mt-20">
            निवेदक श्री{" "}
            <input name="bottom_applicant_name" className="dotted-input medium-input" value={form.bottom_applicant_name} onChange={handleChange} />{" "}
            नाता भएकोले निजले मागअनुसार पतिको नाम थर वतन समावेश गरि नागरिकता प्रमाणपत्रको प्रतिलिपि दिएको कुनै फरक पर्दैन।
            व्यहोरा साँचो हो, झुठो ठहरे ऐन-कानुनअनुसारको सजाय भोग्न तयार छु भनि सहिछाप गर्ने निवेदकको{" "}
            <input name="bottom_applicant_relation" className="dotted-input small-input" value={form.bottom_applicant_relation} onChange={handleChange} />{" "}
            नाता पर्ने म{" "}
            <input name="bottom_sanakhat_name" className="dotted-input medium-input" value={form.bottom_sanakhat_name} onChange={handleChange} />
          </p>

        </div>{/* end form-body */}

        {/* Applicant details footer (screen only) */}
        <div className="hide-print mt-30">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* Submit */}
        <div className="form-footer hide-print">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
}