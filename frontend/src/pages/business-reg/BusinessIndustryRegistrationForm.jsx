// src/pages/business-reg/BusinessIndustryRegistrationForm.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "business-industry-registration-form";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.business-registration-container {
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
  border: 1px solid #ddd;
  box-sizing: border-box;
}

/* ── Utility ── */
.bold-text      { font-weight: bold; }
.underline-text { text-decoration: underline; }
.red            { color: red; font-weight: bold; margin: 0 2px; vertical-align: middle; }
.red-text       { color: red; }
.tiny-text      { font-size: 0.8rem; }
.center-text    { text-align: center; }
.small-text     { font-size: 0.85rem; color: #555; }

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
.header-logo p       { position: absolute; left: 10px; top: 85px; }
.header-text         { display: flex; flex-direction: column; align-items: center; }
.municipality-name   { font-size: 2.0rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ward-title          { font-size: 1.8rem; margin: 5px 0; font-weight: bold; }
.address-text,
.province-text       { margin: 0; font-size: 1rem; }
.certificate-title   { font-size: 1.6rem; margin-top: 15px; }
.photo-box-container { position: absolute; top: 50px; right: 0; }
.photo-box           { width: 120px; height: 140px; border: 1px solid #000; background-color: #f9f9f9; }

/* ── Registration info ── */
.reg-info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: bold;
  flex-wrap: wrap;
  gap: 8px;
}

/* ── Shared inputs ── */
.business-registration-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.business-registration-container .dotted-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
}
.small-input  { width: 120px; }
.medium-input { width: 150px; }
.long-input   { width: 300px; }
.tiny-input   { width: 50px; text-align: center; }

/* ── Body ── */
.form-body { font-size: 1rem; line-height: 1.8; text-align: justify; margin-bottom: 30px; }
.form-group-row { display: flex; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
.form-group-row label { margin-right: 5px; }

/* ── Capital grid ── */
.capital-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.capital-row  { display: flex; align-items: center; }
.capital-row label { min-width: 100px; }
.capital-row input { border: none; border-bottom: 1px dotted #000; background: transparent; outline: none; padding: 2px 5px; font-family: inherit; font-size: 1rem; width: 120px; }
.capital-row input:focus { border-color: #2563eb; }

/* ── Kaifiyat ── */
.kaifiyat-section { margin-top: 16px; }
.kaifiyat-box {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 5px;
  resize: vertical;
  margin-top: 5px;
  font-family: inherit;
  font-size: 1rem;
}
.kaifiyat-box:focus { outline: none; border-color: #2563eb; }

/* ── Declaration ── */
.declaration-section { margin-top: 20px; }
.declaration-section p { margin-bottom: 10px; }

/* ── Designation ── */
.designation-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 40px;
  margin-right: 20px;
}
.designation-section input {
  width: 220px;
  max-width: 100%;
  border: none;
  border-bottom: 1px solid #000;
  margin-bottom: 5px;
  text-align: center;
  background: transparent;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
}
.designation-section select {
  width: 220px;
  max-width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
}
.designation-section select:focus { outline: none; border-color: #2563eb; }

/* ── Applicant details box ── */
.applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 20px;
  border-radius: 4px;
}
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.business-registration-container .applicant-details-box .details-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 18px !important;
}
.business-registration-container .applicant-details-box .detail-input { max-width: 400px; width: 100%; }
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

/* ── Toast ── */
.birf-toast {
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
  animation: birf-toast-in 0.25s ease;
  max-width: 360px;
}
.birf-toast--success { background: #1a7f3c; color: #fff; }
.birf-toast--error   { background: #c0392b; color: #fff; }
@keyframes birf-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #34495e;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
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
  .business-registration-container { padding: 20px 14px; }
  .top-bar-title   { flex-direction: column; gap: 4px; }
  .capital-grid    { grid-template-columns: 1fr; }
  .form-group-row  { flex-direction: column; align-items: flex-start; }
  .birf-toast      { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .business-registration-container,
  .business-registration-container * { visibility: visible; }
  .business-registration-container {
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
  .birf-toast,
  .top-bar-title { display: none !important; }
  .dotted-input { border: none !important; border-bottom: 1px dotted #000 !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const CAPITAL_FIELDS = [
  ["authorized_capital", "अधिकृत पूँजी"],
  ["current_capital",    "चालू पूँजी"],
  ["issued_capital",     "जारी पूँजी"],
  ["fixed_capital",      "स्थिर पूँजी"],
  ["paidup_capital",     "चुक्ता पूँजी"],
  ["total_capital",      "कुल पूँजी"],
];

const makeInitialForm = (user) => ({
  registration_no:            "",
  certificate_date:           new Date().toISOString().slice(0, 10),
  full_name:                  "",
  citizenship_no:             "",
  citizenship_issue_date:     "",
  citizenship_issue_district: "",
  municipality:               MUNICIPALITY.name,
  ward_no:                    user?.ward || "",
  tole:                       "",
  residence_district:         MUNICIPALITY.city || "",
  father_name:                "",
  spouse_name:                "",
  business_name:              "",
  business_kind:              "",
  business_nature:            "",
  business_road:              "",
  business_address_line:      "",
  business_address_district:  "",
  business_address_ward:      "",
  business_address_tole:      "",
  declaration_text:           "",
  issuing_signature:          "",
  issuing_seal:               "",
  phone:                      "",
  mobile:                     "",
  email:                      "",
  pan_vat:                    "",
  website:                    "",
  objective:                  "",
  other_registration_no:      "",
  other_registration_office:  "",
  landlord_name:              "",
  landlord_cit_no:            "",
  landlord_issue_date:        "",
  landlord_issue_district:    "",
  landlord_address:           "",
  landlord_district:          "",
  landlord_municipality:      "",
  landlord_ward:              "",
  landlord_tole:              "",
  landlord_phone:             "",
  authorized_capital:         "",
  current_capital:            "",
  issued_capital:             "",
  fixed_capital:              "",
  paidup_capital:             "",
  total_capital:              "",
  kaifiyat:                   "",
  issuing_name:               "",
  issuing_post:               "",
  issuing_date:               new Date().toISOString().slice(0, 10),
  applicantName:              "",
  applicantAddress:           "",
  applicantCitizenship:       "",
  applicantPhone:             "",
});

/* ─────────────────────────── Component ─────────────────────────── */
const BusinessIndustryRegistrationForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState(() => makeInitialForm(user));
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

  const handleSaveAndPrint = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ward_no:            user?.ward || formData.ward_no,
        municipality:       MUNICIPALITY.name,
        authorized_capital: Number(formData.authorized_capital) || null,
        current_capital:    Number(formData.current_capital)    || null,
        issued_capital:     Number(formData.issued_capital)     || null,
        fixed_capital:      Number(formData.fixed_capital)      || null,
        paidup_capital:     Number(formData.paidup_capital)     || null,
        total_capital:      Number(formData.total_capital)      || null,
      };

      const res = await axiosInstance.post(API_URL, payload);
      showToast("success", `रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setFormData(makeInitialForm(user));
      }, 300);
    } catch (err) {
      console.error("submit error:", err);
      const msg = err.response?.data?.message || err.message || "सेभ गर्दा समस्या आयो";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="business-registration-container" onSubmit={handleSaveAndPrint}>

        {/* Toast */}
        {toast && (
          <div className={`birf-toast birf-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          व्यवसाय/उद्योग दर्ता
          <span className="top-right-bread">व्यापार / व्यवसाय &gt; व्यवसाय/उद्योग दर्ता</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
            <p className="red-text tiny-text center-text">प्रतिलिपि</p>
          </div>
          <div className="header-text">
            <h1 className="municipality-name red-text">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title red-text">{wardLabel}</h2>
            <p className="address-text red-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text red-text">{MUNICIPALITY.provinceLine}</p>
            <h3 className="certificate-title red-text underline-text">व्यवसाय दर्ता प्रमाण पत्र</h3>
          </div>
          <div className="photo-box-container">
            <div className="photo-box" />
          </div>
        </div>

        {/* Registration info */}
        <div className="reg-info-row">
          <div className="left-info">
            <label>दर्ता नं :</label>
            <input type="text" name="registration_no" value={formData.registration_no} onChange={handleChange} className="dotted-input small-input" />
          </div>
          <div className="right-info">
            <p>मिति : <span className="bold-text">{new Date().toISOString().slice(0, 10)}</span></p>
          </div>
        </div>

        {/* Form body */}
        <div className="form-body">
          <p>(क) व्यवसाय व्यवसायीको विवरण :-</p>

          <div className="form-group-row">
            <label>१. पूरा नाम, थर : <span className="red">*</span></label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="dotted-input" />
          </div>

          <div className="form-group-row">
            <label>२. नागरिकता नं :</label>
            <input type="text" name="citizenship_no" value={formData.citizenship_no} onChange={handleChange} className="dotted-input medium-input" />
            <label>जारी मिति :</label>
            <input type="text" name="citizenship_issue_date" value={formData.citizenship_issue_date} onChange={handleChange} className="dotted-input medium-input" />
            <label>जिल्ला :</label>
            <input type="text" name="citizenship_issue_district" value={formData.citizenship_issue_district} onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>३. गाउँपालिका/नगरपालिका : {MUNICIPALITY.name}</label>
            <label style={{ marginLeft: "20px" }}>वडा नं : {user?.ward || ""}</label>
            <label style={{ marginLeft: "20px" }}>टोल : <span className="red">*</span></label>
            <input type="text" name="tole" value={formData.tole} onChange={handleChange} className="dotted-input medium-input" />
            <label style={{ marginLeft: "20px" }}>जिल्ला : {MUNICIPALITY.city || ""}</label>
          </div>

          <div className="form-group-row">
            <label>४. बाबुको नाम, थर :</label>
            <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>५. पति/पत्नीको नाम ,थर :</label>
            <input type="text" name="spouse_name" value={formData.spouse_name} onChange={handleChange} className="dotted-input medium-input" />
            <span className="small-text">(बाबुको नाम उल्लेख नभएको भए मात्र)</span>
          </div>

          <div className="form-group-row">
            <label>६. व्यवसायको नाम : <span className="red">*</span></label>
            <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className="dotted-input medium-input" />
            <label>व्यवसायको किसिम : <span className="red">*</span></label>
            <input type="text" name="business_kind" value={formData.business_kind} onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>ख. व्यवसायको किसिम/प्रकृति : <span className="red">*</span></label>
            <input type="text" name="business_nature" value={formData.business_nature} onChange={handleChange} className="dotted-input long-input" />
          </div>

          <div className="form-group-row">
            <label>ग. व्यवसाय रहेको बाटोको नाम <span className="red">*</span></label>
            <input type="text" name="business_road" value={formData.business_road} onChange={handleChange} className="dotted-input long-input" />
          </div>

          <p>१. व्यवसायको ठेगाना</p>
          <div className="form-group-row">
            <input name="business_address_line"     value={formData.business_address_line}     onChange={handleChange} className="dotted-input medium-input" />
            <label>जिल्ला,</label>
            <input name="business_address_district" value={formData.business_address_district} onChange={handleChange} className="dotted-input medium-input" />
            <label>गाउँपालिका/नगरपालिका</label>
            <label>वडा नं</label>
            <input name="business_address_ward"     value={formData.business_address_ward}     onChange={handleChange} className="dotted-input tiny-input" />
            <label>टोल:</label>
            <input name="business_address_tole"     value={formData.business_address_tole}     onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>फोन नं.:</label>
            <input name="phone"  value={formData.phone}  onChange={handleChange} className="dotted-input medium-input" />
            <label>मोबाइल नं. <span className="red">*</span></label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} className="dotted-input medium-input" />
            <label>इमेल: <span className="red">*</span></label>
            <input name="email"  value={formData.email}  onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>पान/ भ्याट नं. : <span className="red">*</span></label>
            <input name="pan_vat" value={formData.pan_vat} onChange={handleChange} className="dotted-input medium-input" />
            <label>वेबसाईट : <span className="red">*</span></label>
            <input name="website" value={formData.website} onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>२. उद्देश्य : <span className="red">*</span></label>
            <input name="objective" value={formData.objective} onChange={handleChange} className="dotted-input long-input" />
          </div>

          <div className="form-group-row">
            <label>अन्यत्र दर्ता भएको भए: दर्ता नं :</label>
            <input name="other_registration_no"     value={formData.other_registration_no}     onChange={handleChange} className="dotted-input medium-input" />
            <label>कार्यालय :</label>
            <input name="other_registration_office" value={formData.other_registration_office} onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <p>ग. बहालमा बसेको भए</p>
          <div className="form-group-row">
            <label>१. घरधनीको नाम, थर:</label>
            <input name="landlord_name"           value={formData.landlord_name}           onChange={handleChange} className="dotted-input medium-input" />
            <label>ना.प्र.नं</label>
            <input name="landlord_cit_no"         value={formData.landlord_cit_no}         onChange={handleChange} className="dotted-input medium-input" />
            <label>जारी मिति:</label>
            <input name="landlord_issue_date"     value={formData.landlord_issue_date}     onChange={handleChange} className="dotted-input medium-input" />
            <label>जारी जिल्ला:</label>
            <input name="landlord_issue_district" value={formData.landlord_issue_district} onChange={handleChange} className="dotted-input medium-input" />
          </div>
          <div className="form-group-row">
            <label>ठेगाना:</label>
            <input name="landlord_address"      value={formData.landlord_address}      onChange={handleChange} className="dotted-input medium-input" />
            <label>जिल्ला:</label>
            <input name="landlord_district"     value={formData.landlord_district}     onChange={handleChange} className="dotted-input medium-input" />
            <label>नगरपालिका:</label>
            <input name="landlord_municipality" value={formData.landlord_municipality} onChange={handleChange} className="dotted-input medium-input" />
          </div>
          <div className="form-group-row">
            <label>वडा नं.:</label>
            <input name="landlord_ward"  value={formData.landlord_ward}  onChange={handleChange} className="dotted-input tiny-input" />
            <label>टोल:</label>
            <input name="landlord_tole"  value={formData.landlord_tole}  onChange={handleChange} className="dotted-input medium-input" />
            <label>फोन नं.:</label>
            <input name="landlord_phone" value={formData.landlord_phone} onChange={handleChange} className="dotted-input medium-input" />
          </div>

          <p>२. पूँजी:</p>
          <p>कम्पनीको हकमा</p>
          <div className="capital-grid">
            {CAPITAL_FIELDS.map(([name, label]) => (
              <div className="capital-row" key={name}>
                <label>{label} : <span className="red">*</span></label>
                <input name={name} value={formData[name]} onChange={handleChange} />
              </div>
            ))}
          </div>

          <div className="kaifiyat-section">
            <label>कैफियत</label>
            <textarea name="kaifiyat" value={formData.kaifiyat} onChange={handleChange} className="kaifiyat-box" rows="3" />
          </div>

          <div className="declaration-section">
            <p>................................................</p>
            <p className="bold-text underline-text">व्यवसायीको छाप</p>
            <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
            <p>................................................</p>
            <p className="bold-text">निवेदकको दस्तखत</p>
          </div>
        </div>

        {/* Designation */}
        <div className="designation-section">
          <input type="text" name="issuing_name" value={formData.issuing_name} onChange={handleChange} placeholder="हस्ताक्षरकर्ताको नाम" />
          <select name="issuing_post" value={formData.issuing_post} onChange={handleChange}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="सचिव">सचिव</option>
            <option value="अध्यक्ष">अध्यक्ष</option>
            <option value="का.वा अध्यक्ष">का.वा अध्यक्ष</option>
          </select>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Footer */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default BusinessIndustryRegistrationForm;