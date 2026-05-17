// src/components/CitizenshipRecommendation.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CitizenshipRecommendation.css)
   All classes prefixed with "cr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .cr-container {
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
  .cr-bold      { font-weight: bold; }
  .cr-underline { text-decoration: underline; }
  .cr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .cr-right     { text-align: right; }

  /* ── Top Bar ── */
  .cr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .cr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .cr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .cr-header-logo img { position: absolute; left: 0; top: 0; width: 90px; }
  .cr-header-text { display: flex; flex-direction: column; align-items: center; }
  .cr-municipality-name { color: #e74c3c; font-size: 1.8rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .cr-ward-title        { color: #e74c3c; font-size: 2rem;   margin: 5px 0; font-weight: bold; }
  .cr-address-text,
  .cr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .cr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .cr-meta-row p    { margin: 5px 0; }
  .cr-nepali-date   { font-size: 0.9rem; font-weight: bold; color: #b30000; }

  /* ── Inputs ── */
  .cr-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background-color: #fff;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
    color: #000;
    vertical-align: middle;
  }
  .cr-dotted:focus { border-bottom-color: #c0392b; background-color: #fffaf9; }

  .cr-small  { width: 120px; }
  .cr-medium { width: 220px; }
  .cr-long   { width: 350px; }

  .cr-line {
    border: none;
    border-bottom: 1px solid #000;
    background-color: #fff;
    outline: none;
    margin: 0 5px;
    padding: 0 5px;
    font-family: inherit;
    font-size: 1rem;
    color: #000;
    vertical-align: middle;
  }
  .cr-line:focus { border-bottom-color: #c0392b; background-color: #fffaf9; }

  .cr-inline-select {
    font-family: inherit;
    font-size: 1rem;
    padding: 2px 4px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #000;
    vertical-align: middle;
  }

  /* ── Recipient ── */
  .cr-recipient   { margin-top: 20px; font-size: 1.05rem; line-height: 1.5; }
  .cr-recipient p { margin: 2px 0; }

  /* ── Subject ── */
  .cr-subject { text-align: center; margin: 20px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Intro paragraph ── */
  .cr-intro { text-align: justify; line-height: 2; margin-bottom: 20px; font-size: 1rem; }

  /* ── Details list ── */
  .cr-details-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
    font-size: 1rem;
  }
  .cr-list-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
  }

  /* ── Photo + Signature ── */
  .cr-photo-sig-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;
  }
  .cr-photo-container p { margin-bottom: 5px; font-size: 0.95rem; }
  .cr-photo-box {
    width: 110px;
    height: 130px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    background-color: #fafafa;
  }

  .cr-signature-section { display: flex; justify-content: flex-end; }
  .cr-signature-block   { width: 250px; text-align: center; position: relative; }
  .cr-red-star          { position: absolute; color: red; top: -10px; left: 0; }
  .cr-sig-line-input {
    width: 100%;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px dotted #000;
    outline: none;
    background-color: #fff;
    text-align: center;
    font-family: inherit;
    font-size: 1rem;
  }
  .cr-sig-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-family: inherit;
    font-size: 1rem;
    text-align: center;
    border-radius: 3px;
    color: #000;
  }

  /* ── Sanakhat ── */
  .cr-sanakhat      { margin-top: 40px; font-size: 1rem; }
  .cr-sanakhat-title { text-align: center; font-size: 1.2rem; font-weight: bold; margin-bottom: 15px; }
  .cr-sanakhat-text  { text-align: justify; line-height: 2; margin-bottom: 20px; }
  .cr-sanakhat-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .cr-sanakhat-fields { display: flex; flex-direction: column; gap: 10px; width: 60%; }
  .cr-sanakhat-row    { display: flex; align-items: center; gap: 10px; }
  .cr-sanakhat-row label { width: 80px; }

  /* Thumbprint */
  .cr-thumbprint        { width: 200px; text-align: center; }
  .cr-thumb-title {
    margin-bottom: 5px;
    font-size: 0.9rem;
    border-bottom: 1px solid #000;
    display: inline-block;
    padding: 0 20px;
  }
  .cr-thumb-boxes { display: flex; justify-content: center; }
  .cr-thumb-box {
    width: 80px;
    height: 100px;
    border: 1px solid #000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 5px;
    font-size: 0.8rem;
    border-right: none;
    background-color: #fafafa;
  }
  .cr-thumb-box:last-child { border-right: 1px solid #000; }

  /* ── Applicant details (scoped) ── */
  .cr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.85);
    margin-top: 20px;
    border-radius: 4px;
  }
  .cr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .cr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .cr-container .detail-group { display: flex; flex-direction: column; }
  .cr-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .cr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
  }
  .cr-container .detail-input:focus { border-color: #c0392b; outline: none; background-color: #fffaf9; }
  .cr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Submit message ── */
  .cr-msg         { margin-top: 12px; font-weight: bold; display: block; }
  .cr-msg-success { color: green; }
  .cr-msg-error   { color: crimson; }

  /* ── Footer ── */
  .cr-footer { text-align: center; margin-top: 40px; }
  .cr-save-btn {
    background-color: #2c3e50;
    color: #fff;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.2s;
  }
  .cr-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .cr-save-btn:disabled { background-color: #7f8c8d; cursor: not-allowed; }

  .cr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print ── */
  .cr-hide-print { display: block; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .cr-container,
    .cr-container * { visibility: visible; }
    .cr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0; padding: 0;
      background: white;
      background-image: none;
      box-shadow: none;
      border: none;
    }
    .cr-dotted,
    .cr-line,
    .cr-sig-line-input {
      background-color: transparent !important;
      border-bottom: 1px dotted #999 !important;
    }
    .cr-sig-select,
    .cr-inline-select {
      background-color: transparent !important;
      border: none !important;
      border-bottom: 1px dotted #999 !important;
    }
    .cr-hide-print,
    .cr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants / Helpers
───────────────────────────────────────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-recommendation";

const buildInitialState = (ward) => ({
  letter_no:               "२०८२/८३",
  reference_no:            "",
  date:                    new Date().toISOString().slice(0, 10),
  recipient_office:        "जिल्ला प्रशासन कार्यालय",
  recipient_district:      MUNICIPALITY?.city || "",
  applicant_name_body:     "",
  birth_place:             "",
  father_name:             "",
  father_address:          "",
  mother_name:             "",
  mother_address:          "",
  spouse_name:             "",
  spouse_address:          "",
  permanent_local_unit:    MUNICIPALITY?.name || "",
  ward_no:                 ward ? String(ward) : "",
  relative_name:           "",
  relative_address:        "",
  dob:                     "",
  cit_team_reg_name:       "",
  applicant_signature:     "",
  signatory_name:          "",
  signatory_position:      "",
  sanakhat_applicant_name: "",
  sanakhat_relation:       "",
  sanakhat_name:           "",
  sanakhat_prpn_no:        "",
  sanakhat_signature:      "",
  sanakhat_date:           "",
  applicantName:           "",
  applicantAddress:        "",
  applicantCitizenship:    "",
  applicantPhone:          "",
  notes:                   "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipRecommendation() {
  const { user } = useAuth();

  const [form,    setForm]    = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
  }, [user]);

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name_body.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicantName.trim())       return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      if (res.status === 201 || res.status === 200) {
        setMessage({ type: "success", text: "रेकर्ड सफलतापूर्वक सेभ भयो" });
        setTimeout(() => window.print(), 200);
      } else {
        setMessage({ type: "error", text: "Unexpected response" });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "सेभ गर्न सकिएन",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form className="cr-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top Bar ── */}
        <div className="cr-top-bar cr-hide-print">
          नेपाली नागरिकताको सिफारिस ।
          <span className="cr-breadcrumb">
            नागरिकता &gt; नेपाली नागरिकताको सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="cr-header">
          <div className="cr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="cr-header-text">
            <h1 className="cr-municipality-name">{MUNICIPALITY?.name}</h1>
            <h2 className="cr-ward-title">{user?.ward || "१"} नं. वडा कार्यालय</h2>
            <p className="cr-address-text">{MUNICIPALITY?.officeLine}</p>
            <p className="cr-province-text">{MUNICIPALITY?.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="cr-meta-row">
          <div>
            <p>पत्र संख्या : <span className="cr-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :
              <input name="reference_no" value={form.reference_no} onChange={handleChange} className="cr-dotted cr-small" />
            </p>
          </div>
          <div className="cr-right">
            <p>
              मिति :
              <input type="date" name="date" value={form.date} onChange={handleChange} className="cr-dotted" />
            </p>
            <p className="cr-nepali-date">ने.सं - 1146 चौलागा, 23 शुक्रबार</p>
          </div>
        </div>

        {/* ── Recipient ── */}
        <div className="cr-recipient">
          <p>
            श्री{" "}
            <select name="recipient_office" value={form.recipient_office} onChange={handleChange} className="cr-inline-select">
              <option value="जिल्ला प्रशासन कार्यालय">जिल्ला प्रशासन कार्यालय</option>
              <option value="इलाका प्रशासन कार्यालय">इलाका प्रशासन कार्यालय</option>
            </select>
          </p>
          <p className="cr-bold">
            <input name="recipient_district" value={form.recipient_district} onChange={handleChange} className="cr-dotted cr-small" placeholder="काठमाडौँ" /> ।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="cr-subject">
          विषय: <u>सिफारिस गरिएको ।</u>
        </div>

        {/* ── Intro ── */}
        <div className="cr-intro">
          महोदय,<br />
          यस {MUNICIPALITY?.name} अन्तर्गत निम्न लिखित विवरण भएका श्री{" "}
          <span className="cr-red">*</span>
          <input name="applicant_name_body" value={form.applicant_name_body} onChange={handleChange} className="cr-dotted cr-medium" required />
          {" "}ले स्थायी नेपाली नागरिकताको प्रमाण-पत्र बनाउनको लागि सिफारिस पाऊँ
          भनि निवेदन दिएको हुँदा निम्न विवरणमा उल्लेखित व्यक्तिलाई स्थायी
          नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ
          अनुरोध गर्दछु !
        </div>

        {/* ── Details List ── */}
        <div className="cr-details-list">
          <div className="cr-list-row">
            <span>जन्मस्थान :- <span className="cr-red">*</span></span>
            <input name="birth_place" value={form.birth_place} onChange={handleChange} className="cr-dotted cr-long" />
          </div>
          <div className="cr-list-row">
            <span>बाबुको नाम थर, वतन :- <span className="cr-red">*</span></span>
            <input name="father_name"    value={form.father_name}    onChange={handleChange} className="cr-dotted cr-medium" />
            <span className="cr-red">*</span>
            <input name="father_address" value={form.father_address} onChange={handleChange} className="cr-dotted cr-medium" />
          </div>
          <div className="cr-list-row">
            <span>आमाको नाम थर, वतन :- <span className="cr-red">*</span></span>
            <input name="mother_name"    value={form.mother_name}    onChange={handleChange} className="cr-dotted cr-medium" />
            <span className="cr-red">*</span>
            <input name="mother_address" value={form.mother_address} onChange={handleChange} className="cr-dotted cr-medium" />
          </div>
          <div className="cr-list-row">
            <span>पति/पत्नीको नाम थर, वतन :-</span>
            <input name="spouse_name"    value={form.spouse_name}    onChange={handleChange} className="cr-dotted cr-medium" />
            <input name="spouse_address" value={form.spouse_address} onChange={handleChange} className="cr-dotted cr-medium" />
          </div>
          <div className="cr-list-row">
            <span>स्थायी ठेगाना :-</span> {MUNICIPALITY?.name} वडा नं. {user?.ward || "१"}
          </div>
          <div className="cr-list-row">
            <span>सम्बन्धित व्यक्तिको नाम थर, वतन :-</span>
            <input name="relative_name"    value={form.relative_name}    onChange={handleChange} className="cr-dotted cr-medium" />
            <input name="relative_address" value={form.relative_address} onChange={handleChange} className="cr-dotted cr-medium" />
          </div>
          <div className="cr-list-row">
            <span>जन्म मिति :-</span>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="cr-dotted" />
          </div>
          <div className="cr-list-row">
            <span>जिल्ला प्रशासनबाट खटिएको नागरिकता टोलीमा नाम दर्ता :-</span>
            <input name="cit_team_reg_name" value={form.cit_team_reg_name} onChange={handleChange} className="cr-dotted cr-long" />
          </div>
          <div className="cr-list-row">
            <span>सिफारिस माग गर्ने व्यक्तिको सही :-</span>
            <input name="applicant_signature" value={form.applicant_signature} onChange={handleChange} className="cr-dotted cr-medium" />
          </div>
        </div>

        {/* ── Photo + Signature ── */}
        <div className="cr-photo-sig-flex">
          <div className="cr-photo-container">
            <p>सिफारिस माग गर्नेको फोटो</p>
            <div className="cr-photo-box">फोटो</div>
          </div>
          <div className="cr-signature-section">
            <div className="cr-signature-block">
              <span className="cr-red-star">*</span>
              <input name="signatory_name" value={form.signatory_name} onChange={handleChange} className="cr-sig-line-input" />
              <select name="signatory_position" value={form.signatory_position} onChange={handleChange} className="cr-sig-select">
                <option value="">| पद छनौट गर्नुहोस् |</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Sanakhat ── */}
        <div className="cr-sanakhat">
          <h3 className="cr-sanakhat-title">सनाखत</h3>
          <p className="cr-sanakhat-text">
            निवेदक{" "}
            <input name="sanakhat_applicant_name" value={form.sanakhat_applicant_name} onChange={handleChange} className="cr-dotted cr-medium" />
            {" "}मेरो{" "}
            <input name="sanakhat_relation" value={form.sanakhat_relation} onChange={handleChange} className="cr-dotted cr-small" />
            {" "}नाता हुन ! निजले हालसम्म कही कतैबाट नेपाली नागरिकताको प्रमाण-पत्र
            लिएको छैन ! व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउला भनि
            सनाखत र सहिछाप गर्नेको :
          </p>
          <div className="cr-sanakhat-details">
            <div className="cr-sanakhat-fields">
              <div className="cr-sanakhat-row">
                <label>नाम :-</label>
                <input name="sanakhat_name"      value={form.sanakhat_name}      onChange={handleChange} className="cr-dotted" />
              </div>
              <div className="cr-sanakhat-row">
                <label>ना.प्र.नं. :-</label>
                <input name="sanakhat_prpn_no"   value={form.sanakhat_prpn_no}   onChange={handleChange} className="cr-dotted" />
              </div>
              <div className="cr-sanakhat-row">
                <label>सही छाप :-</label>
                <input name="sanakhat_signature" value={form.sanakhat_signature} onChange={handleChange} className="cr-dotted" />
              </div>
              <div className="cr-sanakhat-row">
                <label>मिति :-</label>
                <input name="sanakhat_date"      value={form.sanakhat_date}      onChange={handleChange} className="cr-dotted" />
              </div>
            </div>
            <div className="cr-thumbprint">
              <p className="cr-thumb-title">औंठा छाप</p>
              <div className="cr-thumb-boxes">
                <div className="cr-thumb-box">दायाँ</div>
                <div className="cr-thumb-box">बायाँ</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="cr-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Message ── */}
        {message && (
          <div className={`cr-msg cr-hide-print ${message.type === "error" ? "cr-msg-error" : "cr-msg-success"}`}>
            {message.text}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="cr-footer cr-hide-print">
          <button type="submit" className="cr-save-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="cr-copyright cr-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
        </div>

      </form>
    </>
  );
}