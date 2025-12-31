// src/pages/application/CitizenshipwithoutHusbandSurname.jsx
import React, { useState } from "react";
import axios from "axios";
import "./CitizenshipwithoutHusbandSurname.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  districtOffice: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  preMarriageDate: "२०८२.०७.१५",
  preMarriageDistrict: "",
  relationshipStatus: "सम्बन्धविच्छेद",
  certificateInfo: "",
  currentHusbandName: "",
  currentDistrict: MUNICIPALITY?.englishDistrict || "जिल्ला",
  currentPalikaType: "गा.पा.",
  currentPalikaName: MUNICIPALITY?.name || "",
  sigName: "",
  sigAddress: "",
  sigMobile: "",
  sigSignature: "",
};

const CitizenshipwithoutHusbandSurname = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    if (!d.preMarriageDistrict?.trim()) return "preMarriageDistrict is required";
    if (!d.certificateInfo?.trim()) return "certificateInfo is required";
    if (!d.currentHusbandName?.trim()) return "currentHusbandName is required";
    if (!d.currentPalikaName?.trim()) return "currentPalikaName is required";
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

      // relative endpoint (adjust if your backend URL differs)
      const url = "/api/forms/citizenship-remove-husband";
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
    <div className="citizenship-remove-husband-container">
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
              name="districtOffice"
              value={formData.districtOffice}
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
          <strong>
            विषय: <u>पूर्व पतिको नामथर हटाई हालको पतिको नाम थर वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u>
          </strong>
        </div>

        <p className="certificate-body">
          प्रस्तुत विषयमा मेरो मिति
          <input
            type="text"
            name="preMarriageDate"
            value={formData.preMarriageDate}
            onChange={handleChange}
            required
          />
          मा
          <input
            type="text"
            name="preMarriageDistrict"
            placeholder="जिल्ला"
            value={formData.preMarriageDistrict}
            onChange={handleChange}
            required
          />
          जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा मेरो श्रीमानसँग
          <select name="relationshipStatus" value={formData.relationshipStatus} onChange={handleChange}>
            <option>सम्बन्धविच्छेद</option>
            <option>अन्य</option>
          </select>
          भई
          <input
            type="text"
            name="certificateInfo"
            placeholder="सम्बन्धविच्छेद दर्ताको प्रमाणपत्र"
            value={formData.certificateInfo}
            onChange={handleChange}
            required
            className="long-input"
          />
          दर्ताको प्रमाणपत्र समेत प्राप्त गरिसकेको र हाल
          <input
            type="text"
            name="currentHusbandName"
            placeholder="हालको पतिको नाम"
            value={formData.currentHusbandName}
            onChange={handleChange}
            required
          />
          <input type="text" name="currentDistrict" value={formData.currentDistrict} onChange={handleChange} required />
          जिल्ला
          <select name="currentPalikaType" value={formData.currentPalikaType} onChange={handleChange}>
            <option>गा.पा.</option>
            <option>न.पा.</option>
          </select>
          <input
            type="text"
            name="currentPalikaName"
            placeholder="पालिकाको नाम"
            value={formData.currentPalikaName}
            onChange={handleChange}
            required
          />
          बस्ने
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

export default CitizenshipwithoutHusbandSurname;
