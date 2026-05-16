// src/pages/physical-development/RoadMaintainRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from RoadMaintainRecommendation.css)
   All classes prefixed with "rmr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rmr-container {
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
  .rmr-bold      { font-weight: bold; }
  .rmr-underline { text-decoration: underline; }
  .rmr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: middle; }

  /* ── Top Bar ── */
  .rmr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .rmr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .rmr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .rmr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .rmr-header-text { display: flex; flex-direction: column; align-items: center; }
  .rmr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .rmr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .rmr-address-text,
  .rmr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .rmr-meta-row  { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .rmr-meta-left { display: flex; flex-direction: column; gap: 6px; }
  .rmr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: #fff;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .rmr-w-small { width: 120px; }

  /* ── Subject ── */
  .rmr-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .rmr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .rmr-inline-input {
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
  .rmr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .rmr-w-tiny-box   { width: 50px;  text-align: center; }
  .rmr-w-small-box  { width: 100px; }
  .rmr-w-medium-box { width: 160px; }
  .rmr-w-long-box   { width: 220px; }
  .rmr-sel-small  { width: 70px;  }
  .rmr-sel-medium { width: 120px; }

  /* ── Signature ── */
  .rmr-signature-section  { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .rmr-signature-block    { width: 220px; text-align: center; position: relative; }
  .rmr-signature-line     { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .rmr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Applicant Details ── */
  .rmr-applicant-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .rmr-applicant-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .rmr-details-grid  { display: grid; grid-template-columns: 1fr; gap: 15px; }
  .rmr-detail-group  { display: flex; flex-direction: column; }
  .rmr-detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .rmr-detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
  }

  /* ── Footer ── */
  .rmr-footer { text-align: center; margin-top: 40px; }
  .rmr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .rmr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .rmr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Status messages ── */
  .rmr-error   { color: red;   margin-top: 10px; }
  .rmr-success { color: green; margin-top: 10px; }

  /* ── Copyright ── */
  .rmr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    .rmr-top-bar,
    .rmr-footer,
    .rmr-error,
    .rmr-success { display: none !important; }
    .rmr-container {
      padding: 10px 20px;
      background-image: none;
      max-width: 100%;
      margin: 0;
    }
    .rmr-dotted-input,
    .rmr-inline-input,
    .rmr-inline-select,
    .rmr-designation-select,
    .rmr-detail-input {
      border: none !important;
      border-bottom: 1px dotted #000 !important;
      background: transparent !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .rmr-inline-input { border-bottom: 1px solid #000 !important; }
    .rmr-designation-select { appearance: none; -webkit-appearance: none; }
    .rmr-municipality-name,
    .rmr-ward-title,
    .rmr-address-text,
    .rmr-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants & initial state
───────────────────────────────────────────────────────────────────────────── */
const FORM_KEY = "road-maintain-recommendation";

const emptyState = {
  chalan_no:             "",
  date_nepali:           "",
  district:              "",
  municipality:          "",
  ward_no:               "",
  previous_address_type: "",
  previous_ward_no:      "",
  kitta_no:              "",
  area:                  "",
  side:                  "",
  width_ft:              "",
  length_ft:             "",
  owner_title:           "श्री",
  owner_name:            "",
  applicant_name:        "",
  applicant_address:     "",
  applicant_citizenship_no: "",
  applicant_phone:       "",
  designation:           "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function RoadMaintainRecommendation() {
  const { user } = useAuth();
  const [form, setForm]     = useState(emptyState);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [result, setResult] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.kitta_no || !form.applicant_name || !form.owner_name) {
      setError("कृपया आवस्यक फिल्डहरू (कित्तानम्बर, निवेदक नाम, जग्गाधनी नाम) भर्नुहोस्।");
      return;
    }

    setLoading(true);
    try {
      const resp = await axiosInstance.post(`/api/forms/${FORM_KEY}`, form);
      setResult(resp.data);
      window.print();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Server error"
      );
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

      <div className="rmr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top Bar ── */}
          <div className="rmr-top-bar">
            नेपाल सरकारको नाममा बाटो कायम सिफारिस ।
            <span className="rmr-breadcrumb">
              भौतिक निर्माण &gt; नेपाल सरकारको नाममा बाटो कायम सिफारिस
            </span>
          </div>

          {/* ── Header ── */}
          <div className="rmr-header">
            <div className="rmr-header-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
            </div>
            <div className="rmr-header-text">
              <h1 className="rmr-municipality-name">{MUNICIPALITY.name}</h1>
              {user?.role === "SUPERADMIN" ? (
                <h2 className="rmr-ward-title">सबै वडा कार्यालय</h2>
              ) : (
                <h2 className="rmr-ward-title">वडा नं. {user?.ward} वडा कार्यालय</h2>
              )}
              <p className="rmr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="rmr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="rmr-meta-row">
            <div className="rmr-meta-left">
              <label>
                पत्र संख्या :
                <input
                  name="chalan_no"
                  value={form.chalan_no}
                  onChange={onChange}
                  className="rmr-dotted-input rmr-w-small"
                  placeholder="२०८२/८३ ..."
                />
              </label>
            </div>
            <div className="rmr-meta-right">
              <label>
                मिति :
                <input
                  name="date_nepali"
                  value={form.date_nepali}
                  onChange={onChange}
                  className="rmr-dotted-input rmr-w-small"
                  placeholder="२०८२-०८-०६"
                />
              </label>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="rmr-subject">
            <p>
              विषय:{" "}
              <span className="rmr-underline rmr-bold">
                नेपाल सरकारको नाममा बाटो कायम सिफारिस।
              </span>
            </p>
          </div>

          {/* ── Body ── */}
          <div className="rmr-body">
            <p>
              उपरोक्त सम्बन्धमा मेरो नाममा दर्ता श्रेस्ता भएको
              <input name="district"     value={form.district}     onChange={onChange} className="rmr-inline-input rmr-w-medium-box" placeholder="जिल्ला" />
              <input name="municipality" value={form.municipality} onChange={onChange} className="rmr-inline-input rmr-w-medium-box" placeholder="नगरपालिका / गापा" />
              वडा नं.
              <input name="ward_no"      value={form.ward_no}      onChange={onChange} className="rmr-inline-input rmr-w-tiny-box" />
              (साविक
              <select name="previous_address_type" value={form.previous_address_type} onChange={onChange} className="rmr-inline-select rmr-sel-medium">
                <option value="">छनौट</option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="नगरपालिका">नगरपालिका</option>
              </select>
              , वडा नं.
              <input name="previous_ward_no" value={form.previous_ward_no} onChange={onChange} className="rmr-inline-input rmr-w-tiny-box" />
              ) कि.न.
              <input name="kitta_no" value={form.kitta_no} onChange={onChange} className="rmr-inline-input rmr-w-small-box" required />
              को क्षे.फ.
              <input name="area"     value={form.area}     onChange={onChange} className="rmr-inline-input rmr-w-medium-box" />
              जग्गामध्ये
              <select name="side" value={form.side} onChange={onChange} className="rmr-inline-select rmr-sel-medium">
                <option value="">दिशा</option>
                <option value="पूर्व">पूर्व</option>
                <option value="पश्चिम">पश्चिम</option>
                <option value="उत्तर">उत्तर</option>
                <option value="दक्षिण">दक्षिण</option>
              </select>
              तर्फबाट
              <input name="width_ft"  value={form.width_ft}  onChange={onChange} className="rmr-inline-input rmr-w-small-box" placeholder="चौडाइ (ft)" />
              चौडाइ र
              <input name="length_ft" value={form.length_ft} onChange={onChange} className="rmr-inline-input rmr-w-small-box" placeholder="लम्बाइ (ft)" />
              फिट लम्बाई नेपाल सरकारको नाममा कित्ताकाट गरी नेपाल सरकारको नाममा बाटो
              कायम गर्न सिफारिस गरी पाउँ भनी जग्गाधनी
              <select name="owner_title" value={form.owner_title} onChange={onChange} className="rmr-inline-select rmr-sel-small">
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
                <option value="श्रीमती">श्रीमती</option>
              </select>
              <input name="owner_name" value={form.owner_name} onChange={onChange} className="rmr-inline-input rmr-w-long-box" required />
              ले यस वडा कार्यालयमा निवेदन दिनु भएको हुँदा सो सम्बन्धमा प्राबिधिक
              प्रतिवेदन अनुसार कित्ताकाट गर्न मिल्ने देखिएकोले प्राबिधिक फिल्ड
              निरीक्षण प्रतिवेदन सहित पठाइएको छ | तहाँको नियमानुसार नेपाल सरकारको
              नाममा बाटो कायम गरिदिनुहुन सिफारिस गरिन्छ |
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="rmr-signature-section">
            <div className="rmr-signature-block">
              <div className="rmr-signature-line"></div>
              <select
                name="designation"
                value={form.designation}
                onChange={onChange}
                className="rmr-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <div className="rmr-applicant-box">
            <h3>निवेदकको विवरण</h3>
            <div className="rmr-details-grid">
              <div className="rmr-detail-group">
                <label>निवेदकको नाम <span className="rmr-red">*</span></label>
                <input name="applicant_name"           value={form.applicant_name}           onChange={onChange} className="rmr-detail-input" required />
              </div>
              <div className="rmr-detail-group">
                <label>निवेदकको ठेगाना</label>
                <input name="applicant_address"        value={form.applicant_address}        onChange={onChange} className="rmr-detail-input" />
              </div>
              <div className="rmr-detail-group">
                <label>निवेदकको नागरिकता नं.</label>
                <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={onChange} className="rmr-detail-input" />
              </div>
              <div className="rmr-detail-group">
                <label>निवेदकको फोन नं.</label>
                <input name="applicant_phone"          value={form.applicant_phone}          onChange={onChange} className="rmr-detail-input" />
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="rmr-footer">
            <button type="submit" className="rmr-save-print-btn" disabled={loading}>
              {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          {error  && <div className="rmr-error">{error}</div>}
          {result && <div className="rmr-success">सफलतापूर्वक सेभ भयो। ID: {result.id}</div>}

          <div className="rmr-copyright">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>

        </form>
      </div>
    </>
  );
}