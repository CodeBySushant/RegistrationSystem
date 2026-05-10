// src/pages/application/RequestforCertification.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from RequestforCertification.css)
   All classes prefixed with "rfc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rfc-container {
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
  .rfc-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
  }

  /* ── Generic form-group ── */
  .rfc-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .rfc-form-group label { font-weight: bold; margin-right: 8px; }
  .rfc-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Header "To" ── */
  .rfc-header-to-group { display: flex; flex-direction: column; }
  .rfc-header-to-group h3 { font-size: 16px; font-weight: bold; margin: 0 0 10px 0; }
  .rfc-header-to-group input {
    font-family: inherit;
    font-size: 16px;
    padding: 4px 6px;
    margin-bottom: 8px;
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    width: 250px;
    max-width: 100%;
  }

  /* ── Date group ── */
  .rfc-date-group { font-weight: bold; }
  .rfc-date-group input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    padding: 2px 6px;
    outline: none;
  }

  /* ── Subject ── */
  .rfc-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .rfc-certificate-body {
    line-height: 2.8;
    font-size: 16px;
    text-align: justify;
  }
  .rfc-certificate-body input[type="text"],
  .rfc-certificate-body select {
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
  .rfc-certificate-body select { width: auto; min-width: 80px; }
  .rfc-certificate-body .rfc-short-input { width: 80px; }

  /* ── Column form-group (variation + signature fields) ── */
  .rfc-form-group-column {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  .rfc-form-group-column label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .rfc-form-group-column input {
    width: 350px;
    max-width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Signature section (left-floated) ── */
  .rfc-signature-section-left {
    margin-top: 30px;
    margin-bottom: 20px;
    float: left;
    width: 40%;
    min-width: 300px;
  }
  .rfc-signature-section-left h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
  }

  /* ── Required star ── */
  .rfc-req { color: red; margin-left: 4px; }

  /* ── Applicant details overrides ── */
  .rfc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
    clear: both; /* clears the float from signature-section-left */
  }
  .rfc-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .rfc-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .rfc-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Submit ── */
  .rfc-submit-area {
    clear: both;
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
  }
  .rfc-submit-btn {
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
  .rfc-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .rfc-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .rfc-container,
    .rfc-container * { visibility: visible; }
    .rfc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    /* Both the old .form-footer and .submit-area hidden */
    .rfc-submit-area { display: none !important; }
    input, select, textarea {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    input::placeholder { color: transparent !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "1",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  doc1Type: "नागरिकता",
  doc1Detail: "",
  doc2Type: "शैक्षिक योग्यता",
  doc2Detail: "",
  variationDetail: "",
  sigName: "",
  sigMobile: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const RequestforCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.mainDistrict?.trim())            return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.palikaName?.trim())              return "पालिका/नगरपालिका भर्नुहोस्";
    if (!fd.wardNo?.toString().trim())       return "वडा नं. भर्नुहोस्";
    if (!fd.residentName?.trim())            return "निवेदकको नाम भर्नुहोस्";
    if (!fd.guardianName?.trim())            return "अभिभावक/सम्बन्धको नाम भर्नुहोस्";
    if (!fd.doc1Detail?.trim())              return "पहिलो कागजात विवरण भर्नुहोस्";
    if (!fd.doc2Detail?.trim())              return "दोश्रो कागजात विवरण भर्नुहोस्";
    if (!fd.sigName?.trim())                 return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigMobile?.trim())               return "मोबाइल नम्बर भर्नुहोस्";
    if (!phoneRegex.test(String(fd.sigMobile))) return "मोबाइल नम्बर अमान्य छ";
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

      const res = await axios.post("/api/forms/request-for-certification", payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        // Print first, then reset — so printed page is not blank
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

      <div className="rfc-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality Header ── */}
          <div className="rfc-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="rfc-form-row">
            <div className="rfc-header-to-group">
              <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
              <input
                type="text"
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                required
              />
            </div>
            <div className="rfc-form-group rfc-date-group">
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
          <div className="rfc-subject-line">
            <strong>विषय: <u>प्रमाणित गरि पाउँ ।</u></strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="rfc-certificate-body">
            <input
              type="text"
              name="mainDistrict"
              value={formData.mainDistrict}
              onChange={handleChange}
              required
            />
            जिल्ला
            <input
              type="text"
              name="palikaName"
              placeholder="गाउँपालिका/नगरपालिका"
              value={formData.palikaName}
              onChange={handleChange}
              required
            />
            वडा नं.
            <input
              type="text"
              name="wardNo"
              placeholder="वडा"
              value={formData.wardNo}
              onChange={handleChange}
              required
              className="rfc-short-input"
            />
            निवासी
            <input
              type="text"
              name="residentName"
              placeholder="निवासीको नाम"
              value={formData.residentName}
              onChange={handleChange}
              required
            />
            को
            <select name="relation" value={formData.relation} onChange={handleChange}>
              <option>छोरा</option>
              <option>छोरी</option>
              <option>पति</option>
              <option>पत्नी</option>
            </select>
            म
            <input
              type="text"
              name="guardianName"
              placeholder="अभिभावक/सम्बन्धको नाम"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
            को
            <input
              type="text"
              name="doc1Type"
              value={formData.doc1Type}
              onChange={handleChange}
              required
            />
            प्रमाणपत्रमा
            <input
              type="text"
              name="doc1Detail"
              placeholder="विवरण"
              value={formData.doc1Detail}
              onChange={handleChange}
              required
            />
            भएको र
            <input
              type="text"
              name="doc2Type"
              value={formData.doc2Type}
              onChange={handleChange}
              required
            />
            प्रमाणपत्रमा
            <input
              type="text"
              name="doc2Detail"
              placeholder="विवरण"
              value={formData.doc2Detail}
              onChange={handleChange}
              required
            />
            भई फरक पर्नु व्यक्ति एउटै भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा
            कार्यालयको सिफारिस, नागरिकता प्रमाणपत्र र शैक्षिक प्रमाणपत्रको फोटोकपी
            सहित रु १०।- को टिकट टाँसी यो निवेदन पेश गरेको छु ।
          </p>

          {/* ── Variation detail ── */}
          <div className="rfc-form-group-column">
            <label>अन्तर (भिन्नता) विवरण (यदि छ):</label>
            <input
              type="text"
              name="variationDetail"
              value={formData.variationDetail}
              onChange={handleChange}
            />
          </div>

          {/* ── Applicant signature detail ── */}
          <div className="rfc-signature-section-left">
            <h4>निवेदकको विवरण</h4>
            <div className="rfc-form-group-column">
              <label>नाम : <span className="rfc-req">*</span></label>
              <input
                type="text"
                name="sigName"
                value={formData.sigName}
                onChange={handleChange}
                placeholder="पूरा नाम"
                required
              />
            </div>
            <div className="rfc-form-group-column">
              <label>मोबाइल नं. : <span className="rfc-req">*</span></label>
              <input
                type="text"
                name="sigMobile"
                value={formData.sigMobile}
                onChange={handleChange}
                placeholder="मोबाइल नम्बर"
                required
              />
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="rfc-submit-area">
            <button type="submit" className="rfc-submit-btn" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default RequestforCertification;