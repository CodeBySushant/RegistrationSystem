// src/pages/social-family/EthnicIdentityRecommendation.jsx
import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from EthnicIdentityRecommendation.css)
   All classes prefixed with "eir-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .eir-container {
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
  .eir-bold      { font-weight: bold; }
  .eir-underline { text-decoration: underline; }
  .eir-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .eir-red-mark  { color: red; position: absolute; top: 0; left: 0; }

  /* ── Top Bar ── */
  .eir-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .eir-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .eir-header { text-align: center; margin-bottom: 20px; position: relative; }
  .eir-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .eir-header-text { display: flex; flex-direction: column; align-items: center; }
  .eir-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .eir-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .eir-address-text,
  .eir-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .eir-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .eir-meta-left p, .eir-meta-right p { margin: 5px 0; }
  .eir-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .eir-w-small { width: 120px; }

  /* ── Subject ── */
  .eir-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Addressee ── */
  .eir-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .eir-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .eir-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .eir-w-medium { width: 200px; }
  .eir-w-full   { width: 100%; }

  /* ── Body ── */
  .eir-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .eir-inline-input {
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
  .eir-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .eir-w-tiny-box   { width: 40px;  text-align: center; }
  .eir-w-medium-box { width: 180px; }

  /* ── Signature ── */
  .eir-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .eir-signature-block   { width: 220px; text-align: center; position: relative; }
  .eir-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .eir-sig-name-input    { width: 100%; margin-bottom: 5px; }
  .eir-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant details overrides ── */
  .eir-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .eir-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .eir-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .eir-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .eir-footer { text-align: center; margin-top: 40px; }
  .eir-save-print-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .eir-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
  .eir-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .eir-copyright {
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
    .eir-container,
    .eir-container * { visibility: visible; }
    .eir-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .eir-top-bar,
    .eir-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .eir-municipality-name,
    .eir-ward-title,
    .eir-address-text,
    .eir-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: was used but never defined — caused immediate crash on load.
   All defaultValue inputs converted to controlled with state fields.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalani_no: "",
  // addressee — BUG FIX: were defaultValue (uncontrolled)
  addressee_office:   "जिल्ला प्रशासन कार्यालय",
  addressee_district: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  // body — BUG FIX: all were defaultValue (uncontrolled)
  residence_district:     MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  residence_municipality: MUNICIPALITY?.name            || "नागार्जुन",
  residence_ward_no:      MUNICIPALITY?.wardNumber      || "1",
  person_title:           "श्री",
  person_name:            "",
  relation_title:         "श्री",
  relation_name:          "",
  relation_child_type:    "छोरा",
  relation_child_title:   "श्री",
  relation_child_name:    "",
  na_pr_no:               "",
  requested_ethnicity:    "",
  // signature — BUG FIX: were uncontrolled
  signatory_name:         "",
  signatory_designation:  "",
  // ApplicantDetailsNp fields
  applicantName:          "",
  applicantAddress:       "",
  applicantCitizenship:   "",
  applicantPhone:         "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const EthnicIdentityRecommendation = () => {
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
      const res = await axios.post("/api/forms/ethnic-identity-recommendation", form);
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
      const res = await axios.post("/api/forms/ethnic-identity-recommendation", form);
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

      <form className="eir-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="eir-top-bar">
          जातीय पहिचान सिफारिस
          <span className="eir-breadcrumb">
            सामाजिक / पारिवारिक &gt; जातीय पहिचान सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="eir-header">
          <div className="eir-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="eir-header-text">
            <h1 className="eir-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="eir-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`}
            </h2>
            <p className="eir-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
            <p className="eir-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="eir-meta-row">
          <div className="eir-meta-left">
            <p>पत्र संख्या : <span className="eir-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="eir-dotted-input eir-w-small"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="eir-meta-right">
            <p>मिति : <span className="eir-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="eir-subject">
          <p>
            विषय:{" "}
            <span className="eir-underline">जातीय पहिचान सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* ── Addressee ──
            BUG FIX: both inputs used defaultValue (uncontrolled) */}
        <div className="eir-addressee">
          <div className="eir-addressee-row">
            <span>श्री</span>
            <input
              name="addressee_office"
              type="text"
              className="eir-line-input eir-w-medium"
              value={form.addressee_office}
              onChange={handleChange}
            />
          </div>
          <div className="eir-addressee-row">
            <span className="eir-red">*</span>
            <input
              name="addressee_district"
              type="text"
              className="eir-line-input eir-w-medium"
              value={form.addressee_district}
              onChange={handleChange}
            />
            <span className="eir-red">*</span>
          </div>
        </div>

        {/* ── Body ──
            BUG FIX: all inputs used defaultValue (uncontrolled) */}
        <div className="eir-body">
          <p>
            <input
              name="residence_district"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.residence_district}
              onChange={handleChange}
            />
            <input
              name="residence_municipality"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.residence_municipality}
              onChange={handleChange}
            />
            वडा नं{" "}
            <input
              name="residence_ward_no"
              type="text"
              className="eir-inline-input eir-w-tiny-box"
              value={form.residence_ward_no}
              onChange={handleChange}
            />{" "}
            निवासी श्री
            <select
              name="person_title"
              className="eir-inline-select"
              value={form.person_title}
              onChange={handleChange}
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              name="person_name"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.person_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="eir-red">*</span> को नाति
            <select
              name="relation_title"
              className="eir-inline-select"
              value={form.relation_title}
              onChange={handleChange}
            >
              <option>श्री</option>
              <option>सुश्री</option>
            </select>
            <input
              name="relation_name"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.relation_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="eir-red">*</span> को
            <select
              name="relation_child_type"
              className="eir-inline-select"
              value={form.relation_child_type}
              onChange={handleChange}
            >
              <option>छोरा</option>
              <option>छोरी</option>
            </select>
            <select
              name="relation_child_title"
              className="eir-inline-select"
              value={form.relation_child_title}
              onChange={handleChange}
            >
              <option>श्री</option>
              <option>सुश्री</option>
            </select>
            <input
              name="relation_child_name"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.relation_child_name}
              onChange={handleChange}
              required
            />{" "}
            <span className="eir-red">*</span> (ना.प्र. पत्र नं{" "}
            <input
              name="na_pr_no"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.na_pr_no}
              onChange={handleChange}
              required
            />{" "}
            <span className="eir-red">*</span> ) ले आफ्नो जातीय पहिचान सिफारिस पाउँ
            भनी यस वडा कार्यालयमा निवेदन दिनुभएकोमा निजले नेपाली नागरिकताको
            प्रमाणपत्र, शैक्षिक योग्यताका प्रमाणपत्र, नेपाल सरकारबाट सुचिकृत भएको
            जात जातिको सुची बमोजिम निज
            <input
              name="requested_ethnicity"
              type="text"
              className="eir-inline-input eir-w-medium-box"
              value={form.requested_ethnicity}
              onChange={handleChange}
              required
            />{" "}
            <span className="eir-red">*</span> जातिमा पर्ने व्यहोरा स्थानीय सरकार
            संचालन ऐन २०७४ को दफा १२ (२) ङ (३५) बमोजिम सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* ── Signature ──
            BUG FIX: both inputs were uncontrolled */}
        <div className="eir-signature-section">
          <div className="eir-signature-block">
            <div className="eir-signature-line"></div>
            <span className="eir-red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="eir-line-input eir-w-full eir-sig-name-input"
              value={form.signatory_name}
              onChange={handleChange}
              required
            />
            <select
              name="signatory_designation"
              className="eir-designation-select"
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
        <div className="eir-footer">
          <button
            className="eir-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="eir-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default EthnicIdentityRecommendation;