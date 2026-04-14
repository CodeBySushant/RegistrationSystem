import React, { useState } from "react";
import "./AdvancePaymentRequest.css";
import { useWardForm } from "../../hooks/useWardForm";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// 4
const initialState = {
  // Meta
  chalani_no: "",

  // Addressee
  addressee_name: "",
  addressee_office: "",

  // Body
  office_name: MUNICIPALITY.name,
  fiscal_year: "२०८२/८३",
  program_name: "",
  budget_code: "",
  expense_title: "",
  expense_type: "", // संचालन / पूँजीगत
  total_amount: "",
  requested_amount: "",
  amount_in_words: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const AdvancePaymentRequest = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/advance-payment-request", form);
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
      const res = await axios.post("/api/forms/advance-payment-request", form);

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
    <div className="advance-payment-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        पेश्की अनुरोध सिफारिस ।
        <span className="top-right-bread">
          आर्थिक &gt; पेश्की अनुरोध सिफारिस
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
            <input
              name="chalani_no"
              type="text"
              className="dotted-input small-input"
              value={form.chalani_no}
              onChange={handleChange}
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

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_name"
            type="text"
            className="line-input medium-input"
            value={form.addressee_name}
            onChange={handleChange}
            required
          />
          <span>ज्यु,</span>
        </div>
        <div className="addressee-row">
          <span>{MUNICIPALITY.name}</span>
          <input
            name="addressee_office"
            type="text"
            className="line-input medium-input"
            value={form.addressee_office}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            पेश्की उपलब्ध गराईदिने सम्बन्धमा।
          </span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस{" "}
          <input
            name="office_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.office_name}
            onChange={handleChange}
          />{" "}
          चालु आ.व.{" "}
          <input
            name="fiscal_year"
            type="text"
            className="inline-box-input small-box"
            value={form.fiscal_year}
            onChange={handleChange}
          />{" "}
          को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत
          <input
            name="program_name"
            type="text"
            className="inline-box-input long-box"
            value={form.program_name}
            onChange={handleChange}
            required
          />
          को बजेट शिर्षक नम्बर{" "}
          <input
            name="budget_code"
            type="text"
            className="inline-box-input small-box"
            value={form.budget_code}
            onChange={handleChange}
            required
          />
          मा रहेको{" "}
          <input
            name="expense_title"
            type="text"
            className="inline-box-input medium-box"
            value={form.expense_title}
            onChange={handleChange}
            required
          />
          <select
            name="expense_type"
            className="inline-select"
            value={form.expense_type}
            onChange={handleChange}
          >
            <option value="">छान्नुहोस्</option>
            <option value="संचालन">संचालन</option>
            <option value="पूँजीगत">पूँजीगत</option>
          </select>
          अन्तर्गत जम्मा रकम रु.{" "}
          <input
            name="total_amount"
            type="text"
            className="inline-box-input medium-box"
            value={form.total_amount}
            onChange={handleChange}
            required
          />
          मध्ये बाट रु.{" "}
          <input
            name="requested_amount"
            type="text"
            className="inline-box-input medium-box"
            value={form.requested_amount}
            onChange={handleChange}
            required
          />
          ( अक्षरेरुपी{" "}
          <input
            name="amount_in_words"
            type="text"
            className="inline-box-input long-box"
            value={form.amount_in_words}
            onChange={handleChange}
            required
          />{" "}
          रुपैया मात्र ) पेश्की भुक्तानी दिनु हुन अनुरोध गर्दछु।
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

export default AdvancePaymentRequest;
