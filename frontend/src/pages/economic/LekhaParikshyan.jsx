import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const styles = `
  /* --- Main Container --- */
  .audit-container {
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

  /* --- Utility --- */
  .audit-container .bold-text { font-weight: bold; }
  .audit-container .underline-text { text-decoration: underline; }

  /* --- Top Bar --- */
  .audit-container .top-bar-title {
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

  .audit-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Header Section --- */
  .audit-container .form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .audit-container .header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
  }

  .audit-container .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .audit-container .municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .audit-container .ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }

  .audit-container .address-text,
  .audit-container .province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* --- Meta Data --- */
  .audit-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .audit-container .meta-left p,
  .audit-container .meta-right p { margin: 5px 0; }

  .audit-container .dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .audit-container .small-input { width: 120px; }

  /* --- Addressee Section --- */
  .audit-container .addressee-section {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1.05rem;
  }

  .audit-container .addressee-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .audit-container .line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 10px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .audit-container .medium-input { width: 250px; }
  .audit-container .full-width-input { width: 100%; }

  /* --- Subject --- */
  .audit-container .subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* --- Body Paragraph & Inputs --- */
  .audit-container .form-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }

  .audit-container .inline-box-input {
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

  .audit-container .tiny-box  { width: 40px;  text-align: center; }
  .audit-container .small-box { width: 100px; }
  .audit-container .medium-box{ width: 160px; }
  .audit-container .long-box  { width: 250px; }

  /* --- Bodartha Section --- */
  .audit-container .bodartha-section {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .audit-container .bodartha-section label {
    font-size: 1.1rem;
    white-space: nowrap;
  }

  .audit-container .bodartha-input-container {
    position: relative;
    width: 250px;
  }

  .audit-container .bodartha-input-container .line-input {
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
  }

  /* --- Signature Section --- */
  .audit-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .audit-container .signature-block {
    width: 220px;
    text-align: center;
  }

  .audit-container .signature-block .line-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
  }

  .audit-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .audit-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  /* --- Inline input wrapper (required star) --- */
  .audit-container .inline-input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .audit-container .input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .audit-container .inline-input-wrapper input {
    padding-left: 18px;
  }

  /* --- Applicant Details Box --- */
  .audit-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .audit-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .audit-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .audit-container .detail-group { display: flex; flex-direction: column; }

  .audit-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .audit-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .audit-container .bg-gray { background-color: #eef2f5; }

  /* --- Footer --- */
  .audit-container .form-footer { text-align: center; margin-top: 40px; }

  .audit-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .audit-container .save-print-btn:hover { background-color: #1a252f; }
  .audit-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .audit-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .audit-container {
      padding: 20px 16px;
    }

    .audit-container .header-logo img {
      position: static;
      display: block;
      margin: 0 auto 10px;
    }

    .audit-container .municipality-name { font-size: 1.5rem; }
    .audit-container .ward-title { font-size: 1.6rem; }

    .audit-container .form-body {
      font-size: 0.95rem;
      line-height: 2.2;
    }

    .audit-container .inline-box-input {
      width: 100% !important;
      display: block;
      margin: 4px 0;
      box-sizing: border-box;
    }

    .audit-container .small-box,
    .audit-container .medium-box,
    .audit-container .long-box,
    .audit-container .medium-input,
    .audit-container .small-input {
      width: 100% !important;
      margin: 4px 0;
    }

    .audit-container .addressee-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .audit-container .bodartha-input-container {
      width: 100%;
    }

    .audit-container .signature-section {
      justify-content: center;
    }

    .audit-container .meta-data-row {
      flex-direction: column;
    }
  }

  /* ================= PRINT STYLES ================= */
  @media print {
    body * { visibility: hidden; }

    .audit-container,
    .audit-container * { visibility: visible; }

    .audit-container {
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

    .audit-container .form-footer { display: none; }
    .audit-container .top-bar-title { display: none; }
  }
`;

const initialState = {
  chalani_no: "",
  subject_to: "",
  subject_org: "",
  office_name: "",
  ward_no: "",
  organization_name: "",
  organization_extra: "",
  fiscal_year: "",
  auditor_name: "",
  auditor_certificate_no: "",
  organization_reg_no: "",
  auditor_org_name: "",
  auditor_org_extra: "",
  auditor_extra_role: "",
  bodartha: "",
  signer_name: "",
  signer_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const LekhaParikshyan = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/lekha-parikshyan", form);
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
      const res = await axios.post("/api/forms/lekha-parikshyan", form);
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
      <div className="audit-container">
        {/* Top Bar */}
        <div className="top-bar-title">
          लेखा परिक्षण सम्बन्धमा ।
          <span className="top-right-bread">
            आर्थिक &gt; लेखा परिक्षण सम्बन्धमा ।
          </span>
        </div>

        {/* Header */}
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

        {/* Meta */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">२०८२/८३</span>
            </p>
            <p>
              चलानी नं.:{" "}
              <input
                name="chalani_no"
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
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input
              name="subject_to"
              className="line-input medium-input"
              value={form.subject_to}
              onChange={handleChange}
            />
          </div>
          <div className="addressee-row">
            <input
              name="subject_org"
              className="line-input medium-input"
              value={form.subject_org}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">लेखा परिक्षण सम्बन्धमा ।</span>
          </p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा यस{" "}
            <input
              name="office_name"
              className="inline-box-input medium-box"
              value={form.office_name}
              onChange={handleChange}
            />{" "}
            वडा नं.{" "}
            <input
              name="ward_no"
              className="inline-box-input tiny-box"
              value={form.ward_no}
              onChange={handleChange}
            />{" "}
            मा रहेको श्री{" "}
            <input
              name="organization_name"
              className="inline-box-input long-box"
              value={form.organization_name}
              onChange={handleChange}
            />{" "}
            <input
              name="organization_extra"
              className="inline-box-input medium-box"
              value={form.organization_extra}
              onChange={handleChange}
            />{" "}
            को आ.व.{" "}
            <input
              name="fiscal_year"
              className="inline-box-input small-box"
              value={form.fiscal_year}
              onChange={handleChange}
            />{" "}
            को लेखा परिक्षण गर्न… लेखा परिक्षक श्री{" "}
            <input
              name="auditor_name"
              className="inline-box-input long-box"
              value={form.auditor_name}
              onChange={handleChange}
            />{" "}
            प्रमाण पत्र नं.{" "}
            <input
              name="auditor_certificate_no"
              className="inline-box-input medium-box"
              value={form.auditor_certificate_no}
              onChange={handleChange}
            />{" "}
            संस्था दर्ता नम्बर{" "}
            <input
              name="organization_reg_no"
              className="inline-box-input medium-box"
              value={form.organization_reg_no}
              onChange={handleChange}
            />{" "}
            भएको{" "}
            <input
              name="auditor_org_name"
              className="inline-box-input long-box"
              value={form.auditor_org_name}
              onChange={handleChange}
            />{" "}
            <input
              name="auditor_org_extra"
              className="inline-box-input medium-box"
              value={form.auditor_org_extra}
              onChange={handleChange}
            />{" "}
            का{" "}
            <input
              name="auditor_extra_role"
              className="inline-box-input medium-box"
              value={form.auditor_extra_role}
              onChange={handleChange}
            />{" "}
            लाई लेखा परिक्षणको अनुमति…
          </p>
        </div>

        {/* Bodartha */}
        <div className="bodartha-section">
          <label className="bold-text underline-text">बोधार्थ:</label>
          <div className="bodartha-input-container">
            <input
              name="bodartha"
              className="line-input full-width-input"
              value={form.bodartha}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Signature */}
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

        {/* Footer */}
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

export default LekhaParikshyan;