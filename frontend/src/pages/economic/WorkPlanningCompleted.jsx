import React, { useState } from "react";
import "./WorkPlanningCompleted.css";

import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
// 3
const initialState = {
  // Applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // Addressee
  addressee_office: "",
  addressee_ward: "",

  // Work details
  plan_name: "",
  applicant_person_name: "",
  inspection_result: "",

  // Signature
  signer_name: "",
  signer_designation: "",
};

const WorkPlanningCompleted = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/work-planning-completed", form);
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
      const res = await axios.post("/api/forms/work-planning-completed", form);
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
    <div className="planning-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कार्य योजना पूरा भयो सिफारिस ।
        <span className="top-right-bread">
          आर्थिक &gt; कार्य योजना पूरा भयो सिफारिस
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
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
            <input type="text" className="dotted-input small-input" />
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
          विषय: <span className="underline-text">सिफारिस गरिएको वारे ।</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री {MUNICIPALITY.name}</span>
        </div>

        <div className="addressee-row">
          <input
            name="addressee_office"
            type="text"
            className="line-input large-input"
            value={form.addressee_office}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addressee-row">
          <span>{MUNICIPALITY.name}</span>
          <input
            name="addressee_ward"
            type="text"
            className="line-input medium-input"
            value={form.addressee_ward}
            onChange={handleChange}
          />
          <span>{MUNICIPALITY.city}</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा{" "}
          <span className="bg-highlight">{MUNICIPALITY.name}</span>{" "}
          <span className="bg-highlight">वडा नं {MUNICIPALITY.wardNumber}</span>
          मा आ.व. <span className="bg-highlight">२०८२/८३</span> मा संचालित
          <input
            name="plan_name"
            type="text"
            className="inline-box-input long-box"
            value={form.plan_name}
            onChange={handleChange}
            required
          />
          योजना कार्य सम्पन्न भएको भनि श्री
          <input
            name="applicant_person_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.applicant_person_name}
            onChange={handleChange}
            required
          />
          ले मिति <span className="bg-highlight">२०८२-०८-०६</span> गतेमा दिनु
          भएको निवेदन अनुसार स्थलगत निरिक्षण गर्दा
          <input
            name="inspection_result"
            type="text"
            className="inline-box-input long-box"
            value={form.inspection_result}
            onChange={handleChange}
            required
          />
          योजना कार्य सम्पन्न देखिएकोले प्राविधिक वाट कार्य सम्पन्न मुल्यांकन
          गराई तहा कार्यालय नियमानुसार आवश्यक भुक्तानीका लागि सिफारिस साथ सादर
          अनुरोध छ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="signer_name"
              type="text"
              className="line-input full-width-input"
              required
              value={form.signer_name}
              onChange={handleChange}
            />
          </div>
          <select
            name="signer_designation"
            className="designation-select"
            value={form.signer_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default WorkPlanningCompleted;
