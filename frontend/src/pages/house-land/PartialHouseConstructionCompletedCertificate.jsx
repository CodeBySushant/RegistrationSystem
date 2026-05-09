// PartialHouseConstructionCompletedCertificate.jsx
import React, { useState } from "react";
import "./PartialHouseConstructionCompletedCertificate.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),

  municipality_text: "नागार्जुन नगरपालिका",
  ward_no: "1",

  resident_name: "",
  previous_place_text: "",
  previous_place_type: "",
  previous_ward_no: "",
  plot_number: "",
  area: "",
  floors_approved: "",
  completion_date: "२०८२-०८-०६",
  completion_type: "आंशिक", // or "पूर्ण"

  signer_name: "",
  signer_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: "",
};

export default function PartialHouseConstructionCompletedCertificate() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/partial-house-construction-completed-certificate", form);
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
      const res = await axios.post("/api/forms/partial-house-construction-completed-certificate", form);
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
    <div className="partial-construction-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          आंशिक / पूर्ण घर निर्माण सम्पन्न प्रमाणपत्र ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; आंशिक / पूर्ण घर निर्माण सम्पन्न प्रमाणपत्र
          </span>
        </div>

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

        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">{form.letter_no}</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="dotted-input small-input"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <span className="bold-text">{form.date_nep}</span>
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा{" "}
            <span className="bg-gray-text">{form.municipality_text}</span> वडा
            नं {form.ward_no} निवासी{" "}
            <input
              name="resident_name"
              value={form.resident_name}
              onChange={handleChange}
              className="inline-box-input long-box"
              required
            />{" "}
            ले यस कार्यालयमा दिनुभएको निवेदन अनुसार निजको नाममा रहेको साविक{" "}
            <input
              name="previous_place_text"
              value={form.previous_place_text}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />{" "}
            <select
              name="previous_place_type"
              value={form.previous_place_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>{" "}
            वडा नं{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            कि.नं.{" "}
            <input
              name="plot_number"
              value={form.plot_number}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            क्षे.फ.{" "}
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            जग्गामा घर निर्माणका लागि तहाँ कार्यालयबाट नक्शा स्वीकृत गराई{" "}
            <input
              name="floors_approved"
              value={form.floors_approved}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            तला घर मिति{" "}
            <input
              name="completion_date"
              value={form.completion_date}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            मा निर्माण कार्य सम्पन्न भएकोले{" "}
            <select
              name="completion_type"
              value={form.completion_type}
              onChange={handleChange}
              className="inline-select bold-text"
            >
              <option>आंशिक</option>
              <option>पूर्ण</option>
            </select>{" "}
            घर निर्माण सम्पन्न प्रमाणपत्र उपलब्ध गराई दिनु हुन सिफारिस साथ
            अनुरोध छ।
          </p>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="line-input full-width-input"
              required
            />
            <select
              name="signer_designation"
              value={form.signer_designation}
              onChange={handleChange}
              className="designation-select"
            >
              <option>पद छनौट गर्नुहोस्</option>
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
      </form>
    </div>
  );
}
