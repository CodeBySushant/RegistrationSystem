// src/pages/application/DalitCasteCertification.jsx
import React, { useState } from "react";
import axios from "axios";
import "./DalitCasteCertification.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
  headerDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  casteName: "",
  sigName: "",
  sigAddress: "",
  sigMobile: "",
  sigSignature: "",
};

const DalitCasteCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    if (!d.mainDistrict?.trim()) return "mainDistrict is required";
    if (!d.palikaName?.trim()) return "palikaName is required";
    if (!d.wardNo?.trim()) return "wardNo is required";
    if (!d.residentName?.trim()) return "residentName is required";
    if (!d.casteName?.trim()) return "casteName is required";
    if (!d.sigName?.trim()) return "sigName is required";
    if (!d.sigMobile || !/^[0-9+\-\s]{6,20}$/.test(String(d.sigMobile))) {
      return "sigMobile (required/invalid)";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/dalit-caste-certification";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        setTimeout(() => window.print(), 150);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      console.error("server response:", error.response?.data);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Submission failed";
      alert("त्रुटि: " + JSON.stringify(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dalit-cert-container">
      <form onSubmit={handleSubmit}>
        {/* reusable Nepali header */}
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
          <strong>विषय: <u>दलित जाति प्रमाणित गरि पाउँ ।</u></strong>
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
          <input type="text" name="guardianName" placeholder="अभिभावकको नाम" value={formData.guardianName} onChange={handleChange} />
          दलित जाति अन्तर्गत
          <input type="text" name="casteName" placeholder="जातिको नाम" value={formData.casteName} onChange={handleChange} required />
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो निवेदन पेश गरेको छु ।
        </p>

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

export default DalitCasteCertification;
