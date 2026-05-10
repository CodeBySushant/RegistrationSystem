// src/pages/application/LandBoundaryVerificationForm.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from LandBoundaryVerificationForm.css)
   All classes prefixed with "lbvf-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .lbvf-container {
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

  /* ── Top form-row (addressee + date) ── */
  .lbvf-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
  }

  /* ── Generic form-group ── */
  .lbvf-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
    gap: 8px;
  }
  .lbvf-form-group label { font-weight: bold; white-space: nowrap; }
  .lbvf-form-group input,
  .lbvf-form-group select {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Fields grid (2-col) ── */
  .lbvf-fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 24px;
    margin-bottom: 24px;
  }
  .lbvf-fields-grid .lbvf-form-group {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
  .lbvf-fields-grid .lbvf-form-group input,
  .lbvf-fields-grid .lbvf-form-group select { width: 100%; }
  .lbvf-fields-grid .lbvf-full-width { grid-column: 1 / -1; }
  @media (max-width: 600px) {
    .lbvf-fields-grid { grid-template-columns: 1fr; }
  }

  /* ── Header "To" ── */
  .lbvf-header-to-group { display: flex; flex-direction: column; }
  .lbvf-header-to-group input,
  .lbvf-header-to-group select {
    font-family: inherit;
    font-size: 16px;
    font-weight: bold;
    padding: 4px 6px;
    margin-bottom: 8px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    width: 250px;
    max-width: 100%;
  }
  .lbvf-header-to-group select { width: auto; min-width: 250px; }

  /* ── Date group ── */
  .lbvf-date-group { font-weight: bold; }
  .lbvf-date-group input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    padding: 2px 6px;
    outline: none;
  }

  /* ── Subject ── */
  .lbvf-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Body ── */
  .lbvf-certificate-body {
    line-height: 2.8;
    font-size: 16px;
    text-align: justify;
  }

  /* ── Designation / Signature section ── */
  .lbvf-designation-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
    margin-right: 20px;
  }
  .lbvf-signature-fields {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .lbvf-form-group-inline {
    display: flex;
    align-items: baseline;
    margin-top: 10px;
  }
  .lbvf-form-group-inline label {
    font-weight: bold;
    margin-right: 8px;
    white-space: nowrap;
  }
  .lbvf-form-group-inline input,
  .lbvf-form-group-inline select {
    width: 200px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 15px;
  }
  .lbvf-form-group-inline select { width: auto; min-width: 200px; }

  /* ── Applicant details overrides ── */
  .lbvf-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .lbvf-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .lbvf-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .lbvf-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Submit ── */
  .lbvf-submit-area { text-align: center; margin-top: 40px; }
  .lbvf-submit-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .lbvf-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
  .lbvf-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .lbvf-copyright {
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
    .lbvf-container,
    .lbvf-container * { visibility: visible; }
    .lbvf-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .lbvf-submit-area { display: none !important; }
    input, select, textarea {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerTo: "श्री प्रमुख प्रशासकीय अधिकृत ज्यु",
  headerMunicipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  headerOffice: "को कार्यालय",
  headerDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainMunicipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  mainWardNo1: MUNICIPALITY?.wardNumber || "१",
  prevLocationType: "साबिक",
  prevWardNo: MUNICIPALITY?.wardNumber || "१",
  tole: "",
  applicantTitle: "श्री",
  applicantRelation: "छोरा",
  applicantAge: "",
  guardianTitle: "श्री",
  guardianName: "",
  kittaNo: "",
  landName: "",
  landArea: "",
  feeAmount: "",
  feeAmountWords: "",
  sigApplicantType: "निवेदक",
  sigName: "",
  sigAddress: "",
  sigWard: "",
  sigPhone: "",
  coapplicantName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const LandBoundaryVerificationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.mainDistrict?.trim())       return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.mainMunicipality?.trim())   return "पालिकाको नाम भर्नुहोस्";
    if (!fd.mainWardNo1?.trim())        return "वडा नं. भर्नुहोस्";
    if (!fd.tole?.trim())               return "टोल भर्नुहोस्";
    if (!fd.applicantName?.trim())      return "निवेदकको नाम भर्नुहोस्";
    if (!fd.applicantAge?.trim())       return "निवेदकको उमेर भर्नुहोस्";
    if (!fd.guardianName?.trim())       return "अभिभावकको नाम भर्नुहोस्";
    if (!fd.kittaNo?.trim())            return "कित्ता नं. भर्नुहोस्";
    if (!fd.landArea?.trim())           return "क्षेत्रफल भर्नुहोस्";
    if (!fd.feeAmount?.trim())          return "रकम भर्नुहोस्";
    if (!fd.feeAmountWords?.trim())     return "रकम अक्षरुपी भर्नुहोस्";
    if (!fd.sigName?.trim())            return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigPhone?.trim())           return "सम्पर्क नम्बर भर्नुहोस्";
    if (!fd.applicantAddress?.trim())   return "निवेदक ठेगाना भर्नुहोस्";
    if (!fd.applicantCitizenship?.trim()) return "नागरिकता नं. भर्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया आवश्यक सूचना भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/land-boundary-verification", payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        // Print first, then reset — so the printed page is not blank
        window.print();
        setTimeout(() => setFormData(initialState), 500);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
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

      <div className="lbvf-container">
        <form onSubmit={handleSubmit}>

          {/* ── Reusable Municipality Header ── */}
          <div className="lbvf-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date row ── */}
          <div className="lbvf-form-row">
            <div className="lbvf-header-to-group">
              <input
                type="text"
                name="headerTo"
                value={formData.headerTo}
                onChange={handleChange}
              />
              <select
                name="headerMunicipality"
                value={formData.headerMunicipality}
                onChange={handleChange}
              >
                <option>{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</option>
              </select>
              <input
                type="text"
                name="headerOffice"
                value={formData.headerOffice}
                onChange={handleChange}
              />
              <input
                type="text"
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                required
              />
            </div>

            <div className="lbvf-form-group lbvf-date-group">
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
          <div className="lbvf-subject-line">
            <strong>
              विषय: <u>जग्गाको साँध सिमाङ्कन गर्न अधिन खटाई पाउँ बारे।</u>
            </strong>
          </div>

          <p className="lbvf-certificate-body">
            यस सम्बन्धमा म/हामीले तल उल्लेखित जग्गाको सीमा सिमाङ्कन गराउन अनुरोध
            गर्दछौं। आवश्यक नक्सा, कित्ता विवरण र अन्य कागजात संलग्न गरिएको छ।
          </p>

          {/* ── Fields Grid ── */}
          <div className="lbvf-fields-grid">

            <div className="lbvf-form-group">
              <label>मुख्य जिल्ला</label>
              <input type="text" name="mainDistrict"     value={formData.mainDistrict}     onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>पालिका</label>
              <input type="text" name="mainMunicipality" value={formData.mainMunicipality} onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>वडा नं.</label>
              <input type="text" name="mainWardNo1"      value={formData.mainWardNo1}      onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>पूर्व स्थान प्रकार</label>
              <select name="prevLocationType" value={formData.prevLocationType} onChange={handleChange}>
                <option>साबिक</option>
                <option>यहाँ</option>
              </select>
            </div>
            <div className="lbvf-form-group">
              <label>पूर्व वडा नं.</label>
              <input type="text" name="prevWardNo"    value={formData.prevWardNo}    onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>टोल</label>
              <input type="text" name="tole"          value={formData.tole}          onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>निवेदकको नाम</label>
              <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>उमेर</label>
              <input type="text" name="applicantAge"  value={formData.applicantAge}  onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>अभिभावक/पति</label>
              <input type="text" name="guardianName"  value={formData.guardianName}  onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>कित्ता नं.</label>
              <input type="text" name="kittaNo"       value={formData.kittaNo}       onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>जग्गाको नाम</label>
              <input type="text" name="landName"      value={formData.landName}      onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>क्षेत्रफल</label>
              <input type="text" name="landArea"      value={formData.landArea}      onChange={handleChange} />
            </div>
            <div className="lbvf-form-group">
              <label>दर्ता दस्तुर (रु.)</label>
              <input type="text" name="feeAmount"     value={formData.feeAmount}     onChange={handleChange} />
            </div>
            <div className="lbvf-form-group lbvf-full-width">
              <label>रकम (अक्षरुपी)</label>
              <input type="text" name="feeAmountWords" value={formData.feeAmountWords} onChange={handleChange} />
            </div>

          </div>

          {/* ── Signature fields ── */}
          <div className="lbvf-designation-section">
            <div className="lbvf-signature-fields">

              <div className="lbvf-form-group-inline">
                <select name="sigApplicantType" value={formData.sigApplicantType} onChange={handleChange}>
                  <option>निवेदक</option>
                  <option>निवेदिका</option>
                </select>
              </div>
              <div className="lbvf-form-group-inline">
                <label>नाम : *</label>
                <input type="text" name="sigName"    value={formData.sigName}    onChange={handleChange} required />
              </div>
              <div className="lbvf-form-group-inline">
                <label>ठेगाना :</label>
                <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} />
              </div>
              <div className="lbvf-form-group-inline">
                <label>वडा नं. :</label>
                <input type="text" name="sigWard"    value={formData.sigWard}    onChange={handleChange} />
              </div>
              <div className="lbvf-form-group-inline">
                <label>सम्पर्क नं. : *</label>
                <input type="text" name="sigPhone"   value={formData.sigPhone}   onChange={handleChange} required />
              </div>

            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="lbvf-submit-area">
            <button type="submit" disabled={submitting} className="lbvf-submit-btn">
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default LandBoundaryVerificationForm;