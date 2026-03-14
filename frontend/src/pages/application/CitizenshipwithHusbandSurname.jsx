// src/pages/application/CitizenshipwithHusbandSurname.jsx
import React, { useState } from "react";
import axios from "axios";
import "./CitizenshipwithHusbandSurname.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  districtOffice: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  preMarriageDate: "२०८२.०७.१५",
  preMarriageDistrict: "",
  currentMunicipality: MUNICIPALITY?.name || "",
  currentWard: MUNICIPALITY?.wardNumber || "",
  husbandName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const CitizenshipwithHusbandSurname = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (data) => {
    if (!data.preMarriageDistrict?.trim())
      return "preMarriageDistrict is required";
    if (!data.currentMunicipality?.trim())
      return "currentMunicipality is required";
    if (!data.currentWard?.trim()) return "currentWard is required";
    if (!data.husbandName?.trim()) return "husbandName is required";
    if (!data.sigName?.trim()) return "sigName is required";
    if (!data.sigMobile || !/^[0-9+\-\s]{6,20}$/.test(String(data.sigMobile))) {
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

      const url = "/api/forms/citizenship-husband-surname";
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
    <div className="citizenship-husband-container">
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
            विषय: <u>पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u>
          </strong>
        </div>

        <p className="certificate-body">
          प्रस्तुत विषयमा मेरो विवाह नहुँदै मिति
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
          जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा हाल यस जिल्लाको
          <input
            type="text"
            name="currentMunicipality"
            placeholder="गा.पा. / न.पा."
            value={formData.currentMunicipality}
            onChange={handleChange}
            required
          />
          गा.पा. / न.पा. वडा नं
          <input
            type="text"
            name="currentWard"
            placeholder="वडा"
            value={formData.currentWard}
            onChange={handleChange}
            required
            className="short-input"
          />
          बस्ने
          <input
            type="text"
            name="husbandName"
            placeholder="पतिको नाम"
            value={formData.husbandName}
            onChange={handleChange}
            required
          />
          सँग वैवाहिक सम्बन्ध कायम भएकोले पतिको नाम, थर र वतन कायम गरी
          नागरिकताको प्रतिलिपि पाउँ भनी आवश्यक कागजातहरु संलग्न राखी यो निवेदन
          पेश गर्दछु ।
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

export default CitizenshipwithHusbandSurname;
