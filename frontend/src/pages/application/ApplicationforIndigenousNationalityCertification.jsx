// src/pages/application/ApplicationforIndigenousNationalityCertification.jsx
import React, { useState } from "react";
import "./ApplicationforIndigenousNationalityCertification.css";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDesignation: "",
  headerOffice: "",
  headerDistrict: "",
  bodyDistrict: "",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  tribeName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const ApplicationforIndigenousNationalityCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.residentName.trim()) return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName.trim()) return "अभिभावकको नाम आवश्यक छ";
    if (!formData.tribeName.trim()) return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach(
        (k) => payload[k] === "" && (payload[k] = null),
      );

      const res = await axios.post(
        "/api/forms/indigenous-certification",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        // FIX: use simple window.print() like the reference — preserves all CSS and styling
        window.print();
        setTimeout(() => setFormData(initialState), 500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="indigenous-container">
      <form onSubmit={handleSubmit}>

        {/* Municipality Header — matches reference pattern */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* Title bar */}
        <div className="top-bar-title">
          जनजाति प्रमाणपत्र जारी गर्ने दरखास्त
          <span className="top-right-bread">
            प्रमाणपत्र &gt; जनजाति प्रमाणपत्र
          </span>
        </div>

        {/* Addressee block */}
        <div className="shree-block">
          <div className="shree-row">
            <span>श्रीमान्</span>
            <input
              name="headerDesignation"
              value={formData.headerDesignation}
              onChange={handleChange}
              className="inline-input name-input"
              placeholder="पद"
            />
            <input
              name="headerOffice"
              value={formData.headerOffice}
              onChange={handleChange}
              className="inline-input name-input"
              placeholder="कार्यालय"
            />
            <span>ज्यू,</span>
          </div>

          <div className="stack-row">
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              className="stack-input"
              placeholder="जिल्ला"
            />
          </div>
        </div>

        {/* Date — right-aligned */}
        <div className="form-group-inline">
          <label>मिति:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Subject */}
        <div className="subject-line">
          विषय: <u>जनजाति प्रमाणित गरि पाउँ।</u>
        </div>

        {/* Body paragraph */}
        <p className="certificate-body">
          <input
            name="bodyDistrict"
            value={formData.bodyDistrict}
            onChange={handleChange}
            className="inline-input medium"
            placeholder="जिल्ला"
          />
          जिल्ला
          <input
            name="palikaName"
            value={formData.palikaName}
            onChange={handleChange}
            className="inline-input medium"
          />
          वडा नं.
          <input
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            className="inline-input small"
          />
          निवासी
          <input
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            className="inline-input long"
            placeholder="निवासीको नाम"
          />
          को
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className="inline-select"
          >
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
            <option value="पति">पति</option>
            <option value="पत्नी">पत्नी</option>
          </select>
          म
          <input
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="inline-input long"
            placeholder="अभिभावकको नाम"
          />
          जनजाति अन्तर्गत
          <input
            name="tribeName"
            value={formData.tribeName}
            onChange={handleChange}
            className="inline-input long"
            placeholder="जातिको नाम"
          />
          जातिमा पर्ने भएकोले प्रमाणित गरि पाउन निवेदन पेश गरेको छु।
        </p>

        {/* Applicant Details Box */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Submit */}
        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationforIndigenousNationalityCertification;