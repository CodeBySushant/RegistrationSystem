// BackwardCommunityRecommendation.jsx
import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BackwardCommunityRecommendation.css)
   All classes prefixed with "bcr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .bcr-container {
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
  .bcr-bold      { font-weight: bold; }
  .bcr-underline { text-decoration: underline; }

  /* ── Top Bar ── */
  .bcr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .bcr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .bcr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .bcr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .bcr-header-text { display: flex; flex-direction: column; align-items: center; }
  .bcr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .bcr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .bcr-address-text,
  .bcr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .bcr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .bcr-meta-left p, .bcr-meta-right p { margin: 5px 0; }
  .bcr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .bcr-w-small { width: 120px; }

  /* ── Subject / Salutation ── */
  .bcr-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }
  .bcr-salutation { margin-bottom: 20px; font-size: 1rem; }

  /* ── Body ── */
  .bcr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .bcr-inline-input {
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
  .bcr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .bcr-w-tiny   { width: 40px;  text-align: center; }
  .bcr-w-medium { width: 160px; }
  .bcr-w-long   { width: 220px; }

  /* ── Signature ── */
  .bcr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .bcr-signature-block   { width: 220px; text-align: center; }
  .bcr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .bcr-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .bcr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant Details overrides ── */
  .bcr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .bcr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .bcr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .bcr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .bcr-footer { text-align: center; margin-top: 40px; }
  .bcr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .bcr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .bcr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .bcr-copyright {
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
    .bcr-container,
    .bcr-container * { visibility: visible; }
    .bcr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background-image: none;
      background-color: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .bcr-footer,
    .bcr-breadcrumb { display: none !important; }

    .bcr-container input,
    .bcr-container select,
    .bcr-container textarea {
      border: none !important;
      border-bottom: 1px solid #000 !important;
      background: transparent !important;
      box-shadow: none !important;
      outline: none !important;
      padding: 0 2px !important;
      margin: 0 3px !important;
      font-family: 'Kalimati', 'Kokila', sans-serif !important;
      font-size: 1rem !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-appearance: none !important;
      appearance: none !important;
      border-radius: 0 !important;
    }
    .bcr-dotted-input   { border-bottom: 1px dotted #000 !important; }
    .bcr-inline-input   { border: none !important; border-bottom: 1px solid #000 !important; min-width: 60px; }
    .bcr-inline-select,
    .bcr-designation-select {
      border: none !important;
      border-bottom: 1px solid #000 !important;
      background: transparent !important;
      -webkit-appearance: none !important;
      appearance: none !important;
    }
    .bcr-container .applicant-details-box {
      border: 1px solid #ccc !important;
      background-color: #fff !important;
      padding: 15px !important;
    }
    .bcr-container .applicant-details-box .detail-input {
      border: none !important;
      border-bottom: 1px solid #aaa !important;
      background: transparent !important;
      max-width: 100% !important;
    }
    /* Preserve red municipality colours on print */
    .bcr-municipality-name,
    .bcr-ward-title,
    .bcr-address-text,
    .bcr-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .bcr-sig-name-input { border-bottom: 1px solid #000 !important; width: 100% !important; }
    @page { size: A4 portrait; margin: 15mm; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  signer_name: "",
  signer_designation: "",
  chalani_no: "",
  tole_address: "",
  ward_no: "",
  applicant_gender: "श्री",
  applicant_fullname: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BackwardCommunityRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ──
     BUG FIX 1: endpoint was "/api/forms/animal-maternity-allowance" — corrected.
     BUG FIX 2: the outer element was a <div> so onSubmit never fired — now <form>. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axiosInstance.post(
        "/api/forms/backward-community-recommendation",
        payload,
      );

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

  /* ── Save + Print ──
     BUG FIX 1: endpoint was "/api/forms/animal-maternity-allowance" — corrected. */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/forms/backward-community-recommendation",
        form,
      );
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

      {/* BUG FIX 2: was <div> — changed to <form> so onSubmit fires correctly */}
      <form className="bcr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="bcr-top-bar">
          विपन्नको सिफारिस ।
          <span className="bcr-breadcrumb">शैक्षिक &gt; विपन्नको सिफारिस</span>
        </div>

        {/* ── Header ── */}
        <div className="bcr-header">
          <div className="bcr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="bcr-header-text">
            <h1 className="bcr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="bcr-ward-title">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </h2>
            <p className="bcr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="bcr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="bcr-meta-row">
          <div className="bcr-meta-left">
            <p>पत्र संख्या : <span className="bcr-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                type="text"
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="bcr-dotted-input bcr-w-small"
              />
            </p>
          </div>
          <div className="bcr-meta-right">
            <p>मिति : <span className="bcr-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="bcr-subject">
          <p>
            विषय:{" "}
            <span className="bcr-underline">विपन्नको सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* ── Salutation ── */}
        <div className="bcr-salutation">
          <p>श्री यो जो जस सँग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Body ── */}
        <div className="bcr-body">
          <p>
            उपरोक्त विषयमा{" "}
            <span className="bcr-bold bcr-underline">{MUNICIPALITY.name}</span>
            वडा नं. {MUNICIPALITY.wardNumber}{" "}
            <input
              type="text"
              name="tole_address"
              value={form.tole_address}
              onChange={handleChange}
              className="bcr-inline-input bcr-w-medium"
            />
            , वडा नं.{" "}
            <input
              type="text"
              name="ward_no"
              value={form.ward_no}
              onChange={handleChange}
              className="bcr-inline-input bcr-w-tiny"
              required
            />{" "}
            ) निवासी श्री
            <select
              name="applicant_gender"
              value={form.applicant_gender}
              onChange={handleChange}
              className="bcr-inline-select bcr-bold"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              type="text"
              name="applicant_fullname"
              value={form.applicant_fullname}
              onChange={handleChange}
              className="bcr-inline-input bcr-w-long"
              required
            />{" "}
            ले मेरो पारिवारिक आर्थिक स्थिति नाजुक भएको कारणले विपन्न भएको हुनाले
            मेरो परिवार मेरो उच्च शिक्षाको खर्च जुटाउन असमर्थ भएकोले सो खुलाई
            सिफारिस पाऊँ भनी यस कार्यालयमा निवेदन पेश गरेकोले सो सम्बन्धमा बुझ्दा
            जानेबुझे सम्म व्यहोरा मनासिब भएकोले निजलाई विपन्न व्यक्तिका लागि
            आरक्षित गरिएको स्थानमा सहभागी हुन पाउने व्यवस्था गरी दिनुहुन सिफारिस
            गरिएको छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="bcr-signature-section">
          <div className="bcr-signature-block">
            <div className="bcr-signature-line"></div>
            <input
              type="text"
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="bcr-sig-name-input"
              required
            />
            <select
              name="signer_designation"
              value={form.signer_designation}
              onChange={handleChange}
              className="bcr-designation-select"
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
        <div className="bcr-footer">
          <button
            className="bcr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="bcr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default BackwardCommunityRecommendation;