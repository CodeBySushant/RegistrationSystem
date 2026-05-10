// src/pages/application/TribalVerificationRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from TribalVerificationRecommendation.css)
   All classes prefixed with "tvr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .tvr-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 25px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: 'Kalimati', 'Kokila', 'Arial', sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
  }

  /* ── Top row (addressee + date) ── */
  .tvr-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  /* ── Generic form-group ── */
  .tvr-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .tvr-form-group label { font-weight: bold; margin-right: 8px; }
  .tvr-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Header "To" ── */
  .tvr-header-to {
    flex-wrap: wrap;
    font-size: 16px;
    font-weight: bold;
  }
  .tvr-header-to .tvr-header-input,
  .tvr-header-to .tvr-header-select {
    font-family: inherit;
    font-size: 16px;
    padding: 4px 6px;
    margin: 0 5px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
  }
  .tvr-header-to .tvr-header-select       { width: auto; min-width: 150px; }
  .tvr-header-to .tvr-header-select.tvr-short { min-width: 50px; }

  /* ── Date group ── */
  .tvr-date-group { font-weight: bold; }
  .tvr-date-group input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    padding: 2px 6px;
    outline: none;
  }

  /* ── Subject ── */
  .tvr-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .tvr-certificate-body {
    line-height: 2.8;
    font-size: 16px;
    text-align: justify;
  }
  .tvr-certificate-body input[type="text"],
  .tvr-certificate-body select {
    display: inline-block;
    vertical-align: baseline;
    padding: 4px 6px;
    font-family: inherit;
    font-size: 15px;
    background-color: transparent;
    border: none;
    border-bottom: 1px dotted #000;
    margin: 0 5px;
    width: 120px;
    max-width: 100%;
    box-sizing: border-box;
  }
  .tvr-certificate-body select { width: auto; min-width: 80px; }

  /* ── Rich text area (plain textarea, no fake toolbar) ── */
  .tvr-rich-text-area { margin-top: 20px; }
  .tvr-rich-text-area label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  .tvr-rich-text-area textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-family: inherit;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    line-height: 1.8;
    resize: vertical;
    background-color: rgba(255,255,255,0.7);
  }
  .tvr-rich-text-area textarea:focus { outline: none; border-color: #888; }

  /* ── Designation / Signature section ── */
  .tvr-designation-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 40px;
    margin-right: 20px;
  }
  .tvr-signature-label { font-weight: bold; font-size: 16px; }
  .tvr-signature-fields { display: flex; flex-direction: column; align-items: flex-end; }
  .tvr-form-group-inline {
    display: flex;
    align-items: baseline;
    margin-top: 10px;
  }
  .tvr-form-group-inline label {
    font-weight: bold;
    margin-right: 8px;
    white-space: nowrap;
  }
  .tvr-form-group-inline input {
    width: 200px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 15px;
  }

  /* ── Column form-group ── */
  .tvr-form-group-column { display: flex; flex-direction: column; margin-bottom: 12px; }
  .tvr-form-group-column label { font-size: 14px; font-weight: bold; margin-bottom: 4px; }
  .tvr-form-group-column input {
    width: 350px;
    max-width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Required star ── */
  .tvr-req { color: red; margin-left: 4px; }

  /* ── Applicant details overrides ── */
  .tvr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .tvr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .tvr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .tvr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Submit ── */
  .tvr-submit-area { text-align: center; margin-top: 30px; padding-top: 10px; }
  .tvr-submit-btn {
    background-color: #343a40;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: inherit;
  }
  .tvr-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .tvr-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .tvr-container,
    .tvr-container * { visibility: visible; }
    .tvr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .tvr-submit-area { display: none !important; }
    input, select, textarea {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    input::placeholder,
    textarea::placeholder { color: transparent !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerTo: "श्री वडा सचिव ज्यु",
  municipality1: MUNICIPALITY?.name || "",
  wardNo1: MUNICIPALITY?.wardNumber || "",
  officeName: "नं वडा कार्यालय",
  address1: MUNICIPALITY?.district || "काठमाडौँ",
  municipality2: MUNICIPALITY?.name || "",
  wardNo2: MUNICIPALITY?.wardNumber || "१",
  residentTitle: "श्री",
  residentName: "",
  relation: "बाबु",
  guardianTitle: "श्री",
  guardianName: "",
  tribeCategory: "आदिवासी जनजाती",
  tribeName: "",
  mainContent: "",
  applicantNameSignature: "",
  applicantAddressSignature: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const TribalVerificationRecommendation = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.guardianName?.trim())              return "नाम भर्नुहोस्";
    if (!fd.tribeName?.trim())                 return "जाति नाम भर्नुहोस्";
    if (!fd.applicantNameSignature?.trim())    return "निवेदकको नाम (दस्तखत) भर्नुहोस्";
    if (!fd.applicantAddressSignature?.trim()) return "निवेदकको ठेगाना (दस्तखत) भर्नुहोस्";
    if (!fd.applicantName?.trim())             return "निवेदकको नाम भर्नुहोस्";
    if (!fd.applicantAddress?.trim())          return "निवेदकको ठेगाना भर्नुहोस्";
    if (!fd.applicantCitizenship?.trim())      return "नागरिकता नं. भर्नुहोस्";
    if (!fd.applicantPhone?.trim())            return "सम्पर्क नं. भर्नुहोस्";
    if (!phoneRegex.test(String(fd.applicantPhone))) return "सम्पर्क नं. अमान्य छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/tribal-verification-recommendation", payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        // Print first, then reset — so the printed page is not blank
        window.print();
        setTimeout(() => setFormData(initialState), 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="tvr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality Header ── */}
          <div className="tvr-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="tvr-form-row">
            <div className="tvr-form-group tvr-header-to">
              <input
                type="text"
                name="headerTo"
                value={formData.headerTo}
                onChange={handleChange}
                className="tvr-header-input"
              />
              <select
                name="municipality1"
                value={formData.municipality1}
                onChange={handleChange}
                className="tvr-header-select"
              >
                <option>{formData.municipality1}</option>
              </select>
              <select
                name="wardNo1"
                value={formData.wardNo1}
                onChange={handleChange}
                className="tvr-header-select tvr-short"
              >
                <option>१</option>
                <option>२</option>
                <option>३</option>
              </select>
              <input
                type="text"
                name="officeName"
                value={formData.officeName}
                onChange={handleChange}
                className="tvr-header-input"
              />
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                className="tvr-header-input"
              />
            </div>

            <div className="tvr-form-group tvr-date-group">
              <label>मिति :</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="tvr-subject-line">
            <strong>विषय: <u>आदिवासी जनजाती - प्रमाणित सिफारिस पाउँ।</u></strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="tvr-certificate-body">
            प्रस्तुत विषयमा यस
            <select name="municipality2" value={formData.municipality2} onChange={handleChange}>
              <option>{formData.municipality2}</option>
            </select>
            वडा नं
            <select name="wardNo2" value={formData.wardNo2} onChange={handleChange}>
              <option>१</option>
              <option>२</option>
              <option>३</option>
            </select>
            निवासी
            <select name="residentTitle" value={formData.residentTitle} onChange={handleChange}>
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              type="text"
              name="residentName"
              placeholder="निवासीको नाम"
              value={formData.residentName}
              onChange={handleChange}
            />
            को
            <select name="relation" value={formData.relation} onChange={handleChange}>
              <option>बाबु</option>
              <option>आमा</option>
              <option>पति</option>
            </select>
            <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              type="text"
              name="guardianName"
              placeholder="नाम"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
            <select name="tribeCategory" value={formData.tribeCategory} onChange={handleChange}>
              <option>आदिवासी जनजाती</option>
            </select>
            जाती अन्तर्गत
            <input
              type="text"
              name="tribeName"
              placeholder="जातीको नाम"
              value={formData.tribeName}
              onChange={handleChange}
              required
            />
            जाती भएको व्यहोरा सिफारिस उपलब्ध गराई पाउन यो निवेदन पेश गरेको छु ।
          </p>

          {/* ── Additional content (plain textarea, no fake toolbar) ── */}
          <div className="tvr-form-group-column tvr-rich-text-area">
            <label>निवेदन व्यहोरा (थप विवरण):</label>
            <textarea
              name="mainContent"
              value={formData.mainContent}
              onChange={handleChange}
              rows="5"
              placeholder="थप विवरण यहाँ लेख्नुहोस् (वैकल्पिक)"
            />
          </div>

          {/* ── Signature section ── */}
          <div className="tvr-designation-section">
            <p className="tvr-signature-label">निवेदक / निवेदिका</p>
            <div className="tvr-signature-fields">
              <div className="tvr-form-group-inline">
                <label>नाम, थर : <span className="tvr-req">*</span></label>
                <input
                  type="text"
                  name="applicantNameSignature"
                  value={formData.applicantNameSignature}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="tvr-form-group-inline">
                <label>ठेगाना : <span className="tvr-req">*</span></label>
                <input
                  type="text"
                  name="applicantAddressSignature"
                  value={formData.applicantAddressSignature}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="tvr-submit-area">
            <button type="submit" className="tvr-submit-btn" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default TribalVerificationRecommendation;