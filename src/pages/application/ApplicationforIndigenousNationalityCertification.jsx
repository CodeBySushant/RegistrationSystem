// src/pages/application/ApplicationforIndigenousNationalityCertification.jsx
import React, { useState } from "react";
import axios from "axios";
import "./ApplicationforIndigenousNationalityCertification.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: "काठमाडौँ",
  mainDistrict: "काठमाडौँ",
  // use MUNICIPALITY Nepali name if available
  palikaName: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  tribeName: "",
  sigName: "",
  sigAddress: "",
  sigMobile: "",
  sigSignature: "",
};

const ApplicationforIndigenousNationalityCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (data) => {
    const required = [
      "headerDistrict",
      "mainDistrict",
      "palikaName",
      "wardNo",
      "residentName",
      "guardianName",
      "tribeName",
      "sigName",
      "sigAddress",
      "sigMobile",
    ];
    for (let f of required) {
      if (!data[f] || (typeof data[f] === "string" && data[f].trim() === "")) {
        return `${f} is required`;
      }
    }
    // optional: phone format check (Nepali numbers + symbols)
    if (!/^[0-9+\-\s]{6,20}$/.test(String(data.sigMobile))) {
      return "sigMobile (invalid format)";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्। (" + err + ")");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      // Use relative endpoint (adjust if your API path differs)
      const url = "/api/forms/indigenous-certification";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("फर्म सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        console.log("Saved:", res.data);
        setFormData(initialState);
        setTimeout(() => window.print(), 150);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="indigenous-cert-container">
      <form onSubmit={handleSubmit}>
        {/* Reusable Nepali header */}
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
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>जनजाति प्रमाणित गरि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
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
            className="short-input"
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
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
            <option value="पति">पति</option>
            <option value="पत्नी">पत्नी</option>
          </select>
          म
          <input
            type="text"
            name="guardianName"
            placeholder="अभिभावकको नाम"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
          जनजाति अन्तर्गत
          <input
            type="text"
            name="tribeName"
            placeholder="जातिको नाम"
            value={formData.tribeName}
            onChange={handleChange}
            required
          />
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

export default ApplicationforIndigenousNationalityCertification;
