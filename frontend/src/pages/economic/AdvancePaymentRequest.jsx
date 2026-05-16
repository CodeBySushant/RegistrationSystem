import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const styles = `
  /* --- Main Container --- */
  .advance-payment-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* --- Top Bar --- */
  .advance-payment-container .top-bar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }

  .advance-payment-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Header Section --- */
  .advance-payment-container .form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .advance-payment-container .header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
  }

  .advance-payment-container .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .advance-payment-container .municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .advance-payment-container .ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }

  .advance-payment-container .address-text,
  .advance-payment-container .province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* --- Meta Data --- */
  .advance-payment-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .advance-payment-container .meta-left p,
  .advance-payment-container .meta-right p {
    margin: 5px 0;
  }

  .advance-payment-container .bold-text { font-weight: bold; }

  .advance-payment-container .dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
  }

  .advance-payment-container .small-input { width: 120px; }

  /* --- Addressee Section --- */
  .advance-payment-container .addressee-section {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .advance-payment-container .addressee-row {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .advance-payment-container .line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
  }

  .advance-payment-container .medium-input { width: 200px; }

  /* --- Subject --- */
  .advance-payment-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .advance-payment-container .underline-text { text-decoration: underline; }

  /* --- Body Paragraph & Inputs --- */
  .advance-payment-container .form-body {
    font-size: 1.05rem;
    line-height: 2.4;
    text-align: justify;
  }

  .advance-payment-container .inline-box-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .small-box { width: 100px; }
  .advance-payment-container .medium-box { width: 160px; }
  .advance-payment-container .long-box { width: 250px; }

  /* --- Signature Section --- */
  .advance-payment-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .advance-payment-container .signature-block {
    width: 220px;
    text-align: center;
  }

  .advance-payment-container .signature-block .line-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
  }

  .advance-payment-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .advance-payment-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Applicant Details Box --- */
  .advance-payment-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .advance-payment-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .advance-payment-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .advance-payment-container .detail-group {
    display: flex;
    flex-direction: column;
  }

  .advance-payment-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .advance-payment-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .bg-gray { background-color: #eef2f5; }

  /* --- Footer --- */
  .advance-payment-container .form-footer {
    text-align: center;
    margin-top: 40px;
  }

  .advance-payment-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .advance-payment-container .save-print-btn:hover { background-color: #1a252f; }
  .advance-payment-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .advance-payment-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* Required star */
  .advance-payment-container .required {
    color: red;
    margin-left: 4px;
  }

  .advance-payment-container .inline-input-wrapper {
    position: relative;
    display: inline-block;
  }

  .advance-payment-container .input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .advance-payment-container .inline-input-wrapper input {
    padding-left: 18px;
  }

  /* full width helper */
  .advance-payment-container .full-width-input { width: 100%; }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .advance-payment-container {
      padding: 20px 16px;
    }

    .advance-payment-container .header-logo img {
      position: static;
      display: block;
      margin: 0 auto 10px;
    }

    .advance-payment-container .municipality-name { font-size: 1.5rem; }
    .advance-payment-container .ward-title { font-size: 1.6rem; }

    .advance-payment-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .advance-payment-container .inline-box-input,
    .advance-payment-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .advance-payment-container .small-box,
    .advance-payment-container .medium-box,
    .advance-payment-container .long-box {
      width: 100% !important;
    }

    .advance-payment-container .medium-input,
    .advance-payment-container .small-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .advance-payment-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .advance-payment-container .signature-section {
      justify-content: center;
    }

    .advance-payment-container .meta-data-row {
      flex-direction: column;
    }
  }

  /* ================= PRINT STYLES ================= */
  @media print {
    body * { visibility: hidden; }

    .advance-payment-container,
    .advance-payment-container * {
      visibility: visible;
    }

    .advance-payment-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }

    .advance-payment-container .form-footer { display: none; }
    .advance-payment-container .top-bar-title { display: none; }
  }
`;

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
  expense_type: "",
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
      const res = await axios.post("/api/forms/advance-payment-request", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/advance-payment-request", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
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

        {/* --- Meta Data --- */}
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
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </>
  );
};

export default AdvancePaymentRequest;