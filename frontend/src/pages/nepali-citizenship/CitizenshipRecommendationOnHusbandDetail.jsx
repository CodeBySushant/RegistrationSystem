import React, { useState, useEffect } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CitizenshipRecommendationOnHusbandDetail.css)
   All classes prefixed with "crhd-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .crhd-container {
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
  .crhd-bold      { font-weight: bold; }
  .crhd-underline { text-decoration: underline; text-underline-offset: 4px; }
  .crhd-red       { color: red; font-weight: bold; margin: 0 2px; }

  /* ── Top Bar ── */
  .crhd-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .crhd-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .crhd-header { text-align: center; margin-bottom: 20px; position: relative; }
  .crhd-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .crhd-header-text { display: flex; flex-direction: column; align-items: center; }
  .crhd-municipality-name { color: #e74c3c; font-size: 1.8rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .crhd-ward-title        { color: #e74c3c; font-size: 2rem;   margin: 5px 0; font-weight: bold; }
  .crhd-address-text,
  .crhd-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .crhd-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .crhd-meta-left p, .crhd-meta-right p { margin: 5px 0; }
  .crhd-meta-right    { text-align: right; }
  .crhd-nepali-date   { font-size: 0.9rem; font-weight: bold; color: #b30000; }

  /* ── Inputs ── */
  .crhd-dotted {
    border: none;
    border-bottom: 1px solid #555;
    background: #fff;
    outline: none;
    padding: 1px 4px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.92rem;
    text-align: center;
    height: 24px;
    line-height: 1;
    vertical-align: middle;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .crhd-tiny   { width: 44px;  }
  .crhd-small  { width: 100px; }
  .crhd-medium { width: 170px; }
  .crhd-long   { width: 240px; }

  .crhd-select-input {
    appearance: auto;
    padding: 1px 4px;
    height: 24px;
    font-size: 0.92rem;
    background: #fff;
    vertical-align: middle;
    border-radius: 2px;
    border: 1px solid #ccc;
    font-family: inherit;
  }

  input[type="date"].crhd-dotted {
    width: 150px;
    padding: 1px 4px;
  }

  /* ── Addressee ── */
  .crhd-addressee   { margin: 20px 0; font-size: 1.05rem; line-height: 1.8; }
  .crhd-addressee p { margin: 2px 0; }

  /* ── Subject ── */
  .crhd-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .crhd-body { font-size: 1.05rem; margin-bottom: 30px; }
  .crhd-para { line-height: 2.4; text-align: justify; margin: 0; }

  /* ── Signature ── */
  .crhd-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .crhd-signature-block { width: 250px; text-align: center; position: relative; }
  .crhd-sig-line {
    width: 100%;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #555;
    outline: none;
    background: #fff;
    text-align: center;
    font-family: inherit;
    font-size: 0.95rem;
    height: 28px;
    box-sizing: border-box;
    padding: 2px 6px;
    display: block;
  }
  .crhd-designation-select {
    width: 100%;
    padding: 4px 6px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 0.95rem;
    text-align: center;
    height: 32px;
    box-sizing: border-box;
    border-radius: 3px;
  }

  /* ── Applicant details (scoped) ── */
  .crhd-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.85);
    margin-top: 20px;
    border-radius: 4px;
  }
  .crhd-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .crhd-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .crhd-container .detail-group { display: flex; flex-direction: column; }
  .crhd-container .detail-group label { font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #333; }
  .crhd-container .detail-input {
    border: 1px solid #ccc;
    padding: 6px 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
    height: 34px;
    font-size: 0.95rem;
    background: #fff;
    font-family: inherit;
  }
  .crhd-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Submit message ── */
  .crhd-msg         { margin-top: 15px; font-weight: bold; }
  .crhd-msg-success { color: green; }
  .crhd-msg-error   { color: crimson; }

  /* ── Footer ── */
  .crhd-footer { text-align: center; margin-top: 40px; }
  .crhd-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 9px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .crhd-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .crhd-save-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  .crhd-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print ── */
  .crhd-hide-print { display: block; }

  /* ── Print ── */
  @media print {
    .crhd-hide-print { display: none !important; }
    body * { visibility: hidden; }
    .crhd-container,
    .crhd-container * { visibility: visible; }
    .crhd-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
      border: none;
    }
    .crhd-dotted,
    .crhd-select-input,
    .crhd-sig-line,
    .crhd-designation-select {
      border: none;
      border-bottom: 1px solid #333;
      background: transparent !important;
      box-shadow: none;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-recommendation-husband";

const buildInitialState = (ward) => ({
  letter_no:               "२०८२/८३",
  reference_no:            "",
  date:                    new Date().toISOString().slice(0, 10),
  recipient_office:        "जिल्ला",
  recipient_district:      "काठमाडौँ",
  recipient_municipality:  MUNICIPALITY?.name || "",
  local_unit:              "",
  ward_no:                 ward ? String(ward) : "१",
  husband_name_body:       "",
  wife_name_body:          "",
  pre_marriage_office:     "जिल्ला",
  pre_marriage_district:   "",
  pre_marriage_prpn_no:    "",
  pre_marriage_cit_date:   new Date().toISOString().slice(0, 10),
  marriage_district:       "काठमाडौँ",
  marriage_municipality:   MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  marriage_ward:           "",
  husband_name:            "",
  marriage_date:           new Date().toISOString().slice(0, 10),
  signatory_name:          "",
  signatory_position:      "",
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipRecommendationOnHusbandDetail() {
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
    if (!form.applicant_name?.trim())           return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no?.trim()) return "नागरिकता नं. आवश्यक छ।";
    return null;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMessage(null);

    const v = validate();
    if (v) { setMessage({ type: "error", text: v }); return; }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const ct   = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object"
          ? body.message || JSON.stringify(body)
          : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: "रेकर्ड सफलतापूर्वक सेभ भयो" });
      setTimeout(() => window.print(), 300);
    } catch (err) {
      console.error("submit error", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सम्भव भएन" });
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

      <form className="crhd-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top Bar ── */}
        <div className="crhd-top-bar crhd-hide-print">
          पतिको नाममा नेपाली नागरिकताको प्रमाण-पत्र ।
          <span className="crhd-breadcrumb">
            नेपाली नागरिकता &gt; पतिको नाममा नेपाली नागरिकताको प्रमाण पत्र
          </span>
        </div>

        {/* ── Header ── */}
        <div className="crhd-header">
          <div className="crhd-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="crhd-header-text">
            <h1 className="crhd-municipality-name">{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</h1>
            <h2 className="crhd-ward-title">{form.ward_no} नं. वडा कार्यालय</h2>
            <p className="crhd-address-text">{MUNICIPALITY?.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
            <p className="crhd-province-text">{MUNICIPALITY?.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="crhd-meta-row">
          <div className="crhd-meta-left">
            <p>पत्र संख्या : <span className="crhd-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :
              <input name="reference_no" className="crhd-dotted crhd-small" value={form.reference_no} onChange={handleChange} autoComplete="off" />
            </p>
          </div>
          <div className="crhd-meta-right">
            <p>
              मिति :
              <input type="date" name="date" className="crhd-dotted" value={form.date} onChange={handleChange} />
            </p>
            <p className="crhd-nepali-date">ने.सं - 1146 चौलागा, 23 शुक्रबार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="crhd-addressee">
          <p>
            श्री{" "}
            <select name="recipient_office" className="crhd-select-input" value={form.recipient_office} onChange={handleChange}>
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            {" "}प्रशासन कार्यालय,
          </p>
          <p>
            <input name="recipient_district"     className="crhd-dotted crhd-medium crhd-bold" value={form.recipient_district}     onChange={handleChange} placeholder="काठमाडौँ" />
            ,{" "}
            <input name="recipient_municipality" className="crhd-dotted crhd-medium crhd-bold" value={form.recipient_municipality} onChange={handleChange} placeholder="नगरपालिका" />
            {" "}।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="crhd-subject">
          <p>विषय: <u>सिफारिस सम्बन्धमा ।</u></p>
        </div>

        {/* ── Body ── */}
        <div className="crhd-body">
          <p className="crhd-para">
            प्रस्तुत विषयमा यस {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
            <input name="local_unit"  className="crhd-dotted crhd-small"  value={form.local_unit}  onChange={handleChange} />
            {" "}वडा नं.{" "}
            <input name="ward_no"     className="crhd-dotted crhd-tiny"   value={form.ward_no}     onChange={handleChange} />
            {" "}, निवासी{" "}
            <input name="husband_name_body" className="crhd-dotted crhd-long" value={form.husband_name_body} onChange={handleChange} />
            {" "}को श्रीमति{" "}
            <input name="wife_name_body"    className="crhd-dotted crhd-long" value={form.wife_name_body}    onChange={handleChange} />
            {" "}ले विवाह पूर्व{" "}
            <select name="pre_marriage_office" className="crhd-select-input" value={form.pre_marriage_office} onChange={handleChange}>
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            {" "}प्रशासन कार्यालय{" "}
            <input name="pre_marriage_district" className="crhd-dotted crhd-medium" value={form.pre_marriage_district} onChange={handleChange} />
            {" "}बाट ना.प्र.नं.{" "}
            <input name="pre_marriage_prpn_no"  className="crhd-dotted crhd-medium" value={form.pre_marriage_prpn_no}  onChange={handleChange} />
            {" "}को नेपाली नागरिकताको प्रमाण-पत्र मिति{" "}
            <input type="date" name="pre_marriage_cit_date" className="crhd-dotted" value={form.pre_marriage_cit_date} onChange={handleChange} />
            {" "}मा लिनु भई निजको विवाह{" "}
            <input name="marriage_district"     className="crhd-dotted crhd-small"  value={form.marriage_district}     onChange={handleChange} placeholder="काठमाडौँ" />
            {" "}जिल्ला{" "}
            <input name="marriage_municipality" className="crhd-dotted crhd-medium" value={form.marriage_municipality} onChange={handleChange} placeholder="नगरपालिका" />
            {" "}वडा नं.{" "}
            <input name="marriage_ward"         className="crhd-dotted crhd-tiny"   value={form.marriage_ward}         onChange={handleChange} />
            {" "}निवासी{" "}
            <input name="husband_name"          className="crhd-dotted crhd-long"   value={form.husband_name}          onChange={handleChange} />
            {" "}संग मिति{" "}
            <input type="date" name="marriage_date" className="crhd-dotted" value={form.marriage_date} onChange={handleChange} />
            {" "}मा भएको हुँदा निजलाई पतिको थर र ठेगाना राखी नेपाली नागरिकताको
            प्रमाण-पत्र उपलब्ध गराई दिन हुन सिफारिस साथ अनुरोध छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="crhd-signature-section">
          <div className="crhd-signature-block">
            <input
              name="signatory_name"
              className="crhd-sig-line"
              value={form.signatory_name}
              onChange={handleChange}
              placeholder="नाम"
            />
            <select
              name="signatory_position"
              className="crhd-designation-select"
              value={form.signatory_position}
              onChange={handleChange}
            >
              <option value="">| पद छनौट गर्नुहोस् |</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="crhd-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer ── */}
        <div className="crhd-footer crhd-hide-print">
          <button className="crhd-save-btn" type="submit" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
          {message && (
            <div className={`crhd-msg ${message.type === "error" ? "crhd-msg-error" : "crhd-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="crhd-copyright crhd-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
        </div>

      </form>
    </>
  );
}