// src/pages/application/ApplicationforKhasAryaCasteCertification.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./ApplicationforKhasAryaCasteCertification.css";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: "",
  mainDistrict: "",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  casteName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const ApplicationforKhasAryaCasteCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.headerDistrict?.trim()) return "हेडर जिल्ला आवश्यक छ";
    if (!formData.mainDistrict?.trim()) return "मुख्य जिल्ला आवश्यक छ";
    if (!formData.residentName?.trim()) return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName?.trim()) return "अभिभावकको नाम आवश्यक छ";
    if (!formData.casteName?.trim()) return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + error);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));

      const res = await axios.post("/api/forms/khas-arya-certification", payload);

      if (res.status === 200 || res.status === 201) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        // FIX: use simple window.print() — preserves all CSS/styling like the reference
        window.print();
        setTimeout(() => setFormData(initialState), 500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="khas-arya-cert-container">
      <form onSubmit={handleSubmit}>

        {/* Municipality Header */}
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
              placeholder="जिल्ला"
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
          <strong>विषय: <u>खस आर्य जाति प्रमाणित गरि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          <input
            type="text"
            name="mainDistrict"
            value={formData.mainDistrict}
            onChange={handleChange}
            placeholder="जिल्ला"
          />
          जिल्ला
          <input
            type="text"
            name="palikaName"
            value={formData.palikaName}
            onChange={handleChange}
          />
          वडा नं.
          <input
            type="text"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            className="short-input"
          />
          निवासी
          <input
            type="text"
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            placeholder="निवासीको नाम"
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
            value={formData.guardianName}
            onChange={handleChange}
            placeholder="अभिभावकको नाम"
          />
          खस आर्य जाति अन्तर्गत
          <input
            type="text"
            name="casteName"
            value={formData.casteName}
            onChange={handleChange}
            placeholder="जातिको नाम"
          />
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
          सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
          निवेदन पेश गरेको छु ।
        </p>

        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationforKhasAryaCasteCertification;