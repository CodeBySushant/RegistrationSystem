import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./NewBeneficiaryAccount.css";
import { useAuth } from "../../context/AuthContext";

import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// 6
const initialState = {
  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // Addressee
  addressee_office: "",
  addressee_address: "",
  addressee_ward: "",
  dispatch_no: "",

  // Body fields
  old_ward: "",
  fiscal_year: "2082/83",
  allowance_type: "",
  citizenship_no: "",
  beneficiary_name: "",

  // Signature
  signer_name: "",
  signer_designation: "",
};

const NewBeneficiaryAccount = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/new-beneficiary-account", form);
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
    await handleSubmit({ preventDefault: () => {} });
    setTimeout(() => window.print(), 500);
  };
  return (
    <div className="new-beneficiary-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कार्य योजना पूरा भयो सिफारिस ।
        <span className="top-right-bread">
          आर्थिक &gt; नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा
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
              name="dispatch_no"
              type="text"
              className="dotted-input small-input"
              value={form.dispatch_no}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
          <p style={{ textAlign: "right" }}>ने.सं : .........</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा ।
          </span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_office"
            type="text"
            className="line-input medium-input"
            value={form.addressee_office}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addressee-row">
          <input
            name="addressee_address"
            type="text"
            className="line-input medium-input"
            value={form.addressee_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addressee-row">
          <span>नागार्जुन</span>
          <input
            name="addressee_ward"
            type="text"
            className="line-input medium-input"
            value={form.addressee_ward}
            onChange={handleChange}
          />
          <span>काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body (Matches Image 9 specifically) --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस{" "}
          <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
          वडा नं{" "}
          <span className="bold-text underline-text">
            {MUNICIPALITY.wardNumber}
          </span>
          (साविक{" "}
          <input
            name="old_ward"
            type="text"
            className="dotted-input medium-input"
            value={form.old_ward}
            onChange={handleChange}
            required
          />{" "}
          ) बाट आ.व.
          <select
            name="fiscal_year"
            className="inline-select"
            value={form.fiscal_year}
            onChange={handleChange}
          >
            <option value="2082/83">2082/83</option>
            <option value="2083/84">2083/84</option>
          </select>
          को{" "}
          <input
            name="allowance_type"
            type="text"
            className="dotted-input medium-input"
            value={form.allowance_type}
            onChange={handleChange}
            required
          />{" "}
          बापतको सामाजिक सुरक्षा भत्ता पाउन योग्य लाभग्राही ना.प्र.नं.{" "}
          <input
            name="citizenship_no"
            type="text"
            className="dotted-input medium-input"
            value={form.citizenship_no}
            onChange={handleChange}
            required
          />{" "}
          जारी मिति <span className="bold-text">२०८२-०८-०६</span> भएको श्री{" "}
          <input
            name="beneficiary_name"
            type="text"
            className="dotted-input medium-input"
            value={form.beneficiary_name}
            onChange={handleChange}
            required
          />{" "}
          को सामाजिक सुरक्षा भत्ता प्रयोजनको लागि खाता खोलिदिन हुन अनुरोध छ ।
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

export default NewBeneficiaryAccount;
