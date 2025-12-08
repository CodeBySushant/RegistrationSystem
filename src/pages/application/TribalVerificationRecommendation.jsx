// src/pages/appeal/TribalVerificationRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./TribalVerificationRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
  headerTo: "श्री वडा सचिव ज्यु",
  municipality1: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  wardNo1: MUNICIPALITY?.wardNumber || "१",
  officeName: "नं वडा कार्यालय",
  address1: MUNICIPALITY?.district || "काठमाडौँ",
  municipality2: MUNICIPALITY?.name || "নागार्जुन नगरपालिका",
  wardNo2: MUNICIPALITY?.wardNumber || "१",
  residentTitle: "श्री",
  relation: "बाबु",
  guardianTitle: "श्री",
  guardianName: "",
  tribeCategory: "आदिवासी जनजाती",
  tribeName: "",
  mainContent: "महोदय,\nउपलब्ध गराई पाउन यो निवेदन पेश गरेको छु ।",
  applicantNameSignature: "",
  applicantAddressSignature: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

const TribalVerificationRecommendation = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.guardianName?.trim()) return "नाम भर्नुहोस् (guardianName)";
    if (!fd.tribeName?.trim()) return "जाति नाम भर्नुहोस् (tribeName)";
    if (!fd.applicantName?.trim()) return "निवेदकको नाम भर्नुहोस्";
    if (!fd.applicantAddress?.trim()) return "निवेदकको ठेगाना भर्नुहोस्";
    if (!fd.applicantCitizenship?.trim()) return "नागरिकता नं. भर्नुहोस्";
    if (!fd.applicantPhone?.trim()) return "सम्पर्क नं. भर्नुहोस्";
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
      // normalize empty strings -> null
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/tribal-verification-recommendation";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        setTimeout(() => window.print(), 150);
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

  return (
    <div className="tribal-verification-container">
      <form onSubmit={handleSubmit}>
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        <div className="form-row">
          <div className="form-group header-to">
            <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} className="header-input" />
            <select name="municipality1" value={formData.municipality1} onChange={handleChange} className="header-select">
              <option>{formData.municipality1}</option>
            </select>
            <select name="wardNo1" value={formData.wardNo1} onChange={handleChange} className="header-select short">
              <option>१</option><option>२</option><option>३</option>
            </select>
            <input type="text" name="officeName" value={formData.officeName} onChange={handleChange} className="header-input" />
            <input type="text" name="address1" value={formData.address1} onChange={handleChange} className="header-input" />
          </div>

          <div className="form-group date-group">
            <label>मिति :</label>
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>आदिवासी जनजाती - प्रमाणित सिफारिस पाउँ।</u></strong>
        </div>

        <p className="certificate-body">
          प्रस्तुत विषयमा यस
          <select name="municipality2" value={formData.municipality2} onChange={handleChange}>
            <option>{formData.municipality2}</option>
          </select>
          वडा नं
          <select name="wardNo2" value={formData.wardNo2} onChange={handleChange}>
            <option>१</option><option>२</option><option>३</option>
          </select>
          निवासी
          <select name="residentTitle" value={formData.residentTitle} onChange={handleChange}>
            <option>श्री</option><option>सुश्री</option><option>श्रीमती</option>
          </select>
          (
            को
            <select name="relation" value={formData.relation} onChange={handleChange}>
              <option>बाबु</option><option>आमा</option><option>पति</option>
            </select>
            <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
              <option>श्री</option><option>सुश्री</option><option>श्रीमती</option>
            </select>
          )
          <input type="text" name="guardianName" placeholder="नाम" value={formData.guardianName} onChange={handleChange} required />
          <select name="tribeCategory" value={formData.tribeCategory} onChange={handleChange}>
            <option>आदिवासी जनजाती</option>
          </select>
          जाती अन्तर्गत
          <input type="text" name="tribeName" placeholder="जातीको नाम" value={formData.tribeName} onChange={handleChange} required />
          जाती भएको व्यहोरा सिफारिस उपलब्ध गराई पाउन यो निवेदन पेश गरेको छु ।
        </p>

        <div className="form-group-column rich-text-area">
          <label>निवेदन व्यहोरा:</label>
          <div className="editor-toolbar-placeholder">[BIU S A ... Styles Format]</div>
          <textarea name="mainContent" value={formData.mainContent} onChange={handleChange} rows="6" />
        </div>

        <div className="designation-section">
          <p className="signature-label">निवेदक / निवेदिका</p>
          <div className="signature-fields">
            <div className="form-group-inline">
              <label>नाम, थर : *</label>
              <input type="text" name="applicantNameSignature" value={formData.applicantNameSignature} onChange={handleChange} required />
            </div>
            <div className="form-group-inline">
              <label>ठेगाना : *</label>
              <input type="text" name="applicantAddressSignature" value={formData.applicantAddressSignature} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div className="form-group-column">
            <label>निवेदकको नाम *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>ठेगाना *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>नागरिकता नं. *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>फोन नं. *</label>
            <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TribalVerificationRecommendation;
