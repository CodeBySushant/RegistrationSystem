// src/components/DestituteRecommendation.jsx
import React, { useState } from "react";
import "./DestituteRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "destitute-recommendation";
// safe env detection: prefer import.meta.env (Vite), otherwise use process.env only if available (CRA / others)
const API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE) ||
  "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DestituteRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/destitute-recommendation", form);
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
      const res = await axios.post("/api/forms/destitute-recommendation", form);
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
    <form className="destitute-form" onSubmit={handleSubmit}>
      <div className="destitute-rec-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          विपन्न सिफारिस ।
          <span className="top-right-bread">आर्थिक &gt; विपन्न सिफारिस</span>
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
              चलानी नं. :{" "}
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
            विषय:{" "}
            <span className="underline-text">विपन्न सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Salutation --- */}
        <div className="salutation-section">
          <p>श्री जो जस सँग सम्बन्ध राख्दछ।</p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <span className="underline-text">काठमाडौँ</span> ,{" "}
            <span className="underline-text">नागार्जुन</span> वडा नं
            <input
              name="ward_no"
              type="text"
              className="inline-box-input tiny-box"
              defaultValue="1"
              required
            />{" "}
            <span className="red">*</span> (साविक जिल्ला
            <input
              name="district"
              type="text"
              className="inline-box-input medium-box"
              defaultValue="काठमाडौँ"
            />{" "}
            ,
            <select name="old_unit_type" className="inline-select">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं{" "}
            <input
              name="old_unit_ward"
              type="text"
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span> ) मा बस्ने
            <input
              name="relation_title"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को नाति
            <select
              name="relation_name_select"
              className="inline-select"
              defaultValue=""
            >
              <option value="">--</option>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input
              name="relation_child_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को
            <select name="relation_child_type" className="inline-select">
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <select name="relation_child_title" className="inline-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input
              name="relation_child_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को पारिवारी आर्थिक अवस्थाको बारेमा
            बुझ्दा निजको परिवार विपन्न वर्गमा पर्ने व्यहोरा सिफारिस साथ अनुरोध
            गरिन्छ।
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
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
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

export default DestituteRecommendation;
