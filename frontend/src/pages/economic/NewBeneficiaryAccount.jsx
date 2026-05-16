import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const styles = `
  /* --- Main Container --- */
  .new-beneficiary-container {
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
  .new-beneficiary-container .top-bar-title {
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

  .new-beneficiary-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Header Section --- */
  .new-beneficiary-container .form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .new-beneficiary-container .header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
  }

  .new-beneficiary-container .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .new-beneficiary-container .municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .new-beneficiary-container .ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }

  .new-beneficiary-container .address-text,
  .new-beneficiary-container .province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* --- Meta Data --- */
  .new-beneficiary-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .new-beneficiary-container .meta-left p,
  .new-beneficiary-container .meta-right p { margin: 5px 0; }

  .new-beneficiary-container .bold-text { font-weight: bold; }

  .new-beneficiary-container .dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 0 5px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .new-beneficiary-container .small-input  { width: 120px; }
  .new-beneficiary-container .medium-input { width: 200px; }

  /* --- Subject --- */
  .new-beneficiary-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .new-beneficiary-container .underline-text { text-decoration: underline; }

  /* --- Addressee Section --- */
  .new-beneficiary-container .addressee-section {
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .new-beneficiary-container .addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .new-beneficiary-container .line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .new-beneficiary-container .full-width-input { width: 100%; }

  /* --- Body Paragraph & Inputs --- */
  .new-beneficiary-container .form-body {
    font-size: 1.05rem;
    line-height: 2.4;
    text-align: justify;
    margin-bottom: 40px;
  }

  .new-beneficiary-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Signature Section --- */
  .new-beneficiary-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .new-beneficiary-container .signature-block {
    width: 220px;
    text-align: center;
  }

  .new-beneficiary-container .signature-block .line-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
  }

  .new-beneficiary-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .new-beneficiary-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Inline input wrapper (required star) --- */
  .new-beneficiary-container .inline-input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .new-beneficiary-container .input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .new-beneficiary-container .inline-input-wrapper input {
    padding-left: 18px;
  }

  /* --- Applicant Details Box --- */
  .new-beneficiary-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .new-beneficiary-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .new-beneficiary-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .new-beneficiary-container .detail-group { display: flex; flex-direction: column; }

  .new-beneficiary-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .new-beneficiary-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .new-beneficiary-container .bg-gray { background-color: #eef2f5; }

  /* --- Footer --- */
  .new-beneficiary-container .form-footer { text-align: center; margin-top: 40px; }

  .new-beneficiary-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .new-beneficiary-container .save-print-btn:hover { background-color: #1a252f; }
  .new-beneficiary-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .new-beneficiary-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .new-beneficiary-container {
      padding: 20px 16px;
    }

    .new-beneficiary-container .header-logo img {
      position: static;
      display: block;
      margin: 0 auto 10px;
    }

    .new-beneficiary-container .municipality-name { font-size: 1.5rem; }
    .new-beneficiary-container .ward-title { font-size: 1.6rem; }

    .new-beneficiary-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .new-beneficiary-container .dotted-input,
    .new-beneficiary-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .new-beneficiary-container .small-input,
    .new-beneficiary-container .medium-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .new-beneficiary-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .new-beneficiary-container .signature-section {
      justify-content: center;
    }

    .new-beneficiary-container .meta-data-row {
      flex-direction: column;
    }
  }

  /* ================= PRINT STYLES ================= */
  @media print {
    body * { visibility: hidden; }

    .new-beneficiary-container,
    .new-beneficiary-container * { visibility: visible; }

    .new-beneficiary-container {
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

    .new-beneficiary-container .form-footer { display: none; }
    .new-beneficiary-container .top-bar-title { display: none; }
  }
`;

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
      const res = await axios.post("/api/forms/new-beneficiary-account", form);
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
      const res = await axios.post("/api/forms/new-beneficiary-account", form);
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
      <div className="new-beneficiary-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा
          <span className="top-right-bread">
            आर्थिक &gt; नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा
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

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा यस{" "}
            <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
            {" "}वडा नं{" "}
            <span className="bold-text underline-text">
              {MUNICIPALITY.wardNumber}
            </span>
            {" "}(साविक{" "}
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

export default NewBeneficiaryAccount;