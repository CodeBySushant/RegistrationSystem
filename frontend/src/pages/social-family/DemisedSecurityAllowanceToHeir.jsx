// src/pages/social-family/DemisedSecurityAllowanceToHeir.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DemisedSecurityAllowanceToHeir.css)
   All classes prefixed with "dsah-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .dsah-container {
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
  .dsah-bold      { font-weight: bold; }
  .dsah-underline { text-decoration: underline; }
  .dsah-red       { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
  .dsah-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .dsah-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .dsah-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .dsah-header { text-align: center; margin-bottom: 20px; position: relative; }
  .dsah-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .dsah-header-text { display: flex; flex-direction: column; align-items: center; }
  .dsah-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .dsah-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .dsah-address-text,
  .dsah-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .dsah-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .dsah-meta-left p, .dsah-meta-right p { margin: 5px 0; }
  .dsah-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .dsah-w-small { width: 120px; }

  /* ── Addressee ── */
  .dsah-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .dsah-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .dsah-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    padding: 0 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .dsah-w-medium { width: 250px; }
  .dsah-w-full   { width: 100%; }

  /* ── Subject ── */
  .dsah-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .dsah-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .dsah-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .dsah-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .dsah-w-tiny-box   { width: 40px;  text-align: center; }
  .dsah-w-medium-box { width: 180px; }

  /* ── Signature ── */
  .dsah-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .dsah-signature-block   { width: 220px; text-align: center; position: relative; }
  .dsah-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .dsah-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .dsah-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .dsah-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .dsah-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .dsah-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .dsah-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .dsah-footer { text-align: center; margin-top: 40px; }
  .dsah-save-print-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .dsah-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
  .dsah-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .dsah-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print (was completely missing in original CSS) ── */
  @media print {
    body * { visibility: hidden; }
    .dsah-container,
    .dsah-container * { visibility: visible; }
    .dsah-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .dsah-top-bar,
    .dsah-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .dsah-municipality-name,
    .dsah-ward-title,
    .dsah-address-text,
    .dsah-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined.
   All defaultValue/no-value inputs converted to controlled state fields.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalani_no: "",
  // addressee — BUG FIX: were uncontrolled (no value/onChange)
  addressee_name:  "",
  addressee_line2: "",
  addressee_line3: "",
  // body — BUG FIX: province/ward_no used defaultValue; rest had no value
  province:                  MUNICIPALITY?.provinceLine || "काठमाडौँ",
  district:                  MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  local_unit_type:           "नगरपालिका",
  ward_no:                   MUNICIPALITY?.wardNumber || "1",
  local_unit_name:           "",
  deceased_name:             "",
  relation_of_applicant:     "",
  bank_account_no:           "",
  beneficiary_relation:      "",
  beneficiary_citizenship_no: "",
  beneficiary_name:          "",
  // signature — BUG FIX: were uncontrolled
  signatory_name:            "",
  signatory_designation:     "",
  // ApplicantDetailsNp fields
  applicantName:             "",
  applicantAddress:          "",
  applicantCitizenship:      "",
  applicantPhone:            "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DemisedSecurityAllowanceToHeir = () => {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleChange = (e) => setField(e.target.name, e.target.value);

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/demised-security-allowance-to-heir", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save + Print ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/demised-security-allowance-to-heir", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      alert("Error saving before print.");
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

      <form className="dsah-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="dsah-top-bar">
          मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई ।
          <span className="dsah-breadcrumb">
            सामाजिक / पारिवारिक &gt; मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई
          </span>
        </div>

        {/* ── Header ──
            BUG FIX: hardcoded strings replaced with MUNICIPALITY config */}
        <div className="dsah-header">
          <div className="dsah-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="dsah-header-text">
            <h1 className="dsah-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="dsah-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`}
            </h2>
            <p className="dsah-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
            <p className="dsah-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="dsah-meta-row">
          <div className="dsah-meta-left">
            <p>पत्र संख्या : <span className="dsah-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="dsah-dotted-input dsah-w-small"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="dsah-meta-right">
            <p>मिति : <span className="dsah-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ──
            BUG FIX: all three inputs had no value/onChange */}
        <div className="dsah-addressee">
          <div className="dsah-addressee-row">
            <span>श्री</span>
            <input
              name="addressee_name"
              type="text"
              className="dsah-line-input dsah-w-medium"
              value={form.addressee_name}
              onChange={handleChange}
              required
            />
            <span className="dsah-red">*</span>
            <span>,</span>
          </div>
          <div className="dsah-addressee-row">
            <input
              name="addressee_line2"
              type="text"
              className="dsah-line-input dsah-w-medium"
              value={form.addressee_line2}
              onChange={handleChange}
              required
            />
            <span className="dsah-red">*</span>
          </div>
          <div className="dsah-addressee-row">
            <input
              name="addressee_line3"
              type="text"
              className="dsah-line-input dsah-w-medium"
              value={form.addressee_line3}
              onChange={handleChange}
              required
            />
            <span className="dsah-red">*</span>
            <span className="dsah-bold">काठमाडौँ</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="dsah-subject">
          <p>
            विषय:{" "}
            <span className="dsah-underline">
              मृतकको सा.सु. भत्ता वापतको रकम उपलब्ध गराईदिने सम्बन्धमा ।
            </span>
          </p>
        </div>

        {/* ── Body ──
            BUG FIX: province/ward_no used defaultValue; rest had no value/onChange at all */}
        <div className="dsah-body">
          <p>
            प्रस्तुत बिषयमा बागमती प्रदेश
            <input
              name="province"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.province}
              onChange={handleChange}
            />
            जिल्ला{" "}
            <input
              name="district"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.district}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span>
            <select
              name="local_unit_type"
              className="dsah-inline-select"
              value={form.local_unit_type}
              onChange={handleChange}
            >
              <option value="गाउँपालिका">गाउँपालिका</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            वडा नं{" "}
            <input
              name="ward_no"
              type="text"
              className="dsah-inline-input dsah-w-tiny-box"
              value={form.ward_no}
              onChange={handleChange}
            />
            स्थायी घर भएका{" "}
            <input
              name="local_unit_name"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.local_unit_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> ले मेरो
            <input
              name="deceased_name"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.deceased_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> नाता पर्ने
            <input
              name="relation_of_applicant"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.relation_of_applicant}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> को मिति २०८२-०८-०६ मा मृत्यु भएको
            हुँदा निजको नाममा तहाँ बैंकको खाता नं.
            <input
              name="bank_account_no"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.bank_account_no}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> मा जम्मा भएको सामाजिक सुरक्षा भत्ता
            वापतको रकम मृतकको
            <input
              name="beneficiary_relation"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.beneficiary_relation}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> नाताका ना.प्र.न.
            <input
              name="beneficiary_citizenship_no"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.beneficiary_citizenship_no}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> को
            <input
              name="beneficiary_name"
              type="text"
              className="dsah-inline-input dsah-w-medium-box"
              value={form.beneficiary_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="dsah-red">*</span> लाई उपलब्ध गराइदिनुहुन सिफारिस साथ
            अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* ── Signature ──
            BUG FIX: both inputs were uncontrolled */}
        <div className="dsah-signature-section">
          <div className="dsah-signature-block">
            <div className="dsah-signature-line"></div>
            <span className="dsah-red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="dsah-sig-name-input"
              value={form.signatory_name}
              onChange={handleChange}
              required
            />
            <select
              name="signatory_designation"
              className="dsah-designation-select"
              value={form.signatory_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="dsah-footer">
          <button
            className="dsah-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="dsah-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DemisedSecurityAllowanceToHeir;