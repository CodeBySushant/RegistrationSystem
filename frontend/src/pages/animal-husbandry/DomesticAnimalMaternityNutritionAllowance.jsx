// DomesticAnimalMaternityNutritionAllowance.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DomesticAnimalMaternityNutritionAllowance.css)
   All classes prefixed with "damn-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* --- Main Container --- */
  .damn-container {
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
  .damn-bold      { font-weight: bold; }
  .damn-underline { text-decoration: underline; }

  /* --- Top Bar --- */
  .damn-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .damn-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* --- Header --- */
  .damn-header { text-align: center; margin-bottom: 20px; position: relative; }
  .damn-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .damn-header-text { display: flex; flex-direction: column; align-items: center; }
  .damn-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .damn-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .damn-address-text,
  .damn-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* --- Meta --- */
  .damn-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .damn-meta-left p, .damn-meta-right p { margin: 5px 0; }
  .damn-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .damn-w-small  { width: 120px; }
  .damn-w-tiny   { width: 40px; text-align: center; }
  .damn-w-medium { width: 160px; }
  .damn-w-long   { width: 250px; }

  /* --- Subject --- */
  .damn-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* --- Addressee --- */
  .damn-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .damn-addressee-row { margin-bottom: 8px; }

  /* --- Body --- */
  .damn-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .damn-inline-input {
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
  .damn-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }

  /* --- Required-star wrapper --- */
  .damn-req-wrap {
    position: relative;
    display: inline-block;
  }
  .damn-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }
  .damn-req-wrap input { padding-left: 18px; }

  /* --- Signature --- */
  .damn-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .damn-signature-block   { width: 220px; text-align: center; }
  .damn-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .damn-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .damn-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* --- Applicant Details overrides --- */
  .damn-container .applicant-details-box {
    border: 2px solid #999 !important;
    background-color: transparent !important;
    padding: 20px;
    margin-top: 20px;
    border-radius: 4px;
  }
  .damn-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .damn-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
  }

  /* --- Footer --- */
  .damn-footer { text-align: center; margin-top: 40px; }
  .damn-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  .damn-save-print-btn:hover    { background-color: #1a252f; }
  .damn-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .damn-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* --- Print --- */
  @media print {
    body * { visibility: hidden; }
    .damn-container,
    .damn-container * { visibility: visible; }
    .damn-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }
    .damn-top-bar,
    .damn-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
const toNepaliDigits = (str) => {
  const map = { 0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९" };
  return str.replace(/[0-9]/g, (d) => map[d]);
};

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalan_no: "",
  subject: "गाई / भैंसी सुत्केरी पोषण भत्ता उपलब्ध गरिदिने बारे ।",
  issue_date: new Date().toISOString().slice(0, 10),
  district: MUNICIPALITY.district,
  municipality_name_header: MUNICIPALITY.name,
  municipality_name_body: MUNICIPALITY.name,
  municipality_city: MUNICIPALITY.city,
  ward_no: "",
  resident_name: "",
  duration_value: "",
  duration_unit: "महिना",
  calving_date: "",
  animal_count: 1,
  signer_name: "",
  signer_designation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DomesticAnimalMaternityNutritionAllowance = () => {
  const { user } = useAuth();
  const [form, setForm]     = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* Auto-fill ward from logged-in user */
  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "animal_count" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      // convert empty strings → null so model factory treats them correctly
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });
      const res = await axios.post("/api/forms/animal-maternity-allowance", payload);
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
      const res = await axios.post("/api/forms/animal-maternity-allowance", form);
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

      <form className="damn-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="damn-top-bar">
          गाई / भैंसी सुत्केरी पोषण भत्ता ।
          <span className="damn-breadcrumb">
            पशुपालन &gt; गाई / भैंसी सुत्केरी पोषण भत्ता
          </span>
        </div>

        {/* ── Header ── */}
        <div className="damn-header">
          <div className="damn-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="damn-header-text">
            <h1 className="damn-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="damn-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="damn-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="damn-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="damn-meta-row">
          <div className="damn-meta-left">
            <p>
              पत्र संख्या : <span className="damn-bold">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :
              <input
                name="chalan_no"
                type="text"
                className="damn-dotted-input damn-w-small"
                value={form.chalan_no || ""}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="damn-meta-right">
            <p>
              मिति :
              <input
                readOnly
                className="damn-dotted-input damn-w-small"
                value={toNepaliDigits(form.issue_date || "")}
              />
            </p>
            <p>ने.सं - 1146 थिंलागा, 30 शनिबार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="damn-subject">
          <p>
            विषय: <span className="damn-underline">{form.subject}</span>
          </p>
        </div>

        {/* ── Addressee ── */}
        <div className="damn-addressee">
          <div className="damn-addressee-row">
            <span>श्री पशु सेवा शाखा,</span>
          </div>
          <div className="damn-addressee-row">
            <input
              name="municipality_name_header"
              type="text"
              className="damn-inline-input damn-w-medium"
              value={form.municipality_name_header}
              onChange={handleChange}
            />
            <span>।</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="damn-body">
          <p>
            प्रस्तुत विषयमा यस नगर कार्यपालिकाबाट पारित "गाई/भैंसी सुत्केरी पोषण
            भत्ता, ब्याडको बोका व्यवस्थापन र भ्याक्सिनेसन कार्यक्रम कार्यान्वयन
            विधि, २०७४" अनुसार जिल्ला
            <input
              name="municipality_city"
              type="text"
              className="damn-inline-input damn-w-medium"
              value={form.municipality_city}
              onChange={handleChange}
            />
            <input
              name="municipality_name_body"
              type="text"
              className="damn-inline-input damn-w-medium"
              value={form.municipality_name_body}
              onChange={handleChange}
            />
            वडा नं.
            {/* BUG FIX: was bare <input> with no className — now properly styled */}
            <input
              name="ward_no"
              type="text"
              className="damn-inline-input damn-w-tiny"
              value={form.ward_no}
              onChange={handleChange}
            />
            बस्ने
            <div className="damn-req-wrap">
              <span className="damn-req-star">*</span>
              <input
                name="resident_name"
                type="text"
                className="damn-inline-input damn-w-long"
                required
                value={form.resident_name}
                onChange={handleChange}
              />
            </div>
            को निजकै घरमा विगत
            <div className="damn-req-wrap">
              <span className="damn-req-star">*</span>
              <input
                name="duration_value"
                type="text"
                className="damn-inline-input damn-w-tiny"
                required
                value={form.duration_value}
                onChange={handleChange}
              />
            </div>
            <select
              name="duration_unit"
              className="damn-inline-select"
              value={form.duration_unit}
              onChange={handleChange}
            >
              <option value="महिना">महिना</option>
              <option value="वर्ष">वर्ष</option>
            </select>
            देखि पालन पोषण हुँदै आएको गाई / भैंसी मिति
            <input
              name="calving_date"
              type="date"
              className="damn-inline-input damn-w-medium"
              value={form.calving_date || ""}
              onChange={handleChange}
            />
            मा सुत्केरी भएकोले कार्यविधि अनुसार निजले पाउने सुत्केरी पोषण भत्ता
            उपलब्ध गरि दिनु हुन अनुरोध छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="damn-signature-section">
          <div className="damn-signature-block">
            <div className="damn-signature-line"></div>
            <input
              name="signer_name"
              type="text"
              className="damn-sig-name-input"
              required
              value={form.signer_name}
              onChange={handleChange}
            />
            <select
              name="signer_designation"
              className="damn-designation-select"
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
        <div className="damn-footer">
          <button
            className="damn-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="damn-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DomesticAnimalMaternityNutritionAllowance;