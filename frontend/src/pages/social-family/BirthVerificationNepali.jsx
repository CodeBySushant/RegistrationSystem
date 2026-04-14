// src/components/BirthVerificationNepali.jsx
import React, { useState } from "react";
import "./BirthVerificationNepali.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "birth-verification-nepali";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const BirthVerificationNepali = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/birth-verification-nepali", form);
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
      const res = await axios.post("/api/forms/birth-verification-nepali", form);
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
    <form className="birth-verification-form" onSubmit={handleSubmit}>
      <div className="birth-verification-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          जन्म मिति प्रमाणित ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; जन्म मिति प्रमाणित
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

        {/* --- Salutation --- */}
        <div className="salutation-section">
          <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:
            <span className="underline-text bold-text">
              जन्म मिति प्रमाणित सम्बन्धमा।
            </span>
          </p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा{" "}
            <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं १
            बस्ने
            <input
              name="person_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> ले मेरो
            <select name="relation_parent" className="inline-select">
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <input
              name="child_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को जन्म साविक जिल्ला काठमाडौँ
            <input
              name="birth_district"
              type="text"
              className="inline-box-input medium-box"
            />
            <select name="birth_unit_type" className="inline-select">
              <option value="">--</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं{" "}
            <input
              name="birth_unit_ward"
              type="text"
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span> मा मिति
            <input
              name="birth_date"
              type="text"
              className="inline-box-input medium-box"
              defaultValue="२०८२-०८-०६"
            />{" "}
            मा भएको ले निजको जन्म प्रमाणित गरिपाउँ भनि{" "}
            <span className="bg-gray-text">नागार्जुन नगरपालिका</span>
            नं वडा कार्यालयमा मिति २०८२-०८-०६ मा दिनु भएको निवेदन बमोजिम श्री{" "}
            <input
              name="parent_title"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को
            <select name="relation_type" className="inline-select">
              <option value="नाति">नाति</option>
              <option value="नातिनी">नातिनी</option>
            </select>
            श्री{" "}
            <input
              name="parent_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> तथा श्रीमती{" "}
            <input
              name="spouse_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को
            <select name="child_type" className="inline-select">
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            श्री{" "}
            <input
              name="child_name_confirm"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को जन्म जिल्ला{" "}
            <span className="bold-text">काठमाडौँ</span> साविक
            <input
              name="birth_place_old_unit"
              type="text"
              className="inline-box-input medium-box"
            />{" "}
            वडा नं
            <input
              name="birth_place_old_ward"
              type="text"
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span> हाल{" "}
            <span className="bold-text">नागार्जुन नगरपालिका</span> वडा नं
            <input
              name="current_ward"
              type="text"
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span> मा मिति
            <input
              name="birth_date_confirm"
              type="text"
              className="inline-box-input medium-box"
              defaultValue="२०८२-०८-०६"
            />{" "}
            मा भएको हुँदा निजको फोटो प्रमाणित सहित जन्म प्रमाणित गरिएको व्यहोरा
            अनुरोध छ।
          </p>
        </div>

        {/* --- Photo Box --- */}
        <div className="photo-box-section">
          <div className="photo-box"></div>
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

export default BirthVerificationNepali;
