import React, { useState, useEffect } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CitizenshipCertificateCopy.css)
   All classes prefixed with "ccc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .ccc-container {
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
  .ccc-bold       { font-weight: bold; }
  .ccc-red        { color: red; font-weight: bold; margin: 0 2px; }
  .ccc-text-right { text-align: right; }

  /* ── Top Bar ── */
  .ccc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .ccc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .ccc-header { text-align: center; margin-bottom: 20px; position: relative; }
  .ccc-header-logo img { position: absolute; left: 0; top: 0; width: 90px; }
  .ccc-header-text { display: flex; flex-direction: column; align-items: center; }
  .ccc-municipality-name { color: #e74c3c; font-size: 1.8rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .ccc-ward-title        { color: #e74c3c; font-size: 2rem;   margin: 5px 0; font-weight: bold; }
  .ccc-address-text,
  .ccc-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .ccc-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .ccc-meta-row p    { margin: 5px 0; }
  .ccc-nepali-date   { font-size: 0.9rem; font-weight: bold; color: #b30000; }

  /* ── Inputs ── */
  .ccc-dotted {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 0 5px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 1.05rem;
    text-align: center;
  }
  .ccc-tiny   { width: 40px; }
  .ccc-small  { width: 100px; }
  .ccc-medium { width: 150px; }
  .ccc-long   { width: 250px; }

  .ccc-select {
    border: 1px solid #ccc;
    background-color: transparent;
    padding: 2px 4px;
    margin: 0 2px;
    font-size: 1rem;
    font-family: inherit;
  }

  /* ── Addressee ── */
  .ccc-addressee   { margin-bottom: 20px; font-size: 1.05rem; line-height: 1.6; }
  .ccc-addressee p { margin: 2px 0; }

  /* ── Subject ── */
  .ccc-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .ccc-body { font-size: 1.05rem; margin-bottom: 30px; }
  .ccc-para { line-height: 2.4; text-align: justify; margin: 0; }

  /* ── Signature ── */
  .ccc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .ccc-signature-block { width: 250px; text-align: center; position: relative; }
  .ccc-red-star { position: absolute; color: red; top: -10px; left: 0; }
  .ccc-line-input {
    width: 100%;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px dotted #000;
    outline: none;
    background: transparent;
    text-align: center;
    font-family: inherit;
    font-size: 1rem;
  }
  .ccc-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    text-align: center;
  }

  /* ── Applicant details (scoped) ── */
  .ccc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .ccc-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .ccc-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .ccc-container .detail-group { display: flex; flex-direction: column; }
  .ccc-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .ccc-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .ccc-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .ccc-footer { text-align: center; margin-top: 40px; }
  .ccc-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: 0.2s;
  }
  .ccc-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .ccc-save-btn:disabled { background-color: #7f8c8d; cursor: not-allowed; }

  .ccc-msg        { margin-top: 15px; font-weight: bold; }
  .ccc-msg-success { color: green; }
  .ccc-msg-error   { color: crimson; }

  .ccc-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print ── */
  .ccc-hide-print { display: block; }

  /* ── Print ── */
  @media print {
    .ccc-hide-print,
    .ccc-top-bar,
    .ccc-copyright { display: none !important; }

    .ccc-container {
      padding: 0;
      background-image: none;
    }
    .ccc-dotted,
    .ccc-select,
    .ccc-line-input,
    .ccc-designation-select {
      border: none !important;
      appearance: none;
      background: transparent;
    }
    .ccc-select { padding: 0; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-proof-copy";

const buildInitialState = (ward) => ({
  letter_no:               "२०८२/८३",
  reference_no:            "",
  date:                    new Date().toISOString().slice(0, 10),
  recipient_office_type:   "जिल्ला",
  recipient_location:      "",
  current_district:        "काठमाडौँ",
  current_local_unit:      MUNICIPALITY?.name?.replace(" नगरपालिका", "") || "नागार्जुन",
  current_local_unit_type: "नगरपालिका",
  current_ward:            ward ? String(ward) : "१",
  prev_district:           "काठमाडौँ",
  prev_local_unit_type:    "",
  prev_ward:               "",
  applicant_name_body:     "",
  cit_no:                  "",
  relation:                "",
  issue_district:          "काठमाडौँ",
  condition:               "झुत्रो भएको",
  signatory_name:          "",
  signatory_position:      "",
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",
  notes:                   "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipCertificateCopy() {
  const { user } = useAuth();

  const [form,    setForm]    = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, current_ward: String(user.ward) }));
    }
  }, [user]);

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name)           return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no) return "नागरिकता नं. आवश्यक छ।";
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
      window.print();
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ हुन सकेन" });
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

      <form className="ccc-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="ccc-top-bar ccc-hide-print">
          नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
          <span className="ccc-breadcrumb">
            नेपाली नागरिकता &gt; नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
          </span>
        </div>

        {/* ── Header ── */}
        <div className="ccc-header">
          <div className="ccc-header-logo">
            <img src={MUNICIPALITY?.logoSrc || "/nepallogo.svg"} alt="Nepal Emblem" />
          </div>
          <div className="ccc-header-text">
            <h1 className="ccc-municipality-name">{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</h1>
            <h2 className="ccc-ward-title">{user?.ward || "१"} नं. वडा कार्यालय</h2>
            <p className="ccc-address-text">{MUNICIPALITY?.officeLine || "नागार्जुन, काठमाडौँ"}</p>
            <p className="ccc-province-text">{MUNICIPALITY?.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="ccc-meta-row">
          <div className="ccc-meta-left">
            <p>पत्र संख्या : <span className="ccc-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :
              <input name="reference_no" value={form.reference_no} onChange={handleChange} className="ccc-dotted ccc-small" />
            </p>
          </div>
          <div className="ccc-meta-right ccc-text-right">
            <p>
              मिति :
              <input type="date" name="date" value={form.date} onChange={handleChange} className="ccc-dotted" />
            </p>
            <p className="ccc-nepali-date">ने.सं - 1146 चौलागा, 24 शनिबार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="ccc-addressee">
          <p>
            श्री{" "}
            <select name="recipient_office_type" className="ccc-select" value={form.recipient_office_type} onChange={handleChange}>
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            {" "}प्रशासन कार्यालय,
          </p>
          <p>
            <span className="ccc-red">*</span>
            <input name="recipient_location" value={form.recipient_location} onChange={handleChange} className="ccc-dotted ccc-medium" />
            , काठमाडौँ ।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="ccc-subject">
          <p>विषय: <u>सिफारिस सम्बन्धमा ।</u></p>
        </div>

        {/* ── Body ── */}
        <div className="ccc-body">
          <p className="ccc-para">
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ{" "}
            <input name="current_local_unit"      value={form.current_local_unit}      onChange={handleChange} className="ccc-dotted ccc-medium ccc-bold" />
            <input name="current_local_unit_type" value={form.current_local_unit_type} onChange={handleChange} className="ccc-dotted ccc-medium" />
            {" "}वडा नं {form.current_ward} (साविक जिल्ला काठमाडौँ{" "}
            <select name="prev_local_unit_type" className="ccc-select" value={form.prev_local_unit_type} onChange={handleChange}>
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            {" "}वडा नं <span className="ccc-red">*</span>
            <input name="prev_ward" value={form.prev_ward} onChange={handleChange} className="ccc-dotted ccc-tiny" />
            ) मा स्थायी रुपले बसोबास गरि बस्ने{" "}
            <span className="ccc-red">*</span>
            <input name="applicant_name_body" value={form.applicant_name_body} onChange={handleChange} className="ccc-dotted ccc-long" />
            {" "}ले{" "}
            <span className="ccc-red">*</span>
            <input name="cit_no" value={form.cit_no} onChange={handleChange} className="ccc-dotted ccc-medium" />
            {" "}नं.{" "}
            <span className="ccc-red">*</span>
            <input name="relation" value={form.relation} onChange={handleChange} className="ccc-dotted ccc-small" />
            {" "}नाताले जि.प्र.का.{" "}
            <input name="issue_district" value={form.issue_district} onChange={handleChange} className="ccc-dotted ccc-small" />
            {" "}बाट नागरिकता प्रमाण पत्र प्राप्त गर्नु भएकोमा सो नागरिकता प्रमाणपत्र{" "}
            <select name="condition" className="ccc-select" value={form.condition} onChange={handleChange}>
              <option value="झुत्रो भएको">झुत्रो भएको</option>
              <option value="हराएको">हराएको</option>
            </select>
            {" "}ले निजलाई प्रतिलिपी नागरिकता नियमानुसार उपलब्ध गराइदिनु हुन स्थायी बसोबास प्रमाणित, साथ सिफारिस गरिएको व्यहोरा अनुरोध छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="ccc-signature-section">
          <div className="ccc-signature-block">
            <span className="ccc-red-star">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="ccc-line-input"
            />
            <select
              name="signatory_position"
              value={form.signatory_position}
              onChange={handleChange}
              className="ccc-designation-select"
            >
              <option value="">| पद छनौट गर्नुहोस् |</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="ccc-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer ── */}
        <div className="ccc-footer ccc-hide-print">
          <button className="ccc-save-btn" type="submit" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
          {message && (
            <div className={`ccc-msg ${message.type === "error" ? "ccc-msg-error" : "ccc-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="ccc-copyright ccc-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>

      </form>
    </>
  );
}