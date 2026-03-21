import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./NewBeneficiaryAccount.css";
import { useAuth } from "../../context/AuthContext";

import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// 6
const initialState = {
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
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
      const res = await axios.post("/api/forms/domestic-animal", form);
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
            <input type="text" className="dotted-input small-input" />
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
          <input type="text" className="line-input medium-input" required />
        </div>
        <div className="addressee-row">
          <input type="text" className="line-input medium-input" required />
        </div>
        <div className="addressee-row">
          <span>नागार्जुन</span>
          <input type="text" className="line-input medium-input" />
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
          <input type="text" className="dotted-input medium-input" required /> )
          बाट आ.व.
          <select className="inline-select">
            <option>2082/83</option>
            <option>2083/84</option>
          </select>
          को{" "}
          <input type="text" className="dotted-input medium-input" required />{" "}
          बापतको सामाजिक सुरक्षा भत्ता पाउन योग्य लाभग्राही ना.प्र.नं.{" "}
          <input type="text" className="dotted-input medium-input" required />{" "}
          जारी मिति <span className="bold-text">२०८२-०८-०६</span> भएको श्री{" "}
          <input type="text" className="dotted-input medium-input" required />{" "}
          को सामाजिक सुरक्षा भत्ता प्रयोजनको लागि खाता खोलिदिन हुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
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
