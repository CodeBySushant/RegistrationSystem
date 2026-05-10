// src/pages/application/RequestforCertificationMotherFather.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from RequestforCertificationMotherFather.css)
   All classes prefixed with "rcmf-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .rcmf-container {
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
  .rcmf-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
  }

  /* ── Generic form-group ── */
  .rcmf-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .rcmf-form-group label { font-weight: bold; margin-right: 8px; }
  .rcmf-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Header "To" ── */
  .rcmf-header-to-group { display: flex; flex-direction: column; }
  .rcmf-header-to-group h3 { font-size: 16px; font-weight: bold; margin: 0 0 10px 0; }
  .rcmf-header-to-group input {
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
  .rcmf-date-group { font-weight: bold; }
  .rcmf-date-group input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    padding: 2px 6px;
    outline: none;
  }

  /* ── Subject ── */
  .rcmf-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .rcmf-certificate-body {
    line-height: 2.8;
    font-size: 16px;
    text-align: justify;
  }
  .rcmf-certificate-body input[type="text"],
  .rcmf-certificate-body select {
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
  .rcmf-certificate-body select { width: auto; min-width: 80px; }
  .rcmf-certificate-body .rcmf-short-input { width: 80px; }

  /* ── Signature section (left-floated) ── */
  .rcmf-signature-section-left {
    margin-top: 30px;
    margin-bottom: 20px;
    float: left;
    width: 40%;
    min-width: 300px;
  }
  .rcmf-signature-section-left h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
  }

  /* ── Column form-group (signature fields) ── */
  .rcmf-form-group-column {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  .rcmf-form-group-column label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .rcmf-form-group-column input {
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

  /* ── Required star ── */
  .rcmf-req { color: red; margin-left: 4px; }

  /* ── Applicant details overrides — clears the float ── */
  .rcmf-container .applicant-details-box {
    clear: both;
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .rcmf-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .rcmf-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .rcmf-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Submit — clears the float ── */
  .rcmf-submit-area {
    clear: both;
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
  }
  .rcmf-submit-btn {
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
  .rcmf-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .rcmf-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .rcmf-container,
    .rcmf-container * { visibility: visible; }
    .rcmf-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .rcmf-submit-area { display: none !important; }
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
  doc1Detail: "",
  doc2Detail: "",
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
const RequestforCertificationMotherFather = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.mainDistrict?.trim())              return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.palikaName?.trim())                return "पालिका/नगरपालिका भर्नुहोस्";
    if (!fd.wardNo?.toString().trim())         return "वडा नं. भर्नुहोस्";
    if (!fd.residentName?.trim())              return "निवेदकको नाम भर्नुहोस्";
    if (!fd.guardianName?.trim())              return "वुवा/आमाको नाम भर्नुहोस्";
    if (!fd.doc1Detail?.trim())                return "निवेदकको नागरिकताको विवरण भर्नुहोस्";
    if (!fd.doc2Detail?.trim())                return "वुवा/आमाको नागरिकताको विवरण भर्नुहोस्";
    if (!fd.sigName?.trim())                   return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigMobile?.trim())                 return "मोबाइल नम्बर भर्नुहोस्";
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

      const res = await axios.post("/api/forms/request-for-certification-mf", payload);

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

      <div className="rcmf-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality Header ── */}
          <div className="rcmf-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="rcmf-form-row">
            <div className="rcmf-header-to-group">
              <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
              <input
                type="text"
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                required
              />
            </div>
            <div className="rcmf-form-group rcmf-date-group">
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
          <div className="rcmf-subject-line">
            <strong>विषय: <u>प्रमाणित गरि पाउँ ।</u></strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="rcmf-certificate-body">
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
              className="rcmf-short-input"
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
              placeholder="वुवा/आमाको नाम"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
            को नागरिकता प्रमाणपत्रमा
            <input
              type="text"
              name="doc1Detail"
              placeholder="निवेदकको नागरिकता विवरण"
              value={formData.doc1Detail}
              onChange={handleChange}
              required
            />
            भएको र वुवा/आमाको नागरिकतामा
            <input
              type="text"
              name="doc2Detail"
              placeholder="वुवा/आमाको नागरिकता विवरण"
              value={formData.doc2Detail}
              onChange={handleChange}
              required
            />
            भई फरक परे पनि हामीहरु बाबु, आमा र छोरा भएकोले सोही व्यहोरा प्रमाणित
            गरि पाउन, वडा कार्यालयको सिफारिस र कागजात संलग्न राखी यो निवेदन पेश
            गरेको छु ।
          </p>

          {/* ── Applicant signature detail ── */}
          <div className="rcmf-signature-section-left">
            <h4>निवेदकको विवरण</h4>
            <div className="rcmf-form-group-column">
              <label>नाम : <span className="rcmf-req">*</span></label>
              <input
                type="text"
                name="sigName"
                value={formData.sigName}
                onChange={handleChange}
                placeholder="पूरा नाम"
                required
              />
            </div>
            <div className="rcmf-form-group-column">
              <label>मोबाइल नं. : <span className="rcmf-req">*</span></label>
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
          <div className="rcmf-submit-area">
            <button type="submit" className="rcmf-submit-btn" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default RequestforCertificationMotherFather;