import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./ReqforHelpinHealth.css";
import { useAuth } from "../../context/AuthContext";

import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// 1
const initialState = {
  // Applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // Addressee
  addressee_name: "",
  addressee_address: "",

  // Form body fields
  title: "श्री",
  ward_old: "",
  ward_new: "",
  person_name: "",
  annual_income: "",
  disease: "",
  hospital: "",

  // Signature
  signer_name: "",
  signer_designation: "",
};

const ReqforHelpinHealth = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/health-aid", form);
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
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };
  return (
    <div className="health-aid-container">
      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
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
          विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_name"
            type="text"
            className="line-input large-input"
            value={form.addressee_name}
            onChange={handleChange}
          />
        </div>
        <div className="addressee-row">
          <input
            name="addressee_address"
            type="text"
            className="line-input full-width-input"
            value={form.addressee_address}
            onChange={handleChange}
          />
          <span>।</span>
        </div>

        <p className="body-paragraph">
          उपरोक्त विषयमा <span className="bold-text">{MUNICIPALITY.name}</span>
          वडा नं. १ (साविक{" "}
          <input
            name="ward_old"
            type="text"
            className="inline-box-input"
            value={form.ward_old}
            onChange={handleChange}
          />{" "}
          , वडा नं.{" "}
          <input
            name="ward_new"
            type="text"
            className="inline-box-input small-box"
            value={form.ward_new}
            onChange={handleChange}
          />{" "}
          ) बस्ने श्री
          <select
            name="title"
            className="inline-select"
            value={form.title}
            onChange={handleChange}
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input
            name="person_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.person_name}
            onChange={handleChange}
          />
          को वार्षिक आम्दानी रु.
          <input
            name="annual_income"
            type="text"
            className="inline-box-input medium-box"
            value={form.annual_income}
            onChange={handleChange}
          />
          । भन्दा कम भएको र निज
          <input
            name="disease"
            type="text"
            className="inline-box-input medium-box"
            value={form.disease}
            onChange={handleChange}
          />
          बाट पीडित भई
          <input
            name="hospital"
            type="text"
            className="inline-box-input medium-box"
            value={form.hospital}
            onChange={handleChange}
          />
          अस्पतालमा उपचार गराउँदै आइरहेको र हाल थप उपचारको लागि लाग्ने लागत
          जुटाउन मेरो आर्थिक अवस्था कमजोर भएको कारणले निःशुल्क उपचार गर्न
          सिफारिस पाऊँ, भनी निवेदन दिनु भएको हुँदा निज निवेदक विपन्न परिवार
          अन्तर्गत पर्ने भएकोले त्यहाँको नियमानुसार आर्थिक सहायता उपलब्ध गराई
          दिनुहुन सिफारिस गरिन्छ।
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

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>
              निवेदकको नाम<span className="required">*</span>
            </label>
            <input
              name="applicant_name"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_name}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको ठेगाना<span className="required">*</span>
            </label>
            <input
              name="applicant_address"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_address}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको नागरिकता नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_citizenship_no"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_citizenship_no}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको फोन नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_phone"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

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

export default ReqforHelpinHealth;
