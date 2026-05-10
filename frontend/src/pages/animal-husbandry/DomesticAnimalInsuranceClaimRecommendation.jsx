// DomesticAnimalInsuranceClaimRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DomesticAnimalInsuranceClaimRecommendation.css)
   All classes prefixed with "daic-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* --- Main Container --- */
  .daic-container {
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
  .daic-bold      { font-weight: bold; }
  .daic-underline { text-decoration: underline; }
  .daic-required  { color: red; margin-left: 4px; }

  /* --- Top Bar --- */
  .daic-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .daic-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* --- Header --- */
  .daic-header { text-align: center; margin-bottom: 20px; position: relative; }
  .daic-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .daic-header-text { display: flex; flex-direction: column; align-items: center; }
  .daic-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .daic-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .daic-address-text,
  .daic-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* --- Meta --- */
  .daic-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .daic-meta-left p, .daic-meta-right p { margin: 5px 0; }
  .daic-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .daic-w-small  { width: 120px; }
  .daic-w-medium { width: 160px; }
  .daic-w-long   { width: 250px; }

  /* --- Subject --- */
  .daic-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* --- Addressee --- */
  .daic-addressee { margin-bottom: 20px; font-size: 1.05rem; }
  .daic-addressee-row { margin-bottom: 8px; }
  .daic-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* --- Body --- */
  .daic-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .daic-inline-input {
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
  .daic-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }

  /* --- Required-star wrapper --- */
  .daic-req-wrap {
    position: relative;
    display: inline-block;
  }
  .daic-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }
  .daic-req-wrap input { padding-left: 18px; }

  /* --- Signature --- */
  .daic-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .daic-signature-block   { width: 220px; text-align: center; }
  .daic-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .daic-sig-name-input    { width: 100%; margin-bottom: 5px; border: none; border-bottom: 1px solid #000; outline: none; background: transparent; font-family: inherit; font-size: 1rem; }
  .daic-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* --- Applicant Details overrides --- */
  .daic-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .daic-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
  }

  /* --- Footer --- */
  .daic-footer { text-align: center; margin-top: 40px; }
  .daic-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  .daic-save-print-btn:hover    { background-color: #1a252f; }
  .daic-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .daic-copyright {
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
    .daic-container,
    .daic-container * { visibility: visible; }
    .daic-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }
    .daic-top-bar,
    .daic-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalan_no: "",
  subject: "सिफारिस सम्बन्धमा",
  applicant_name: "",
  addressee_line2: "",
  municipality_name: MUNICIPALITY.name,
  municipality_city: MUNICIPALITY.city,
  ward_no: "",
  resident_name_in_paragraph: "",
  local_select_type: "गुयुल्का",
  animal_type: "",
  animal_inspected_by: "",
  report_brief: "",
  damaged_area_description: "",
  tag_number: "",
  tag_subtype: "",
  animal_color: "",
  death_date: "",
  signer_name: "",
  signer_designation: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DomesticAnimalInsuranceClaimRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/domestic-animal", form);
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
      const res = await axios.post("/api/forms/domestic-animal", form);
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

      <form className="daic-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="daic-top-bar">
          पशु बिमा पाउँ ।
          <span className="daic-breadcrumb">पशुपालन &gt; पशु बिमा पाउँ</span>
        </div>

        {/* ── Header ── */}
        <div className="daic-header">
          <div className="daic-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="daic-header-text">
            <h1 className="daic-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="daic-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="daic-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="daic-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="daic-meta-row">
          <div className="daic-meta-left">
            <p>
              पत्र संख्या : <span className="daic-bold">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :
              <input
                name="chalan_no"
                type="text"
                className="daic-dotted-input daic-w-small"
                value={form.chalan_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="daic-meta-right">
            <p>
              मिति : <span className="daic-bold">२०८२-०८-०६</span>
            </p>
            <p>ने.सं - 1146 पोहेलाथ्व, 1 आइतबार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="daic-subject">
          <p>
            विषय: <span className="daic-underline">{form.subject}</span>
          </p>
        </div>

        {/* ── Addressee ── */}
        <div className="daic-addressee">
          <div className="daic-addressee-row">
            <span>श्री</span>
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="applicant_name"
                type="text"
                className="daic-inline-input daic-w-medium"
                value={form.applicant_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="daic-addressee-row">
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="addressee_line2"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.addressee_line2}
                onChange={handleChange}
              />
            </div>
            <span>,</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="daic-body">
          <p>
            प्रस्तुत विषयमा जिल्ला
            <input
              name="municipality_city"
              type="text"
              className="daic-inline-input daic-w-medium"
              value={form.municipality_city}
              onChange={handleChange}
            />
            <input
              name="municipality_name"
              type="text"
              className="daic-inline-input daic-w-medium"
              value={form.municipality_name}
              onChange={handleChange}
            />
            वडा नं.
            <input
              name="ward_no"
              type="text"
              className="daic-inline-input daic-w-small"
              value={form.ward_no}
              onChange={handleChange}
            />
            मा बसोवास गर्ने श्री
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="resident_name_in_paragraph"
                type="text"
                className="daic-inline-input daic-w-long"
                required
                value={form.resident_name_in_paragraph}
                onChange={handleChange}
              />
            </div>
            ले यस पशु सेवा शाखामा पेश गरेको निवेदन, वडा
            <select
              name="local_select_type"
              className="daic-inline-select"
              value={form.local_select_type}
              onChange={handleChange}
            >
              <option value="गुयुल्का">गुयुल्का</option>
              <option value="वडा">वडा</option>
            </select>
            तथा पशु
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="animal_type"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.animal_type}
                onChange={handleChange}
              />
            </div>
            श्री
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="animal_inspected_by"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.animal_inspected_by}
                onChange={handleChange}
              />
            </div>
            को जाँच प्रतिवेदन अनुसार बिगा लेख
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="damaged_area_description"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.damaged_area_description}
                onChange={handleChange}
              />
            </div>
            भएको ट्याग नं.
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="tag_number"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.tag_number}
                onChange={handleChange}
              />
            </div>
            को
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="tag_subtype"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.tag_subtype}
                onChange={handleChange}
              />
            </div>
            रङको
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="animal_color"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.animal_color}
                onChange={handleChange}
              />
            </div>
            मिति
            <input
              name="death_date"
              type="date"
              className="daic-inline-input daic-w-medium"
              value={form.death_date}
              onChange={handleChange}
            />
            गतेका दिन
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="report_brief"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.report_brief}
                onChange={handleChange}
              />
            </div>
            रोग लागि उपचारको क्रममा मृत्यु भएको व्यहोरा प्रमाणित साथ आवश्यक
            कारवाहिको लागि सिफारिस गरि पठाइएको व्यहोरा अनुरोध छ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="daic-signature-section">
          <div className="daic-signature-block">
            <div className="daic-signature-line"></div>
            <div className="daic-req-wrap" style={{ width: "100%" }}>
              <span className="daic-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="daic-sig-name-input"
                required
                value={form.signer_name}
                onChange={handleChange}
              />
            </div>
            <select
              name="signer_designation"
              className="daic-designation-select"
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
        <div className="daic-footer">
          <button
            className="daic-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="daic-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DomesticAnimalInsuranceClaimRecommendation;