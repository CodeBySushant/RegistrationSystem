import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const styles = `
  /* --- Main Container --- */
  .social-security-container {
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
  .social-security-container .top-bar-title {
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

  .social-security-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Header Section --- */
  .social-security-container .form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .social-security-container .header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
  }

  .social-security-container .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .social-security-container .municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .social-security-container .ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }

  .social-security-container .address-text,
  .social-security-container .province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* --- Meta Data --- */
  .social-security-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .social-security-container .meta-left p,
  .social-security-container .meta-right p {
    margin: 5px 0;
  }

  .social-security-container .bold-text { font-weight: bold; }

  .social-security-container .dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
  }

  .social-security-container .small-input { width: 120px; }

  /* --- Subject --- */
  .social-security-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .social-security-container .underline-text { text-decoration: underline; }

  /* --- Addressee Section --- */
  .social-security-container .addressee-section {
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .social-security-container .addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .social-security-container .line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
  }

  .social-security-container .medium-input { width: 200px; }

  /* --- Body Paragraph & Inputs --- */
  .social-security-container .form-body {
    font-size: 1.05rem;
    line-height: 2.4;
    text-align: justify;
  }

  .social-security-container .inline-box-input {
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

  .social-security-container .inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .social-security-container .tiny-box { width: 40px; text-align: center; }
  .social-security-container .medium-box { width: 160px; }

  /* --- Signature Section --- */
  .social-security-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .social-security-container .signature-block {
    width: 220px;
    text-align: center;
  }

  .social-security-container .signature-block .line-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
  }

  .social-security-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .social-security-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Applicant Details Box --- */
  .social-security-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .social-security-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .social-security-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .social-security-container .detail-group {
    display: flex;
    flex-direction: column;
  }

  .social-security-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .social-security-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .social-security-container .bg-gray { background-color: #eef2f5; }

  /* --- Footer --- */
  .social-security-container .form-footer {
    text-align: center;
    margin-top: 40px;
  }

  .social-security-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .social-security-container .save-print-btn:hover { background-color: #1a252f; }
  .social-security-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .social-security-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* Required star */
  .social-security-container .required {
    color: red;
    margin-left: 4px;
  }

  .social-security-container .inline-input-wrapper {
    position: relative;
    display: inline-block;
  }

  .social-security-container .input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .social-security-container .inline-input-wrapper input {
    padding-left: 18px;
  }

  .social-security-container .full-width-input { width: 100%; }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .social-security-container {
      padding: 20px 16px;
    }

    .social-security-container .header-logo img {
      position: static;
      display: block;
      margin: 0 auto 10px;
    }

    .social-security-container .municipality-name { font-size: 1.5rem; }
    .social-security-container .ward-title { font-size: 1.6rem; }

    .social-security-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .social-security-container .inline-box-input,
    .social-security-container .inline-select {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .social-security-container .tiny-box,
    .social-security-container .medium-box,
    .social-security-container .medium-input,
    .social-security-container .small-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .social-security-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .social-security-container .signature-section {
      justify-content: center;
    }

    .social-security-container .meta-data-row {
      flex-direction: column;
    }
  }

  /* ================= PRINT STYLES ================= */
  @media print {
    body * { visibility: hidden; }

    .social-security-container,
    .social-security-container * {
      visibility: visible;
    }

    .social-security-container {
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

    .social-security-container .form-footer { display: none; }
    .social-security-container .top-bar-title { display: none; }
  }
`;

const initialState = {
  // Meta
  chalani_no: "",

  // Addressee
  addressee_name: "",
  addressee_address: "",

  // Body
  old_place: "",
  old_place_type: "",
  old_ward_no: "",
  person_name: "",
  relation: "",
  relative_name: "",
  allowance_type: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const BankAccountForSocialSecurity = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/bank-account-social-security", form);
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
      const res = await axios.post("/api/forms/bank-account-social-security", form);
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
      <div className="social-security-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          सामाजिक सुरक्षाको बैंक खाता खोलिदिने
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षाको बैंक खाता खोलिदिने
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
            <span className="underline-text">
              सामाजिक सुरक्षाको बैंक खाता खोलिदिने सिफारिस।
            </span>
          </p>
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
            <span>।</span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा साविक
            <input
              name="old_place"
              type="text"
              className="inline-box-input medium-box"
              value={form.old_place}
              onChange={handleChange}
            />
            <select
              name="old_place_type"
              className="inline-select"
              value={form.old_place_type}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="vdc">गा.वि.स.</option>
              <option value="mun">नगरपालिका</option>
            </select>
            वडा नं{" "}
            <input
              name="old_ward_no"
              type="text"
              className="inline-box-input tiny-box"
              value={form.old_ward_no}
              onChange={handleChange}
              required
            />
            भई हाल{" "}
            <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
            {" "}वडा नं{" "}
            <span className="bold-text underline-text">
              {MUNICIPALITY.wardNumber}
            </span>
            {" "}बस्ने
            <input
              name="person_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.person_name}
              onChange={handleChange}
              required
            />
            को
            <select
              name="relation"
              className="inline-select"
              value={form.relation}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="श्रीमान">श्रीमान</option>
              <option value="श्रीमती">श्रीमती</option>
              <option value="बुबा">बुबा</option>
              <option value="आमा">आमा</option>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <input
              name="relative_name"
              type="text"
              className="inline-box-input medium-box"
              value={form.relative_name}
              onChange={handleChange}
              required
            />
            ले नेपाल सरकारबाट प्राप्त हुने सामाजिक सुरक्षा
            <select
              name="allowance_type"
              className="inline-select"
              value={form.allowance_type}
              onChange={handleChange}
            >
              <option value="">छान्नुहोस्</option>
              <option value="ज्येष्ठ नागरिक">ज्येष्ठ नागरिक</option>
              <option value="एकल महिला">एकल महिला</option>
              <option value="अपाङ्गता">अपाङ्गता</option>
              <option value="बाल पोषण">बाल पोषण</option>
            </select>
            भत्ता बैंक बाट पाउनका लागी ताहाँको बैंकमा बैंक खाता खोल्नु पर्ने
            भएकाले निजलाई बैंक खाता खोली दिनु हुन सिफारीशका साथ अनुरोध गरिन्छ ।
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

export default BankAccountForSocialSecurity;