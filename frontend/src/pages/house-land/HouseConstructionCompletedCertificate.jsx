// HouseConstructionCompletedCertificate.jsx
import React, { useState } from "react";
import "./HouseConstructionCompletedCertificate.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  municipality: "नागार्जुन",
  ward_no: "1",
  applicant_name: "",
  previous_district: "",
  previous_type: "", // ga.vis / municipality
  previous_ward_no: "",
  plot_number: "",
  plot_area: "",
  house_type: "", // e.g., 'ढलान', 'ढलान+छत' etc.
  house_storeys: "", // number of rooms/storeys
  map_approval_date: "२०८२-०८-०६",
  map_approval_type: "", // text field corresponding to map/naksha info
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: "",
};

export default function HouseConstructionCompletedCertificate() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/house-construction-completed-certificate", form);
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
      const res = await axios.post("/api/forms/house-construction-completed-certificate", form);
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
    <div className="construction-completed-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          भूकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; भूकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र
          </span>
        </div>

        {/* Header */}
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

        {/* Meta */}
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
                type="text"
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

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा{" "}
            <span className="bg-gray-text">{form.municipality}</span> वडा नं{" "}
            <input
              name="ward_no"
              value={form.ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
            />{" "}
            निवासी{" "}
            <input
              name="applicant_name"
              value={form.applicant_name}
              onChange={handleChange}
              className="inline-box-input long-box"
              required
            />{" "}
            ले यस कार्यालयमा दिनुभएको निवेदन अनुसार निजको नाममा रहेको साविक{" "}
            <input
              name="previous_district"
              value={form.previous_district}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />{" "}
            <select
              name="previous_type"
              value={form.previous_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option value="">-- छान्नुहोस् --</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>{" "}
            वडा नं{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
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
              name="plot_area"
              value={form.plot_area}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            जग्गामा भूकम्प प्रतिरोधि{" "}
            <input
              name="house_type"
              value={form.house_type}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            <input
              name="house_storeys"
              value={form.house_storeys}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            कोठे घर निर्माणका लागि यस वडा कार्यालयबाट {form.map_approval_date}{" "}
            मा नक्शा स्वीकृत लिइएको र हाल उक्त घर निर्माण कार्य सम्पन्न भएकोले
            घर निर्माण सम्पन्न प्रमाणपत्र उपलब्ध गराईदिन सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* Signature */}
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
      </form>
    </div>
  );
}
