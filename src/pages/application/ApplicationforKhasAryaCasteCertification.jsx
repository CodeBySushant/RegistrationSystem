// src/pages/application/ApplicationforKhasAryaCasteCertification.jsx
import React, { useState } from "react";
import axios from "axios";
import "./ApplicationforKhasAryaCasteCertification.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: "काठमाडौँ",
  mainDistrict: "काठमाडौँ",
  // prefer MUNICIPALITY Nepali name / ward if available
  palikaName: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  casteName: "",
  applicantName: "",
  applicantAddress: "",
  applicantNagarikta: "",
  applicantPhone: "",
};

const ApplicationforKhasAryaCasteCertification = () => {
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
      "casteName",
      "applicantName",
      "applicantAddress",
      "applicantNagarikta",
      "applicantPhone",
    ];
    for (let f of required) {
      if (!data[f] || (typeof data[f] === "string" && data[f].trim() === "")) {
        return `${f} is required`;
      }
    }
    // phone basic check
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
      alert("कृपया सबै आवश्यक क्षेत्रहरू पुरा गर्नुहोस्। (" + err + ")");
      return;
    }

    setSubmitting(true);
    try {
      // prepare payload (convert empty strings to null if you prefer)
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      // use relative endpoint; change if your API path differs
      const url = "/api/forms/khas-arya-certification";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("फर्म सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        console.log("Saved:", res.data);
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
    <div className="khas-arya-cert-container">
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
          <strong>
            विषय: <u>खस आर्य जाति प्रमाणित गरि पाउँ ।</u>
          </strong>
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
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          >
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
          खस आर्य जाति अन्तर्गत
          <input
            type="text"
            name="casteName"
            placeholder="जातिको नाम"
            value={formData.casteName}
            onChange={handleChange}
            required
          />
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
          सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
          निवेदन पेश गरेको छु ।
        </p>

        {/* Applicants details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>
                निवेदकको नाम<span className="required">*</span>
              </label>
              <input
                name="applicantName"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                निवेदकको ठेगाना<span className="required">*</span>
              </label>
              <input
                name="applicantAddress"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                निवेदकको नागरिकता नं.<span className="required">*</span>
              </label>
              <input
                name="applicantNagarikta"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantNagarikta}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                निवेदकको फोन नं.<span className="required">*</span>
              </label>
              <input
                name="applicantPhone"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantPhone}
                onChange={handleChange}
                required
              />
            </div>
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

export default ApplicationforKhasAryaCasteCertification;
