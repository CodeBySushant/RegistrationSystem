// SocialSecurityPaymentClosure.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from SocialSecurityPaymentClosure.css)
   All classes prefixed with "sspc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .sspc-container {
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
  .sspc-bold      { font-weight: bold; }
  .sspc-underline { text-decoration: underline; }

  /* ── Top Bar ── */
  .sspc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .sspc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .sspc-header { text-align: center; margin-bottom: 20px; position: relative; }
  .sspc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .sspc-header-text { display: flex; flex-direction: column; align-items: center; }
  .sspc-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .sspc-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .sspc-address-text,
  .sspc-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .sspc-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .sspc-meta-left p, .sspc-meta-right p { margin: 5px 0; }
  .sspc-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 0 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .sspc-w-small { width: 120px; }

  /* ── Subject ── */
  .sspc-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Addressee ── */
  .sspc-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .sspc-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .sspc-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .sspc-w-medium { width: 200px; }
  .sspc-w-full   { width: 100%; }

  /* ── Body ── */
  .sspc-body {
    font-size: 1.05rem;
    line-height: 2.4;
    text-align: justify;
    margin-bottom: 20px;
  }
  .sspc-inline-input {
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
  .sspc-w-tiny-box   { width: 40px;  text-align: center; }
  .sspc-w-medium-box { width: 160px; }

  /* ── Table ── */
  .sspc-table-section { margin-top: 20px; margin-bottom: 40px; }
  .sspc-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .sspc-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }
  .sspc-table td     { border: 1px solid #555; padding: 5px; }
  .sspc-table-input  {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    color: #e74c3c;
    font-family: inherit;
  }
  .sspc-fake-scrollbar { height: 10px; background: #eee; border-radius: 5px; margin-top: 5px; }
  .sspc-scroll-thumb   { height: 100%; width: 70%; background: #999; border-radius: 5px; }

  /* ── Signature ── */
  .sspc-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .sspc-signature-block   { width: 220px; text-align: center; }
  .sspc-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .sspc-req-wrap {
    position: relative;
    display: block;
    margin-bottom: 5px;
  }
  .sspc-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }
  .sspc-sig-name-input {
    width: 100%;
    padding-left: 18px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .sspc-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .sspc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .sspc-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .sspc-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .sspc-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .sspc-footer { text-align: center; margin-top: 40px; }
  .sspc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .sspc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .sspc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .sspc-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .sspc-container,
    .sspc-container * { visibility: visible; }
    .sspc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }
    .sspc-top-bar,
    .sspc-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .sspc-municipality-name,
    .sspc-ward-title,
    .sspc-address-text,
    .sspc-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .sspc-table th {
      background-color: #e0e0e0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined — crashes on load.
   BUG FIX: chalani_no was in initialState but the input had no name/value/onChange.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalani_no:              "",   // BUG FIX: input was uncontrolled
  addressee_office:        "",
  addressee_address:       "",
  municipality_name:       MUNICIPALITY?.name || "",
  ward_no:                 MUNICIPALITY?.wardNumber || "",
  old_ward_no:             "",
  ward_no_new:             "",
  fiscal_year:             "",
  allowance_type:          "",
  citizenship_no_inline:   "",
  beneficiary_inline_name: "",
  table_name:              "",
  table_citizenship_no:    "",
  table_amount:            "",
  table_return_amount:     "",
  table_beneficiary_no:    "",
  signer_name:             "",
  signer_designation:      "",
  // ApplicantDetailsNp fields
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const SocialSecurityPaymentClosure = () => {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Submit ──
     BUG FIX: the outer element was a bare <div> so onSubmit never fired.
     Now the root element is a <form>. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/social-security-payment-closure", form);
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
      const res = await axios.post("/api/forms/social-security-payment-closure", form);
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

      {/* BUG FIX: was bare <div> — changed to <form> so onSubmit fires */}
      <form className="sspc-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="sspc-top-bar">
          सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिदिने
          <span className="sspc-breadcrumb">
            आर्थिक &gt; सामाजिक सुरक्षा भत्ता रकम भुक्तानी
          </span>
        </div>

        {/* ── Header ── */}
        <div className="sspc-header">
          <div className="sspc-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="sspc-header-text">
            <h1 className="sspc-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="sspc-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`}
            </h2>
            <p className="sspc-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="sspc-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ──
            BUG FIX: chalani_no input had no name/value/onChange */}
        <div className="sspc-meta-row">
          <div className="sspc-meta-left">
            <p>पत्र संख्या : <span className="sspc-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="sspc-dotted-input sspc-w-small"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="sspc-meta-right">
            <p>मिति : <span className="sspc-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="sspc-subject">
          <p>
            विषय:{" "}
            <span className="sspc-underline">
              सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिदिने
            </span>
          </p>
        </div>

        {/* ── Addressee ── */}
        <div className="sspc-addressee">
          <div className="sspc-addressee-row">
            <span>श्री</span>
            <input
              name="addressee_office"
              type="text"
              className="sspc-line-input sspc-w-medium"
              value={form.addressee_office}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sspc-addressee-row">
            <input
              name="addressee_address"
              type="text"
              className="sspc-line-input sspc-w-medium"
              value={form.addressee_address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Body ── */}
        <div className="sspc-body">
          <p>
            प्रस्तुत विषयमा यस{" "}
            <input name="municipality_name"      type="text" className="sspc-inline-input sspc-w-medium-box" value={form.municipality_name}      onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input name="ward_no"                type="text" className="sspc-inline-input sspc-w-tiny-box"   value={form.ward_no}                onChange={handleChange} />{" "}
            साविक{" "}
            <input name="old_ward_no"            type="text" className="sspc-inline-input sspc-w-medium-box" value={form.old_ward_no}            onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input name="ward_no_new"            type="text" className="sspc-inline-input sspc-w-tiny-box"   value={form.ward_no_new}            onChange={handleChange} />{" "}
            बाट आ.व.
            <input name="fiscal_year"            type="text" className="sspc-inline-input sspc-w-medium-box" value={form.fiscal_year}            onChange={handleChange} />{" "}
            को{" "}
            <input name="allowance_type"         type="text" className="sspc-inline-input sspc-w-medium-box" value={form.allowance_type}         onChange={handleChange} />{" "}
            बापतको सामाजिक सुरक्षा भत्ता प्राप्त गर्ने तपसिल बमोजिमको लाभग्राहीको
            मिति २०८२-०८-०६ मा मृत्यु भएको हुँदा उक्त लाभग्राहीको नाममा जम्मा भएको
            सामाजिक सुरक्षा भत्ता रकम कानुन बमोजिम निजको हकवाला ना.प्र.नं.
            <input name="citizenship_no_inline"  type="text" className="sspc-inline-input sspc-w-medium-box" value={form.citizenship_no_inline}  onChange={handleChange} />{" "}
            जारी मिति २०८२-०८-०६ भएको{" "}
            <input name="beneficiary_inline_name" type="text" className="sspc-inline-input sspc-w-medium-box" value={form.beneficiary_inline_name} onChange={handleChange} />{" "}
            लाई उपलब्ध गरि निज मृतकको खाता बन्द गरिदिन हुन अनुरोध छ ।
          </p>
        </div>

        {/* ── Table ── */}
        <div className="sspc-table-section">
          <table className="sspc-table">
            <thead>
              <tr>
                <th style={{ width: "5%"  }}>क्र.सं.</th>
                <th style={{ width: "20%" }}>नाम थर</th>
                <th style={{ width: "15%" }}>ना.प्र.नं</th>
                <th style={{ width: "15%" }}>पाउने रकम</th>
                <th style={{ width: "15%" }}>फिर्ता रकम</th>
                <th style={{ width: "15%" }}>लाभग्राही नं</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input name="table_name"           type="text" className="sspc-table-input" value={form.table_name}           onChange={handleChange} required /></td>
                <td><input name="table_citizenship_no" type="text" className="sspc-table-input" value={form.table_citizenship_no} onChange={handleChange} required /></td>
                <td><input name="table_amount"         type="text" className="sspc-table-input" value={form.table_amount}         onChange={handleChange} required /></td>
                <td><input name="table_return_amount"  type="text" className="sspc-table-input" value={form.table_return_amount}  onChange={handleChange} required /></td>
                <td><input name="table_beneficiary_no" type="text" className="sspc-table-input" value={form.table_beneficiary_no} onChange={handleChange} required /></td>
              </tr>
            </tbody>
          </table>
          <div className="sspc-fake-scrollbar">
            <div className="sspc-scroll-thumb"></div>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="sspc-signature-section">
          <div className="sspc-signature-block">
            <div className="sspc-signature-line"></div>
            <div className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="sspc-sig-name-input"
                value={form.signer_name}
                onChange={handleChange}
                required
              />
            </div>
            <select
              name="signer_designation"
              className="sspc-designation-select"
              value={form.signer_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="sspc-footer">
          <button
            className="sspc-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="sspc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default SocialSecurityPaymentClosure;