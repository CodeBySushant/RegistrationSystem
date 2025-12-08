// src/pages/application/RequestforCertification.jsx
import React, { useState } from "react";
import axios from "axios";
import "./RequestforCertification.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
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
  sigAddress: "",
  sigMobile: "",
  sigSignature: "",
};

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

const RequestforCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.mainDistrict?.trim()) return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.palikaName?.trim()) return "पालिका/नगरपालिका भर्नुहोस्";
    if (!fd.wardNo?.toString().trim()) return "वडा नं. भर्नुहोस्";
    if (!fd.residentName?.trim()) return "निवेदकको नाम भर्नुहोस्";
    if (!fd.guardianName?.trim()) return "अभिभावक/सम्बन्धको नाम भर्नुहोस्";
    if (!fd.doc1Detail?.trim()) return "पहिलो कागजात विवरण भर्नुहोस्";
    if (!fd.doc2Detail?.trim()) return "दोश्रो कागजात विवरण भर्नुहोस्";
    if (!fd.sigName?.trim()) return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigMobile?.trim()) return "मोबाइल नम्बर भर्नुहोस्";
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
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/request-for-certification";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
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
    <div className="request-cert-container">
      <form onSubmit={handleSubmit}>
        {/* Reusable header */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group date-group">
            <label>मिति :</label>
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>प्रमाणित गरि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} required />
          जिल्ला
          <input type="text" name="palikaName" placeholder="गाउँपालिका/नगरपालिका" value={formData.palikaName} onChange={handleChange} required />
          वडा नं.
          <input type="text" name="wardNo" placeholder="वडा" value={formData.wardNo} onChange={handleChange} required className="short-input" />
          निवासी
          <input type="text" name="residentName" placeholder="निवासीको नाम" value={formData.residentName} onChange={handleChange} required />
          को
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </select>
          म
          <input type="text" name="guardianName" placeholder="अभिभावक/सम्बन्धको नाम" value={formData.guardianName} onChange={handleChange} required />
          को
          <input type="text" name="doc1Type" value={formData.doc1Type} onChange={handleChange} required />
          प्रमाणपत्रमा
          <input type="text" name="doc1Detail" placeholder="विवरण" value={formData.doc1Detail} onChange={handleChange} required />
          भएको र
          <input type="text" name="doc2Type" value={formData.doc2Type} onChange={handleChange} required />
          प्रमाणपत्रमा
          <input type="text" name="doc2Detail" placeholder="विवरण" value={formData.doc2Detail} onChange={handleChange} required />
          भई फरक पर्नु व्यक्ति एउटै भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको सिफारिस, नागरिकता प्रमाणपत्र र शैक्षिक प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो निवेदन पेश गरेको छु ।
        </p>

        <div className="form-group-column">
          <label>अन्तर (भिन्नता) विवरण (यदि छ):</label>
          <input type="text" name="variationDetail" value={formData.variationDetail} onChange={handleChange} />
        </div>

        <div className="signature-section-left">
          <h4>निवेदक</h4>
          <div className="form-group-column">
            <label>नामथर: *</label>
            <input type="text" name="sigName" value={formData.sigName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>ठेगाना: *</label>
            <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>मोबाइल नं: *</label>
            <input type="text" name="sigMobile" value={formData.sigMobile} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>हस्ताक्षर:</label>
            <input type="text" name="sigSignature" value={formData.sigSignature} onChange={handleChange} />
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

export default RequestforCertification;
