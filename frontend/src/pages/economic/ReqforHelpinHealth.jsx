import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const styles = `
  /* --- Main Container --- */
  .health-aid-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* --- Top Bar --- */
  .health-aid-container .top-bar-title {
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

  .health-aid-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Header Section --- */
  .health-aid-container .form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .health-aid-container .header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: auto;
  }

  .health-aid-container .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .health-aid-container .municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .health-aid-container .ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }

  .health-aid-container .address-text,
  .health-aid-container .province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* --- Meta Data --- */
  .health-aid-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
    font-size: 1.1rem;
  }

  .health-aid-container .meta-left p,
  .health-aid-container .meta-right p { margin: 5px 0; }

  .health-aid-container .bold-text { font-weight: bold; }

  .health-aid-container .dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .health-aid-container .small-input { width: 120px; }

  /* --- Subject --- */
  .health-aid-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .health-aid-container .underline-text { text-decoration: underline; }

  /* --- Form Body --- */
  .health-aid-container .form-body {
    font-size: 1.05rem;
    line-height: 2.2;
    text-align: justify;
  }

  .health-aid-container .addressee-row {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .health-aid-container .line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin-left: 10px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .large-input     { width: 300px; }
  .health-aid-container .full-width-input { width: 100%; }

  /* Inline inputs inside paragraph */
  .health-aid-container .inline-box-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .small-box  { width: 50px; }
  .health-aid-container .medium-box { width: 150px; }

  /* --- Signature Section --- */
  .health-aid-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .health-aid-container .signature-block {
    text-align: center;
    width: 250px;
  }

  .health-aid-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .health-aid-container .signature-block .line-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
  }

  .health-aid-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Inline input wrapper (required star) --- */
  .health-aid-container .inline-input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .health-aid-container .input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .health-aid-container .inline-input-wrapper input {
    padding-left: 18px;
  }

  /* --- Applicant Details Box --- */
  .health-aid-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .health-aid-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .health-aid-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .health-aid-container .detail-group { display: flex; flex-direction: column; }

  .health-aid-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .health-aid-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .bg-gray { background-color: #eef2f5; }

  /* --- Footer --- */
  .health-aid-container .form-footer { text-align: center; margin-top: 40px; }

  .health-aid-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .health-aid-container .save-print-btn:hover { background-color: #1a252f; }
  .health-aid-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .health-aid-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .health-aid-container {
      padding: 20px 16px;
    }

    .health-aid-container .header-logo img {
      position: static;
      display: block;
      margin: 0 auto 10px;
    }

    .health-aid-container .municipality-name { font-size: 1.5rem; }
    .health-aid-container .ward-title { font-size: 1.6rem; }

    .health-aid-container .form-body {
      font-size: 0.95rem;
      line-height: 2.0;
    }

    .health-aid-container .inline-box-input,
    .health-aid-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .health-aid-container .small-box,
    .health-aid-container .medium-box,
    .health-aid-container .large-input,
    .health-aid-container .small-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .health-aid-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .health-aid-container .signature-section {
      justify-content: center;
    }

    .health-aid-container .meta-data-row {
      flex-direction: column;
    }
  }

  /* ================= PRINT STYLES ================= */
  @media print {
    body * { visibility: hidden; }

    .health-aid-container,
    .health-aid-container * { visibility: visible; }

    .health-aid-container {
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

    .health-aid-container .form-footer { display: none; }
    .health-aid-container .top-bar-title { display: none; }
  }
`;

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
  chalani_no: "",
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
      const res = await axios.post("/api/forms/health-aid", form);
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
      const res = await axios.post("/api/forms/health-aid", form);
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
      <div className="health-aid-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          स्वास्थ्य उपचारमा सहयोगको लागि सिफारिस
          <span className="top-right-bread">
            आर्थिक &gt; स्वास्थ्य उपचारमा सहयोगको लागि सिफारिस
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

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">सिफारिस सम्बन्धमा।</span>
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
              className="line-input large-input"
              value={form.addressee_address}
              onChange={handleChange}
            />
            <span>।</span>
          </div>

          <p className="body-paragraph">
            उपरोक्त विषयमा{" "}
            <span className="bold-text">{MUNICIPALITY.name}</span>
            {" "}वडा नं. {MUNICIPALITY.wardNumber} (साविक{" "}
            <input
              name="ward_old"
              type="text"
              className="inline-box-input medium-box"
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
            ) बस्ने{" "}
            <select
              name="title"
              className="inline-select"
              value={form.title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input
              name="person_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.person_name}
              onChange={handleChange}
            />
            {" "}को वार्षिक आम्दानी रु.
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
            {" "}बाट पीडित भई
            <input
              name="hospital"
              type="text"
              className="inline-box-input medium-box"
              value={form.hospital}
              onChange={handleChange}
            />
            {" "}अस्पतालमा उपचार गराउँदै आइरहेको र हाल थप उपचारको लागि लाग्ने
            लागत जुटाउन मेरो आर्थिक अवस्था कमजोर भएको कारणले निःशुल्क उपचार
            गर्न सिफारिस पाऊँ, भनी निवेदन दिनु भएको हुँदा निज निवेदक विपन्न
            परिवार अन्तर्गत पर्ने भएकोले त्यहाँको नियमानुसार आर्थिक सहायता
            उपलब्ध गराई दिनुहुन सिफारिस गरिन्छ।
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

export default ReqforHelpinHealth;