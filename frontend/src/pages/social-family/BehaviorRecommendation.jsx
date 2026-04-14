// src/components/BehaviorRecommendation.jsx
import React, { useState } from "react";
import "./BehaviorRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "behavior-recommendation";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite; if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const BehaviorRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/behavior-recommendation", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState); // reset form on success
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/behavior-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ print first
        setForm(initialState); // ✅ reset AFTER print
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="behavior-recommendation-form">
      <div className="behavior-recommendation-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          चालचलन सिफारिस ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; चालचलन सिफारिस
          </span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* --- Meta Data (Date/Ref) --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :
              <input
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <span className="bold-text">२०८२-०८-०६</span>
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:<span className="underline-text">सिफारिस सम्बन्धमा ।</span>
          </p>
        </div>

        {/* --- Salutation --- */}
        <div className="salutation-section">
          <p className="bold-text">जो जस संग सम्बन्ध छ ।</p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ
            <input
              name="municipality"
              type="text"
              className="inline-box-input medium-box"
              defaultValue="नागार्जुन नगरपालिका"
            />
            वडा नं. <span className="bg-gray-text">१</span> बस्ने
            <input
              name="applicant_relation_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को
            <select name="applicant_relation_type" className="inline-select">
              <option value="नाति">नाति</option>
              <option value="नातिनी">नातिनी</option>
              <option value="बुहारी">बुहारी</option>
            </select>
            <input
              name="relative_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को
            <select name="relative_gender" className="inline-select">
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input
              name="relative_of"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> ले यस कार्यालयमा दिएको निवेदन उपर
            सर्जमिन मुचुल्का तयार गरी बुझ्दा हाल सम्म निजको चालचलन राम्रो रहेको
            पाइएको हुँदा सोही अनुसारको ब्यहोरा निजको फोटो टाँस गरी प्रमाणित
            गरिन्छ ।
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              required
            />
            <select name="signatory_designation" className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </form>
  );
};

export default BehaviorRecommendation;
