import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from MarriageCertificate.css — no external CSS file needed)
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* --- Main Container --- */
  .marriage-certificate-container {
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

  /* --- Utility --- */
  .mc-bold       { font-weight: bold; }
  .mc-underline  { text-decoration: underline; }
  .mc-red        { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
  .mc-red-mark   { color: red; position: absolute; top: 0; left: 0; }
  .mc-bg-gray    { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

  /* --- Top Bar --- */
  .mc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .mc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* --- Header --- */
  .mc-header {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }
  .mc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .mc-header-text    { display: flex; flex-direction: column; align-items: center; }
  .mc-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .mc-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .mc-address-text,
  .mc-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* --- Meta --- */
  .mc-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .mc-meta-left p, .mc-meta-right p { margin: 5px 0; }

  /* --- Subject / Salutation --- */
  .mc-salutation { margin-bottom: 20px; font-size: 1.05rem; }
  .mc-subject    { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* --- Body --- */
  .mc-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }

  /* --- Shared input / select inside body --- */
  .mc-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .mc-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .mc-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .mc-line-input {
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* size helpers */
  .mc-w-tiny   { width: 40px;  text-align: center; }
  .mc-w-small  { width: 100px; }
  .mc-w-medium { width: 160px; }
  .mc-w-long   { width: 250px; }
  .mc-w-full   { width: 100%; }

  /* --- Signature --- */
  .mc-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .mc-signature-block   { width: 220px; text-align: center; position: relative; }
  .mc-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .mc-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* --- Footer --- */
  .mc-form-footer   { text-align: center; margin-top: 40px; }
  .mc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  .mc-save-print-btn:hover    { background-color: #1a252f; }
  .mc-copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* --- Print: hide UI chrome --- */
  @media print {
    .mc-top-bar,
    .mc-form-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial form state  (was missing — caused "initialState is not defined")
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  municipality_name: "",
  ward_title: "",
  reference_no: "",
  chalani_no: "",
  date: "",
  prev_district: "",
  prev_unit_type: "",
  prev_ward_no: "",
  resident_ward_no: "",
  groom_name: "",
  groom_parent_relation: "",
  bride_name: "",
  registration_no: "",
  bride_parent_relation: "",
  marriage_place: "",
  prev_place_unit_type: "",
  prev_place_ward_no: "",
  current_place_ward_no: "",
  bride_grandfather: "",
  bride_father: "",
  bride_mother: "",
  bride_full_name: "",
  marriage_date: "",
  remarks: "",
  signatory_name: "",
  signatory_designation: "",
  // ApplicantDetailsNp fields (filled by that component)
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const MarriageCertificate = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /** Generic field setter — replaces the missing setField / useWardForm */
  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /** handleChange for ApplicantDetailsNp (expects e.target.name / e.target.value) */
  const handleChange = (e) =>
    setField(e.target.name, e.target.value);

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/marriage-certificate", form);
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
      const res = await axios.post("/api/forms/marriage-certificate", form);
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
      {/* Inject scoped styles once — no external .css file needed */}
      <style>{STYLES}</style>

      <form className="marriage-certificate-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="mc-top-bar">
          विवाह प्रमाण पत्र ।
          <span className="mc-breadcrumb">
            सामाजिक / पारिवारिक &gt; विवाह प्रमाण पत्र
          </span>
        </div>

        {/* ── Header ── */}
        <div className="mc-header">
          <div className="mc-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="mc-header-text">
            <h1 className="mc-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="mc-ward-title">{MUNICIPALITY.wardTitle}</h2>
            <p className="mc-address-text">नागार्जुन, काठमाडौँ</p>
            <p className="mc-province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* ── Meta (ref / date) ── */}
        <div className="mc-meta-row">
          <div className="mc-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="mc-bold">
                <input
                  value={form.reference_no}
                  onChange={(e) => setField("reference_no", e.target.value)}
                  className="mc-line-input mc-w-small"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                value={form.chalani_no}
                onChange={(e) => setField("chalani_no", e.target.value)}
                className="mc-dotted-input mc-w-small"
              />
            </p>
          </div>
          <div className="mc-meta-right">
            <p>
              मिति :{" "}
              <input
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                className="mc-line-input mc-w-small"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Salutation ── */}
        <div className="mc-salutation">
          <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Subject ── */}
        <div className="mc-subject">
          <p>
            विषय:{" "}
            <span className="mc-underline mc-bold">
              विवाह प्रमाणित सम्बन्धमा।
            </span>
          </p>
        </div>

        {/* ── Main Body ── */}
        <div className="mc-body">
          <p>
            प्रस्तुत बिषयमा जिल्ला काठमाडौँ साविक
            <input
              value={form.prev_district}
              onChange={(e) => setField("prev_district", e.target.value)}
              className="mc-inline-input mc-w-medium"
            />
            <select
              value={form.prev_unit_type}
              onChange={(e) => setField("prev_unit_type", e.target.value)}
              className="mc-inline-select"
            >
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.
            <input
              value={form.prev_ward_no}
              onChange={(e) => setField("prev_ward_no", e.target.value)}
              className="mc-inline-input mc-w-tiny"
              required
            />{" "}
            <span className="mc-red">*</span>
            हाल {MUNICIPALITY.name} नगरपालिका वडा नं.
            <input
              value={form.resident_ward_no}
              onChange={(e) => setField("resident_ward_no", e.target.value)}
              className="mc-inline-input mc-w-tiny"
              required
            />{" "}
            निवासी श्री
            <input
              value={form.groom_name}
              onChange={(e) => setField("groom_name", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            <span className="mc-red">*</span>
            को नाति श्री{" "}
            <input
              value={form.groom_parent_relation}
              onChange={(e) => setField("groom_parent_relation", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            <span className="mc-red">*</span>
            तथा श्रीमती{" "}
            <input
              value={form.bride_name}
              onChange={(e) => setField("bride_name", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            <span className="mc-red">*</span>
            को छोरा ना.प्र.नं.{" "}
            <input
              value={form.registration_no}
              onChange={(e) => setField("registration_no", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            <span className="mc-red">*</span>
            {" "}को{" "}
            <input
              value={form.bride_parent_relation}
              onChange={(e) => setField("bride_parent_relation", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            रङ्ग जिल्ला{" "}
            <input
              value={form.marriage_place}
              onChange={(e) => setField("marriage_place", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            साविक
            <select
              value={form.prev_place_unit_type}
              onChange={(e) => setField("prev_place_unit_type", e.target.value)}
              className="mc-inline-select"
            >
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            <input
              value={form.prev_place_ward_no}
              onChange={(e) => setField("prev_place_ward_no", e.target.value)}
              className="mc-inline-input mc-w-tiny"
              required
            />
            {" "}भई हाल{" "}
            <input
              value={form.marriage_place}
              onChange={(e) => setField("marriage_place", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            वडा नं.{" "}
            <input
              value={form.current_place_ward_no}
              onChange={(e) => setField("current_place_ward_no", e.target.value)}
              className="mc-inline-input mc-w-tiny"
              required
            />{" "}
            मा बस्ने श्री{" "}
            <input
              value={form.bride_grandfather}
              onChange={(e) => setField("bride_grandfather", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            को नातिनी श्री{" "}
            <input
              value={form.bride_father}
              onChange={(e) => setField("bride_father", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            तथा श्रीमती{" "}
            <input
              value={form.bride_mother}
              onChange={(e) => setField("bride_mother", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            को छोरी{" "}
            <input
              value={form.bride_full_name}
              onChange={(e) => setField("bride_full_name", e.target.value)}
              className="mc-inline-input mc-w-medium"
              required
            />{" "}
            बीच मिति
            <input
              value={form.marriage_date}
              onChange={(e) => setField("marriage_date", e.target.value)}
              className="mc-inline-input mc-w-medium"
            />{" "}
            गतेमा सामाजिक परम्परा अनुसार विवाह भएकोले विवाह प्रमाणित सिफारिस माग
            गरे अनुसार{" "}
            <input
              value={form.remarks}
              onChange={(e) => setField("remarks", e.target.value)}
              className="mc-inline-input mc-w-long"
            />{" "}
            विवाह प्रमाणित सिफारिस गरिएको व्यहोरा अनुरोध गरिन्छ। साथै निजहरुको
            फोटो यस पत्र साथ प्रमाणित गरिएको व्यहोरा अनुरोध गरिन्छ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="mc-signature-section">
          <div className="mc-signature-block">
            <div className="mc-signature-line"></div>
            <span className="mc-red-mark">*</span>
            <input
              value={form.signatory_name}
              onChange={(e) => setField("signatory_name", e.target.value)}
              type="text"
              className="mc-line-input mc-w-full"
              required
            />
            <select
              className="mc-designation-select"
              value={form.signatory_designation}
              onChange={(e) => setField("signatory_designation", e.target.value)}
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
        <div className="mc-form-footer">
          <button
            className="mc-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="mc-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default MarriageCertificate;