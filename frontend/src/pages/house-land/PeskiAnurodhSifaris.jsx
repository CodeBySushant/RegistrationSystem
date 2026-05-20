// PeskiAnurodhSifaris.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from PeskiAnurodhSifaris.css)
   All classes prefixed with "pas-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .pas-container {
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
  .pas-bold      { font-weight: bold; }
  .pas-underline { text-decoration: underline; }
  .pas-red       { color: red; font-weight: bold; margin: 0 2px; vertical-align: middle; }
  .pas-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .pas-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .pas-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .pas-header { text-align: center; margin-bottom: 20px; position: relative; }
  .pas-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .pas-header-text { display: flex; flex-direction: column; align-items: center; }
  .pas-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .pas-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .pas-address-text,
  .pas-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .pas-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .pas-meta-left p, .pas-meta-right p { margin: 5px 0; }
  .pas-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .pas-w-small { width: 120px; }

  /* ── Addressee ── */
  .pas-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .pas-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .pas-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }
  .pas-w-medium { width: 200px; }
  .pas-w-full   { width: 100%; }

  /* ── Subject ── */
  .pas-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .pas-body {
    font-size: 1.05rem;
    line-height: 2.8;
    text-align: justify;
    margin-bottom: 30px;
  }
  .pas-inline-input {
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
  .pas-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    vertical-align: middle;
    font-family: inherit;
  }
  .pas-w-small-box  { width: 100px; }
  .pas-w-medium-box { width: 180px; }
  .pas-w-long-box   { width: 250px; }

  /* ── Signature ── */
  .pas-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .pas-signature-block   { width: 220px; text-align: center; position: relative; }
  .pas-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .pas-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .pas-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .pas-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .pas-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .pas-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .pas-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .pas-footer { text-align: center; margin-top: 40px; }
  .pas-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .pas-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .pas-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .pas-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print (was completely missing) ── */
  @media print {
    body * { visibility: hidden; }
    .pas-container,
    .pas-container * { visibility: visible; }
    .pas-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .pas-top-bar,
    .pas-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .pas-municipality-name,
    .pas-ward-title,
    .pas-address-text,
    .pas-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined — crashes on load.
   BUG FIX: addressee_name was missing — input had no value/onChange.
   BUG FIX: applicantName/Address/Citizenship/Phone missing for ApplicantDetailsNp.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:           "२०८२/८३",
  chalani_no:          "",
  date_nep:            new Date().toISOString().slice(0, 10),
  // BUG FIX: missing — the addressee input had no value/onChange
  addressee_name:      "",
  budget_year:         "२०८१/८२",
  budget_head_title:   "",
  budget_head_number:  "",
  operation_or_program: "संचालन",
  total_amount:        "",
  requested_amount:    "",
  amount_in_words:     "",
  signer_name:         "",
  signer_designation:  "",
  notes:               "",
  // ApplicantDetailsNp fields — BUG FIX: all four were missing
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function PeskiAnurodhSifaris() {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/peski-anurodh-sifaris", form);
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
      const res = await axios.post("/api/forms/peski-anurodh-sifaris", form);
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

      <div className="pas-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top Bar ── */}
          <div className="pas-top-bar">
            पेस्की अनुरोध सिफारिस ।
            <span className="pas-breadcrumb">आर्थिक &gt; पेस्की अनुरोध सिफारिस</span>
          </div>

          {/* ── Header ──
              BUG FIX: was hardcoded — now dynamic from MUNICIPALITY config */}
          <div className="pas-header">
            <div className="pas-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="pas-header-text">
              <h1 className="pas-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="pas-ward-title">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`}
              </h2>
              <p className="pas-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
              <p className="pas-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="pas-meta-row">
            <div className="pas-meta-left">
              <p>पत्र संख्या : <span className="pas-bold">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="pas-dotted-input pas-w-small"
                />
              </p>
            </div>
            <div className="pas-meta-right">
              <p>मिति : <span className="pas-bold">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Addressee ──
              BUG FIX: addressee_name input had no name/value/onChange */}
          <div className="pas-addressee">
            <div className="pas-addressee-row">
              <span>श्री</span>
              <input
                name="addressee_name"
                value={form.addressee_name}
                onChange={handleChange}
                className="pas-line-input pas-w-medium"
              />
              <span className="pas-red">*</span>
              <span>ज्यू,</span>
            </div>
            <div className="pas-addressee-row">
              <span className="pas-bold">{MUNICIPALITY.name}</span>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="pas-subject">
            <p>
              विषय:{" "}
              <span className="pas-underline">पेस्की उपलब्ध गराईदिने सम्बन्धमा।</span>
            </p>
          </div>

          {/* ── Body ── */}
          <div className="pas-body">
            <p>
              प्रस्तुत बिषयमा यस{" "}
              <span className="pas-bold">{MUNICIPALITY.name}</span> चालु आ.व.
              <input
                name="budget_year"
                value={form.budget_year}
                onChange={handleChange}
                className="pas-inline-input pas-w-small-box"
              />
              को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत
              <input
                name="budget_head_title"
                value={form.budget_head_title}
                onChange={handleChange}
                className="pas-inline-input pas-w-medium-box"
                required
              />{" "}
              <span className="pas-red">*</span>
              को बजेट शिर्षक नम्बर
              <input
                name="budget_head_number"
                value={form.budget_head_number}
                onChange={handleChange}
                className="pas-inline-input pas-w-long-box"
                required
              />{" "}
              <span className="pas-red">*</span>
              मा रहेको
              <select
                name="operation_or_program"
                value={form.operation_or_program}
                onChange={handleChange}
                className="pas-inline-select"
              >
                <option>संचालन</option>
                <option>कार्यक्रम</option>
              </select>
              अन्तर्गत जम्मा रकम रु.
              <input
                name="total_amount"
                value={form.total_amount}
                onChange={handleChange}
                className="pas-inline-input pas-w-medium-box"
                required
              />{" "}
              <span className="pas-red">*</span> मध्येबाट रु.
              <input
                name="requested_amount"
                value={form.requested_amount}
                onChange={handleChange}
                className="pas-inline-input pas-w-medium-box"
                required
              />{" "}
              <span className="pas-red">*</span> ( अक्षरेरुपी
              <input
                name="amount_in_words"
                value={form.amount_in_words}
                onChange={handleChange}
                className="pas-inline-input pas-w-long-box"
                required
              />{" "}
              <span className="pas-red">*</span> रुपैया मात्र ) पेस्की मुक्तानी दिनु
              हुन अनुरोध गर्दछु।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="pas-signature-section">
            <div className="pas-signature-block">
              <div className="pas-signature-line"></div>
              <span className="pas-red-mark">*</span>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="pas-sig-name-input"
                required
              />
              <select
                name="signer_designation"
                value={form.signer_designation}
                onChange={handleChange}
                className="pas-designation-select"
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
          <div className="pas-footer">
            <button
              className="pas-save-print-btn"
              type="button"
              onClick={handlePrint}
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="pas-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}